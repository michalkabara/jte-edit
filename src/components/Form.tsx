import { ModuleType, FieldType, FieldValue } from "../types";
import { useFetchFormData } from "../hooks/useFetchFormData";
import { handleReloadAndRemoveParams, updateData } from "../utils";
import { useFetchFormFields } from "../hooks/useFetchFormFields";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Field } from "./Field";
import { Button } from "@mui/material";
import { Module } from "./Module";
import Modal from "./Modal";
import { ResponseModal } from "./ResponseModal";

export const Form: React.FC<{
  regId: string | null;
  eventURL: string | null;
}> = ({ regId, eventURL }) => {
  const queryClient = useQueryClient();
  const { isPending, error, data } = useFetchFormData(eventURL, regId);
  const { isPending: formFieldsPending, error: formFieldsError, data: formFields } = useFetchFormFields(eventURL);
  const [modules, setModules] = useState<ModuleType[]>();
  const formRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | undefined>();
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);

  useEffect(() => {
    setModules(data?.modules);
  }, [data?.modules]);

  const {
    mutate: updateFormValues,
    isError,
    isSuccess,
    isPending: isResponsePending,
  } = useMutation({
    mutationFn: (newData: { fields: FieldValue[] }) =>
      updateData(`${import.meta.env.VITE_API_URL}${eventURL}/${regId}`, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fieldsData"] });
    },
  });

  if (isPending || formFieldsPending) return <p>Loading...</p>;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveValues = (e: FormEvent) => {
    e.preventDefault();
    const payload = checkFieldsAndModules();
    const removedModules = modules?.filter((module) => module.isRemoved === true);

    let changedFields;
    let changedModules;

    if (payload?.fields.length === 0) {
      changedFields = (
        <div>
          <p>Żadne dane nie zostały zmienione</p>
        </div>
      );
    } else {
      changedFields = (
        <div>
          <p>Dane które zostały zmienione</p>
          {payload?.fields.map((field) => {
            const label = formFields.find((fieldLabel: FieldType) => fieldLabel.name === field.fieldName);
            return (
              <div key={field.fieldName} className="mt-3">
                <span className="text-xs">{label.label}</span>
                <p>{field.fieldValue}</p>
              </div>
            );
          })}
        </div>
      );
    }

    if (removedModules?.length === 0) {
      changedModules = "";
    } else {
      changedModules = (
        <div className="mt-3">
          <p>Moduły które zostały usunięte</p>
          <ul>
            {removedModules?.map((module: ModuleType) => (
              <li className="text-xs" key={module.id}>
                {module.name}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    const content = (
      <div className="flex flex-col gap-3">
        {changedFields}
        {changedModules}
        <div className="flex flex-row gap-5 justify-center mt-3">
          {payload.fields.length === 0 && removedModules?.length === 0 ? (
            <Button color="success" onClick={handleCloseModal} variant="contained">
              OK
            </Button>
          ) : (
            <Button color="success" onClick={() => confirmChanges(payload)} variant="contained">
              Potwierdzam
            </Button>
          )}

          <Button color="error" onClick={handleCloseModal} variant="contained">
            Wróć
          </Button>
        </div>
      </div>
    );
    setModalContent(content);
    setIsModalOpen(true);
  };

  const checkFieldsAndModules = () => {
    const formData = new FormData(formRef.current);
    const formEntries = Object.fromEntries(formData);
    const updatedEntries = Object.entries(formEntries).map((entry) => ({ fieldName: entry[0], fieldValue: entry[1] }));

    const fields = data?.fields
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

    const filteredModules = modules?.filter((module: ModuleType) => module?.isRemoved !== true);
    // const removedModules = modules?.filter((module) => module.isRemoved === true);

    const payload = { fields: [...fields], modules: filteredModules };
    return payload;
  };

  const confirmChanges = (payload: { fields: FieldValue[] }) => {
    setIsModalOpen(false);
    setIsResponseModalOpen(true);
    updateFormValues(payload);
  };

  const handleRemoveModule = (id: string) => {
    const newModules = modules?.map((module: ModuleType) => {
      if (module.id === id) {
        return { ...module, isRemoved: !module.isRemoved };
      }
      return module;
    });

    setModules(newModules);
    checkFieldsAndModules();
    setIsModalOpen(false);
  };

  const showRemoveModuleModal = (module: ModuleType) => {
    const content = (
      <div>
        Czy na pewno chcesz {module.isRemoved ? "przywrócić" : "usunąć"} moduł:
        <p className="text-sm my-5">{module.name}</p>
        <div className="flex flex-row gap-5 justify-center">
          <Button color="success" onClick={() => handleRemoveModule(module.id)} variant="contained">
            Tak
          </Button>
          <Button color="error" onClick={handleCloseModal} variant="contained">
            Nie
          </Button>
        </div>
      </div>
    );
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <>
      <Modal onClose={handleCloseModal} open={isModalOpen}>
        {modalContent}
      </Modal>
      <Modal onClose={() => setIsResponseModalOpen(false)} open={isResponseModalOpen}>
        <ResponseModal isResponsePending={isResponsePending} isError={isError} isSuccess={isSuccess} />
        <div>
          <div className="flex flex-row gap-5 justify-center mt-5">
            <Button color="success" onClick={() => setIsResponseModalOpen(false)} variant="contained">
              OK
            </Button>
          </div>
        </div>
      </Modal>

      <div className="flex flex-col gap-7 sm:w-2/3 md:w-3/5 sm:max-w-[800px] w-full px-5 m-auto mt-8 top-0">
        {formFieldsError && <p className="text-center">Błąd ładowania pól formularza</p>}
        {error && <p className="text-center">Zły adres wydarzenia lub id rejestracji</p>}
        {!formFieldsError && !error && (
          <form className="flex flex-col gap-7" onSubmit={handleSaveValues} ref={formRef}>
            {formFields?.map((field: FieldType) => {
              const fieldValue = data?.fields.find((fieldValue: FieldValue) => fieldValue.fieldName === field.name);

              return <Field key={field.id} field={field} fieldValue={fieldValue} />;
            })}

            {modules && modules?.length > 0 && <p>Moduły</p>}
            <div className="grid grid-cols-1 gap-3 text-left">
              {modules?.map((module: ModuleType) => (
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
        )}
        {formFieldsError || error ? (
          <div className="flex flex-row gap-5 m-auto">
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
        ) : (
          ""
        )}
      </div>
    </>
  );
};
