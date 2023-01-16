import * as Yup from 'yup';

export const validate = (prop) => {

    if (prop === 'signup') {
        return Yup.object({
            username: Yup.string()
                .min(2, 'Must be more then 2 characters')
                .required('Name is required'),
            email: Yup.string()
                .email('Invalid email')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Must be more then 7 characters')
                .required('Password is required')
        });
    }
    if (prop === 'signin') {
        return Yup.object({
            email: Yup.string()
                .email('Invalid email')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Must be more then 7 characters')
                .required('Password is required')
        });
    }

}