import React from "react";
import Edt from "./btn/edt";
import Del from "./btn/del";
import { PageProps } from "@/types/pagination";
import Pagination from "../pagination/pagination";
import { fetchClassrooms, getTotalUsersInClassroom } from "@/data/classrooms";
import { TableBody, TableCell, TableRow } from "@/components/common/table";
export type FetcStudentsType = typeof fetchClassrooms;
const TbodyClassroom = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchClassrooms({ take, skip });
  const counts = await Promise.all(
    data.map(async (classroom) => {
      const count = await getTotalUsersInClassroom({
        classroomId: classroom.id,
      });
      return count;
    })
  );
  return (
    <>
      <TableBody>
        {data.map((classroom) => (
          <TableRow key={classroom.id}>
            <TableCell className="pl-9 xl:pl-11">
              <h5 className="font-semibold text-[var(--text-primary)]">
                {classroom.name}
              </h5>
            </TableCell>
            <TableCell>
              <p className="text-sm text-[var(--text-primary)]">
                {classroom.cap}
              </p>
            </TableCell>
            <TableCell>
              <p className="text-sm text-[var(--text-primary)]">
                {counts[data.indexOf(classroom)]}
              </p>
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-3">
                <Del classroom={classroom} />
                <Edt classroom={classroom} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <tfoot>
        <tr>
          <td className="py-5" colSpan={7}>
            <div className="flex items-center space-x-3.5">
              <Pagination {...metadata} />
            </div>
          </td>
        </tr>
      </tfoot>
    </>
  );
};

export default TbodyClassroom;
