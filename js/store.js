(function (w) {
    'use strict';
    var KEY = 'rtbnb2_db';

    /* ------------------------------------------------ catalogue ---- */
    var LOCATIONS = [
        {
            id: 'udaipur', name: 'Udaipur', state: 'Rajasthan', tag: 'City of Lakes', best: 'Oct - Mar', airport: 'Maharana Pratap Airport, 24 km',
            blurb: 'Palaces mirrored in Lake Pichola, marble ghats and sunset boat rides - the most romantic city in India.'
        },
        {
            id: 'jaisalmer', name: 'Jaisalmer', state: 'Rajasthan', tag: 'The Golden City', best: 'Nov - Feb', airport: 'Jaisalmer Airport, 14 km',
            blurb: 'A living sandstone fort, havelis carved like lace and star-lit nights on the Sam sand dunes.'
        },
        {
            id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', tag: 'The Pink City', best: 'Oct - Mar', airport: 'Jaipur International Airport, 12 km',
            blurb: 'Hawa Mahal, Amer Fort and bustling bazaars - royal heritage wrapped in rose-pink sandstone.'
        },
        {
            id: 'jodhpur', name: 'Jodhpur', state: 'Rajasthan', tag: 'The Blue City', best: 'Oct - Mar', airport: 'Jodhpur Airport, 5 km',
            blurb: 'Mehrangarh Fort towers over a sea of indigo houses, spice markets and rooftop cafes.'
        },
        {
            id: 'dwarka', name: 'Dwarka', state: 'Gujarat', tag: 'The Sacred Coast', best: 'Oct - Mar', airport: 'Jamnagar Airport, 137 km',
            blurb: 'Dwarkadhish Temple, the Gomti ghats and Arabian Sea sunsets - a calm, spiritual coastal escape.'
        }
    ];

    var AMENITIES = {
        wifi: { n: 'Free Wi-Fi', e: '\uD83D\uDCF6', i: 'wifi' },
        tv: { n: 'Television', e: '\uD83D\uDCFA', i: 'tv' },
        ac: { n: 'Air Conditioner', e: '\u2744\uFE0F', i: 'wind' },
        heater: { n: 'Room Heater', e: '\uD83D\uDD25', i: 'sun' },
        hotwater: { n: 'Hot Water 24/7', e: '\uD83D\uDEBF', i: 'droplet' },
        spa: { n: 'Spa & Wellness', e: '\uD83D\uDC86', i: 'leaf' },
        laundry: { n: 'Laundry Service', e: '\uD83E\uDDFA', i: 'shirt' },
        parking: { n: 'Free Parking', e: '\uD83D\uDE97', i: 'car' },
        food: { n: 'Restaurant & In-room Dining', e: '\uD83C\uDF7D\uFE0F', i: 'coffee' },
        service: { n: '24/7 Customer Service', e: '\uD83D\uDECE\uFE0F', i: 'headphones' },
        pool: { n: 'Swimming Pool', e: '\uD83C\uDFCA', i: 'waves' },
        breakfast: { n: 'Breakfast Included', e: '\uD83E\uDD50', i: 'coffee' },
        shuttle: { n: 'Airport Pickup', e: '\u2708\uFE0F', i: 'plane' }
    };

    // [loc, name, type, stars, rating, reviews, priceFrom, tagline, area, nearby, amenities, photos, rooms]
    // rooms: [category, name, price factor, adults, children, beds, sqft, qty, bed type]
    var HOTELS = [
        ['udaipur', 'Lake Pichola Royale', 'Heritage Palace', 5, 4.8, 1264, 9500, 'A palace stay on the shore of Lake Pichola', 'Lake Pichola Ghats',
            [['Lake Pichola Jetty', 0.3], ['City Palace', 0.6], ['Jag Mandir', 1.2], ['Saheliyon Ki Bari', 3.4], ['Airport', 24]],
            ['wifi', 'tv', 'ac', 'heater', 'hotwater', 'spa', 'laundry', 'parking', 'food', 'service', 'pool', 'breakfast', 'shuttle'], ['p11', 'p09', 'p17', 'p15'],
            [['Deluxe Room', 'Lake View Deluxe Room', 1, 2, 1, 'King', 380, 8], ['Suite', 'Maharana Royal Suite', 1.8, 3, 2, 'King + Sofa bed', 720, 3]]],
        ['udaipur', 'Rang Mahal Haveli', 'Boutique Haveli', 4, 4.6, 842, 5200, 'Painted courtyards and rooftop lake views', 'Gangaur Ghat',
            [['Gangaur Ghat', 0.2], ['City Palace', 0.9], ['Jagdish Temple', 0.7], ['Fateh Sagar Lake', 3.1], ['Airport', 23]],
            ['wifi', 'tv', 'ac', 'hotwater', 'laundry', 'food', 'service', 'breakfast'], ['v09', 'p12', 'p16', 'p08'],
            [['Heritage Room', 'Courtyard Heritage Room', 1, 2, 1, 'Queen', 290, 6], ['Suite', 'Haveli Terrace Suite', 1.7, 3, 1, 'King', 480, 3]]],
        ['udaipur', 'Aravali Sunset Retreat', 'Hill Resort', 4, 4.5, 611, 6800, 'Resort living above the Aravali hills', 'Sajjangarh Road',
            [['Sajjangarh Monsoon Palace', 4], ['Fateh Sagar Lake', 5.2], ['City Palace', 6.5], ['Eklingji Temple', 22], ['Airport', 20]],
            ['wifi', 'tv', 'ac', 'heater', 'hotwater', 'spa', 'parking', 'food', 'service', 'pool', 'breakfast'], ['p05', 'v05', 'p17', 'p16'],
            [['Premium Room', 'Hill View Premium Room', 1, 2, 2, 'King', 420, 10], ['Villa', 'Pool Villa', 1.9, 4, 2, '2 Queen', 900, 4]]],
        ['udaipur', 'Gangaur Courtyard Inn', 'Budget Heritage', 3, 4.2, 405, 2800, 'Simple, clean rooms right in the old city', 'Old City',
            [['Jagdish Temple', 0.4], ['City Palace', 0.8], ['Lake Pichola Jetty', 0.7], ['Bagore Ki Haveli', 0.5], ['Airport', 25]],
            ['wifi', 'tv', 'ac', 'hotwater', 'laundry', 'service'], ['p14', 'v14', 'p03', 'p15'],
            [['Standard Room', 'Standard Room', 1, 2, 1, 'Double', 240, 9], ['Deluxe Room', 'Deluxe Lake-lane Room', 1.5, 3, 1, 'Queen', 320, 5]]],

        ['jaisalmer', 'Golden Fort Heritage', 'Heritage Hotel', 5, 4.7, 936, 8900, 'Wake up inside the walls of the Golden Fort', 'Jaisalmer Fort',
            [['Jaisalmer Fort', 0.4], ['Patwon Ki Haveli', 0.9], ['Gadisar Lake', 1.8], ['Sam Sand Dunes', 41], ['Airport', 14]],
            ['wifi', 'tv', 'ac', 'heater', 'hotwater', 'spa', 'laundry', 'parking', 'food', 'service', 'breakfast', 'shuttle'], ['p10', 'p04', 'p18', 'p16'],
            [['Deluxe Room', 'Fort View Deluxe Room', 1, 2, 1, 'King', 360, 7], ['Suite', 'Maharawal Suite', 1.8, 3, 2, 'King', 650, 3]]],
        ['jaisalmer', 'Sam Dunes Desert Camp', 'Desert Resort', 4, 4.6, 758, 6200, 'Luxury tents with a front-row seat to the dunes', 'Sam Sand Dunes',
            [['Sam Sand Dunes', 1.5], ['Camel Safari Point', 0.5], ['Desert National Park', 8], ['Jaisalmer Fort', 41], ['Airport', 45]],
            ['wifi', 'ac', 'heater', 'hotwater', 'food', 'service', 'pool', 'breakfast', 'parking'], ['p13', 'v13', 'p17', 'p16'],
            [['Luxury Tent', 'Luxury Swiss Tent', 1, 2, 1, 'King', 330, 12], ['Royal Tent', 'Royal Dune Tent Suite', 1.7, 3, 2, 'King + Sofa bed', 520, 5]]],
        ['jaisalmer', 'Patwa Haveli Stay', 'Boutique Haveli', 3, 4.3, 512, 3200, 'Carved sandstone balconies, fort-side location', 'Old Fort Road',
            [['Patwon Ki Haveli', 0.2], ['Gadisar Lake', 1.1], ['Jaisalmer Fort', 0.6], ['Nathmal Ki Haveli', 0.4], ['Airport', 13]],
            ['wifi', 'tv', 'ac', 'heater', 'hotwater', 'laundry', 'food', 'service'], ['v06', 'p06', 'p14', 'p15'],
            [['Standard Room', 'Standard Haveli Room', 1, 2, 1, 'Double', 250, 8], ['Deluxe Room', 'Deluxe Balcony Room', 1.5, 3, 1, 'Queen', 330, 4]]],

        ['jaipur', 'Amer Crown Palace', 'Heritage Palace', 5, 4.8, 1410, 10500, 'A royal address below Amer Fort', 'Amer Road',
            [['Amer Fort', 3], ['Jal Mahal', 5.2], ['City Palace', 9], ['Hawa Mahal', 10], ['Airport', 17]],
            ['wifi', 'tv', 'ac', 'heater', 'hotwater', 'spa', 'laundry', 'parking', 'food', 'service', 'pool', 'breakfast', 'shuttle'], ['p09', 'p11', 'p17', 'p18'],
            [['Deluxe Room', 'Palace Deluxe Room', 1, 2, 1, 'King', 400, 12], ['Suite', 'Maharani Royal Suite', 1.8, 4, 2, 'King + 2 Single', 800, 4]]],
        ['jaipur', 'Pink City Haveli', 'Boutique Haveli', 4, 4.5, 880, 4900, 'Steps from Hawa Mahal and the bazaars', 'Walled City',
            [['Hawa Mahal', 0.8], ['City Palace', 1], ['Jantar Mantar', 1.2], ['Johari Bazaar', 0.4], ['Airport', 13]],
            ['wifi', 'tv', 'ac', 'hotwater', 'laundry', 'food', 'service', 'breakfast', 'parking'], ['v03', 'p03', 'p15', 'p16'],
            [['Heritage Room', 'Heritage Pink Room', 1, 2, 1, 'Queen', 300, 8], ['Suite', 'Rajputana Suite', 1.7, 3, 2, 'King', 520, 3]]],
        ['jaipur', 'Jantar Residency', 'City Hotel', 4, 4.4, 702, 4200, 'Modern comfort in the heart of the city', 'MI Road',
            [['Jantar Mantar', 1.5], ['Albert Hall Museum', 1.1], ['Hawa Mahal', 2.2], ['Birla Mandir', 3], ['Airport', 11]],
            ['wifi', 'tv', 'ac', 'heater', 'hotwater', 'laundry', 'parking', 'food', 'service', 'breakfast'], ['p07', 'v07', 'p18', 'p15'],
            [['Deluxe Room', 'Executive Deluxe Room', 1, 2, 1, 'King', 330, 14], ['Premium Suite', 'Premium Family Suite', 1.6, 4, 2, '2 Queen', 560, 4]]],
        ['jaipur', 'Nahargarh View Boutique', 'Budget Boutique', 3, 4.3, 390, 3100, 'Quiet rooms with fort-lit evening views', 'Brahmpuri',
            [['Nahargarh Fort', 4], ['Hawa Mahal', 2.5], ['City Palace', 2.2], ['Gaitore Chhatris', 3.5], ['Airport', 14]],
            ['wifi', 'tv', 'ac', 'hotwater', 'service', 'breakfast'], ['p06', 'v06', 'p14', 'p16'],
            [['Standard Room', 'Standard Room', 1, 2, 1, 'Double', 250, 8], ['Deluxe Room', 'Deluxe Fort View Room', 1.5, 3, 1, 'Queen', 320, 4]]],

        ['jodhpur', 'Mehrangarh Blue Palace', 'Heritage Palace', 5, 4.9, 1180, 11800, 'Sleep beneath the great fort of the Blue City', 'Mehrangarh Hill',
            [['Mehrangarh Fort', 0.5], ['Jaswant Thada', 1.4], ['Clock Tower & Sardar Market', 1.8], ['Umaid Bhawan Palace', 4.5], ['Airport', 6]],
            ['wifi', 'tv', 'ac', 'heater', 'hotwater', 'spa', 'laundry', 'parking', 'food', 'service', 'pool', 'breakfast', 'shuttle'], ['p13', 'p02', 'p17', 'p18'],
            [['Deluxe Room', 'Fort View Deluxe Room', 1, 2, 1, 'King', 390, 8], ['Suite', 'Maharaja Blue Suite', 1.8, 3, 2, 'King', 740, 3]]],
        ['jodhpur', 'Blue City Rooftop Haveli', 'Boutique Haveli', 4, 4.5, 805, 4500, 'Indigo lanes, rooftop dinners, fort views', 'Brahmpuri',
            [['Clock Tower', 0.4], ['Mehrangarh Fort', 0.9], ['Toorji Ka Jhalra', 0.5], ['Jaswant Thada', 2], ['Airport', 6]],
            ['wifi', 'tv', 'ac', 'hotwater', 'laundry', 'food', 'service', 'breakfast'], ['v02', 'p02', 'p15', 'p16'],
            [['Heritage Room', 'Blue Heritage Room', 1, 2, 1, 'Queen', 300, 7], ['Suite', 'Rooftop Terrace Suite', 1.7, 3, 1, 'King', 480, 3]]],
        ['jodhpur', 'Umaid Garden Retreat', 'Garden Resort', 4, 4.4, 640, 5600, 'Lawns, a pool and calm just outside the old city', 'Umaid Road',
            [['Umaid Bhawan Palace', 1.8], ['Mehrangarh Fort', 5], ['Mandore Gardens', 9], ['Clock Tower', 4.2], ['Airport', 4]],
            ['wifi', 'tv', 'ac', 'heater', 'hotwater', 'spa', 'parking', 'food', 'service', 'pool', 'breakfast'], ['p08', 'v08', 'p17', 'p15'],
            [['Premium Room', 'Garden Premium Room', 1, 2, 2, 'King', 400, 10], ['Villa', 'Private Garden Villa', 1.8, 4, 2, '2 Queen', 820, 4]]],

        ['dwarka', 'Dwarkadhish Grand', 'Temple-side Hotel', 4, 4.5, 960, 4800, 'Walk to the Dwarkadhish Temple for morning aarti', 'Temple Road',
            [['Dwarkadhish Temple', 0.5], ['Gomti Ghat', 0.7], ['Rukmini Devi Temple', 2], ['Nageshwar Jyotirlinga', 17], ['Bet Dwarka Jetty (Okha)', 32]],
            ['wifi', 'tv', 'ac', 'hotwater', 'laundry', 'parking', 'food', 'service', 'breakfast'], ['p01', 'v01', 'p15', 'p16'],
            [['Deluxe Room', 'Deluxe Temple View Room', 1, 2, 1, 'King', 330, 12], ['Family Suite', 'Family Suite', 1.6, 4, 2, '2 Queen', 560, 5]]],
        ['dwarka', 'Gomti Seaview Resort', 'Beach Resort', 4, 4.6, 702, 5900, 'Sea-facing rooms and sunset prayers at the shore', 'Dwarka Beach',
            [['Dwarka Beach', 0.3], ['Dwarkadhish Temple', 1.5], ['Gomti Ghat', 1.9], ['Nageshwar Jyotirlinga', 18], ['Bet Dwarka Jetty (Okha)', 30]],
            ['wifi', 'tv', 'ac', 'hotwater', 'spa', 'parking', 'food', 'service', 'pool', 'breakfast'], ['p10', 'v10', 'p17', 'p16'],
            [['Sea View Room', 'Sea View Deluxe Room', 1, 2, 1, 'King', 360, 10], ['Suite', 'Arabian Sea Suite', 1.8, 3, 2, 'King', 620, 4]]],
        ['dwarka', 'Sudama Setu Stay', 'Budget Stay', 3, 4.2, 355, 2400, 'Honest rooms near the ghats for pilgrims & backpackers', 'Sudama Setu',
            [['Gomti Ghat', 0.4], ['Dwarkadhish Temple', 0.9], ['Sudama Setu', 0.3], ['Dwarka Beach', 1.8], ['Bet Dwarka Jetty (Okha)', 32]],
            ['wifi', 'tv', 'ac', 'hotwater', 'service'], ['p14', 'v14', 'p03', 'p15'],
            [['Standard Room', 'Standard Room', 1, 2, 1, 'Double', 230, 10], ['Deluxe Room', 'Deluxe Room', 1.5, 3, 1, 'Queen', 300, 6]]]
    ];

    var COUPONS = [
        { code: 'RT10', type: 'pct', value: 10, min: 3000, max: 3000, desc: '10% off (max \u20B93,000) on stays above \u20B93,000' },
        { code: 'ROYAL15', type: 'pct', value: 15, min: 10000, max: 5000, desc: '15% off (max \u20B95,000) on stays above \u20B910,000' },
        { code: 'FIRSTSTAY', type: 'flat', value: 500, min: 2000, max: 500, desc: 'Flat \u20B9500 off your first stay' }
    ];

    var REVIEW_TEXT = [
        'Stunning property and the staff treated us like royalty. The location made sightseeing effortless.',
        'Spotless rooms, great breakfast and a very helpful front desk. Would happily stay again.',
        'Loved the heritage feel. Rooms were comfortable and the sunset from the terrace was unforgettable.',
        'Excellent value for money. Friendly team, quick check-in and everything was as described.',
        'Perfect for our family trip - kids loved it and the food was delicious.',
        'Beautiful interiors and a very peaceful stay. The local recommendations were spot on.'
    ];
    var NAMES = ['Aarav Shah', 'Rohan Mehta', 'Karan Patel', 'Neha Joshi', 'Priya Nair', 'Dhruv Trivedi', 'Isha Kapoor', 'Vivek Rao'];

    /* ---------------------------------------------------- utils ---- */
    function pad(n) { return String(n).padStart(2, '0'); }
    function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
    function addDays(s, n) { var d = new Date(s + 'T12:00:00'); d.setDate(d.getDate() + n); return ymd(d); }
    function today() { return ymd(new Date()); }
    function nowISO() { return new Date().toISOString(); }
    function diffDays(a, b) { return Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000); }
    function hash(str) {
        var h1 = 0xdeadbeef, h2 = 0x41c6ce57;
        for (var i = 0; i < str.length; i++) { var c = str.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return 'rt$' + (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
    }
    function ph(n) { return 'images/photos/' + n + '.jpg'; }

    /* -------------------------------------------------- seeding ---- */
    function seed() {
        var D = { users: [], admins: [], hotels: [], rooms: [], bookings: [], payments: [], reviews: [], queries: [], subscribers: [], coupons: COUPONS.slice() };
        D.admins.push({ id: 1, name: 'admin', password: 'admin123', fullName: 'RT Admin' });

        var pw = hash('Test@123');
        var people = [['Aarav Shah', 'aarav@example.com', '9876543210', 'Ahmedabad'], ['Rohan Mehta', 'rohan@example.com', '9825012345', 'Surat'],
        ['Karan Patel', 'karan@example.com', '9898012345', 'Vadodara'], ['Neha Joshi', 'neha@example.com', '9712345678', 'Mumbai'],
        ['Priya Nair', 'priya@example.com', '9123456780', 'Pune'], ['Dhruv Trivedi', 'dhruv@example.com', '9012345678', 'Rajkot'],
        ['Isha Kapoor', 'isha@example.com', '9988776655', 'Delhi'], ['Vivek Rao', 'vivek@example.com', '9090909090', 'Bengaluru']];
        people.forEach(function (p, i) {
            D.users.push({ id: i + 1, name: p[0], email: p[1], phone: p[2], city: p[3], password: pw, status: 'active', joined: addDays(today(), -(200 - i * 22)), wishlist: [] });
        });

        var rid = 1;
        HOTELS.forEach(function (h, i) {
            var loc = LOCATIONS.filter(function (l) { return l.id === h[0]; })[0];
            var hid = i + 1;
            var imgs = h[11].map(ph);
            D.hotels.push({
                id: hid, locationId: h[0], name: h[1], type: h[2], stars: h[3], rating: h[4], reviewsCount: h[5], priceFrom: h[6],
                tagline: h[7], area: h[8], city: loc.name, address: h[8] + ', ' + loc.name + ', ' + loc.state,
                description: h[1] + ' is a ' + h[3] + '-star ' + h[2].toLowerCase() + ' in ' + h[8] + ', ' + loc.name + '. ' + h[7] + '. Guests enjoy warm ' + loc.state + ' hospitality, comfortable rooms and easy access to the best of ' + loc.name + ' - all bookable instantly with free cancellation up to 48 hours before check-in.',
                nearby: h[9].map(function (n) { return { name: n[0], km: n[1] }; }),
                amenities: h[10], images: imgs, featured: h[4] >= 4.6 ? 1 : 0, status: 'active',
                checkIn: '12:00 PM', checkOut: '11:00 AM', policy: 'Free cancellation up to 48 hours before check-in. Valid photo ID required at check-in. Pets not allowed.'
            });
            h[12].forEach(function (r, k) {
                var price = Math.round(h[6] * r[2] / 100) * 100;
                var extra = k === 0 ? ['wifi', 'tv', 'ac', 'hotwater'] : ['wifi', 'tv', 'ac', 'hotwater', 'breakfast'];
                var ramen = extra.concat(k === 1 && h[10].indexOf('spa') >= 0 ? ['spa'] : []);
                D.rooms.push({
                    id: rid++, hotelId: hid, category: r[0], name: r[1], price: price, adults: r[3], children: r[4], bed: r[5], size: r[6],
                    quantity: r[7], amenities: ramen, images: [imgs[k], imgs[(k + 1) % imgs.length], imgs[(k + 2) % imgs.length]], status: 'active',
                    description: 'A ' + (k ? 'spacious, signature' : 'comfortable, well-appointed') + ' ' + r[0].toLowerCase() + ' with a ' + r[5] + ' bed, ' + r[6] + ' sq. ft. of space and everything you need for a relaxed stay at ' + h[1] + '.'
                });
            });
            for (var k = 0; k < 3; k++) {
                D.reviews.push({
                    id: D.reviews.length + 1, hotelId: hid, userId: ((i + k) % people.length) + 1, name: NAMES[(i + k * 3) % NAMES.length],
                    rating: k === 2 ? Math.max(4, Math.round(h[4]) - 1) : Math.min(5, Math.round(h[4] + 0.2)), text: REVIEW_TEXT[(i + k * 2) % REVIEW_TEXT.length], date: addDays(today(), -(12 + i * 5 + k * 17))
                });
            }
        });

        var pm = ['UPI', 'Credit / Debit Card', 'Net Banking'];
        for (var k = 0; k < 38; k++) {
            var hotel = D.hotels[(k * 5 + 3) % D.hotels.length];
            var rooms = D.rooms.filter(function (r) { return r.hotelId === hotel.id; });
            var room = rooms[k % 2], nights = 1 + (k % 4);
            var past = k < 28;
            var ci = past ? addDays(today(), -(8 + k * 6)) : addDays(today(), 3 + (k - 28) * 6);
            var co = addDays(ci, nights);
            var sub = room.price * nights, tax = Math.round(sub * 0.12), total = sub + tax;
            var cancelled = past && k % 9 === 4;
            var u = D.users[k % D.users.length];
            var created = addDays(ci, -(4 + k % 12));
            var bid = k + 1;
            D.bookings.push({
                id: bid, ref: 'RTB' + (260100 + bid * 37), userId: u.id, hotelId: hotel.id, roomId: room.id, checkIn: ci, checkOut: co, nights: nights, rooms: 1,
                adults: 2, children: k % 3 === 0 ? 1 : 0, guestName: u.name, phone: u.phone, email: u.email, requests: '', subtotal: sub, tax: tax, discount: 0, coupon: '',
                total: total, status: cancelled ? 'cancelled' : (past ? 'completed' : 'confirmed'), paymentStatus: cancelled ? 'refunded' : 'paid', createdAt: created + 'T10:30:00.000Z', reviewed: 0
            });
            D.payments.push({ id: bid, bookingId: bid, userId: u.id, method: pm[k % 3], amount: total, status: cancelled ? 'refunded' : 'success', txnId: 'TXN' + (8800000 + bid * 913), createdAt: created + 'T10:32:00.000Z' });
        }

        D.queries.push({ id: 1, name: 'Dhruv Trivedi', email: 'dhruv@example.com', phone: '9012345678', subject: 'Group booking (12 guests)', message: 'We are travelling as a group of 12 to Udaipur in December. Do you offer group rates?', date: addDays(today(), -8), seen: 0 });
        D.queries.push({ id: 2, name: 'Priya Nair', email: 'priya@example.com', phone: '9123456780', subject: 'Airport pickup', message: 'Do hotels in Jaipur provide airport pickup and what are the charges?', date: addDays(today(), -3), seen: 1 });
        return D;
    }

    /* ------------------------------------------------ storage ---- */
    var db;
    function load() {
        try {
            if (/[?&]resetdb(\b|=|&|$)/.test(location.search)) {
                localStorage.removeItem(KEY); localStorage.removeItem('rtbnb2_user'); localStorage.removeItem('rtbnb2_admin');
            }
            var s = localStorage.getItem(KEY);
            if (s) { return JSON.parse(s); }
        } catch (e) { /* re-seed */ }
        var d = seed();
        try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { /* ignore */ }
        return d;
    }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(db)); return true; } catch (e) { alert('Browser storage is full - please remove some uploaded images.'); return false; } }
    db = load();

    function nextId(t) { var m = 0; db[t].forEach(function (r) { if (r.id > m) { m = r.id; } }); return m + 1; }
    function byId(t, id) { id = +id; return db[t].filter(function (r) { return r.id === id; })[0] || null; }

    /* --------------------------------------------- domain logic ---- */
    var API = {
        db: function () { return db; }, save: save, nextId: nextId, byId: byId,
        locations: LOCATIONS, amenities: AMENITIES, hash: hash, ymd: ymd, addDays: addDays, today: today, diffDays: diffDays,
        location: function (id) { return LOCATIONS.filter(function (l) { return l.id === id; })[0]; },
        hotel: function (id) { return byId('hotels', id); },
        room: function (id) { return byId('rooms', id); },
        hotelRooms: function (hid) { return db.rooms.filter(function (r) { return r.hotelId === +hid && r.status === 'active'; }); },
        minPrice: function (h) { var p = API.hotelRooms(h.id).map(function (r) { return r.price; }); return p.length ? Math.min.apply(null, p) : h.priceFrom; },
        hotelReviews: function (hid) { return db.reviews.filter(function (r) { return r.hotelId === +hid; }).sort(function (a, b) { return b.id - a.id; }); },
        activeHotels: function () { return db.hotels.filter(function (h) { return h.status === 'active'; }); },

        /* rooms of a type still free between two dates */
        available: function (roomId, ci, co) {
            var room = byId('rooms', roomId); if (!room) { return 0; }
            var cutoff = Date.now() - 30 * 60000, used = 0;
            db.bookings.forEach(function (b) {
                if (b.roomId !== room.id || b.status === 'cancelled') { return; }
                if (b.status === 'pending' && new Date(b.createdAt).getTime() < cutoff) { return; }
                if (!ci || !co || (b.checkIn < co && b.checkOut > ci)) { used += b.rooms || 1; }
            });
            return Math.max(0, room.quantity - used);
        },
        price: function (room, ci, co, rooms, couponCode) {
            var nights = Math.max(1, diffDays(ci, co)), sub = room.price * nights * (rooms || 1), tax = Math.round(sub * 0.12), disc = 0, c = null;
            if (couponCode) {
                c = db.coupons.filter(function (x) { return x.code === String(couponCode).toUpperCase(); })[0];
                if (c && sub >= c.min) { disc = c.type === 'pct' ? Math.min(c.max, Math.round(sub * c.value / 100)) : c.value; } else { c = null; }
            }
            return { nights: nights, subtotal: sub, tax: tax, discount: disc, total: sub + tax - disc, coupon: c ? c.code : '' };
        },
        createBooking: function (o) {
            var room = byId('rooms', o.roomId), p = API.price(room, o.checkIn, o.checkOut, o.rooms, o.coupon);
            var id = nextId('bookings');
            var b = {
                id: id, ref: 'RTB' + (260100 + id * 37), userId: o.userId, hotelId: room.hotelId, roomId: room.id, checkIn: o.checkIn, checkOut: o.checkOut,
                nights: p.nights, rooms: o.rooms || 1, adults: o.adults, children: o.children, guestName: o.guestName, phone: o.phone, email: o.email, requests: o.requests || '',
                subtotal: p.subtotal, tax: p.tax, discount: p.discount, coupon: p.coupon, total: p.total, status: 'pending', paymentStatus: 'unpaid', createdAt: nowISO(), reviewed: 0
            };
            db.bookings.push(b); save(); return b;
        },
        pay: function (bookingId, method, ok) {
            var b = byId('bookings', bookingId), id = nextId('payments');
            var pay = { id: id, bookingId: b.id, userId: b.userId, method: method, amount: b.total, status: ok ? 'success' : 'failed', txnId: 'TXN' + (8800000 + id * 913 + Math.floor(Math.random() * 90)), createdAt: nowISO() };
            db.payments.push(pay);
            if (ok) { b.status = 'confirmed'; b.paymentStatus = method === 'Pay at Hotel' ? 'pay-at-hotel' : 'paid'; }
            save(); return pay;
        },
        cancel: function (bookingId) {
            var b = byId('bookings', bookingId); if (!b || b.status === 'cancelled') { return false; }
            var wasPaid = b.paymentStatus === 'paid';
            b.status = 'cancelled'; b.refundAmount = wasPaid ? Math.round(b.total * (diffDays(today(), b.checkIn) >= 2 ? 1 : 0.5)) : 0;
            if (wasPaid) { b.paymentStatus = 'refunded'; db.payments.forEach(function (p) { if (p.bookingId === b.id && p.status === 'success') { p.status = 'refunded'; } }); }
            save(); return true;
        },
        addReview: function (hid, user, rating, text, bookingId) {
            var h = byId('hotels', hid);
            db.reviews.push({ id: nextId('reviews'), hotelId: +hid, userId: user.id, name: user.name, rating: +rating, text: text, date: today() });
            h.rating = Math.round(((h.rating * h.reviewsCount) + (+rating)) / (h.reviewsCount + 1) * 10) / 10; h.reviewsCount += 1;
            if (bookingId) { var b = byId('bookings', bookingId); if (b) { b.reviewed = 1; } }
            save();
        },

        /* ----- auth ----- */
        user: function () { var id = localStorage.getItem('rtbnb2_user'); var u = id ? byId('users', id) : null; return u && u.status === 'active' ? u : null; },
        login: function (email, pass) {
            var u = db.users.filter(function (x) { return x.email.toLowerCase() === String(email).trim().toLowerCase(); })[0];
            if (!u) { return { ok: 0, msg: 'No account found with this email.' }; }
            if (u.status !== 'active') { return { ok: 0, msg: 'This account has been blocked. Please contact support.' }; }
            if (u.password !== hash(pass)) { return { ok: 0, msg: 'Incorrect password.' }; }
            localStorage.setItem('rtbnb2_user', u.id); return { ok: 1, user: u };
        },
        register: function (o) {
            var email = o.email.trim().toLowerCase();
            if (db.users.some(function (u) { return u.email.toLowerCase() === email; })) { return { ok: 0, msg: 'An account with this email already exists.' }; }
            if (db.users.some(function (u) { return u.phone === o.phone; })) { return { ok: 0, msg: 'This phone number is already registered.' }; }
            var u = { id: nextId('users'), name: o.name.trim(), email: email, phone: o.phone.trim(), city: o.city || '', password: hash(o.password), status: 'active', joined: today(), wishlist: [] };
            db.users.push(u); save(); localStorage.setItem('rtbnb2_user', u.id); return { ok: 1, user: u };
        },
        logout: function () { localStorage.removeItem('rtbnb2_user'); },
        admin: function () { var id = localStorage.getItem('rtbnb2_admin'); return id ? byId('admins', id) : null; },
        adminLogin: function (n, p) {
            var a = db.admins.filter(function (x) { return x.name === n.trim() && x.password === p; })[0];
            if (a) { localStorage.setItem('rtbnb2_admin', a.id); } return a || null;
        },
        adminLogout: function () { localStorage.removeItem('rtbnb2_admin'); },
        reset: function () { localStorage.removeItem(KEY); location.reload(); }
    };

    w.RT = API;
})(window);
