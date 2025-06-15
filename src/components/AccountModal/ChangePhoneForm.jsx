import { useState } from 'react';
import useAccountModalStore from '../../store/useAccountModalStore';
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import {
  verifyPassword,
  sendVerificationCode,
  verifyCode,
  verifyPhoneCodeAndChangeNumber,
} from '../../services/authService';

const ChangePhoneForm = () => {
  const [formStep, setFormStep] = useState('password');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { updateUserData, closeModal } = useAccountModalStore();

  // 1단계: 비밀번호 인증
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) return alert('비밀번호를 입력해주세요.');

    try {
      const response = await verifyPassword({ password });
      const reauthToken = response.data.data.reauthToken;
      sessionStorage.setItem('reauthToken', reauthToken);
      setFormStep('phone');
    } catch (err) {
      alert(err.response?.data?.message || '비밀번호 인증에 실패했습니다.');
    }
  };

  // 2단계: 인증코드 전송
  const handleSendCode = async (e) => {
    e.preventDefault();
    const phoneRegex = /^010\d{8}$/;
    if (!phoneRegex.test(phone)) {
      return alert('전화번호는 010으로 시작하는 11자리 숫자여야 합니다.');
    }

    try {
      await sendVerificationCode(phone);
      alert(`${phone}로 인증코드를 전송했습니다.`);
      setFormStep('verify');
    } catch (err) {
      alert(err.response?.data?.message || '인증코드 전송에 실패했습니다.');
    }
  };

  // 3단계: 인증코드 확인 및 변경 요청
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return alert('인증코드를 입력해주세요.');

    const reauthToken = sessionStorage.getItem('reauthToken');
      if (!reauthToken) {
      alert('인증이 만료되었습니다. 다시 시도해주세요.');
      return setFormStep('password');
    }

    try {
      await verifyCode({ phoneNumber: phone, code });

      await verifyPhoneCodeAndChangeNumber({ phoneNumber: phone, reauthToken });

      alert(`전화번호가 ${phone}으로 변경되었습니다.`);
      updateUserData({ phone });
      sessionStorage.removeItem('reauthToken');
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || '전화번호 변경에 실패했습니다.');
    }
  };

  return (
    <form className="space-y-5 p-4 mt-5">
      {formStep === 'password' && (
        <>
          <h2 className="text-xl font-semibold text-gray-800">비밀번호를 입력해주세요</h2>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="현재 비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <EyeIcon className="size-5" /> : <EyeCloseIcon className="size-5" />}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button onClick={closeModal} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
              취소
            </Button>
            <Button onClick={handlePasswordSubmit} className="bg-primary text-white hover:bg-primary-dark">
              확인
            </Button>
          </div>
        </>
      )}

      {formStep === 'phone' && (
        <>
          <h2 className="text-xl font-semibold text-gray-800">전화번호 입력</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              type="tel"
              placeholder="01012345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <Button onClick={handleSendCode} className="bg-gray-400 text-white">
              인증코드 전송
            </Button>
          </div>
        </>
      )}

      {formStep === 'verify' && (
        <>
          <h2 className="text-xl font-semibold text-gray-800">인증코드 확인</h2>
          <p className="text-sm text-gray-600">{phone}로 전송된 인증코드를 입력해주세요.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              type="text"
              placeholder="인증코드 (예: 123456)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <Button onClick={handleVerifySubmit} className="bg-primary text-white hover:bg-primary-dark">
              인증 완료
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default ChangePhoneForm;
