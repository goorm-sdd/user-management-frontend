import { useState } from 'react';
import useAccountModalStore from '../../store/useAccountModalStore';
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

const UserInfoEdit = () => {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const { openStep } = useAccountModalStore(); 
  
  const openPhoneChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openStep("change-phone");
  }

  const openPasswordChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openStep("change-password");
  };

  const openWithdraw = (e) => {
    e.preventDefault();
    openStep("withdraw");
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Handle save logic here
    console.log("Saving changes...");
    alert("변경사항이 저장되었습니다.");
  };
  return (
    <>
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                My Profile
                </h4>
            </div>
            
            <form className="flex flex-col" onSubmit={handleSave}>
                <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                    <div className="mt-5">
                        <div className="col-span-2 lg:col-span-1">
                            <Label>이름</Label>
                            <Input type="text" disabled placeholder="홍길동" />
                        </div>

                        <div className="col-span-2 lg:col-span-1 mt-5">
                            <Label>이메일 주소</Label>
                            <Input type="text" disabled placeholder="randomuser@pimjo.com" />
                        </div>
                    </div>
                    <div className="mt-7">
                        <h5 className="mb-5 text-lg border-b font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                        Account Security
                        </h5>
                        <div className="col-span-2 lg:col-span-1 mt-5">
                            <Label>전화번호</Label>
                            <div className="relative pr-32">
                                <Input
                                placeholder="010-0000-0000"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                />
                                <Button className="absolute right-0 top-0" disabled={phone.trim() === ""} onClick={openPhoneChange}>전화번호 변경</Button>
                            </div>
                        </div>
                        <div className="col-span-2 lg:col-span-1 mt-5">
                            <Label>비밀번호</Label>
                            <div className="relative pr-32">
                                <Input 
                                    type="password" 
                                    placeholder="*********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                <Button className="absolute right-0 top-0" disabled={password.trim() === ""} onClick={openPasswordChange}>비밀번호 변경</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h5 className="text-lg border-b font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    Support Access
                    </h5>

                    <div className="mt-5">
                        <div className="col-span-2 lg:col-span-1 mt-5">
                        <div className="flex items-center justify-between">
                            <Label>회원 탈퇴를 희망 합니다.</Label>
                            <Button className="bg-gray-300 hover:bg-gray-500" onClick={openWithdraw}>회원 탈퇴</Button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end"></div>
            </form>
        </div>
        <Button className="w-full" onClick={handleSave}>저장</Button>
    </>
  );
}
export default UserInfoEdit;