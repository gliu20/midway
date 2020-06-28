
midway.auth = {};
midway.auth.user = {};

///////////////////////// PART 1: GENERAL SIGN-IN ///////////////////////////
midway.auth.isSignedIn = function () {
    return !!midway.auth.user.refreshToken;
}

midway.auth.signInWithWeb = async function () {
    // authentication will use website to sign in

    // now we should have received a refresh token
    midway.auth.user.refreshToken = refreshToken;
}

midway.auth.signInWithPopup = async function () {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider)
        .then((result) => { result.user.refreshToken })
}

// convert refresh token to id token
midway.auth.getIdToken = async function () {

    const refreshToken = midway.auth.user.refreshToken;

    if (!refreshToken) {
        throw new Error ("To generate an id token, you must supply a refresh token.");
    }

    // refer to https://firebase.google.com/docs/reference/rest/auth#section-refresh-token
    const tokenRequestUrl = `https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`;
    const tokenRequestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    }

    const data = await midway.fetch.fetch(tokenRequestUrl, tokenRequestOptions);

    // data.expires_in (seconds)
    midway.auth.user.idToken = data.id_token;
    midway.auth.user.expirationDate = midway._secondsToMillis(data.expires_in) + Date.now();

    return data.id_token;

    // TODO error handling
}

// gets new id token only if necessary
midway.auth.autoGetIdToken = async function () {
    if (midway.auth.user.expirationDate &&
        midway.auth.user.expirationDate > Date.now()) {
        return midway.auth.user.idToken;
    }

    return midway.auth.getIdToken()
}

midway._secondsToMillis = (seconds) => seconds * 1000;

///////////////////////// PART 2: SCHOOL CODE AUTH //////////////////////////
// assuming that sign in process worked, we now have an id token
midway.auth




///////////////////////// PART 3: USE UPDATE INTERVAL ///////////////////////