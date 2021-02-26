
const dropzone = document.querySelector(".drop-zone");
const fileip = document.querySelector(".fileip");
const browse = document.querySelector(".browse");
const bgProgress = document.querySelector(".bg-progress");
const progressContainer = document.querySelector(".progress-container");
const urlContainer = document.querySelector(".url_");
const linkContainer = document.querySelector(".link_container");
const alert = document.querySelector('.alert');

const buttonCopy = document.querySelector(".copy");




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
    // no of files > 0
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
    // only upload one file at a time
    const File = fileip.files[0];

    if(fileip.files.length > 1){
        showAlert("Only 1 File will be Uploaded");
    }

    if(File.size > 3*1024*1024){
        showAlert("File Size exceeds 3MB");
        fileip.value = "";
        return;
    }

    progressContainer.style.display = "block";
    const formData = new FormData();

    formData.append("file", File);
    const xhr = new XMLHttpRequest();

    /* successfull upload*/
    xhr.onreadystatechange = ()=>{
        console.log(xhr.readyState);
        if(xhr.readyState == XMLHttpRequest.DONE){
            /* JSON Object contains link */
            showLink(JSON.parse(xhr.response));
        }
    }
    
    xhr.upload.onprogress = updateProgress;

    xhr.upload.onerror = ()=>{
        showAlert("Error in Upload ", xhr.statusText);
        fileip.value = "";
    }

    xhr.open("POST", uploadURL);
    xhr.send(formData);
    fileip.value = "";
}

/* animate progress */

const updateProgress = (e)=>{
    const percent = Math.round((e.loaded/e.total)*100);
    console.log(percent);
    bgProgress.style.width = `${percent}%`;
}

const showLink = ({file: url})=>{
    console.log(url);
    progressContainer.style.display = "none";
    urlContainer.value = url;
    linkContainer.style.display = "block"
}

buttonCopy.addEventListener("click", ()=>{
    urlContainer.select();
    document.execCommand("copy");
    showAlert("Copied To Clipboard");
});

let timer;

const showAlert = (msg)=>{
    alert.innerText = msg;
    alert.style.transform = "translate(-50%, 0)";
    clearTimeout(timer);
    timer = setTimeout(()=>{
        alert.style.transform = "translate(-50%, 100px)";    
    }, 1000);
}