import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const dialog = useRef<HTMLDialogElement>();

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal sm:w-1/3" ref={dialog} onClose={onClose}>
      <div className="p-8 text-center">
        <p className="mb-5">Twoje dane zostały zapisane.</p>
        <Button color="info" onClick={onClose} variant="contained">
          OK
        </Button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
