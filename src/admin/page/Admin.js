import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import SearchForm from '../components/SearchForm/SearchForm';
import ProfileList from '../components/ProfileList/ProfileList';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import Sidebar from '~/common/layouts/components/Sidebar';
import AddProfilePopup from '../components/AddProfilePopup/AddProfilePopup';
import PopupEdit from '../components/Popup/PopupEdit';
import PopupDelete from '../components/Popup/PopupDelete';

const cx = classNames.bind(styles);

const Admin = () => {
    const [profiles, setProfiles] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        branch: '',
        isdn: '',
        status: '',
        shopcode: ''
    });
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [showAddProfilePopup, setShowAddProfilePopup] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [offset, setOffset] = useState(10);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    useEffect(() => {
        fetchProfiles(page);
    }, [page]);

    // useEffect(() => {
    //     setFilteredProfiles(
    //         profiles.filter(profile =>
    //             profile.name.toLowerCase().includes(search.toLowerCase()) &&
    //             profile.branch.toLowerCase().includes(filters.branch.toLowerCase()) &&
    //             profile.isdn.toLowerCase().includes(filters.isdn.toLowerCase()) &&
    //             profile.status.toLowerCase().includes(filters.status.toLowerCase()) &&
    //             profile.shopcode.toLowerCase().includes(filters.shopcode.toLowerCase())
    //         )
    //     );
    // }, [search, filters, profiles]);

    const fetchProfiles = async (page) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://localhost:9091/api/audit/profile/search', {
                branch: '',
                isdn: '',
                status: '',
                shopcode: '', page, offset
            });
            setProfiles(response.data.records);
            setTotal(response.data.total);
        } catch (err) {
            console.error('Error fetching profiles:', err);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }));
    };

    const handleSearch = (searchCriteria) => {
        axios.post('http://localhost:9091/api/audit/profile/search', searchCriteria)
            .then(response => {
                setProfiles(response.data.records);
                setTotal(response.data.total);

                // Tính toán số trang mới dựa trên tổng số hồ sơ và offset
                const totalPages = Math.ceil(response.data.total / offset);

                // Kiểm tra xem trang hiện tại có lớn hơn tổng số trang mới không
                // Nếu có, đặt lại trang hiện tại về trang cuối cùng
                if (page >= totalPages) {
                    setPage(totalPages - 1);
                }
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

    const handleProfileUpdate = () => {
        // fetchProfiles();
        setSelectedProfile(null);
    };

    const handleProfileSelect = (profile) => {
        setSelectedProfile(profile);
    };

    const handleProfileDelete = async (profileId) => {
        try {
            await axios.delete(`http://localhost:9091/profiles/${profileId}`);
            // fetchProfiles();
        } catch (err) {
            console.error('Error deleting profile:', err);
        }
    };
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`http://localhost:9091/api/audit/profile/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchProfiles(page);
            setIsDeletePopupOpen(false);
        } catch (err) {
            console.error('Error deleting profile:', err);
        }
    };

    const handleEdit = async (updatedProfile) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.put(`http://localhost:9091/api/audit/profile/${updatedProfile.id}`, updatedProfile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchProfiles(page);
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

    return (
        <div className={cx('admin')}>
            <Sidebar />
            <div className={cx('sidebar')}>
                <SearchForm
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    onAddProfile={openAddProfilePopup}
                />
                <ProfileList profiles={profiles} total={total} page={page} offset={offset} setPage={setPage} handleDelete={openDeletePopup}
                    handleEdit={openEditPopup} />
                {/* <ProfileForm profile={selectedProfile} onUpdate={handleProfileUpdate} /> */}
            </div>
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


export default Admin;
