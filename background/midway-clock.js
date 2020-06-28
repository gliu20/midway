midway.clock = {};

midway.clock.getServerTime = async function () {
    const idToken = midway.auth.user.idToken;

    if (!idToken) {
        throw new Error("idToken not found. Please run getIdToken or autoGetIdtoken.")
    }

    return await midway.fetch.fromDatabase("$clock", null, idToken, {
        requestOptions: {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ".sv": "timestamp" })
        }
    })
}

midway.clock.getSkew = async function () {
    // due to limited access to performance of requests
    // we will not account for network latency

    // ensure id token is in memory before running time sensitive operations
    await midway.auth.autoGetIdToken();

    const serverTime = await midway.clock.getServerTime();
    const clientEndTime = Date.now();
    const averageOneWayLatency = 35;

    return Math.max(clientEndTime - serverTime - averageOneWayLatency, 0);
}