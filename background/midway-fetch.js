const fetchLookup = {
    absentTeachers: ({schoolId}) => `schools/${schoolId}/absentTeachers`,
    announcements: ({schoolId}) => `schools/${schoolId}/announcements`,
    schoolSchedule: ({schoolId,dateString}) => `schools/${schoolId}/schoolSchedule/${dateString}`,
    updateInterval: ({schoolId}) => `schools/${schoolId}/updateInterval`,
    schoolCode: ({userId}) => `users/${user.uid}/schoolCode`
};

midway.fetch = async function (type,identifiers,idToken,{urlParams,requestOptions}) {

    // check cache
    const cachedData = cache.get(type);

    if (cachedData.success) {
        // skip fetch if recent cached data is found
        return cachedData.data;
    }

    const fetchPath = fetchLookup[type](identifiers);
    const fullUrl = [
        firebaseConfig.databaseURL,
        `/${fetchPath}`,
        `.json?auth=${idToken}`,
        urlParams ? `&${urlParams}` : ""
    ].join("");

    const data = fetch(fullUrl, requestOptions)
        .then(response => {
            if (!response.ok) { throw new Error (response.statusText) }
            return response;
        })
        .then(response => response.json());

    // update cache
    cache.set(type,data);

    return data;

}