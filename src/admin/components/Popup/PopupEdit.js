import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './PopupEdit.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PopupEdit = ({ isOpen, onRequestClose, onSave, profile }) => {
    const [formData, setFormData] = useState(profile || {});

    useEffect(() => {
        setFormData(profile);
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        console.log(formData);
        onSave(formData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={cx('modal')}
            overlayClassName={cx('overlay')}
            ariaHideApp={false}
            aria={{
                labelledby: "heading",
                describedby: "full_description"
            }}
        >
            <h2 id="heading" className={cx('heading')}>Chỉnh sửa hồ sơ</h2>
            <form id="full_description" className={cx('form')}>
                <div className={cx('formGroup')}>
                    <label htmlFor="id">ID</label>
                    <input type="text" name="id" value={formData.id || ''} onChange={handleChange} disabled />
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="isdn">ISDN</label>
                    <input
                        type="text"
                        name="isdn"
                        value={formData.isdn || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="reasonName">Reason Name</label>
                    <input type="text" name="reasonName" value={formData.reasonName || ''} onChange={handleChange} />
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="actionDescription">Action Description</label>
                    <input type="text" name="actionDescription" value={formData.actionDescription || ''} onChange={handleChange} />
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="userCollect">User Collect</label>
                    <input type="text" name="userCollect" value={formData.userCollect || ''} onChange={handleChange} />
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="shopCollect">Shop Collect</label>
                    <input type="text" name="shopCollect" value={formData.shopCollect || ''} onChange={handleChange} />
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="isFullFile">Is Full File</label>
                    <input type="text" name="isFullFile" value={formData.isFullFile || ''} onChange={handleChange} />
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="actionStatus">Action Status</label>
                    <input type="text" name="actionStatus" value={formData.actionStatus || ''} onChange={handleChange} />
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="auditReview">Audit Review</label>
                    <input type="text" name="auditReview" value={formData.auditReview || ''} onChange={handleChange} />
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="createDate">Create Date</label>
                    <input type="date" name="createDate" value={formData.createDate || ''} onChange={handleChange} />
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="updateDate">Update Date</label>
                    <input type="date" name="updateDate" value={formData.updateDate || ''} onChange={handleChange} />
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="status">Status</label>
                    <input type="text" name="status" value={formData.status || ''} onChange={handleChange} />
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="subStatus">Sub Status</label>
                    <input type="text" name="subStatus" value={formData.subStatus || ''} onChange={handleChange} />
                </div>
                <div className={cx('formGroup')}>
                    <label htmlFor="auditor">Auditor</label>
                    <input type="text" name="auditor" value={formData.auditor || ''} onChange={handleChange} />
                </div>
            </form>
            <div className={cx('buttons')}>
                <button onClick={handleSubmit} className={cx('saveButton')}>Lưu</button>
                <button onClick={onRequestClose} className={cx('cancelButton')}>Hủy</button>
            </div>
        </Modal>
    );
};

export default PopupEdit;
