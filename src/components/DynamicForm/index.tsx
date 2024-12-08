import { useForm, FieldValues, Path, DefaultValues } from "react-hook-form";
import { Grid, Button } from "@mui/material";
import FieldArrayInput from "./components/FieldArrayInput";
import InputField from "./components/InputField";
import { memo } from "react";
import { InputConfig } from "./types/dynamicForm.types";
import { getValidationRules } from "./utils/dynamic.utils";

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
                            rules={getValidationRules(childInput)}
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
                  rules={getValidationRules(input)}
                  placeholder={input?.placeholder}
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
