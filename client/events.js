Template.share.events({
	 //'change .img': function(event, template) {
		//  FS.Utility.eachFile(event, function(file) {
   //   Images.insert(file, function (err, fileObj) {
        //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
     //   Session.set('imageId',fileObj._id);
    //  });
   // });

//  },

	'click .save':function(evt,tmpl) {
        evt.preventDefault();
		var description = tmpl.find('.description').value;
		var name = tmpl.find('.name').value;
		//var url = tmpl.find('.url').value;
		var date=new Date();
		var cat = tmpl.find('.selectCat').value;
		//var hashie=tmpl.find('.hash').value;
		
		//var id=Session.get('imageId');
	//	var img=Images.findOne(id).copies.images.key;
		Articles.insert({
			description:description,
			name:name,
		//	imgname:img,
		//	imgid:id,
		//	hashtag:hashie,
			time:date.toLocaleDateString()+' at '+date.toLocaleTimeString(),
			author:Meteor.userId(),
			userEmail:Meteor.user().profile.name,
			category:cat,	
            });/*function(){console.log('Article inserted')});*/
		//  fsFile = new FS.File(file);
		// Images.insert(file, function (err, fileObj) {

  //      });
		Session.set('adding_interest',false);
       
	},
	
	'click .cancel':function(){
		Session.set('adding_interest',false);
	},
	'click .close':function(){
		Session.set('adding_interest',false);
	}
});




Template.article.events({
	'click .like':function(evt,tmpl){
		var curlike = Likes.findOne({muser:Meteor.userId(),article:tmpl.data._id});
		if(!curlike){
			Likes.insert({muser:Meteor.userId(),article:tmpl.data._id});				
		} 
		Session.set('updated',new Date());
	},
	'click .remove':function(evt,tmpl){
			evt.preventDefault();
			var id=tmpl.data._id;
			var img_id=Articles.findOne(id).imgid;
			Images.remove({_id:img_id});
	 Articles.remove({_id:id});
	 var count=Likes.find().count();
	 for(var i=0;i<count;i++){
	 	if(Likes.find().fetch()[i].article===id){
	 		var lid=Likes.find().fetch()[0]._id;
	 		Likes.remove({_id:lid});
	 	}
	 }
	/* 	 var c=Pinboard.find().count();
	 for(var i=0;i<c;i++){
	 	if(Pinboard.find().fetch()[i].article===id){
	 		var pid=Pinboard.find().fetch()[0]._id;
	 		Pinboard.remove({_id:pid});
	 	}
	 }
	},*/
/*	'click #follow':function(evt,tmpl){
		evt.preventDefault();
		var id=tmpl.data._id;
		var followed=Articles.findOne(id).userEmail;
		var curFriend = Friends.findOne({muser:Meteor.userId(),friend:followed,article:tmpl.data._id});
		if(!curFriend){
			Friends.insert({muser:Meteor.userId(),friend:followed,article:tmpl.data._id});			
		} 	
	},*/
	//'click #unpin':function(evt,tmpl){
	//	evt.preventDefault();
			//var id=tmpl.data._id;
			//var c=Pinboard.find().count();
	// for(var i=(c-1);i>=0;i--){
	 //	if(Pinboard.find().fetch()[i].article===id){
	 	//	var pid=Pinboard.find().fetch()[i]._id;
	 	//	Pinboard.remove({_id:pid});
	 	//	break;
	 	//}
	// }
	//},
//	'click #pinit':function(evt,tmpl){
	//	var curpin = Pinboard.findOne({muser:Meteor.userId(),article:tmpl.data._id});
		//if(!curpin){
	//		Pinboard.insert({muser:Meteor.userId(),article:tmpl.data._id});				
	//	} 
	//	Session.set('updated',new Date());
	//}
    
    }
    
});
Template.nav.events({
	'click .addInterest':function(evt,tmpl){
		evt.preventDefault();
		Router.go('share');
        
	},
//	'click #search':function(evt,tmpl){
	//	var hash=tmpl.find('.hash').value;
	//	return Articles.find( { hashtag: hash} );
//	},

	
	
	
});

Template.share.events({
    'click .submit':function(evt,tmpl){
    evt.preventDefault();
    Router.go('article');
    }
});
Template.post.events({
	'click #removec':function(evt,tmpl){
			evt.preventDefault();
			var id=tmpl.data._id;
	 Comments.remove({_id:id});
	},
    'click .like':function(evt,tmpl){
		var curlike = Likes.findOne({muser:Meteor.userId(),article:tmpl.data._id});
		if(!curlike){
			Likes.insert({muser:Meteor.userId(),article:tmpl.data._id});				
		} 
		Session.set('updated',new Date());
	},

	'click #cmnt':function(evt,tmpl){
		evt.preventDefault();
		var comment=tmpl.find('.please').value;
		var date=new Date();
		Comments.insert({
			comm:comment,
			poster:Meteor.user().username,
			timestamp:date.toLocaleDateString()+' at '+date.toLocaleTimeString(),
			article:tmpl.data._id
		});
		Session.set('updated',new Date());
	},

    
});
Template.profile.events({
	'click #pin':function(evt){
		evt.preventDefault();
		Meteor.call('removePins');
		  var count=Pinboard.find().count();
 for(var i=0;i<count;i++){
  if(Pinboard.find().fetch()[i].muser===Meteor.userId()){
   Pins.insert(
    Articles.find(Pinboard.find().fetch()[i].article).fetch()[0]
    );
  }
 }
},
    

/*'click #unfollow':function(evt){
		evt.preventDefault();
		Friends.remove({_id:this._id});
	}*/
//'click #pins':function(evt){
		//evt.preventDefault();
		//Meteor.call('removePins');
	//}
});

