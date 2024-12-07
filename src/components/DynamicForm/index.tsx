import {
  useForm,
  FieldValues,
  RegisterOptions,
  Path,
  DefaultValues,
} from "react-hook-form";
import { Grid, Button } from "@mui/material";
import FieldArrayInput from "./components/FieldArrayInput";
import InputField from "./components/InputField";
import { memo } from "react";

// Define a generic InputConfig type
export type InputConfig<T extends FieldValues> = {
  name?: Path<T>; // Restrict to keys of the form's FieldValues
  label: string;
  type:
    | "text"
    | "textarea"
    | "dropdown"
    | "multiselect"
    | "fieldArray"
    | "date"
    | "checkbox"
    | "radio"
    | "group"
    | "email"
    | "number"
    | "phone"; // Group type;
  options?: { label: string; value: string | number }[]; // For dropdown/multiselect
  // rules?: RegisterOptions; // React Hook Form validation rules
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >; // Match Controller's rules type
  value?: any;
  visibilityCondition?: (data: T) => boolean; // Conditional rendering logic
  subFields?: InputConfig<any>[]; // For nested inputs in field arrays
  gridProps?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  children?: InputConfig<T>[]; // Nested fields for group
};

// Generic Props for DynamicForm
type DynamicFormProps<T extends FieldValues> = {
  inputs: InputConfig<T>[];
  onSubmit: (data: T) => void;
};

const DynamicForm = <T extends FieldValues>({
  inputs,
  onSubmit,
}: DynamicFormProps<T>) => {
  // Extract default values from inputs
  const defaultValues = inputs.reduce((acc, input) => {
    acc[input.name as keyof T] =
      input.value || (input.type === "fieldArray" ? [{}] : "");
    return acc;
  }, {} as T);

  const { control, handleSubmit, watch } = useForm<T>({
    mode: "all",
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const watchFields = watch();

  // const getValidationRules = (input: InputConfig<T>) => {
  //   let baseRules = input.rules || {};
  //   switch (input.type) {
  //     case "email":
  //       baseRules = {
  //         ...baseRules,
  //         pattern: {
  //           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  //           message: "Invalid email address",
  //         },
  //       };
  //       break;
  //     case "number":
  //       baseRules = {
  //         ...baseRules,
  //         pattern: {
  //           value: /^[+-]?([0-9]*[.])?[0-9]+$/,
  //           message: "Invalid number",
  //         },
  //       };
  //       break;
  //     case "phone":
  //       baseRules = {
  //         ...baseRules,
  //         pattern: {
  //           value: /^\+?[1-9]\d{1,14}$/,
  //           message: "Invalid phone number with country code",
  //         },
  //       };
  //       break;
  //     default:
  //       break;
  //   }
  //   return baseRules;
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {inputs
          .filter(
            (input) =>
              !input.visibilityCondition ||
              input.visibilityCondition(watchFields)
          )
          .map((input) => (
            <Grid item key={input.name as string} {...input.gridProps}>
              {input.type === "group" ? (
                <>
                  {/* Render the group heading */}
                  <h3>{input.label}</h3>
                  <Grid container spacing={2}>
                    {/* Render all child inputs */}
                    {input.children?.map((childInput, childIndex) => (
                      <Grid
                        item
                        key={
                          childInput.name
                            ? (childInput.name as string)
                            : `child-${childIndex}`
                        }
                        {...childInput.gridProps}
                      >
                        {childInput.type === "fieldArray" ? (
                          <FieldArrayInput
                            control={control}
                            name={childInput.name!} // `name` is required for child fields
                            label={childInput.label}
                            subFields={childInput?.subFields || []}
                          />
                        ) : (
                          <InputField
                            control={control}
                            name={childInput.name!} // `name` is required for child fields
                            label={childInput.label}
                            type={childInput.type as any}
                            options={childInput.options}
                            // rules={getValidationRules(input)}
                            rules={childInput.rules}
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </>
              ) : input.type === "fieldArray" ? (
                <FieldArrayInput
                  control={control}
                  name={input.name as Path<T>}
                  label={input.label}
                  subFields={input?.subFields || []}
                />
              ) : (
                <InputField
                  control={control}
                  name={input.name as Path<T>}
                  label={input.label}
                  type={input.type}
                  options={input.options}
                  // rules={getValidationRules(input)}
                  rules={input?.rules}
                />
              )}
            </Grid>
          ))}
      </Grid>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default memo(DynamicForm);
