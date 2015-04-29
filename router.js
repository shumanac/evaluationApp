Router.route('/', function () {
  this.render('welcome');
});

Router.map(function(){
     
            this.route('article', {path:'/article'}); 
            this.route('share', {path:'share'}); 
            this.route('profile', {path:'profile'});
            this.route('post', {path: '/post/_id'});
	        this.route('user', {path: '/user'});
	this.route('/article/:_id', function () {
  this.render('post', {
    data: function () {
      return Articles.findOne({_id: this.params._id});
    }
  });
});

		this.route('/user/:friend', function () {

  this.render('user', {
    data: function () {
      return Articles.findOne({userEmail: this.params.friend});
    }
  });
});
 
	
});




