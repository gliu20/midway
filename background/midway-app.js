const midway = {};

midway.config = {
    platform: "CHROME_EXT", // CHROME_EXT || FIREFOX_ADDON || WEB
    firebaseConfig: {
        apiKey: "AIzaSyBNCdvM5pzkiSuHKGOolx0HuFgM2VBWITU",
        authDomain: "midway-application.firebaseapp.com",
        databaseURL: "https://midway-application.firebaseio.com",
        projectId: "midway-application",
        storageBucket: "midway-application.appspot.com",
        messagingSenderId: "252261994154",
        appId: "1:252261994154:web:b0efaf93bcebd689",
        measurementId: "G-E72NZ6MG69"
    },
    enableAnalytics: false
}

midway.init = function () {
    // init firebase
    firebase.initializeApp(midway.config.firebaseConfig);

    if (midway.config.enableAnalytics) {
        firebase.analytics();
    }

    // start up storage and/or messenger sync
    // start up clock service
    // start up authentication process (check if sign in available)
    // start up storage process and syncing with different accounts
    // check for welcome message or onboarding process
}