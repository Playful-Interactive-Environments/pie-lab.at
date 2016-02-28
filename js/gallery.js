var mainImage = document.getElementsByClassName("gallery-main")[0].getElementsByTagName("img")[0];

document.getElementsByClassName("gallery-preview")[0].addEventListener("click", swapImage, false);

function swapImage(e) {
    if (e.target.className === "gallery-preview-item") {
        mainImage.src = e.target.dataset.target;
        mainImage.alt = e.target.dataset.desc;
        e.preventDefault();
    }
}