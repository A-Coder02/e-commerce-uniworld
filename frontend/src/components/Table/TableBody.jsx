import React from "react";

/**
 * The TableBody component to display rows of data.
 *
 * @param {Object} props - The properties object.
 * @param {Array<{label: string, field: string, minWidth?: string, maxWidth?: string, flex?: string, renderCell?: function}>} props.columns - The columns to be displayed in each row.
 * @param {Array<Object>} props.rows - The data to be displayed as table rows.
 * @param {boolean} [props.loading=false] - Indicates if data is being loaded.
 * @returns {JSX.Element} The rendered table body with rows and columns.
 */
const TableBody = ({ columns, rows, loading = false }) => {
  return (
    <div className="flex-1">
      {rows.length > 0 ? (
        rows.map((row) => (
          <div
            key={row.id}
            className="p-4 bg-white border-b border-b-slate-400 !border-solid min-w-fit"
          >
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
                  {column.renderCell?.(row, column) || row[column.field]}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-6">No Data</p>
      )}
    </div>
  );
};

export default TableBody;
