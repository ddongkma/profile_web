import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Audit.module.scss';
import { useUser } from '~/common/context/UserContext';
import { useToast } from '~/common/context/ToastContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import AuditSearch from './AuditSearch/AuditSearch';
import AuditList from './AuditList/AuditList';
const cx = classNames.bind(styles);

const Audit = () => {
    const [profiles, setProfiles] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [offset, setOffset] = useState(10);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        branch: '',
        isdn: '',
        status: '',
        shopcode: ''
    });
    const [shopcodes, setShopcodes] = useState([]);
    const { user, logout } = useUser();
    const { addToast } = useToast();
    useEffect(() => {
        fetchShopCodes()
        // fetchProfiles(page);
    }, []);
    const convertTimestampToDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const convertStatus = (status) => {
        return status === 0 ? 'Disable' : 'Active';
    };
    const fetchProfiles = async (page) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://localhost:9091/api/audit/profile/search', {
                branch: '',
                isdn: '',
                status: '',
                shopcode: '', page, offset
            });
            const profileData = response.data.records.map(profile => ({
                ...profile,
                createDate: convertTimestampToDate(profile.createDate),
                updateDate: convertTimestampToDate(profile.updateDate),
            }));
            setProfiles(profileData);
            setTotal(response.data.total);
        } catch (err) {
            console.error('Error fetching profiles:', err);
        }
        finally {
            setLoading(false); // Dừng loading sau khi fetch xong (hoặc lỗi)
        }
    };

    const fetchShopCodes = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get('http://localhost:9091/api/list-shop-tree?alwaysFilAllBranch=true', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setShopcodes(response.data);
        } catch (err) {
            console.error('Error fetching shop codes:', err);
        }
    };
    const handleSearch = (searchCriteria) => {
        setLoading(true);
        axios.post('http://localhost:9091/api/audit/profile/search', searchCriteria)
            .then(response => {
                const profileData = response.data.records.map(profile => ({
                    ...profile,
                    createDate: convertTimestampToDate(profile.createDate),
                    updateDate: convertTimestampToDate(profile.updateDate),
                }));
                setProfiles(profileData);
                setLoading(false)
            })
            .catch(error => {
                console.error('Error searching profiles:', error);
                setLoading(false)
            });
    };

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }));
    };
    const handleDetail = () => {

    };


    return (
        <div className={cx('profile-management')}>
            <AuditSearch
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                shopcodes={shopcodes}
            />
            {loading ? (
                <div className={styles.loading}>
                    <FontAwesomeIcon icon={faSpinner} className={cx('spinner')} />
                </div>
            ) : (
                <AuditList profiles={profiles} total={total} page={page} offset={offset} setPage={setPage} />
            )}
        </div>
    );
};

export default Audit;
