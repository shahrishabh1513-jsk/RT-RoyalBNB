/* script.js - RT RoyalBNB Complete Interactive Features */
// Unified JavaScript for all pages - Royal Theme with Full Functionality

// ========== GLOBAL VARIABLES ==========
let currentPage = 1;
const itemsPerPage = 6;
let activeFilters = { types: [], destinations: [], amenities: [] };

// ========== ROYAL PROPERTIES DATABASE (India Focus) ==========
const royalProperties = [
    { id: 1, name: "Jaipur City Palace Suite", type: "palace", dest: "rajasthan", amenities: ["pool", "wifi", "breakfast"], guests: 4, beds: 3, price: 12500, img: "images/image-s1.png", rating: 4.9, location: "Jaipur, Rajasthan" },
    { id: 2, name: "Udaipur Lake View Villa", type: "villa", dest: "rajasthan", amenities: ["pool", "spa", "wifi", "breakfast"], guests: 6, beds: 4, price: 18500, img: "images/image-s2.png", rating: 4.8, location: "Udaipur, Rajasthan" },
    { id: 3, name: "Jaisalmer Desert Palace", type: "palace", dest: "rajasthan", amenities: ["wifi", "breakfast"], guests: 3, beds: 2, price: 8900, img: "images/image-s3.png", rating: 4.7, location: "Jaisalmer, Rajasthan" },
    { id: 4, name: "Ahmedabad Pol Heritage", type: "heritage", dest: "gujarat", amenities: ["wifi", "breakfast"], guests: 2, beds: 1, price: 4500, img: "images/image-s4.png", rating: 4.5, location: "Ahmedabad, Gujarat" },
    { id: 5, name: "Somnath Sea View Resort", type: "resort", dest: "gujarat", amenities: ["pool", "wifi", "breakfast", "spa"], guests: 4, beds: 3, price: 7200, img: "images/image-s5.png", rating: 4.6, location: "Somnath, Gujarat" },
    { id: 6, name: "Dwarka Divine Stay", type: "heritage", dest: "gujarat", amenities: ["wifi", "breakfast"], guests: 3, beds: 2, price: 5400, img: "images/image-s6.png", rating: 4.7, location: "Dwarka, Gujarat" },
    { id: 7, name: "Jodhpur Blue City Haveli", type: "heritage", dest: "rajasthan", amenities: ["wifi", "breakfast", "pool"], guests: 4, beds: 3, price: 7800, img: "images/image-1.png", rating: 4.8, location: "Jodhpur, Rajasthan" },
    { id: 8, name: "Vadodara Laxmi Vilas Wing", type: "palace", dest: "gujarat", amenities: ["wifi", "breakfast", "spa"], guests: 5, beds: 3, price: 11200, img: "images/image-2.png", rating: 4.9, location: "Vadodara, Gujarat" },
    { id: 9, name: "Daman Beachfront Villa", type: "villa", dest: "daman", amenities: ["pool", "wifi", "breakfast"], guests: 6, beds: 4, price: 9500, img: "images/image-3.png", rating: 4.4, location: "Daman" },
    { id: 10, name: "Bhavnagar Nilambag Palace", type: "palace", dest: "gujarat", amenities: ["pool", "wifi", "breakfast", "spa"], guests: 4, beds: 3, price: 6800, img: "images/image-4.png", rating: 4.7, location: "Bhavnagar, Gujarat" },
    { id: 11, name: "Nathdwara Shrinathji Haveli", type: "heritage", dest: "rajasthan", amenities: ["wifi", "breakfast"], guests: 4, beds: 2, price: 6200, img: "images/image-5.png", rating: 4.9, location: "Nathdwara, Rajasthan" },
    { id: 12, name: "Gandhinagar Royal Retreat", type: "villa", dest: "gujarat", amenities: ["pool", "wifi", "breakfast"], guests: 5, beds: 3, price: 8300, img: "images/image-6.png", rating: 4.5, location: "Gandhinagar, Gujarat" },
    { id: 13, name: "Amer Fort Heritage Haveli", type: "heritage", dest: "rajasthan", amenities: ["wifi", "breakfast", "pool"], guests: 3, beds: 2, price: 7200, img: "images/image-7.png", rating: 4.8, location: "Jaipur, Rajasthan" },
    { id: 14, name: "Mandvi Beach Palace", type: "palace", dest: "gujarat", amenities: ["pool", "wifi", "breakfast", "spa"], guests: 5, beds: 3, price: 9800, img: "images/image-8.png", rating: 4.6, location: "Mandvi, Gujarat" },
    { id: 15, name: "Pushkar Royal Camp", type: "resort", dest: "rajasthan", amenities: ["pool", "wifi", "breakfast"], guests: 4, beds: 2, price: 6500, img: "images/image-9.png", rating: 4.7, location: "Pushkar, Rajasthan" }
];

