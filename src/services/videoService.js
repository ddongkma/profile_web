
import * as request from '~/utils/request';

export const getSuggested = async ({ type, page }) => {
    try {
        const res = await request.get('videos', {
            params: {
                type,
                page
            }
        })
        return res.data;
    } catch (e) {
        console.log(console.error())
    }
}