import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils";

export const useFetchFormData = (eventURL: string | null, regId: string | null) => {
  return useQuery({
    queryKey: ["formData", eventURL, regId],
    queryFn: () => fetchData(`${import.meta.env.VITE_API_URL}${eventURL}/${regId}`),
  });
};