// ========== MOST PICKED DESTINATIONS ==========
const mostPickedDestinations = [
    { name: "Jaipur City Palace", location: "Jaipur, Rajasthan", type: "Royal Palace", tag: "Most Booked", img: "images/most-1.jpg", price: "₹12,500" },
    { name: "Udaipur Lake Palace", location: "Udaipur, Rajasthan", type: "Heritage Hotel", tag: "Popular Choice", img: "images/most-2.jpg", price: "₹18,500" },
    { name: "Somnath Beach Resort", location: "Somnath, Gujarat", type: "Sea View", tag: "Top Rated", img: "images/most-3.jpg", price: "₹7,200" },
    { name: "Dwarka Divine Retreat", location: "Dwarka, Gujarat", type: "Temple Town", tag: "Spiritual", img: "images/most-4.jpg", price: "₹5,400" },
    { name: "Jaisalmer Desert Camp", location: "Jaisalmer, Rajasthan", type: "Desert Safari", tag: "Adventure", img: "images/most-5.jpg", price: "₹8,900" },
    { name: "Ahmedabad Heritage Walk", location: "Ahmedabad, Gujarat", type: "Pol House", tag: "Cultural", img: "images/most-6.jpg", price: "₹4,200" },
    { name: "Jodhpur Blue City", location: "Jodhpur, Rajasthan", type: "Haveli Stay", tag: "Instagrammable", img: "images/most-7.jpg", price: "₹7,800" },
    { name: "Daman Beach Villa", location: "Daman", type: "Beachfront", tag: "Budget Royal", img: "images/most-8.jpg", price: "₹9,500" }
];

// ========== EXCLUSIVE DESTINATIONS ==========
const exclusiveDestinations = [
    { img: "images/image-1.png", name: "Jaipur", price: "₹5,500", loc: "Rajasthan" },
    { img: "images/image-2.png", name: "Udaipur", price: "₹7,200", loc: "Rajasthan" },
    { img: "images/image-3.png", name: "Jodhpur", price: "₹6,100", loc: "Rajasthan" },
    { img: "images/image-4.png", name: "Ahmedabad", price: "₹4,200", loc: "Gujarat" },
    { img: "images/image-5.png", name: "Dwarka", price: "₹3,900", loc: "Gujarat" },
    { img: "images/image-6.png", name: "Somnath", price: "₹4,400", loc: "Gujarat" }
];

// ========== TRENDING CIRCUITS ==========
const trendingCircuits = [
    { img: "images/dubai.png", name: "Rajasthan Desert Circuit", loc: "Jaisalmer - Jodhpur" },
    { img: "images/new-york.png", name: "Gujarat Pilgrim Trail", loc: "Dwarka - Somnath" },
    { img: "images/paris.png", name: "Lake Palace Romance", loc: "Udaipur - Mount Abu" },
    { img: "images/new-delhi.png", name: "Royal Heritage Walk", loc: "Jaipur - Amer Fort" }
];

// ========== TRAVELER STORIES ==========
const travelerStories = [
    { img: "images/story-1.png", desc: "Experienced royal welcome at Jaipur's City Palace. The hospitality was unmatched!" },
    { img: "images/story-2.png", desc: "Serenity at Somnath beach heritage resort. Sunset views are breathtaking." },
    { img: "images/story-3.png", desc: "Magical desert camping in Jaisalmer under the starlit sky." }
];

// ========== HELPER FUNCTIONS ==========
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
    if (hasHalfStar) stars += '<i class="fas fa-star-half-alt"></i>';
    for (let i = stars.length / 2; i < 5; i++) stars += '<i class="far fa-star"></i>';
    return stars;
}

// ========== PAGE SPECIFIC INITIALIZATIONS ==========
document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const nav = document.getElementById('navBar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60 && nav && !nav.classList.contains('navBar-white')) {
            nav.style.background = '#FFFBF5';
            nav.style.boxShadow = '0 4px 18px rgba(0,0,0,0.04)';
        } else if (nav && !nav.classList.contains('navBar-white')) {
            nav.style.background = 'rgba(255, 251, 245, 0.96)';
        }
    });

    // Currency localizer (convert any $ to INR)
    function localizeToINR() {
        const priceElements = document.querySelectorAll('.pick-price, .price, .house-price h4, .small-details h4');
        priceElements.forEach(el => {
            let text = el.innerText;
            if (text.includes('$')) {
                let dollarVal = parseFloat(text.replace('$', '').replace('/ night', '').trim());
                if (!isNaN(dollarVal)) {
                    let inr = Math.round(dollarVal * 83);
                    el.innerText = `₹ ${inr} / night`;
                }
            }
        });
    }
    setTimeout(localizeToINR, 200);

    // Add animation on scroll for cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeUp 0.6s ease forwards';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.pick-card, .exclusive-card, .trend-card, .story-card, .house').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Load content based on current page
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path === '/' || path === '') {
        loadHomePageContent();
    }
    
    if (path.includes('listing.html')) {
        loadListingPage();
        setupFilters();
        setupPagination();
    }
    
    if (path.includes('house.html')) {
        setupHousePage();
    }
    
    if (path.includes('register.html')) {
        setupRegisterPage();
    }
});

