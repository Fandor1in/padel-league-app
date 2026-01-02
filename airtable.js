const AIRTABLE_API_URL = 'https://api.airtable.com/v0';

function buildAirtableClient({ baseId, token }) {
    if (!baseId || !token) {
        throw new Error('Airtable baseId and token are required');
    }

    const request = async (path, options = {}) => {
        const response = await fetch(`${AIRTABLE_API_URL}/${baseId}/${path}`, {
            ...options,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...(options.headers || {})
            }
        });

        const data = await response.json();
        if (!response.ok) {
            const message = data?.error?.message || `HTTP ${response.status}`;
            throw new Error(message);
        }

        return data;
    };

    const listRecords = (tableName, params = {}) => {
        const query = new URLSearchParams(params).toString();
        const suffix = query ? `?${query}` : '';
        return request(`${encodeURIComponent(tableName)}${suffix}`);
    };

    const getRecord = (tableName, recordId) => {
        return request(`${encodeURIComponent(tableName)}/${recordId}`);
    };

    const createRecords = (tableName, records) => {
        return request(encodeURIComponent(tableName), {
            method: 'POST',
            body: JSON.stringify({ records })
        });
    };

    const updateRecords = (tableName, records) => {
        return request(encodeURIComponent(tableName), {
            method: 'PATCH',
            body: JSON.stringify({ records })
        });
    };

    const deleteRecord = (tableName, recordId) => {
        return request(`${encodeURIComponent(tableName)}/${recordId}`, {
            method: 'DELETE'
        });
    };

    return {
        listRecords,
        getRecord,
        createRecords,
        updateRecords,
        deleteRecord
    };
}

if (typeof module !== 'undefined') {
    module.exports = { buildAirtableClient };
}
