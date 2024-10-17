'use client';
import { Search } from '@mui/icons-material';
import { Box, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FilterAccountPayload } from '../../types';
import { InputField } from '../form/InputField';
import { debounce } from '../../utils';

export interface IFilterFormProps {
  onSubmit?: (payload: FilterAccountPayload) => void;
}

export default function FilterForm({ onSubmit }: IFilterFormProps) {
  const { control, handleSubmit } = useForm<FilterAccountPayload>({
    defaultValues: {
      search: '',
    },
  });

  async function handleSearchSubmit(payload: FilterAccountPayload) {
    // console.log(payload);
    await onSubmit?.(payload);
  }

  const deboundSearchChange = debounce(handleSubmit(handleSearchSubmit), 500);

  return (
    <Box component='form' onSubmit={handleSubmit(handleSearchSubmit)}>
      <InputField
        name='search'
        control={control}
        placeholder='search account by name or email'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          deboundSearchChange();
        }}
      />
    </Box>
  );
}
