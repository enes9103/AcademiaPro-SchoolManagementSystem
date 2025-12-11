import React from "react";
import { Tablehd } from "@/types/table";
import { TableHeadRow, TableHeadCell } from "@/components/common/table";

const tablehdDataClassroom: Tablehd[] = [
  {
    name: "Classroom",
  },
  {
    name: "Capacity",
  },
  {
    name: "Total Student",
  },
  {
    name: "Actions",
  },
];
export const TbheadClassroom = () => {
  return (
    <>
      <thead>
        <TableHeadRow>
          {tablehdDataClassroom.map((tablehdItem, key) => (
            <TableHeadCell
              key={key}
              className={
                tablehdItem.name === "Classroom"
                  ? "min-w-[220px] xl:pl-11"
                  : tablehdItem.name === "Capacity"
                    ? "min-w-[150px]"
                    : tablehdItem.name === "Total Student"
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
