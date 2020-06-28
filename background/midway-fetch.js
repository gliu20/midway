midway.fetch = {};

midway.fetch.fetchLookup = {
    absentTeachers: ({ schoolId }) => `schools/${schoolId}/absentTeachers`,
    announcements: ({ schoolId }) => `schools/${schoolId}/announcements`,
    schoolSchedule: ({ schoolId, dateString }) => `schools/${schoolId}/schoolSchedule/${dateString}`,
    schoolCode: ({ userId }) => `users/${userId}/schoolCode`,
    $lastUpdated: ({ schoolId }) => `schools/${schoolId}/lastUpdated`
};

midway.fetch.fetch = async function (url, requestOptions) {
    return fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) { throw new Error(response.statusText) }
            return response;
        })
        .then(response => response.json());
}

midway.fetch.fromDatabase = async function (type, identifiers, idToken, { urlParams, requestOptions }) {

    const fetchPath = fetchLookup[type](identifiers);
    const urlParams = urlParams ? `&${urlParams}` : "";
    const fullUrl = `${firebaseConfig.databaseURL}/${fetchPath}.json?auth=${idToken}${urlParams}`;

    return midway.fetch.fetch(fullUrl, requestOptions);
}

midway.fetch.fromCache = async function (type, identifiers, idToken, { urlParams, requestOptions }) {

    if (type.charAt(0) === "$") {
        return new Error("cachedFetch should not be used to obtain special/non-cachable values");
    }

    // check cache
    const cachedData = cache.get(type);

    if (cachedData.success) {
        // cache age is appropriate and available, so return cached data
        return cachedData.data;
    }

    // cache missed, so fetch the data
    const data = midway.fetch.fromDatabase(type, identifiers, idToken, { urlParams, requestOptions });

    // update cache and return data
    return cache.set(type, data);

}