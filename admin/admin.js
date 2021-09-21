console.log(firebase)

let table = document.getElementById("table")
let editContent = document.getElementById("editContent")
let seleclted


const select = (e) => {

    console.log("onchange", e.value)
    seleclted = e.value
    firebase.database().ref(e.value)
        .once("value")
        .then((getData) => {

            let data = getData.toJSON()
            data = (Object.values(data))

            console.log(data.length)
            table.innerHTML = `<tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Type</th>
            <th>Option</th>
          </tr>`

            data.map((key) => {

                let tableRow = document.createElement("tr")

                let nameTable = document.createElement("td")
                nameTable.append(key.username)

                let emailTable = document.createElement("td")
                emailTable.append(key.email)


                let passwordTable = document.createElement("td")
                passwordTable.append(key.password)


                // let contectTable = document.createElement("td")
                // contectTable.append(key.contect)



                let typeTable = document.createElement("td")
                typeTable.append(key.type)

                let buttonTableDel = document.createElement("td")

                let deletebtn = document.createElement("button")
                deletebtn.setAttribute("onclick", "deleteRow(this)")
                deletebtn.setAttribute("id", key.key)
                deletebtn.append("Delete")

                buttonTableDel.append(deletebtn)



                let editbtn = document.createElement("button")
                editbtn.setAttribute("onclick", "editRow(this)")
                editbtn.setAttribute("id", key.key)
                editbtn.append("Edit")

                buttonTableDel.append(editbtn)


                tableRow.append(nameTable)
                tableRow.append(emailTable)
                tableRow.append(passwordTable)
                // tableRow.append(contectTable)
                tableRow.append(typeTable)
                tableRow.append(buttonTableDel)

                table.append(tableRow)
                table.append(tableRow)
                console.log(tableRow)




                console.log(key.email)
            })
            .catch((error) => {

                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage)
            })

        })
       
}



const deleteRow = (e) => {
    console.log(e.id)
    firebase.database().ref(seleclted).child(e.id).remove()
    
}


const editRow = (e) => {
    console.log(e.id)
    firebase.database().ref(seleclted).child(e.id)
        .once("value")
        .then((getData) => {
            let data = getData.val()

            console.log(data)

            document.getElementById("form").innerHTML=`
                <input type="text" id='setname' value="${data.username}"> 
                <input type="email" id='setemail' value="${data.email}">
                <input type="password" id='setpassword' value="${data.password}">

                <button id='${data.key}' onclick='done(this)'>done</button>
            `
        })
        .catch((error) => {
            alert("error")
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode, errorMessage)
        });
}
const done=(e)=>{
    console.log(e.id)
    
    firebase.database().ref(`/${seleclted}`).child(`${e.id}`)
        .once("value")
        .then((getData) => {
            let data = getData.val()
            let setname = document.getElementById("setname").value
            let setemail = document.getElementById("setemail").value
            let setpassword = document.getElementById("setpassword").value
            console.log(setname)
            console.log(setemail)
            console.log(setpassword)


            console.log(data)
            let data2 = {
                username : setname,
                email : setemail,
                password : setpassword,
                type : data.type,
                key : data.key
            }
            console.log(data)
            firebase.database().ref(`/${seleclted}`).child(`${e.id}`).set(data2)


        })
}





const editDone = (e) => {

    let username = document.getElementById("name")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let contect = document.getElementById("contect")

    firebase.database().ref(seleclted).child(e.id).update({
        user: username.value,
        email: email.value,
        password: password.value,
        contect: contect.value
    })
    editContent.innerHTML = ""

    console.log(e.id)
}