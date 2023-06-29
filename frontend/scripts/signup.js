let formel=document.querySelector("form")

let nameinp=document.getElementById("name")
let emailinp=document.getElementById("email")
let passwordinp=document.getElementById("password")
let contactinp=document.getElementById("contact")

formel.addEventListener("submit",function(e){
    e.preventDefault()
    let obj={
        name:nameinp.value ,
        email:emailinp.value ,
        password:passwordinp.value ,
        contact:contactinp.value 
    }
    fetch("https://orchid-tuna-yoke.cyclic.app/user/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        alert("registeration successfull")
        window.location.href="login.html"
    })
})