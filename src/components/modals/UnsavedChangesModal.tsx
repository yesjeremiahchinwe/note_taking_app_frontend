import { Button } from "../ui/button";
import { Modal } from "../ui/modal";

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSaving: boolean;
  onDiscard: () => void;
  onProceed: () => void;
}

const UnsavedChangesModal = ({
  isOpen,
  onClose,
  isSaving,
  onDiscard,
  onProceed,
}: UnsavedChangesModalProps) => {
  return (
    <Modal
      title="Unsaved Changes"
      description="You have unsaved changes. Are you sure you want to leave without saving?"
      isOpen={isOpen}
      onClose={onClose}
      modalType="saveChanges"
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          disabled={isSaving}
          variant={"outline"}
          className="bg-lightGray dark:bg-grayBorder"
          onClick={onDiscard}
        >
          Discard
        </Button>

        <Button
          disabled={isSaving}
          className="bg-skyBlue text-white hover:bg-[#3053df]"
          onClick={onProceed}
        >
          {isSaving ? "Saving..." : "Save & Leave"}
        </Button>
      </div>
    </Modal>
  );
};

export default UnsavedChangesModal;
