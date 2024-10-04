'use client'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Grid, IconButton, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '../form/input-field'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export interface LoginPayload {
  username: string
  password: string
}
interface LoginFormProp {
  onSubmit?: (payload: LoginPayload) => void
}

export function LoginForm({ onSubmit }: LoginFormProp) {
  const schema = yup
    .object()
    .shape({
      username: yup.string().required('Please enter username').email(),
      // .min(4, 'username is required to have at least 4 charaters'),

      password: yup
        .string()
        .required('Please enter password')
        .min(6, 'password is required to have at least 6 charaters'),
    })
    .required()

  const [showPassword, setShowPassword] = useState(false)
  const { control, handleSubmit } = useForm<LoginPayload>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
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
