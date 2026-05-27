/* ============================================
   RT RoyalBNB - Complete JavaScript
   All Pages Interactive Features
   ============================================ */

// --------------------------------------------
// GLOBAL VARIABABLES
// --------------------------------------------
let currentPage = 1;
const itemsPerPage = 6;
let activeFilters = { types: [], destinations: [], amenities: [] };

// --------------------------------------------
// ROYAL PROPERTIES DATABASE (UPDATED WITH NEW HOTELS)
// --------------------------------------------
const royalProperties = [
    // ========== EXISTING RAJASTHAN PROPERTIES (UNCHANGED) ==========
    { id: 1, name: "Jaipur City Palace Suite", type: "palace", dest: "rajasthan", amenities: ["pool", "wifi", "breakfast"], guests: 4, beds: 3, price: 12500, img: "./image/home/Jaipur_City_Palace.jpg", rating: 4.9, location: "Jaipur, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Experience royal living in this magnificent palace suite with stunning city views. The suite features traditional Rajasthani decor, modern amenities, and 24/7 royal concierge service." },
    { id: 2, name: "Udaipur Lake View Villa", type: "villa", dest: "rajasthan", amenities: ["pool", "spa", "wifi", "breakfast"], guests: 6, beds: 4, price: 18500, img: "./image/home/Udaipur_Lake_Palace.jpg", rating: 4.8, location: "Udaipur, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 3, desc: "Overlooking the serene Lake Pichola, this luxury villa offers unmatched views, a private pool, and traditional hospitality. Perfect for families and groups." },
    { id: 3, name: "Jaisalmer Desert Palace", type: "palace", dest: "rajasthan", amenities: ["wifi", "breakfast"], guests: 3, beds: 2, price: 8900, img: "./image/home/Jaisalmer_Desert_Camp.jpg", rating: 4.7, location: "Jaisalmer, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 1, desc: "Golden sandstone palace with breathtaking desert views. Experience the magic of the Thar Desert with traditional folk performances and camel rides." },
    { id: 7, name: "Jodhpur Blue City Haveli", type: "heritage", dest: "rajasthan", amenities: ["wifi", "breakfast", "pool"], guests: 4, beds: 3, price: 7800, img: "./image/home/Jodhpur_Blue_City.jpg", rating: 4.8, location: "Jodhpur, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Beautiful haveli with panoramic views of the Blue City. Located near Mehrangarh Fort, this heritage property offers an authentic Rajasthani experience." },
    { id: 11, name: "Nathdwara Shrinathji Haveli", type: "heritage", dest: "rajasthan", amenities: ["wifi", "breakfast"], guests: 4, beds: 2, price: 6200, img: "./image/home/Nathdwara_Haveli.jpg", rating: 4.9, location: "Nathdwara, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Beautiful haveli near the famous Shrinathji Temple. Ideal for pilgrims and heritage lovers seeking peace and spirituality." },
    { id: 12, name: "Mount Abu Royal Retreat", type: "resort", dest: "rajasthan", amenities: ["pool", "wifi", "breakfast"], guests: 5, beds: 3, price: 8500, img: "./image/home/Mount_Abu_Retreat.jpg", rating: 4.6, location: "Mount Abu, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Hill station resort with lush green surroundings, offering a cool escape from the desert heat. Features a large swimming pool and nature walks." },
    { id: 13, name: "Pushkar Royal Camp", type: "resort", dest: "rajasthan", amenities: ["pool", "wifi", "breakfast"], guests: 4, beds: 2, price: 6500, img: "./image/home/Pushkar_Royal_Camp.jpg", rating: 4.7, location: "Pushkar, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 1, desc: "Luxury tented camp near Pushkar Lake. Experience the famous Pushkar Camel Fair and enjoy traditional Rajasthani hospitality under the stars." },
    { id: 15, name: "Raj Palace Heritage Suite", type: "palace", dest: "rajasthan", amenities: ["pool", "spa", "wifi", "breakfast"], guests: 6, beds: 4, price: 22000, img: "./image/home/Raj_Palace_Heritage.jpg", rating: 5.0, location: "Jaipur, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 4, desc: "The crown jewel - world's leading heritage hotel suite. Experience royalty like never before with personal butler service and exclusive access to palace amenities." },

    // ========== EXISTING DAMAN PROPERTIES (UNCHANGED) ==========
    { id: 9, name: "Daman Beachfront Villa", type: "villa", dest: "daman", amenities: ["pool", "wifi", "breakfast"], guests: 6, beds: 4, price: 9500, img: "./image/home/Daman_Beach_Villa.jpg", rating: 4.4, location: "Daman", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 3, desc: "Luxury villa with private beach access. Enjoy the perfect blend of Portuguese and Indian culture with stunning sea views and water sports." },

    // ========== EXISTING GUJARAT PROPERTIES (KEPT FOR REFERENCE) ==========
    { id: 4, name: "Ahmedabad Pol Heritage", type: "heritage", dest: "gujarat", amenities: ["wifi", "breakfast"], guests: 2, beds: 1, price: 4500, img: "./image/home/Ahmedabad_Heritage.jpg", rating: 4.5, location: "Ahmedabad, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 1, desc: "Traditional Pol house with modern comforts in the heart of Ahmedabad. Experience the city's rich cultural heritage from this beautifully restored property." },
    { id: 8, name: "Vadodara Laxmi Vilas Wing", type: "palace", dest: "gujarat", amenities: ["wifi", "breakfast", "spa"], guests: 5, beds: 3, price: 11200, img: "./image/home/Vadodara_Palace.jpg", rating: 4.9, location: "Vadodara, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 3, desc: "Royal wing of the famous Laxmi Vilas Palace. Stay like a Maharaja in this luxurious property with stunning architecture and royal gardens." },
    { id: 10, name: "Bhavnagar Nilambag Palace", type: "palace", dest: "gujarat", amenities: ["pool", "wifi", "breakfast", "spa"], guests: 4, beds: 3, price: 6800, img: "./image/home/Bhavnagar_Palace.jpg", rating: 4.7, location: "Bhavnagar, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Historic palace with royal architecture and gardens. Experience the grandeur of Gujarat's royal past with modern comforts." },
    { id: 14, name: "Mandvi Beach Palace", type: "palace", dest: "gujarat", amenities: ["pool", "wifi", "breakfast", "spa"], guests: 5, beds: 3, price: 9800, img: "./image/home/Mandvi_Beach_Palace.jpg", rating: 4.6, location: "Mandvi, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Beachfront palace with stunning sunset views. Enjoy the pristine beaches of Mandvi with royal hospitality and delicious seafood." },

    // ========== NEWLY ADDED GUJARAT HOTELS (DWARKA & SOMNATH) ==========
    
    // Dwarka Hotels
    { id: 16, name: "The Fern Sattva Resort", type: "resort", dest: "gujarat", amenities: ["pool", "spa", "wifi", "breakfast", "ev-charging", "gym", "yoga"], guests: 3, beds: 2, price: 8500, img: "./image/home/Fern_Sattva_Resort_Dwarka.jpg", rating: 4.8, location: "Dwarka, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "An upscale eco-friendly resort spread over 3 acres with 81 contemporary rooms. Features a vegetarian restaurant, coffee shop, swimming pool, spa, and banquet facilities. Winter Green Room (370 sq.ft.) and Fern Classic Room (475 sq.ft.) options available." },
    
    { id: 17, name: "Hawthorn Suites by Wyndham", type: "hotel", dest: "gujarat", amenities: ["pool", "wifi", "breakfast", "gym", "business-center"], guests: 4, beds: 2, price: 7200, img: "./image/home/Hawthorn_Suites_Dwarka.jpg", rating: 4.6, location: "Dwarka, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Extended stay hotel offering spacious suites with fully equipped kitchens. Perfect for families and long-term travelers. Features a fitness center and complimentary breakfast." },
    
    { id: 18, name: "The Sky Imperial - Bapu's Resort", type: "resort", dest: "gujarat", amenities: ["pool", "wifi", "breakfast", "spa", "restaurant"], guests: 4, beds: 2, price: 6500, img: "./image/home/Sky_Imperial_Dwarka.jpg", rating: 4.5, location: "Dwarka, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "A serene resort offering comfortable accommodations with modern amenities. Features multi-cuisine restaurant, swimming pool, and spa services. Close to Dwarkadhish Temple." },
    
    { id: 19, name: "Dwarkadhish Lords Eco Inn", type: "hotel", dest: "gujarat", amenities: ["wifi", "breakfast", "restaurant", "conference"], guests: 3, beds: 2, price: 4800, img: "./image/home/Lords_Eco_Inn_Dwarka.jpg", rating: 4.3, location: "Dwarka, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 1, desc: "An eco-friendly hotel offering comfortable rooms at affordable prices. Features a pure vegetarian restaurant and conference facilities. Ideal for pilgrims and budget travelers." },
    
    { id: 20, name: "Hotel Roma Kristo", type: "hotel", dest: "gujarat", amenities: ["wifi", "breakfast", "restaurant", "room-service"], guests: 3, beds: 2, price: 3500, img: "./image/home/Hotel_Roma_Kristo_Dwarka.jpg", rating: 4.2, location: "Dwarka, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 1, desc: "A budget-friendly hotel located near Dwarkadhish Temple. Offers clean and comfortable rooms with vegetarian dining options. Perfect for pilgrims seeking affordable accommodation." },
    
    // Somnath Hotels
    { id: 21, name: "The Square Somnath (Pure Veg)", type: "hotel", dest: "gujarat", amenities: ["wifi", "breakfast", "restaurant", "parking"], guests: 3, beds: 2, price: 4200, img: "./image/home/The_Square_Somnath.jpg", rating: 4.4, location: "Somnath, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 1, desc: "A pure vegetarian hotel offering comfortable accommodations near the famous Somnath Temple. Features a multi-cuisine restaurant and ample parking space." },
    
    { id: 22, name: "The Somnath Gateway Hotel", type: "hotel", dest: "gujarat", amenities: ["wifi", "breakfast", "restaurant", "conference", "pool"], guests: 4, beds: 2, price: 5500, img: "./image/home/Somnath_Gateway_Hotel.jpg", rating: 4.5, location: "Somnath, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "A premium hotel offering stunning views of the Arabian Sea. Features a swimming pool, multi-cuisine restaurant, and conference facilities. Close to Somnath Temple." },
    
    { id: 23, name: "Lords Inn Somnath", type: "hotel", dest: "gujarat", amenities: ["wifi", "breakfast", "restaurant", "conference"], guests: 3, beds: 2, price: 4600, img: "./image/home/Lords_Inn_Somnath.jpg", rating: 4.3, location: "Somnath, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 1, desc: "A modern hotel offering comfortable rooms with modern amenities. Features a pure vegetarian restaurant and conference facilities. Ideal for pilgrims and tourists." },
    
    { id: 24, name: "Sarovar Portico Somnath", type: "hotel", dest: "gujarat", amenities: ["pool", "spa", "wifi", "breakfast", "restaurant", "gym"], guests: 4, beds: 2, price: 7800, img: "./image/home/Sarovar_Portico_Somnath.jpg", rating: 4.7, location: "Somnath, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "A premium hotel from the Sarovar group offering luxurious accommodations. Features a swimming pool, spa, fitness center, and multi-cuisine restaurant. Perfect for a relaxing stay." },
    
    { id: 25, name: "The S Crown", type: "hotel", dest: "gujarat", amenities: ["wifi", "breakfast", "restaurant", "banquet"], guests: 3, beds: 2, price: 5000, img: "./image/home/The_S_Crown_Somnath.jpg", rating: 4.4, location: "Somnath, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 1, desc: "A modern hotel offering comfortable accommodations with stunning sea views. Features a rooftop restaurant, banquet facilities, and proximity to Somnath Temple." },
    
    // Ahmedabad Hotels
    { id: 26, name: "ITC Narmada, Ahmedabad", type: "hotel", dest: "gujarat", amenities: ["pool", "spa", "wifi", "breakfast", "restaurant", "gym", "business-center"], guests: 4, beds: 2, price: 12000, img: "./image/home/ITC_Narmada_Ahmedabad.jpg", rating: 4.9, location: "Ahmedabad, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "A Luxury Collection Hotel offering world-class amenities. Features multiple dining options, a luxurious spa, swimming pool, and state-of-the-art fitness center. Perfect for business and leisure." },
    
    { id: 27, name: "Novotel Ahmedabad", type: "hotel", dest: "gujarat", amenities: ["pool", "wifi", "breakfast", "restaurant", "gym", "business-center"], guests: 4, beds: 2, price: 8500, img: "./image/home/Novotel_Ahmedabad.jpg", rating: 4.7, location: "Ahmedabad, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "A contemporary hotel located in the heart of Ahmedabad. Features a swimming pool, fitness center, and multi-cuisine restaurant. Known for its excellent hospitality and modern amenities." },
    
    { id: 28, name: "Hotel Eldorado", type: "hotel", dest: "gujarat", amenities: ["wifi", "breakfast", "restaurant", "conference"], guests: 3, beds: 2, price: 4000, img: "./image/home/Hotel_Eldorado_Ahmedabad.jpg", rating: 4.3, location: "Ahmedabad, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 1, desc: "A comfortable hotel offering excellent value for money. Features clean rooms, vegetarian dining, and conference facilities. Centrally located for easy access to city attractions." },
    
    { id: 29, name: "Hyatt Ahmedabad", type: "hotel", dest: "gujarat", amenities: ["pool", "spa", "wifi", "breakfast", "restaurant", "gym", "business-center"], guests: 4, beds: 2, price: 9800, img: "./image/home/Hyatt_Ahmedabad.jpg", rating: 4.8, location: "Ahmedabad, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "A luxury hotel offering world-class amenities. Features multiple dining options, a spa, swimming pool, and state-of-the-art fitness center. Perfect for discerning travelers." },
    
    // Vadodara Hotels
    { id: 30, name: "Hyatt Place Vadodara", type: "hotel", dest: "gujarat", amenities: ["pool", "wifi", "breakfast", "restaurant", "gym", "business-center"], guests: 4, beds: 2, price: 7500, img: "./image/home/Hyatt_Place_Vadodara.jpg", rating: 4.7, location: "Vadodara, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "A modern hotel offering spacious rooms with comfortable beds and smart TVs. Features a fitness center, outdoor pool, and complimentary breakfast. Perfect for business and leisure travelers." },
    
    { id: 31, name: "Laxminarayan Club & Resort", type: "resort", dest: "gujarat", amenities: ["pool", "wifi", "breakfast", "restaurant", "sports", "banquet"], guests: 5, beds: 3, price: 6000, img: "./image/home/Laxminarayan_Club_Resort.jpg", rating: 4.5, location: "Vadodara, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "A sprawling resort offering Deluxe, Super Executive, and Suite rooms. Features swimming pool, sports facilities, multi-cuisine restaurant, and banquet halls. Ideal for family getaways and corporate events." },
    
    { id: 32, name: "Prakruti Resort", type: "resort", dest: "gujarat", amenities: ["pool", "wifi", "breakfast", "restaurant", "spa", "activities"], guests: 5, beds: 3, price: 5800, img: "./image/home/Prakruti_Resort_Vadodara.jpg", rating: 4.6, location: "Vadodara, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "A nature-centric resort offering a perfect getaway from city life. Features swimming pool, spa, indoor and outdoor activities, and multi-cuisine dining. Perfect for weekend getaways." },
    
    { id: 33, name: "Welcomhotel Vadodara", type: "hotel", dest: "gujarat", amenities: ["pool", "spa", "wifi", "breakfast", "restaurant", "gym", "business-center"], guests: 4, beds: 2, price: 8800, img: "./image/home/Welcomhotel_Vadodara.jpg", rating: 4.8, location: "Vadodara, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "A premium hotel from ITC Hotels offering warm hospitality. Features multiple dining options, swimming pool, spa, and well-equipped fitness center. Known for its excellent service and prime location in Alkapuri." }
];

/* ============================================
   HERO SLIDER - AUTO SLIDING EVERY 4 SECONDS
   ============================================ */

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.getElementById('heroDots');
    
    if (!slides.length || !dotsContainer) return;
    
    let currentIndex = 0;
    let autoTimer = null;
    let isAnimating = false;
    const SLIDE_DURATION = 4000; // 4 seconds
    
    // Clear and create dots
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            if (!isAnimating && i !== currentIndex) {
                stopAutoSlide();
                goToSlide(i);
                startAutoSlide();
            }
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function goToSlide(index) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;
        
        slides[currentIndex].classList.remove('active');
        if (dots[currentIndex]) dots[currentIndex].classList.remove('active');
        
        currentIndex = index;
        
        slides[currentIndex].classList.add('active');
        if (dots[currentIndex]) dots[currentIndex].classList.add('active');
        
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }
    
    function nextSlide() {
        const next = (currentIndex + 1) % slides.length;
        goToSlide(next);
    }
    
    function startAutoSlide() {
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = setInterval(nextSlide, SLIDE_DURATION);
    }
    
    function stopAutoSlide() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', stopAutoSlide);
        hero.addEventListener('mouseleave', startAutoSlide);
    }
    
    startAutoSlide();
}

// --------------------------------------------
// MOBILE MENU TOGGLE
// --------------------------------------------
function toggleMenu() {
    const nav = document.getElementById('navBar');
    if (nav) {
        nav.classList.toggle('hidemenu');
    }
}

// --------------------------------------------
// NAVBAR SCROLL EFFECT
// --------------------------------------------
function initNavbarScroll() {
    const nav = document.getElementById('navBar');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// --------------------------------------------
// SCROLL ANIMATION OBSERVER
// --------------------------------------------
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.pick-card, .package-card, .exclusive-card, .trend-card, .story-card, ' +
        '.about-royal-section, .owner-cta, .house, .section-header'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.animation = 'fadeUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// --------------------------------------------
// HOME PAGE CONTENT LOADER (FIXED PATHS)
// --------------------------------------------
function loadHomePageContent() {
    console.log("Loading home page content...");
    
    // Most Picked Grid
    const mostPickedGrid = document.getElementById('mostPickedGrid');
    if (mostPickedGrid) {
        const mostPicked = [
            { name: "The Fern Sattva Resort", location: "Dwarka, Gujarat", tag: "Eco-Luxury", img: "./image/home/Fern_Sattva_Resort_Dwarka.jpg", price: "8,500" },
            { name: "ITC Narmada Ahmedabad", location: "Ahmedabad, Gujarat", tag: "Luxury Collection", img: "./image/home/ITC_Narmada_Ahmedabad.jpg", price: "12,000" },
            { name: "Welcomhotel Vadodara", location: "Vadodara, Gujarat", tag: "Premium Stay", img: "./image/home/Welcomhotel_Vadodara.jpg", price: "8,800" },
            { name: "Sarovar Portico Somnath", location: "Somnath, Gujarat", tag: "Sea View", img: "./image/home/Sarovar_Portico_Somnath.jpg", price: "7,800" },
            { name: "Jaipur City Palace", location: "Jaipur, Rajasthan", tag: "Royal Heritage", img: "./image/home/Jaipur_City_Palace.jpg", price: "12,500" }
        ];
        
        mostPickedGrid.innerHTML = mostPicked.map(item => `
            <div class="pick-card" onclick="window.location.href='listing.html'">
                <div class="pick-img"><img src="${item.img}" onerror="this.src='https://placehold.co/400x300?text=Royal+Retreat'" alt="${item.name}"></div>
                <div class="pick-badge">${item.tag}</div>
                <div class="pick-info">
                    <h3>${item.name}</h3>
                    <p><i class="fas fa-map-pin"></i> ${item.location}</p>
                    <div class="pick-price">${item.price} <span>/ night</span></div>
                </div>
            </div>
        `).join('');
        console.log("Most Picked Grid loaded");
    }
    
    // Packages Grid
    const packagesGrid = document.getElementById('packagesGrid');
    if (packagesGrid) {
        const packages = [
            { name: "Royal Dwarka Pilgrimage", duration: "3 Days / 2 Nights", locations: "Dwarka Temple → Nageshwar → Bet Dwarka", highlights: "Temple visits, Beach resort stay, Local cuisine", price: "12,500", img: "./image/home/Dwarka_Pilgrimage_Package.jpg" },
            { name: "Somnath Spiritual Tour", duration: "2 Days / 1 Night", locations: "Somnath Temple → Triveni Sangam → Bhalka Tirth", highlights: "Temple visits, Sea view hotel, Gujarati thali", price: "8,500", img: "./image/home/Somnath_Spiritual_Package.jpg" },
            { name: "Ahmedabad Heritage Walk", duration: "3 Days / 2 Nights", locations: "Sabarmati Ashram → Adalaj Stepwell → Kankaria Lake", highlights: "Heritage walk, Luxury hotel, Local shopping", price: "15,000", img: "./image/home/Ahmedabad_Heritage_Package.jpg" }
        ];
        
        packagesGrid.innerHTML = packages.map(pkg => `
            <div class="package-card" onclick="window.location.href='listing.html'">
                <div class="package-img"><img src="${pkg.img}" onerror="this.src='https://placehold.co/400x250?text=Royal+Package'" alt="${pkg.name}"></div>
                <div class="package-tag">${pkg.duration}</div>
                <div class="package-info">
                    <h3>${pkg.name}</h3>
                    <p><i class="fas fa-map-marker-alt"></i> ${pkg.locations}</p>
                    <p><i class="fas fa-star"></i> ${pkg.highlights}</p>
                    <div class="package-price">${pkg.price} <span>/ person</span></div>
                    <span class="package-btn">Explore Package <i class="fas fa-arrow-right"></i></span>
                </div>
            </div>
        `).join('');
        console.log("Packages Grid loaded");
    }
    
    // Exclusives Grid - Popular Royal Destinations
    const exclusivesGrid = document.getElementById('exclusivesGrid');
    if (exclusivesGrid) {
        const exclusives = [
            { img: "./image/home/Jaipur_Destination.jpg", name: "Jaipur", price: "5,500", loc: "Rajasthan" },
            { img: "./image/home/Udaipur_Destination.jpg", name: "Udaipur", price: "7,200", loc: "Rajasthan" },
            { img: "./image/home/Ahmedabad_Destination.jpg", name: "Ahmedabad", price: "4,200", loc: "Gujarat" },
            { img: "./image/home/Dwarka_Destination.jpg", name: "Dwarka", price: "3,900", loc: "Gujarat" },
            { img: "./image/home/Somnath_Destination.jpg", name: "Somnath", price: "4,400", loc: "Gujarat" },
            { img: "./image/home/Vadodara_Destination.jpg", name: "Vadodara", price: "4,800", loc: "Gujarat" }
        ];
        
        exclusivesGrid.innerHTML = exclusives.map(ex => `
            <div class="exclusive-card" onclick="window.location.href='listing.html'">
                <img src="${ex.img}" onerror="this.src='https://placehold.co/400x300?text=Heritage+Destination'">
                <div class="exclusive-info">
                    <h3>${ex.name}</h3>
                    <p>${ex.loc}</p>
                    <span class="price">${ex.price} <span>/ night</span></span>
                </div>
            </div>
        `).join('');
        console.log("Exclusives Grid loaded");
    }
    
    // Trending Grid
    const trendingGrid = document.getElementById('trendingGrid');
    if (trendingGrid) {
        const trending = [
            { img: "./image/home/Rajasthan_Desert_Circuit.jpg", name: "Rajasthan Desert Circuit", loc: "Jaisalmer - Jodhpur" },
            { img: "./image/home/Gujarat_Pilgrim_Trail.jpg", name: "Dwarka Somnath Yatra", loc: "Dwarka - Somnath" },
            { img: "./image/home/Ahmedabad_Vadodara_Circuit.jpg", name: "Business & Heritage", loc: "Ahmedabad - Vadodara" },
            { img: "./image/home/Saurashtra_Circuit.jpg", name: "Saurashtra Heritage", loc: "Rajkot - Junagadh - Somnath" }
        ];
        
        trendingGrid.innerHTML = trending.map(tr => `
            <div class="trend-card" onclick="window.location.href='listing.html'">
                <img src="${tr.img}" onerror="this.src='https://placehold.co/300x200?text=Royal+Circuit'">
                <h3>${tr.name}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${tr.loc}</p>
            </div>
        `).join('');
        console.log("Trending Grid loaded");
    }
    
    // Stories Grid (Testimonials)
    const storiesGrid = document.getElementById('storiesGrid');
    if (storiesGrid) {
        const stories = [
            { img: "./image/home/Royal_Testimonial_1.jpg", desc: "The Fern Sattva Resort in Dwarka was amazing! Eco-friendly luxury with stunning sea views. Highly recommended for a peaceful getaway." },
            { img: "./image/home/Royal_Testimonial_2.jpg", desc: "ITC Narmada Ahmedabad offers world-class hospitality. The spa and dining options are exceptional. A true luxury experience!" },
            { img: "./image/home/Royal_Testimonial_3.jpg", desc: "Sarovar Portico Somnath is the best place to stay near the temple. Clean rooms, great food, and excellent service." }
        ];
        
        storiesGrid.innerHTML = stories.map(st => `
            <div class="story-card" onclick="window.location.href='listing.html'">
                <img src="${st.img}" onerror="this.src='https://placehold.co/400x300?text=Travel+Story'">
                <p>${st.desc}</p>
            </div>
        `).join('');
        console.log("Stories Grid loaded");
    }
}

// --------------------------------------------
// LISTING PAGE FUNCTIONS
// --------------------------------------------
function renderProperties() {
    let filtered = [...royalProperties];
    
    if (activeFilters.types.length > 0) {
        filtered = filtered.filter(p => activeFilters.types.includes(p.type));
    }
    if (activeFilters.destinations.length > 0) {
        filtered = filtered.filter(p => activeFilters.destinations.includes(p.dest));
    }
    if (activeFilters.amenities.length > 0) {
        filtered = filtered.filter(p => p.amenities.some(a => activeFilters.amenities.includes(a)));
    }
    
    // Update filter counts
    document.querySelectorAll('.filter input[data-type]').forEach(cb => {
        const type = cb.getAttribute('data-type');
        const count = royalProperties.filter(p => p.type === type).length;
        const span = cb.parentElement.querySelector('span');
        if (span) span.innerText = `(${count})`;
    });
    document.querySelectorAll('.filter input[data-dest]').forEach(cb => {
        const dest = cb.getAttribute('data-dest');
        const count = royalProperties.filter(p => p.dest === dest).length;
        const span = cb.parentElement.querySelector('span');
        if (span) span.innerText = `(${count})`;
    });
    
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);
    
    const container = document.getElementById('propertiesList');
    if (!container) return;
    
    container.innerHTML = `<p><i class="fas fa-building"></i> ${filtered.length} Royal Options</p>
                           <h1>Heritage Properties Across India</h1>`;
    
    if (paginated.length === 0) {
        container.innerHTML += `<div class="no-results"><i class="fas fa-search"></i> No matching properties found. Try different filters!</div>`;
        return;
    }
    
    paginated.forEach(prop => {
        const stars = generateStarRating(prop.rating);
        container.innerHTML += `
            <div class="house" data-id="${prop.id}" onclick="window.location.href='booking.html?id=${prop.id}'">
                <div class="house-img">
                    <img src="${prop.img}" onerror="this.src='https://placehold.co/400x300?text=Heritage+Property'" alt="${prop.name}">
                </div>
                <div class="house-info">
                    <p><i class="fas fa-crown"></i> ${prop.type === 'palace' ? 'Royal Palace' : prop.type === 'villa' ? 'Luxury Villa' : prop.type === 'heritage' ? 'Heritage Haveli' : prop.type === 'resort' ? 'Premium Resort' : 'Luxury Hotel'}</p>
                    <h3>${prop.name}</h3>
                    <p>${prop.guests} Guests / ${prop.beds} Beds / ${prop.bathrooms} Baths</p>
                    <div class="rating">${stars}</div>
                    <div class="house-price">
                        <p><i class="fas fa-map-pin"></i> ${prop.location}</p>
                        <h4>${prop.price.toLocaleString('en-IN')} <span>/ night</span></h4>
                    </div>
                </div>
            </div>
        `;
    });
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
    if (hasHalfStar) stars += '<i class="fas fa-star-half-alt"></i>';
    for (let i = stars.length / 2; i < 5; i++) stars += '<i class="far fa-star"></i>';
    return stars;
}

function setupFilters() {
    document.querySelectorAll('.filter input[data-type]').forEach(cb => {
        cb.addEventListener('change', () => {
            const type = cb.getAttribute('data-type');
            if (cb.checked) activeFilters.types.push(type);
            else activeFilters.types = activeFilters.types.filter(t => t !== type);
            currentPage = 1;
            renderProperties();
        });
    });
    
    document.querySelectorAll('.filter input[data-dest]').forEach(cb => {
        cb.addEventListener('change', () => {
            const dest = cb.getAttribute('data-dest');
            if (cb.checked) activeFilters.destinations.push(dest);
            else activeFilters.destinations = activeFilters.destinations.filter(d => d !== dest);
            currentPage = 1;
            renderProperties();
        });
    });
    
    document.querySelectorAll('.filter input[data-amenity]').forEach(cb => {
        cb.addEventListener('change', () => {
            const amenity = cb.getAttribute('data-amenity');
            if (cb.checked) activeFilters.amenities.push(amenity);
            else activeFilters.amenities = activeFilters.amenities.filter(a => a !== amenity);
            currentPage = 1;
            renderProperties();
        });
    });
    
    const clearBtn = document.getElementById('clearFiltersBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.filter input').forEach(cb => cb.checked = false);
            activeFilters = { types: [], destinations: [], amenities: [] };
            currentPage = 1;
            renderProperties();
        });
    }
}

function setupPagination() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderProperties();
                window.scrollTo({ top: 400, behavior: 'smooth' });
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(royalProperties.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderProperties();
                window.scrollTo({ top: 400, behavior: 'smooth' });
            }
        });
    }
}

// --------------------------------------------
// HOUSE PAGE FUNCTIONS
// --------------------------------------------
function setupHousePage() {
    const availabilityForm = document.getElementById('availabilityForm');
    if (availabilityForm) {
        availabilityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const checkin = document.getElementById('checkinDate')?.value || 'Not selected';
            const checkout = document.getElementById('checkoutDate')?.value || 'Not selected';
            const guests = document.getElementById('guestCount')?.value || 2;
            alert(`✨ Royal Availability Check\n📅 Check-in: ${checkin}\n📅 Check-out: ${checkout}\n👥 Guests: ${guests}\n\nOur royal concierge will contact you with best heritage rates.`);
        });
    }
    
    const contactBtn = document.getElementById('contactHostBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("📞 Connect with Royal Host: +91 98765 01234 (WhatsApp available)\n📧 Email: royal.host@rtroyalbnb.com");
        });
    }
}

// --------------------------------------------
// REGISTER PAGE FUNCTIONS
// --------------------------------------------
function setupRegisterPage() {
    const popup = document.getElementById('successPopup');
    
    window.openPopup = function() {
        if (popup) popup.style.display = 'flex';
    };
    
    window.closePopup = function() {
        if (popup) popup.style.display = 'none';
        window.location.href = 'index.html';
    };
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fullname')?.value;
            if (!name) {
                alert('Please enter your full name');
                return;
            }
            openPopup();
            registerForm.reset();
        });
    }
    
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            registerForm?.reset();
        });
    }
    
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) closePopup();
        });
    }
}

