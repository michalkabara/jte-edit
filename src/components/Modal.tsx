import { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ModalType } from "../types";

const Modal: React.FC<ModalType & PropsWithChildren> = ({ open, onClose, children }) => {
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
      <div className="p-8 text-center">{children}</div>
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
