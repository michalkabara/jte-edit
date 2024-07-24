import "./App.css";
import { FieldType } from "./types";
import { FormFields } from "./components/FormFields";
import Modal from "./components/Modal";
import { useState } from "react";
import { Button } from "@mui/material";
import { Header } from "./components/Header";
import { Login } from "./components/Login";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [regId, setRegId] = useState("");
  const [eventURL, setEventURL] = useState("");

  const handleSaveValues = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    setIsLogged(true);
  };

  return (
    <>
      {!isLogged && <Login handleLogin={handleLogin} setRegId={setRegId} setEventURL={setEventURL} />}

      {isLogged && (
        <>
          <Header />
          <Modal onClose={handleCloseModal} open={isModalOpen} />

          <FormFields regId={regId} eventURL={eventURL} handleSaveValues={handleSaveValues} />
        </>
      )}
    </>
  );
}

export default App;
