import classNames from 'classnames';
import { useState, forwardRef } from 'react'
import images from '~/common/assets/images';
import styles from './Image.module.scss';

const Image = forwardRef(({ src, alt, className, ...props }, ref) => {
    const [fallBack, setFallBack] = useState('')
    const handleError = () => {
        setFallBack(images.noImage)
    }
    return <img className={classNames(styles.wrapper, className)} src={fallBack || src} alt={alt} ref={ref} {...props} onError={handleError} />
})

export default Image;