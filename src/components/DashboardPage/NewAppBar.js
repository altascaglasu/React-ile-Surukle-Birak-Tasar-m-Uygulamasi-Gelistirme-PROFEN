import React from 'react';
import './AppBar.css';
import logo from '../../assets/profen-red-logo.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';

const NewAppBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const go2Dashboadd = () => navigate('/dashboard')
    const logoutUser = () => dispatch(logout())
    return (
        <div className="appbar">
            <div className="appbar-content">
                <img src={logo} alt="Logo" className="appbar-logo" onClick={go2Dashboadd} />
                <div className="appbar-actions">
                    <button className="appbar-action" onClick={go2Dashboadd}>Dashboard</button>
                </div>
            </div>
            <button className="appbar-logout" onClick={logoutUser}>Logout</button>
        </div>
    );
};

export default NewAppBar;
