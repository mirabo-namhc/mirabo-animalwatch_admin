import { useEffect, useState } from "react";

function useDebounce(keySearch, delay) {
  const [value, setValue] = useState(keySearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(keySearch);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, keySearch]);

  return value;
}

export default useDebounce;
