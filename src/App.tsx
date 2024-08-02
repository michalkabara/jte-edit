import "./App.css";
import { FormFields } from "./components/FormFields";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Field } from "./types";

export interface Form {
  id: "string";
  fields: Field[];
}

const urlDetails = window.location.pathname.split("/");

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [regId, setRegId] = useState(urlDetails[2]);
  const [eventURL, setEventURL] = useState(urlDetails[1]);

  useEffect(() => {
    if (regId !== undefined && eventURL !== undefined) {
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
    // urlParams.set("url", eventURL);
    // urlParams.set("id", regId);
    const urlWithParams = `${window.location.origin}/${eventURL}/${regId}`;
    window.history.pushState({}, null, urlWithParams);
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
