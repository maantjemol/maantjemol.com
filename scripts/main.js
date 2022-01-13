function copyText(){
    var copyText = document.getElementById("copyText");
    var email = document.getElementById("emailSocial");
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(copyText.value);
    email.textContent = "Copied! \r\n Click To Copy Again";
    createExplotion(MouseX, MouseY, 50);
}