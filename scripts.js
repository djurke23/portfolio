function animateValue(id, start, end, duration, callback) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);
    let timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
            if (callback) callback();
        }
    }, stepTime);
}

function typeWriter(text, i, fnCallback) {
    if (i < (text.length)) {
        document.getElementById("typed-name").innerHTML = text.substring(0, i+1) + '<span aria-hidden="true"></span>';
        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
        }, 100);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}

function startTextAnimation(i) {
    if (typeof dataText[i] == 'undefined') {
        setTimeout(function() {
            startTextAnimation(0);
        }, 20000);
    }
    if (i < dataText.length) {
        typeWriter(dataText[i], 0, function() {
            startTextAnimation(i + 1);
        });
    }
}

const dataText = ["Luka Đurić", ""];

document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(function() {
        document.getElementById('loading-screen').style.display = 'none';
        
        animateValue("years", 0, 12, 2000, function() {
            animateValue("projects", 0, 26, 2000, function() {
                animateValue("technologies", 0, 8, 2000, function() {
                    animateValue("commits", 0, 500, 2000, function() {
                        document.querySelector('.container').style.opacity = 1;
                        startTextAnimation(0);
                    });
                });
            });
        });

    }, 2000);
});

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });
}

navSlide();





// back to top



const backToTopButton = document.getElementById('backToTop');

// Funkcija za prikaz/sakrivanje dugmeta
function toggleBackToTopButton() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}

// Funkcija za animirano skrolovanje na vrh
function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event listeneri
window.addEventListener('scroll', toggleBackToTopButton);
backToTopButton.addEventListener('click', scrollToTop);











// projekti


const filterButtons = document.querySelectorAll('.filteri button');
const projekti = document.querySelectorAll('.projekat');

// Podaci o projektima (zameni sa svojim podacima)
const projektiData = [
    {
        kategorija: 'web-dizajn',
        slika: 'slike/projekti/ibg.png',
        naslov: 'Projekat 1',
        opis: 'Sajt za firmu Inno Build Group',
        link: 'https://djurke23.github.io/Inno-Build-Group/'
    },
    {
        kategorija: 'web-dizajn',
        slika: 'slike/projekti/bgdcars.png',
        naslov: 'Projekat 2',
        opis: 'Sajt za firmu BGD CARS Detailing',
        link: 'https://djurke23.github.io/BGD-Cars-Detailing/'
    },
    // ... ostali projekti
];



// Funkcija za kreiranje HTML-a projekta
function kreirajProjekat(projekat) {
    return `
        <div class="projekat ${projekat.kategorija}">
            <a href="${projekat.link}" target="_blank"> 
                <img src="${projekat.slika}" alt="${projekat.naslov}">
                <h3>${projekat.naslov}</h3>
                <p>${projekat.opis}</p>
            </a>
        </div>
    `;
}

// Prikaz svih projekata na početku
projektiData.forEach(projekat => {
    document.querySelector('.mreza-projekata').innerHTML += kreirajProjekat(projekat);
});

// Dodaj event listener za svako dugme filtera
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Ukloni klasu "aktivan" sa svih dugmadi
        filterButtons.forEach(btn => btn.classList.remove('aktivan'));
        // Dodaj klasu "aktivan" na kliknuto dugme
        button.classList.add('aktivan');

        // Filtriranje projekata
        projekti.forEach(projekat => {
            if (filter === 'svi' || projekat.classList.contains(filter)) {
                projekat.style.display = 'block';
            } else {
                projekat.style.display = 'none';
            }
        });
    });
});