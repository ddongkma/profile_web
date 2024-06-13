import classNames from "classnames/bind";
import Header from "~/common/layouts/components/Header";
import styles from "./DefaultLayout.module.scss";
import Sidebar from "~/common/layouts/components/Sidebar";
import Register from '~/customer/pages/Register';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles)
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
        </div>
    )
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DefaultLayout;