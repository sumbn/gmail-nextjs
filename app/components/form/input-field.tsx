'use client'
import { TextField, TextFieldProps } from '@mui/material'
import { Control, useController } from 'react-hook-form'

export type InputFieldProps = TextFieldProps & {
  name: string
  control: Control<any>
}

export function InputField({
  name,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ref: externalRef,
  value: externalValue,
  ...rest
}: InputFieldProps) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control })
  return (
    <TextField
      margin='normal'
      fullWidth
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  )
}
