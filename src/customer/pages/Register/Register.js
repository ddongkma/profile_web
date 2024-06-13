import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const history = useHistory();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9091/login', { email, password });
            console.log(response.data);
            if (response.data.staffId != null) {
                // Lưu token vào local storage hoặc Redux store
                localStorage.setItem('access_token', response.data.accessToken);
                navigate('/admin');
                // window.location.href = '/home';
            }
        } catch (err) {
            // setError(err.response.data.message);
            console.log(err);
        }
        // history.push('/home');
    };
    const changeRegister = () => {

    };

    return (
        <div className={cx('register')}>
            <h2>Đăng Nhập</h2>
            <form onSubmit={handleSubmit} className={cx('login')} >
                <div >
                    <label htmlFor="">Email</label>
                    <input
                        className={cx('input')}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div >
                    <label htmlFor="">Password</label>
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
                    <a href="">Đăng ký</a>
                    <a href="">Quên mật khẩu?</a>
                </div>
            </form>

        </div>
    );
};

export default Register;