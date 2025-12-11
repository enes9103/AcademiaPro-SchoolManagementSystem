"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "@/components/common/modal";

type User = {
  id: string;
  name: string | null;
  email: string | null;
};

const Del = ({ user }: { user: User }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/user/${user.id}`);
      toast({
        description: "Success Delete User",
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
      <button
        className="btnDel"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Delete User"
        description={`Are you sure you want to delete ${user.name}?`}
      >
        <div className="flex justify-end gap-3">
          <button className="btnClose" type="button" onClick={() => setShowModal(false)}>
            Close
          </button>
          <button
            className="btnDel"
            type="button"
            onClick={() => handleDelete(user.id)}
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
