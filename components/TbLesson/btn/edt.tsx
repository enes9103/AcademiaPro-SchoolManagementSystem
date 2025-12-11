"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { LessonCategory } from "@prisma/client";
import { Teachers } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "@/components/common/modal";
type Lesson = {
  id: string;
  cat: LessonCategory;
  name: string;
  teacherId: string;
};
interface EdtProps {
  lesson: Lesson;
  teachers: Teachers[];
}
const Edt = ({ lesson, teachers }: EdtProps) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(lesson.name || "");
  const [cat, setCat] = useState<LessonCategory>(lesson.cat);
  const [teacherId, setTeacher] = useState(lesson.teacherId || "");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (
        name === lesson.name &&
        cat === lesson.cat &&
        teacherId === lesson.teacherId
      ) {
        setIsLoading(false);
        setShowModal(false);
        return;
      }
      const response = await axios.patch(`/api/lesson/${lesson.id}`, {
        name: name,
        cat: cat,
        teacherId: teacherId,
      });
      toast({
        title: "Lesson Edit successfully",
        description: `Lesson : ${response.data.name}`,
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
        title={`Update Lesson: ${lesson.name}`}
      >
        <form className="space-y-3">
          <div>
            <label htmlFor="name" className="modal-label">
              Lesson Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Lesson Name"
              className="modal-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cat" className="modal-label">
              Category
            </label>
            <select
              name="cat"
              id="cat"
              className="modal-select"
              value={cat}
              onChange={(e) => setCat(e.target.value as LessonCategory)}
            >
              <option value="" disabled>
                Select Category of Lesson
              </option>
              <option value={LessonCategory.ART}>Art</option>
              <option value={LessonCategory.LANGUANGES}>Languanges</option>
              <option value={LessonCategory.SCIENCE}>Science</option>
            </select>
          </div>
          <div>
            <label htmlFor="teacher" className="modal-label">
              Teacher
            </label>
            <select
              name="teacher"
              id="teacher"
              className="modal-select"
              value={teacherId}
              onChange={(e) => setTeacher(e.target.value)}
            >
              <option value="" disabled>
                Select Teacher
              </option>
              {teachers.map((teacher) => (
                <option value={teacher.id} key={teacher.userId}>
                  {teacher.name}
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
