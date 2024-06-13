
import * as request from '~/common/utils/request';

export const getSuggested = async ({ page, perPage }) => {
    try {
        const res = await request.get('users/suggested', {
            params: {
                page,
                per_page: perPage
            }
        })
        return res.data;
    } catch (e) {
        console.log(console.error())
    }
}