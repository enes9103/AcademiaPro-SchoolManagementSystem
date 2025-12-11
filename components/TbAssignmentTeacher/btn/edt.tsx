"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { Lessons, Classrooms } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "@/components/common/modal";

type Assignment = {
  id: string;
  lessonId: string;
  classId: string;
  deadline: string;
  time: string;
  task: string;
  createBy: string;
};

interface EdtProps {
  lessons: Lessons[];
  classrooms: Classrooms[];
  assignment: Assignment;
}

const Edt = ({ assignment, lessons, classrooms }: EdtProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deadline, setDeadline] = useState(
    new Date(assignment.deadline).toISOString().split("T")[0] || ""
  );
  const [time, setTime] = useState(assignment.time || "");
  const [lessonId, setLesson] = useState(assignment.lessonId || "");
  const [classId, setClass] = useState(assignment.classId || "");
  const [task, setTask] = useState(assignment.task || "");
  const [teacherId, setTeacherId] = useState(assignment.createBy || "");

  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (
        deadline === new Date(assignment.deadline).toISOString().split("T")[0] &&
        time === assignment.time &&
        classId === assignment.classId &&
        task === assignment.task &&
        lessonId === assignment.lessonId &&
        teacherId === assignment.createBy
      ) {
        setIsLoading(false);
        setShowModal(false);
        return;
      }
      const response = await axios.patch(`/api/assignment/${assignment.id}`, {
        deadline: deadline,
        time: time,
        lessonId: lessonId,
        classId: classId,
        task: task,
        createBy: teacherId,
      });
      toast({
        title: "Assignment updated",
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
    }
    setIsLoading(false);
    setShowModal(false);
    router.refresh();
  };
  return (
    <>
      <button className="btnEdt" type="button" onClick={() => setShowModal(true)}>
        Edit
      </button>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Update Assignment"
      >
        <form className="space-y-3">
          <div>
            <label htmlFor="task" className="modal-label">
              Task
            </label>
            <input
              id="task"
              type="text"
              placeholder="Name of task"
              className="modal-input"
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
              value={lessonId}
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="day" className="modal-label">
                Deadline
              </label>
              <input
                id="day"
                type="date"
                placeholder="Day For Schedule"
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
                id="time"
                type="time"
                placeholder="Day For Schedule"
                className="modal-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="classroom" className="modal-label">
              Classroom
            </label>
            <select
              name="classroom"
              id="classroom"
              className="modal-select"
              value={classId}
              onChange={(e) => setClass(e.target.value)}
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
        </form>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btnClose" type="button" onClick={() => setShowModal(false)}>
            Close
          </button>
          <button className="btnSave" type="button" onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? "Loading..." : "Save Changes"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Edt;
