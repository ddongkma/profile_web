
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import Sidebar from '~/common/layouts/components/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from '~/common/layouts/components/Header';

const cx = classNames.bind(styles);

const Admin = () => {
    return (
        <div className={cx('admin')}>
            <Header />
            <div className={cx('sidebar')}>
                <Sidebar />
            </div>
            <div className={cx('content')}>
                <Outlet />
            </div>
        </div>
    );
};


export default Admin;
