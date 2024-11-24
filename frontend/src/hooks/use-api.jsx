import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useApi = (cb, options = { success: false, failure: false }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await cb(...args);

      if (options.success) {
        toast.success(res.data.message);
      }
      setData(res.data.data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (options.failure) {
          toast.error(error.response.data.message);
        }
        setError(error.response.data.data);
        return error.response.data;
      }
    } finally {
      setLoading(false);
    }
  };

  const refetch = async (...args) => {
    const res = await cb(...args);
    setData(res.data.data);
  };

  return { fn, refetch, loading, data, error };
};

export default useApi;
