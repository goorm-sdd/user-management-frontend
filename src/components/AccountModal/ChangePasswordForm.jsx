import { useState } from 'react';
import useAccountModalStore from '../../store/useAccountModalStore';
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import { verifyPassword } from "../../services/authService";

const ChangePasswordForm = () => {
  const [formStep, setFormStep] = useState('current');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [verify, setVerify] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
  const { updateUserData, closeModal } = useAccountModalStore();

  const handleCurrentPasswordSubmit = async (e) => {
      e.preventDefault();

      if (!verify.trim()) {
        alert('현재 비밀번호를 입력해주세요.');
        return;
      }

      try {
        const response = await verifyPassword({ password: verify });
        const reauthToken = response.data.data.reauthToken;

        sessionStorage.setItem("reauthToken", reauthToken); // 인증 토큰 저장
        setFormStep('new');
      } catch (error) {
        const message = error.response?.data?.message || '비밀번호 인증에 실패했습니다.';
        alert(message);
      }
    };
    
  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();

    if (!password.trim() || !confirm.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    if (password !== confirm) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }

    // 실제 변경 API 호출은 아직 연결 전 (updateUserData는 임시)
    updateUserData({ password });
    alert('비밀번호가 변경되었습니다.');
    closeModal();
  };


  return (
    <div className="space-y-5 p-4 mt-5">
      <h2 className="text-xl font-semibold text-gray-800">비밀번호 변경</h2>

      {formStep === 'current' ? (
        <div className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="현재 비밀번호 확인"
              value={verify}
              onChange={(e) => setVerify(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
              onClick={handleCurrentPasswordSubmit}
              className="w-full bg-primary text-white rounded-lg py-2 hover:bg-primary-dark transition"
            >
              확인
            </Button>
          </div>
      </div>
      ) : (
        <>
          <div className="relative">
            <Input
              type="password"
              placeholder="새 비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showNewPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </span>
          </div>
          <div className="relative">
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span
              onClick={() => setShowNewPasswordConfirm(!showNewPasswordConfirm)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showNewPasswordConfirm ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              onClick={() => setFormStep('current')}
              className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              이전
            </Button>
            <Button
              onClick={handleNewPasswordSubmit}
              className="w-full bg-primary text-white rounded-lg py-2 hover:bg-primary-dark transition"
            >
              변경하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChangePasswordForm;