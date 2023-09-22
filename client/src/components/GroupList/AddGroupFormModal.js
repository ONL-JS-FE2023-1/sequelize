import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { GROUP_SCHEMA } from '../../schemas';
import { createGroup } from '../../api';

Modal.setAppElement('#root');

const customStyles = {
    content: {top: '50%',left: '50%',right: 'auto',bottom: 'auto',marginRight: '-50%',transform: 'translate(-50%, -50%)',},
};

const initialState = {
    name: '',
    description: ''
}

const AddGroupFormModal = (props) => {

    const handleSubmitToFormik = async (values, actions) => {
        const serverResponse = await createGroup(values);
        console.log(serverResponse);
        actions.resetForm();
        props.setIsModalOpen(false);
        await props.loadGroups();
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
                validationSchema={GROUP_SCHEMA}
                >
                    {(formikProps) => {
                        return (
                            <Form style={{display: 'flex', flexDirection: 'column'}}>
                                <Field placeholder='Type group name' name='name' />
                                <ErrorMessage name='name' component="p" />
                                <Field placeholder='Type group description' name='description' />
                                <ErrorMessage name='description' component="p" />
                                <button type='submit'>Add group</button>
                            </Form>
                        )
                    }}
                </Formik>
                <button onClick={() => props.setIsModalOpen(false)}>Cancel</button>
            </Modal>
    );
}

export default AddGroupFormModal;
