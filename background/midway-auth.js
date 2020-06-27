
midway.auth = {};
midway.auth.user = {isSignedIn: false};

///////////////////////// PART 1: GENERAL SIGN-IN ///////////////////////////
midway.auth.signInViaWeb = async function () {
    // authentication will use website to sign in

    // now we should have received an id token and a refresh token
    midway.auth.user.idToken = idToken;
    midway.auth.user.refreshToken = refreshToken;
    midway.auth.user.isSignedIn = true;
}


///////////////////////// PART 2: SCHOOL CODE AUTH //////////////////////////
// assuming that sign in process worked



///////////////////////// PART 3: USE UPDATE INTERVAL ///////////////////////