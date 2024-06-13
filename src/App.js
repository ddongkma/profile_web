import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import { publicRoutes } from '~/common/routes'
import { DefaultLayout } from '~/common/layouts'
import Register from './customer/pages/Register';
import Admin from './admin/page/Admin';
import UserManagement from './admin/page/UserManagement/UserManagement';
import ProfileManagement from './admin/page/ProfileManagement/ProfileManagement';
import config from './common/configs';

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path='/' element={<Register />} />
          <Route path="/admin" element={<Admin />} /> {/* Thêm route cho Admin */}
          {publicRoutes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }

            return <Route key={index} path={route.path} element={
              <Layout>
                <Page />
              </Layout>}
            />
          })}
          {/* <Route path={config.routes.usermanagement} element={<UserManagement />} />
          <Route path={config.routes.profilemanagement} element={<ProfileManagement />} /> */}

        </Routes>

      </div>
    </Router>
  )
}

export default App;
