import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

const AlertModal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
}) => {

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <div className="flex flex-col items-center p-4 pb-6">
          <div className="min-w-[50px] h-[95px] flex justify-center items-center rounded-[8px]">
            <InfoIcon color="#FB3748" size={60} />
          </div>

          <DialogHeader className="pb-2">
            <DialogTitle className="text--primaryText text-center font-semibold tracking-[-0.3px] text-[2rem]">
              {title}
            </DialogTitle>

            <DialogDescription className="text-base text-center text-lightText tracking-[-0.2px] pb-6 font-normal">
              {description}
            </DialogDescription>

            <Link to="/login" onClick={() => onClose()} className="inline-block mt-4 w-full rounded-lg py-3 bg-skyBlue text-white text-center hover:scale-[1.02] duration-500">Login</Link>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;
