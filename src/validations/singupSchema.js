import {object, string, ref} from 'yup'

export let signupSchema = object({
    email: string()
        .required({"empty_email": "Email must not be empty"})
        .email({"invalid_email":"Email is invalid"}),
    password: string()
     .required({"empty_password":"Password must not be empty"})
     .min(6, {"invalid_password":"Password must be at least 6 characters long"}),
    confirmPassword: string()
        .required({"invalid_confirm_password":"Comfirm password must not be empty"})
        .oneOf([ref('password'), null], {"invalid_match_password":"Password must match"}),
})