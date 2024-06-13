import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchForm.module.scss';

import axios from 'axios';

const cx = classNames.bind(styles);

const SearchForm = ({ onFilterChange, onSearch, onAddProfile }) => {
    const [branchList, setBranchList] = useState([]);
    const [branchCode, setBranchCode] = useState('');
    const [isdn, setIsdn] = useState('');
    const [status, setStatus] = useState('');
    const [substatus, setSubstatus] = useState('');
    const [shopCode, setShopCode] = useState('');
    const statusOptions = [
        { value: '', label: 'Select a status' },
        { value: '0', label: 'Lackfile' },
        { value: '1', label: 'Fullfile' }
    ];

    const substatusOptions = {
        '': [{ value: '', label: 'Select a substatus' }],
        '1': [
            { value: '', label: 'Select a substatus' },
            { value: '1', label: 'Substatus 1' },
            { value: '2', label: 'Substatus 2' },
            // Thêm các substatus khác tương tự
        ]
    };
    // useEffect(() => {
    //     // Call API để tải danh sách các branch khi component được tạo
    //     axios.get('http://example.com/api/branches')
    //         .then(response => {
    //             setBranchList(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching branch list:', error);
    //         });
    // }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchCriteria = { branchCode, isdn, status, shopCode };
        if (status === '1') {
            searchCriteria.substatus = substatus;
        }
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
                            value={branchCode}
                            onChange={(e) => setBranchCode(e.target.value)}
                            className={cx('input')}
                        >
                            <option value="">Select a branch</option>
                            {branchList.map(branch => (
                                <option key={branch.id} value={branch.id}>{branch.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('filter-container')}>
                        <label htmlFor="isdn">ISDN:</label>
                        <input
                            type="text"
                            id="isdn"
                            value={isdn}
                            onChange={(e) => setIsdn(e.target.value)}
                            className={cx('input')}
                        />
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
                    {status === '1' && (
                        <div className={cx('filter-container')}>
                            <label htmlFor="substatus">Substatus:</label>
                            <select
                                id="substatus"
                                value={substatus}
                                onChange={(e) => setSubstatus(e.target.value)}
                                className={cx('input')}
                            >
                                {substatusOptions[status].map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
                <div className={cx('row')}>
                    <div className={cx('filter-container')}>
                        <label htmlFor="shopCode">Shop Code:</label>
                        <input
                            type="text"
                            id="shopCode"
                            value={shopCode}
                            onChange={(e) => setShopCode(e.target.value)}
                            className={cx('input')}
                        />
                    </div>
                </div>
                <div className={cx('buttons')}>
                    <button type="submit" className={cx('search-button')}>Search</button>
                    <button type="button" onClick={onAddProfile} className={cx('add-button')}>Add Profile</button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
