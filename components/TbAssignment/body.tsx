import React from "react";
import { getAllLessons, getAllClassrooms } from "@/data/academy";
import Edt from "./btn/edt";
import Del from "./btn/del";
import Link from "next/link";
import Pagination from "../pagination/pagination";
import { PageProps } from "@/types/pagination";
import { fetchAssignment } from "@/data/assignments";
import { TableBody, TableCell, TableRow } from "@/components/common/table";

export type FetcAssignmentType = typeof fetchAssignment;
const TbodyAssignment = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchAssignment({ take, skip });
  const [lessons] = await Promise.all([getAllLessons()]);
  const [classrooms] = await Promise.all([getAllClassrooms()]);
  return (
    <>
      <TableBody>
        {data.map((assignment) => (
          <TableRow key={assignment.id}>
            <TableCell className="pl-9 xl:pl-11">
              <h5 className="font-semibold text-[var(--text-primary)]">
                {assignment.lesson.name}
              </h5>
            </TableCell>
            <TableCell>
              <h5 className="text-sm text-[var(--text-primary)]">
                {assignment.task}
              </h5>
            </TableCell>
            <TableCell>
              <p className="text-sm text-[var(--text-primary)]">
                {assignment.teacher.name}
              </p>
            </TableCell>
            <TableCell>
              <p className="text-sm text-[var(--text-primary)]">
                {assignment.classroom.name}
              </p>
            </TableCell>
            <TableCell>
              {assignment.fileUrl ? (
                <Link href={assignment.fileUrl} passHref>
                  <button className="btnDownload" type="button">
                    Click Here
                  </button>
                </Link>
              ) : (
                <span className="text-[var(--text-muted)]">File URL is null</span>
              )}
            </TableCell>
            <TableCell>
              <p className="text-sm text-[var(--text-primary)]">
                {assignment.deadline.toLocaleDateString()}
              </p>
            </TableCell>
            <TableCell>
              <p className="text-sm text-[var(--text-primary)]">
                {assignment.time}
              </p>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-3.5">
                <Del assignment={assignment} />
                <Edt
                  lessons={lessons}
                  classrooms={classrooms}
                  assignment={assignment}
                />
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

export default TbodyAssignment;
