import React, { useCallback, useContext } from "react";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { addEmployee, listEmployee } from "../../apis/api";
import AuthContext from "../../context/authcontent";
import { Navigate, useNavigate } from "react-router-dom";

export default function AddEmployeeForm() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {logoutUser} = useContext(AuthContext)
    const handleLogout = () => {
        // localStorage.removeItem('access_token');
        logoutUser()
        navigate('/');
    };

    const handleClose = () => {
        setShow(false);
        reset();  // Reset the form when modal is closed
    };
    const handleShow = () => setShow(true);
    const {authTokens}=useContext(AuthContext)

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            // Replace with your API endpoint
            const response = await addEmployee(data,authTokens);
            console.log('Employee added:', response.data);
            handleClose();  // Close the modal on successful submission
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };



    return (
        <>
        <div className="p-3">
            <button onClick={handleShow} className="btn btn-primary float-end">Add Employee</button>
            
            
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPosition">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter position"
                                {...register("position", { required: "Position is required" })}
                            />
                            {errors.position && <span className="text-danger">{errors.position.message}</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <span className="text-danger">{errors.password.message}</span>}
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
