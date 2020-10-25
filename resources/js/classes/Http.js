export default class Http {
    static async request(method, url, args) {
        url = `${location.origin}/api/${url}`;
        const standard = {
            method: method,
            headers: {
                Accept: 'application/json',
                'X-CSRF-Token': document.querySelector('[name=csrf-token]')?.getAttribute('content'),
            },
        };
        const response = await fetch(url, {...standard, ...args});
        return response.status === 200 || response.status === 422 ? response.json() : false;
    }

    static async get(url) {
        return await Http.request('get', url);
    }

    static async post(url, args) {
        return await Http.request('post', url, args);
    }

    static async put(url, args) {
        return await Http.request('put', url, args);
    }

    static async delete(url, args) {
        return await Http.request('delete', url, args);
    }
}
