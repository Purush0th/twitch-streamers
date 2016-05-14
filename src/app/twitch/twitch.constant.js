(function () {
    'use strict';

    angular
        .module('app.twitch')
        .constant('ApiUrls',
        {
            channels: 'https://api.twitch.tv/kraken/channels/',
            streams: 'https://api.twitch.tv/kraken/streams/'
        })
        .constant('TwitchUsers',
        [
            "freecodecamp",
            "storbeck",
            "terakilobyte",
            "habathcx",
            "RobotCaleb",
            "thomasballinger",
            "noobs2ninjas",
            "beohoff",
            "brunofin",
            "comster404",
            "test_channel",
            "cretetion",
            "sheevergaming",
            "TR7K",
            "OgamingSC2",
            "ESL_SC2"
        ]);
})();