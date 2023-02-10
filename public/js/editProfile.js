document.querySelector("#edit-profile").addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        username : document.querySelector("#editUsername").value,
        bio : document.querySelector("#editBio").value,
    }
    fetch(`/api/users/editprofile`,{
        method:"PUT",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})

document.querySelector("#show-edit-form").addEventListener("click",e=>{
    document.querySelector("#edit-profile").classList.remove("hide");
    document.querySelector(".profile-data").classList.add("hide");
})

document.querySelector("#profile-add-love").addEventListener("submit",e=>{
    e.preventDefault();
    const idToAdd= document.querySelector("#profile-add-love-select").value;
    console.log(idToAdd)
    fetch(`/api/users/addLove/${idToAdd}`,{
        method:"POST"
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})

document.querySelectorAll(".editable-can").forEach(img=>{
    img.addEventListener('click',(e)=>{
        console.log(e.target);
        const loveOrHate = e.target.getAttribute("data-feeling");
        const idToRemove = e.target.getAttribute("data-flavor-id");
        console.log(loveOrHate,idToRemove)
        fetch(`/api/users/remove${loveOrHate}/${idToRemove}`,{
            method:"DELETE"
        }).then(res=>{
            if(res.ok){
               location.reload()
            } else {
                alert("trumpet sound")
            }
        })
    })
})