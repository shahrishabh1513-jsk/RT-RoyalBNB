/* ============================================
   RT RoyalBNB - Complete JavaScript
   ============================================ */

let currentPage = 1;
const itemsPerPage = 6;
let activeFilters = { types: [], destinations: [] };
let totalProperties = 0;

// Royal Properties Database with Room Options
const royalProperties = [
    {
        id: 1,
        name: "Jaipur City Palace Suite",
        type: "palace",
        dest: "rajasthan",
        img: "./image/home/Jaipur_City_Palace.jpg",
        rating: 4.9,
        location: "Jaipur, Rajasthan",
        host: "Rishabh Alpeshbhai Shah",
        rooms: [
            {
                name: "Royal Suite",
                price: 12500,
                beds: 3,
                maxGuests: 4,
                desc: "Luxury suite with palace views",
            },
            {
                name: "Heritage Room",
                price: 8900,
                beds: 2,
                maxGuests: 3,
                desc: "Traditional decor with modern amenities",
            },
        ],
    },
    {
        id: 2,
        name: "Udaipur Lake View Villa",
        type: "villa",
        dest: "rajasthan",
        img: "./image/home/Udaipur_Lake_Palace.jpg",
        rating: 4.8,
        location: "Udaipur, Rajasthan",
        host: "Rishabh Alpeshbhai Shah",
        rooms: [
            {
                name: "Lake View Suite",
                price: 18500,
                beds: 4,
                maxGuests: 6,
                desc: "Panoramic lake views",
            },
            {
                name: "Garden Villa",
                price: 12500,
                beds: 2,
                maxGuests: 4,
                desc: "Overlooking lush gardens",
            },
        ],
    },
    {
        id: 3,
        name: "Jaisalmer Desert Palace",
        type: "palace",
        dest: "rajasthan",
        img: "./image/home/Jaisalmer_Desert_Camp.jpg",
        rating: 4.7,
        location: "Jaisalmer, Rajasthan",
        host: "Rishabh Alpeshbhai Shah",
        rooms: [
            {
                name: "Desert View Suite",
                price: 8900,
                beds: 2,
                maxGuests: 3,
                desc: "Stunning desert views",
            },
            {
                name: "Royal Tent",
                price: 6500,
                beds: 1,
                maxGuests: 2,
                desc: "Luxury camping experience",
            },
        ],
    },
    {
        id: 7,
        name: "Jodhpur Blue City Haveli",
        type: "heritage",
        dest: "rajasthan",
        img: "./image/home/Jodhpur_Blue_City.jpg",
        rating: 4.8,
        location: "Jodhpur, Rajasthan",
        host: "Rishabh Alpeshbhai Shah",
        rooms: [
            {
                name: "Haveli Suite",
                price: 7800,
                beds: 3,
                maxGuests: 4,
                desc: "Traditional haveli room",
            },
            {
                name: "City View Room",
                price: 5900,
                beds: 2,
                maxGuests: 3,
                desc: "Panoramic blue city views",
            },
        ],
    },
    {
        id: 16,
        name: "The Fern Sattva Resort",
        type: "resort",
        dest: "gujarat",
        img: "./image/home/Fern_Sattva_Resort_Dwarka.jpg",
        rating: 4.8,
        location: "Dwarka, Gujarat",
        host: "Rishabh Alpeshbhai Shah",
        rooms: [
            {
                name: "Winter Green Room",
                price: 6500,
                beds: 2,
                maxGuests: 3,
                desc: "370 sq.ft. Eco-friendly room",
            },
            {
                name: "Fern Classic Room",
                price: 8500,
                beds: 2,
                maxGuests: 3,
                desc: "475 sq.ft. Premium comfort",
            },
            {
                name: "Dwarwati Suite",
                price: 15000,
                beds: 3,
                maxGuests: 5,
                desc: "850 sq.ft. Presidential luxury",
            },
        ],
    },
    {
        id: 17,
        name: "Hawthorn Suites by Wyndham",
        type: "hotel",
        dest: "gujarat",
        img: "./image/home/Hawthorn_Suites_Dwarka.jpg",
        rating: 4.6,
        location: "Dwarka, Gujarat",
        host: "Rishabh Alpeshbhai Shah",
        rooms: [
            {
                name: "Studio Suite",
                price: 7200,
                beds: 2,
                maxGuests: 4,
                desc: "With fully equipped kitchen",
            },
            {
                name: "One Bedroom Suite",
                price: 9500,
                beds: 3,
                maxGuests: 5,
                desc: "Separate living area",
            },
        ],
    },
    {
        id: 24,
        name: "Sarovar Portico Somnath",
        type: "hotel",
        dest: "gujarat",
        img: "./image/home/Sarovar_Portico_Somnath.jpg",
        rating: 4.7,
        location: "Somnath, Gujarat",
        host: "Rishabh Alpeshbhai Shah",
        rooms: [
            {
                name: "Deluxe Sea View",
                price: 7800,
                beds: 2,
                maxGuests: 4,
                desc: "Arabian Sea facing",
            },
            {
                name: "Premium Suite",
                price: 12000,
                beds: 3,
                maxGuests: 5,
                desc: "Spacious with living area",
            },
        ],
    },
    {
        id: 26,
        name: "ITC Narmada, Ahmedabad",
        type: "hotel",
        dest: "gujarat",
        img: "./image/home/ITC_Narmada_Ahmedabad.jpg",
        rating: 4.9,
        location: "Ahmedabad, Gujarat",
        host: "Rishabh Alpeshbhai Shah",
        rooms: [
            {
                name: "Luxury Room",
                price: 12000,
                beds: 2,
                maxGuests: 3,
                desc: "City views",
            },
            {
                name: "Executive Suite",
                price: 18000,
                beds: 3,
                maxGuests: 5,
                desc: "Club lounge access",
            },
        ],
    },
    {
        id: 33,
        name: "Welcomhotel Vadodara",
        type: "hotel",
        dest: "gujarat",
        img: "./image/home/Welcomhotel_Vadodara.jpg",
        rating: 4.8,
        location: "Vadodara, Gujarat",
        host: "Rishabh Alpeshbhai Shah",
        rooms: [
            {
                name: "Deluxe Room",
                price: 8800,
                beds: 2,
                maxGuests: 3,
                desc: "Modern amenities",
            },
            {
                name: "Club Room",
                price: 12000,
                beds: 2,
                maxGuests: 4,
                desc: "Club benefits included",
            },
        ],
    },
];

