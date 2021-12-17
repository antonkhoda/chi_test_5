// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BACKEND_URL: 'http://localhost:4200',
  firebaseConfig: {
    apiKey: "AIzaSyBlQvTASKKDqudS1DSrma5320bLHDfe1Xg",
    authDomain: "chi-shop-fe5ac.firebaseapp.com",
    projectId: "chi-shop-fe5ac",
    storageBucket: "chi-shop-fe5ac.appspot.com",
    messagingSenderId: "83329686158",
    appId: "1:83329686158:web:95281101b29a0c4612c7df"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
