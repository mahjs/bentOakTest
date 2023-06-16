import { UseFormGetFieldState } from "react-hook-form";
import { FormValues } from "../Form";

export const getNumberOfValidInputs = (
  fieldStats: UseFormGetFieldState<FormValues>
) => {
  let numberOfValidValus = 0;

  if (!fieldStats("email").invalid && fieldStats("email").isDirty)
    numberOfValidValus++;
  if (!fieldStats("city").invalid && fieldStats("city").isDirty)
    numberOfValidValus++;
  if (!fieldStats("state").invalid && fieldStats("state").isDirty)
    numberOfValidValus++;
  if (!fieldStats("postCode").invalid && fieldStats("postCode").isDirty)
    numberOfValidValus++;

  return numberOfValidValus;
};