function initHeaderScroll() {
    const header = document.getElementById("siteHeader");
    if (!header) return;
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
    });
}

function initMobileMenu() {
    const menuBtn = document.getElementById("mobileMenuBtn");
    const navMenu = document.querySelector(".nav-menu");
    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const icon = menuBtn.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
        });
        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                if (menuBtn.querySelector("i")) {
                    menuBtn.querySelector("i").classList.add("fa-bars");
                    menuBtn.querySelector("i").classList.remove("fa-times");
                }
            });
        });
    }
}

function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide");
    const dotsContainer = document.getElementById("heroDots");
    if (!slides.length || !dotsContainer) return;
    let currentIndex = 0,
        autoTimer = null,
        isAnimating = false;
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            if (!isAnimating && i !== currentIndex) {
                stopAutoSlide();
                goToSlide(i);
                startAutoSlide();
            }
        });
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll(".dot");
    function goToSlide(index) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;
        slides[currentIndex].classList.remove("active");
        if (dots[currentIndex]) dots[currentIndex].classList.remove("active");
        currentIndex = index;
        slides[currentIndex].classList.add("active");
        if (dots[currentIndex]) dots[currentIndex].classList.add("active");
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }
    function nextSlide() {
        goToSlide((currentIndex + 1) % slides.length);
    }
    function startAutoSlide() {
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = setInterval(nextSlide, 4000);
    }
    function stopAutoSlide() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.addEventListener("mouseenter", stopAutoSlide);
        hero.addEventListener("mouseleave", startAutoSlide);
    }
    startAutoSlide();
}

