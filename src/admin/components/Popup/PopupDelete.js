import React from 'react';
import Modal from 'react-modal';
import styles from './PopupDelete.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const PopupDelete = ({ isOpen, onRequestClose, onDelete }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={cx('modal')}
            overlayClassName={styles.overlay}
        >
            <h2 className={cx('modal-title')}>Xác nhận xóa</h2>

            <p>Bạn có chắc chắn muốn xóa hồ sơ này không?</p>
            <div className={cx('buttons')}>
                <button onClick={onDelete} className={cx('deleteButton')}>Đồng ý</button>
                <button onClick={onRequestClose} className={cx('cancelButton')}>Hủy</button>
            </div>
        </Modal>
    );
};

export default PopupDelete;
