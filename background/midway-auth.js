
midway.auth = {};
midway.auth.user = { isSignedIn: false };

///////////////////////// PART 1: GENERAL SIGN-IN ///////////////////////////
midway.auth.signInWithWeb = async function () {
    // authentication will use website to sign in

    // now we should have received a refresh token
    midway.auth.user.refreshToken = refreshToken;
    midway.auth.user.isSignedIn = true;
}

midway.auth.signInWithPopup = async function () {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider)
        .then((result) => { result.user.refreshToken })
}

midway.auth.getIdToken = async function (refreshToken) {
    // convert refresh token to id token
    // refer to https://firebase.google.com/docs/reference/rest/auth#section-refresh-token
    const tokenRequestUrl = `https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`;
    const tokenRequestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    }

    const data = await midway.fetch.fetch(tokenRequestUrl,tokenRequestOptions);

    return data.id_token;

    // TODO error handling
}

///////////////////////// PART 2: SCHOOL CODE AUTH //////////////////////////
// assuming that sign in process worked



///////////////////////// PART 3: USE UPDATE INTERVAL ///////////////////////