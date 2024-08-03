import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Module, Field, FieldValue } from "../types";
import { useFetchFormData } from "../hooks/useFetchFormData";
import { handleReloadAndRemoveParams, updateData } from "../utils";
import { useFetchFormFields } from "../hooks/useFetchFormFields";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export const FormFields: React.FC<{ regId: string | null; eventURL: string | null; handleSaveValues: () => void }> = ({
  regId,
  eventURL,
  handleSaveValues,
}) => {
  const queryClient = useQueryClient();
  const { isPending, error, data } = useFetchFormData(eventURL, regId);
  const { isPending: formFieldsPending, error: formFieldsError, data: formFields } = useFetchFormFields(eventURL);

  const { mutate: updateFormValues } = useMutation({
    mutationFn: (newData: { fields: FieldValue[] }) =>
      updateData(`${import.meta.env.VITE_API_URL}${eventURL}/${regId}`, newData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["fieldsData"]);
    },
  });

  if (isPending || formFieldsPending) return <p>Loading...</p>;

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formEntries = Object.fromEntries(formData);
    handleSaveValues();
    const updatedEntries = Object.entries(formEntries).map((entry) => ({ fieldName: entry[0], fieldValue: entry[1] }));

    const fields = data.fields
      .map((field: FieldValue) => {
        const newFieldValue = updatedEntries.find((newField) => newField.fieldName === field.fieldName);

        if (
          field.fieldValue !== newFieldValue?.fieldValue &&
          newFieldValue?.fieldValue !== undefined &&
          newFieldValue.fieldValue !== ""
        ) {
          return { ...field, fieldValue: newFieldValue?.fieldValue };
        } else return;
      })
      .filter((element: FieldValue) => element !== undefined);

    const payload = { fields: [...fields], modules: [...data.modules] };

    updateFormValues(payload);
  };

  return (
    <div className="flex flex-col gap-7 sm:w-2/5 px-5 m-auto mt-8 top-0">
      <form className="flex flex-col gap-7" onSubmit={submitForm}>
        {formFields?.map((field: Field) => {
          const fieldValue = data?.fields.find((fieldValue: FieldValue) => fieldValue.fieldName === field.name);

          if (field.type === 17 || field.type === 7 || field.type === 16) {
            return (
              <FormControlLabel
                key={field.id}
                disabled
                control={<Checkbox checked={fieldValue.fieldValue !== "off"} />}
                label={field.label}
              />
            );
          }
          return (
            <TextField
              key={field.id}
              defaultValue={fieldValue?.fieldValue}
              name={field.name}
              variant="outlined"
              fullWidth
              label={field.label}
            />
          );
        })}

        {data?.modules.length > 0 && <p>Moduły</p>}
        <div className="grid grid-cols-2 gap-3">
          {data?.modules.map((module: Module) => (
            <button key={module.id}>{module.name}</button>
          ))}
        </div>

        {formFieldsError && <p>Błąd ładowania pól formularza</p>}
        {error && <p>Zły adres wydarzenia lub id rejestracji</p>}
        <div className="flex flex-row gap-5 m-auto">
          {!error && (
            <Button type="submit" size="large" variant="contained" color="success" className="normal-case">
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
      </form>
    </div>
  );
};
