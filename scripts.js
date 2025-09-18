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
    // Proveravamo da li element postoji pre nego što pokušamo da ga koristimo
    const typedNameElement = document.getElementById("typed-name");
    if (typedNameElement && i < (text.length)) {
        typedNameElement.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
        }, 100);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}


function startTextAnimation(i) {
    const dataText = ["Luka Đurić", ""]; // Definisano unutar funkcije radi preglednosti
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


document.addEventListener('DOMContentLoaded', function() {
    //=================================================//
    //============== LANGUAGE INITIALIZATION ==========//
    //=================================================//
    // Prvo inicijalizujemo jezik kako bi se tekst ispravno prikazao
    const savedLang = localStorage.getItem('language') || 'sr-cyrillic';
    setLanguage(savedLang);


    //=================================================//
    //============== LOADING & ANIMATIONS =============//
    //=================================================//
    setTimeout(function() {
        

        animateValue("years", 0, 5, 2000, function() {
            animateValue("projects", 0, 30, 2000, function() {
                animateValue("technologies", 0, 12, 2000, function() {
                    animateValue("commits", 0, 10, 2000, function() {
                        // Nema potrebe za startTextAnimation jer nemamo element "typed-name"
                        // Ako ga dodate nazad, odkomentarišite sledeću liniju
                        // startTextAnimation(0);
                    });
                });
            });
        });
    }, 2000);


    //=================================================//
    //============== TESTIMONIALS SLIDER ==============//
    //=================================================//
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevArrow = document.querySelector('.slider-arrow.prev');
    const nextArrow = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 7000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    if (nextArrow && prevArrow) {
        nextArrow.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevArrow.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }

    if (slides.length > 0) {
        showSlide(currentSlide);
        startSlideShow();
    }
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
    setTimeout(function() {
        modal.classList.add('show');
    }, 10);
}

function closeModal(id) {
    var modal = document.getElementById(id + '-modal');
    modal.classList.remove('show');
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

function toggleBackToTopButton() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}

function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', toggleBackToTopButton);
backToTopButton.addEventListener('click', scrollToTop);


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


// dark mode
//=================================================//
//================== THEME TOGGLE =================//
//=================================================//
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

// Funkcija koja primenjuje temu na osnovu localStorage ili sistemskih podešavanja
const applyTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
    }
};

// Funkcija koja se poziva na klik
const toggleTheme = () => {
    body.classList.toggle('light-mode');
    
    // Sačuvaj izbor u localStorage
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
};

// Postavi temu odmah pri učitavanju stranice
applyTheme();

// Dodaj event listener na dugme
if(modeToggle) {
    modeToggle.addEventListener('click', toggleTheme);
}


// projekti
const filterBtns = document.querySelectorAll('.filter-btn-projekti');
const projekti = document.querySelectorAll('.kartica-projekti');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('aktivan-projekti'));
        btn.classList.add('aktivan-projekti');

        const filter = btn.getAttribute('data-filter');

        projekti.forEach((projekat, index) => {
            projekat.style.animation = 'none';

            setTimeout(() => {
                if (filter === 'sve' || projekat.getAttribute('data-category') === filter) {
                    projekat.classList.remove('sakriveno-projekti');
                    projekat.style.animation = `fadeInUp 0.6s ease forwards`;
                    projekat.style.animationDelay = `${index * 0.1}s`;
                } else {
                    projekat.classList.add('sakriveno-projekti');
                }
            }, 10);
        });
    });
});


// infinite logo scroller
const scrollerInnerLogos = document.querySelector(".logos__inner-infinite");
if (scrollerInnerLogos && !scrollerInnerLogos.getAttribute('data-cloned')) {
    const scrollerContent = Array.from(scrollerInnerLogos.children);
    scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInnerLogos.appendChild(duplicatedItem);
    });
    scrollerInnerLogos.setAttribute('data-cloned', 'true');
}


// header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


