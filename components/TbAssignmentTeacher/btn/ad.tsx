"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { Lessons, Classrooms } from "@prisma/client";
import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { deleteFileOnZodError } from "@/actions/deleteFile";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "@/components/common/modal";
interface AdProps {
  lessons: Lessons[];
  classrooms: Classrooms[];
}
const Ad = ({ lessons, classrooms }: AdProps) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [time, setTime] = useState("");
  const [file, setFile] = useState<File>();
  const [task, setTask] = useState("");
  const [lesson, setLesson] = useState("");
  const [classroom, setClassroom] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setFile(files[0]);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "File Too BIG",
      });
    }
  };

  const handleUploadAndAdd = async (e: SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();

    if (
      !file ||
      !deadline ||
      !time ||
      !lesson ||
      !teacherId ||
      !classroom ||
      !task
    ) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please fill in all fields and select a file",
      });
      setIsLoading(false);
      return;
    }

    let downloadURL: string | null = null;
    try {
      const name = file.name;
      const storageRef = ref(storage, `file/${lesson}/${classroom}/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      downloadURL = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.error("Upload failed:", error);
            reject(error);
          },
          async () => {
            console.log("Upload complete");
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });

      const response = await axios.post(`/api/assignment`, {
        deadline: deadline,
        time: time,
        lesson: lesson,
        createBy: teacherId,
        classroom: classroom,
        task: task,
        file: downloadURL,
      });
      toast({
        title: "Assignment Add successfully",
        description: `Assignment : ${response.data.task}`,
      });
    } catch (error: any) {
      let errorMessage = "An error occurred";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
        className: "bg-red text-white",
      });
      await deleteFileOnZodError(downloadURL);
      return;
    } finally {
      setIsLoading(false);
      setShowModal(false);
      setDeadline("");
      setTime("");
      setLesson("");
      setTask("");
      setClassroom("");
      router.refresh();
    }
  };

  return (
    <>
      <button className="btnAdd" type="button" onClick={() => setShowModal(true)}>
        Add
      </button>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Assignment">
        <form className="space-y-3">
          <div>
            <label htmlFor="task" className="modal-label">
              Name Task
            </label>
            <input
              name="task"
              type="text"
              id="task"
              className="modal-input"
              placeholder="Name of Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lesson" className="modal-label">
              Lesson
            </label>
            <select
              name="lesson"
              id="lesson"
              className="modal-select"
              value={lesson}
              onChange={(e) => {
                const selectedLesson = lessons.find((l) => l.id === e.target.value);
                if (selectedLesson) {
                  setLesson(selectedLesson.id);
                  setTeacherId(selectedLesson.teacherId);
                }
              }}
            >
              <option value="" hidden>
                Select Lesson
              </option>
              {lessons.map((lesson) => (
                <option value={lesson.id} key={lesson.id}>
                  {lesson.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="classroom" className="modal-label">
              Classroom
            </label>
            <select
              name="classroom"
              id="classroom"
              className="modal-select"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
            >
              <option value="" hidden>
                Select Classroom
              </option>
              {classrooms.map((classroom) => (
                <option value={classroom.id} key={classroom.id}>
                  {classroom.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="deadline" className="modal-label">
                Deadline
              </label>
              <input
                id="deadline"
                type="date"
                placeholder="Deadline of Assignment"
                className="modal-input"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="time" className="modal-label">
                Time
              </label>
              <input
                name="time"
                type="time"
                id="time"
                className="modal-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="file" className="modal-label">
              File
            </label>
            <input
              name="file"
              id="file"
              type="file"
              className="modal-input"
              placeholder="select file"
              onChange={(files) => handleSelectedFile(files.target.files)}
            />
          </div>
        </form>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btnClose" type="button" onClick={() => setShowModal(false)}>
            Close
          </button>
          <button className="btnSave" type="button" onClick={handleUploadAndAdd} disabled={isLoading}>
            {isLoading ? "Loading..." : "Save Changes"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Ad;
