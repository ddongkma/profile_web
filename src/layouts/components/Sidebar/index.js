import { useState, useEffect } from 'react'
import classNames from "classnames/bind";
import styles from './Sidebar.module.scss'
import Menu, { MenuItem } from './Menu'
import config from "~/configs";


import SuggestedAccounts from "~/components/SuggestedAccounts";
import * as userService from '~/services/userService';
import { HomeIcon, UserGroupIcon, LiveIcon } from '~/components/Icons'


const cx = classNames.bind(styles)
const INIT_PAGE = 1;
const PER_PAGE = 5;
function Sidebar() {

    const [page, setPage] = useState(INIT_PAGE)
    const [isSeeAll, setIsSeeAll] = useState(false)
    const [suggestedUser, setSuggestedUser] = useState([])

    useEffect(() => {
        userService.getSuggested({ page, perPage: PER_PAGE }).then((data) => {
            setSuggestedUser(prevUser => [...prevUser, ...data])
        })
            .catch((error) => console.log(error))
    }, [page])

    const handleViewChange = (isSeeAll) => {
        setIsSeeAll(prevState => !prevState)
        if (isSeeAll) {
            setPage(page + 1)
        }
    };

    return <aside className={cx('wrapper')}>
        <Menu>
            <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} />
            <MenuItem title="Following" to={config.routes.following} icon={<UserGroupIcon />} />
            <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} />
        </Menu>
        <SuggestedAccounts label="Suggested Accounts" data={suggestedUser} isSeeAll={isSeeAll} onViewChange={handleViewChange} />
        <SuggestedAccounts label="Following Accounts" data={suggestedUser} isSeeAll={isSeeAll} onViewChange={handleViewChange} />
    </aside>
}

export default Sidebar;