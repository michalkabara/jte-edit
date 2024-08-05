import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ModalType } from "../types";

const Modal: React.FC<ModalType> = ({ open, onClose, text, onAccept, acceptText }) => {
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
        <div className="mb-5">{text}</div>
        <div className="flex flex-row gap-5 justify-center">
          <Button color="success" onClick={onAccept} variant="contained">
            {acceptText}
          </Button>
          {onClose && (
            <Button color="error" onClick={onClose} variant="contained">
              Nie
            </Button>
          )}
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
