let box=document.getElementById("a")


fetch("http://localhost:8080/lipstick")
.then((res)=>{
    return res.json()
})
.then((data)=>{
console.log(data)
display(data)
})
.catch((err)=>{
    console.log(err)
})


function display(data){
    box.innerHTML=""
    data.map((el)=>{
        let div=document.createElement("div")
        let img=document.createElement("img")
        img.src=el.img
        let name=document.createElement("h2")
        name.innerText=el.name
        let description=document.createElement("p")
        description.innerText=el.description
        let price=document.createElement("h4")
        price.innerText=`Price:- ${el.offerPrice}`
        let btn=document.createElement("button")
        btn.innerText="Add To Cart"

        btn.addEventListener('click',function(){
            let token=localStorage.getItem("token")
            if(token)
            {
                fetch("http://localhost:8080/cart/post",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`${localStorage.getItem("token")}`
                    },
                    body:JSON.stringify(el)
                })
                .then((res)=>{
                    return res.json()
                })
                .then((data)=>{
                    if(data.msg=="Data already present")
                    {
                        alert("Product already to cart")
                    }
                    else
                    {
                        console.log(data)
                        alert("Product added in Cart")
                    }
                   
    
                })
                .catch((err)=>{
                    console.log(err.message)
                })
            }
            else
            {
                alert(" kindly login first")
            }
          
        })

        div.append(img,name,description,price,btn)
        box.append(div)
    })
}
