import React, { useState } from 'react';
import Lottie from 'react-lottie';

import out from '../asset/out'
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';
import styles from '../styles/modules/button.module.scss'

const AppHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: out,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };


    const handleLogout = () => {

        localStorage.removeItem("user");

        window.location.href = '/';
    };



    return (
        <div onClick={handleLogout} style={{ cursor: 'pointer' }} className={styles.logout}>
            <Lottie
                options={defaultOptions}
                height={40}
                width={40}

            />
            <h2 >Sign out</h2>

        </div>

    );
};

export default AppHeader;
