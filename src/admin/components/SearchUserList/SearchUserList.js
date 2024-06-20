
import React from 'react';
import styles from './SearchUserList.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const SearchUserList = ({ users, total, page, offset, setPage, handleDelete, handleEdit }) => {
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
        <div className={cx('staffList')}>
            <h2>Staffs List</h2>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Staff Code</th>
                        <th>Role</th>
                        <th>Shop Code</th>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Tel</th>
                        <th>Create Date</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td className={cx('no')}>{page * offset + index + 1}</td>
                            <td className={cx('staffCode')}>{user.staffCode}</td>
                            <td className={cx('role')}>{user.role}</td>
                            <td className={cx('shopCode')}>{user.shopCode}</td>
                            <td className={cx('name')}>{user.name}</td>
                            <td className={cx('birthday')}>{user.birthday}</td>
                            <td className={cx('tel')}>{user.tel}</td>
                            <td className={cx('createDate')}>{user.createDate}</td>
                            <td className={cx('status')}>{user.status}</td>
                            <td className={cx('startDate')}>{user.startDate}</td>
                            <td className={cx('actions')}>
                                <button onClick={() => handleEdit(user)} className={cx('editButton')}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button onClick={() => handleDelete(user)} className={cx('deleteButton')}>
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

export default SearchUserList;
