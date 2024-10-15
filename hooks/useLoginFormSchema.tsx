import * as yup from 'yup';
export function useLoginFormSchema() {
  return yup.object().shape({
    username: yup
      .string()
      .required('please enter username')
      .min(4, 'username is required to have at least 4 character'),

    password: yup
      .string()
      .required('please enter password')
      .min(4, 'password is required to have at least 6 character'),
  });
}
