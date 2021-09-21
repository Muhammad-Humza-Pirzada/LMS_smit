console.log(firebase)
let user_id = localStorage.getItem("uid")
console.log(user_id)


let username = document.getElementById("name")
let email = document.getElementById("email")
let password = document.getElementById("password")
let type = document.getElementById("type")




firebase.database().ref("/classTeacher").child(user_id)
    .once("value")
    .then((getData) => {
        let data = getData.val()
    console.log(data)

        if (data == null || data == undefined) {
                alert("check other")
                    }
                    else {
                        console.log(data)

                        username.value = data.username
                        email.value = data.email
                        password.value = data.password
                        type.value = data.type
                    }
                })

    .catch((error) => {
        alert("error")
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage)
    });