import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils";

export const useFetchFormFields = (eventURL: string | null) => {
  return useQuery({
    queryKey: ["fieldsData", eventURL],
    queryFn: () => fetchData(`${import.meta.env.VITE_API_URL}${eventURL}/fields`),
  });
};
