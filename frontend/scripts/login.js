let formel=document.querySelector("form")


let emailinp=document.getElementById("email")
let passwordinp=document.getElementById("password")

formel.addEventListener("submit",function(e){
    e.preventDefault()
    let obj={
        email:emailinp.value ,
        password:passwordinp.value 
    }
    console.log(obj)
    fetch("http://localhost:8080/user/login",{
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
        console.log(data)
        // if(data.msg="wrong credentials")
        // {
        //     alert("Wrong credentials")
        // }
        
     
            localStorage.setItem("token",data.token)
            localStorage.setItem("user",data.userdetail)
            alert("Login successfull")
            window.location.href="index.html"
        
       
        
    })
    .catch((err)=>{
        console.log(err.message)
    })

})
