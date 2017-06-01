angular.module('wynBook')
.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts) {
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
