import { useState, useEffect } from 'react'


import classNames from "classnames/bind";
import styles from './Home.module.scss'


import * as videoService from '~/common/services/videoService';
import Content from "~/common/components/Content";

const cx = classNames.bind(styles)
function Home() {
    const [video, setVideo] = useState([]);

    // useEffect(() => {
    //     videoService.getSuggested({ type: 'for-you', page: 1 }).then((data) => {
    //         setVideo(data)
    //     })
    //         .catch((error) => console.log(error))
    // })
    return (
        <div className={cx('wrapper')}>
            {/* <Content data={video} /> */}

        </div>
    );
}

export default Home;