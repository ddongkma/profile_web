import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchProfileFormC.module.scss';

const cx = classNames.bind(styles);

const SearchProfileFormC = ({ filters, onFilterChange, onSearch, shopcodes }) => {

    const [branchCode, setBranchCode] = useState('');
    const [isdn, setIsdn] = useState('');
    const [status, setStatus] = useState('');
    const [substatus, setSubstatus] = useState('');
    const [shopCode, setShopCode] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const statusOptions = [
        { value: '', label: 'Select a status' },
        { value: '0', label: 'Lackfile' },
        { value: '1', label: 'Fullfile' }
    ];

    const substatusOptions = {
        '': [{ value: '', label: 'Select a substatus' }],
        '1': [
            { value: '', label: 'Select a substatus' },
            { value: '3', label: 'Need to preview' },
            { value: '4', label: 'CC approved' },
            { value: '5', label: 'CC Rejected' },

        ]
    };
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
            branchCode,
            isdn,
            status,
            shopCode,
            fromDate: fromDate ? formatDate(fromDate) : '',
            toDate: toDate ? formatDate(toDate) : ''
        };
        if (status === '1') {
            searchCriteria.subStatus = substatus;
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
                            value={filters.branchCode}
                            onChange={(e) => setBranchCode(e.target.value)}
                            className={cx('input')}
                        >
                            <option value="">-----Select a branch-----</option>
                            {Array.isArray(shopcodes) && shopcodes.map((code) => (
                                <option key={code.shopCode} value={code.shopCode}>{code.shopCode + "-" + code.name}</option>
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
                    <button type="submit" className={cx('search-button')}>Search</button>
                </div>
            </form>
        </div>
    );
};

export default SearchProfileFormC;
