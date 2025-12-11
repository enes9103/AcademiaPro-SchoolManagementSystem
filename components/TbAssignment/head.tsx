import React from "react";
import { Tablehd } from "@/types/table";
import { TableHeadRow, TableHeadCell } from "@/components/common/table";

const tablehdDataSchedule: Tablehd[] = [
  {
    name: "Lesson",
  },
  {
    name: "Name",
  },
  {
    name: "CreateBy",
  },
  {
    name: "Classroom",
  },
  {
    name: "File",
  },
  {
    name: "Deadline",
  },
  {
    name: "Time",
  },
  {
    name: "Actions",
  },
];
export const TbheadAssignment = () => {
  return (
    <>
      <thead>
        <TableHeadRow>
          {tablehdDataSchedule.map((tablehdItem, key) => (
            <TableHeadCell
              key={key}
              className={
                tablehdItem.name === "Lesson"
                  ? "min-w-[220px] xl:pl-11"
                  : tablehdItem.name === "Name"
                    ? "min-w-[150px]"
                    : tablehdItem.name === "CreateBy"
                      ? "min-w-[150px]"
                      : tablehdItem.name === "Classroom"
                        ? "min-w-[150px]"
                        : tablehdItem.name === "File"
                          ? "min-w-[150px]"
                          : tablehdItem.name === "Deadline"
                            ? "min-w-[150px]"
                            : tablehdItem.name === "Time"
                              ? "min-w-[150px]"
                              : tablehdItem.name === "File"
                                ? "min-w-[150px]"
                                : tablehdItem.name === "Actions"
                                  ? "px-20"
                                  : ""
              }
            >
              {tablehdItem.name}
            </TableHeadCell>
          ))}
        </TableHeadRow>
      </thead>
    </>
  );
};
