
import React, { useState } from 'react';
import styles from './ProfileListC.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faPenToSquare, faCircleInfo, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import ProfileFileList from '../ProfileFileList/ProfileFileList';
const cx = classNames.bind(styles);
const ProfileListC = ({ profiles, total, page, offset, setPage }) => {
    const [fileList, setFileList] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null); // State để lưu profile được chọn
    const [showProfileFileList, setShowProfileFileList] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleDetail = async (profile) => {
        setLoading(true); // Bắt đầu loading khi bắt đầu fetch dữ liệu
        setSelectedProfile(profile); // Lưu profile được chọn vào state
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`http://localhost:9091/api/audit-profile/detail/${profile.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFileList(response.data); // Lưu danh sách file vào state
            setShowProfileFileList(true); // Hiển thị popup
        } catch (error) {
            console.error('Error fetching profile files:', error);
        } finally {
            setLoading(false); // Dừng loading sau khi fetch xong (hoặc lỗi)
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
            console.log(response.data)
            setFileList(response.data); // Lưu danh sách file vào state
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
        setSelectedProfile(null); // Đặt lại selectedProfile thành null để đóng popup
        setShowProfileFileList(false); // Ẩn popup
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };
    return (
        <div className={cx('profileList')}>
            <h2>Profile List</h2>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>ISDN</th>
                        <th>Action Description</th>
                        <th>User Collect</th>
                        <th>Shop Collect</th>
                        <th>Is Full File</th>
                        <th>Audit Review</th>
                        <th>Create Date</th>
                        <th>Update Date</th>
                        <th>Status</th>
                        <th>Sub Status</th>
                        <th>Auditor</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map((profile, index) => (
                        <tr key={profile.id}>
                            <td className={cx('no')}>{page * offset + index + 1}</td>
                            <td className={cx('isdn')}>{profile.isdn}</td>
                            <td className={cx('actionDescription')}>{profile.actionDescription}</td>
                            <td className={cx('userCollect')}>{profile.userCollect}</td>
                            <td className={cx('shopCollect')}>{profile.shopCollect}</td>
                            <td className={cx('isFullFile')}>{profile.isFullFile}</td>
                            <td className={cx('auditReview')}>{profile.auditReview}</td>
                            <td className={cx('createDate')}>{profile.createDate}</td>
                            <td className={cx('updateDate')}>{profile.updateDate}</td>
                            <td className={cx('status')}>{profile.status}</td>
                            <td className={cx('subStatus')}>{profile.subStatus}</td>
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
            {loading && (
                <div className={styles.loading}>
                    <FontAwesomeIcon icon={faSpinner} className={cx('spinner')} />
                </div>
            )}
            {showProfileFileList && selectedProfile && (
                <ProfileFileList selectedProfile={selectedProfile} fileList={fileList} onClose={handleCloseProfileFileList} />
            )}
        </div>
    );
}

export default ProfileListC;
