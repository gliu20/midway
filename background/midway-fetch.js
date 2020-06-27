const fetchLookup = {
    absentTeachers: ({schoolId}) => `schools/${schoolId}/absentTeachers`,
    announcements: ({schoolId}) => `schools/${schoolId}/announcements`,
    schoolSchedule: ({schoolId,dateString}) => `schools/${schoolId}/schoolSchedule/${dateString}`,
    schoolCode: ({userId}) => `users/${userId}/schoolCode`,
    $lastUpdated: ({schoolId}) => `schools/${schoolId}/lastUpdated`
};

midway.fetch = async function (type,identifiers,idToken,{urlParams,requestOptions}) {

    if (type.charAt(0) === "$") {
        return new Error ("Fetch should not be used to obtain special/non-cachable values");
    }

    // check cache
    const cachedData = cache.get(type);

    if (cachedData.success) {
        return cachedData.data;
    }

    // cache missed
    // now we need to figure out if we should update
    const fetchPath = fetchLookup[type](identifiers);
    const urlParams = urlParams ? `&${urlParams}` : "";
    const fullUrl = `${firebaseConfig.databaseURL}/${fetchPath}.json?auth=${idToken}${urlParams}`;

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