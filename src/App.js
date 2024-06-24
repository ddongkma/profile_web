import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './common/routes';
import { DefaultLayout } from './common/layouts';
import Register from './customer/pages/Register';
import UserManagement from './admin/page/UserManagement/UserManagement';
import ProfileManagement from './admin/page/ProfileManagement/ProfileManagement';
import { UserProvider } from '~/common/context/UserContext';
import ProtectedRoute from './common/components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastProvider } from './common/context/ToastContext';
import Admin from './admin/page/Admin';
import Profile from './customer/pages/Profile/Profile';

function App() {
  return (
    <ToastProvider>
      <Router>
        <UserProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/admin/*" element={<ProtectedRoute component={Admin} />}>
                <Route index element={<Navigate to="/admin/profile" />} />
                <Route path="users" element={<ProtectedRoute component={UserManagement} />} />
                <Route path="profile" element={<ProtectedRoute component={ProfileManagement} />} />
              </Route>
              {/* <Route path="/profile/*" element={<ProtectedRoute component={Profile} />} /> */}
              {publicRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                }
                return (
                  <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
                );
              })}
            </Routes>
          </div>
        </UserProvider>
      </Router>
    </ToastProvider>
  );
}

export default App;