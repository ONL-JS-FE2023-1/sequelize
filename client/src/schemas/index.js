import * as yup from "yup";

export const USER_SCHEMA = yup.object({
    firstName: yup.string().required('Required!').min(5).max(30),
    lastName: yup.string().required('Required!').min(5).max(30),
    email: yup.string().required('Required!').email('Type valid email!'),
    password: yup.string().required('Required!').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Type valid password!'),
    birthday: yup.date().required('Required!').max(new Date(), 'Birthday must be today or earlier'),
    gender: yup.string().required('Required!')
});