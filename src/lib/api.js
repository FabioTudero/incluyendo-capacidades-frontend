export default function api(path, options = {}) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    return fetch(`${baseUrl}${path}`, {
        ...options,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...options.headers,
        },
    }).then(async (response) => {
        const data = await response.json().catch(() => null);
        if (!response.ok) {
            throw Object.assign(new Error(data?.message || `Error ${response.status}`), {
                status: response.status,
                data,
            });
        }
        return data;
    });
}