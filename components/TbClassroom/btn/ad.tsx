"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
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
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-25 right-10 left-10 bottom-25 xsm:left-4 xsm:right-4 lg:left-80 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border border-[var(--border)] rounded-lg shadow-lg relative flex flex-col w-full bg-[var(--surface)] text-[var(--text-primary)] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-[var(--border)] rounded-t">
                  <h3 className="text-xl font-semibold">
                    Add Classroom
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form>
                    <label
                      htmlFor="name"
                      className="block font-medium text-[var(--text-primary)]"
                    >
                      Name:
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Name"
                      className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text-primary)]"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label
                      htmlFor="Capacity"
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
                    className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-95 transition"
                    type="button"
                    onClick={handleAdd}
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

export default Ad;
