import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import Pagination from "../../ui/pagination/pagination";

// Define the table data using the interface
const tableData = [
  {
    id: 1,
    user: {
      name: "user1",
      role: "USER",
    },
    Email: "user1@user.com",
    PhoneNumber: "010-1111-1111",
    EmailCheck: "True",
    status: "Delete",
  },
  {
    id: 2,
    user: {
      name: "user2",
      role: "USER",
    },
    Email: "user2@user.com",
    PhoneNumber: "010-2222-2222",
    EmailCheck: "False",
    status: "Active",
  },
  {
    id: 3,
    user: {
      name: "user3",
      role: "USER",
    },
    Email: "user3@user.com",
    PhoneNumber: "010-3333-3333",
    EmailCheck: "True",
    status: "Active",
  },
  {
    id: 4,
    user: {
      name: "user4",
      role: "USER",
    },
    Email: "user4@user.com",
    PhoneNumber: "010-4444-4444",
    EmailCheck: "False",
    status: "Delete",
  },
  {
    id: 5,
    user: {
      name: "user5",
      role: "USER",
    },
    Email: "user5@user.com",
    PhoneNumber: "010-5555-5555",
    EmailCheck: "True",
    status: "Active",
  },
  {
    id: 6,
    user: {
      name: "user6",
      role: "USER",
    },
    Email: "user6@user.com",
    PhoneNumber: "010-6666-6666",
    EmailCheck: "False",
    status: "Active",
  },
  {
    id: 7,
    user: {
      name: "user7",
      role: "USER",
    },
    Email: "user7@user.com",
    PhoneNumber: "010-7777-7777",
    EmailCheck: "True",
    status: "Delete",
  },
  {
    id: 8,
    user: {
      name: "user8",
      role: "USER",
    },
    Email: "user8@user.com",
    PhoneNumber: "010-8888-8888",
    EmailCheck: "True",
    status: "Active",
  },
  {
    id: 9,
    user: {
      name: "user9",
      role: "USER",
    },
    Email: "user9@user.com",
    PhoneNumber: "010-9999-9999",
    EmailCheck: "True",
    status: "Active",
  },
  {
    id: 10,
    user: {
      name: "user10",
      role: "USER",
    },
    Email: "user10@user.com",
    PhoneNumber: "010-1010-1010",
    EmailCheck: "True",
    status: "Delete",
  },
  {
    id: 11,
    user: {
      name: "user11",
      role: "USER",
    },
    Email: "user11@user.com",
    PhoneNumber: "010-1001-10001",
    EmailCheck: "True",
    status: "Active",
  },
];

const DashboardTable = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [emailCheckFilter, setEmailCheckFilter] = useState("ALL");

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = tableData.filter((item) => {
    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;
    const matchesEmailCheck =
      emailCheckFilter === "ALL" || item.EmailCheck === emailCheckFilter;
    const matchesSearch =
      item.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.user.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesEmailCheck && matchesSearch;
  });

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {/* 검색 입력 */}
          <div className="relative">
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none left-4 top-1/2 dark:text-gray-400">
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                  fill=""
                ></path>
              </svg>
            </span>
            <input
              type="text"
              placeholder="이메일 또는 이름 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-20 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 ">
          {/* 상태 필터 */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="dark:bg-dark-900 h-10 w-20 rounded-lg border border-gray-300 bg-transparent pl-1 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90"
          >
            <option value="ALL">전체 상태</option>
            <option value="Active">활동</option>
            <option value="Delete">비활동</option>
          </select>

          {/* 이메일 인증 필터 */}
          <select
            value={emailCheckFilter}
            onChange={(e) => setEmailCheckFilter(e.target.value)}
            className="dark:bg-dark-900 h-10 w-30 rounded-lg border border-gray-300 bg-transparent pl-1 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90 "
          >
            <option value="ALL">전체 인증 상태</option>
            <option value="True">인증</option>
            <option value="False">미인증</option>
          </select>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                회원 이름
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                이메일
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                전화번호
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                상태
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                이메일 인증 여부
              </TableCell>
              <TableCell
                isHeader
                className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                삭제
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {currentPageData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-4 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {order.user.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {order.user.role}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.Email}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.PhoneNumber}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={order.status === "Active" ? "success" : "error"}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={order.EmailCheck === "True" ? "primary" : "light"}
                  >
                    {order.EmailCheck}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <button
                    onClick={() => console.log(`Edit item ${order.id}`)}
                    className="hover:text-blue-500 transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          currentPage={page}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};
export default DashboardTable;
