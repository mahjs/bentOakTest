import { useEffect, useState } from "react";
import classes from "./form.module.css";
import Input from "./input/Input";
import MyCustomSelect from "./select/Select";
import Button from "./submit/Button";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";

export interface FormValues {
  email: string;
  state: string;
  city: string;
  postCode: string;
}
const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const Form: React.FC = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("ایمیل را وارد کنید")
      .matches(emailRegex, "ایمیل را به درستی وارد کنید"),
    state: Yup.string()
      .required("لطفا استان خود را انتخاب کنید")
      .notOneOf(["اسم استانت رو انتخاب کن"], "استان رو انتخاب کن"),
    city: Yup.string()
      .required("لطفا شهر خود را انتخاب کنید")
      .notOneOf(["اسم شهرت رو انتخاب کن"], "شهرت رو انتخاب کن"),
    postCode: Yup.string()
      .required("کد پستی را وارد کنید")
      .matches(/\d{10}/, "کد پستی باید شامل فقط اعداد و ۱۰ رقم باشد")
      .min(10, "کد پستی باید ۱۰ رقم باشید")
      .max(10, "کد پستی باید ۱۰ رقم باشد"),
  });
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [selectedState, setselectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [enteredEmail, setEnteredEmail] = useState<string | null>(null);
  const [enteredPostCode, setEnteredPostCode] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://iran-locations-api.vercel.app/api/v1/states")
      .then((res) => res.json())
      .then((data: State[]) => setStates(data));
  }, []);

  useEffect(() => {
    if (!selectedState) return;
    fetch(
      `https://iran-locations-api.vercel.app/api/v1/cities?state=${selectedState}`
    )
      .then((res) => res.json())
      .then((data) => setCities(data.cities));
  }, [selectedState]);

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
    setSelectedCity(null);
    setselectedState(null);
    setEnteredEmail(null);
    setEnteredPostCode(null);
  };

  return (
    <div dir="rtl" className={classes.formWrapper}>
      <h1>همین اول کار امتیاز بگیر!</h1>
      <p>
        میتونی بیخیال این صفحه بشی، ولی اگه الان کاملش کنی بیشتر امتیاز می‌گیری.
      </p>
      <form noValidate className={classes.form}>
        <Input
          type="email"
          placeHolder="آدرس ایمیلت رو اینجا بنویس"
          lable="آدرس ایمیل"
          registery={register}
          error={errors.email ? true : false}
          onChange={(e) => setEnteredEmail(e.target.value)}
        />
        {errors.email && (
          <Typography variant="inherit" color="red">
            {errors.email?.message}
          </Typography>
        )}
        <MyCustomSelect
          name="state"
          control={control}
          options={states}
          selectedOption={selectedState}
          placeHolder="اسم استانت رو انتخاب کن"
          label="اسم استان"
          registery={register}
          error={errors.state ? true : false}
          onSelect={(state) => {
            setselectedState(state);
            setSelectedCity(null);
          }}
        />
        {errors.state && (
          <Typography variant="inherit" color="red">
            {errors.state?.message}
          </Typography>
        )}
        <MyCustomSelect
          name="city"
          control={control}
          options={cities}
          selectedOption={selectedCity}
          placeHolder="اسم شهرت رو انتخاب کن"
          label="نام شهر"
          registery={register}
          error={errors.city ? true : false}
          onSelect={(city) => setSelectedCity(city)}
        />
        {errors.city && (
          <Typography variant="inherit" color="red">
            {errors.city?.message}
          </Typography>
        )}
        <Input
          type="postCode"
          placeHolder="کد پستی خونه رو بنویس"
          lable="کد پستی"
          registery={register}
          error={errors.postCode ? true : false}
          onChange={(e) => setEnteredPostCode(e.target.value)}
        />
        {errors.postCode && (
          <Typography variant="inherit" color="red">
            {errors.postCode?.message}
          </Typography>
        )}
        <Button
          bottomRigth={!errors.email && !!enteredEmail}
          bottomLeft={!errors.postCode && !!enteredPostCode}
          topRigth={!!selectedState}
          topLeft={!!selectedCity}
          onClickHandler={handleSubmit(onSubmit)}
          type="submit"
        />
      </form>
    </div>
  );
};

export default Form;