function loadHomePageContent() {
    const mostPicked = [
        {
            name: "The Fern Sattva Resort",
            location: "Dwarka, Gujarat",
            tag: "Eco-Luxury",
            img: "./image/home/Fern_Sattva_Resort_Dwarka.jpg",
            price: "8,500",
        },
        {
            name: "ITC Narmada",
            location: "Ahmedabad",
            tag: "Luxury",
            img: "./image/home/ITC_Narmada_Ahmedabad.jpg",
            price: "12,000",
        },
        {
            name: "Jaipur City Palace",
            location: "Jaipur",
            tag: "Royal Heritage",
            img: "./image/home/Jaipur_City_Palace.jpg",
            price: "12,500",
        },
        {
            name: "Udaipur Lake Villa",
            location: "Udaipur",
            tag: "Lake View",
            img: "./image/home/Udaipur_Lake_Palace.jpg",
            price: "18,500",
        },
        {
            name: "Sarovar Portico",
            location: "Somnath",
            tag: "Sea View",
            img: "./image/home/Sarovar_Portico_Somnath.jpg",
            price: "7,800",
        },
        {
            name: "Welcomhotel",
            location: "Vadodara",
            tag: "Premium",
            img: "./image/home/Welcomhotel_Vadodara.jpg",
            price: "8,800",
        },
    ];
    const mpGrid = document.getElementById("mostPickedGrid");
    if (mpGrid)
        mpGrid.innerHTML = mostPicked
            .map(
                (item) =>
                    `<div class="pick-card" onclick="location.href='listing.html'"><div class="pick-img"><img src="${item.img}" onerror="this.src='https://placehold.co/400x300'"></div><div class="pick-badge">${item.tag}</div><div class="pick-info"><h3>${item.name}</h3><p>${item.location}</p><div class="pick-price">${item.price}<span>/ night</span></div></div></div>`,
            )
            .join("");

    const packages = [
        {
            name: "Royal Dwarka Pilgrimage",
            duration: "3 Days",
            locations: "Dwarka Temple → Nageshwar → Bet Dwarka",
            price: "12,500",
            img: "./image/home/Dwarka_Pilgrimage_Package.jpg",
        },
        {
            name: "Somnath Spiritual Tour",
            duration: "2 Days",
            locations: "Somnath Temple → Triveni Sangam",
            price: "8,500",
            img: "./image/home/Somnath_Spiritual_Package.jpg",
        },
        {
            name: "Rajasthan Royal Circuit",
            duration: "7 Days",
            locations: "Jaipur → Jodhpur → Udaipur",
            price: "45,000",
            img: "./image/home/Royal_Rajasthan_Package.jpg",
        },
        {
            name: "Gujarat Heritage Trail",
            duration: "5 Days",
            locations: "Ahmedabad → Vadodara → Dwarka",
            price: "28,000",
            img: "./image/home/Gujarat_Heritage_Package.jpg",
        },
    ];
    const pkgGrid = document.getElementById("packagesGrid");
    if (pkgGrid)
        pkgGrid.innerHTML = packages
            .map(
                (pkg) =>
                    `<div class="package-card" onclick="location.href='listing.html'"><div class="package-img"><img src="${pkg.img}" onerror="this.src='https://placehold.co/400x250'"></div><div class="package-tag">${pkg.duration}</div><div class="package-info"><h3>${pkg.name}</h3><p>${pkg.locations}</p><div class="package-price">${pkg.price}<span>/ person</span></div></div></div>`,
            )
            .join("");
}

function renderProperties() {
    let filtered = royalProperties.filter(
        (p) =>
            (activeFilters.types.length
                ? activeFilters.types.includes(p.type)
                : true) &&
            (activeFilters.destinations.length
                ? activeFilters.destinations.includes(p.dest)
                : true),
    );
    totalProperties = filtered.length;
    document.querySelectorAll(".filter input[data-type]").forEach((cb) => {
        let c = royalProperties.filter((p) => p.type === cb.dataset.type).length;
        cb.parentElement.querySelector("span").innerText = `(${c})`;
    });
    document.querySelectorAll(".filter input[data-dest]").forEach((cb) => {
        let c = royalProperties.filter((p) => p.dest === cb.dataset.dest).length;
        cb.parentElement.querySelector("span").innerText = `(${c})`;
    });
    let paginated = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );
    let container = document.getElementById("propertiesList");
    if (!container) return;
    container.innerHTML = `<p><i class="fas fa-building"></i> ${filtered.length} Royal Options</p><h1>Heritage Properties Across India</h1>`;
    if (paginated.length === 0) {
        container.innerHTML += `<div class="no-results">No matching properties found.</div>`;
        return;
    }
    paginated.forEach((p, idx) => {
        let stars =
            "★".repeat(Math.floor(p.rating)) +
            (p.rating % 1 ? "½" : "") +
            "☆".repeat(5 - Math.ceil(p.rating));
        container.innerHTML += `<div class="house" style="animation-delay: ${idx * 0.05}s" onclick="window.location.href='booking.html?id=${p.id}'"><div class="house-img"><img src="${p.img}" onerror="this.src='https://placehold.co/400x300'"></div><div class="house-info"><p><i class="fas fa-crown"></i> ${p.type === "palace" ? "Royal Palace" : p.type === "villa" ? "Luxury Villa" : p.type === "heritage" ? "Heritage Haveli" : "Premium Resort"}</p><h3>${p.name}</h3><div class="rating">${stars}</div><div class="house-price"><p><i class="fas fa-map-pin"></i> ${p.location} | Hosted by ${p.host}</p><h4>${p.rooms[0].price} <span>/ night</span></h4></div></div></div>`;
    });
    updatePagination(filtered.length);
}

