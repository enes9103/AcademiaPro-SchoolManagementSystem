"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { Classrooms } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "@/components/common/modal";
type Student = {
  id: string;
  userId: string;
  name: string | null;
};
interface EdtProps {
  classrooms: Classrooms[];
  student: Student;
}
const Add = ({ student, classrooms }: EdtProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(student.name || "");
  const [studentId, setStudent] = useState(student.userId || "");
  const [classroom, setClassroom] = useState("");
  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`/api/student`, {
        classroomId: classroom,
        studentId: studentId,
      });
      toast({
        description: "Add successfully",
      });
    } catch (error: any) {
      let errorMessage = "An error occurred";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
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
        className="btnAdd"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add
      </button>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={`Add to Classroom: ${student.name}`}
      >
        <form className="space-y-3">
          <div>
            <label htmlFor="name" className="modal-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="modal-input"
              value={name}
              disabled
            />
            <input id="id" type="hidden" value={studentId} readOnly />
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

export default Add;
