'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputField } from '../form/InputField';
import { useLoginFormSchema } from '../../hooks';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface ILoginFormProps {
  onSubmit?: (payload: LoginPayload) => void;
}

export default function LoginForm({ onSubmit }: ILoginFormProps) {
  const schema = useLoginFormSchema();

  const [showPassword, setShowPassword] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginPayload>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  async function handleLoginSubmit(payload: LoginPayload) {
    console.log(payload);
    await onSubmit?.(payload);
  }

  return (
    <Box component='form' onSubmit={handleSubmit(handleLoginSubmit)}>
      {/* <InputField name='username' control={control} /> */}
      <InputField name='username' control={control} label='Username' />
      <InputField
        name='password'
        label='Password'
        control={control}
        type={showPassword ? 'text' : 'password'}
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
      <Button
        disabled={isSubmitting}
        startIcon={
          isSubmitting ? <CircularProgress color='inherit' size='1em' /> : null
        }
        type='submit'
        variant='contained'
        fullWidth
        sx={{ mt: 4 }}
      >
        Login
      </Button>
    </Box>
  );
}
