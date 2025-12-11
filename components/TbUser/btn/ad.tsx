"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { UserStatus } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "@/components/common/modal";

const Ad = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const handleAdd = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/user`, {
        name: name,
        email: email,
        role: role,
        password: password,
        status: status,
      });
      toast({
        title: "User Add successfully",
        description: `User : ${response.data.name}, Role ${response.data.role}`,
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
    setName("");
    setPassword("");
    setEmail("");
    setRole("");
    setStatus("");
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
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add User">
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
          <div>
            <label htmlFor="password" className="modal-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="modal-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                <option value={UserRole.ADMIN}>Admin</option>
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
              </select>
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
