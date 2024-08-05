import { ModuleType, FieldType, FieldValue } from "../types";
import { useFetchFormData } from "../hooks/useFetchFormData";
import { handleReloadAndRemoveParams, updateData } from "../utils";
import { useFetchFormFields } from "../hooks/useFetchFormFields";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Field } from "./Field";
import { Button } from "@mui/material";
import { Module } from "./Module";

export const Form: React.FC<{
  regId: string | null;
  eventURL: string | null;
  setIsModalOpen: (prev: any) => void;
}> = ({ regId, eventURL, setIsModalOpen }) => {
  const queryClient = useQueryClient();
  const { isPending, error, data } = useFetchFormData(eventURL, regId);
  const { isPending: formFieldsPending, error: formFieldsError, data: formFields } = useFetchFormFields(eventURL);
  const [modules, setModules] = useState({ modules: [], removedModules: [] });
  const formRef = useRef();

  const formData = new FormData(formRef.current);
  const formEntries = Object.fromEntries(formData);
  const updatedEntries = Object.entries(formEntries).map((entry) => ({ fieldName: entry[0], fieldValue: entry[1] }));

  const handleSaveValues = (e: FormEvent) => {
    e.preventDefault();
    const changedFields = checkFieldsAndModules();

    const text = (
      <div className="flex flex-col gap-3">
        <div>
          {changedFields.fields.length ? <p>Dane które zostały zmienione</p> : "Żadne dane nie zostały zmienione"}
          {changedFields.fields.map((field) => (
            <p key={field.fieldName}>{field.fieldValue}</p>
          ))}
        </div>
        <div>
          {modules?.removedModules?.length && <p>Moduły które zostały usunięte</p>}
          <ul>
            {modules?.removedModules?.map((module) => (
              <li className="text-xs" key={module.id}>
                {module.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

    setIsModalOpen((prev) => ({
      ...prev,
      isOpen: true,
      text: text,
      onAccept: () => confirmChanges(changedFields),
      acceptText: "Potwierdzam",
    }));

    console.log(modules?.removedModules);
  };

  useEffect(() => {
    setModules({ modules: data?.modules });
  }, [data?.modules]);

  const { mutate: updateFormValues } = useMutation({
    mutationFn: (newData: { fields: FieldValue[] }) =>
      updateData(`${import.meta.env.VITE_API_URL}${eventURL}/${regId}`, newData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["fieldsData"]);
      console.log(data);
    },
  });

  if (isPending || formFieldsPending) return <p>Loading...</p>;

  const checkFieldsAndModules = () => {
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

    const payload = { fields: [...fields], modules: modules.modules };

    return payload;
  };

  const confirmChanges = (payload) => {
    updateFormValues(payload);
    setIsModalOpen((prev) => ({ ...prev, isOpen: false }));
  };

  const handleRemoveModule = (id: string) => {
    const newModules = modules.modules.filter((module: ModuleType) => module.id !== id);
    const removedModule = modules.modules.find((module: ModuleType) => module.id === id);

    setModules((prev) => {
      return { removedModules: [removedModule], modules: newModules };
    });
    setIsModalOpen((prev) => ({ ...prev, isOpen: false }));
    console.log(modules.removedModules);
  };

  const showRemoveModuleModal = (module: ModuleType) => {
    const text = (
      <div>
        Czy na pewno chcesz usunąć moduł: <p className="text-sm mt-5">{module.name}</p>
      </div>
    );
    setIsModalOpen({ isOpen: true, text: text, onAccept: () => handleRemoveModule(module.id), acceptText: "Tak" });
  };

  return (
    <div className="flex flex-col gap-7 sm:w-2/3 md:w-3/5 w-full px-5 m-auto mt-8 top-0">
      {formFieldsError && <p>Błąd ładowania pól formularza</p>}
      {error && <p>Zły adres wydarzenia lub id rejestracji</p>}
      <form className="flex flex-col gap-7" onSubmit={handleSaveValues} ref={formRef}>
        {formFields?.map((field: FieldType) => {
          const fieldValue = data?.fields.find((fieldValue: FieldValue) => fieldValue.fieldName === field.name);

          return <Field key={field.id} field={field} fieldValue={fieldValue} />;
        })}

        {modules?.modules?.length > 0 && <p>Moduły</p>}
        <div className="grid grid-cols-1 gap-3 text-left">
          {modules?.modules?.map((module: ModuleType) => (
            <Module key={module.id} module={module} showRemoveModuleModal={showRemoveModuleModal} />
          ))}
        </div>

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
