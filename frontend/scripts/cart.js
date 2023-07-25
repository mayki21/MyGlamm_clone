const BaseServerUrl = `https://myglam-backend.onrender.com`


var main = document.getElementById('append')
let fetched=[]
 function fetchandrender(){
  fetch(`https://myglam-backend.onrender.com/cart`,{
    headers :{
        "Content-Type":"application/json",
        "Authorization" : `${localStorage.getItem("token")}`
    }
})
.then((res)=>{
    return res.json()
})
.then((data)=>{
  console.log(data);
  let newArray = [...data.lipsticks, ...data.makeups, ...data.skincares]
  console.log(newArray)
  appendata(newArray)
})
.catch((err)=>{
    console.log(err);
})


 }
 fetchandrender();





function appendata(data) {

  let total = document.getElementById("amount")
  let total2 = document.getElementById("amount2")
  main.innerHTML = ""

  data.map((ele) => {

    let imgbox = document.createElement("div")
    imgbox.setAttribute("class", "imgbox")

    let img = document.createElement("img")
    img.src = ele.data.img

    imgbox.append(img)

    let main222 = document.createElement("div")
    main222.setAttribute("class", "main222")

    let card = document.createElement("div")



    let title = document.createElement("h3")
    title.innerText = `${ele.data.name}`

    let price = document.createElement("h3")
    price.innerText = `Price : ${ele.data.actualPrice}`


    hr = document.createElement("hr")



    //  ***image append **

    // if (LSdata.length == 0) {
    //   // let imgurl = "https://www.linkpicture.com/q/3516854.jpg"
    //   // let imagecart = document.createElement("img")
    //   // img.src = imgurl
    //   // main.append(imagecart)
    //   console.log("hello")
    // }

     // **Remove Succesfully Text*
     let removediv = document.createElement("div")

     let removesuc = document.createElement("span")
    
 
     removediv.append(removesuc)
 
 
     // **Remove Succesfully Text*

    // .buttons

    let quantity = document.createElement("span");
    quantity.textContent = `Qty : ${ele.Quantity}`;




    let Increment = document.createElement("button");
    Increment.setAttribute("class", "inc")

    let decrement = document.createElement("button");
    let remove = document.createElement("button");

    remove.innerText = "Remove";
    Increment.innerText = "+";
    decrement.textContent = "-";

    remove.addEventListener("click", () => {
      LSdata = LSdata.filter((elem) => {
        return elem.id !== ele.id
      })
      removesuc.style.display = "inline"
      removesuc.textContent = "Removed Succesfully✅"
      removesuc.style.marginTop ="8px"

      setTimeout(() => {
        removesuc.style.display = "none"
      }, 2000);

    //   localStorage.setItem("key", JSON.stringify(LSdata))
    //   setTimeout(() => {
    //     appendata(LSdata)
    //   }, 2200);

      // appendata(LSdata);
    });


    
    Increment.addEventListener("click",async () => {
      fetch(`https://myglam-backend.onrender.com/cart/inc/${ele._id}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
        "Authorization" : `${localStorage.getItem("token")}`
        }
      })
      .then((res)=>{
        return res.json()
      })
      .then((res)=>{
      //  quantity.innerText=res.quantity
       console.log(data)
      //  window.location.reload()
      fetchandrender();
      })
      .catch((err)=>{
        console.log(err.message)
      })

    });



    decrement.addEventListener("click", () => {
      fetch(`https://myglam-backend.onrender.com/cart/dec/${ele._id}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
        "Authorization" : `${localStorage.getItem("token")}`
        }
      })
      .then((res)=>{
        return res.json()
      })
      .then((res)=>{
      //  quantity.innerText=res.quantity
       console.log(data)
      //  window.location.reload()
      fetchandrender();
      })
      .catch((err)=>{
        console.log(err.message)
      })
 

    });

    remove.addEventListener("click", () => {
        // console.log("object");
        fetch(`https://myglam-backend.onrender.com/cart/delete/${ele.data._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
          }
        })
          .then((res) => {
            return res.json()
          })
      
        .then((res) => {
            fetchandrender();
          })
          .catch((err) => {
            console.log(err.message)
          })
  
      });

    // // **Remove Succesfully Text*
    // let removediv = document.createElement("div")

    // let removesuc = document.createElement("span")
    // removesuc.textContent = "Removed Succesfully"
    // removediv.style.marginTop ="8px"

    // removediv.append(removesuc)


    // // **Remove Succesfully Text*

    let buttondiv = document.createElement("div")
    buttondiv.append(Increment, decrement, remove)



    card.append(title, price, quantity, buttondiv,removediv)
    main222.append(imgbox, card)
    main.append(main222, hr)
    document.querySelector("#total-items").innerText = data.length;

   

  });

  let sum=0
  for(let i=0;i<data.length;i++){
    sum+=data[i].actualPrice*data[i].quantity
  }
  total.innerText=sum
  total2.innerText=sum




}