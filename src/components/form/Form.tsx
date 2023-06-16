import { useEffect, useState } from "react";
import classes from "./form.module.css";
import Input from "./input/Input";
import MyCustomSelect from "./select/Select";
import Button from "./submit/Button";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { getNumberOfValidInputs } from "./utils/formStates";

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
    watch,
    reset,
    getFieldState,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  // This watch() if for real time observation of inputs
  watch();
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const selectedState = watch("state");

  // We could use a custom hook here...
  useEffect(() => {
    setValue("city", "");
    fetch("https://iran-locations-api.vercel.app/api/v1/states")
      .then((res) => res.json())
      .then((data: State[]) => setStates(data))
      .catch((e) => console.log("Faild to fetch"));
  }, [setValue]);

  useEffect(() => {
    if (!selectedState) return;
    setValue("city", "");
    fetch(
      `https://iran-locations-api.vercel.app/api/v1/cities?state=${selectedState}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("oops");
        return res.json();
      })
      .then((data) => setCities(data.cities))
      .catch((e) => {
        setCities([]);
        console.log("Faild to fetch");
      });
  }, [selectedState, setValue]);

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
    setValue("state", "");
    setValue("city", "");
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
          placeHolder="اسم استانت رو انتخاب کن"
          label="اسم استان"
          error={errors.state ? true : false}
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
          placeHolder="اسم شهرت رو انتخاب کن"
          label="نام شهر"
          error={errors.city ? true : false}
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
        />
        {errors.postCode && (
          <Typography variant="inherit" color="red">
            {errors.postCode?.message}
          </Typography>
        )}
        <Button
          bottomRigth={getNumberOfValidInputs(getFieldState) >= 1}
          topRigth={getNumberOfValidInputs(getFieldState) >= 2}
          topLeft={getNumberOfValidInputs(getFieldState) >= 3}
          bottomLeft={getNumberOfValidInputs(getFieldState) >= 4}
          onClickHandler={handleSubmit(onSubmit)}
          type="submit"
        />
      </form>
    </div>
  );
};

export default Form;
