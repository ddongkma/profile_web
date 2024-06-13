import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './UserManagement.module.scss';// Bạn cần tạo PopupDeleteUser component
import SearchForm from '~/admin/components/SearchForm/SearchForm';
import ProfileList from '~/admin/components/ProfileList/ProfileList';

const cx = classNames.bind(styles);

const UserManagement = () => {
    // const [users, setUsers] = useState([]);
    // const [selectedUser, setSelectedUser] = useState(null);
    // const [showAddUserPopup, setShowAddUserPopup] = useState(false);
    // const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    // const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    // const fetchUsers = async () => {
    //     try {
    //         const token = localStorage.getItem('access_token');
    //         const response = await axios.get('http://localhost:9091/api/users', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             }
    //         });
    //         setUsers(response.data);
    //     } catch (err) {
    //         console.error('Error fetching users:', err);
    //     }
    // };

    // const handleSearch = (searchCriteria) => {
    //     axios.post('http://localhost:9091/api/users/search', searchCriteria)
    //         .then(response => {
    //             setUsers(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error searching users:', error);
    //         });
    // };

    // const openAddUserPopup = () => {
    //     setShowAddUserPopup(true);
    // };

    // const closeAddUserPopup = () => {
    //     setShowAddUserPopup(false);
    // };

    // const handleDelete = async (id) => {
    //     try {
    //         const token = localStorage.getItem('access_token');
    //         await axios.delete(`http://localhost:9091/api/users/${id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         fetchUsers();
    //         setIsDeletePopupOpen(false);
    //     } catch (err) {
    //         console.error('Error deleting user:', err);
    //     }
    // };

    // const handleEdit = async (updatedUser) => {
    //     try {
    //         const token = localStorage.getItem('access_token');
    //         await axios.put(`http://localhost:9091/api/users/${updatedUser.id}`, updatedUser, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         fetchUsers();
    //         setIsEditPopupOpen(false);
    //     } catch (err) {
    //         console.error('Error editing user:', err);
    //     }
    // };

    // const openDeletePopup = (user) => {
    //     setSelectedUser(user);
    //     setIsDeletePopupOpen(true);
    // };

    // const openEditPopup = (user) => {
    //     setSelectedUser(user);
    //     setIsEditPopupOpen(true);
    // };

    return (
        <div className={cx('user-management')}>
            <h2>User Management</h2>
            {/* <SearchForm
                onSearch={handleSearch}
                onAddUser={openAddUserPopup}
            />
            <ProfileList
                users={users}
                handleDelete={openDeletePopup}
                handleEdit={openEditPopup}
            /> */}
            {/* {isDeletePopupOpen &&
                <PopupDeleteUser
                    isOpen={isDeletePopupOpen}
                    onRequestClose={() => setIsDeletePopupOpen(false)}
                    onDelete={() => handleDelete(selectedUser.id)}
                />
            }
            {isEditPopupOpen &&
                <PopupEditUser
                    isOpen={isEditPopupOpen}
                    onRequestClose={() => setIsEditPopupOpen(false)}
                    onSave={handleEdit}
                    user={selectedUser}
                />
            }
            {showAddUserPopup && <AddUserPopup onClose={closeAddUserPopup} />} */}
        </div>
    );
};

export default UserManagement;
