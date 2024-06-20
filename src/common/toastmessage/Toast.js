
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faInfoCircle, faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

const Toast = ({ toast, removeToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration + 1000);
    return () => clearTimeout(timer);
  }, [toast, removeToast]);

  const icons = {
    success: faCheckCircle,
    info: faInfoCircle,
    warning: faExclamationCircle,
    error: faExclamationCircle,
  };
  const icon = icons[toast.type];
  const delay = (toast.duration / 1000).toFixed(2);

  return (
    <div
      className={cx('toast', `toast--${toast.type}`)}
      style={{ animation: `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards` }}
      onClick={() => removeToast(toast.id)}
    >
      <div className={cx('toast__icon')}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={cx('toast__body')}>
        <h3 className={cx('toast__title')}>{toast.title}</h3>
        <p className={cx('toast__msg')}>{toast.message}</p>
      </div>
      <div className={cx('toast__close')}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </div>
  );
};

export default Toast;
