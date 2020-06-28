const midway = {};

midway.config = {
    platform: "EXTENSION", // EXTENSION || WEB
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
    // start up clock service
    // start up authentication process (check if sign in available)
    // start up storage process and syncing with different accounts
    // check for welcome message or onboarding process

    // init firebase
    firebase.initializeApp(firebaseConfig);

    if (enableAnalytics) {
        firebase.analytics();
    }
}