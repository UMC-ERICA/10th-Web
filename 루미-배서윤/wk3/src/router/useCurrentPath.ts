import { useEffect, useState } from "react";
import { getCurrentPath } from "./utils";

const useCurrentPath = () => {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const handleChange = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener("popstate", handleChange);
    window.addEventListener("pushstate", handleChange);

    return () => {
      window.removeEventListener("popstate", handleChange);
      window.removeEventListener("pushstate", handleChange);
    };
  }, []);

  return path;
};

export default useCurrentPath;