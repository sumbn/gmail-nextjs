import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export function getErrMessage(
  err: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
) : string {
  if(err) {
    return err.message as string
  }

  return ''
}