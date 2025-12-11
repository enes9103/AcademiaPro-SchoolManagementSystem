"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
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
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-25 right-10 left-10 bottom-25 xsm:left-4 xsm:right-7 lg:left-80 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border border-[var(--border)] rounded-lg shadow-lg relative flex flex-col w-full bg-[var(--surface)] text-[var(--text-primary)] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-[var(--border)] rounded-t">
                  <h3 className="text-xl font-semibold">
                    Update Classroom: {classroom.name}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form>
                    <label
                      htmlFor="name"
                      className="block font-medium text-[var(--text-primary)]"
                    >
                      Classroom Name:
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Classroom Name"
                      className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text-primary)]"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label
                      htmlFor="cap"
                      className="mt-3 block font-medium text-[var(--text-primary)]"
                    >
                      Capacity:
                    </label>
                    <input
                      id="cap"
                      type="number"
                      placeholder="Capacity"
                      className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text-primary)]"
                      value={cap}
                      onChange={(e) => setCap(e.target.value)}
                    />
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--border)] rounded-b">
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
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Edt;
