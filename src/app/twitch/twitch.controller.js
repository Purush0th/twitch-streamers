(function () {
    angular
        .module('app.twitch')
        .controller('MainController', MainController);

    /* @ngInject */
    MainController.$inject = ['twitchService', 'TwitchUsers'];

    function MainController(twhApi, TwitchUsers) {

        var vm = this;
        vm.streamers = [];
        vm.applyFilter = applyFilter;
        vm.onlineOnly = false;
        vm.refresh = refresh;

        var dataSource = [];

        function getStreamers() {

            angular.forEach(TwitchUsers, function (name) {
                twhApi.getStream(name).then(function (data) {
                    apiStreamHandler(name, data)
                });
            });

            vm.streamers = dataSource;
        }

        function apiStreamHandler(name, data) {
            var isDeleted = false,
                status, game;
            if (data.stream === null) {
                status = "offline";
            } else if (data.stream === undefined) {
                isDeleted = true;
                status = "offline";
            } else {
                game = data.stream.game;
                status = "online";
            };

            twhApi.getChannel(name).then(function (response) {
                var channelData = response.data;
                var stream = {
                    name: channelData.display_name || name,
                    status: status,
                    avatar: channelData.logo,
                    show: game ? game + ':' + channelData.status : channelData.status,
                    isDeleted: isDeleted,
                    url: channelData.url
                };
                dataSource.push(stream);
            });

        }

        function applyFilter() {

            if (vm.onlineOnly) {
                vm.streamers = dataSource.filter(function (item) {
                    return item.status === 'online';
                });
            }
            else {
                vm.streamers = dataSource;
            }

        }

        function refresh() {
            vm.streamers = [];
            dataSource = [];
            getStreamers();
        }

        activate();

        function activate() {
            getStreamers();
        }
    }
})();