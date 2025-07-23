import { useState } from "react";
import { CustomText } from "../components/CustomText";
import Table from "../components/Table";
import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import { PaginatedUsersResponse, User } from "../utils/types";
import { useGetData } from "../lib/apiCalls";

const UsersDashboard = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 4,
  });

  const { data: userData, isLoading } = useGetData<
    PaginatedUsersResponse<User>
  >({
    url: `/users?page=${pagination.pageIndex}&limit=${pagination.pageSize}`,
    queryKey: ["GetAllStatesTable", JSON.stringify(pagination)],
  });

  const columnHelper = createColumnHelper<User>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Full name",
      cell: (info) => {
        return (
          <div className="flex">
            <div className="">
              <CustomText variant="body" className="">
                {info.getValue()}
              </CustomText>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("email", {
      header: "Email Address",
      cell: (info) => {
        return (
          <div className="">
            <CustomText variant="textSm" className=" whitespace-pre-wrap">
              {info.getValue()}
            </CustomText>
          </div>
        );
      },
    }),
    columnHelper.accessor("address", {
      header: "Address",
      cell: (info) => {
        const address = info.getValue();
        const formatted = `${address?.street}, ${address?.state}, ${address?.city}, ${address?.zipcode}`;
        return (
          <div className="w-[392px] truncate">
            <CustomText
              variant="textSm"
              className="whitespace-nowrap overflow-hidden text-ellipsis block"
            >
              {formatted}
            </CustomText>
          </div>
        );
      },
    }),
    columnHelper.accessor("username", {
      header: "Username",
      cell: (info) => {
        return (
          <div className="">
            <CustomText variant="textSm" className="">
              {info.getValue()}
            </CustomText>
          </div>
        );
      },
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => {
        return (
          <div className="">
            <CustomText variant="textSm" className="">
              {info.getValue()}
            </CustomText>
          </div>
        );
      },
    }),
  ];

  const sortedData = userData?.data
    ?.slice()
    .sort((a: User, b: User) => a?.name.localeCompare(b.name));

  return (
    <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8 md:mt-16 lg:mt-32">
      <CustomText variant="displayXL">Users</CustomText>

      <main className="mt-4 md:mt-6 overflow-x-auto">
        <div className="min-w-[300px]">
          <Table
            data={sortedData || []}
            columns={columns}
            isLoading={isLoading}
            pagination={pagination}
            rowCount={userData?.total || 0}
            setPagination={setPagination}
          />
        </div>
      </main>
    </div>
  );
};

export { UsersDashboard };
