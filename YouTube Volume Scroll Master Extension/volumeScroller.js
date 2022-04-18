var isOverVideo = false;
var videoFrameContainer = null;
var slider = null;
var hideTimer = null;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setLocalItem(name,value,days) {
    var dict = {};
    dict.data = value;
    dict.expiration = new Date().getTime() + (days * 24 * 60 * 60 * 1000);
    localStorage.setItem(name, JSON.stringify(dict));
    dict.creation = new Date().getTime();
    sessionStorage.setItem(name, JSON.stringify(dict));
}

window.addEventListener("wheel", event => {

    if (!isOverVideo)
    {
        return;
    }

    const delta = Math.sign(event.deltaY);

    var vid = document.querySelector('.video-stream');

    var newVolume = vid.volume + 0.02 * -delta;
    if (newVolume < 0 )
    {
        newVolume = 0;
    }
    else if (newVolume > 1)
    {
        newVolume = 1;
    }

    vid.volume = newVolume;

    if (videoFrameContainer)
    {
        var newRoundedValue = Math.ceil(vid.volume*100);
        videoFrameContainer.innerHTML = newRoundedValue;
        slider.setAttribute("aria-valuenow", newRoundedValue);
        
        var cookie = {};
        cookie.volume = Math.ceil(vid.volume*100);
        cookie.muted = false;
        setLocalItem("yt-player-volume", JSON.stringify(cookie), 100);

        document.getElementsByClassName("ytp-volume-slider-handle")[0].style.left = 40 / 100 *  newRoundedValue;
        videoFrameContainer.classList.remove("fade");
        clearTimeout(hideTimer);
        hideTimer = setTimeout(function(){ videoFrameContainer.classList.add("fade") }, 1500);
    }


    console.info(vid.volume);
    console.log(event);

    event.preventDefault();

}, {passive:false});

var videoFrameContainers = document.getElementsByClassName("html5-video-container");
var sliders = document.getElementsByClassName("ytp-volume-panel");

Array.from(videoFrameContainers).forEach((element) => {

    var div = document.createElement("div");
    div.classList.add("volumeText")

    element.appendChild(div);
    videoFrameContainer = div;

});

Array.from(sliders).forEach((element) => {
    slider = element;
});



var videoFrame = document.getElementsByClassName("video-stream html5-main-video");
var page = document.getElementsByTagName('body')[0];

Array.from(videoFrame).forEach((element) => {

    
    // This handler will be executed only once when the cursor
// moves over the unordered list
element.addEventListener("mouseenter", function( event ) {
    // highlight the mouseenter target
    isOverVideo = true;
    console.log(isOverVideo);
  }, false);

  
  // This handler will be executed every time the cursor
  // is moved over a different list item
  element.addEventListener("mouseleave", function( event ) {
    // highlight the mouseover target
    isOverVideo = false;
    console.log(isOverVideo);
  }, false);

});

