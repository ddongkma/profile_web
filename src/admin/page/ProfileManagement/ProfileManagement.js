import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ProfileManagement.module.scss';
import SearchForm from '~/admin/components/SearchForm/SearchForm';
import ProfileList from '~/admin/components/ProfileList/ProfileList';
import PopupDelete from '~/admin/components/Popup/PopupDelete';
import PopupEdit from '~/admin/components/Popup/PopupEdit';
import AddProfilePopup from '~/admin/components/AddProfilePopup/AddProfilePopup';

const cx = classNames.bind(styles);

const ProfileManagement = () => {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [showAddProfilePopup, setShowAddProfilePopup] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get('http://localhost:9091/api/audit/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setProfiles(response.data.records);
        } catch (err) {
            console.error('Error fetching profiles:', err);
        }
    };

    const handleSearch = (searchCriteria) => {
        axios.post('http://localhost:9091/api/audit/profile/search', searchCriteria)
            .then(response => {
                setProfiles(response.data.records);
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
            fetchProfiles();
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
            fetchProfiles();
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
        <div className={cx('profile-management')}>
            <SearchForm
                onSearch={handleSearch}
                onAddProfile={openAddProfilePopup}
            />
            <ProfileList
                profiles={profiles}
                handleDelete={openDeletePopup}
                handleEdit={openEditPopup}
            />
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

export default ProfileManagement;