// ========== HOME PAGE CONTENT LOADER ==========
function loadHomePageContent() {
    // Load Most Picked Grid
    const mostPickedGrid = document.getElementById('mostPickedGrid');
    if (mostPickedGrid) {
        mostPickedGrid.innerHTML = mostPickedDestinations.map(item => `
            <div class="pick-card" onclick="window.location.href='house.html'">
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
    
    // Load Exclusives Grid
    const exclusivesGrid = document.getElementById('exclusivesGrid');
    if (exclusivesGrid) {
        exclusivesGrid.innerHTML = exclusiveDestinations.map(ex => `
            <div class="exclusive-card">
                <img src="${ex.img}" onerror="this.src='https://placehold.co/400x300?text=Heritage+Destination'">
                <div class="exclusive-info">
                    <h3>${ex.name}</h3>
                    <p>${ex.loc}</p>
                    <span class="price">${ex.price}</span>
                </div>
            </div>
        `).join('');
    }
    
    // Load Trending Grid
    const trendingGrid = document.getElementById('trendingGrid');
    if (trendingGrid) {
        trendingGrid.innerHTML = trendingCircuits.map(tr => `
            <div class="trend-card">
                <img src="${tr.img}" onerror="this.src='https://placehold.co/300x200?text=Royal+Circuit'">
                <h3>${tr.name}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${tr.loc}</p>
            </div>
        `).join('');
    }
    
    // Load Stories Grid
    const storiesGrid = document.getElementById('storiesGrid');
    if (storiesGrid) {
        storiesGrid.innerHTML = travelerStories.map(st => `
            <div class="story-card">
                <img src="${st.img}" onerror="this.src='https://placehold.co/400x300?text=Travel+Story'">
                <p>${st.desc}</p>
            </div>
        `).join('');
    }
}

// ========== LISTING PAGE FUNCTIONS ==========
function loadListingPage() {
    renderProperties();
}

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
    
    container.innerHTML = `<p><i class="fas fa-building"></i> ${filtered.length}+ Royal Options</p>
                           <h1>Recommended Heritage Properties in India</h1>`;
    
    if (paginated.length === 0) {
        container.innerHTML += `<div class="no-results"><i class="fas fa-search"></i> No matching properties found. Try different filters!</div>`;
        return;
    }
    
    paginated.forEach(prop => {
        const stars = generateStarRating(prop.rating);
        container.innerHTML += `
            <div class="house" data-id="${prop.id}" onclick="window.location.href='house.html'">
                <div class="house-img">
                    <img src="${prop.img}" onerror="this.src='https://placehold.co/400x300?text=Heritage+Property'" alt="${prop.name}">
                </div>
                <div class="house-info">
                    <p><i class="fas fa-crown"></i> ${prop.type === 'palace' ? 'Royal Palace' : prop.type === 'villa' ? 'Luxury Villa' : prop.type === 'heritage' ? 'Heritage Haveli' : 'Premium Resort'}</p>
                    <h3>${prop.name}</h3>
                    <p>${prop.guests} Guests / ${prop.beds} Beds / WiFi / Kitchenette</p>
                    <div class="rating">${stars}</div>
                    <div class="house-price">
                        <p><i class="fas fa-map-pin"></i> ${prop.location}</p>
                        <h4>₹ ${prop.price.toLocaleString('en-IN')} <span>/ night</span></h4>
                    </div>
                </div>
            </div>
        `;
    });
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
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(royalProperties.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderProperties();
            }
        });
    }
}

// ========== HOUSE PAGE FUNCTIONS ==========
function setupHousePage() {
    const availabilityForm = document.getElementById('availabilityForm');
    if (availabilityForm) {
        availabilityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const checkin = document.getElementById('checkinDate')?.value || 'Not selected';
            const checkout = document.getElementById('checkoutDate')?.value || 'Not selected';
            const guests = document.getElementById('guestCount')?.value || 2;
            alert(`✨ Royal Availability Check (₹ INR)\n📅 Check-in: ${checkin}\n📅 Check-out: ${checkout}\n👥 Guests: ${guests}\n\nOur royal concierge will contact you with best heritage rates.`);
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

// ========== REGISTER PAGE FUNCTIONS ==========
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
    
    // Close popup when clicking outside
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) closePopup();
        });
    }
}

// ========== MOBILE MENU TOGGLE ==========
function toggleMenu() {
    const nav = document.getElementById('navBar');
    if (nav) {
        nav.classList.toggle('hidemenu');
    }
}

// ========== EXPORT FOR GLOBAL USE ==========
window.toggleMenu = toggleMenu;
window.openPopup = window.openPopup;
window.closePopup = window.closePopup;