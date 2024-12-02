import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface ArchiveNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

const ArchiveNoteModal: React.FC<ArchiveNoteModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }


    return ( 
        <Modal
        title="Archive Note"
        description="Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
        isOpen={isOpen}
        onClose={onClose}
        isDeleteModal={false}
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
                    className="bg-[#335CFF] hover:bg-[#3053df]"
                    onClick={onConfirm}
                >
                    Archive Note
                </Button>
            </div>
        </Modal>
     );
}
 
export default ArchiveNoteModal;