'use client'
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { Box } from '@mui/system'
import { signIn } from 'next-auth/react'
import { Control, useController, useForm } from 'react-hook-form'
import { getErrMessage } from '../utils/common'
import Link from 'next/link'
import { enqueueSnackbar, useSnackbar } from 'notistack'
import { useLoading } from '../context/loadingContext'
import { Password, Visibility, VisibilityOff } from '@mui/icons-material'
import { getRandomValues } from 'crypto'
import { useState } from 'react'

/** 
interface LoginFormProp {
  callRouter : () => void
}

const LoginForm = ( {callRouter}: LoginFormProp) => {
  const {register, handleSubmit, formState: {errors}} = useForm() 
  const {setLoading} = useLoading()

  const onSubmit = async (data: any) => {
    // console.log("data form =>", data)
    setLoading(true)
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password
    })

    if(res?.error){
      setLoading(false)
      enqueueSnackbar('Incorrect email or Password', {variant: 'error'})
    } else {
      callRouter()
      setLoading(false)
      // router.push('/')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          autoFocus
          {...register('email',{
            required: "this field is required",
            pattern:{
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email"
            }
          })}
          error = {!!errors.email}
          helperText = {getErrMessage(errors.email)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register('password',{
            required: "this field is required",
            minLength:{
              value: 6,
              message: "Password must be at least 6 characters long"
            }
          })}
          error = {!!errors.password}
          helperText = {getErrMessage(errors.password)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/register" className="text-blue-500 underline hover:text-blue-700">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
  )
}
*/
export interface LoginPayload {
  username: string
  password: string
}
interface LoginFormProp {
  onSubmit?: (payload: LoginPayload) => void
}

export function LoginForm({ onSubmit }: LoginFormProp) {
  const [showPassword, setShowPassword] = useState(false)
  const { control, handleSubmit } = useForm<LoginPayload>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function handleLoginSubmit(payload: LoginPayload) {
    console.log(payload)
    onSubmit?.(payload)
  }
  return (
    <Box component='form' onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField name='username' control={control} />
      <InputField
        type={showPassword ? 'text' : 'password'}
        name='password'
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => setShowPassword((x) => !x)}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button fullWidth sx={{ mt: 3, mb: 2 }} type='submit' variant='contained'>
        Login
      </Button>
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <Link
            href='/register'
            className='text-blue-500 underline hover:text-blue-700'
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LoginForm

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
      {...rest}
    />
  )
}
