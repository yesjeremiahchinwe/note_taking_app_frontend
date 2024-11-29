import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconArchive, IconDelete } from "@/lib/icons";

interface ModalProps {
  title: string;
  description: string;
  isDeleteModal: boolean;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isDeleteModal,
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>

        <div className="flex items-start gap-5 p-6 pr-0 pb-0">
        <div className="bg-[#F3F5F8] min-w-[50px] h-[45px] flex justify-center items-center rounded-[8px]">
            {isDeleteModal ? <IconDelete /> : <IconArchive color="#2B303B" />}
          </div>
        
        <DialogHeader className="pb-2">
            <DialogTitle className="text-[#0E121B] font-semibold tracking-[-0.3px]">
              {title}
            </DialogTitle>

            <DialogDescription className="text-sm max-w-[85%] text-[#2B303B] tracking-[-0.2px] font-normal">
              {description}
            </DialogDescription>
        </DialogHeader>
        </div>

        <div className="border-t-[1px] border-[##E0E4EA] p-6 pt-0">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
