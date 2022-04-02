// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyAFAYhBf2Ogi_uT6uFQnZMVJ8NeZGYzfo8",
      authDomain: "auth.urbangardendreams.com",
      databaseURL: "https://urban-garden-dreams-default-rtdb.firebaseio.com",
      projectId: "urban-garden-dreams",
      storageBucket: "urban-garden-dreams.appspot.com",
      messagingSenderId: "343657728934",
      appId: "1:343657728934:web:9de5520f6a8e5750c21d67",
      measurementId: "G-02CX2MVCGC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()

  // Set up our register function
  function register () {
    // Get all our input fields
    First_Name = document.getElementById('fname').value
    Last_Name = document.getElementById('lname').value
    Username = document.getElementById('username').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    PhoneNum = document.getElementById('phonenum').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Please enter a valid email and password.')
      return
      // Don't continue running the code
    }
    if (validate_field(Last_Name) == false || validate_field(First_Name) == false || validate_field(Username) == false || validate_field(PhoneNum) == false) {
      alert('Please fill out all fields.')
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        First_Name : First_Name,
        Last_Name : Last_Name,
        Username : Username,
        PhoneNum : PhoneNum,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('Registration Complete!')
      location.href = '../index.html';
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Incorrect email/password.')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('Logged In!')
      window.location.href="../index.html";
      

  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }