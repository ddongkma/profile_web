import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './AddProfilePopup.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useToast } from '~/common/context/ToastContext';
const cx = classNames.bind(styles);

const AddProfilePopup = ({ isOpen, onClose, onSave, shopcodes }) => {
    const { addToast } = useToast();
    const [formData, setFormData] = useState({
        isdn: '',
        reasonName: '',
        actionDescription: '',
        userCollect: '',
        shopCollect: '',
        isFullFile: '',
        actionStatus: '',
        auditReview: '',
        createDate: '', // Set initial value for date field
        updateDate: '', // Set initial value for date field
        status: '',
        subStatus: '',
        auditor: '',
    });

    const [staffs, setStaffs] = useState([])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    useEffect(() => {
        setStaffs([]);
    }, [formData.shopCollect]);
    const handleShopCodeChange = async (e) => {
        const selectedShopCode = e.target.value;
        setFormData({
            ...formData,
            shopCollect: selectedShopCode,
            userCollect: '', // Reset userCollect when shop changes (optional)
        });

        // Call API to fetch users of the selected shop
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`http://localhost:9091/api/shop/${selectedShopCode}/staff`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const users = response.data.map(user => ({
                staffId: user.staffId,
                staffCode: user.staffCode,
            }));
            setStaffs(users);

        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("add profile" + JSON.stringify(formData))
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://localhost:9091/api/profile-management/add', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onSave(response.data); // Gọi hàm onSave để thông báo cho component cha biết đã thêm thành công
            setFormData({
                isdn: '',
                reasonName: '',
                actionDescription: '',
                userCollect: '',
                shopCollect: '',
                isFullFile: '',
                actionStatus: '',
                auditReview: '',
                createDate: '',
                updateDate: '',
                status: '',
                subStatus: '',
                auditor: '',
            });
            if (response.status === 200) {
                addToast({
                    title: 'Thành công!',
                    message: 'Thêm thành công',
                    type: 'success',
                    duration: 5000,
                });
            } else {
                addToast({
                    title: 'Lỗi!',
                    message: "Thêm không thành công",
                    type: 'error',
                    duration: 5000,
                });
            }
            onClose();
        } catch (error) {
            addToast({
                title: 'Lỗi!',
                message: error.message,
                type: 'error',
                duration: 5000,
            });
        }
    };
    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={cx('modal')}
            overlayClassName={cx('overlay')}
            ariaHideApp={false}
            aria={{
                labelledby: "heading",
                describedby: "full_description"
            }}
        >
            <h2 id="heading" className={cx('heading')}>Thêm mới hồ sơ</h2>
            <form id="full_description" className={cx('form')}>
                <div className={cx('formGroup')}>
                    <label htmlFor="isdn">ISDN</label>
                    <input
                        type="text"
                        name="isdn"
                        value={formData.isdn}
                        onChange={handleChange}
                    />
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="reasonName">Reason Name</label>
                    <input
                        type="text"
                        name="reasonName"
                        value={formData.reasonName}
                        onChange={handleChange}
                    />
                </div>

                <div className={cx('formGroup')}>
                    <label htmlFor="userCollect">User Collect</label>
                    <select
                        name="userCollect"
                        value={formData.userCollect}
                        onChange={handleChange}
                    >
                        <option value="">Select user...</option>
                        {staffs.map(user => (
                            <option key={user.staffCode} value={user.staffCode}>{user.staffCode}</option>
                        ))}
                    </select>
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="shopCollect">Shop Collect</label>
                    <select
                        name="shopCollect"
                        value={formData.shopCollect}
                        onChange={handleShopCodeChange}
                    >
                        <option value="">Select shop...</option>
                        {shopcodes.map((code) => (
                            <option key={code.shopCode} value={code.shopCode}>{code.shopCode + "-" + code.name}</option>
                        ))}
                    </select>
                </div>
            </form>
            <div className={cx('buttons')}>
                <button onClick={handleSubmit} className={cx('saveButton')}>Thêm</button>
                <button onClick={handleCancel} className={cx('cancelButton')}>Hủy</button>
            </div>
        </Modal>
    );
};

export default AddProfilePopup;



