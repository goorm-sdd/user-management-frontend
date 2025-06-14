import { useEffect, useState } from "react";
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
import {
  fetchDashboardUsers,
  searchUsersByEmail,
  searchUsersByName,
} from "../../../services/authService";

const DashboardTable = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [tableData, setTableData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchType, setSearchType] = useState("username");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [emailCheckFilter, setEmailCheckFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);

        let res;
        if (searchQuery) {
          if (searchType === "username") {
            res = await searchUsersByName(searchQuery, page, itemsPerPage);
          } else if (searchType === "email") {
            res = await searchUsersByEmail(searchQuery, page, itemsPerPage);
          }
        } else {
          res = await fetchDashboardUsers(page, itemsPerPage);
        }

        setTableData(res.users);
        setTotalItems(res.totalElements);
      } catch (err) {
        setError("데이터 로딩 실패");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [page, searchQuery, searchType]);

  const filteredData = tableData.filter((user) => {
    const matchesStatus =
      statusFilter === "ALL" ||
      user.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesEmailCheck =
      emailCheckFilter === "ALL" ||
      (emailCheckFilter === "True" && user.emailVerified) ||
      (emailCheckFilter === "False" && !user.emailVerified);
    const matchesSearch =
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesEmailCheck && matchesSearch;
  });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {/* 검색 드롭 다운 */}
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="dark:bg-dark-900 h-10 w-25 rounded-lg border border-gray-300 bg-transparent pl-1 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90"
          >
            <option value="username">이름 검색</option>
            <option value="email">이메일 검색</option>
          </select>

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
              placeholder={
                searchType === "username"
                  ? "회원 이름을 입력하세요"
                  : "이메일을 입력하세요"
              }
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
            <option value="Deleted">비활동</option>
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

      {loading ? (
        <div className="p-4">불러오는 중입니다...</div>
      ) : error ? (
        <div className="p-4 text-red-500">{error}</div>
      ) : (
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
              {filteredData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="px-4 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {user.username}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.phoneNumber}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={user.status === "active" ? "success" : "error"}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={user.emailVerified ? "primary" : "light"}
                    >
                      {user.emailVerified ? "True" : "False"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <button
                      onClick={() => console.log(`Edit item ${user.id}`)}
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
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
};
export default DashboardTable;
