import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserDetails.css';

function UserDetails() {
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    return (
        <div className="user-details">
            {user ? (
                <>
                    <h2>{user.name}</h2>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Website: {user.website}</p>
                    <p>Company: {user.company.name}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default UserDetails;
