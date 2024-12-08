import { FieldValues, Path, RegisterOptions } from "react-hook-form";

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
