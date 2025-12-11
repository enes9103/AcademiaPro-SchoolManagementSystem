"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { UserRole } from "@prisma/client";
import { UserStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "@/components/common/modal";

type User = {
  id: string;
  email: string | null;
  role: UserRole;
  status: UserStatus;
  name: string | null;
};

const Edt = ({ user }: { user: User }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [role, setRole] = useState<UserRole>(user.role);
  const [status, setStatus] = useState<UserStatus>(user.status);
  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      name === user.name &&
      email === user.email &&
      role === user.role &&
      status === user.status
    ) {
      setIsLoading(false);
      setShowModal(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.patch(`/api/user/${user.id}`, {
        name: name,
        email: email,
        role: role,
        status: status,
      });
      toast({
        title: "User edited successfully",
        description: `User: ${response.data.name}, Role: ${response.data.role}`,
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
        title={`Update User: ${user.name}`}
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
            <label htmlFor="email" className="modal-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="modal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="role" className="modal-label">
                Role
              </label>
              <select
                name="role"
                id="role"
                className="modal-select"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
              >
                <option value="" hidden>
                  Select Role
                </option>
                <option value={UserRole.TEACHER}>Teacher</option>
                <option value={UserRole.STUDENT}>Student</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="modal-label">
                Status
              </label>
              <select
                name="status"
                id="status"
                className="modal-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as UserStatus)}
              >
                <option value="" hidden>
                  Select Status
                </option>
                <option value={UserStatus.ACTIVE}>Active</option>
                <option value={UserStatus.IN_ACTIVE}>In Active</option>
                <option value={UserStatus.BANNED}>Banned</option>
              </select>
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
