(function () {
    // Create banner element
    const banner = document.createElement("div");
    banner.innerText = "Hello! I am here!";
    banner.style.background = "#4a76b2";
    banner.style.color = "white";
    banner.style.padding = "10px";
    banner.style.fontSize = "18px";
    banner.style.fontWeight = "bold";
    banner.style.textAlign = "center";
    banner.style.zIndex = "9999";

    // Insert it above the dashboard content
    const target = document.querySelector("body"); // fallback
    if (target) {
        target.insertBefore(banner, target.firstChild);
    }
})();
