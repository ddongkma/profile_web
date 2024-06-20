import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchUserFrom.module.scss';

const cx = classNames.bind(styles);

const SearchUserForm = ({ filters, onFilterChange, onSearch, onAddProfile, shopcodes, roles }) => {

    const [shopId, setShopId] = useState('');
    const [roleId, setRoleId] = useState('');
    const [status, setStatus] = useState('');
    const [staffCode, setStaffCode] = useState('');
    const [shopCode, setShopCode] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const statusOptions = [
        { value: '', label: 'Select a status' },
        { value: '0', label: 'Disable' },
        { value: '1', label: 'Active' }
    ];

    const formatDate = (date) => {
        const d = new Date(date);
        let day = d.getDate();
        let month = d.getMonth() + 1; // Months are zero-indexed
        const year = d.getFullYear();


        if (day < 10) day = `0${day}`;
        if (month < 10) month = `0${month}`;

        return `${day}/${month}/${year}`;
    };
    const handleSearch = (e) => {
        e.preventDefault();
        const searchCriteria = {
            shopId,
            roleId,
            status,
            staffCode,
            fromDate: fromDate ? formatDate(fromDate) : '',
            toDate: toDate ? formatDate(toDate) : ''
        };
        onSearch(searchCriteria);
    };


    return (
        <div className={cx('search-form')}>
            <h3 className={cx('title')}>Search Profile</h3>
            <form onSubmit={handleSearch} className={cx('form')}>
                <div className={cx('row')}>
                    <div className={cx('filter-container')}>
                        <label htmlFor="branchCode">Branch:</label>
                        <select
                            id="branchCode"
                            value={filters.branchCode}
                            onChange={(e) => setShopId(e.target.value)}
                            className={cx('input')}
                        >
                            <option value="">-----Select a branch-----</option>
                            {shopcodes.map((code) => (
                                <option key={code.shopId} value={code.shopId}>{code.shopCode + "-" + code.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('filter-container')}>
                        <label htmlFor="roleId">Roles:</label>
                        <select
                            id="roleId"
                            value={filters.roleId}
                            onChange={(e) => setRoleId(e.target.value)}
                            className={cx('input')}
                        >
                            <option value="">-----Select a Role-----</option>
                            {roles.map((role) => (
                                <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('filter-container')}>
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={cx('input')}
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('filter-container')}>
                        <label htmlFor="staffCode">Staff Code:</label>
                        <input
                            type="text"
                            id="staffCode"
                            value={staffCode}
                            onChange={(e) => setStaffCode(e.target.value)}
                            className={cx('input')}
                        />
                    </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('filter-container')}>
                        <label htmlFor="fromDate">From Date:</label>
                        <input
                            type="date"
                            id="fromDate"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className={cx('input')}
                        />
                    </div>
                    <div className={cx('filter-container')}>
                        <label htmlFor="toDate">To Date:</label>
                        <input
                            type="date"
                            id="toDate"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className={cx('input')}
                        />
                    </div>
                </div>
                <div className={cx('buttons')}>
                    <button type="submit" className={cx('search-button')}>Search Staff</button>
                    <button type="button" onClick={onAddProfile} className={cx('add-button')}>Add Staff</button>
                </div>
            </form>
        </div>
    );
};

export default SearchUserForm;
