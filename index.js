const dropzone = document.querySelector(".drop-zone");
const fileip = document.querySelector(".fileip");
const browse = document.querySelector(".browse");

const host = "https://innshare.herokuapp.com/"
const uploadURL = host + "api/files";


dropzone.addEventListener("dragover", (e)=>{
    console.log("Dragging");
    // keeps firing every 50ms MDN
    e.preventDefault();
    if(!dropzone.classList.contains("dragged")){
        dropzone.classList.add("dragged");
    }
});

dropzone.addEventListener("dragleave", ()=>{
    dropzone.classList.remove("dragged");
});

dropzone.addEventListener("drop", (e)=>{
    e.preventDefault();
    dropzone.classList.remove("dragged");
    const files_ = e.dataTransfer.files;
    if(files_.length){
        // handles multiple files selected at a time
        fileip.files = files_;
        uploadFile();
    }
    
});

browse.addEventListener("click", ()=>{
    fileip.click();
});


/* Monitoring Upload */ 

const uploadFile = ()=>{
    const File = fileip.files[0];
    const formData = new FormData();
    formData.append(File);

    const xhr = new XMLHttpRequest();

    /* successfull upload */
    xhr.onreadystatechange = ()=>{
        console.log(xhr.readyState);
    }

    xhr.open("POST", uploadURL);
    xhr.send(formData);
}

