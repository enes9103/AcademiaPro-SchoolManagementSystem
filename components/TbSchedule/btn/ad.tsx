"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { Lessons, Classrooms } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "@/components/common/modal";

interface AdProps {
  lessons: Lessons[];
  classrooms: Classrooms[];
}
const Ad = ({ lessons, classrooms }: AdProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [lesson, setLesson] = useState("");
  const [classroom, setClassroom] = useState("");
  const router = useRouter();
  const handleAdd = async (e: SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`/api/schedule`, {
        day: day,
        time: time,
        lesson: lesson,
        classroom: classroom,
      });
      toast({
        description: "Schedule Add successfully",
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
    setDay("");
    setTime("");
    setLesson("");
    setClassroom("");
    router.refresh();
  };
  return (
    <>
      <button
        className="btnAdd"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add
      </button>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Schedule">
        <form className="space-y-3">
          <div>
            <label htmlFor="lesson" className="modal-label">
              Lesson
            </label>
            <select
              name="lesson"
              id="lesson"
              className="modal-select"
              value={lesson}
              onChange={(e) => setLesson(e.target.value)}
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
              <label htmlFor="day" className="modal-label">
                Day
              </label>
              <input
                id="day"
                type="date"
                placeholder="Day for schedule"
                className="modal-input"
                value={day}
                onChange={(e) => setDay(e.target.value)}
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
        </form>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btnClose" type="button" onClick={() => setShowModal(false)}>
            Close
          </button>
          <button className="btnSave" type="button" onClick={handleAdd} disabled={isLoading}>
            {isLoading ? "Loading..." : "Save Changes"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Ad;
