t = 0
function floatHero() {
    const heroName = document.querySelector(".heroNameContainer");
    heroName.style.transition = "0s"
    heroName.style.translate = `calc(${Math.sin(t)*30}% - 1em) calc(50vh - 50% - var(--hero-padding) + 30px - ${Math.max((1-t),0.2)*Math.sin(t)*30}px)`;
    heroName.style.rotate = `${-Math.cos(t)*5}deg`
    t += 0.01
    requestAnimationFrame(floatHero)
}

var currents = []
var dirs = []
window.addEventListener("load", function() {

    document.querySelector(".scrolldown").style.bottom = "40px";

    scrolled()
    const heroName = document.querySelector(".heroNameContainer");
    const heroNameInner = document.querySelectorAll(".heroNameInner");

    heroNameInner.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.rotate = `${Math.random() * 10 - 5}deg`;
            letter.style.scale = 1.1;
            letter.classList.add("raised");
            setTimeout(() => {
                letter.style.rotate = ``;
                letter.style.scale = ``;
            }, 200);

            if (index === heroNameInner.length - 1) {
                setTimeout(() => {
                    heroName.style.rotate = `-2deg`;
                    setTimeout(() => {
                        heroName.style.rotate = `-4deg`;
                        setTimeout(() => {
                            heroName.style.rotate = `-5deg`;
                            setTimeout(() => {
                                heroName.style.translate = `-1em calc(50vh - 50% - var(--hero-padding) + 30px)`;
                                setTimeout(floatHero, 700);
                            }, 800)
                        }, 1000)
                    }, 900)
                }, 800);
            }
        }, index * 100);
    });

    for (let duck of document.getElementsByClassName("duckContainer")) {
        duck.style.transition = "0s"
        let place = Math.random()*0.8 + 0.1
        duck.style.left = `${place*100}%`;
        duck.style.transition = ``
        setTimeout(() => {
            duck.style.bottom = "0";
            currents.push(place)
            dirs.push(Math.random() > 0.5 ? 1 : -1)
        }, Math.random()*1000)
    }

    setTimeout(() => {
        for (let i = 0; i < document.getElementsByClassName("duckContainer").length; i++) {
            moveDuck(i)
        }
        let order = [...Array(document.getElementsByClassName("duckContainer").length).keys()];
        order.sort(() => Math.random() - 0.5);
        setInterval(() => {
            moveDuck(order[0])
            order.splice(0, 1)
            if (order.length == 0) {
                order = [...Array(document.getElementsByClassName("duckContainer").length).keys()];
                order.sort(() => Math.random() - 0.5);
            }
        }, 5000/document.getElementsByClassName("duckContainer").length)
    }, 1000)
})

function moveDuck(k) {
    const ducks = document.getElementsByClassName("duckContainer")

    let duck = ducks[k];
    let dir = dirs[k];
    dirs[k] *= -1;
    currents[k] = Math.max(0.1, Math.min(0.9, currents[k] + dir*0.5));
    duck.style.left = `${currents[k]*80 + 10}%`
    duck.style.scale = `${dir} 1`
}

window.addEventListener("click", () => {
    let duck = document.createElement("div");
    duck.classList.add("duckContainer");
    if (Math.random() < 0.5) {
        duck.classList.add("baby");
    }
    duck.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
                <polygon points="0,100 80,100 80,0 40,0 40,50 0,50" fill="${Math.random() < 0.5 ? 'var(--accent-color)' : 'white'}" />
                <rect x="80" y="15" width="20" height="15" fill="orange" />
                <rect x="65" y="10" width="10" height="10" fill="var(--main-color)" />
            </svg>`
    document.querySelector(".hero").appendChild(duck);

    duck.style.transition = "0s"
    let place = Math.random()*0.8 + 0.1
    duck.style.left = `${place*100}%`;
    duck.style.transition = ``
    setTimeout(() => {
        duck.style.bottom = 0;
        currents.push(place)
        dirs.push(Math.random() > 0.5 ? 1 : -1)
    }, 50)
})

function scrolled() {
    let scroll = window.scrollY;
    let lockHeight = window.innerHeight/3;
    document.documentElement.style.setProperty('--hero-padding', `${Math.max(0, (1-scroll/lockHeight)*6)}vmin`);

    if (scroll > lockHeight) {
        document.getElementById("all").style.position = "absolute";
        document.getElementById("all").style.top = `${lockHeight}px`;
    } else {
        document.getElementById("all").style.position = "fixed";
        document.getElementById("all").style.top = `0px`;
    }
}

window.addEventListener("scroll", scrolled)