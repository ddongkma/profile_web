import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './UserManagement.module.scss';
import PopupDelete from '~/admin/components/Popup/PopupDelete';
import PopupEdit from '~/admin/components/Popup/PopupEdit';
import AddProfilePopup from '~/admin/components/AddProfilePopup/AddProfilePopup';
import SearchUserForm from '~/admin/components/SearchUserForm/SearchUserForm';
import SearchUserList from '~/admin/components/SearchUserList/SearchUserList';

const cx = classNames.bind(styles);

const UserManagement = () => {
    const [profiles, setProfiles] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [showAddProfilePopup, setShowAddProfilePopup] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [offset, setOffset] = useState(10);
    const [role, setRole] = useState([]);
    const [filters, setFilters] = useState({
        branch: '',
        isdn: '',
        status: '',
        shopcode: ''
    });
    const [shopcodes, setShopcodes] = useState([]);
    useEffect(() => {
        fetchShopCodes()
        fetchStaffs(page);
        fetchRole()
    }, [page]);
    const convertTimestampToDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const convertStatus = (status) => {
        return status === 0 ? 'Disable' : 'Active';
    };
    const fetchStaffs = async (page) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://localhost:9091/api/staff/search', {
                shopId: '',
                roleId: '',
                status: '',
                staffCode: '', page, offset
            });
            const staffData = response.data.records.map(staff => ({
                ...staff,
                birthday: convertTimestampToDate(staff.birthday),
                createDate: convertTimestampToDate(staff.createDate),
                startDate: convertTimestampToDate(staff.startDate),
                status: convertStatus(staff.status),
            }));
            setStaffs(staffData);
            console.log(response.data.records)
            setTotal(response.data.total);
        } catch (err) {
            console.error('Error fetching profiles:', err);
        }
    };
    const fetchShopCodes = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get('http://localhost:9091/api/list-shop-tree?alwaysFilAllBranch=true', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShopcodes(response.data);
        } catch (err) {
            console.error('Error fetching shop codes:', err);
        }
    };
    const fetchRole = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get('http://localhost:9091/api/get-roles', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRole(response.data);
            console.log(response.data);
        } catch (err) {
            console.error('Error fetching shop codes:', err);
        }
    };
    const handleSearch = (searchCriteria) => {
        axios.post('http://localhost:9091/api/staff/search', searchCriteria)
            .then(response => {
                const staffData = response.data.records.map(staff => ({
                    ...staff,
                    birthday: convertTimestampToDate(staff.birthday),
                    createDate: convertTimestampToDate(staff.createDate),
                    startDate: convertTimestampToDate(staff.startDate),
                    status: convertStatus(staff.status),
                }));
                setStaffs(staffData);
            })
            .catch(error => {
                console.error('Error searching profiles:', error);
            });
    };

    const openAddProfilePopup = () => {
        setShowAddProfilePopup(true);
    };

    const closeAddProfilePopup = () => {
        setShowAddProfilePopup(false);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`http://localhost:9091/api/audit/profile/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchStaffs();
            setIsDeletePopupOpen(false);
        } catch (err) {
            console.error('Error deleting profile:', err);
        }
    };

    const handleEdit = async (updatedProfile) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.post(`http://localhost:9091/api/profile-management/${updatedProfile.id}`, updatedProfile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchStaffs();
            setIsEditPopupOpen(false);
        } catch (err) {
            console.error('Error editing profile:', err);
        }
    };

    const openDeletePopup = (profile) => {
        setSelectedProfile(profile);
        setIsDeletePopupOpen(true);
    };

    const openEditPopup = (profile) => {
        setSelectedProfile(profile);
        setIsEditPopupOpen(true);
    };
    // const handleProfileUpdate = () => {
    //     fetchProfiles();
    //     setSelectedProfile(null);
    // };
    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }));
    };
    return (
        <div className={cx('profile-management')}>
            <SearchUserForm
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                onAddProfile={openAddProfilePopup}
                shopcodes={shopcodes}
                roles={role}
            />
            <SearchUserList users={staffs} total={total} page={page} offset={offset} setPage={setPage} handleDelete={openDeletePopup}
                handleEdit={openEditPopup} />
            {/* <ProfileForm profile={selectedProfile} onUpdate={handleProfileUpdate} /> */}

            {isDeletePopupOpen &&
                <PopupDelete
                    isOpen={isDeletePopupOpen}
                    onRequestClose={() => setIsDeletePopupOpen(false)}
                    onDelete={() => handleDelete(selectedProfile.id)}
                />
            }
            {isEditPopupOpen &&
                <PopupEdit
                    isOpen={isEditPopupOpen}
                    onRequestClose={() => setIsEditPopupOpen(false)}
                    onSave={handleEdit}
                    profile={selectedProfile}
                />
            }
            {showAddProfilePopup && <AddProfilePopup onClose={closeAddProfilePopup} />}
        </div>
    );
};

export default UserManagement;
