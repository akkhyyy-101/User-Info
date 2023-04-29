import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserList.css";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const res = await axios.get("https://jsonplaceholder.typicode.com/users");
            setUsers(res.data);
            setLoading(false);
        };

        fetchUsers();
    }, []);

    // Get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Search users by name or email
    const filteredUsers = currentUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderUsers = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        if (filteredUsers.length === 0) {
            return <div>No users found.</div>;
        }

        return filteredUsers.map((user) => (
            <Link to={`/user/${user.id}`} key={user.id} className="user-card">
                <h3>{user.name}</h3>
                <p>
                    <strong>Username:</strong> {user.username}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                    <strong>Website:</strong> {user.website}
                </p>
                <p>
                    <strong>Company:</strong> {user.company.name}
                </p>
            </Link>
        ));
    };

    return (
        <div className="user-list-container">
            <h1 className="cen">User Info</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search users by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button" onClick={() => setSearchTerm("")}>
                    Search
                </button>
            </div>
            <div className="user-list">{renderUsers()}</div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => i + 1).map((pageNumber) => (
                    <button key={pageNumber} className={pageNumber === currentPage ? "active" : ""} onClick={() => paginate(pageNumber)}>
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default UserList;
