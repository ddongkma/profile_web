import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './DetailLog.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useToast } from '~/common/context/ToastContext';
const cx = classNames.bind(styles);

const DetailLog = ({ selectedProfile, fileList, onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileToUploadId, setFileToUploadId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [fileListState, setFileListState] = useState(fileList);
    const [refreshProfileDetail, setRefreshProfileDetail] = useState(false); // St
    const [loadingDownload, setLoadingDownload] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const { addToast } = useToast();
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };
    useEffect(() => {
        // Update fileListState khi fileList prop thay đổi
        setFileListState(fileList);
    }, [fileList]);
    useEffect(() => {
        // Gọi lại fetchProfileFiles khi selectedProfile thay đổi và refreshProfileDetail được set thành true
        if (refreshProfileDetail && selectedProfile) {
            fetchProfileFiles(selectedProfile.id);
            setRefreshProfileDetail(false); // Reset refreshProfileDetail sau khi đã gọi lại fetchProfileFiles
        }
    }, [refreshProfileDetail, selectedProfile]);

    const triggerFileInput = (fileId) => {
        setFileToUploadId(fileId);
        document.getElementById('fileInput').click();
    };
    const fetchProfileFiles = async (profileId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`http://localhost:9091/api/audit-profile/detail/${profileId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFileListState(response.data);
        } catch (error) {
            console.error('Error fetching profile files:', error);
        }
    };


    useEffect(() => {
        if (refreshProfileDetail && selectedProfile) {
            fetchProfileFiles(selectedProfile.id);
            setRefreshProfileDetail(false); // Reset refreshProfileDetail để không gọi lại fetch liên tục
        }
    }, [refreshProfileDetail, selectedProfile]);

    const handleApprove = async (fileId) => {
        try {
            console.log(fileId)
            const token = localStorage.getItem('access_token');
            const response = await axios.post(`http://localhost:9091/api/audit-profile-file-review-submit/${fileId}`, {
                actionType: "APPROVE",
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.code === "SUCCESS") {
                addToast({
                    title: 'Approve thành công!',
                    message: 'File đã được approve!',
                    type: 'success',
                    duration: 5000,
                });
                // Optionally trigger a refresh of the profile detail or file list
            } else {
                addToast({
                    title: 'Approve thất bại!',
                    message: response.data.data || 'Có lỗi xảy ra khi approve file.',
                    type: 'error',
                    duration: 5000,
                });
            }
        } catch (error) {
            console.error('Error approving file:', error);
            addToast({
                title: 'Approve thất bại!',
                message: 'Có lỗi xảy ra khi approve file.',
                type: 'error',
                duration: 5000,
            });
        }
    };

    const handleReject = async (fileId) => {
        try {

            const token = localStorage.getItem('access_token');
            const response = await axios.post(`http://localhost:9091/api/audit-profile-file-review-submit/${fileId}`, {
                actionType: "REJECT",
                description: "Hồ sơ bị từ chối",

            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.code === "SUCCESS") {
                addToast({
                    title: 'Reject thành công!',
                    message: 'File đã bị reject!',
                    type: 'success',
                    duration: 5000,
                });
                // Optionally trigger a refresh of the profile detail or file list
            } else {
                addToast({
                    title: 'Reject thất bại!',
                    message: response.data.data || 'Có lỗi xảy ra khi reject file.',
                    type: 'error',
                    duration: 5000,
                });
            }
        } catch (error) {
            console.error('Error rejecting file:', error);
            addToast({
                title: 'Reject thất bại!',
                message: 'Có lỗi xảy ra khi reject file.',
                type: 'error',
                duration: 5000,
            });
        }
    };

    return (
        <div className={cx('popupOverlay')}>
            <div className={cx('popup')}>
                <h3>Files of Profile ID: {selectedProfile.id}</h3>
                <table className={cx('fileTable')}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>File Name</th>
                            <th>Status</th>
                            <th>Create Date</th>
                            <th>Auditor</th>

                        </tr>
                    </thead>
                    <tbody>
                        {fileList.map((file, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{file.fileName}</td>
                                <td>{file.statusName}</td>
                                <td>{formatDate(file.createDate)}</td>
                                <td>{file.userName}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {uploading && (
                    <div className={styles.uploading}>
                        <FontAwesomeIcon icon={faSpinner} className={cx('spinner')} />
                        Uploading...
                    </div>
                )}
                {loadingDownload && (
                    <div className={styles.uploading}>
                        <FontAwesomeIcon icon={faSpinner} className={cx('spinner')} />
                        Downloading...
                    </div>
                )}
                <div className={cx('actionButtons')}>
                    <button className={cx('actionButton', 'approveButton')} onClick={() => handleApprove(selectedProfile.id)}>
                        Approve
                    </button>
                    <button className={cx('actionButton', 'rejectButton')} onClick={() => handleReject(selectedProfile.id)}>
                        Reject
                    </button>
                </div>
                <button className={cx('closeButton')} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default DetailLog;
