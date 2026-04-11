import { useState } from "react";

const useForm = (data: any) => {
  const [formData, setFormData] = useState(data);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return [formData, handleChange];
};

export default useForm;
