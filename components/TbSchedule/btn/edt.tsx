"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { Lessons, Classrooms } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "@/components/common/modal";

type Schedule = {
  id: string;
  lessonId: string;
  classId: string;
  day: Date;
  time: string;
};
interface EdtProps {
  lessons: Lessons[];
  classrooms: Classrooms[];
  schedule: Schedule;
}

const Edt = ({ schedule, lessons, classrooms }: EdtProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [day, setDay] = useState(
    schedule.day.toISOString().split("T")[0] || ""
  );
  const [time, setTime] = useState(schedule.time || "");
  const [lessonId, setLesson] = useState(schedule.lessonId || "");
  const [classId, setClass] = useState(schedule.classId || "");
  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (
        day === schedule.day.toISOString().split("T")[0] &&
        time === schedule.time &&
        classId === schedule.classId &&
        lessonId === schedule.lessonId
      ) {
        setIsLoading(false);
        setShowModal(false);
        return;
      }
      const response = await axios.patch(`/api/schedule/${schedule.id}`, {
        day: day,
        time: time,
        lessonId: lessonId,
        classId: classId,
      });
      toast({
        description: "Schedule Edit successfully",
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
      <button
        className="btnEdt"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Update Schedule"
      >
        <form className="space-y-3">
          <div>
            <label htmlFor="lesson" className="modal-label">
              Lesson
            </label>
            <select
              name="lesson"
              id="lesson"
              className="modal-select"
              value={lessonId}
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="day" className="modal-label">
                Day
              </label>
              <input
                id="day"
                type="date"
                placeholder="Day For Schedule"
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
                id="time"
                type="time"
                placeholder="Day For Schedule"
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
          <button className="btnSave" type="button" onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? "Loading..." : "Save Changes"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Edt;
