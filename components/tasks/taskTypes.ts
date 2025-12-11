export type TaskStatus = "todo" | "inProgress" | "onHold" | "done";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  due: string;
};
