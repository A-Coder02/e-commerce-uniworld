import React from "react";

/**
 * The TableHeader component to display column headers.
 *
 * @param {Object} props - The properties object.
 * @param {Array<{label: string, field: string, minWidth?: string, maxWidth?: string, flex?: string}>} [props.columns=[]] - The columns to be displayed as headers.
 * @returns {JSX.Element} The rendered table header with column names.
 */
const TableHeader = ({ columns = [] }) => {
  return (
    <div className="flex flex-col gap-4 min-w-fit">
      <div className="p-4 bg-white border border-slate-400 !border-solid">
        <div className="flex">
          {columns.map((column, index) => (
            <div
              key={column.field || index}
              className="col-span-1"
              style={{
                minWidth: column.minWidth || "150px",
                maxWidth: column.maxWidth || "auto",
                flex: column.flex || "0",
              }}
            >
              {column.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
