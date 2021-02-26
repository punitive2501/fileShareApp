const dropzone = document.querySelector(".drop-zone");
const fileip = document.querySelector(".fileip");
const browse = document.querySelector(".browse");
const bgProgress = document.querySelector(".bg-progress");

const host = "https://file-shareapp.herokuapp.com/";
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

fileip.addEventListener("change", ()=>{
    uploadFile();
});

/* Monitoring Upload */ 

const uploadFile = ()=>{
    const File = fileip.files[0];
    const formData = new FormData();
    formData.append("file", File);

    const xhr = new XMLHttpRequest();

    /* successfull upload*/
    xhr.onreadystatechange = ()=>{
        console.log(xhr.readyState);
        if(xhr.readyState == XMLHttpRequest.DONE){
            /* JSON Object contains link */
            console.log(xhr.response);
        }
    }
    xhr.upload.onprogress = updateProgress;
    xhr.open("POST", uploadURL);
    xhr.send(formData);
    
}

const updateProgress = (e)=>{
    const percent = Math.round(e.loaded/e.total)*100;
    console.log(percent);
    bgProgress.style.width = `${percent}%`;
}
