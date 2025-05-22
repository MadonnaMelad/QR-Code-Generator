const container = document.querySelector(".container");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submit");
const downloadBtn = document.getElementById("download");
const sizeOptions = document.querySelector(".sizeOptions");
const BGColor = document.getElementById("BGColor");
const FGColor = document.getElementById("FGColor");
let sizeChoice, BGColorChoice, FGColorChoice;


sizeOptions.addEventListener("change",()=>{
    sizeChoice = sizeOptions.value;
});

BGColor.addEventListener("input",()=>{
    BGColorChoice = BGColor.value;
});

FGColor.addEventListener("input",()=>{
    FGColorChoice = FGColor.value;
});

const inputFormatter = (value) =>{
    value = value.replace(/[^a-z0-9A-Z]+/g, "");
    return value;
}

submitBtn.addEventListener("click", async () =>{
    container.innerHTML = "";
    new QRCode(container, {
        text: userInput.value,
        width: sizeChoice,
        height: sizeChoice,
        colorDark: FGColorChoice,
        colorLight: BGColorChoice,
    });

setTimeout(() => {
    const qrImage = container.querySelector("canvas") || container.querySelector("img");
    if (!qrImage) return;

    let src;
    if (qrImage.tagName.toLowerCase() === "canvas") {
        src = qrImage.toDataURL("image/png");
    } else {
        src = qrImage.src;
    }

    downloadBtn.href = src;

    let userValue = userInput.value;
    try {
        userValue = new URL(userValue).hostname;
    } catch (_) {
        userValue = inputFormatter(userValue);
    }

    const cleanFileName = userValue.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    downloadBtn.download = `${cleanFileName}_QR.png`;

    downloadBtn.classList.remove("hide");
}, 300);

});

userInput.addEventListener("input",() => {
    if(userInput.value.trim().length < 1){
        submitBtn.disabled = true;
        downloadBtn.href = "";
        downloadBtn.classList.add("hide");
    } else {
        submitBtn.disabled = false;
    }
});

window.onload = () =>{
    container.innerHTML = "";
    sizeChoice = 100;
    sizeOptions.value = 100;
    userInput.value = "";
    BGColor.value = BGColorChoice = "#ffffff";
    FGColor.value = FGColorChoice = "#377dff";
    downloadBtn.classList.add("hide");
    submitBtn.disabled = true;
};