function updatePagination(total) {
    const totalPages = Math.ceil(total / itemsPerPage);
    const pageNumbersDiv = document.getElementById("pageNumbers");
    if (!pageNumbersDiv) return;
    let pagesHtml = "";
    for (let i = 1; i <= totalPages; i++) {
        pagesHtml += `<div class="page-number ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</div>`;
    }
    pageNumbersDiv.innerHTML = pagesHtml;
    document.querySelectorAll(".page-number").forEach((btn) => {
        btn.addEventListener("click", () => {
            currentPage = parseInt(btn.dataset.page);
            renderProperties();
            window.scrollTo({ top: 300, behavior: "smooth" });
        });
    });
    document.getElementById("prevPage").style.visibility =
        currentPage > 1 ? "visible" : "hidden";
    document.getElementById("nextPage").style.visibility =
        currentPage < totalPages ? "visible" : "hidden";
}

function setupFilters() {
    document.querySelectorAll(".filter input[data-type]").forEach((cb) =>
        cb.addEventListener("change", () => {
            let t = cb.dataset.type;
            cb.checked
                ? activeFilters.types.push(t)
                : (activeFilters.types = activeFilters.types.filter((x) => x !== t));
            currentPage = 1;
            renderProperties();
        }),
    );
    document.querySelectorAll(".filter input[data-dest]").forEach((cb) =>
        cb.addEventListener("change", () => {
            let d = cb.dataset.dest;
            cb.checked
                ? activeFilters.destinations.push(d)
                : (activeFilters.destinations = activeFilters.destinations.filter(
                    (x) => x !== d,
                ));
            currentPage = 1;
            renderProperties();
        }),
    );
    document.getElementById("clearFiltersBtn")?.addEventListener("click", (e) => {
        e.preventDefault();
        document
            .querySelectorAll(".filter input")
            .forEach((cb) => (cb.checked = false));
        activeFilters = { types: [], destinations: [] };
        currentPage = 1;
        renderProperties();
    });
}

document.getElementById("prevPage")?.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderProperties();
        window.scrollTo({ top: 300, behavior: "smooth" });
    }
});
document.getElementById("nextPage")?.addEventListener("click", () => {
    if (currentPage < Math.ceil(royalProperties.length / itemsPerPage)) {
        currentPage++;
        renderProperties();
        window.scrollTo({ top: 300, behavior: "smooth" });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const filename = window.location.pathname.split("/").pop();
    initHeaderScroll();
    initMobileMenu();
    if (filename === "index.html" || filename === "" || filename === "/") {
        initHeroSlider();
        loadHomePageContent();
    }
    if (filename === "listing.html") {
        renderProperties();
        setupFilters();
    }
});

window.royalProperties = royalProperties;
window.toggleMenu = function () {
    document.getElementById("navBar")?.classList.toggle("hidemenu");
};

// Add these functions to your existing script.js

// Header scroll and mobile menu (already present, ensure these are called)
function initHeaderScroll() {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (menuBtn.querySelector('i')) {
                    menuBtn.querySelector('i').classList.add('fa-bars');
                    menuBtn.querySelector('i').classList.remove('fa-times');
                }
            });
        });
    }
}

// Make sure these are called on all pages
document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    // ... rest of your initialization code
});