//=================================================//
//============== LANGUAGE SWITCHER ==============//
//=================================================//
const translations = {
    'sr-latin': {
        'nav_home': 'Početna',
        'nav_about': 'O meni',
        'nav_services': 'Usluge',
        'nav_skills': 'Veštine',
        'nav_projects': 'Projekti',
        'nav_contact': 'Kontakt',
        'hire_me': 'Kontaktirajte Me',
        'hero_greeting': 'Zdravo, Zovem se<br> Luka Đurić',
        'hero_description': 'Odličan sam u stvaranju elegantnih digitalnih iskustava i vešt sam u raznim programskim jezicima i tehnologijama.',
        'download_cv': 'Preuzmi CV',
        'stats_experience': 'Godine iskustva',
        'stats_projects': 'Završenih projekata',
        'stats_technologies': 'Savladanih tehnologija',
        'stats_clients': 'Zadovoljnih klijenata',
        'about_title': 'O meni',
        'about_p1': 'Zdravo, ja sam Luka Đurić, strastveni web developer sa preko 5 godina iskustva u izradi modernih i funkcionalnih web sajtova. Specijalizovan sam za front-end razvoj, ali imam iskustva i sa back-end tehnologijama.',
        'about_p2': 'Moji projekti uključuju e-commerce platforme, korporativne sajtove i web aplikacije za razne industrije. Uvek sam u toku sa najnovijim trendovima u web developmentu i kontinuirano unapređujem svoje veštine.',
        'about_p3': 'Verujem u stvaranje web sajtova koji nisu samo vizuelno privlačni, već i intuitivni za korišćenje i optimizovani za performanse.',
        'info_birthdate_label': '<strong>Datum Rođenja:</strong> 4 Nov 2001',
        'info_degree_label': '<strong>Diploma:</strong>',
        'info_degree_value': 'Student Mastera',
        'info_city_label': '<strong>Grad:</strong>',
        'info_city_value': 'Beograd',
        'info_freelance_label': '<strong>Freelance:</strong>',
        'info_freelance_value': 'Dostupan',
        'info_age_label': '<strong>Godine:</strong> 23',
        'info_phone_label': '<strong>Telefon:</strong> +381677411001',
        'contact_me_btn': 'Kontaktirajte me',
        'services_title': 'Moje Usluge',
        'service1_title': 'Web Development',
        'service1_desc': 'Prilagođena veb rešenja prilagođena vašim potrebama. Od responzivnog dizajna do složenih veb aplikacija.',
        'service2_title': 'UI/UX Dizajn',
        'service2_desc': 'Kreiranje intuitivnih i vizuelno privlačnih korisničkih interfejsa za poboljšano korisničko iskustvo.',
        'service3_title': 'Digitalni Marketing',
        'service3_desc': 'Korišćenje alata za analitiku kako bi se obezbedila maksimalna efikasnost.',
        'service4_title': 'E-commerce Rešenja',
        'service4_desc': 'Razvoj prilagođenih e-commerce rešenja sa integracijom platnih sistema i upravljanjem proizvodima.',
        'service5_title': 'Razvoj Aplikacija',
        'service5_desc': 'Izrada robusnih i skalabilnih mobilnih aplikacija za iOS i Android platforme. Brzo i efikasno pravljenje po želji.',
        'service6_title': 'SEO Optimizacija',
        'service6_desc': 'Unapređenje vidljivosti vašeg sajta na pretraživačima kroz strategije optimizacije sadržaja, tehničke SEO i izgradnju relevantnih povratnih linkova.',
        'read_more': 'Pročitaj Više',
        'skills_title': 'Moje Veštine',
        'work_experience_title': 'Work & Experience',
        'job1_title': 'Kompjuterista',
        'job1_details1': 'Part Time | Režija',
        'job1_desc': 'Dok sam radio na projektu „Zadruga“, bio sam odgovoran za kreiranje grafike i komentara, kao i za upravljanje tehničkim aspektima emisije kao što su osvetljenje, zvuk i video. Moje iskustvo u grafičkom dizajnu i tehnička podrška doprineli su uspešnoj realizaciji emisije i stvaranju dinamičnog vizuelnog doživljaja za gledaoce.',
        'job2_title': 'Video Editor',
        'job2_details1': 'Part Time | Kancelarija',
        'job2_desc': 'Kao iskusan video montažer, koristio sam Adobe After Effects i Premiere Pro za uređivanje i kreiranje vizuelno privlačnih video klipova za emisiju „Zadruga“. Moje veštine uključuju precizno uređivanje, dodavanje efekata, korekciju boja i zvuka i kreiranje dinamičkih vizuelnih elemenata koji doprinose celokupnom raspoloženju emisije.',
        'job3_title': 'Remote Control Operator - RCO',
        'job3_details1': 'Part Time | Režija i Reportažna kola',
        'job3_desc': 'Kao iskusan RCO operater, rukovodio sam kamerama i tehničkim sistemima tokom snimanja emisija „Zadruga“, „Elita“ i „Pinkove zvezdice“. Moja odgovornost je bila da obezbedim dinamične i zanimljive kadrove, da blagovremeno odgovorim na uputstva reditelja i da obezbedim tehničku ispravnost svih sistema kako bi snimanje proteklo bez problema.',
        'job4_title': 'Video Mikser',
        'job4_details1': 'Part Time | Režija',
        'job4_desc': 'Kao video mikser na projektima rijaliti emisija „Zadruga“ i „Elita“, bio sam zadužen za upravljanje video signalima i obezbeđivanje neometanog prenosa uživo. Moje odgovornosti uključivale su koordinaciju sa režijom, pravovremeno prebacivanje između različitih kamera i izvora, kao i održavanje visokog kvaliteta slike tokom emitovanja. Takođe sam bio odgovoran za rešavanje tehničkih problema u realnom vremenu, kako bi produkcija protekla bez zastoja.',
        'job5_title': 'Web Developer',
        'job5_details1': 'Part Time | Remote',
        'job5_desc': 'Radio sam na različitim projektima koristeći Angular, Vue.js, JavaScript, HTML, SCSS, Bootstrap i Go za full-stack development. Imam iskustvo saradnje u timovima i upravljanja kodom koristeći alate kao što su Fork, Git i Bitbucket, kao i testiranje API-ja sa Postmanom. Pored toga, koristio sam Slack, Jira i Confluence za komunikaciju i upravljanje projektima.',
        'job6_title': 'Web Developer',
        'job6_desc': 'Kao freelancer, radio sam na brojnim projektima, a tokom studija na fakultetu stekao sam iskustvo kroz realizaciju različitih projekata koristeći Javu, C, C++, C#, Python, PostgreSQL i ASP.NET. Specijalizujem se za razvoj web aplikacija, od jednostavnih sajtova do kompleksnih rešenja sa blogovima, koristeći HTML, CSS, JavaScript, PHP, Bootstrap, Ajax, jQuery i Swifter. Moje veštine uključuju rad sa bazama podataka, posebno PostgreSQL, što mi omogućava efikasno upravljanje podacima. Kombinacijom tehničkog znanja i praktičnog iskustva, sposoban sam kreirati kvalitetna softverska rešenja prilagođena različitim potrebama.',
        'tools_title_1': 'Tehnologije i',
        'tools_title_2': '<span>Alati</span>',
        'tools_subtitle': 'Kolekcija alata i tehnologija koje svakodnevno koristim u radu.',
        'my_projects_1': 'Moji',
        'my_projects_2': '<span>Projekti</span>',
        'my_projects_subtitle': 'Istražite kolekciju mojih radova iz različitih oblasti digitalne kreacije',
        'testimonials_title': 'Šta Kažu Naši Klijenti',
        'contact_leave_message': 'Ostavite poruku',
        'contact_description': '"Imate pitanja, predloge ili želite da sarađujemo? <br> Slobodno mi se javite! <br> Pošaljite mi poruku i javiću Vam se u najkraćem roku."',
        'contact_location': 'Beograd, Srbija',
        'contact_form_title': 'Kontaktirajte Me',
        'form_placeholder_name': 'Ime',
        'form_placeholder_email': 'Email',
        'form_placeholder_phone': 'Broj Telefona',
        'form_placeholder_message': 'Poruka',
        'form_button_send': 'Pošalji',
        'footer_copyright': 'Copyright © 2025 Made by Djurke23. Sva prava zadržana.',
    },
    'en': {
        'nav_home': 'Home',
        'nav_about': 'About Me',
        'nav_services': 'Services',
        'nav_skills': 'Skills',
        'nav_projects': 'Projects',
        'nav_contact': 'Contact',
        'hire_me': 'Hire Me',
        'hero_greeting': 'Hello, My name is<br> Luka Đurić',
        'hero_description': 'I excel at creating elegant digital experiences and am skilled in various programming languages and technologies.',
        'download_cv': 'Download CV',
        'stats_experience': 'Years of experience',
        'stats_projects': 'Completed projects',
        'stats_technologies': 'Technologies mastered',
        'stats_clients': 'Satisfied clients',
        'about_title': 'About Me',
        'about_p1': 'Hello, I am Luka Đurić, a passionate web developer with over 5 years of experience in creating modern and functional websites. I specialize in front-end development, but I also have experience with back-end technologies.',
        'about_p2': 'My projects include e-commerce platforms, corporate websites, and web applications for various industries. I am always up to date with the latest trends in web development and continuously improve my skills.',
        'about_p3': 'I believe in creating websites that are not only visually appealing but also intuitive to use and optimized for performance.',
        'info_birthdate_label': '<strong>Birthdate:</strong> 4 Nov 2001',
        'info_degree_label': '<strong>Degree:</strong>',
        'info_degree_value': "Master's Student",
        'info_city_label': '<strong>City:</strong>',
        'info_city_value': 'Belgrade',
        'info_freelance_label': '<strong>Freelance:</strong>',
        'info_freelance_value': 'Available',
        'info_age_label': '<strong>Age:</strong> 23',
        'info_phone_label': '<strong>Phone:</strong> +381677411001',
        'contact_me_btn': 'Contact Me',
        'services_title': 'My Services',
        'service1_title': 'Web Development',
        'service1_desc': 'Custom web solutions tailored to your needs. From responsive design to complex web applications.',
        'service2_title': 'UI/UX Design',
        'service2_desc': 'Creating intuitive and visually appealing user interfaces for an enhanced user experience.',
        'service3_title': 'Digital Marketing',
        'service3_desc': 'Using analytics tools to ensure maximum efficiency.',
        'service4_title': 'E-commerce Solutions',
        'service4_desc': 'Development of custom e-commerce solutions with payment gateway integration and product management.',
        'service5_title': 'Application Development',
        'service5_desc': 'Building robust and scalable mobile applications for iOS and Android platforms. Fast and efficient custom development.',
        'service6_title': 'SEO Optimization',
        'service6_desc': 'Improving your site\'s visibility on search engines through content optimization strategies, technical SEO, and building relevant backlinks.',
        'read_more': 'Read More',
        'skills_title': 'My Skills',
        'work_experience_title': 'Work & Experience',
        'job1_title': 'Computer Operator',
        'job1_details1': 'Part Time | Control Room',
        'job1_desc': 'While working on the "Zadruga" project, I was responsible for creating graphics and comments, as well as managing the technical aspects of the show such as lighting, sound, and video. My experience in graphic design and technical support contributed to the successful execution of the show and the creation of a dynamic visual experience for the viewers.',
        'job2_title': 'Video Editor',
        'job2_details1': 'Part Time | Office',
        'job2_desc': 'As an experienced video editor, I used Adobe After Effects and Premiere Pro to edit and create visually appealing video clips for the show "Zadruga". My skills include precise editing, adding effects, color and sound correction, and creating dynamic visual elements that contribute to the overall mood of the show.',
        'job3_title': 'Remote Control Operator - RCO',
        'job3_details1': 'Part Time | Control Room & Mobile Unit',
        'job3_desc': 'As an experienced RCO operator, I handled cameras and technical systems during the filming of "Zadruga", "Elita", and "Pinkove zvezdice". My responsibility was to provide dynamic and interesting shots, respond promptly to the director\'s instructions, and ensure the technical integrity of all systems for a smooth filming process.',
        'job4_title': 'Video Mixer',
        'job4_details1': 'Part Time | Control Room',
        'job4_desc': 'As a video mixer on the reality shows "Zadruga" and "Elita", I was in charge of managing video signals and ensuring a seamless live broadcast. My responsibilities included coordinating with the direction, timely switching between different cameras and sources, and maintaining high image quality during the broadcast. I was also responsible for resolving technical issues in real-time to ensure the production ran without interruption.',
        'job5_title': 'Web Developer',
        'job5_details1': 'Part Time | Remote',
        'job5_desc': 'I worked on various projects using Angular, Vue.js, JavaScript, HTML, SCSS, Bootstrap, and Go for full-stack development. I have experience collaborating in teams and managing code using tools like Fork, Git, and Bitbucket, as well as testing APIs with Postman. Additionally, I used Slack, Jira, and Confluence for communication and project management.',
        'job6_title': 'Web Developer',
        'job6_desc': 'As a freelancer, I have worked on numerous projects, and during my university studies, I gained experience through the implementation of various projects using Java, C, C++, C#, Python, PostgreSQL, and ASP.NET. I specialize in web application development, from simple sites to complex solutions with blogs, using HTML, CSS, JavaScript, PHP, Bootstrap, Ajax, jQuery, and Swifter. My skills include working with databases, especially PostgreSQL, which allows me to manage data efficiently. By combining technical knowledge and practical experience, I am capable of creating quality software solutions tailored to various needs.',
        'tools_title_1': 'Technologies and',
        'tools_title_2': '<span>Tools</span>',
        'tools_subtitle': 'A collection of tools and technologies I use in my daily work.',
        'my_projects_1': 'My',
        'my_projects_2': '<span>Projects</span>',
        'my_projects_subtitle': 'Explore a collection of my works from various fields of digital creation',
        'testimonials_title': 'What Our Clients Say',
        'contact_leave_message': 'Leave a message',
        'contact_description': '"Have questions, suggestions, or want to collaborate? <br> Feel free to contact me! <br> Send me a message and I will get back to you as soon as possible."',
        'contact_location': 'Belgrade, Serbia',
        'contact_form_title': 'Contact Me',
        'form_placeholder_name': 'Name',
        'form_placeholder_email': 'Email',
        'form_placeholder_phone': 'Phone Number',
        'form_placeholder_message': 'Message',
        'form_button_send': 'Send',
        'footer_copyright': 'Copyright © 2025 Made by Djurke23. All rights reserved.',
    }
};

