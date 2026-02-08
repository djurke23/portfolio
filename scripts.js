function animateValue(id, start, end, duration, callback) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);
    let timer = setInterval(function () {
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
        setTimeout(function () {
            typeWriter(text, i + 1, fnCallback)
        }, 100);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}


function startTextAnimation(i) {
    const dataText = ["Luka Đurić", ""]; // Definisano unutar funkcije radi preglednosti
    if (typeof dataText[i] == 'undefined') {
        setTimeout(function () {
            startTextAnimation(0);
        }, 20000);
    }
    if (i < dataText.length) {
        typeWriter(dataText[i], 0, function () {
            startTextAnimation(i + 1);
        });
    }
}


document.addEventListener('DOMContentLoaded', function () {
    //=================================================//
    //============== LANGUAGE INITIALIZATION ==========//
    //=================================================//
    // Prvo inicijalizujemo jezik kako bi se tekst ispravno prikazao
    const savedLang = localStorage.getItem('language') || 'sr-cyrillic';
    setLanguage(savedLang);


    //=================================================//
    //============== LOADING & ANIMATIONS =============//
    //=================================================//
    setTimeout(function () {


        animateValue("years", 0, 5, 2000, function () {
            animateValue("projects", 0, 30, 2000, function () {
                animateValue("technologies", 0, 12, 2000, function () {
                    animateValue("commits", 0, 10, 2000, function () {
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

    // Close menu when a link is clicked
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');

            navLinks.forEach((link) => {
                link.style.animation = '';
            });
        });
    });
}

navSlide();


// prozorcic
function openModal(id) {
    var modal = document.getElementById(id + '-modal');
    modal.style.display = 'block';
    setTimeout(function () {
        modal.classList.add('show');
    }, 10);
}

function closeModal(id) {
    var modal = document.getElementById(id + '-modal');
    modal.classList.remove('show');
    setTimeout(function () {
        modal.style.display = 'none';
    }, 300);
}

window.onclick = function (event) {
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
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Funkcija za ažuriranje ikonice
const updateThemeIcon = () => {
    if (themeIcon) {
        if (body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
};

// Funkcija koja primenjuje temu - uvek dark mode po defaultu
const applyTheme = () => {
    // Uvek ukloni light-mode da bi dark bio default
    body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
    updateThemeIcon();
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
    updateThemeIcon();
};

// Postavi temu odmah pri učitavanju stranice
applyTheme();

// Dodaj event listener na dugme
if (modeToggle) {
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
window.addEventListener('scroll', function () {
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
        'about_intro': 'Kratko o mom iskustvu, pristupu i načinu rada.',
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
        'info_age_label': '<strong>Godine:</strong> 24',
        'info_phone_label': '<strong>Telefon:</strong> +381677411001',
        'contact_me_btn': 'Kontaktirajte me',
        'services_title': 'Moje Usluge',
        'services_intro': 'Usluge koje pomažu da ideja postane kvalitetan digitalni proizvod.',
        'service1_title': 'Web Development',
        'service1_desc': 'Izrada prilagođenih veb rešenja po vašoj meri. Od responzivnog dizajna do kompleksnih veb aplikacija.',
        'service2_title': 'UI/UX Dizajn',
        'service2_desc': 'Kreiranje intuitivnih i vizuelno privlačnih korisničkih interfejsa za poboljšano korisničko iskustvo.',
        'service3_title': 'Digitalni Marketing',
        'service3_desc': 'Korišćenje analitičkih alata kako bi se osigurala maksimalna efikasnost vaših marketinških kampanja.',
        'service4_title': 'E-commerce Rešenja',
        'service4_desc': 'Razvoj prilagođenih e-commerce rešenja sa integracijom plaćanja i upravljanjem proizvodima.',
        'service5_title': 'Razvoj Aplikacija',
        'service5_desc': 'Izrada robusnih i skalabilnih mobilnih aplikacija za iOS i Android platforme. Brz i efikasan razvoj.',
        'service6_title': 'SEO Optimizacija',
        'service6_desc': 'Poboljšanje vidljivosti vašeg sajta na pretraživačima kroz optimizaciju sadržaja i tehnički SEO.',
        'read_more': 'Saznaj Više',
        'skills_title': 'Moje Veštine',
        'skills_intro': 'Pregled tehnologija i alata podeljen po oblastima rada.',
        'work_experience_title': 'Posao i Iskustva',
        'work_intro': 'Najvažnije pozicije i projekti na kojima sam gradio iskustvo.',
        'job_type_freelance': 'Freelance',
        'job_type_remote': 'Remote',
        'job_type_parttime': 'Part Time',
        'exp1_title': 'Web Developer',
        'exp1_company': 'Djurke23.',
        'exp1_date': '2020 - 2026',
        'exp1_desc': 'Kao freelancer, radio sam na brojnim projektima koristeći Javu, C, C++, C#, Python, PostgreSQL i ASP.NET. Specijalizovan sam za razvoj veb aplikacija.',
        'exp2_title': 'Web Developer',
        'exp2_company': 'Digital Media Sistem',
        'exp2_date': '2024 - 2025',
        'exp2_desc': 'Radio sam na različitim projektima koristeći Angular, Vue.js, JavaScript, HTML, SCSS i Go, sa iskustvom u timskoj saradnji i korišćenju alata kao što su Git i Jira.',
        'exp3_title': 'Video Mixer',
        'exp3_company': 'Pink Media Group',
        'exp3_date': '2023 - 2024',
        'exp3_desc': 'Na reality show-ovima "Zadruga" i "Elita", bio sam zadužen za upravljanje video signalima i osiguravanje besprekornog live prenosa.',
        'exp4_title': 'Remote Control Operator - RCO',
        'exp4_company': 'Pink Media Group',
        'exp4_date': '2022 - 2023',
        'exp4_desc': 'Upravljao sam kamerama i tehničkim sistemima tokom snimanja emisija "Zadruga", "Elita" i "Pinkove zvezdice", pružajući dinamične kadrove.',
        'exp5_title': 'Video Editor',
        'exp5_company': 'Pink Media Group',
        'exp5_date': '2021 - 2022',
        'exp5_desc': 'Koristio sam Adobe After Effects i Premiere Pro za editovanje i kreiranje vizuelno privlačnih video klipova za emisiju "Zadruga".',
        'exp6_title': 'Computer Operator',
        'exp6_company': 'Pink Media Group',
        'exp6_date': '2020 - 2021',
        'exp6_desc': 'Bio sam odgovoran za kreiranje grafike, komentara i upravljanje tehničkim aspektima emisije "Zadruga" (osvetljenje, zvuk, video).',
        'tools_title_1': 'Tehnologije i',
        'tools_title_2': '<span>Tools</span>',
        'tools_intro': 'Kratak pregled alata koje koristim u svakodnevnom radu.',
        'tools_subtitle': 'A collection of tools that I use in my daily work.',
        'my_projects_1': 'Moji',
        'my_projects_2': '<span>Projekti</span>',
        'projects_intro': 'Izabrani projekti koji prikazuju kvalitet dizajna i implementacije.',
        'my_projects_subtitle': 'Istražite kolekciju mojih radova iz različitih oblasti digitalne kreacije',
        'filter_all': 'Sve',
        'filter_websites': 'Web Sajtovi',
        'filter_design': 'Dizajn',
        'category_website': 'Web Sajt',
        'category_design': 'Dizajn',
        'project1_title': 'Lični Portfolio',
        'project1_desc': 'Moderni portfolio sajt sa interaktivnim animacijama, network pozadinom i potpuno responzivnim dizajnom.',
        'project2_title': 'BGDCARS Detailing Sajt',
        'project2_desc': 'Profesionalan sajt firme za detailing automobila.',
        'project3_title': 'Inno Build Group Sajt',
        'project3_desc': 'Profesionalan sajt firme za adaptaciju stanova.',
        'project4_title': 'Finance Tracker',
        'project4_desc': 'Kompletan vizuelni identitet startup-a uključujući logo, tipografiju i brand guidelines.',
        'project5_title': 'Habit Tracker',
        'project5_desc': 'Moderni UI dizajn za fitness aplikaciju sa dark temom i interaktivnim prototipom.',
        'btn_live_demo': 'Live Demo',
        'btn_github': 'GitHub',
        'testimonials_title': 'Šta Kažu Klijenti',
        'testimonials_intro': 'Iskustva koja pokreću rast i inovacije.',
        'testimonials_subtitle': 'Iskustva koja pokreću rast i inovacije.',
        'testimonial1_name': 'Mirjana Ivanović',
        'testimonial1_text': 'Od prve skice do finalnog sajta, sve je teklo glatko. Ne samo da je rezultat estetski predivan, već je i sajt funkcionalan i brz. Dobili smo mnogo više nego što smo očekivali i naša onlajn prodaja je značajno porasla.',
        'testimonial2_name': 'Milovan Petrović',
        'testimonial2_text': 'Tražili smo jedinstven i moderan sajt koji će privući našu ciljnu publiku. Razumeo je našu viziju u potpunosti i pretvorio je u stvarnost. Komunikacija je bila odlična, a projekat je završen u roku. Definitivno ga preporučujem!',
        'testimonial3_name': 'Nevena Simonović',
        'testimonial3_text': 'Naš stari sajt je bio zastareo i spor. Luka je uspeo da mu udahne novi život. Ne samo da izgleda fantastično, već je i mnogo jednostavniji za korišćenje. Klijenti nam stalno govore kako im se sviđa novi izgled.',
        'testimonial4_name': 'Jelena Jovanović',
        'testimonial4_text': 'Pristup redizajnu našeg sajta bio je izuzetno profesionalan. Pažljivo je analizirao naše potrebe, predložio poboljšanja i implementirao ih sa velikom preciznošću. Naš brend sada deluje mnogo ozbiljnije i modernije.',
        'testimonial5_name': 'Petar Marković',
        'testimonial5_text': 'Luka je razvio rešenje koje je intuitivno, stabilno i u potpunosti funkcioniše. Ovo nam je značajno olakšalo rad i uštedelo vreme.',
        'testimonial6_name': 'Kristina Pindović',
        'testimonial6_text': 'Imali smo ideju za aplikaciju, ali nismo znali kako da je realizujemo. Luka nas je vodio kroz ceo proces, od planiranja do razvoja, i rezultat je impresivan. Njegovo tehničko znanje i posvećenost projektu su na visokom nivou.',
        'contact_title': 'Kontaktirajte Me',
        'contact_intro': 'Pošaljite poruku i dobićete odgovor u najkraćem roku.',
        'contact_leave_message': 'Ostavite poruku',
        'contact_description': '"Imate pitanja, predloge ili želite da sarađujemo? <br> Slobodno mi se javite! <br> Pošaljite mi poruku i javiću Vam se u najkraćem roku."',
        'contact_location': 'Beograd, Srbija',
        'contact_form_title': 'Kontaktirajte Me',
        'form_placeholder_name': 'Ime',
        'form_placeholder_email': 'Email',
        'form_placeholder_phone': 'Broj Telefona',
        'form_placeholder_message': 'Poruka',
        'form_button_send': 'Pošalji',
        'footer_home': 'Početna',
        'footer_about': 'O Meni',
        'footer_services': 'Usluge',
        'footer_skills': 'Veštine',
        'footer_projects': 'Projekti',
        'footer_contact': 'Kontakt',
        'footer_copyright': 'Copyright © 2026 Made by Djurke23. Sva prava zadržana.',
        // Modal translations
        'modal1_title': 'Web Development',
        'modal1_desc': 'Web Development obuhvata kreiranje i održavanje veb stranica i aplikacija. Ova usluga uključuje:',
        'modal1_point1': 'Responzivni Veb Dizajn',
        'modal1_point2': 'Front-end Development',
        'modal1_point3': 'Back-end Development',
        'modal1_point4': 'E-commerce Rešenja',
        'modal2_title': 'UI/UX Dizajn',
        'modal2_desc': 'Naš proces dizajna se fokusira na korisnika kako bi se osigurala jednostavnost korišćenja i estetska privlačnost. Usluge uključuju:',
        'modal2_point1': 'Istraživanje korisnika',
        'modal2_point2': 'Wireframing i Prototipovi',
        'modal2_point3': 'Dizajn interfejsa',
        'modal2_point4': 'Testiranje upotrebljivosti',
        'modal3_title': 'Digitalni Marketing',
        'modal3_desc': 'Povećajte svoju online prisutnost i dosegnete ciljnu publiku kroz naše strateške marketinške usluge:',
        'modal3_point1': 'Upravljanje društvenim mrežama',
        'modal3_point2': 'Plaćeno oglašavanje (PPC)',
        'modal3_point3': 'Content Marketing',
        'modal3_point4': 'Email Marketing',
        'modal4_title': 'E-commerce Rešenja',
        'modal4_desc': 'Nudimo kompletna rešenja za online prodavnice, od dizajna do implementacije i održavanja:',
        'modal4_point1': 'Dizajn online prodavnice',
        'modal4_point2': 'Integracija platnih sistema',
        'modal4_point3': 'Upravljanje zalihama',
        'modal4_point4': 'Optimizacija konverzija',
        'modal5_title': 'Razvoj Aplikacija',
        'modal5_desc': 'Transformišite svoje ideje u funkcionalne mobilne aplikacije. Naš proces uključuje:',
        'modal5_point1': 'Razvoj za iOS (Swift)',
        'modal5_point2': 'Razvoj za Android (Kotlin)',
        'modal5_point3': 'Hibridne aplikacije (React Native)',
        'modal5_point4': 'Održavanje i podrška',
        'modal6_title': 'SEO Optimizacija',
        'modal6_desc': 'Poboljšajte rangiranje na pretraživačima i privucite više organskog saobraćaja uz naše SEO strategije:',
        'modal6_point1': 'Analiza ključnih reči',
        'modal6_point2': 'On-Page SEO',
        'modal6_point3': 'Tehnički SEO',
        'modal6_point4': 'Link Building',
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
        'about_intro': 'A short overview of my background, approach, and work style.',
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
        'info_age_label': '<strong>Age:</strong> 24',
        'info_phone_label': '<strong>Phone:</strong> +381677411001',
        'contact_me_btn': 'Contact Me',
        'services_title': 'My Services',
        'services_intro': 'Services that turn ideas into polished digital products.',
        'service1_title': 'Web Development',
        'service1_desc': 'Custom web solutions tailored to your needs. From responsive design to complex web applications.',
        'service2_title': 'UI/UX Design',
        'service2_desc': 'Creating intuitive and visually appealing user interfaces for an enhanced user experience.',
        'service3_title': 'Digital Marketing',
        'service3_desc': 'Using analytics tools to ensure maximum efficiency of your marketing campaigns.',
        'service4_title': 'E-commerce Solutions',
        'service4_desc': 'Development of custom e-commerce solutions with payment integration and product management.',
        'service5_title': 'App Development',
        'service5_desc': 'Building robust and scalable mobile applications for iOS and Android platforms. Fast and efficient development.',
        'service6_title': 'SEO Optimization',
        'service6_desc': 'Improving your site\'s visibility on search engines through content optimization and technical SEO.',
        'read_more': 'Learn More',
        'skills_title': 'My Skills',
        'skills_intro': 'A clean overview of technologies and tools grouped by area.',
        'work_experience_title': 'Work & Experience',
        'work_intro': 'Key roles and projects that shaped my professional journey.',
        'job_type_freelance': 'Freelance',
        'job_type_remote': 'Remote',
        'job_type_parttime': 'Part Time',
        'exp1_title': 'Web Developer',
        'exp1_company': 'Djurke23.',
        'exp1_date': '2020 - 2026',
        'exp1_desc': 'As a freelancer, I worked on numerous projects using Java, C, C++, C#, Python, PostgreSQL and ASP.NET. I specialize in web application development.',
        'exp2_title': 'Web Developer',
        'exp2_company': 'Digital Media Sistem',
        'exp2_date': '2024 - 2025',
        'exp2_desc': 'I worked on various projects using Angular, Vue.js, JavaScript, HTML, SCSS and Go, with experience in team collaboration and using tools like Git and Jira.',
        'exp3_title': 'Video Mixer',
        'exp3_company': 'Pink Media Group',
        'exp3_date': '2023 - 2024',
        'exp3_desc': 'On reality shows "Zadruga" and "Elita", I was responsible for managing video signals and ensuring seamless live broadcasts.',
        'exp4_title': 'Remote Control Operator - RCO',
        'exp4_company': 'Pink Media Group',
        'exp4_date': '2022 - 2023',
        'exp4_desc': 'I managed cameras and technical systems during the filming of "Zadruga", "Elita" and "Pinkove zvezdice" shows, providing dynamic shots.',
        'exp5_title': 'Video Editor',
        'exp5_company': 'Pink Media Group',
        'exp5_date': '2021 - 2022',
        'exp5_desc': 'I used Adobe After Effects and Premiere Pro to edit and create visually appealing video clips for the "Zadruga" show.',
        'exp6_title': 'Computer Operator',
        'exp6_company': 'Pink Media Group',
        'exp6_date': '2020 - 2021',
        'exp6_desc': 'I was responsible for creating graphics, comments and managing technical aspects of the "Zadruga" show (lighting, sound, video).',
        'tools_title_1': 'Technologies and',
        'tools_title_2': '<span>Tools</span>',
        'tools_intro': 'A quick overview of the tools I use in everyday workflow.',
        'tools_subtitle': 'A collection of tools that I use in my daily work.',
        'my_projects_1': 'My',
        'my_projects_2': '<span>Projects</span>',
        'projects_intro': 'Selected work that highlights design quality and execution.',
        'my_projects_subtitle': 'Explore a collection of my works from various fields of digital creation',
        'filter_all': 'All',
        'filter_websites': 'Websites',
        'filter_design': 'Design',
        'category_website': 'Website',
        'category_design': 'Design',
        'project1_title': 'Personal Portfolio',
        'project1_desc': 'Modern portfolio website with interactive animations, network background and fully responsive design.',
        'project2_title': 'BGDCARS Detailing Website',
        'project2_desc': 'Professional website for a car detailing company.',
        'project3_title': 'Inno Build Group Website',
        'project3_desc': 'Professional website for an apartment renovation company.',
        'project4_title': 'Finance Tracker',
        'project4_desc': 'Complete visual identity for a startup including logo, typography and brand guidelines.',
        'project5_title': 'Habit Tracker',
        'project5_desc': 'Modern UI design for a fitness app with dark theme and interactive prototype.',
        'btn_live_demo': 'Live Demo',
        'btn_github': 'GitHub',
        'testimonials_title': 'What Clients Say',
        'testimonials_intro': 'Experiences that drive growth and innovation.',
        'testimonials_subtitle': 'Experiences that drive growth and innovation.',
        'testimonial1_name': 'Mirjana Ivanović',
        'testimonial1_text': 'From the first sketch to the final website, everything went smoothly. Not only is the result aesthetically beautiful, but the website is also functional and fast. We got much more than we expected and our online sales have significantly increased.',
        'testimonial2_name': 'Milovan Petrović',
        'testimonial2_text': 'We were looking for a unique and modern website that would attract our target audience. He understood our vision completely and turned it into reality. Communication was excellent and the project was completed on time. I definitely recommend him!',
        'testimonial3_name': 'Nevena Simonović',
        'testimonial3_text': 'Our old website was outdated and slow. Luka managed to breathe new life into it. Not only does it look fantastic, but it\'s also much easier to use. Clients constantly tell us how much they like the new look.',
        'testimonial4_name': 'Jelena Jovanović',
        'testimonial4_text': 'The approach to redesigning our website was extremely professional. He carefully analyzed our needs, proposed improvements and implemented them with great precision. Our brand now looks much more serious and modern.',
        'testimonial5_name': 'Petar Marković',
        'testimonial5_text': 'Luka developed a solution that is intuitive, stable and fully functional. This has significantly made our work easier and saved us time.',
        'testimonial6_name': 'Kristina Pindović',
        'testimonial6_text': 'We had an idea for an app, but we didn\'t know how to realize it. Luka guided us through the entire process, from planning to development, and the result is impressive. His technical knowledge and dedication to the project are at a high level.',
        'contact_title': 'Contact Me',
        'contact_intro': 'Send a message and I will get back to you shortly.',
        'contact_leave_message': 'Leave a message',
        'contact_description': '"Have questions, suggestions, or want to collaborate? <br> Feel free to contact me! <br> Send me a message and I will get back to you as soon as possible."',
        'contact_location': 'Belgrade, Serbia',
        'contact_form_title': 'Contact Me',
        'form_placeholder_name': 'Name',
        'form_placeholder_email': 'Email',
        'form_placeholder_phone': 'Phone Number',
        'form_placeholder_message': 'Message',
        'form_button_send': 'Send',
        'footer_home': 'Home',
        'footer_about': 'About Me',
        'footer_services': 'Services',
        'footer_skills': 'Skills',
        'footer_projects': 'Projects',
        'footer_contact': 'Contact',
        'footer_copyright': 'Copyright © 2026 Made by Djurke23. All rights reserved.',
        // Modal translations
        'modal1_title': 'Web Development',
        'modal1_desc': 'Web Development encompasses creating and maintaining websites and applications. This service includes:',
        'modal1_point1': 'Responsive Web Design',
        'modal1_point2': 'Front-end Development',
        'modal1_point3': 'Back-end Development',
        'modal1_point4': 'E-commerce Solutions',
        'modal2_title': 'UI/UX Design',
        'modal2_desc': 'Our design process focuses on the user to ensure ease of use and aesthetic appeal. Services include:',
        'modal2_point1': 'User Research',
        'modal2_point2': 'Wireframing & Prototypes',
        'modal2_point3': 'Interface Design',
        'modal2_point4': 'Usability Testing',
        'modal3_title': 'Digital Marketing',
        'modal3_desc': 'Increase your online presence and reach your target audience through our strategic marketing services:',
        'modal3_point1': 'Social Media Management',
        'modal3_point2': 'Paid Advertising (PPC)',
        'modal3_point3': 'Content Marketing',
        'modal3_point4': 'Email Marketing',
        'modal4_title': 'E-commerce Solutions',
        'modal4_desc': 'We offer complete solutions for online stores, from design to implementation and maintenance:',
        'modal4_point1': 'Online Store Design',
        'modal4_point2': 'Payment System Integration',
        'modal4_point3': 'Inventory Management',
        'modal4_point4': 'Conversion Optimization',
        'modal5_title': 'App Development',
        'modal5_desc': 'Transform your ideas into functional mobile applications. Our process includes:',
        'modal5_point1': 'iOS Development (Swift)',
        'modal5_point2': 'Android Development (Kotlin)',
        'modal5_point3': 'Hybrid Apps (React Native)',
        'modal5_point4': 'Maintenance & Support',
        'modal6_title': 'SEO Optimization',
        'modal6_desc': 'Improve search engine rankings and attract more organic traffic with our SEO strategies:',
        'modal6_point1': 'Keyword Analysis',
        'modal6_point2': 'On-Page SEO',
        'modal6_point3': 'Technical SEO',
        'modal6_point4': 'Link Building',
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

    window.addEventListener('click', function (e) {
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
        languageToggle.innerHTML = `<span class="flag-icon flag-icon-${currentLangOption.flag}"></span><span class="lang-text">${currentLangOption.text}</span><i class="fas fa-chevron-down arrow-icon"></i>`;
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








document.addEventListener('DOMContentLoaded', function () {
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

    // Helper function to get translation
    const getModalTranslation = (key) => {
        const lang = localStorage.getItem('language') || 'sr-latin';
        return translations[lang][key] || key;
    };

    function openModal(modalIndex) {
        const title = getModalTranslation(`modal${modalIndex}_title`);
        const description = getModalTranslation(`modal${modalIndex}_desc`);
        const points = [
            getModalTranslation(`modal${modalIndex}_point1`),
            getModalTranslation(`modal${modalIndex}_point2`),
            getModalTranslation(`modal${modalIndex}_point3`),
            getModalTranslation(`modal${modalIndex}_point4`)
        ];

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
            const modalIndex = button.dataset.modal;
            openModal(modalIndex);
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
    // Testimonials data with translation keys
    const testimonialsData = [
        { nameKey: "testimonial1_name", textKey: "testimonial1_text", avatar: "https://i.pravatar.cc/50?u=1" },
        { nameKey: "testimonial2_name", textKey: "testimonial2_text", avatar: "https://i.pravatar.cc/50?u=2" },
        { nameKey: "testimonial3_name", textKey: "testimonial3_text", avatar: "https://i.pravatar.cc/50?u=3" },
        { nameKey: "testimonial4_name", textKey: "testimonial4_text", avatar: "https://i.pravatar.cc/50?u=4" },
        { nameKey: "testimonial5_name", textKey: "testimonial5_text", avatar: "https://i.pravatar.cc/50?u=5" },
        { nameKey: "testimonial6_name", textKey: "testimonial6_text", avatar: "https://i.pravatar.cc/50?u=6" }
    ];

    // Helper function to get translation
    const getTranslation = (key) => {
        const lang = localStorage.getItem('language') || 'sr-latin';
        return translations[lang][key] || key;
    };

    const createTestimonialCard = (testimonial) => {
        const card = document.createElement("div");
        card.className = "testimonial-card-reviews";
        card.innerHTML = `
            <div class="testimonial-header-reviews">
                <img src="${testimonial.avatar}" alt="${getTranslation(testimonial.nameKey)}" class="avatar-reviews">
                <div>
                    <p class="author-name-reviews" data-translate-key="${testimonial.nameKey}">${getTranslation(testimonial.nameKey)}</p>
                    <p class="author-handle-reviews"></p>
                </div>
            </div>
            <p class="testimonial-text-reviews" data-translate-key="${testimonial.textKey}">${getTranslation(testimonial.textKey)}</p>
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

        // Klik na recenziju pauzira/odpauzira animaciju kolona.
        scroller.addEventListener("click", (event) => {
            const clickedCard = event.target.closest(".testimonial-card-reviews");
            if (!clickedCard) return;
            scroller.classList.toggle("is-paused");
        });
    } else {
        // Za mobilne uređaje, samo popuni prvu kolonu, bez dupliranja i animacije
        testimonialsData.forEach(data => {
            columns[0].appendChild(createTestimonialCard(data));
        });
    }
});








// Čekamo da se ceo prozor (uključujući slike, stilove, itd.) učita
window.addEventListener('load', function () {
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
