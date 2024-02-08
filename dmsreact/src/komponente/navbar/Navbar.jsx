import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import { MdDocumentScanner } from 'react-icons/md';

const Navbar = ({ token, setToken }) => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');

    useEffect(() => {
        const userRole = sessionStorage.getItem('role');
        setRole(userRole);
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setToken(null);
            sessionStorage.clear();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <MdDocumentScanner />
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li>
                    <Link to="/docs/it" className="nav-link">IT docs</Link>
                </li>
                {token ? (
                    <>
                        {role === 'korisnik' && (
                            <>
                                <li>
                                    <Link to="/docs/upload" className="nav-link">Upload</Link>
                                </li>
                                <li>
                                    <Link to="/docs" className="nav-link">Documents</Link>
                                </li>
                            </>
                        )}
                        {role === 'admin' && (
                            <li>
                                <Link to="/statistike" className="nav-link">Statistike</Link>
                            </li>
                        )}
                        <li>
                            <button className="nav-link" onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
