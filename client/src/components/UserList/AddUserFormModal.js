import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { USER_SCHEMA } from '../../schemas';
import { createUser } from '../../api';

Modal.setAppElement('#root');

const customStyles = {
    content: {top: '50%',left: '50%',right: 'auto',bottom: 'auto',marginRight: '-50%',transform: 'translate(-50%, -50%)',},
};

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthday: '',
    gender: ''
}

const AddUserFormModal = (props) => {

    const handleSubmitToFormik = async (values, actions) => {
        const serverResponse = await createUser(values);
        console.log(serverResponse);
        actions.resetForm();
        props.setIsModalOpen(false);
    }

    return (
        <Modal
                isOpen={props.isModalOpen}
                onRequestClose={() => props.setIsModalOpen(false)}
                style={customStyles}
            >
                <Formik 
                initialValues={initialState} 
                onSubmit={handleSubmitToFormik}
                validationSchema={USER_SCHEMA}
                >
                    {(formikProps) => {
                        return (
                            <Form style={{display: 'flex', flexDirection: 'column'}}>
                                <Field placeholder='John' name='firstName' />
                                <ErrorMessage name='firstName' component="p" />
                                <Field placeholder='Doe' name='lastName' />
                                <ErrorMessage name='lastName' component="p" />
                                <Field placeholder='john.doe@example.com' name='email' />
                                <ErrorMessage name='email' component="p" />
                                <Field type='password' placeholder='qwert1234' name='password' />
                                <ErrorMessage name='password' component="p" />
                                <Field type='date' name='birthday' />
                                <ErrorMessage name='birthday' component="p" />
                                <Field placeholder='Type your gender' name='gender' />
                                <ErrorMessage name='gender' component="p" />
                                <button type='submit'>Add user</button>
                            </Form>
                        )
                    }}
                </Formik>
                <button onClick={() => props.setIsModalOpen(false)}>Cancel</button>
            </Modal>
    );
}

export default AddUserFormModal;
