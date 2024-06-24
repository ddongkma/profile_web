import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '~/common/context/UserContext';
import { useToast } from '~/common/context/ToastContext';

const cx = classNames.bind(styles);

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { user, login } = useUser();
    const { addToast } = useToast();

    useEffect(() => {
        if (user) {
            navigate('/admin'); // Redirect to the admin page if already logged in
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9091/login', { email, password });
            console.log(response.data);
            if (response.data.staffId != null) {
                // Save token to local storage or Redux store
                localStorage.setItem('access_token', response.data.accessToken);
                login(response.data);

                if (response.data.role === 'Admin') {
                    addToast({
                        title: 'Thành công!',
                        message: 'Đăng nhập thành công',
                        type: 'success',
                        duration: 5000,
                    });
                    navigate('/admin');
                } else {
                    navigate('/profile');
                }
            } else {
                addToast({
                    title: '',
                    message: response.data.error,
                    type: 'error',
                    duration: 5000,
                });
            }
        } catch (err) {
            addToast({
                title: '',
                message: err.message,
                type: 'error',
                duration: 5000,
            });
            console.log(err);
        }
    };

    const changeRegister = () => {

    };

    return (
        <div className={cx('register')}>
            <form onSubmit={handleSubmit} className={cx('login')}>
                <h2>Đăng Nhập</h2>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        className={cx('input')}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        className={cx('input')}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng Nhập</button>
                <div className={cx('sub-register')}>
                    {/* <a href="#">Đăng ký</a>
                    <a href="#">Quên mật khẩu?</a> */}
                </div>
            </form>
        </div>
    );
};

export default Register;
