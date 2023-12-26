import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";

function useFetch(callback, dependencies = []) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [value, setValue] = useState();

  const callbackMemoized = useCallback((ourRequest) => {
    setLoading(true);
    setError(undefined);
    // setValue(undefined);
    callback(ourRequest)
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    callbackMemoized(ourRequest.token);

    return () => {
      ourRequest.cancel();
    };
  }, [callbackMemoized]);

  return { loading, error, value };
}

useFetch.propTypes = {
  callback: PropTypes.func,
  dependencies: PropTypes.array,
};

export default useFetch;
