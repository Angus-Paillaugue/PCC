export default function changeYupooGrid(){
    chrome.storage.local.get(["yupooContentWidth"], (status) => {
        let yupooContentWidth = status?.yupooContentWidth ?? 170;

        if(document.querySelector(".showalbumheader__main"))document.querySelector(".showalbumheader__main").style.maxWidth = "100%";
        if(document.querySelector(".showindex__gallerycardwrap"))document.querySelector(".showindex__gallerycardwrap").style.maxWidth = "100%";
        if(document.querySelector(".showalbum__imagecardwrap"))document.querySelector(".showalbum__imagecardwrap").style.maxWidth = "100%";
        if(document.querySelector(".categories__box.clearfix"))document.querySelector(".categories__box.clearfix").style.maxWidth = "100%";

        // Change style og products containers
        let imagesContainers = document.querySelectorAll(".categories__parent.album__categories-box, .showalbum__parent, .showindex__parent, .showalbum__parent");
        for(let imagesContainer of imagesContainers){
            imagesContainer.style.display = "grid";
            imagesContainer.style.gap = "10px";
            imagesContainer.style.gridTemplateColumns = `repeat(auto-fill, minmax(${yupooContentWidth}px, 1fr))`;
            // Change sty of products
            Array.from(imagesContainer.children).forEach(el => {
                el.style.width = "100%";
                el.style.margin = "0";
            });
        }
    });
}