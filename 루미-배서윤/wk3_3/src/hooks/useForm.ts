import { useState } from "react";

type Values = {
  email: string;
  password: string;
};

type Errors = {
  email: string;
  password: string;
};

function validate(values: Values): Errors {
  const errors: Errors = {
    email: "",
    password: "",
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(values.email)) {
    errors.email = "유효하지 않은 이메일 형식입니다.";
  }

  if (values.password.length < 6) {
    errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
  }

  return errors;
}

export default function useForm(initialValues: Values) {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const nextValues = {
      ...values,
      [name]: value,
    };

    setValues(nextValues);
    setErrors(validate(nextValues));
  };

  const isValid =
    values.email.trim() !== "" &&
    values.password.trim() !== "" &&
    !errors.email &&
    !errors.password;

  return {
    values,
    errors,
    isValid,
    handleChange,
  };
}