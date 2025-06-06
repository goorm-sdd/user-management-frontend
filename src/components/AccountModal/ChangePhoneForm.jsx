import { useEffect, useState } from 'react';
import useAccountModalStore from '../../store/useAccountModalStore';
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import { EyeCloseIcon, EyeIcon } from "../../icons";

const ChangePhoneForm = () => {
  const [formStep, setFormStep] = useState('password');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { updateUserData, closeModal } = useAccountModalStore();

  const verifyPassword = (pw) => {
    // 임시로 'password123'을 맞는 비밀번호로 가정
    return pw === 'password123';
  };

  // 비밀번호 제출 처리
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (!password.trim()) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    
    if (!verifyPassword(password)) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    setFormStep('phone');
  };

  // 인증코드 전송 처리
  const handleSendCode = (e) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      alert('전화번호를 입력해주세요.');
      return;
    }
    
    // 전화번호 유효성 검사
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!phoneRegex.test(phone)) {
      alert('유효한 전화번호 형식이 아닙니다.');
      return;
    }
    
    alert(`${phone}로 인증코드가 전송되었습니다. (테스트용)`);
    setFormStep('verify');
  };

  // 인증코드 검증 처리
  const handleVerifySubmit = (e) => {
    e.preventDefault();
    
    if (!code.trim()) {
      alert('인증코드를 입력해주세요.');
      return;
    }
    
    // 임시로 '123456'을 맞는 인증코드로 가정
    if (code !== '123456') {
      alert('인증코드가 일치하지 않습니다.');
      return;
    }
    
    updateUserData({ phone });
    alert(`전화번호가 ${phone}으로 변경되었습니다.`);
    closeModal();
  };

  return (
    <form className="space-y-5 p-4 mt-5">
      {formStep === 'password' && (
        <>
        <h2 className="text-xl font-semibold text-gray-800">비밀번호를 입력해주세요</h2>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="현재 비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              type="submit"
              onClick={handlePasswordSubmit}
              className="w-full bg-primary text-white rounded-lg py-2 hover:bg-primary-dark transition"
            >
              확인
            </Button>
          </div>
        </>
      )}
      {formStep === 'phone' && (
        <>
          <h2 className="text-xl font-semibold text-gray-800">전화번호를 입력해주세요</h2>
          <div className="grid grid-col-1 grid-flow-col gap-3">
            <Input
              type="tel"
              value={phone}
              placeholder="010-0000-0000"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              type="submit"
              onClick={handleSendCode}
              className="w-full bg-gray-400 text-white rounded-lg"
            >
              인증코드 전송
            </Button>
          </div>
        </>
      )}
      
      {/* 3단계: 인증코드 확인 */}
      {formStep === 'verify' && (
        <>
          <h2 className="text-xl font-semibold text-gray-800">인증코드 입력</h2>
          <p className="text-sm text-gray-600">{phone} 로 전송된 인증코드를 입력하세요.</p>
          <div className="grid grid-col-1 grid-flow-col gap-3">
            <Input
              type="text"
              placeholder="인증코드 입력 (예: 123456)"
              value={code}
              maxLength={6}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerifySubmit()}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              type="submit"
              onClick={handleVerifySubmit}
              className="w-full bg-gray-400 text-white rounded-lg py-2 transition"
            >
              인증 완료
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              onClick={() => setFormStep('phone')}
              className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              이전
            </Button>
            <Button
              type="submit"
              onClick={handleVerifySubmit}
              className="w-full bg-primary text-white rounded-lg py-2 hover:bg-primary-dark transition"
            >
              확인
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default ChangePhoneForm;