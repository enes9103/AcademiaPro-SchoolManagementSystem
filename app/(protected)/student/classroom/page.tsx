import { auth } from "@/auth";
import { db } from "@/lib/db";
import { DataTable } from "@/components/common/data-table";

type ClassroomRow = {
  id: string;
  name: string;
  cap: string;
};

const Classroom = async () => {
  const session = await auth();
  const student = await db.students.findUnique({
    where: { userId: session?.user.id },
    select: {
      onClassroom: {
        select: {
          classroom: {
            select: {
              id: true,
              name: true,
              cap: true,
            },
          },
        },
      },
    },
  });

  const rows: ClassroomRow[] =
    student?.onClassroom.map((c) => ({
      id: c.classroom.id,
      name: c.classroom.name,
      cap: c.classroom.cap,
    })) ?? [];

  return (
    <div className="mx-auto w-full">
      <DataTable
        columns={[
          { header: "Sınıf", accessorKey: "name" },
          { header: "Kapasite", accessorKey: "cap" },
        ]}
        data={rows}
        label="Student"
        title="Classrooms"
        enableSearch
        searchPlaceholder="Sınıf ara..."
        useUrlPagination
        pageSize={10}
      />
    </div>
  );
};

export default Classroom;
