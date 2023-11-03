export default function toggleYupooSideBar(removeYupooSideBar) {
    // If remove sidebar toggle switch is on
    if(removeYupooSideBar){
        if(document.querySelector(".yupoo-categories-hide-sidebar")) document.querySelector(".yupoo-categories-hide-sidebar").style.display = "none";
        if(document.querySelector(".categories__box-left")) document.querySelector(".categories__box-left").style.display = "none";
        if(document.querySelector(".categories__box-right")) document.querySelector(".categories__box-right").style.marginLeft = "0";
    }else {
        if(document.querySelector(".yupoo-categories-hide-sidebar")) document.querySelector(".yupoo-categories-hide-sidebar").style.display = "block";
        if(document.querySelector(".categories__box-left")) document.querySelector(".categories__box-left").style.display = "block";
        if(document.querySelector(".categories__box-right")) document.querySelector(".categories__box-right").style.marginLeft = "216px";
    }
}