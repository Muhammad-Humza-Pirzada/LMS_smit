console.log(firebase);
const signin = () =>{
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
  
    
    if(email == "" || password == ""){
        alert("Please fill all field");
    }
    
    else{

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {

            let user = result.user;
            console.log(user.uid)
            // Signed in


            firebase.database().ref("/admin")
            .orderByChild("key")
            .equalTo(user.uid)
            .once("value")
            .then((getAdmindata) => {
            
            let admindata = getAdmindata.val()
            console.log(admindata)
           
            if(admindata == null){
                firebase.database().ref("/classTeacher")
                .orderByChild("key")
                .equalTo(user.uid)
                .once("value")
                .then((getAdmindata) => {
                
                let admindata = getAdmindata.val()

                if(admindata == null){
                    firebase.database().ref("/web")
                    .orderByChild("key")
                    .equalTo(user.uid)
                    .once("value")
                    .then((getAdmindata) => {
                    
                        let admindata = getAdmindata.val()

                    if(admindata == null){
                        firebase.database().ref("/graphic")
                        .orderByChild("key")
                        .equalTo(user.uid)
                        .once("value")
                        .then((getAdmindata) => {
                        
                            let admindata = getAdmindata.val()
                        if(admindata == null){
                            alert("no")
                        }
                        else{
                            localStorage.setItem("uid",user.uid)
                            window.location="../student/student.html"
                        }
                    })
                }
                    
                    else{
                        localStorage.setItem("uid",user.uid)
                        window.location="../student/student.html"
                    }

                })

            }
                else{
                    localStorage.setItem("uid",user.uid)
                    window.location="../teacher/teacher.html"
                }
            }) 
             
        }
               
        else{
            // localStorage.setItem("uid",user.uid)
            window.location="../admin/admin.html"

        }
  
            })
        })
      
    }
  
   
}


            

