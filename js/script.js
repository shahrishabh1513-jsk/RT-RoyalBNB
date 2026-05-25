// js/script.js - RT RoyalBNB Interactive Features
function toggleMenu() { document.getElementById('navBar')?.classList.toggle('hidemenu'); }

// Hero Slider
if(document.getElementById('heroSection')) {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelector('.hero-dots');
    if(slides.length) {
        slides.forEach((_, i) => { let dot = document.createElement('div'); dot.classList.add('dot'); if(i === 0) dot.classList.add('active'); dot.addEventListener('click', () => goToSlide(i)); dots.appendChild(dot); });
        function goToSlide(n) { slides.forEach(s => s.classList.remove('active')); document.querySelectorAll('.dot').forEach(d => d.classList.remove('active')); slides[n].classList.add('active'); document.querySelectorAll('.dot')[n].classList.add('active'); currentSlide = n; }
        function nextSlide() { let n = (currentSlide + 1) % slides.length; goToSlide(n); }
        setInterval(nextSlide, 5000);
        document.getElementById('prevSlide')?.addEventListener('click', () => { let n = (currentSlide - 1 + slides.length) % slides.length; goToSlide(n); });
        document.getElementById('nextSlide')?.addEventListener('click', () => { let n = (currentSlide + 1) % slides.length; goToSlide(n); });
    }
}

// Load Homepage Content
if(window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
    document.addEventListener('DOMContentLoaded', () => {
        const mostPicked = [{name:"Jaipur City Palace",location:"Jaipur",tag:"Most Booked",img:"./images/most-1.jpg",price:"12,500"},{name:"Udaipur Lake Palace",location:"Udaipur",tag:"Popular",img:"./images/most-2.jpg",price:"18,500"},{name:"Somnath Beach Resort",location:"Somnath",tag:"Top Rated",img:"./images/most-3.jpg",price:"7,200"},{name:"Dwarka Divine",location:"Dwarka",tag:"Spiritual",img:"./images/most-4.jpg",price:"5,400"},{name:"Jaisalmer Camp",location:"Jaisalmer",tag:"Adventure",img:"./images/most-5.jpg",price:"8,900"}];
        document.getElementById('mostPickedGrid').innerHTML = mostPicked.map(i => `<div class="pick-card" onclick="location.href='listing.html'"><div class="pick-img"><img src="${i.img}"></div><div class="pick-badge">${i.tag}</div><div class="pick-info"><h3>${i.name}</h3><p>${i.location}</p><div class="pick-price">${i.price} <span>/ night</span></div></div></div>`).join('');
        const packages = [{name:"Royal Rajasthan Circuit",duration:"7 Days",locations:"Jaipur → Jodhpur → Udaipur",highlights:"Palace stays, Camel safari",price:"45,000",img:"./images/package-1.jpg"},{name:"Gujarat Pilgrimage",duration:"5 Days",locations:"Ahmedabad → Somnath → Dwarka",highlights:"Temple visits, Beach resort",price:"28,000",img:"./images/package-2.jpg"},{name:"Royal Lakes & Forts",duration:"6 Days",locations:"Udaipur → Mount Abu",highlights:"Lake cruise, Forts",price:"38,000",img:"./images/package-3.jpg"}];
        document.getElementById('packagesGrid').innerHTML = packages.map(p => `<div class="package-card" onclick="location.href='listing.html'"><div class="package-img"><img src="${p.img}"></div><div class="package-info"><h3>${p.name}</h3><p><i class="fas fa-clock"></i> ${p.duration}</p><p><i class="fas fa-map-marker-alt"></i> ${p.locations}</p><div class="package-price">${p.price} <span>/ person</span></div></div></div>`).join('');
        const exclusives = [{img:"./images/image-1.png",name:"Jaipur",price:"5,500",loc:"Rajasthan"},{img:"./images/image-2.png",name:"Udaipur",price:"7,200",loc:"Rajasthan"},{img:"./images/image-3.png",name:"Jodhpur",price:"6,100",loc:"Rajasthan"},{img:"./images/image-4.png",name:"Ahmedabad",price:"4,200",loc:"Gujarat"}];
        document.getElementById('exclusivesGrid').innerHTML = exclusives.map(e => `<div class="exclusive-card"><img src="${e.img}"><div class="exclusive-info"><h3>${e.name}</h3><p>${e.loc}</p><span class="price">${e.price}</span></div></div>`).join('');
        const trending = [{img:"./images/dubai.png",name:"Rajasthan Circuit",loc:"Jaisalmer - Jodhpur"},{img:"./images/new-york.png",name:"Gujarat Trail",loc:"Dwarka - Somnath"}];
        document.getElementById('trendingGrid').innerHTML = trending.map(t => `<div class="trend-card"><img src="${t.img}"><h3>${t.name}</h3><p>${t.loc}</p></div>`).join('');
        const stories = [{img:"./images/story-1.png",desc:"Royal welcome at Jaipur!"},{img:"./images/story-2.png",desc:"Serenity at Somnath beach."},{img:"./images/story-3.png",desc:"Desert camping in Jaisalmer."}];
        document.getElementById('storiesGrid').innerHTML = stories.map(s => `<div class="story-card"><img src="${s.img}"><p>${s.desc}</p></div>`).join('');
    });
}

// Scroll animations
const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if(e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; observer.unobserve(e.target); } }); }, { threshold: 0.1 });
document.querySelectorAll('.pick-card, .package-card, .exclusive-card, .about-royal-section, .owner-cta').forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(30px)'; el.style.transition = 'opacity 0.6s, transform 0.6s'; observer.observe(el); });

window.toggleMenu = toggleMenu;