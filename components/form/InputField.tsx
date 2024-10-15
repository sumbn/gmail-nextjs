import { TextField, TextFieldProps } from '@mui/material';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

export type IInputFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
};

export function InputField<T extends FieldValues>({
  name,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ref: externalRef,
  value: externalValue,
  ...rest
}: IInputFieldProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      fullWidth
      margin='normal'
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      variant='outlined'
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  );
}
