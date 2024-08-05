import "./App.css";
import { Form } from "./components/Form";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { FieldType } from "./types";

export interface Form {
  id: "string";
  fields: FieldType[];
}

const urlDetails = window.location.pathname.split("/");

function App() {
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    text: "",
    acceptText: "OK",
    onAccept: () => {},
  });
  const [isLogged, setIsLogged] = useState(false);
  const [regId, setRegId] = useState(urlDetails[2]);
  const [eventURL, setEventURL] = useState(urlDetails[1]);

  useEffect(() => {
    if (regId !== undefined && eventURL !== undefined) {
      handleLogin();
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen((prev) => ({ ...prev, isOpen: false }));
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
          <Modal
            onClose={handleCloseModal}
            onAccept={isModalOpen.onAccept}
            open={isModalOpen.isOpen}
            text={isModalOpen.text}
            acceptText={isModalOpen.acceptText}
          />
          <Form regId={regId} eventURL={eventURL} setIsModalOpen={setIsModalOpen} />
        </>
      )}
    </>
  );
}

export default App;
