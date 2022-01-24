import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
// import Select from "react-select";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male"
  });
  const [professions, setProfession] = useState();
  const [errors, setErrors] = useState({});
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);
  useEffect(() => {
    console.log(professions);
  }, [professions]);
  // console.log(professions);

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: `Пароль должен содержать хотя 
        бы одну заглавную букву`
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите Вашу профессию"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);
  // следим за вводом текста в поля до отправки формы

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  // для добавления исключения при деактивации баттон
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Выберите свою профессию"
        defaultOption="Choose..."
        options={professions}
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        options={[{ name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" }
          // "мы же живем в современном обществе)))))))"
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
      />
           <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
