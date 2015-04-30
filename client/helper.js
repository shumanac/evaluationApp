
Template.article.helpers({
  numlikes: function(){
  return Likes.find({article:this._id}).count();
},
/*images:function(){
  return Images.find({});
},
img: function () {
   var c=Articles.find({}).count();
   c--;
  return Images.find(Articles.find({}).fetch()[c].imgid); // Where Images is an FS.Collection instance
  //return Images.find();
  
  },*/
 numComms:function(){
    return Comments.find({article:this._id}).count();
  },
likethis :function(){
  var curUserlike = Likes.findOne({muser:Meteor.userId(),article:this._id});
  if(curUserlike){
  return "You Like This";
    }
    else{
      return "Give a thumbs up!";
    }
},
        articleList: function(){
  return Articles.find({});
},
    

 /*followed :function(){
    var followed=Articles.findOne(this._id).userEmail;
    var own=Meteor.user().username;
  var curFollow = Friends.findOne({muser:Meteor.userId(),friend:followed});
  if(curFollow){
  return "Following";
    }
    else {
      return "Follow";
    }},*/


userLikes :function(){
  var curUserlike = Likes.findOne({muser:Meteor.userId(),article:this._id});
   var userId = Meteor.userId();

  if(curUserlike){
   return true;
    } 
}
});


Template.post.helpers({
  numlikes: function(){
  return Likes.find({article:this._id}).count();
},
/*adding_interest: function(){ 
  return Session.get('adding_interest');
},*/

comments:function(){
  return Comments.find({article:this._id});
},

isPoster:function(){
  if(Meteor.userId()=== Comments.findOne({poster:this.user().username})){
    return true;
  }
  else{
    return false;
  }
},

likethis :function(){
  var curUserlike = Likes.findOne({muser:Meteor.userId(),article:this._id});
  if(curUserlike){
  return "You Like This";
    }
    else{
      return "Give a thumbs up!";
    }
},
/*articleList: function(){
  Posts.find({catName:Session.get('category')});
},*/
userLikes :function(){
  var curUserlike = Likes.findOne({muser:Meteor.userId(),article:this._id});
   var userId = Meteor.userId();

  if(curUserlike){
   return true;
    } 
},

updated :function(){
  return Session.get('updated');
},

  numComms:function(){
    return Comments.find({article:this._id}).count();
  },
sourceLink: function(){
  return "http://localhost:3000/article/"+this._id;
}
});



Template.profile.helpers({
articles: function(){
  var userId = Meteor.userId();
  return Articles.find({author:userId} ,{transform: function (doc ){
    doc.isAuthor = doc.author === userId; 
    return doc;
  }});
},
anyfriend:function(){
if(Friends.find().count()!=0){
  return true;
} else{
  return false;
}

},
friends:function(){
 var userId = Meteor.userId();
  return Friends.find({muser:userId});
},
/*
pins:function(){
  return Pins.find({post:this._id});
},*/
adding_interest: function(){ 
  return Session.get('adding_interest');
},

numlikes: function(){
  return Likes.find({post:this._id}).count();
},
    
  numComms:function(){
    return Comments.find({post:this._id}).count();
  },
  numShares:function(){
    return Articles.find({post:this._id}).count();
  },
updated :function(){
  return Session.get('updated');
},

userName:function(){
  return Meteor.user().profile.name;
},
      
/*        
user_image:function () { 
    if(Meteor.user().services.facebook){ return Meteor.user().services.facebook.id; } },*/
    
    
    
    
            
/*userPicHelper: function() {
    if (this.profile) {
        var id = this.profile.facebookId;
        var img = 'http://graph.facebook.com/' +Meteor.user().services.facebook.id + '/picture?type=square&height=160&width=160';
        return img;
    }
},*/
});
Template.profile.user_image = function () {
    try{
        if(Meteor.user().services.facebook){
            // this is the line of interest
            return 'http://graph.facebook.com/' +Meteor.user().services.facebook.id + '/picture?type=square&height=160&width=160';

         
        }else if(Meteor.user().profile){
            return $.trim(Meteor.user().profile.avatar);
        }else{
            return "/images/placeholder-240x240.gif";
        }
    }
    catch(err){
        console.log(err);
    }
};

/*Meteor.startup(function() {
Template.profile.pic = function() {// helper function to display the pic on the page
var userProfile;
userProfile = Meteor.user().profile;
 
if(userProfile) { // logic to handle logged out state
return userProfile.picture;
}
};
}); */
/*Template.profile.helpers({
      showProfile:function(){
        if(Meteor.user().services.facebook.id){
          return userProfile.picture;
        }else{
         return "img/blank_avatar.png"
        }
      }
    });

Template.share.helpers({
  Cat:function(){
     return Categories.find({});
  }
});*/

/*if (Meteor.isServer) {
  Meteor.publish("article", function () {
    return Articles.find();
  });
}
if (Meteor.isServer) {
  Meteor.publish("post", function () {
    return Posts.find();
  });
}
if (Meteor.isServer) {
  Meteor.publish("share", function () {
    return Shares.find();
  });
}
if (Meteor.isServer) {
  Meteor.publish("comments", function () {
    return Comments.find();
  });
}*/

Template.nav.helpers({
  Cat:function(){
     return Categories.find({});
  },
  username:function(){
  return Meteor.users.findOne(Meteor.userId()).username;
},
    
    user_image:function () {
    try{
        if(Meteor.user().services.facebook){
            // this is the line of interest
            return 'http://graph.facebook.com/'+Meteor.user().services.facebook.id+'/picture?type=square&height=60&width=60';

         
        }else if(Meteor.user().profile){
            return $.trim(Meteor.user().profile.avatar);
        }else{
            return "/images/placeholder-240x240.gif";
        }
    }
    catch(err){
        console.log(err);
    }
},

});

