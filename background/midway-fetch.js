midway.fetch = {};

midway.fetch.fetchLookup = {
    absentTeachers: ({ schoolId }) => `schools/${schoolId}/absentTeachers`,
    announcements: ({ schoolId }) => `schools/${schoolId}/announcements`,
    schoolSchedule: ({ schoolId, dateString }) => `schools/${schoolId}/schoolSchedule/${dateString}`,
    schoolCode: ({ userId }) => `users/${userId}/schoolCode`,
    emailLookup: ({ schoolDomain }) => `emailLookup/${schoolDomain}`,
    $lastUpdated: ({ schoolId }) => `schools/${schoolId}/lastUpdated`,
    $cacheAge: ({ schoolId }) => `schools/${schoolId}/cacheAge`,
    $clock: () => `util/time`
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

    urlParams = urlParams ? `&${urlParams}` : "";

    const fetchPath = midway.fetch.fetchLookup[type](identifiers);
    const fullUrl = `${firebaseConfig.databaseURL}/${fetchPath}.json?auth=${idToken}${urlParams}`;

    return midway.fetch.fetch(fullUrl, requestOptions);
}

midway.fetch.fromCache = async function (type, identifiers, idToken, { urlParams, requestOptions }) {

    // TODO add schoolId getter
    const cacheId = midway.fetch.generateCacheId(type,identifiers);

    if (type.charAt(0) === "$") {
        throw new Error("cachedFetch should not be used to obtain special/non-cachable values");
    }

    // check cache
    const cachedData = cache.get(cacheId);

    if (cachedData.success) {
        // cache age is appropriate and available, so return cached data
        return cachedData.data;
    }

    // cache missed, but we don't know if we should still keep the old data
    // to determine this, check if the data has been updated
    const lastUpdated = midway.fetch.fromDatabase("$lastUpdated",schoolId,idToken);

    if (lastUpdated < midway.clock.now() && cachedData.oldDataAvailable) {
        // server data hasn't been updated yet and cache still has old data
        // that we can reuse, so we give it back to client
        return cachedData.data;
    }

    // new data is required since cache doesn't have it or the data 
    // isn't recent enough
    const data = await midway.fetch.fromDatabase(type, identifiers, idToken, { urlParams, requestOptions });

    // update cache and return data
    return cache.set(cacheId, data);
}

midway.fetch.generateCacheId = (type,identifiers) => {
    const identifiersStr = JSON.stringify(identifiers);
    
    return type + encodeURIComponent(identifiersStr);
}