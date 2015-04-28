

if (Meteor.isClient) {

    Template.listPosts.helpers({
        news: function () {
            return Posts.find({},{sort: {dateAdded: -1}});
        }
    });
}




Template.post.helpers = function(){
    return Likes.find(this._id).count();
    
}
Template.post.postComments = function(){
    return Posts.find({parent:this._id});
}

Template.post.events({
    
    'submit #blogForm':function(e){
        e.preventDefault();
        var title = $('#blogTitle').val();
         var body = $('#blogBody').val();
        if (title.length && body.length){
       Meteor.call('submitPost',title, body);
        }
    }
     
    })

Template.listPosts.posts = function(){
    return Posts.find();
}

