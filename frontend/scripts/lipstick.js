let box=document.getElementById("a")


fetch("https://myglam-backend.onrender.com")
.then((res)=>{
    return res.json()
})
.then((data)=>{
console.log(data)

display(data)
sortbyprice(data)
searchbar(data)
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
                fetch(`https://myglam-backend.onrender.com/cart/lipstick/${el._id}`,{
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
                alert("kindly login first")
            }
          
        })

        div.append(img,name,description,price,btn)
        box.append(div)
    })
}
function sortbyprice(data) {
    
    let sortby = document.getElementById("sort")
    sortby.addEventListener("change", () => {
        // console.log(sortby.value);
        if (sortby.value == "asc") {
            var ascprice = data.sort((a, b) => {
                return a.offerPrice - b.offerPrice
            })
           
            
            display(ascprice)
        } else if (sortby.value == "desc") {
            var descprice = data.sort((a, b) => { return b.offerPrice - a.offerPrice })
            display(descprice)
        } else if(sortby.value == "") {

            display(data)
            // window.location.reload()
        }

    })
    

}

function searchbar(data) {
    let search = document.getElementById("search");
    search.addEventListener("input", (e) => {
        e.preventDefault();
        const value = e.target.value;
        

        let newArr = data.filter(element => {

            return element.name.toLowerCase().includes(value) || element.description.toLowerCase().includes(value);

        })
        display(newArr)

    })

}

