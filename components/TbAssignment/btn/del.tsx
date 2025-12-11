"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "@/components/common/modal";

type Assignment = {
  id: string;
  fileUrl: string | null;
};

const Del = ({ assignment }: { assignment: Assignment }) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string, fileUrl: string | null) => {
    setIsLoading(true);
    try {
      if (fileUrl) {
        const storage = getStorage();
        const fileRef = ref(storage, fileUrl);
        await deleteObject(fileRef);
      }
      await axios.delete(`/api/assignment/${id}`);
      toast({
        description: "Success Delete Assignment",
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
    } finally {
      setIsLoading(false);
      setShowModal(false);
      router.refresh();
    }
  };

  return (
    <>
      <button className="btnDel" type="button" onClick={() => setShowModal(true)}>
        Delete
      </button>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Delete Assignment"
        description="Are you sure you want to delete this assignment?"
      >
        <div className="flex justify-end gap-3">
          <button className="btnClose" type="button" onClick={() => setShowModal(false)}>
            Close
          </button>
          <button
            className="btnDel"
            type="button"
            onClick={() => handleDelete(assignment.id, assignment.fileUrl)}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Save Changes"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Del;
