import { FieldValues, Path, RegisterOptions } from "react-hook-form";

export type CommonTypes =
  | "text"
  | "textarea"
  | "dropdown"
  | "multiselect"
  | "date"
  | "checkbox"
  | "radio"
  | "email"
  | "number"
  | "phone"
  | "dropdownsearch";

export type formTypes = "fieldArray" | "group";

// Define a generic InputConfig type
export type InputConfig<T extends FieldValues> = {
  name?: Path<T>; // Restrict to keys of the form's FieldValues
  label: string;
  type: CommonTypes | formTypes; // Group type;
  placeholder?: string;
  options?: { label: string; value: any }[]; // For dropdown/multiselect
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
