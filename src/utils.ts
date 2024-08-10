import { FieldValue } from "./types";

export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateData = async (url: string, payload: { fields: FieldValue[] }) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log(response);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const handleReloadAndRemoveParams = () => {
  const clearURL = window.location.origin;
  window.history.pushState({}, "", clearURL);
  location.reload();
};
