import "./App.css";
import { FieldType, ModalRef } from "./types";
import { FormFields } from "./components/FormFields";
import Modal from "./components/Modal";
import { useRef } from "react";
import { Button } from "@mui/material";

export interface Field {
  fieldName: "string";
  fieldValue: "string";
  fieldType: FieldType;
  isMergeField: boolean;
}

export interface Form {
  id: "string";
  fields: Field[];
}

function App() {
  const modal = useRef<ModalRef>();

  const handleSaveValues = () => {
    modal.current?.open();
  };

  return (
    <>
      <Modal ref={modal} />

      <FormFields />
      <div className="mt-6">
        <Button onClick={handleSaveValues} size="large" variant="contained" color="success" className="normal-case">
          Zapisz
        </Button>
      </div>
    </>
  );
}

export default App;
