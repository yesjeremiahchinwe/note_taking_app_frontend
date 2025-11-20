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
  // onClose,
  children,
}) => {
  // const onChange = (open: boolean) => {
  //   if (!open) {
  //     onClose();
  //   }
  // };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <div className="flex items-start gap-5 p-4 sm:p-6 pr-0 pb-0">
          <div className="min-w-[50px] bg-lightGray dark:bg-grayBorder h-[45px] flex justify-center items-center rounded-[8px]">
            {isDeleteModal 
            ? <IconDelete color="currentColor" /> 
            : <IconArchive color="currentColor"  />
            }
          </div>

          <DialogHeader className="pb-2">
            <DialogTitle className="text-primaryText pb-2 font-semibold tracking-[-0.3px]">
              {title}
            </DialogTitle>

            <DialogDescription className="text-sm max-w-[85%] text-lightText tracking-[-0.2px] font-normal">
              {description}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="border-t-[1px] border-darkerGray darK:border-grayBorder p-4 pb-5 pt-0">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
