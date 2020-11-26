var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BHLpSsNQiPeFsDhgj5i6slAIE-9gOh5TAuikeMkQ2xwAENtk4897DF-SV3WehPlv1YwDa6UnShIJNJDk4Klu8Y8",
   "privateKey": "CUu-YfEYWENzR_PjN4GRWAlShE6_rmtzxJfkheeQePA"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cqGMGM4wkGw:APA91bGa41uNDShaC8rU9T-kuC5eNKL6Ki7gIE6pOKjlqnQQwqT5OlRO2cdmdGQGz4lTCf4hZMdoLWdkgkGFe2ISIeU1S6NfJ9DntST5_ubG2j47tmBc_beG1Fna4Vg3uTQSGc-61vnd",
   "keys": {
       "p256dh": "BCQEJ2JPMtikGgQwUBfncPYtR5jAXL7fWATWpw5GbBpYG8Fsc4fr5DNiOI0zjKs8U4jCmr9uMMKyQPYApA9ynXs=",
       "auth": "IkVC1Bq8d3RmkPOPlNr/hA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1062109802276',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);