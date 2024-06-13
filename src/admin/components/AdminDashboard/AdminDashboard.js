import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminDashboard.module.scss';

const cx = classNames.bind(styles);

const AdminDashboard = () => {
    return (
        <div className={cx('dashboard')}>
            <h2>Admin Dashboard</h2>
            {/* Add your dashboard content here */}
        </div>
    );
};

export default AdminDashboard;
