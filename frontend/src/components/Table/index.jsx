import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";

/**
 * A Table component to display data in a structured format.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} [props.loading=false] - Indicates if data is being loaded.
 * @param {Array<Object>} [props.rows=[]] - The data to be displayed in table rows.
 * @param {Array<{label: string}>} [props.columns=[]] - The table columns to be displayed.
 * @returns {JSX.Element} The rendered table component with a header and body.
 */
const Table = ({
  loading = false,
  rows = [],
  columns = [{ label: "Add Columns" }],
  pagination = null,
  setPagination = () => {},
  onPageChange = () => {},
}) => {
  return (
    <div className="flex-1 flex flex-col relative max-w-full overflow-auto">
      <TableHeader columns={columns} />
      <div className="flex-1 relative py-2">
        <div className="">
          {loading && (
            <div className="absolute bg-[rgba(0,0,0,0.4)] w-full h-full top-0 left-0">
              <p className="text-white pt-6 text-center font-medium text-lg w-full absolute top-[5rem]">
                Loading Data....
              </p>
            </div>
          )}
        </div>
        <TableBody columns={columns} rows={rows} loading={loading} />
      </div>

      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Table;
