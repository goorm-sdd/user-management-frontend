import { Modal } from "../ui/modal";
import useAccountModalStore from '../../store/useAccountModalStore';
import AccountModalContainer from "./AccountModalContainer";

const AccountModal = () => {
  const { isOpen, closeModal, resetModal } = useAccountModalStore();
  
  const handleClose = () => {
    closeModal();
    // setTimeout(resetModal, 300); // 애니메이션 후 리셋
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-lg p-6">
      <AccountModalContainer />
    </Modal>
  );
};

export default AccountModal;