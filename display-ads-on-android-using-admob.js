
/*
-------------------------------
NOTE:
-------------------------------

Ad unit >
Ad unit settings >
Implementation instructions >

You will see 2 IDs starting with "ca-app-pub-.xxxxxxxxxxxx"

one is ADMOB_APP_ID -> use this while installing plugin

another is YOUR_AD_ID -> this is correct for ads (above will give NETWORK ERROR for ads), now have "internal error", gave my address details also, will wait and try again after some time.


-------------------------------
package.json dependencies:
I have used cordova, react, admob - so some may be unnecessary for you
-------------------------------
  "dependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-react-app": "^3.1.2",
    "cordova-admob-sdk": "0.22.0",
    "cordova-android": "^7.1.4",
    "cordova-browser": "^5.0.4",
    "cordova-ios": "^4.5.5",
    "cordova-osx": "^4.0.2",
    "cordova-plugin-admob-free": "0.25.0",
    "cordova-plugin-splashscreen": "^5.0.2",
    "cordova-plugin-whitelist": "^1.3.3",
    "cordova-promise-polyfill": "0.0.2",
    "cordova-windows": "^6.0.1"
  },
  
*/


  document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);


  onDeviceReady: function () {
    setupVideoReward();
  },




//calls and displays the reward video
function setupVideoReward() {
  // alert('setupVideoReward');

  if (/(android)/i.test(navigator.userAgent)) {
    // alert('android');
    setupEvents();
  }

  //reward video	    // admob.interstitial.prepare()
  var rewardConfig = {
    id: 'ca-app-pub-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',   // your reward Ad id
    isTesting: false,
    autoShow: true
  };

  admob.rewardvideo.prepare(rewardConfig)
    .then((ok) => {
      // alert('prepare success');
      // alert(ok);
    })
    .catch(function (error) {
      alert('prepare fail');
      alert(error);
    });
}

function setupEvents() {

  document.addEventListener('admob.rewardvideo.events.LOAD_FAIL',
    function (event) {
      // alert('events.LOAD_FAIL');
      alert(JSON.stringify(event));
    }
  );

  document.addEventListener('admob.rewardvideo.events.LOAD',
    function (event) {
      // alert('events.LOAD');

      admob.rewardvideo.show();
    }
  );

  document.addEventListener('admob.rewardvideo.events.OPEN',
    function (event) {
      // alert('events.OPEN');
    }
  );

  document.addEventListener('admob.rewardvideo.events.CLOSE',
    function (event) {
      // alert('events.CLOSE');
    }
  );

  document.addEventListener('admob.rewardvideo.events.EXIT_APP',
    function (event) {
      alert('events.EXIT_APP');
    }
  );

  /* only works if admob detects that the user has finished watching the whole reward video else it will do nothing */
  document.addEventListener('admob.rewardvideo.events.REWARD',
    function (event) {
      alert('events.REWARD');
    }
  );

}
