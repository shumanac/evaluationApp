
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
 
	});


Articles.allow({
  insert: function(userId,posts){
    return true;
  },
 update: function(userId,posts){
    return true;
  },
  remove: function (userId,posts){
    return true;
  }
});


if (Meteor.isServer) {
  Meteor.publish("article", function () {
    return Articles.find();
  });
}