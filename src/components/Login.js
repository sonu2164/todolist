import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { setUser } from '../slices/authSlice';
import { login } from '../slices/todoSlice';
import { motion } from 'framer-motion';
import Button from './Button';
import toast from 'react-hot-toast';
import classNames from '../styles/modules/login.module.css';
import Lottie from 'react-lottie';
import logoAnimation from '../asset/logo';
import login2Animation from '../asset/login2';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    const logoOptions = {
        loop: true,
        autoplay: true,
        animationData: logoAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    const loginAnimationOptions = {
        loop: true,
        autoplay: true,
        animationData: login2Animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    if (isAuthenticated) {
        toast.success('Logged in successfully!');
        return <Navigate to="/todo" />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const existingUsers = JSON.parse(localStorage.getItem('users')) || {};
            const user = existingUsers[username];

            if (user) {
                if (password === user.password) {

                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(setUser(user));
                    dispatch(login(user.username));
                    navigate('/todo');
                } else {
                    setError('Invalid username or password.');
                }
            } else {
                setError('User not found.');
            }
        } catch (error) {
            setError(error.message);
        }
    };


    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className={classNames['login']}>
            <motion.div
                className={classNames['login-container']}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
            >
                <Lottie
                    options={logoOptions}
                    height={100}
                    width={100}
                />
                <h1 className={classNames['form-title']}>Login</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        className={classNames['input-field']}
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className={classNames['input-field']}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={classNames['button-container']}>
                        <Button type="submit" variant="primary">
                            Login
                        </Button>
                    </div>
                    {error && <div className={classNames['error-message']}>{error}</div>}

                </form>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                    <p style={{ color: 'black' }}>Don't have an account?</p>
                    <button
                        type="button"
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'blue',
                            textDecoration: 'underline',
                            marginLeft: '2px',
                            cursor: 'pointer',
                        }}
                        onClick={handleRegisterClick}
                    >
                        Register
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default Login;
