import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface DeleteNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

const DeleteModal: React.FC<DeleteNoteModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    };

    return ( 
        <Modal
        title="Delete Note"
        description="Are you sure you want to permanently delete this note? This action cannot be undone."
        isOpen={isOpen}
        onClose={onClose}
        isDeleteModal={true}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full" >
                <Button
                    disabled={loading}
                    variant={"outline"}
                    className="bg-[#F3F5F8]"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    disabled={loading}
                    className="bg-[#FB3748] hover:bg-[#e23241]"
                    onClick={onConfirm}
                >
                    Delete Note
                </Button>
            </div>
        </Modal>
     );
}
 
export default DeleteModal;