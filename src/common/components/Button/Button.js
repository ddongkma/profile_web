import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './Button.module.scss';

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    primary = false,
    className,
    rounded = false,
    disabled = false,
    text = false,
    outline = false,
    small = false,
    large = false,
    leftIcon,
    rightIcon,
    children,
    onClick,
    ...passProps }) {
    let Comp = 'button'

    const props = {
        onClick,
        ...passProps
    }
    if (disabled) {
        delete props.onClick
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        primary,
        outline,
        text,
        small,
        large,
        disabled,
        rounded,
        leftIcon,
        rightIcon,
    }, className);
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')} >{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
    text: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
}

export default Button;