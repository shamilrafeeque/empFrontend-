
import React, { useContext, useEffect, useState } from "react";
import AddEmployeeForm from "./AddEmployeeForm";
import AuthContext from "../../context/authcontent";
import axios from "axios";

export default function EmployeeTable() {
    const { authTokens } = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true); 

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8001/employee/employee-creation/', {
                headers: {
                    Authorization: `Bearer ${authTokens.accessToken}`, 
                },
            });
            setEmployees(response.data); 
        } catch (error) {
            console.error("Error fetching employee data:", error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [authTokens]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <>
            <AddEmployeeForm />
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Num</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <th scope="row">{employee.id}</th>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.position}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
