import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/authcontent';

function Dashboard() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const {authTokens,logoutUser}=useContext(AuthContext)

    const fetchEmployeeProfile = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            handleLogout(); 
            return;
        }

        try {
            const response = await axios.get('http://localhost:8001/employee/employee-profile/', {
                headers: {
                    Authorization: `Bearer ${authTokens.accessToken}`, 
                },
            });
            setEmployee(response.data[0]); 
        } catch (error) {
            console.error("Error fetching employee profile:", error);
        } finally {
            setLoading(false); 
        }
    };
    useEffect(() => {
        const isLogin = localStorage?.getItem('access_token');
        if (!isLogin) {
            navigate('/');
        }
    }, []);
    const handleLogout = () => {
        // localStorage.removeItem('access_token');
        logoutUser()
        navigate('/');
    };

    useEffect(() => {
        fetchEmployeeProfile(); 
    }, []);

    useEffect(() => {
        const isLogin = localStorage?.getItem('access_token');
        if (!isLogin) {
            handleLogout();
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.container}>
        <h2>Employee Profile</h2>
        {employee ? (
            <div>
                <h3>Name: {employee.name}</h3>
                <p>Email: {employee.email}</p>
                <p>Position: {employee.position}</p>
                <h4>Custom Fields:</h4>
                <ul>
                    {employee.custome_field.length > 0 ? (
                        employee.custome_field.map((field, index) => (
                            <li key={index}>
                                {Object.entries(field.fields).map(([key, value]) => (
                                    <div key={key}>
                                        <strong>{key}:</strong> {value}
                                    </div>
                                ))}
                            </li>
                        ))
                    ) : (
                        <li>No custom fields available</li>
                    )}
                </ul>
            </div>
        ) : (
            <div>No employee data available</div>
        )}
        <button onClick={handleLogout} style={styles.button}>Logout</button>
    </div>
    )
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '2em',
    },
    button: {
        padding: '0.5em',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#dc3545',
        color: 'white',
        cursor: 'pointer',
        marginTop: '1em',
    },
};

export default Dashboard;
