export default function api(path, options = {}) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    return fetch(`${baseUrl}${path}`, options)
        .then(response => response.json());
}