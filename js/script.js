/* ============================================
   RT RoyalBNB - Complete JavaScript
   All Pages Interactive Features
   ============================================ */

// --------------------------------------------
// GLOBAL VARIABLES
// --------------------------------------------
let currentPage = 1;
const itemsPerPage = 6;
let activeFilters = { types: [], destinations: [], amenities: [] };

// --------------------------------------------
// ROYAL PROPERTIES DATABASE (15+ Properties)
// --------------------------------------------
const royalProperties = [
    { id: 1, name: "Jaipur City Palace Suite", type: "palace", dest: "rajasthan", amenities: ["pool", "wifi", "breakfast"], guests: 4, beds: 3, price: 12500, img: "./images/properties/jaipur-palace.jpg", rating: 4.9, location: "Jaipur, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Experience royal living in this magnificent palace suite with stunning city views." },
    { id: 2, name: "Udaipur Lake View Villa", type: "villa", dest: "rajasthan", amenities: ["pool", "spa", "wifi", "breakfast"], guests: 6, beds: 4, price: 18500, img: "./images/properties/udaipur-lake.jpg", rating: 4.8, location: "Udaipur, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 3, desc: "Overlooking the serene Lake Pichola, this villa offers unmatched luxury." },
    { id: 3, name: "Jaisalmer Desert Palace", type: "palace", dest: "rajasthan", amenities: ["wifi", "breakfast"], guests: 3, beds: 2, price: 8900, img: "./images/properties/jaisalmer-palace.jpg", rating: 4.7, location: "Jaisalmer, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 1, desc: "Golden sandstone palace with breathtaking desert views." },
    { id: 4, name: "Ahmedabad Pol Heritage", type: "heritage", dest: "gujarat", amenities: ["wifi", "breakfast"], guests: 2, beds: 1, price: 4500, img: "./images/properties/ahmedabad-heritage.jpg", rating: 4.5, location: "Ahmedabad, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 1, desc: "Traditional Pol house with modern comforts in the heart of Ahmedabad." },
    { id: 5, name: "Somnath Sea View Resort", type: "resort", dest: "gujarat", amenities: ["pool", "wifi", "breakfast", "spa"], guests: 4, beds: 3, price: 7200, img: "./images/properties/somnath-resort.jpg", rating: 4.6, location: "Somnath, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Beachfront resort with stunning Arabian Sea views." },
    { id: 6, name: "Dwarka Divine Stay", type: "heritage", dest: "gujarat", amenities: ["wifi", "breakfast"], guests: 3, beds: 2, price: 5400, img: "./images/properties/dwarka-heritage.jpg", rating: 4.7, location: "Dwarka, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Peaceful retreat near Dwarkadhish Temple." },
    { id: 7, name: "Jodhpur Blue City Haveli", type: "heritage", dest: "rajasthan", amenities: ["wifi", "breakfast", "pool"], guests: 4, beds: 3, price: 7800, img: "./images/properties/jodhpur-haveli.jpg", rating: 4.8, location: "Jodhpur, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Beautiful haveli with panoramic views of the Blue City." },
    { id: 8, name: "Vadodara Laxmi Vilas Wing", type: "palace", dest: "gujarat", amenities: ["wifi", "breakfast", "spa"], guests: 5, beds: 3, price: 11200, img: "./images/properties/vadodara-palace.jpg", rating: 4.9, location: "Vadodara, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 3, desc: "Royal wing of the famous Laxmi Vilas Palace." },
    { id: 9, name: "Daman Beachfront Villa", type: "villa", dest: "daman", amenities: ["pool", "wifi", "breakfast"], guests: 6, beds: 4, price: 9500, img: "./images/properties/daman-villa.jpg", rating: 4.4, location: "Daman", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 3, desc: "Luxury villa with private beach access." },
    { id: 10, name: "Bhavnagar Nilambag Palace", type: "palace", dest: "gujarat", amenities: ["pool", "wifi", "breakfast", "spa"], guests: 4, beds: 3, price: 6800, img: "./images/properties/bhavnagar-palace.jpg", rating: 4.7, location: "Bhavnagar, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Historic palace with royal architecture and gardens." },
    { id: 11, name: "Nathdwara Shrinathji Haveli", type: "heritage", dest: "rajasthan", amenities: ["wifi", "breakfast"], guests: 4, beds: 2, price: 6200, img: "./images/properties/nathdwara-haveli.jpg", rating: 4.9, location: "Nathdwara, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Beautiful haveli near the famous Shrinathji Temple." },
    { id: 12, name: "Mount Abu Royal Retreat", type: "resort", dest: "rajasthan", amenities: ["pool", "wifi", "breakfast"], guests: 5, beds: 3, price: 8500, img: "./images/properties/mount-abu.jpg", rating: 4.6, location: "Mount Abu, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Hill station resort with lush green surroundings." },
    { id: 13, name: "Pushkar Royal Camp", type: "resort", dest: "rajasthan", amenities: ["pool", "wifi", "breakfast"], guests: 4, beds: 2, price: 6500, img: "./images/properties/pushkar-camp.jpg", rating: 4.7, location: "Pushkar, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 1, desc: "Luxury tented camp near Pushkar Lake." },
    { id: 14, name: "Mandvi Beach Palace", type: "palace", dest: "gujarat", amenities: ["pool", "wifi", "breakfast", "spa"], guests: 5, beds: 3, price: 9800, img: "./images/properties/mandvi-palace.jpg", rating: 4.6, location: "Mandvi, Gujarat", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 2, desc: "Beachfront palace with stunning sunset views." },
    { id: 15, name: "Raj Palace Heritage Suite", type: "palace", dest: "rajasthan", amenities: ["pool", "spa", "wifi", "breakfast"], guests: 6, beds: 4, price: 22000, img: "./images/properties/raj-palace.jpg", rating: 5.0, location: "Jaipur, Rajasthan", map: "https://maps.app.goo.gl/GRqekt9GqwPJpgu57", host: "Rishabh Alpeshbhai Shah", bathrooms: 4, desc: "The crown jewel - world's leading heritage hotel suite." }
];

/* ============================================
   HERO SLIDER - AUTO SLIDING EVERY 4 SECONDS
   NO ARROWS - DOTS ONLY
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero slider on homepage
    const isHomepage = window.location.pathname.includes('index.html') || 
                       window.location.pathname === '/' || 
                       window.location.pathname === '';
    
    if (isHomepage) {
        initHeroSlider();
    }
    
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
            
            // Remove active classes
            slides[currentIndex].classList.remove('active');
            if (dots[currentIndex]) dots[currentIndex].classList.remove('active');
            
            // Update current index
            currentIndex = index;
            
            // Add active classes
            slides[currentIndex].classList.add('active');
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
            
            // Reset animation flag after transition
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
        
        // Pause on hover
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', stopAutoSlide);
            hero.addEventListener('mouseleave', startAutoSlide);
        }
        
        // Start auto sliding
        startAutoSlide();
    }
});

// Mobile menu toggle function
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
// HOME PAGE CONTENT LOADER
// --------------------------------------------
function loadHomePageContent() {
    // Most Picked Grid
    const mostPickedGrid = document.getElementById('mostPickedGrid');
    if (mostPickedGrid) {
        const mostPicked = [
            { name: "Jaipur City Palace", location: "Jaipur, Rajasthan", tag: "Most Booked", img: "./images/most-1.jpg", price: "12,500" },
            { name: "Udaipur Lake Palace", location: "Udaipur, Rajasthan", tag: "Popular Choice", img: "./images/most-2.jpg", price: "18,500" },
            { name: "Somnath Beach Resort", location: "Somnath, Gujarat", tag: "Top Rated", img: "./images/most-3.jpg", price: "7,200" },
            { name: "Dwarka Divine Retreat", location: "Dwarka, Gujarat", tag: "Spiritual", img: "./images/most-4.jpg", price: "5,400" },
            { name: "Jaisalmer Desert Camp", location: "Jaisalmer, Rajasthan", tag: "Adventure", img: "./images/most-5.jpg", price: "8,900" }
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
    }
    
    // Packages Grid
    const packagesGrid = document.getElementById('packagesGrid');
    if (packagesGrid) {
        const packages = [
            { name: "Royal Rajasthan Circuit", duration: "7 Days / 6 Nights", locations: "Jaipur → Jodhpur → Udaipur → Jaisalmer", highlights: "Palace stays, Camel safari, Folk show", price: "45,000", img: "./images/package-1.jpg" },
            { name: "Gujarat Pilgrimage & Heritage", duration: "5 Days / 4 Nights", locations: "Ahmedabad → Somnath → Dwarka", highlights: "Temple visits, Beach resort, Local cuisine", price: "28,000", img: "./images/package-2.jpg" },
            { name: "Royal Lakes & Forts", duration: "6 Days / 5 Nights", locations: "Udaipur → Mount Abu → Jodhpur", highlights: "Lake cruise, Fort exploration, Luxury stays", price: "38,000", img: "./images/package-3.jpg" }
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
    }
    
    // Exclusives Grid
    const exclusivesGrid = document.getElementById('exclusivesGrid');
    if (exclusivesGrid) {
        const exclusives = [
            { img: "./images/image-1.png", name: "Jaipur", price: "5,500", loc: "Rajasthan" },
            { img: "./images/image-2.png", name: "Udaipur", price: "7,200", loc: "Rajasthan" },
            { img: "./images/image-3.png", name: "Jodhpur", price: "6,100", loc: "Rajasthan" },
            { img: "./images/image-4.png", name: "Ahmedabad", price: "4,200", loc: "Gujarat" },
            { img: "./images/image-5.png", name: "Dwarka", price: "3,900", loc: "Gujarat" },
            { img: "./images/image-6.png", name: "Somnath", price: "4,400", loc: "Gujarat" }
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
    }
    
    // Trending Grid
    const trendingGrid = document.getElementById('trendingGrid');
    if (trendingGrid) {
        const trending = [
            { img: "./images/dubai.png", name: "Rajasthan Desert Circuit", loc: "Jaisalmer - Jodhpur" },
            { img: "./images/new-york.png", name: "Gujarat Pilgrim Trail", loc: "Dwarka - Somnath" },
            { img: "./images/paris.png", name: "Lake Palace Romance", loc: "Udaipur - Mount Abu" },
            { img: "./images/new-delhi.png", name: "Royal Heritage Walk", loc: "Jaipur - Amer Fort" }
        ];
        
        trendingGrid.innerHTML = trending.map(tr => `
            <div class="trend-card" onclick="window.location.href='listing.html'">
                <img src="${tr.img}" onerror="this.src='https://placehold.co/300x200?text=Royal+Circuit'">
                <h3>${tr.name}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${tr.loc}</p>
            </div>
        `).join('');
    }
    
    // Stories Grid
    const storiesGrid = document.getElementById('storiesGrid');
    if (storiesGrid) {
        const stories = [
            { img: "./images/story-1.png", desc: "Experienced royal welcome at Jaipur's City Palace. The hospitality was unmatched!" },
            { img: "./images/story-2.png", desc: "Serenity at Somnath beach heritage resort. Sunset views are breathtaking." },
            { img: "./images/story-3.png", desc: "Magical desert camping in Jaisalmer under the starlit sky." }
        ];
        
        storiesGrid.innerHTML = stories.map(st => `
            <div class="story-card" onclick="window.location.href='listing.html'">
                <img src="${st.img}" onerror="this.src='https://placehold.co/400x300?text=Travel+Story'">
                <p>${st.desc}</p>
            </div>
        `).join('');
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
                    <p><i class="fas fa-crown"></i> ${prop.type === 'palace' ? 'Royal Palace' : prop.type === 'villa' ? 'Luxury Villa' : prop.type === 'heritage' ? 'Heritage Haveli' : 'Premium Resort'}</p>
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
                        ${property.amenities.map(a => `<span><i class="fas fa-check-circle"></i> ${a.charAt(0).toUpperCase() + a.slice(1)}</span>`).join('')}
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
// MOBILE MENU TOGGLE
// --------------------------------------------
function toggleMenu() {
    const nav = document.getElementById('navBar');
    if (nav) {
        nav.classList.toggle('hidemenu');
    }
}

// --------------------------------------------
// INITIALIZE ALL ON PAGE LOAD
// --------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    // Initialize common features
    initNavbarScroll();
    initScrollAnimations();
    
    // Hero slider only on homepage
    if (path.includes('index.html') || path === '/' || path === '') {
        initHeroSlider();
        loadHomePageContent();
    }
    
    // Listing page features
    if (path.includes('listing.html')) {
        renderProperties();
        setupFilters();
        setupPagination();
    }
    
    // House page features
    if (path.includes('house.html')) {
        setupHousePage();
    }
    
    // Register page features
    if (path.includes('register.html')) {
        setupRegisterPage();
    }
    
    // Booking page features
    if (path.includes('booking.html')) {
        loadBookingPage();
    }
});

// Export global functions
window.toggleMenu = toggleMenu;
window.openPopup = window.openPopup;
window.closePopup = window.closePopup;