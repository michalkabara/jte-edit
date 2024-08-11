import "./App.css";
import { Form } from "./components/Form";
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
  const [isLogged, setIsLogged] = useState(false);
  const [regId, setRegId] = useState(urlDetails[2]);
  const [eventURL, setEventURL] = useState(urlDetails[1]);

  useEffect(() => {
    if (regId !== undefined && eventURL !== undefined) {
      handleLogin();
    }
  }, []);

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
          <Form regId={regId} eventURL={eventURL} />
        </>
      )}
    </>
  );
}

export default App;
