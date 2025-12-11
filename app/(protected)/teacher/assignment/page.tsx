import React from "react";
import { TbheadAssignment } from "@/components/TbAssignmentTeacher/head";
import TbodyAssignment from "@/components/TbAssignmentTeacher/body";
import Ad from "@/components/TbAssignmentTeacher/btn/ad";
import { getAllClassrooms } from "@/data/academy";
import { getLessonbyTeacherId } from "@/data/teacher";
import { TableShell } from "@/components/common/table-shell";
const UserList = async () => {
  const [classrooms] = await Promise.all([getAllClassrooms()]);
  const { data } = await getLessonbyTeacherId();
  return (
    <TableShell
      label="Teacher"
      title="Assignments"
      actions={<Ad lessons={data} classrooms={classrooms} />}
    >
      <table className="w-full table-auto">
        <TbheadAssignment />
        <TbodyAssignment />
      </table>
    </TableShell>
  );
};

export default UserList;
