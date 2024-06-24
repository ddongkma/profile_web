import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileFileList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useToast } from '~/common/context/ToastContext';
const cx = classNames.bind(styles);

const ProfileFileList = ({ selectedProfile, fileList, onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileToUploadId, setFileToUploadId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [fileListState, setFileListState] = useState(fileList);
    const [refreshProfileDetail, setRefreshProfileDetail] = useState(false); // St
    const [loadingDownload, setLoadingDownload] = useState(false);
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
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const fileContent = reader.result.split(',')[1]; // Lấy phần base64
                setSelectedFile(fileContent);
                setFileName(file.name);
                if (fileToUploadId !== null) {
                    await handleUpload(selectedProfile.id, fileToUploadId, fileContent, file.name);
                }
            };
            reader.readAsDataURL(file);
        } else {
            addToast({
                title: 'Upload thất bại!',
                message: 'Please select a PDF file.',
                type: 'error',
                duration: 5000,
            });

        }
    };
    const handleUpload = async (profile_id, file_id, fileContent, fileName) => {
        try {
            setUploading(true);
            const token = localStorage.getItem('access_token');
            const res = await axios.post(`http://localhost:9091/api/audit-profile/${profile_id}/${file_id}`, {
                name: fileName,
                content: fileContent
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.errorCode === "SUCCESS") {
                addToast({
                    title: 'Upload thành công!',
                    message: 'Upload thành công!',
                    type: 'success',
                    duration: 5000,
                });
            } else if (res.data.errorCode === "ERROR") {
                addToast({
                    title: 'Upload thất bại!',
                    message: res.data.data,
                    type: 'error',
                    duration: 5000,
                });
            }
            setRefreshProfileDetail(true);
        } catch (error) {
            addToast({
                title: 'Upload thất bại!',
                message: error.message,
                type: 'error',
                duration: 5000,
            });
        } finally {
            setUploading(false); // Kết thúc upload (thành công, thất bại đều dừng)
            setFileToUploadId(null);
        }
    };
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

    const downloadFile = async (fileName) => {
        try {
            setLoadingDownload(true);
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`http://localhost:9091/api/audit-profile/file?fileName=${fileName}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'text', // Phản hồi là dạng text (chuỗi base64)
            });

            const pdfFile = `data:application/pdf;base64,${response.data}`;

            // Tạo một link tạm thời để hiển thị hoặc download file
            const link = document.createElement('a');
            link.href = pdfFile;
            link.target = '_blank'; // Mở trong tab mới (tùy chọn)
            link.rel = 'noopener noreferrer'; // An toàn hơn khi mở tab mới
            link.download = `${fileName}.pdf`; // Tên file khi download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
            addToast({
                title: 'Download thất bại!',
                message: 'Có lỗi xảy ra khi tải xuống file.',
                type: 'error',
                duration: 5000,
            });
        } finally {
            setLoadingDownload(false); // Kết thúc loading sau khi hoàn thành hoặc thất bại download
        }
    };
    const renderAction = (file) => {
        let actionIcon, actionLabel, actionHandler;
        switch (file.status) {
            case 0:
                actionIcon = faUpload;
                actionLabel = 'Upload';
                actionHandler = () => triggerFileInput(file.id);
                break;
            case 1:
            case 2:
                actionIcon = faDownload;
                actionLabel = 'Download';
                actionHandler = () => downloadFile(file.fileName);
                break;
            case 3:
                actionIcon = faUpload;
                actionLabel = 'Re-upload';
                actionHandler = () => triggerFileInput(file.id);
                break;
            default:
                actionIcon = null;
                actionLabel = 'Unknown';
                actionHandler = null;
                break;
        }
        return (
            <div>
                <button className={cx('actionButton')} onClick={actionHandler}>
                    <FontAwesomeIcon icon={actionIcon} />
                    {actionLabel}
                </button>
            </div>
        );
    };
    useEffect(() => {
        if (refreshProfileDetail && selectedProfile) {
            fetchProfileFiles(selectedProfile.id);
            setRefreshProfileDetail(false); // Reset refreshProfileDetail để không gọi lại fetch liên tục
        }
    }, [refreshProfileDetail, selectedProfile]);
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
                            <th>Action</th>
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
                                <td>{renderAction(file)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <input
                    id="fileInput"
                    type="file"
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
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
                <button className={cx('closeButton')} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ProfileFileList;
