// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://127.0.0.1:8001',
  firebase: {
    projectId: 'psicologaenlineasm',
    appId: '1:1074788754581:web:aaeee4003b10375026a79c',
    databaseURL: 'https://psicologaenlineasm-default-rtdb.firebaseio.com',
    storageBucket: 'psicologaenlineasm.appspot.com',
    apiKey: 'AIzaSyCCtSRJDyr5rCWiTR7FJhs3dIo6kqXCCT8',
    authDomain: 'psicologaenlineasm.firebaseapp.com',
    messagingSenderId: '1074788754581',
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
