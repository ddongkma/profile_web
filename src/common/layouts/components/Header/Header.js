import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faEarthAsia, faCircleQuestion, faKeyboard, faCloudUpload, faCoins, faUser, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import Menu from '~/common/components/Popper/Menu';
import Image from '~/common/components/Image';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '~/common/context/UserContext';
const cx = classNames.bind(styles);

const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                { code: 'en', title: 'English' },
                { code: 'vi', title: 'Vietnamese' },
                // Add other languages here
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback And Help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts'
    }
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View Profile',
        to: '/@DOng'
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get Coins',
        to: '/coin'
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Setting',
        to: '/setting'
    },
    ...MENU_ITEM,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log Out',
        to: '/',
        separate: true,
    }
];

function Header() {
    const currentUser = {
        name: 'Doan Dinh Dong',
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/53bd7e990293727d1645f0adbc57cc6e~c5_100x100.jpeg?x-expires=1672495200&x-signature=23wLLLFaNOwTshJdI68Og0mwrbo%3D'
    };
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const handleMenuChange = (menuItem) => {
        if (menuItem.title === 'Log Out') {
            logout();
            navigate('/');
        }
    };


    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Place logo or other left-aligned items here
                <div className={cx('logo-link')}>
                    <Link to={config.routes.home}>
                        <img src={images.logo} alt="tiktok" />
                    </Link>
                </div> */}

                <div className={cx('actions')}>
                    <Menu items={userMenu} onChange={handleMenuChange}>
                        <div className={cx('user-info')}>
                            <span className={cx('user-name')}>{user?.fullName}</span>
                            <Image src={currentUser.avatar} className={cx('user-avatar')} alt={currentUser.name} />
                        </div>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
