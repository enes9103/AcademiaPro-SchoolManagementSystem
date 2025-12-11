"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "@/components/common/modal";
type Classroom = {
  id: string;
  cap: string;
  name: string;
};

const Edt = ({ classroom }: { classroom: Classroom }) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(classroom.name || "");
  const [cap, setCap] = useState(classroom.cap || "");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (name === classroom.name && cap === classroom.cap) {
        setIsLoading(false);
        setShowModal(false);
        return;
      }
      const response = await axios.patch(`/api/classroom/${classroom.id}`, {
        name: name,
        cap: cap,
      });
      toast({
        title: "Classroom Edit successfully",
        description: `classroom : ${response.data.name}
        Capacity: ${response.data.cap}`,
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
        title={`Update Classroom: ${classroom.name}`}
      >
        <form className="space-y-3">
          <div>
            <label htmlFor="name" className="modal-label">
              Classroom Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Classroom Name"
              className="modal-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cap" className="modal-label">
              Capacity
            </label>
            <input
              id="cap"
              type="number"
              placeholder="Capacity"
              className="modal-input"
              value={cap}
              onChange={(e) => setCap(e.target.value)}
            />
          </div>
        </form>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="btnClose"
            type="button"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <button
            className="btnEdt"
            type="button"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Save Changes"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Edt;
