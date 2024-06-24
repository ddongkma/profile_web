import { HeaderOnly } from '~/common/layouts'
import Home from '~/customer/pages/Home'
// import Following from '~/pages/Following'
import Upload from '~/customer/pages/Upload'
// import Live from '~/pages/Live'
import Register from '~/customer/pages/Register'
import config from '~/common/configs'
import Profile from '~/customer/pages/Profile/Profile'
import UserManagement from '~/admin/page/UserManagement/UserManagement'
import ProfileManagement from '~/admin/page/ProfileManagement/ProfileManagement'
import Audit from '~/customer/pages/AuditPage/Audit'
import Log from '~/customer/pages/Log/Log'



const publicRoutes = [
    { path: config.routes.register, component: Register },
    { path: config.routes.home, component: Home },
    { path: config.routes.audit, component: Audit },
    { path: config.routes.log, component: Log },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.usermanagement, component: UserManagement },
    { path: config.routes.profilemanagement, component: ProfileManagement },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly }
]


const privateRoutes = {

}
export { publicRoutes, privateRoutes }