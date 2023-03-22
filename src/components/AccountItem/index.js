import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles)

function AccountItem() {
    return (
        <div className={cx('wrapper')} >
            <img className={cx('avatar')} src="https://scontent.fhan2-1.fna.fbcdn.net/v/t31.18172-8/10455011_1431270377143193_5847901747298447559_o.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=RutGlrgUa9cAX-_xDjG&tn=CCyH4zXSoooG7e33&_nc_ht=scontent.fhan2-1.fna&oh=00_AfCTnqfuhurphgVaTRgNuRCXBIB-JYoSMAxD5t8tHF0nrg&oe=63A29B0E" alt="Hoa" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Đoàn Đình Đồng</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('usename')}>doandinhdong</span>
            </div>
        </div>
    );
}

export default AccountItem;