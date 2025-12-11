"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "@/components/common/modal";
const Ad = () => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [cap, setCap] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleAdd = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/classroom`, {
        name: name,
        cap: cap,
      });
      toast({
        title: "Classroom Add successfully",
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
    setName("");
    setCap("");
    setShowModal(false);
    router.refresh();
  };
  return (
    <>
      <button
        className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-95 transition"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add
      </button>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Add Classroom"
      >
        <form className="space-y-3">
          <div>
            <label htmlFor="name" className="modal-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
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
            className="btnAdd"
            type="button"
            onClick={handleAdd}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Save Changes"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Ad;
