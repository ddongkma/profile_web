import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ProfileForm.module.scss';

const cx = classNames.bind(styles);

const ProfileForm = ({ profile, onUpdate }) => {
    const [name, setName] = useState(profile ? profile.name : '');
    const [email, setEmail] = useState(profile ? profile.email : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (profile) {
                // Update existing profile
                await axios.put(`http://localhost:9091/profiles/${profile.id}`, { name, email });
            } else {
                // Create new profile
                await axios.post('http://localhost:9091/profiles', { name, email });
            }
            onUpdate();
            // Clear form fields
            setName('');
            setEmail('');
        } catch (err) {
            console.error('Error submitting profile:', err);
        }
    };

    return (
        <form className={cx('profile-form')} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type="submit">{profile ? 'Update' : 'Add'} Profile</button>
        </form>
    );
};

export default ProfileForm;
