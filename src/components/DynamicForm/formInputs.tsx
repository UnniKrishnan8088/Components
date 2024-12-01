import { InputConfig } from ".";

type FormValues = {
  isStudent: string;
  schoolName: string;
  hobbies: { hobby: string }[];
  password: string;
  confirmPassword: string;
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
    width: 6,
  },
  {
    name: "schoolName",
    label: "School Name",
    type: "text",
    rules: { required: "School Name is required" },
    width: 6,
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
        width: 12,
      },
    ],
    value: [{ hobby: "" }],
    width: 12,
  },
  {
    name: "password",
    label: "Password",
    type: "text",
    rules: { required: "Password is required" },
    width: 6,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "text",
    rules: {
      required: "Confirm Password is required",
      validate: (value: string, formData: FormValues) =>
        value === formData.password || "Passwords do not match",
    },
    width: 6,
  },
];
