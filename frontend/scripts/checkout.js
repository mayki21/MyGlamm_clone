let userData = JSON.parse(localStorage.getItem("user-list")) || [];
let addForm = document.querySelector("form");
let submitBtn = document.getElementById("continue_btn");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let flat = document.getElementById("flatno")
    let landmark = document.getElementById("landmarkno")
    let Pincodeno = document.getElementById("Pincodeno")
    let localityno = document.getElementById("localityno")
    let cityno = document.getElementById("cityno")
    let stateno = document.getElementById("stateno")
    let custname = document.getElementById("custname")
    let custmobile = document.getElementById("custmobile")
    let obj = {
        flat: flat.value,
        landmark: landmark.value,
        Pincodeno: Pincodeno.value,
        localityno: localityno.value,
        cityno: cityno.value,
        stateno: stateno.value,
        custname: custname.value,
        custmobile: custmobile.value
    }
    if (obj.flat == "" || obj.Pincodeno == "" || obj.landmark == "" || obj.localityno == "" || obj.cityno == "" || obj.custname == "" || obj.custmobile == "") {
        alert("please fill your address")
    }
    else {
        userData.push(obj)
        localStorage.setItem("user-list", JSON.stringify(userData))
        window.location.href = "payment.html";
    }
})