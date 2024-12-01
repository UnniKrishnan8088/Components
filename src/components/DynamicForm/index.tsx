import React from 'react';
import {
  useForm,
  Controller,
  useFieldArray,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import {
  TextField,
  MenuItem,
  Select,
  Checkbox,
  Grid,
  Button,
} from '@mui/material';

// Define a generic InputConfig type
export type InputConfig<T extends FieldValues> = {
  name: keyof T; // Restrict to keys of the form's FieldValues
  label: string;
  type: 'text' | 'textarea' | 'dropdown' | 'multiselect' | 'fieldArray';
  options?: { label: string; value: string | number }[]; // For dropdown/multiselect
  rules?: RegisterOptions; // React Hook Form validation rules
  value?: any;
  width?: number;
  visibilityCondition?: (data: T) => boolean; // Conditional rendering logic
  subFields?: InputConfig<any>[]; // For nested inputs in field arrays
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
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<T>();
  const watchFields = watch();

  const renderFieldArray = (input: InputConfig<T>) => {
    if (input.type === 'fieldArray' && input.subFields) {
      const { fields, append, remove } = useFieldArray({
        control,
        name: input?.name as string,
      });

      return (
        <>
          {fields.map((field, index) => (
            <Grid container spacing={2} key={field.id}>
              {input.subFields?.map((subField) => (
                <Grid item xs={subField.width || 12} key={subField.name as string}>
                  <Controller
                    name={`${input?.name}[${index}].${subField?.name}` as keyof T}
                    control={control}
                    defaultValue={field[subField.name as keyof T] || ''}
                    rules={subField.rules}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={subField.label}
                        variant="outlined"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
              ))}
              <Button onClick={() => remove(index)}>Remove</Button>
            </Grid>
          ))}
          <Button onClick={() => append({})}>Add {input.label}</Button>
        </>
      );
    }
    return null;
  };

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
            <Grid item xs={input.width || 12} key={input.name as string}>
              {input.type === 'fieldArray' ? (
                renderFieldArray(input)
              ) : (
                <Controller
                  name={input.name}
                  control={control}
                  defaultValue={input.value || ''}
                  rules={input.rules}
                  render={({ field, fieldState }) => {
                    const errorMessage = fieldState.error?.message;

                    switch (input.type) {
                      case 'text':
                      case 'textarea':
                        return (
                          <TextField
                            {...field}
                            fullWidth
                            label={input.label}
                            variant="outlined"
                            multiline={input.type === 'textarea'}
                            rows={input.type === 'textarea' ? 4 : 1}
                            error={!!errorMessage}
                            helperText={errorMessage}
                          />
                        );
                      case 'dropdown':
                        return (
                          <TextField
                            {...field}
                            fullWidth
                            label={input.label}
                            variant="outlined"
                            select
                            error={!!errorMessage}
                            helperText={errorMessage}
                          >
                            {input.options?.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        );
                      case 'multiselect':
                        return (
                          <Select
                            {...field}
                            fullWidth
                            multiple
                            variant="outlined"
                            error={!!errorMessage}
                            renderValue={(selected) =>
                              Array.isArray(selected) && selected.length > 0
                                ? selected.join(', ')
                                : 'Select options'
                            }
                          >
                            {input.options?.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                <Checkbox
                                  checked={
                                    Array.isArray(field.value) &&
                                    field.value.includes(option.value)
                                  }
                                />
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        );
                      default:
                        return null;
                    }
                  }}
                />
              )}
            </Grid>
          ))}
      </Grid>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default DynamicForm;
