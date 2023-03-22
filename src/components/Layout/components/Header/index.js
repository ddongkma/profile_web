import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faSignIn, faEllipsisVertical, faEarthAsia, faCircleQuestion, faKeyboard, faCloudUpload, faMessage, faUsersViewfinder, faCoins, faUser, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button'
import styles from './Header.module.scss';
import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles)

const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English'
                },
                {
                    code: 'vi',
                    title: 'Viet Nam'
                }
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
]
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
        to: '/logout',
        separate: true,
    }
]
function Header() {
    const [searchResults, setSearchResults] = useState([]);
    const currentUser = true;
    useEffect(() => {

    }, [])
    const handleMenuChange = (menuItem) => {

    }

    return <header className={cx('wrapper')}>

        <div className={cx('inner')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="tiktok"></img>
            </div>
            <HeadlessTippy
                interactive
                visible={searchResults.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h3 className={cx('search-title')}>
                                Account
                            </h3>
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                        </PopperWrapper>
                    </div>
                )} >
                <div className={cx('search')}>
                    <input placeholder="Search account and videos" spellcheck={false} />
                    <button className={cx('clear')} >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>

                    <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />

                    </button>
                </div>
            </HeadlessTippy>
            <div className={cx('actions')}>
                {currentUser ? (
                    <>
                        <Tippy content='Upload Video' placement='bottom' delay={[0, 200]} >
                            <button
                                className={cx('action-btn')}
                            >
                                <FontAwesomeIcon icon={faCloudUpload} />
                            </button>
                        </Tippy>
                    </>
                ) : (
                    <>
                        <Button text>Upload</Button>
                        <Button primary >Login</Button>

                    </>
                )}
                <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                    {currentUser ? (
                        <img src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/53bd7e990293727d1645f0adbc57cc6e~c5_100x100.jpeg?x-expires=1672495200&x-signature=23wLLLFaNOwTshJdI68Og0mwrbo%3D'
                            className={cx('user-avatar')}
                            alt='Doan Dinh Dong' />
                    ) : (
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    )}
                </Menu>
            </div>
        </div>
    </header >
}

export default Header;