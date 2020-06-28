
midway.auth = {};
midway.auth.user = {};

// TODO standardize when id token needs to be obtained 
// manually and when it is autotomatically retrieved

///////////////////////// PART 1: GENERAL SIGN-IN ///////////////////////////
midway.auth.isSignedIn = function () {
    return !!midway.auth.user.refreshToken;
}

midway.auth.signInWithWeb = async function () {
    // authentication will use website to sign in

    // now we should have received a refresh token
    return midway.auth.user.refreshToken = refreshToken;
}

midway.auth.signInWithPopup = async function () {
    const provider = new firebase.auth.GoogleAuthProvider();

    const refreshToken = await firebase.auth().signInWithPopup(provider)
        .then((result) => result.user.refreshToken);

    return midway.auth.user.refreshToken = refreshToken;
}

// convert refresh token to id token
midway.auth.getIdToken = async function () {

    const refreshToken = midway.auth.user.refreshToken;

    if (!refreshToken) {
        throw new Error("To generate an id token, you must supply a refresh token.");
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

    if (data.hasOwnProperty("error")) {
        throw new Error(data.error.message);
    }

    // data.expires_in (seconds)
    midway.auth.user.id = data.user_id;
    midway.auth.user.idToken = data.id_token;
    midway.auth.user.expirationDate = midway._secondsToMillis(data.expires_in) + Date.now();

    return data.id_token;
}

// gets new id token only if necessary
midway.auth.autoGetIdToken = async function () {
    const expirationDate = midway.auth.user.expirationDate;
    const timeBuffer = 5;// allow 5 seconds of leeway for id token to expire

    if (expirationDate &&
        expirationDate - timeBuffer > Date.now()) {
        return midway.auth.user.idToken;
    }

    return midway.auth.getIdToken()
}

// gets information like the user's email
midway.auth.getUserDetails = async function () {

    const idToken = midway.auth.user.idToken;

    if (!idToken) {
        throw new Error("idToken must be available before getting user details")
    }

    // refer to https://firebase.google.com/docs/reference/rest/auth#section-get-account-info
    const requestUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`;
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken })
    }

    const data = await midway.fetch.fetch(requestUrl, requestOptions);

    if (data.hasOwnProperty("error")) {
        throw new Error(data.error.message);
    }

    midway.auth.user.email = data[0].email;
    midway.auth.user.emailVerified = data[0].emailVerified;
    midway.auth.user.displayName = data[0].displayName;
    midway.auth.user.disabled = data[0].disabled;
    midway.auth.user.createdAt = data[0].createdAt;
    midway.auth.user.lastLoginAt = data[0].lastLoginAt;

    return midway.auth.user;
}

midway._secondsToMillis = (seconds) => seconds * 1000;

///////////////////////// PART 2: SCHOOL CODE AUTH //////////////////////////
// assuming that sign in process worked, we now have an id token

midway.auth.getSchoolCodeFromStorage = async function () {
    const userId = midway.auth.user.id;
    const idToken = midway.auth.user.idToken;

    const schoolCode = await midway.fetch.fromCache("schoolCode", userId, idToken);

    return schoolCode;
}

midway.auth.getSchoolCodesFromEmail = async function () {
    const {email} = await midway.auth.getUserDetails();

    const domain = midway.auth.getDomainFromEmail(email);
}

midway.auth.getDomainFromEmail = (email) => email.split("@")[1].replace(/\./g,"%25");




///////////////////////// PART 3: USE UPDATE INTERVAL ///////////////////////