const languageOptions = {
    'sr-latin': { text: 'Srpski', flag: 'rs' },
    'en': { text: 'English', flag: 'gb' }
};

const languageToggle = document.getElementById('languageToggle');
const languageMenu = document.getElementById('language-menu');
const dropdown = document.querySelector('.dropdown');

if (languageToggle && languageMenu && dropdown) {
    languageToggle.addEventListener('click', () => {
        dropdown.classList.toggle('show');
    });

    // Delegacija događaja za dinamički kreirane elemente
    languageMenu.addEventListener('click', (e) => {
        e.preventDefault();
        const langOption = e.target.closest('.lang-option');
        if (langOption) {
            const lang = langOption.getAttribute('data-lang');
            setLanguage(lang);
            dropdown.classList.remove('show');
        }
    });

    window.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}

function setLanguage(lang) {
    if (!translations[lang] || !languageMenu) {
        return;
    }
    localStorage.setItem('language', lang);

    document.querySelectorAll('[data-translate-key]').forEach(el => {
        const key = el.dataset.translateKey;
        const translation = translations[lang][key];
        if (translation) {
            if (el.placeholder) {
                el.placeholder = translation;
            } else {
                el.innerHTML = translation;
            }
        }
    });

    const currentLangOption = languageOptions[lang];
    if (languageToggle && currentLangOption) {
        languageToggle.innerHTML = `<span class="flag-icon flag-icon-${currentLangOption.flag}"></span> ${currentLangOption.text}`;
    }

    languageMenu.innerHTML = '';
    for (const key in languageOptions) {
        if (key !== lang) {
            const option = languageOptions[key];
            const a = document.createElement('a');
            a.href = '#';
            a.classList.add('lang-option');
            a.setAttribute('data-lang', key);
            a.innerHTML = `<span class="flag-icon flag-icon-${option.flag}"></span> ${option.text}`;
            languageMenu.appendChild(a);
        }
    }
}








