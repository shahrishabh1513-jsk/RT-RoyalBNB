// script.js - Interactive RoyalBNB (INR Currency, Animations, Full Working)
document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect for house/listing pages
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
            } else if (text.match(/₹\s*\d+/)) return;
            else if (text.match(/\d+/) && !text.includes('₹')) {
                let num = parseFloat(text);
                if (!isNaN(num) && num < 50000) el.innerText = `₹ ${num}`;
            }
        });
    }
    setTimeout(localizeToINR, 200);

    // House page: Check Availability Alert (Indian currency style)
    if (window.location.pathname.includes('house.html')) {
        const checkForm = document.querySelector('.check-form');
        if (checkForm) {
            checkForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const guestVal = document.querySelector('.guets-field input')?.value || '2';
                alert(`✨ Royal Availability Check (₹ INR)\nGuests: ${guestVal}\nOur concierge will share best heritage rates.`);
            });
        }
        const contactHost = document.querySelector('.contact-host');
        if (contactHost) {
            contactHost.addEventListener('click', (e) => {
                e.preventDefault();
                alert("📞 Connect with Royal Host: +91 98765 01234 (India Support)");
            });
        }
    }

    // Register form popup logic
    if (window.location.pathname.includes('register.html')) {
        window.OpenSlide = function() {
            const pop = document.getElementById('popup');
            if (pop) pop.style.display = 'flex';
            else alert("Thank you! Your royal journey awaits. All prices in ₹ INR");
        };
        window.CloseSlide = function() {
            const pop = document.getElementById('popup');
            if (pop) pop.style.display = 'none';
        };
        const submitBtn = document.querySelector('.cta-button');
        if (submitBtn && submitBtn.innerText.includes('Submit')) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                OpenSlide();
            });
        }
    }

    // Listing page dynamic filter simulation
    if (window.location.pathname.includes('listing.html')) {
        const checkboxes = document.querySelectorAll('.filter input');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                console.log('Filter updated for heritage stays');
                // Optional: visual feedback
            });
        });
    }

    // Add animation on scroll for cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.pick-card, .exclusive-card, .trend-card, .story-card').forEach(el => observer.observe(el));
});