
import React from 'react';
import styles from './ProfileList.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const ProfileList = ({ profiles, total, page, offset, setPage, handleDelete, handleEdit }) => {
    const totalPages = Math.ceil(total / offset);

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
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
                        <th>ID</th>
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
                    {profiles.map(profile => (
                        <tr key={profile.id}>
                            <td className={cx('id')}>{profile.id}</td>
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
                                <button onClick={() => handleEdit(profile.id)} className={cx('editButton')}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button onClick={() => handleDelete(profile.id)} className={cx('deleteButton')}>
                                    <FontAwesomeIcon icon={faTrash} />
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
        </div>
    );
}

export default ProfileList;