document.addEventListener('DOMContentLoaded', function() {
    // Animation for service cards
    const cards = document.querySelectorAll('.service-card-ms');
    if (cards.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach((card, index) => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out`;
            card.style.transitionDelay = `${index * 100}ms`;
            observer.observe(card);
        });
    }

    // Modal functionality
    const readMoreButtons = document.querySelectorAll('.btn-read-more-ms');
    const modalOverlay = document.getElementById('service-modal-ms');
    const modalCloseButton = modalOverlay.querySelector('.modal-close-ms');
    const modalTitle = document.getElementById('modal-title-ms');
    const modalDescription = document.getElementById('modal-description-ms');
    const modalPoints = document.getElementById('modal-points-ms');
    const body = document.body;

    function openModal(title, description, points) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        modalPoints.innerHTML = ''; 

        points.forEach(point => {
            if (point.trim() !== '') {
                const li = document.createElement('li');
                li.textContent = point;
                modalPoints.appendChild(li);
            }
        });

        modalOverlay.classList.add('active');
        body.classList.add('body-no-scroll-ms');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        body.classList.remove('body-no-scroll-ms');
    }

    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const title = button.dataset.title;
            const description = button.dataset.description;
            const points = button.dataset.points.split(','); 
            
            openModal(title, description, points);
        });
    });

    modalCloseButton.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});






document.addEventListener("DOMContentLoaded", () => {
    const testimonialsData = [
        { name: "Mirjana Ivanović", handle: "", text: " Od prve skice do finalnog sajta, sve je teklo glatko. Ne samo da je rezultat estetski predivan, već je i sajt funkcionalan i brz. Dobili smo mnogo više nego što smo očekivali i naša onlajn prodaja je značajno porasla.", avatar: "https://i.pravatar.cc/50?u=1" },
        { name: "Milovan Petrović", handle: "", text: "Tražili smo jedinstven i moderan sajt koji će privući našu ciljnu publiku. Razumeo je našu viziju u potpunosti i pretvorio je u stvarnost. Komunikacija je bila odlična, a projekat je završen u roku. Definitivno ga preporučujem!", avatar: "https://i.pravatar.cc/50?u=2" },
        { name: "Nevena Simonović", handle: "", text: "Naš stari sajt je bio zastareo i spor. Luka je uspeo da mu udahne novi život. Ne samo da izgleda fantastično, već je i mnogo jednostavniji za korišćenje. Klijenti nam stalno govore kako im se sviđa novi izgled..", avatar: "https://i.pravatar.cc/50?u=3" },
        { name: "Jelena Jovanović", handle: "", text: "Pristup redizajnu našeg sajta bio je izuzetno profesionalan. Pažljivo je analizirao naše potrebe, predložio poboljšanja i implementirao ih sa velikom preciznošću. Naš brend sada deluje mnogo ozbiljnije i modernije.", avatar: "https://i.pravatar.cc/50?u=4" },
        { name: "Petar Marković", handle: "", text: "Luka je je razvio rešenje koje je intuitivno, stabilno i u potpunosti funkcioniše. Ovo nam je značajno olakšalo rad i uštedelo vreme.", avatar: "https://i.pravatar.cc/50?u=5" },
        { name: "Kristina Pindović", handle: "", text: "Imali smo ideju za aplikaciju, ali nismo znali kako da je realizujemo. Luka nas je vodio kroz ceo proces, od planiranja do razvoja, i rezultat je impresivan. Njegovo tehničko znanje i posvećenost projektu su na visokom nivou..", avatar: "https://i.pravatar.cc/50?u=6" }
        
    ];

    const createTestimonialCard = (testimonial) => {
        const card = document.createElement("div");
        card.className = "testimonial-card-reviews";
        card.innerHTML = `
            <div class="testimonial-header-reviews">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="avatar-reviews">
                <div>
                    <p class="author-name-reviews">${testimonial.name}</p>
                    <p class="author-handle-reviews">${testimonial.handle}</p>
                </div>
            </div>
            <p class="testimonial-text-reviews">${testimonial.text}</p>
        `;
        return card;
    };

    const scroller = document.querySelector(".testimonials-scroller-reviews");
    const columns = Array.from(document.querySelectorAll(".testimonial-column-reviews"));

    // Ne pokreći animaciju na mobilnim uređajima ili ako korisnik preferira smanjeno kretanje
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isMobile && !prefersReducedMotion) {
        // 1. Inicijalno popunjavanje kolona
        const initialCards = [];
        testimonialsData.forEach(data => {
            const card = createTestimonialCard(data);
            initialCards.push(card);
        });
        
        // Raspodeli originalne kartice po kolonama
        initialCards.forEach((card, index) => {
            columns[index % columns.length].appendChild(card);
        });

        // 2. Dinamičko dupliranje dok se ne popuni visina
        columns.forEach(column => {
            const originalContent = Array.from(column.children); // Sačuvaj originalne kartice u koloni
            
            // Dupliraj sadržaj dok god visina kolone nije bar 2x veća od visine vidljivog dela
            // Ovo osigurava da nikada nema praznog prostora
            while (column.scrollHeight < scroller.clientHeight * 2) {
                originalContent.forEach(card => {
                    column.appendChild(card.cloneNode(true));
                });
            }
        });
    } else {
        // Za mobilne uređaje, samo popuni prvu kolonu, bez dupliranja i animacije
        testimonialsData.forEach(data => {
            columns[0].appendChild(createTestimonialCard(data));
        });
    }
});








// Čekamo da se ceo prozor (uključujući slike, stilove, itd.) učita
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const pageContent = document.getElementById('page-content');

    // PROMENJENO: Čekamo da se animacija završi (5000ms = 5s)
    setTimeout(() => {
        // Započinjemo tranziciju nestajanja
        loadingScreen.style.opacity = '0';

        // Nakon tranzicije, u potpunosti sakrivamo element
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Prikazujemo glavni sadržaj
            pageContent.classList.remove('hidden');
        }, 500); // 500ms se poklapa sa `transition` duuracijom u CSS-u

    }, 5000); // Čekamo 5 sekundi pre nego što sve nestane
});