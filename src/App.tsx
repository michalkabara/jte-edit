import "./App.css";
import { FieldType } from "./types";
import { FormFields } from "./components/FormFields";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
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

const urlParams = new URLSearchParams(window.location.search);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [regId, setRegId] = useState(urlParams.get("id"));
  const [eventURL, setEventURL] = useState(urlParams.get("url"));

  useEffect(() => {
    console.log(urlParams.get("url"));
    console.log(urlParams.get("id"));
    if (regId !== null && eventURL !== null) {
      handleLogin();
    }
  }, []);

  const handleSaveValues = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    setIsLogged(true);
    urlParams.set("url", eventURL);
    urlParams.set("id", regId);
    // window.location.search = urlParams;
    window.history.pushState({}, null, `?${urlParams}`);
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
