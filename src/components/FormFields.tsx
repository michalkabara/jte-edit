import { useEffect, useState } from "react";

import { Form } from "../App";
import { Button, TextField } from "@mui/material";

export const FormFields: React.FC<{ regId: string; eventURL: string; handleSaveValues: () => void }> = ({
  regId,
  eventURL,
  handleSaveValues,
}) => {
  const [formDetails, setFormDetails] = useState<Form | undefined>();
  const [fetchingData, setFetchingData] = useState<boolean>(true);
  const [error, setError] = useState(null);

  // "https://apiv2.jte.io/api/public/app/oees2024.jte.io/e09d4a7f-0630-4122-a520-07af2c25112e"

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}${eventURL}/${regId}`);
        const data = await response.json();
        setFormDetails(data);
        setFetchingData(false);
        console.log(formDetails);
      } catch (error) {
        setError(error);
        setFetchingData(false);
        console.log(error);
      }
    };

    fetchFormData();
  }, []);

  if (fetchingData) {
    return <p>Ładowanie danych</p>;
  }

  const camelToFlat = (camel: string) => {
    const camelCase = camel.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

    let flat = "";

    camelCase.forEach((word) => {
      flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    return flat;
  };

  const handleReloadAndRemoveParams = () => {
    const clearURL = window.location.href.split("?")[0];
    window.history.pushState({}, null, clearURL);
    location.reload();
  };

  return (
    <div className="flex flex-col gap-7 sm:w-2/5 px-5 m-auto mt-8 top-0">
      {formDetails?.fields.map((field) => (
        <TextField
          key={field.fieldName}
          defaultValue={field.fieldValue}
          variant="outlined"
          fullWidth
          label={camelToFlat(field.fieldName).replaceAll("-", " ")}
        />
      ))}
      {error && <p>Zły adres wydarzenia lub id rejestracji</p>}
      <div className="flex flex-row gap-5 m-auto">
        {!error && (
          <Button onClick={handleSaveValues} size="large" variant="contained" color="success" className="normal-case">
            Zapisz
          </Button>
        )}
        <Button
          onClick={handleReloadAndRemoveParams}
          size="large"
          variant="contained"
          color="warning"
          className="normal-case"
        >
          Wróć
        </Button>
      </div>
    </div>
  );
};
