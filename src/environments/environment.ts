// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // local connectins
  BaseUrl: '192.168.1.150', //local - 192.168.1.102

  //live connections
  // BaseUrl: 'api.tender.peacocktech.in', //domain name -  tender.peacocktech.in // 9928
  // BaseUrl: 'ncmp.predacon.in', //domain name -  ncmp.predacon.in
  // BaseUrl: 'nd.predacon.in', //domain name - nd.predacon.in // PORT = 4000 use this
  // BaseUrl: 'skd.predacon.in', // PORT -9920
  // BaseUrl: 'skd.peacocktech.in', // PORT -9920

  // BaseUrl: 'ng.predacon.in', //domain name - ng.predacon.in /// 3000
  // BaseUrl: 'mfg.peacocktech.in', //domain name -  mfg.peacocktech.in // PORT - 9909 use this but change port in project
  // BaseUrl: '103.218.111.144', //domain ip - narola.predacon.in
  // BaseUrl: '27.116.48.171', // domain ip - ng.predacon.in


  //PORTS

  PORT: 6001, // default
  // PORT: 9928, // tender.peacocktech.in
  // PORT: 5000 // ncmp.predacon.in
  // PORT: 9909, // mfg.peacocktech.in
  // PORT: 9920, // skd.predacon.in
  // PORT: 9920, // skd.peacocktech.in

  PORT1: 3002,// default
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
