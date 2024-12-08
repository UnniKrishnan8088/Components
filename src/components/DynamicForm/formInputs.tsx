import { InputConfig } from "./types/dynamicForm.types";

export type FormValues = {
  isStudent: string;
  schoolName: string;
  hobbies: { hobby: string }[];
  password: string;
  confirmPassword: string;
  radioField: any;
  checkboxField: any;
  reason: string;
  email: string;
  phone: number;
  primary_email: string;
};

export const formInputs: InputConfig<FormValues>[] = [
  {
    name: "isStudent",
    label: "Are you a student?",
    type: "dropdown",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
    rules: { required: "This field is required" },
    gridProps: { xs: 12 },
  },
  {
    name: "schoolName",
    label: "School Name",
    type: "text",
    rules: { required: "School Name is required" },
    gridProps: { xs: 6 },
    visibilityCondition: (data) => data.isStudent === "yes",
  },
  {
    name: "hobbies",
    label: "Hobbies",
    type: "fieldArray",
    subFields: [
      {
        name: "hobby",
        label: "Hobby Name",
        type: "text",
        rules: { required: "Hobby is required" },
        gridProps: { xs: 6 },
      },
      {
        name: "hobby",
        label: "Hobby Name",
        type: "text",
        rules: { required: "Hobby is required" },
        gridProps: { xs: 6 },
      },
    ],
    value: [{ hobby: "" }],
    gridProps: { xs: 12 },
  },
  {
    label: "User Details Group", // No `name` for the group
    type: "group",
    gridProps: { xs: 12 },
    children: [
      {
        name: "email",
        label: "Email Address",
        type: "email",
        gridProps: { xs: 12, sm: 6 },
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "phone",
        gridProps: { xs: 12, sm: 6 },
      },
    ],
  },
  {
    name: "password",
    label: "Password",
    type: "text",
    rules: { required: "Password is required" },
    gridProps: { xs: 6 },
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "text",
    rules: {
      required: "Confirm Password is required",
      validate: (value, formData) =>
        value === formData.password || "Passwords do not match",
    },
    gridProps: { xs: 6 },
  },
  {
    name: "radioField",
    label: "Choose an Option",
    type: "radio",
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
    ],
  },
  {
    name: "checkboxField",
    label: "Accept Terms",
    type: "checkbox",
    gridProps: { xs: 12 },
    rules: {
      required: "This field is required",
    },
  },
  {
    name: "reason",
    label: "Reason",
    type: "textarea",
    visibilityCondition: (data) => data.checkboxField === true,
    gridProps: { xs: 12 },
  },
  {
    name: "primary_email",
    label: "Primary Email Address",
    type: "email",
    gridProps: { xs: 12, sm: 6 },
  },
];
