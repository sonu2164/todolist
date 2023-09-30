// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setUser, setError } from '../slices/authSlice';
// import { useNavigate } from 'react-router-dom';
// import styles from '../styles/modules/modal.module.scss';
// import Button from './Button';
// import { motion } from 'framer-motion';
// import classNames from '../styles/modules/login.module.css';
// import toast from 'react-hot-toast';

// function Register() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [passwordStrength, setPasswordStrength] = useState('');
//     const [isUsernameTaken, setIsUsernameTaken] = useState(false);

//     const handleLoginClick = () => {
//         navigate('/login');
//     };

//     const validatePasswordStrength = (value) => {

//         return value.length >= 6;
//     };

//     const handlePasswordChange = (e) => {
//         const newPassword = e.target.value;
//         const isStrong = validatePasswordStrength(newPassword);
//         setPassword(newPassword);


//         setPasswordStrength(isStrong ? 'Strong' : 'Weak');
//     };

//     const handleRegistration = async (e) => {
//         e.preventDefault();

//         if (isLoading || isUsernameTaken || passwordStrength === 'Weak') return;

//         try {
//             setIsLoading(true);

//             const existingUsers = JSON.parse(localStorage.getItem('users')) || {};

//             if (existingUsers[username]) {
//                 setIsUsernameTaken(true);
//                 setIsLoading(false);
//                 return;
//             }

//             const user = { username, password, name, todos: [] };
//             existingUsers[user.username] = user;

//             localStorage.setItem('users', JSON.stringify(existingUsers));
//             localStorage.setItem('user', JSON.stringify(user));

//             dispatch(setUser(user));
//             toast.success('Registration Success');

//             navigate('/login');
//         } catch (error) {
//             toast.error('Something went wrong!');
//             console.error('Registration error:', error);
//             dispatch(setError(error.message));
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <motion.div
//             className={classNames['login-container']}
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//         >
//             <h1 className={classNames['form-title']}>Register</h1>
//             <form onSubmit={handleRegistration}>
//                 <input
//                     type="text"
//                     className={classNames['input-field']}
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => {
//                         setUsername(e.target.value);
//                         setIsUsernameTaken(false);
//                     }}
//                     required
//                 />
//                 <input
//                     type="password"
//                     className={classNames['input-field']}
//                     placeholder="Password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     required
//                 />
//                 {passwordStrength === 'Weak' && (
//                     <div className={styles['error-message']}>
//                         Password must be at least 6 characters long.
//                     </div>
//                 )}
//                 {isUsernameTaken && (
//                     <div className={styles['error-message']}>
//                         This username is already taken.
//                     </div>
//                 )}
//                 <div className={classNames['button-container']}>
//                     <Button
//                         type="submit"
//                         variant="primary"
//                         disabled={isUsernameTaken || passwordStrength === 'Weak'}
//                     >
//                         Register
//                     </Button>
//                 </div>
//             </form>
//             <br />
//             <div
//                 style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     gap: '5px',
//                 }}
//             >
//                 <p style={{ color: 'black' }}>Already have an account ?</p>
//                 <button
//                     type="button"
//                     style={{
//                         background: 'none',
//                         border: 'none',
//                         color: 'blue',
//                         textDecoration: 'underline',
//                         marginLeft: '2px',
//                         cursor: 'pointer',
//                     }}
//                     onClick={handleLoginClick}
//                 >
//                     Login
//                 </button>
//             </div>
//         </motion.div>
//     );
// }

// export default Register;



import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setError } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';
import { motion } from 'framer-motion';
import classNames from '../styles/modules/login.module.css';
import toast from 'react-hot-toast';

// Import the Lottie animation
import Lottie from 'react-lottie';
import lottieData from '../asset/hello.json';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const validatePasswordStrength = (value) => {
        return value.length >= 6;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        const isStrong = validatePasswordStrength(newPassword);
        setPassword(newPassword);
        setPasswordStrength(isStrong ? 'Strong' : 'Weak');
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (isLoading || isUsernameTaken || passwordStrength === 'Weak') return;

        try {
            setIsLoading(true);

            const existingUsers = JSON.parse(localStorage.getItem('users')) || {};

            if (existingUsers[username]) {
                setIsUsernameTaken(true);
                setIsLoading(false);
                return;
            }

            const user = { username, password, name, todos: [] };
            existingUsers[user.username] = user;

            localStorage.setItem('users', JSON.stringify(existingUsers));
            localStorage.setItem('user', JSON.stringify(user));

            dispatch(setUser(user));
            toast.success('Registration Success');

            navigate('/login');
        } catch (error) {
            toast.error('Something went wrong!');
            console.error('Registration error:', error);
            dispatch(setError(error.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={classNames['login-container']}>
            <div className={classNames['lottie-container']}>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: lottieData,
                    }}
                    height={150}
                    width={150}
                />
            </div>
            <div className={classNames['registration-form']}>
                <h1 className={classNames['form-title']}>Register</h1>
                <form onSubmit={handleRegistration}>
                    <input
                        type="text"
                        className={classNames['input-field']}
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setIsUsernameTaken(false);
                        }}
                        required
                    />
                    <input
                        type="password"
                        className={classNames['input-field']}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    {passwordStrength === 'Weak' && (
                        <div className={styles['error-message']}>
                            Password must be at least 6 characters long.
                        </div>
                    )}
                    {isUsernameTaken && (
                        <div className={styles['error-message']}>
                            This username is already taken.
                        </div>
                    )}
                    <div className={classNames['button-container']}>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isUsernameTaken || passwordStrength === 'Weak'}
                        >
                            Register
                        </Button>
                    </div>
                </form>
                <br />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '5px',
                    }}
                >
                    <p style={{ color: 'black' }}>Already have an account ?</p>
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
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;
