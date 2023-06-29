$(document).ready(function(){
    $('.slider').slick({
      autoplay: true,
      autoplaySpeed: 1000,
       dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1
    });
});

$(document).ready(function(){
    $('.slider2').slick({
      autoplay: true,
      autoplaySpeed: 1000,
       dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 1
    });
});

let logout = document.getElementById("logout")

const urlParams = new URLSearchParams(window.location.search);
let tokenurl = urlParams.get('token');
let username = urlParams.get("username")
let image = urlParams.get("image")
console.log(tokenurl)
console.log(username)
console.log(image)

let accountcir=document.getElementById("accountcircle")
let displayname = document.getElementById("display-name")
if (!tokenurl) {
  displayname.style.display = "none"
} else {
  log.style.display="none"
  let h2c = document.createElement("h2")
  let imgc = document.createElement("img")
  h2c.innerText = username;
  imgc.src = image;
  logout.innerText="logout"
  accountcir.style.display="none";

  displayname.append(h2c, imgc)
}


logout.addEventListener('click',()=>{
  if(logout.innerText=="Sigin/Signup"){
      window.location.href="login.html"
  }else{
      localStorage.clear()
      window.location.href="index.html"
  }
})
