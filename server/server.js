
Meteor.methods({
		'removeArticles':function(){
			Articles.remove({});
		},
		'removeLike':function(){
			Likes.remove({_id:id});
		},
    'removeArticle': function(id){
       Articles.remove({_id:id});
    },
    //'removePins': function(){
    //  Pins.remove({});
  //  },
   // 'removePinboard': function(id){
   //   Pinboard.remove({_id:id});
   // }  
 
	})

var getFbPicture = function(accessToken) { // make async call to grab the picture from facebook
var result;
result = Meteor.http.get("https://graph.facebook.com/me", {
params: {
access_token: accessToken,
fields: 'picture'
}
});
if(result.error) {
throw result.error;
}
return result.data.picture.data.url; // return the picture's url
};
 
// during new account creation get user picture from Facebook and save it on user object
Accounts.onCreateUser(function(options, user) {
if(options.profile) {
options.profile.picture = getFbPicture(user.services.facebook.accessToken);
user.profile = options.profile; // We still want the default 'profile' behavior.
}
return user;
}); 
/*
Accounts.onCreateUser(function(options, user) {    
    if (user.services) {
        //we have services configured, let's see which one
        if (user.services.facebook)
            picUrl = 'https://graph.facebook.com/' + user.services.facebook.id + '/picture';
        
        if (user.services.twitter)
            picUrl =  user.services.twitter.profile_image_url;
        
        if (user.services.google)
            picUrl =  user.services.google.picture;
    } else if (user.emails && user.emails[0] && user.emails[0].address) {
        picUrl =  Gravatar.imageUrl(user.emails[0].address);
    } else {
        picUrl =  'noPicture.jpg';
    }
    
    
    if (options.profile)
        user.profile = options.profile;
        user.profile.avatar = picUrl;
 
        //also give the user gazilions of coins if we're here
        user.coins = 5000;
      return user;
})
*/

/*

Articles.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
})
*/


