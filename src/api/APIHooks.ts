import { useState, useEffect } from "react";
import { axiosMethod } from "src/config/axios";
import { getPropByPath } from "src/utils";

interface IUseQuery {
  url: string;
  successCallback?: any;
  errorCallback?: any;
  dataPath?: string;
  disableInitialLoad?: boolean;
}

interface IUseMutation {
  url: string;
  successCallback?: any;
  errorCallback?: any;
  dataPath?: string;
}

export const useQuery = ({
  url,
  successCallback,
  errorCallback,
  dataPath,
  disableInitialLoad = false,
}: IUseQuery) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!disableInitialLoad) {
      fetchData();
    }
  }, []);

  const fetchData = async (dynamicUrl?: string, customMethod?: string) => {
    let apiData: any = {};
    setLoading(true);
    setError(null);
    try {
      if (customMethod === "delete") {
        apiData = await axiosMethod.delete(dynamicUrl ? dynamicUrl : url);
      } else {
        apiData = await axiosMethod.get(dynamicUrl ? dynamicUrl : url);
      }
      setLoading(false);
      if (apiData && !apiData.errors) {
        if (dataPath?.length) {
          apiData = getPropByPath(apiData, dataPath, null);
        }
        setData(apiData);
        if (successCallback && typeof successCallback === "function") {
          successCallback(apiData);
        }
      } else {
        setData(null);
        setError(apiData.errors);
        if (errorCallback && typeof errorCallback === "function") {
          errorCallback(error);
        }
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
      setData(null);
      if (errorCallback && typeof errorCallback === "function") {
        errorCallback(error);
      }
      console.log("error has occurred", error);
    }
  };

  return {
    data,
    error,
    loading,
    refetch: fetchData,
    setError: setError,
    setData: setData,
  };
};

export const useMutation = ({
  url,
  successCallback,
  errorCallback,
  dataPath,
}: IUseMutation) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateData = async (
    data: any,
    customurl?: string,
    custommethod?: string
  ) => {
    let apiData: any = {};
    setLoading(true);
    setError(null);
    try {
      if (custommethod === "put") {
        apiData = await axiosMethod.put(customurl ? customurl : url, data);
      } else {
        apiData = await axiosMethod.post(customurl ? customurl : url, data);
      }
      setLoading(false);
      if (apiData && !apiData.errors) {
        if (dataPath?.length) {
          apiData = getPropByPath(apiData, dataPath, null);
        }
        if (successCallback && typeof successCallback === "function") {
          successCallback(apiData);
        }
      } else {
        setError(apiData.errors);
        if (errorCallback && typeof errorCallback === "function") {
          errorCallback(error);
        }
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
      if (errorCallback && typeof errorCallback === "function") {
        errorCallback(error);
      }
      console.log("error has occurred", error);
    }
  };

  return {
    error,
    loading,
    onSubmit: updateData,
    setError: setError,
  };
};
