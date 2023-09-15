const yup = require('yup');

module.exports.USER_SCHEMA = yup.object({
    firstName: yup.string().required('First name is required').min(1),
    lastName: yup.string().required('Last Name is required').min(1),
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required').min(8),
    birthday: yup.date(),
    gender: yup.string()
});