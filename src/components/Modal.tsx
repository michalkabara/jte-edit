import { Button } from "@mui/material";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { ModalRef } from "../types";

const Modal = forwardRef<ModalRef>(function Modal(_, ref) {
  const dialog = useRef<HTMLDialogElement>();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current?.showModal();
      },
      close: () => {
        dialog.current?.close();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      <div className="p-8 text-center">
        <p className="mb-5">Twoje dane zostały zapisane.</p>
        <Button color="info" onClick={() => dialog.current?.close()} variant="contained">
          OK
        </Button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
