document.getElementById("imageUpload").onclick = function() {
    let xhttp = new XMLHttpRequest();

    const imageStatus = document.getElementById("imageStatus");
    const selectedImage = document.getElementById("selectedImage");
    const progressDiv = document.getElementById("progressDiv");
    const progressBar = document.getElementById("progressBar");

    xhttp.onreadystatechange = function() {
        if(xhttp.status === 200) {
            selectedImage.value = "";    
        }
        imageStatus.innerHTML = this.responseText;
    }

    xhttp.open("POST", "/dashboard/image-upload");

    xhttp.upload.onprogress = function (e) {
        if (e.lengthComputable) {
            let result = Math.floor( (e.loaded / e.total) * 100);
            console.log(result);
            if(result !== 100) {
                progressBar.innerHTML = result + "%";
                progressBar.style.width = result + "%";
            } else {
                progressDiv.style.display = "none";
            }
        }
    }
    let formData = new FormData();

    if (selectedImage.files.length) {
        progressDiv.style = "display: block";
        formData.append("image", selectedImage.files[0]);
        xhttp.send(formData);
    } else {
        imageStatus.innerHTML = "برای  اپلود عکس باید عکسی انتخاب کنید";
    }

}