import { memo } from "react";
import { useFieldArray, Controller, Path, FieldValues } from "react-hook-form";
import { Grid, TextField, Button } from "@mui/material";
import { InputConfig } from "../../types/dynamicForm.types";

// import InputField, { InputFieldProps } from "./InputField";

type FieldArrayInputProps<T extends FieldValues> = {
  control: any;
  name: Path<T>;
  label: string;
  subFields: InputConfig<T>[];
};

const FieldArrayInput = <T extends FieldValues>({
  control,
  name,
  label,
  subFields,
}: FieldArrayInputProps<T>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as any,
  });

  const getEmptyFieldArrayItem = () => {
    const emptyItem = {} as Record<string, any>;
    subFields.forEach((subField) => {
      emptyItem[subField.name as string] = "";
    });
    return emptyItem;
  };

  return (
    <>
      {fields.map((field, index) => (
        <Grid container spacing={2} key={field.id}>
          {subFields.map((subField) => (
            <Grid
              item
              //   xs={subField.width || 12}
              key={`${subField.name}-${index}`}
              {...subField.gridProps}
            >
              <Controller
                name={`${name}[${index}].${subField.name}` as Path<T>}
                control={control}
                defaultValue={(field as any)[subField.name] || ""}
                rules={subField.rules}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={subField.label}
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    size="small"
                  />
                )}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => remove(index)}>
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button onClick={() => append(getEmptyFieldArrayItem())}>
            Add {label}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(FieldArrayInput);
