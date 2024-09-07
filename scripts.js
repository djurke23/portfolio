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
        
        animateValue("years", 0, 5, 2000, function() {
            animateValue("projects", 0, 30, 2000, function() {
                animateValue("technologies", 0, 12, 2000, function() {
                    animateValue("commits", 0, 10, 2000, function() {
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







// prozorcic

function openModal(id) {
    var modal = document.getElementById(id + '-modal');
    modal.style.display = 'block';
    // Dodajemo mali timeout da bismo omogućili CSS tranziciju
    setTimeout(function() {
        modal.classList.add('show');
    }, 10);
}

function closeModal(id) {
    var modal = document.getElementById(id + '-modal');
    modal.classList.remove('show');
    // Čekamo da se završi fade-out animacija pre nego što sakrijemo modal
    setTimeout(function() {
        modal.style.display = 'none';
    }, 300);
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id.replace('-modal', ''));
    }
}








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
        link: 'https://innobuildgroup.rs/'
    },
    {
        kategorija: 'web-dizajn',
        slika: 'slike/projekti/bgdcars.png',
        naslov: 'Projekat u izradi',
        opis: 'Sajt za firmu BGD CARS Detailing',
        link: 'https://djurke23.github.io/BGD-Cars-Detailing/'
    },
    {
        kategorija: 'web-app',
        slika: 'slike/projekti/calculator.png',
        naslov: 'Kalkulator',
        opis: 'Scientific kalkulator',
        link: 'https://djurke23.github.io/calculator/'
    },
    {
        kategorija: 'web-app',
        slika: 'slike/projekti/qrkodgenerator.png',
        naslov: 'QR Code Generator',
        opis: 'QR Code Generator',
        link: 'https://djurke23.github.io/qr-code-generator/'
    },
    {
        kategorija: 'web-app',
        slika: 'slike/projekti/todolist.png',
        naslov: 'To-Do List',
        opis: 'To do lista',
        link: 'https://djurke23.github.io/to_do_list/'
    },
    {
        kategorija: 'web-dizajn',
        slika: 'slike/projekti/rqg.png',
        naslov: 'Random Quote Generator',
        opis: 'Random Quote Generator',
        link: 'https://djurke23.github.io/random-quote-generator/'
    },
    {
        kategorija: 'web-dizajn',
        slika: 'slike/projekti/rng.png',
        naslov: 'Random Number Generator',
        opis: 'Random Number Generator',
        link: 'https://djurke23.github.io/random_number_generator/'
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








// o meni kopoiranje linkova

document.querySelectorAll('.info-column a').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        const textToCopy = event.target.innerText;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert(`${textToCopy} Uspešno kopirano!`);
            })
            .catch(err => {
                console.error('Kopiranje je neuspešno: ', err);
            });
    });
});








// recenzije


let currentIndex = 0;
const intervalTime = 5000; // 5 sekundi

const testimonials = document.querySelector('.testimonials');
const testimonialItems = document.querySelectorAll('.testimonial');
const totalItems = testimonialItems.length;

function updateSlider() {
    const offset = -currentIndex * 100;
    testimonials.style.transform = `translateX(${offset}%)`;
}

document.querySelector('.next').addEventListener('click', () => {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlider();
});

document.querySelector('.prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalItems - 1;
    }
    updateSlider();
});

// Automatski prelazak na sledeću recenziju
setInterval(() => {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlider();
}, intervalTime);







// Language toggle functionality
const translations = {
    "sr": {
        "greeting": "Zdravo, Zovem se:",
        "description": "Odličan sam u stvaranju elegantnih digitalnih iskustava i vešt sam u raznim programskim jezicima i tehnologijama.",
        "home": "Početna",
        "about": "O meni",
        "services": "Usluge",
        "skills": "Veštine",
        "projects": "Projekti",
        "contact": "Kontakt",
        "hireMe": "Kontaktirajte Me"
    },
    "en": {
        "greeting": "Hello, My name is:",
        "description": "I excel at creating elegant digital experiences and am skilled in various programming languages and technologies.",
        "home": "Home",
        "about": "About Me",
        "services": "Services",
        "skills": "Skills",
        "projects": "Projects",
        "contact": "Contact",
        "hireMe": "Hire Me"
    }
};



const languageToggle = document.getElementById('languageToggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
let currentLanguage = "sr";

// Funkcija za prikaz/sakrivanje padajućeg menija
languageToggle.addEventListener('click', () => {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('show');
});

// Funkcija za promenu jezika
function switchLanguage() {
    if (currentLanguage === "sr") {
        currentLanguage = "en";
        translatePage(currentLanguage);
        // Ažuriraj dugme i opciju u meniju
        languageToggle.innerHTML = '<span class="flag-icon flag-icon-gb"></span> English';
        dropdownMenu.innerHTML = '<a href="#" id="lang-sr"><span class="flag-icon flag-icon-rs"></span> Српски</a>';
    } else {
        currentLanguage = "sr";
        translatePage(currentLanguage);
        // Ažuriraj dugme i opciju u meniju
        languageToggle.innerHTML = '<span class="flag-icon flag-icon-rs"></span> Српски';
        dropdownMenu.innerHTML = '<a href="#" id="lang-en"><span class="flag-icon flag-icon-gb"></span> English</a>';
    }

    // Dodaj novi event listener za klik na ažuriranu opciju
    dropdownMenu.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        switchLanguage();
    });

    // Sakrij meni nakon izbora
    document.querySelector('.dropdown').classList.remove('show');
}

// Dodaj inicijalni event listener za klik na engleski jezik
dropdownMenu.querySelector('#lang-en').addEventListener('click', (e) => {
    e.preventDefault();
    switchLanguage();
});

// Funkcija za prevod stranice
function translatePage(language) {
    document.querySelector('h1').textContent = translations[language]["greeting"];
    document.querySelector('.hero-content p').textContent = translations[language]["description"];
    document.querySelector('nav ul li:nth-child(1) a').textContent = translations[language]["home"];
    document.querySelector('nav ul li:nth-child(2) a').textContent = translations[language]["about"];
    document.querySelector('nav ul li:nth-child(3) a').textContent = translations[language]["services"];
    document.querySelector('nav ul li:nth-child(4) a').textContent = translations[language]["skills"];
    document.querySelector('nav ul li:nth-child(5) a').textContent = translations[language]["projects"];
    document.querySelector('nav ul li:nth-child(6) a').textContent = translations[language]["contact"];
    document.querySelector('.hire-me').textContent = translations[language]["hireMe"];
}













const modeToggle = document.getElementById('modeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
let isDarkMode = false; // Postavi na false jer svetli režim (sunce) treba da bude početni

modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    isDarkMode = !isDarkMode;

    // Promeni prikaz ikonica
    if (isDarkMode) {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
    } else {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
    }
});













