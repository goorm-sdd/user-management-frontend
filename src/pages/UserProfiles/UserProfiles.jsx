import UserInfoCard from "../../components/UserProfile/UserInfoCard";

const UserProfiles = () => {
  return (
    <div className="lg:flex lg:items-center mx-auto">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90" x-text="pageName">내 정보</h2>
        </div>
        <div className="space-y-6">
          <UserInfoCard />
        </div>
      </div>
    </div>
  );
}
export default UserProfiles;