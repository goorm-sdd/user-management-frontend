import { useState } from 'react';
import useAccountModalStore from '../../store/useAccountModalStore';
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import { EyeCloseIcon, EyeIcon } from "../../icons";

const WithdrawForm = () => {
  const [formStep, setFormStep] = useState('withdraw')
  const [showPassword, setShowPassword] = useState(false);;
  const { closeModal } = useAccountModalStore();
  const [password, setPassword] = useState('');

  const handleWithdrawSubmit = () => {
    if (!password.trim()) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    setFormStep('complete');
  };

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    setFormStep('confirm');
  };
  
  const handleComplete = (e) => {
    e.preventDefault();
    alert('회원 탈퇴가 완료되었습니다.');
    closeModal();
  }
  return (
    <div className="p-4 mt-5">
    {formStep === 'withdraw' && (
      <div className="space-y-5">
        <h2 className="text-xl font-semibold text-red-600">회원 탈퇴 안내</h2>
        <p className="text-sm text-gray-600">정말로 계정을 삭제하시겠습니까?</p>
        <div className="">
          <Button
            type="submit"
            onClick={handleConfirmSubmit}
            className="w-full mt-5 bg-red-600 text-white rounded-lg py-2 hover:bg-red-700 transition"
          >
            탈퇴하기
          </Button>
        </div>
      </div>
    )}
      { formStep === 'confirm' && (
        <>
          <h2 className="text-xl font-semibold text-red-600 mb-4">회원 탈퇴</h2>
          <p className="text-gray-600 mb-4">
            회원 탈퇴를 위해 비밀번호를 입력해주세요.
            <br />
            <span className="text-red-500 text-sm">탈퇴 후 모든 데이터는 복구할 수 없습니다.</span>
          </p>
          <div className="space-y-4">
          <div className="relative">
            <Input
              placeholder="비밀번호를 입력하세요"
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleWithdrawSubmit()}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                onClick={closeModal}
                className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                취소
              </Button>
              <Button
                onClick={handleWithdrawSubmit}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                탈퇴하기
              </Button>
            </div>
          </div>
        </>
      )}
      {formStep === 'complete' && (
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-green-600 text-2xl">✓</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">탈퇴 완료</h2>
          <p className="text-gray-600 mb-6">
            회원 탈퇴가 완료되었습니다.
            <br />
            그동안 이용해 주셔서 감사합니다.
          </p>
          <Button onClick={handleComplete} className="w-full">
            확인
          </Button>
        </div>
      )}
    </div>
  );
};
export default WithdrawForm;