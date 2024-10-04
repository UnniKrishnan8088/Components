/**
 * @author Unni Krishnan
 *
 * A custom React hook for fetching data from a specified API endpoint
 * using Axios and React Query. This hook simplifies the process of
 * handling asynchronous data fetching, caching, and error handling
 * while providing options for customizing success and error callbacks.
 *
 * @returns {UseQueryResult<T>} The result of the useQuery hook, including data, error, loading state, and refetch function.
 */

import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type UseFetchDataProps<T> = {
  apiUrl: string; // The API endpoint to fetch data from.
  queryKey: string; // A unique key to identify the query.
  onSuccess?: (data?: T) => void; // Optional callback for successful data fetch.
  onError?: (error?: unknown) => void; // Optional callback for fetch errors.
  returnDataPath?: (response: any) => any; // Optional function to extract data from the response.
};

const UseFetchData = <T,>({
  apiUrl,
  queryKey,
  onError,
  onSuccess,
  returnDataPath = (response: any) => response?.data?.result,
}: UseFetchDataProps<T>) => {
  const queryClient = useQueryClient();

  // Validate that the API URL has been provided.
  if (!apiUrl) {
    throw new Error("URL is required");
  }

  // Asynchronous function to fetch data from the API.
  const fetchData = async (): Promise<T | any> => {
    try {
      const response = await axios.get(apiUrl);
      if (response?.data && response?.status) {
        // Use the provided returnDataPath function to extract the actual data.
        const realData = returnDataPath(response);
        if (!realData) {
          throw new Error("No valid data found");
        }
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        onSuccess?.(realData);
        return realData;
      }
    } catch (error) {
      console.log(error);
      onError?.(error);
      throw error;
    }
  };

  // Use the useQuery hook from React Query to manage the data fetching.
  return useQuery<T>({
    queryKey: [apiUrl, queryKey], // Unique query key for caching and tracking.
    queryFn: fetchData, // Function to fetch the data.
    enabled: !!apiUrl, // Only enable the query if the API URL is valid.
    refetchOnWindowFocus: false,
  });
};

export default UseFetchData;
