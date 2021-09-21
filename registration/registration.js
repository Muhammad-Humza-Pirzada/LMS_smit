
console.log(firebase);
const registered = () =>{
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmpassword = document.getElementById("confirmpassword").value;
    let type = document.getElementById("type").value;
    
    if(username == "" || email == "" || password == "" || confirmpassword == ""){
        alert("Please fill all field");
    }
    else if(confirmpassword != password){
        alert("Plz Enter Correct Password");
    }
    else if(type == ""){
        alert("please choose the field");
    }
    else{

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((snap) => {
    
            var user = snap.user;
    
            let data = {
                username : username,
                email : email,
                password : password,
                type : type,
                key : user.uid
            }
            console.log(data)
            firebase.database().ref(`/${type}`).child(user.uid).set(data)
    
            alert("Registered")
            // window.location="..signin/signin.html"
            
        })
        .catch((error) => {
    
          alert("error")
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          console.log(errorCode,errorMessage)
        });
    
    
    
    
    }
            // firebase.auth().createUserWithEmailAndPassword(email, password)
            // .then((result) => {
            //     // Signed in 
            //     console.log(result)

            //     // ...
            // })
            // .catch((error) => {
            //     var errorCode = error.code;
            //     var errorMessage = error.message;
    
            //     alert(errorCode,errorMessage);



            //     // window.open("login.html");
                
            // });
    
    
    
    }
    
