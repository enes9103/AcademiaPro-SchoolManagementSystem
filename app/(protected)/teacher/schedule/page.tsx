import React from "react";
import { TbheadLesson } from "@/components/TbScheduleTeacher/head";
import TbodyLesson from "@/components/TbScheduleTeacher/body";
import { TableShell } from "@/components/common/table-shell";

const Schedulelist = async () => {
  return (
    <TableShell label="Teacher" title="Schedule">
      <table className="w-full table-auto">
        <TbheadLesson />
        <TbodyLesson />
      </table>
    </TableShell>
  );
};

export default Schedulelist;
