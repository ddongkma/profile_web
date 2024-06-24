import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ProfileManagement.module.scss';
import SearchForm from '~/admin/components/SearchForm/SearchForm';
import ProfileList from '~/admin/components/ProfileList/ProfileList';
import PopupDelete from '~/admin/components/Popup/PopupDelete';
import PopupEdit from '~/admin/components/Popup/PopupEdit';
import AddProfilePopup from '~/admin/components/AddProfilePopup/AddProfilePopup';
import { useUser } from '~/common/context/UserContext';
import { useToast } from '~/common/context/ToastContext';

const cx = classNames.bind(styles);

const ProfileManagement = () => {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [showAddProfilePopup, setShowAddProfilePopup] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [offset, setOffset] = useState(10);
    const [filters, setFilters] = useState({
        branch: '',
        isdn: '',
        status: '',
        shopcode: ''
    });
    const [shopcodes, setShopcodes] = useState([]);
    const { user, logout } = useUser();
    const { addToast } = useToast();
    useEffect(() => {
        fetchShopCodes()
        fetchProfiles(page);
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
    const fetchProfiles = async (page) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://localhost:9091/api/audit/profile/search', {
                branch: '',
                isdn: '',
                status: '',
                shopcode: '', page, offset
            });
            const profileData = response.data.records.map(profile => ({
                ...profile,
                createDate: convertTimestampToDate(profile.createDate),
                updateDate: convertTimestampToDate(profile.updateDate),
            }));
            setProfiles(profileData);
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
            console.log(response.data);
            setShopcodes(response.data);
        } catch (err) {
            console.error('Error fetching shop codes:', err);
        }
    };
    const handleSearch = (searchCriteria) => {
        axios.post('http://localhost:9091/api/audit/profile/search', searchCriteria)
            .then(response => {
                const profileData = response.data.records.map(profile => ({
                    ...profile,
                    createDate: convertTimestampToDate(profile.createDate),
                    updateDate: convertTimestampToDate(profile.updateDate),
                }));
                setProfiles(profileData);
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
            const response = await axios.post(`http://localhost:9091/api/profile-management/delete-profile/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                addToast({
                    title: 'Thành công!',
                    message: "Xóa hồ sơ thành công!",
                    type: 'success',
                    duration: 5000,
                });
            } else {
                addToast({
                    title: 'Lỗi!',
                    message: response.data.error,
                    type: 'error',
                    duration: 5000,
                });
            }
            fetchProfiles();
            setIsDeletePopupOpen(false);
        } catch (err) {
            addToast({
                title: 'Lỗi!',
                message: err.message,
                type: 'error',
                duration: 5000,
            });
        }
    };

    const handleEdit = async (updatedProfile) => {
        try {
            const token = localStorage.getItem('access_token');
            console.log(updatedProfile);
            const rp = await axios.post(`http://localhost:9091/api/profile-management/update/${updatedProfile.id}`, updatedProfile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (rp.status === 200) {
                addToast({
                    title: 'Thành công!',
                    message: "Sửa hồ sơ thành công!",
                    type: 'success',
                    duration: 5000,
                });
            } else {
                addToast({
                    title: 'Lỗi!',
                    message: rp.data.error,
                    type: 'error',
                    duration: 5000,
                });
            }
            fetchProfiles();
            setIsEditPopupOpen(false);
        } catch (err) {
            addToast({
                title: 'Lỗi!',
                message: err.message,
                type: 'error',
                duration: 5000,
            });
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
    const handleAddProfile = (newProfile) => {
        setProfiles([...profiles, newProfile]);
    };
    return (
        <div className={cx('profile-management')}>
            <SearchForm
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                onAddProfile={openAddProfilePopup}
                shopcodes={shopcodes}
            />
            <ProfileList profiles={profiles} total={total} page={page} offset={offset} setPage={setPage} handleDelete={openDeletePopup}
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
            {showAddProfilePopup &&
                <AddProfilePopup
                    isOpen={showAddProfilePopup}
                    onClose={closeAddProfilePopup}
                    onSave={handleAddProfile}
                    shopcodes={shopcodes}
                />
            }
        </div>
    );
};

export default ProfileManagement;
