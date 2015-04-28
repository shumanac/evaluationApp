
Template.article.helpers({
  numlikes: function(){
  return Likes.find({article:this._id}).count();
},
images:function(){
  return Images.find({});
},
img: function () {
   var c=Articles.find({}).count();
   c--;
  return Images.find(Articles.find({}).fetch()[c].imgid); // Where Images is an FS.Collection instance
  //return Images.find();
  
  },
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
 followed :function(){
    var followed=Articles.findOne(this._id).userEmail;
    var own=Meteor.user().username;
  var curFollow = Friends.findOne({muser:Meteor.userId(),friend:followed});
  if(curFollow){
  return "Following";
    }
    else {
      return "Follow";
    }},

articleList: function(){
  Articles.find({catName:Session.get('category')});
},
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
adding_interest: function(){ 
  return Session.get('adding_interest');
},

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
articleList: function(){
  Posts.find({catName:Session.get('category')});
},
userLikes :function(){
  var curUserlike = Likes.findOne({muser:Meteor.userId(),article:this._id});
   var userId = Meteor.userId();

  if(curUserlike){
   return true;
    } 
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

pins:function(){
  return Pins.find({post:this._id});
},
adding_interest: function(){ 
  return Session.get('adding_interest');
},

numlikes: function(){
  return Likes.find({article:this._id}).count();
},

updated :function(){
  return Session.get('updated');
},

userName:function(){
  return Meteor.user().profile.name;
}
});

Template.share.helpers({
  Cat:function(){
     return Categories.find({});
  }
});

if (Meteor.isServer) {
  Meteor.publish("article", function () {
    return Articles.find();
  });
}
if (Meteor.isServer) {
  Meteor.publish("post", function () {
    return Posts.find();
  });
}

Template.nav.helpers({
  Cat:function(){
     return Categories.find({});
  },
  username:function(){
  return Meteor.users.findOne(Meteor.userId()).username;
}
});