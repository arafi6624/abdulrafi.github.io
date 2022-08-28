window.onscroll = function(){
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){
        document.getElementById('navbar').classList.add('scrolled');
    }else{
        document.getElementById('navbar').classList.remove('scrolled');
    }
}

var form = document.getElementById("my-form");
    
async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
    }).then(response => {
    if (response.ok) {
        status.classList.add("success");
        status.innerHTML = "Message sent!";
        form.reset()
    } else {
        response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
            status.classList.add("error");
            status.innerHTML = "Oops! There was a problem sending your message. Sorry for the inconvenience."
        }
        })
    }
    }).catch(error => {
        status.classList.add("success");
        status.innerHTML = "Message sent!"
    });
}
form.addEventListener("submit", handleSubmit)

const video = document.querySelector('video');
let isPaused = false;
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio !== 1 && !video.paused) {
      video.pause();
      isPaused = true;
    } else if (isPaused) {
      video.play();
      isPaused = false
    }
  });
}, {
  threshold: 1
});
observer.observe(video);