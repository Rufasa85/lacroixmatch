const loves = [];
const hates = [];

document.querySelector("#signupForm").addEventListener("submit",e=>{
    e.preventDefault();
    const signupObj = {
        email:document.querySelector("#signupEmail").value,
        password:document.querySelector("#signupPassword").value,
        bio:document.querySelector("#signupBio").value,
        username:document.querySelector("#signupUsername").value,
        loveIds:loves,
        hateIds:hates
    }
    console.log(signupObj)

    fetch("/api/users/",{
        method:"POST",
        body:JSON.stringify(signupObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/"
        } else {
            alert("trumpet sound")
        }
    })
})

document.querySelector("#addLove").addEventListener("click",e=>{
    const lovedId = document.querySelector("#lovedFlavors").value;
    if(!loves.includes(lovedId)){
        loves.push(lovedId)
        const newLoveImg= document.createElement("img");
        newLoveImg.setAttribute("class","signupcan-img");
        newLoveImg.setAttribute("data-flav-id",lovedId);
        newLoveImg.src=document.querySelector(`option[value="${lovedId}"]`).getAttribute("data-pic")
        document.querySelector("#loveBox").append(newLoveImg)
    }
})

document.querySelector("#loveBox").addEventListener("click",e=>{
    if(e.target.matches("img.signupcan-img")){
        loves.splice(loves.indexOf(e.target.getAttribute("data-flav-id")),1)
    }
    e.target.remove();
})
document.querySelector("#addHate").addEventListener("click",e=>{
    const hatedId = document.querySelector("#hatedFlavors").value;
    if(!hates.includes(hatedId)){
        hates.push(hatedId)
        const newHateImg= document.createElement("img");
        newHateImg.setAttribute("class","signupcan-img");
        newHateImg.setAttribute("data-flav-id",hatedId);
        newHateImg.src=document.querySelector(`option[value="${hatedId}"]`).getAttribute("data-pic")
        document.querySelector("#hateBox").append(newHateImg)
    }
})

document.querySelector("#hateBox").addEventListener("click",e=>{
    if(e.target.matches("img.signupcan-img")){
        hates.splice(hates.indexOf(e.target.getAttribute("data-flav-id")),1)
    }
    e.target.remove();
})