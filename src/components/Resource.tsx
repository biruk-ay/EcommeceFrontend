import { useCallback, useContext, useEffect, useState } from "react";
import useApi from "../hooks/auth/UseApi";
import authCtx from "../auth/state/AuthCtxProvider";

const Resource = () => {
  const [data, setData] = useState();
  const { request, setError } = useApi();
  const { globalLogOutDispatch } = useContext(authCtx);

  const fetchData = useCallback(async () => {
    try {
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await request("/resource", params, (result) => {
        setData(result.data);
      });
    } catch (error: any) {
      setError(error.message || error);
    }
  }, [request, setError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h1>{data}</h1>
      <button onClick={globalLogOutDispatch}>Log Out</button>
    </div>
  );
};

export default Resource;