import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './AddProfilePopup.module.scss';

const cx = classNames.bind(styles);

const AddProfilePopup = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSaveProfile = async () => {
        try {
            // await axios.post('http://localhost:9091/profiles', { name, email });
            onClose(); // Đóng popup sau khi thêm thành công
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    return (
        <div className={cx('add-profile-popup')}>
            <h2>Add Profile</h2>
            <form>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={cx('input')}
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cx('input')}
                />
                <button type="button" onClick={handleSaveProfile}>Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default AddProfilePopup;
