
//put color value in localstorage
let localColor = localStorage.getItem("color-option");

//check if localstorage value is not empty
if( localColor !== null ){
    //make the color of body = localstorgae color
    document.documentElement.style.setProperty("--main-color" , localColor)

    //remove active class from all lists
    document.querySelectorAll(".colors .color-list li").forEach(ele => {
        //remove all active class from list items
        ele.classList.remove("active")

        //put active class in list own localstorage color
        if( ele.dataset.color === localColor ){
            ele.classList.add("active")
        }
    })

}

// setting-box
// switch colors 
// catch all list
const colorLi = document.querySelectorAll(".colors li") 

// loop on all list items 
colorLi.forEach(li => {
    //get the color from any list i click on it
    li.addEventListener("click" , (e) => {
        //change color of the body to list-color by click on list
        document.documentElement.style.setProperty("--main-color" , e.target.dataset.color)

        //put target color in localstorage
        localStorage.setItem("color-option" , e.target.dataset.color)

        active(e)
    } )
})

//control click option for random background
let backgroundOption = true;

//control interval of random background
let backgroundInterval;

//put color value in localstorage
let localBackground = localStorage.getItem("background-option");

//check if localstorage value is not empty
if(localBackground !== null){
    document.querySelectorAll(".background span").forEach(ele => {
        ele.classList.remove("active");
    })

    if (localBackground === "true") {
        backgroundOption = true;
        document.querySelector(".background .yes").classList.add("active")
    }else{
        backgroundOption = false;
        document.querySelector(".background .no").classList.add("active")
    }
}

//switch background
const bkgroundSpanElement = document.querySelectorAll(".background span") 

// loop on all span items 
bkgroundSpanElement.forEach(span => {
    //click on any span
    span.addEventListener("click" , (e) => {

        active(e)
        //click on span if yes or noo
        if(e.target.dataset.background === "yes"){
            
           backgroundOption = true;
           randomize()

            localStorage.setItem("background-option" , true)
        }else{
            backgroundOption = false;
            //stop randomly background images changes
            clearInterval(backgroundInterval)

            localStorage.setItem("background-option" , false)
        }
    } )

})

// catch landing page 
let pic = document.querySelector(".hello");
// array has random images 
let images = ["21.jpg","22.jpg","23.jpg","24.jpg","25.jpg"];

//function to control
function randomize() {
    //if true use random
    if (backgroundOption == true) {
      backgroundInterval = setInterval( () => {
            //change background images randomly
            pic.style.backgroundImage = 'url("../css/imgs/' + images[Math.floor(Math.random() * images.length)] + '")';
        },1000)
    }else{
        clearInterval(backgroundInterval)
    }
}
randomize()
//every 10min changes backgroynd color

//make icon open and close 
let iconDiv = document.querySelector(".icon");
iconDiv.onclick = function () {
    //Toggle classes
    document.querySelector(".setting-box").classList.toggle("opened");
    document.querySelector(".colors").classList.toggle("none");
    document.querySelector(".background").classList.toggle("none");
    document.querySelector(".bullets-control").classList.toggle("none");
    document.querySelector(".reset-button").classList.toggle("none");
    document.querySelector(".fa-solid").classList.toggle("fa-spin");
    this.classList.toggle("open");
}

//select skills
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    //skills top offset
    let skillsTopOffset = ourSkills.offsetTop;

    //skills body height
    let skillsHeight = ourSkills.offsetHeight;

    //window height
    let windowHeight = this.innerHeight;

    //window scroll height
    let windowScroll = this.pageYOffset;
    
    if (windowScroll > (skillsTopOffset + skillsHeight - windowHeight)) {
        let skillSpan = document.querySelectorAll(".skills .skill-progress span");

        //loop on all span to make width equal data-progrees with duration
        skillSpan.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })
    }
}

//open image
let AllImages = document.querySelectorAll(".gallery .image-box img")

