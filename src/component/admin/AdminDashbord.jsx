import React, { useEffect } from "react";
import EmployeeTable from "./EmployeeTable";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

export default function AdminDashbord() {
  const navigate = useNavigate()
  useEffect(() => {
    const isLogin = localStorage?.getItem('access_token');
    if (!isLogin) {
        navigate('/');
    }
}, []);
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Employee List</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        
        <EmployeeTable />
      </div>
    </>
  );
}
