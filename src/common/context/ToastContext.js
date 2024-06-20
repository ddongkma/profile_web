
import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../toastmessage/Toast';
import styles from './ToastContext.module.scss';

const ToastContext = createContext();

export const useToast = () => {
    return useContext(ToastContext);
};

let toastId = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback(({ title, message, type, duration }) => {
        const id = toastId++;
        setToasts((prevToasts) => [
            ...prevToasts,
            { id, title, message, type, duration }
        ]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div id="toast" className={styles.toastContainer}>
                {toasts.map((toast) => (
                    <Toast key={toast.id} toast={toast} removeToast={removeToast} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};
