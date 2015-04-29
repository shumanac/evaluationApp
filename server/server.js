
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



/*

Articles.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
})
*/


