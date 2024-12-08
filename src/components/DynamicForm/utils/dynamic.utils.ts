import { FieldValues } from "react-hook-form";
import { InputConfig } from "../types/dynamicForm.types";

export const getValidationRules = <T extends FieldValues>(
  input: InputConfig<T>
) => {
  let baseRules = input.rules;

  switch (input.type) {
    case "email":
      baseRules = {
        ...baseRules,
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email address",
        },
      };
      break;
    case "number":
      baseRules = {
        ...baseRules,
        pattern: {
          value: /^[+-]?([0-9]*[.])?[0-9]+$/,
          message: "Invalid number",
        },
      };
      break;
    case "phone":
      baseRules = {
        ...baseRules,
        pattern: {
          value: /^\+?[1-9]\d{1,14}$/,
          message: "Invalid phone number",
        },
      };
      break;
    default:
      break;
  }
  return baseRules;
};
