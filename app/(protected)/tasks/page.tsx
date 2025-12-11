import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { TasksBoard } from "@/components/tasks/TasksBoard";
import { UserStatus } from "@prisma/client";

const TasksPage = async () => {
  const session = await auth();
  if (!session?.user || session.user.status !== UserStatus.ACTIVE) {
    redirect("/home");
  }

  return <TasksBoard />;
};

export default TasksPage;
