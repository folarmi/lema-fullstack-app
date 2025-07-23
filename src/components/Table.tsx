/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
import { CustomText } from "./CustomText";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { Loader } from "./Loader";
import { User } from "../utils/types";

interface TableProps {
  data: User[];
  columns: any[];
  isLoading: boolean;
  rowCount?: number;
  pagination?: any;
  setPagination?: (pagination: any) => void;
  emptyState?: React.ReactNode; // Add emptyState prop
}

const Table = ({
  data,
  columns,
  isLoading,
  rowCount,
  pagination,
  setPagination,
  emptyState,
}: TableProps) => {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount,
    state: {
      pagination,
    },
  });

  const navigate = useNavigate();

  // Default empty state component
  const defaultEmptyState = (
    <div className="text-center py-8 text-neutral_11">No data available</div>
  );

  return (
    <section>
      {isLoading ? (
        <div className="text-center py-4">
          <Loader />
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-2xl border border-gray_200 pt-4">
            <table className="w-full  ">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left text-gray_600 font-medium text-xs px-6 whitespace-nowrap py-2"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="cursor-pointer">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          onClick={() =>
                            navigate(`/user/${row.original.id}/posts`)
                          }
                          className="px-6 whitespace-nowrap border-b border-gray_200 py-7"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  // Empty state row that spans all columns
                  <tr>
                    <td colSpan={columns.length} className="py-8">
                      {emptyState || defaultEmptyState}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Only show pagination if there's data */}

          {data && (
            <div className="mt-6 flex items-center justify-end gap-3">
              <div
                className="flex items-center"
                onClick={() => table.previousPage()}
              >
                <img src={leftArrow} aria-label="Previous Page" />
                <CustomText variant="textSemiBold" className="pl-2">
                  Previous
                </CustomText>
              </div>

              <div className="flex items-center gap-2 mx-8">
                {Array.from({ length: table.getPageCount() }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => table.setPageIndex(i)}
                    className={clsx(
                      "px-3 py-1 rounded-lg text-sm font-medium h-10 w-10",
                      table.getState().pagination.pageIndex === i
                        ? "bg-brand_50 text-brand_600"
                        : " text-gray_500"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div
                className="flex items-center cursor-pointer"
                onClick={() => table.nextPage()}
              >
                <CustomText variant="textSemiBold" className="pr-2">
                  Next
                </CustomText>
                <img
                  src={rightArrow}
                  onClick={() => table.previousPage()}
                  aria-label="Previous Page"
                />
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Table;
{
  /* <button
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Previous Page"
              >
                {"<"}
              </button> */
}
{
  /* <button
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Next Page"
              >
                {">"}
              </button> */
}
