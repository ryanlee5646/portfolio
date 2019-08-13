import Api from '@/services/Api';

// 이건 변경되면 안된다.
const BASE_URL = 'https://lab.ssafy.com/api/v4';

export default {
    getRepos(userName, accessToken) {
        return Api(BASE_URL, accessToken).get(`/users/${userName}/projects`);
    },
    getCommits(accessToken, projectId) {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        return Api(BASE_URL, accessToken).get(`/projects/${projectId}/repository/commits?per_page=100&since=${d.toISOString()}`);
    },
    getProjects(accessToken, userName, page) {
        return Api(BASE_URL, accessToken).get(`/users/${userName}/events?per_page=100&page=${page}`);
    },
    getProjectCommits(projectId, accessToken) {
        return Api(BASE_URL, accessToken).get(`/projects/${projectId}/repository/commits?per_page=100`);
    }
};
