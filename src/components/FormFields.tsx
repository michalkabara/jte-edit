import { useEffect, useState } from "react";

import { Form } from "../App";
import { TextField } from "@mui/material";

export const FormFields = () => {
  const [formDetails, setFormDetails] = useState<Form | undefined>();
  const [fetchingData, setFetchingData] = useState<boolean>(true);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(
          "https://apiv2.jte.io/api/public/app/oees2024.jte.io/e09d4a7f-0630-4122-a520-07af2c25112e"
        );
        const data = await response.json();
        setFormDetails(data);
        setFetchingData(false);
        console.log(formDetails);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFormData();
  }, []);

  if (fetchingData) {
    return <p>Loading fields...</p>;
  }

  const camelToFlat = (camel: string) => {
    const camelCase = camel.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

    let flat = "";

    camelCase.forEach((word) => {
      flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    return flat;
  };

  return (
    <div className="flex flex-col gap-7 w-[800px]">
      {formDetails?.fields.map((field) => (
        <TextField
          key={field.fieldName}
          defaultValue={field.fieldValue}
          variant="outlined"
          size="medium"
          fullWidth
          label={camelToFlat(field.fieldName).replaceAll("-", " ")}
        />
      ))}
    </div>
  );
};
