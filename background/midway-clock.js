midway.clock = {};

midway.clock.getServerTime = async function () {
    const idToken = midway.auth.user.idToken;
    return await midway.fetch.fromDatabase("$clock", null, idToken, {
        requestOptions: {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({".sv":"timestamp"})
        }
    })
}