//loop on All images
AllImages.forEach(img => {
    //click on any image
    img.addEventListener("click" , function (e) {
        
    //create overlay
    let overlay = document.createElement("div");

    //add class on div
    overlay.classList.add("overlay");

    //append overlay on body
    document.body.appendChild(overlay)

    //create popup box
    let popupBox = document.createElement("div");

    //add class on popup 
    popupBox.classList.add("popup-box");

    //if there is alt attribute
    if (e.target.alt !== null) {
    //creat caption on image
    let header = document.createElement("h4");

    //put alt on textnode
    let caption = document.createTextNode(e.target.alt)

    //put caption on header
    header.appendChild(caption);

    //put header on popupbox
    popupBox.appendChild(header);
    }

    //create image to put in popup box
    let fullImage = document.createElement("img");

    //add class on img
    fullImage.classList.add("full-image")

    //append image to popup
    popupBox.appendChild(fullImage);

    //make src of original image equal to new full image
    fullImage.src = e.target.src ;

    //append popupBox to body
    overlay.appendChild(popupBox); 

    //make span to close image
    let closeButton = document.createElement("span");

    //inner text on close button
    let xButton = document.createTextNode("X");

    //append x to button 
    closeButton.appendChild(xButton);

    //add class on closeButton 
    closeButton.classList.add("close")

    //append button to popub
    popupBox.appendChild(closeButton)

    closeButton.addEventListener("click" , function(){
        overlay.remove()
        popupBox.remove()
    })
    })

})

//catch bullet-circles
let bullets = document.querySelectorAll(".bullets .bullet-circle");
//catch all links
let links = document.querySelectorAll(".hello .header-area .list li a");

//handle scroll into view
function scroll(ele) {
    ele.forEach(el => {
        el.addEventListener("click" , (e) => {
            //scroll to target section
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}
scroll(bullets)
scroll(links)

//handle remove and adding active class
function active(event) {
    event.target.parentElement.querySelectorAll(".active").forEach(ele => {
        //remove all active class from list items
        ele.classList.remove("active")
    })
    //put active class on target list
    event.target.classList.add("active")
}

// show and hide bullets
let bulletsSpan = document.querySelectorAll(".bullets-control span");

bulletsSpan.forEach(bullet => {

    bullet.addEventListener("click" , (e) => {
        //for active class
        active(e)

        if (e.target.dataset.view === "hide") {       
            document.querySelector(".bullets").style.display = "none"
            localStorage.setItem("bullet-option" , "hide");
        }else{
            document.querySelector(".bullets").style.display = "block"
            localStorage.setItem("bullet-option" , "show");
        }
    })
})

//-------local bullets
let bulletsLocal = localStorage.getItem("bullet-option");

if (bulletsLocal !== null) {
    
bulletsSpan.forEach(bullet => {
    // remove active class fromm all span 
    bullet.classList.remove("active");

        //put active class on local save type
        if (bullet.dataset.view === bulletsLocal ) {
            //add class active on local type
            bullet.classList.add("active");
        }
        //hide button when active class on no
        if (bulletsLocal === "hide") {
            document.querySelector(".bullets").style.display = "none"
        }
})
}

//reset button
let resetButton = document.querySelector(".reset");

resetButton.addEventListener("click" , function(){

    localStorage.clear()
    window.location.reload()

})

//toggle-menu
let toggleMenuButton = document.querySelector(".toggle-menu");

//all links
let link = document.querySelector(".hello .header-area .list");


toggleMenuButton.addEventListener("click" , function(e){
    //stop clicking between spans
    e.stopPropagation()

    //toggle class active on the toggle menu
    this.classList.toggle("menu-active")

    //toggle class open on the list
    link.classList.toggle("open");

})


document.addEventListener("click" , function (e) {

    if (e.target !== toggleMenuButton && e.target !== link) {
        if (link.classList.contains("open")) {

            //toggle class active on the toggle menu
            toggleMenuButton.classList.toggle("menu-active")

            //toggle class open on the list
            link.classList.toggle("open");
            
        }
    }
})

//if click on any space between ul its stop it
link.addEventListener("click" , function (e) {
    e.stopPropagation()
})