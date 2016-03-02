birdsEye = angular.module("birdsEye", ['ui.router']);

birdsEye.config(['$locationProvider','$stateProvider', '$urlRouterProvider',
  function($locationProvider, $stateProvider, $urlRouterProvider){
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      })

      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });

    $urlRouterProvider.otherwise('home');
  }]);

birdsEye.factory('postService', [function(){
  var postService = {};
  var posts = [
    {title: 'post 1', upvotes: 5},
    {title: 'post 2', upvotes: 2},
    {title: 'post 3', upvotes: 15},
    {title: 'post 4', upvotes: 9},
    {title: 'post 5', upvotes: 4}
  ];
	console.log("From service " + posts);
  postService.getPosts = function(){
    return posts;
  }
  return postService;
}]);

birdsEye.controller('MainCtrl', ['$scope','postService',
function($scope, postService ){
	 $scope.posts = [];
  $scope.posts = postService.getPosts;
	 console.log($scope.posts);

//   $scope.posts = [
//     {title: 'post 1', upvotes: 5},
//     {title: 'post 2', upvotes: 2},
//     {title: 'post 3', upvotes: 15},
//     {title: 'post 4', upvotes: 9},
//     {title: 'post 5', upvotes: 4}
//   ];

  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    $scope.posts.push({
      title: $scope.title,
      content: $scope.content,
      upvotes: 0,
      comments: [
                  {author: 'Joe', body: 'Cool post!', upvotes: 0},
                  {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
    });
    $scope.title = '';
    $scope.content = '';
  };

  $scope.incrementUpvotes = function(post){
    post.upvotes += 1;
  };

}]);

birdsEye.controller('PostsCtrl', ['$scope', '$stateParams','postService',
  function PostsCtrl($scope, $stateParams, postService){
    $scope.post = posts.posts[$stateParams.id];
    $scope.addComment = function(){
      if($scope.body === '') { return ;}
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    };


}]);


//	(function() {
//		function MainCtrl($scope){
//			$scope.test = 'Hello world!';
//			$scope.posts = [
//			'post 1',
//			'post 2',
//			'post 3',
//			'post 4',
//			'post 5'
//				];
//		};
//
//		angular
//			.module('birdsEye')
//			.controller('MainCtrl', ['$scope', MainCtrl]);
//
//})();
