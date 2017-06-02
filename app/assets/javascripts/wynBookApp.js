let wynBook = angular.module('wynBook', ['ui.router', 'templates'])

    wynBook.config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

          $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'home/_home.html',
                    controller: 'WyshListController'
                });
            $stateProvider
                .state('posts', {
                  url: '/posts/{id}',
                  templateUrl: 'posts/_posts.html',
                  controller: 'PostsCtrl'
                });

            $urlRouterProvider.otherwise('home');
        }
    ])

    wynBook.factory('posts', [function() {
        var o = {
            posts: []
        };
        return o;
    }])

    wynBook.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts) {
            let self = $scope;
            self.post = posts.posts[$stateParams.id];

            self.addComment = function(){
              if(self.body === '') { return; }
                self.post.comments.push({
                body: self.body,
                author: 'user',
                upvotes: 0
              });
              self.body = '';
            };


        }]);

    wynBook.controller('WyshListController', ['$scope', 'posts', function($scope, posts) {
        let self = $scope;
        self.posts = posts.posts;

        self.addPost = function() {
            if (!self.title || self.title === '') {
                return;
            }
            self.posts.push({
                title: self.title,
                link: self.link,
                upvotes: 0,
                comments: [{
                        author: 'Joe',
                        body: 'Cool post!',
                        upvotes: 0
                    },
                    {
                        author: 'Bob',
                        body: 'Great idea but everything is wrong!',
                        upvotes: 0
                    }
                ]
            });
            self.title = '';
            self.link = '';

        };

        self.incrementUpvotes = function(post) {
            post.upvotes += 1;
        };

    }]);
