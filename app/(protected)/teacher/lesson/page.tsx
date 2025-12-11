import React from "react";
import { TbheadLessonteacher } from "@/components/TbLessonTeacher/head";
import TbodyLessonTeacher from "@/components/TbLessonTeacher/body";
import Ad from "@/components/TbLesson/btn/ad";
import { getAllTeachers } from "@/data/academy";
import { PageProps } from "@/types/pagination";
import { TableShell } from "@/components/common/table-shell";
const scheduleList = async (props: PageProps) => {
  const [teachers] = await Promise.all([getAllTeachers()]);
  return (
    <TableShell label="Teacher" title="Lessons">
      <table className="w-full table-auto">
        <TbheadLessonteacher />
        <TbodyLessonTeacher {...props} />
      </table>
    </TableShell>
  );
};

export default scheduleList;
