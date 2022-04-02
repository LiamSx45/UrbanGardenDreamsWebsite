// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCLSGVG_LsnWpBYCzuVdCFei-I-qf3oODI",
	authDomain: "sawyer-talks.firebaseapp.com",
	databaseURL: "https://sawyer-talks-default-rtdb.firebaseio.com",
	projectId: "sawyer-talks",
	storageBucket: "sawyer-talks.appspot.com",
	messagingSenderId: "364789111427",
	appId: "1:364789111427:web:9d4125884f8c2cf76599b6",
	measurementId: "G-CW4Z3NZZE1"
  };

var rootRef = firebase.database().ref();
var postComments = rootRef.child('postComments');

var link = $("link[rel='canonical']").attr("href");
var pathkey = decodeURI(link.replace(new RegExp('\\/|\\.', 'g'),"_"));
var postRef = postComments.child(pathkey);
var converter = new showdown.Converter({ extensions: ['xssfilter'] });

$("#comment").submit(function() {
    postRef.push().set({
        name: $("#name").val(),
        message: $("#message").val(),
        md5Email: md5($("#email").val()),
        postedAt: firebase.database.ServerValue.TIMESTAMP
  });

  $("input[type=text], textarea").val("");

  return false;
});

postRef.on("child_added", function(snapshot) {
    var newComment = snapshot.val();
    
    // Markdown into HTML
    var converter = new showdown.Converter();
    converter.setFlavor('github');
    var markedMessage = converter.makeHtml(newComment.message);
    
    // HTML format
    var html = "<div class='comment'>";
    html += "<h4>" + newComment.name + "</h4>";
    html += "<div class='profile-image'><img src='https://www.gravatar.com/avatar/" + newComment.md5Email + "?s=100&d=retro'/></div>";
    html += "<span class='date'>" + jQuery.timeago(newComment.postedAt) + "</span>"
    html += "<p>" + markedMessage  + "</p></div>";
    
    $("#comments-container").prepend(html);
});


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

