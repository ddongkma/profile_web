import { useState, useEffect } from 'react'
import classNames from "classnames/bind";
import styles from './Sidebar.module.scss'
import Menu, { MenuItem } from './Menu'
import config from "~/common/configs";


import SuggestedAccounts from "~/common/components/SuggestedAccounts";
import * as userService from '~/common/services/userService';
import { HomeIcon, UserGroupIcon, LiveIcon } from '~/common/components/Icons'


const cx = classNames.bind(styles)
const INIT_PAGE = 1;
const PER_PAGE = 5;
function Sidebar() {

    const [page, setPage] = useState(INIT_PAGE)
    const [isSeeAll, setIsSeeAll] = useState(false)
    const [suggestedUser, setSuggestedUser] = useState([])

    // useEffect(() => {
    //     userService.getSuggested({ page, perPage: PER_PAGE }).then((data) => {
    //         setSuggestedUser(prevUser => [...prevUser, ...data])
    //     })
    //         .catch((error) => console.log(error))
    // }, [page])

    const handleViewChange = (isSeeAll) => {
        setIsSeeAll(prevState => !prevState)
        if (isSeeAll) {
            setPage(page + 1)
        }
    };

    return <aside className={cx('wrapper')}>
        <Menu>
            <MenuItem title="Profile Manager" to={config.routes.profilemanagement} icon={<HomeIcon />} />
            <MenuItem title="User Manager" to={config.routes.home} icon={<UserGroupIcon />} />
        </Menu>
        {/* <SuggestedAccounts label="Suggested Accounts" data={suggestedUser} isSeeAll={isSeeAll} onViewChange={handleViewChange} /> */}
        {/* <SuggestedAccounts label="Following Accounts" data={suggestedUser} isSeeAll={isSeeAll} onViewChange={handleViewChange} /> */}
    </aside>
}

export default Sidebar;