let box=document.getElementById("a")


fetch("http://localhost:8080/makeup")
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

        div.append(img,name,description,price,btn)
        box.append(div)
    })
}
