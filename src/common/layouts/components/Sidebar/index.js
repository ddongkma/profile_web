import { useState, useEffect } from 'react'
import classNames from "classnames/bind";
import styles from './Sidebar.module.scss'
import Menu, { MenuItem } from './Menu'
import config from "~/common/configs";


import SuggestedAccounts from "~/common/components/SuggestedAccounts";
import * as userService from '~/common/services/userService';
import { HomeIcon, UserGroupIcon, LiveIcon } from '~/common/components/Icons'
import { useUser } from '~/common/context/UserContext';


const cx = classNames.bind(styles)

function Sidebar() {
    const { user } = useUser()
    const isAdmin = user && user.role === 'Admin';
    const isBranchMangement = user && user.role === 'Branch Manager'
    return <aside className={cx('wrapper')}>
        <Menu>
            {isAdmin && (
                <>
                    <MenuItem title="Profile Manager" to={config.routes.profilemanagement} icon={<HomeIcon />} />
                    <MenuItem title="User Manager" to={config.routes.usermanagement} icon={<UserGroupIcon />} />
                </>
            )}

            {isBranchMangement && (
                <>
                    <MenuItem title="Search and Upload Profile" to={config.routes.profile} icon={<HomeIcon />} />
                    <MenuItem title="Audit Profile" to={config.routes.audit} icon={<HomeIcon />} />
                    <MenuItem title="Profile Log" to={config.routes.log} icon={<HomeIcon />} />
                </>
            )}
            {!isAdmin && !isBranchMangement && (
                <>
                    <MenuItem title="Search and Upload Profile" to={config.routes.profile} icon={<HomeIcon />} />
                    <MenuItem title="Profile Log" to={config.routes.log} icon={<UserGroupIcon />} />
                </>
            )}
        </Menu>

    </aside>
}

export default Sidebar;