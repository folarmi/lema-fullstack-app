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
          <div className="overflow-x-auto rounded-2xl border border-gray_200 pt-4">
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
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                className="flex items-center cursor-pointer"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <img src={leftArrow} aria-label="Previous Page" />
                <CustomText variant="textSemiBold" className="pl-2">
                  Previous
                </CustomText>
              </button>

              <div className="flex items-center gap-1 mx-2 sm:mx-4 flex-wrap justify-center">
                {/* Always show first page */}
                <button
                  onClick={() => table.setPageIndex(0)}
                  className={clsx(
                    "px-3 py-1 rounded-lg text-sm font-medium h-10 w-10",
                    table.getState().pagination.pageIndex === 0
                      ? "bg-brand_50 text-brand_600"
                      : "text-gray_500"
                  )}
                >
                  1
                </button>

                {/* Show ellipsis if current page is far from start */}
                {table.getState().pagination.pageIndex > 2 && (
                  <span className="px-2 text-gray-500">...</span>
                )}

                {/* Show pages around current page */}
                {Array.from({ length: table.getPageCount() }, (_, i) => {
                  if (
                    i > 0 && // Skip first page (already shown)
                    i < table.getPageCount() - 1 && // Skip last page (will be shown)
                    Math.abs(i - table.getState().pagination.pageIndex) <= 1 // Show nearby pages
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => table.setPageIndex(i)}
                        className={clsx(
                          "px-3 py-1 rounded-lg text-sm font-medium h-10 w-10",
                          table.getState().pagination.pageIndex === i
                            ? "bg-brand_50 text-brand_600"
                            : "text-gray_500"
                        )}
                      >
                        {i + 1}
                      </button>
                    );
                  }
                  return null;
                })}

                {/* Show ellipsis if current page is far from end */}
                {table.getState().pagination.pageIndex <
                  table.getPageCount() - 3 && (
                  <span className="px-2 text-gray-500">...</span>
                )}

                {/* Always show last page */}
                {table.getPageCount() > 1 && (
                  <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    className={clsx(
                      "px-3 py-1 rounded-lg text-sm font-medium h-10 w-10",
                      table.getState().pagination.pageIndex ===
                        table.getPageCount() - 1
                        ? "bg-brand_50 text-brand_600"
                        : "text-gray_500"
                    )}
                  >
                    {table.getPageCount()}
                  </button>
                )}
              </div>

              <button
                className="flex items-center cursor-pointer"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <CustomText variant="textSemiBold" className="pr-2">
                  Next
                </CustomText>
                <img src={rightArrow} aria-label="Next Page" />
              </button>
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
