import React, { useState } from 'react';
import styles from './Listlog.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faPenToSquare, faCircleInfo, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';

import DetailLog from '../DetailLog/DetailLog';

const cx = classNames.bind(styles);

const Listlog = ({ profiles, total, page, offset, setPage }) => {
    const [fileList, setFileList] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [showProfileFileList, setShowProfileFileList] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDetail = async (profile) => {
        setLoading(true);
        setSelectedProfile(profile);
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`http://localhost:9091/api/audit-profile/detail/${profile.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFileList(response.data);
            setShowProfileFileList(true);
        } catch (error) {
            console.error('Error fetching profile files:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProfileFiles = async (profileId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`http://localhost:9091/api/audit-profile/detail/${profileId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFileList(response.data);
        } catch (error) {
            console.error('Error fetching profile files:', error);
        }
    };

    const totalPages = Math.ceil(total / offset);

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleCloseProfileFileList = () => {
        setSelectedProfile(null);
        setShowProfileFileList(false);
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    return (
        <div className={cx('profileList')}>
            <h2>Profile List</h2>
            {profiles && profiles.length > 0 ? (
                <React.Fragment>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>ISDN</th>
                                <th>Action Type</th>
                                <th>Table name</th>
                                <th>Table ID</th>
                                <th>Create Date</th>
                                <th>Update Date</th>
                                <th>Auditor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.map((profile, index) => (
                                <tr key={profile.id}>
                                    <td className={cx('no')}>{page * offset + index + 1}</td>
                                    <td className={cx('isdn')}>{profile.isdn}</td>
                                    <td className={cx('actionDescription')}>{profile.actionType}</td>
                                    <td className={cx('userCollect')}>{profile.tableName}</td>
                                    <td className={cx('shopCollect')}>{profile.tableId}</td>
                                    <td className={cx('createDate')}>{profile.createDate}</td>
                                    <td className={cx('updateDate')}>{profile.updateDate}</td>
                                    <td className={cx('auditor')}>{profile.auditor}</td>
                                    <td className={cx('actions')}>
                                        <button onClick={() => handleDetail(profile)} className={cx('editButton')}>
                                            <FontAwesomeIcon icon={faCircleInfo} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={styles.pagination}>
                        <button onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
                        <span>Page {page + 1} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={page >= totalPages - 1}>Next</button>
                    </div>
                </React.Fragment>
            ) : (
                <p>No profiles found.</p>
            )}
            {loading && (
                <div className={styles.loading}>
                    <FontAwesomeIcon icon={faSpinner} className={cx('spinner')} />
                </div>
            )}
            {/* {showProfileFileList && selectedProfile && (
                <DetailLog selectedProfile={selectedProfile} fileList={fileList} onClose={handleCloseProfileFileList} />
            )} */}
        </div>
    );
};

export default Listlog;
