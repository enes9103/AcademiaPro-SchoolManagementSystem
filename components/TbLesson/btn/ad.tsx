"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { LessonCategory, Teachers } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "@/components/common/modal";
const Ad = ({ teachers }: { teachers: Teachers[] }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [cat, setCat] = useState("");
  const [teacher, setTeacher] = useState("");
  const router = useRouter();
  const handleAdd = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/lesson`, {
        name: name,
        cat: cat,
        teacher: teacher,
      });
      toast({
        title: "Lesson Add successfully",
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
    setName("");
    setCat("");
    setTeacher("");
    router.refresh();
    setShowModal(false);
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
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Lesson">
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
              Lesson Category
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
              <option value={LessonCategory.SPORT}>Sport</option>
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
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
            >
              <option value="" disabled>
                Select Teacher
              </option>
              {teachers.map((teacher) => (
                <option value={teacher.userId} key={teacher.userId}>
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
          <button className="btnSave" type="button" onClick={handleAdd} disabled={isLoading}>
            {isLoading ? "Loading..." : "Save Changes"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Ad;
