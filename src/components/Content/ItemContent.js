import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from './Content.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from "~/components/Image";
const cx = classNames.bind(styles)
function ItemContent({ data }) {

    return (

        <div className={cx('wrapper')}>
            <div className={cx('item-content')}>
                <Image
                    className={cx('avatar')}
                    src={data.user.avatar}
                    alt={data.user.nickname}
                />
                <div className={cx('content-container')}>
                    <div className={cx('infor-container')}>
                        <div className={cx('author-container')}>
                            <a className={cx('infor-author')} href>
                                <h3 className={cx('nickname')}>{data.user.nickname}</h3>
                                <h4 className={cx('name')}>{`${data.user.first_name} ${data.user.last_name}`}</h4>
                                {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                            </a>
                        </div>
                        <Button className={cx('btn-follow')} outline >Follow</Button>
                        <div className={cx('video-desc')}>
                            <span className={cx('spanText')}>{data.description}</span>
                        </div>
                    </div>

                    <div className={cx('video-wrapper')}>
                        <div className={cx('card-video')}>
                            <canvas className={cx('canvasCard-video')}>
                            </canvas>
                            <div className={cx('videoPlay-container')}>
                                <div className={cx('bassicPlayer-Wrapper')}>
                                    <div className={cx('xgpplayer')}>
                                        <video src={data.file_url} autoplay controls loop ></video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ItemContent;