// --------------------------------------------
// BOOKING PAGE FUNCTIONS
// --------------------------------------------
function loadBookingPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = parseInt(urlParams.get('id'));
    const property = royalProperties.find(p => p.id === propertyId) || royalProperties[0];
    
    const container = document.getElementById('bookingContainer');
    if (!container) return;
    
    const stars = generateStarRating(property.rating);
    
    container.innerHTML = `
        <div class="booking-wrapper">
            <div class="booking-gallery">
                <img src="${property.img}" onerror="this.src='https://placehold.co/600x400?text=Heritage+Property'" alt="${property.name}">
            </div>
            <div class="booking-info">
                <h1>${property.name}</h1>
                <div class="rating">${stars}</div>
                <p><i class="fas fa-map-pin"></i> ${property.location} | <i class="fas fa-user-tie"></i> Hosted by ${property.host}</p>
                <hr class="line" style="margin: 15px 0;">
                <div class="details">
                    <h3>Property Details</h3>
                    <ul>
                        <li><i class="fas fa-bed"></i> ${property.beds} Bedrooms</li>
                        <li><i class="fas fa-bath"></i> ${property.bathrooms} Bathrooms</li>
                        <li><i class="fas fa-users"></i> Sleeps ${property.guests} Guests</li>
                    </ul>
                    <h3>Amenities</h3>
                    <div class="amenities">
                        ${property.amenities.map(a => `<span><i class="fas fa-check-circle"></i> ${a.charAt(0).toUpperCase() + a.slice(1).replace('-', ' ')}</span>`).join('')}
                    </div>
                    <div class="price-box">
                        <h2>${property.price.toLocaleString('en-IN')} <span>/ night</span></h2>
                        <button class="book-now-btn" onclick="alert('✨ Booking request sent! Royal concierge will contact you within 24 hours.')">Book Now <i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="booking-map">
            <h3><i class="fas fa-map"></i> Location</h3>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.444567890123!2d75.7872709!3d26.9124336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3d4f5b5b5b5%3A0x4a501367f076adff!2sJaipur%2C%20Rajasthan%2C%20India!5e1!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="300" style="border:0; border-radius: 20px;" allowfullscreen loading="lazy"></iframe>
            <a href="${property.map}" target="_blank" class="map-link">Open in Google Maps <i class="fas fa-external-link-alt"></i></a>
        </div>
    `;
}

// --------------------------------------------
// INITIALIZE ALL ON PAGE LOAD
// --------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    console.log("Page loaded:", filename);
    
    // Initialize common features
    initNavbarScroll();
    initScrollAnimations();
    
    // Hero slider only on homepage
    if (filename === 'index.html' || filename === '' || filename === '/' || path === '/' || path === '') {
        console.log("Initializing homepage...");
        initHeroSlider();
        loadHomePageContent();
    }
    
    // Listing page features
    if (filename === 'listing.html') {
        console.log("Initializing listing page...");
        renderProperties();
        setupFilters();
        setupPagination();
    }
    
    // House page features
    if (filename === 'house.html') {
        console.log("Initializing house page...");
        setupHousePage();
    }
    
    // Register page features
    if (filename === 'register.html') {
        console.log("Initializing register page...");
        setupRegisterPage();
    }
    
    // Booking page features
    if (filename === 'booking.html') {
        console.log("Initializing booking page...");
        loadBookingPage();
    }
});

// Export global functions
window.toggleMenu = toggleMenu;
window.openPopup = window.openPopup;
window.closePopup = window.closePopup;