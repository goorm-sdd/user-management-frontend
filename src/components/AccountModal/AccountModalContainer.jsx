import ChangePhoneForm from "./ChangePhoneForm";
import ChangePasswordForm from "./ChangePasswordForm";
import WithdrawForm from "./WithdrawForm";
import useAccountModalStore from '../../store/useAccountModalStore';

const AccountModalContainer = () => {
  console.log("!!!")
  const { step } = useAccountModalStore();

  if (!step) return null;

  switch (step) {
    case "change-phone":
      return <ChangePhoneForm />;
    case "change-password":
      return <ChangePasswordForm />;
    case "withdraw":
      return <WithdrawForm />;
  }
};

export default AccountModalContainer;