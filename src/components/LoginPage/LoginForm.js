import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/userSlice';
import './LoginForm.css';
import { enqueueSnackbar } from 'notistack';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = [
        { username: 'admin', password: 'admin123' },
        { username: 'user', password: 'user123' },
    ];


    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const handleLogin = () => {
        const user = users.find(
            (user) => user.username === username && user.password === password
        );
        if (user) {
            dispatch(login(username));
            navigate('/dashboard');
        } else {
            enqueueSnackbar('Kullanıcı adı veya şifre hatalı', {
                variant: 'error'
            })
        }

    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
            disableButtonTemporarily();
        }
    };

    const disableButtonTemporarily = () => {
        setIsButtonDisabled(true);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 3000);
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Giriş Yapın</h2>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Kullanıcı Adı"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <input
                        type={showPassword ? 'text' : "password"}
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}

                        className="input-field"
                    />
                    <input type="checkbox" id="showPasswordCheckbox" onClick={togglePasswordVisibility}></input>Şifreyi Göster
                    {/* <input type="checkbox" onClick={togglePasswordVisibility}>Show Password </input> */}
                </div>
                <button className="login-button" onClick={handleLogin} disabled={isButtonDisabled} style={{
                    backgroundColor: isButtonDisabled && 'gray',
                    cursor: isButtonDisabled && 'default'
                }}>
                    Giriş Yap
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
