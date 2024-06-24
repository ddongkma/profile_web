import React, { useState } from 'react';
import Modal from 'react-modal';
import { useUser } from '~/common/context/UserContext';
import styles from './UpdateProfileUser.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useToast } from '~/common/context/ToastContext';
const cx = classNames.bind(styles);

const UpdateProfileUser = ({ isOpen, onClose }) => {

    const { user, updateUser } = useUser();
    const { addToast } = useToast();
    const formatBirthday = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        // Lấy các phần tử ngày, tháng, năm
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Thêm '0' nếu tháng có 1 chữ số
        const day = `${date.getDate()}`.padStart(2, '0'); // Thêm '0' nếu ngày có 1 chữ số
        return `${day}-${month}-${year}`;
    };
    const [formData, setFormData] = useState({
        staffId: user.staffId,
        fullName: user?.fullName || '',
        address: user?.address || '',
        email: user?.email || '',
        tel: user?.tel || '',
        birthDay: formatBirthday(user?.birthDay) || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            updateUser(formData);
            console.log("profile update :" + JSON.stringify(formData));
            const token = localStorage.getItem('access_token');
            const respons = await axios.post(`http://localhost:9091/api/staff/update`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("profile update data:" + JSON.stringify(respons))
            if (respons.status === 200) {
                addToast({
                    title: 'Thành công!',
                    message: 'Cập nhật thành công',
                    type: 'success',
                    duration: 5000,
                });
            } else {
                addToast({
                    title: 'Lỗi!',
                    message: respons.message,
                    type: 'error',
                    duration: 5000,
                });
            }
            onClose();
        } catch (err) {
            addToast({
                title: 'Lỗi!',
                message: err.message,
                type: 'error',
                duration: 5000,
            });
        }
    };

    const handleCancel = () => {
        setFormData({
            fullName: user?.fullName || '',
            email: user?.email || '',
            address: user?.address || '',
            tel: user?.tel || '',
            birthDay: formatBirthday(user?.birthDay) || '',
        });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Edit Profile"
            className={cx('modal')}
            overlayClassName={cx('overlay')}
        >
            <div className={cx('header')}>
                <h2>Edit Profile</h2>
                {/* <button className={cx('close-button')} onClick={handleCancel}>
                    Close
                </button> */}
            </div>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Address</label>
                    <input
                        type="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Telephone</label>
                    <input
                        type="tel"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Birthday</label>
                    <input
                        type="text"
                        name="birthday"
                        value={formData.birthDay}
                        onChange={handleChange}
                    />
                </div>
                <div className={cx('button-group')}>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default UpdateProfileUser;
