import { Button, TextField } from "@mui/material";
import jteLogo from "../img/jointoevent.png";
import { ChangeEvent } from "react";

export const Login: React.FC<{
  handleLogin: () => void;
  setRegId: (id: string) => void;
  setEventURL: (eventURL: string) => void;
}> = ({ handleLogin, setRegId, setEventURL }) => {
  const handleChangeId = (event: ChangeEvent<HTMLInputElement>) => {
    setRegId(event.target.value);
  };

  const handleChangeEventURL = (event: ChangeEvent<HTMLInputElement>) => {
    setEventURL(event.target.value);
  };

  return (
    <div className="flex flex-col gap-5">
      <img src={jteLogo} alt="" className="w-[200px] m-auto" />

      <form action="" className="flex flex-col gap-5 sm:w-full md:w-2/5 w-full m-auto px-5">
        <TextField required variant="outlined" fullWidth label="Adres URL wydarzenia" onChange={handleChangeEventURL} />
        <TextField required variant="outlined" fullWidth label="Numer ID rejestracji" onChange={handleChangeId} />
        <div>
          <Button size="large" variant="contained" color="success" className="normal-case" onClick={handleLogin}>
            Prześlij
          </Button>
        </div>
      </form>
    </div>
  );
};
