(function () {
    var $ = UI.$, $$ = UI.$$, icon = UI.icon, money = UI.money, esc = UI.esc;
    var h = RT.hotel(UI.qs('id'));
    var root = $('#hotel-root');
    if (!h || h.status !== 'active') { root.innerHTML = '<div class="empty"><h3>Hotel not found</h3><a class="btn btn-primary" href="hotels.html">Browse hotels</a></div>'; return; }
    document.title = h.name + ' | Royal BnB';
    var S = Object.assign({}, UI.search());
    ['in', 'out', 'adults', 'children'].forEach(function (k) { if (UI.qs(k)) { S[k] = UI.qs(k); } });
    var loc = RT.location(h.locationId), u = RT.user();
    var rooms = RT.hotelRooms(h.id);

    function link(r) { return 'booking.html?room=' + r.id + (S.in ? '&in=' + S.in : '') + (S.out ? '&out=' + S.out : '') + (S.adults ? '&adults=' + S.adults : '') + (S.children ? '&children=' + S.children : ''); }
    function roomHtml(r) {
        var av = S.in && S.out ? RT.available(r.id, S.in, S.out) : null, nights = S.in && S.out ? Math.max(1, RT.diffDays(S.in, S.out)) : 0;
        var availTxt = av === null ? '<span class="avail">' + icon('check', 13) + ' Available</span>' : av === 0 ? '<span class="avail low">Sold out for your dates</span>' : '<span class="avail' + (av <= 2 ? ' low' : '') + '">' + (av <= 2 ? 'Only ' + av + ' left!' : av + ' rooms available') + '</span>';
        var am = r.amenities.slice(0, 5).map(function (k) { return '<span>' + icon(RT.amenities[k].i, 13) + RT.amenities[k].n + '</span>'; }).join('');
        return '<div class="room-card reveal"><div class="img"><img loading="lazy" src="' + r.images[0] + '" alt="' + esc(r.name) + '"></div><div><span class="chip ghost">' + esc(r.category) + '</span><h4>' + esc(r.name) + '</h4>' +
            '<div class="chips"><span>' + icon('bed', 13) + r.bed + '</span><span>' + icon('grid', 13) + r.size + ' sq ft</span><span>' + icon('users', 13) + 'Up to ' + (r.adults + r.children) + ' guests</span></div><div class="chips">' + am + '</div>' +
            '<a class="link-arrow" href="room.html?id=' + r.id + (S.in ? '&in=' + S.in + '&out=' + S.out : '') + '">View room details <span data-i="arrow" data-s="16"></span></a></div>' +
            '<div class="rc-side"><div><small class="muted">Per night</small><div class="price">' + money(r.price) + '</div>' + (nights ? '<small class="muted">' + nights + ' night' + (nights > 1 ? 's' : '') + ': ' + money(r.price * nights) + ' + taxes</small>' : '<small class="muted">+ 12% taxes</small>') + '<div style="margin-top:6px">' + availTxt + '</div></div>' +
            '<a class="btn btn-primary' + (av === 0 ? '" style="opacity:.5;pointer-events:none' : '') + '" href="' + link(r) + '"><span>Book now</span>' + icon('arrow', 16) + '</a></div></div>';
    }
    function reviews() {
        var rv = RT.hotelReviews(h.id);
        return rv.length ? rv.slice(0, 8).map(function (r) { return '<div class="review"><div class="who"><span class="avatar">' + esc(r.name.charAt(0)) + '</span><div><b>' + esc(r.name) + '</b><br><small class="muted">' + UI.fdate(r.date) + '</small></div><span style="margin-left:auto">' + UI.stars(r.rating, 14) + '</span></div><p class="muted">' + esc(r.text) + '</p></div>'; }).join('') : '<p class="muted">No reviews yet - be the first to share your stay!</p>';
    }
    function gallery() {
        var im = h.images.slice(0, 4);
        return '<div class="gallery reveal">' + im.slice(0, 3).map(function (src, i) { return '<a data-lb="' + src + '"><img src="' + src + '" alt="' + esc(h.name) + ' photo ' + (i + 1) + '"></a>'; }).join('') + '<a data-lb="' + im[3] + '"><img src="' + im[3] + '" alt=""></a><a style="cursor:default"><div class="art" data-scene="' + h.locationId + '"></div></a></div>';
    }
    var nearby = h.nearby.slice().sort(function (a, b) { return a.km - b.km; });
    root.innerHTML = '<div class="crumb"><a href="index.html">Home</a><u>/</u><a href="hotels.html">Hotels</a><u>/</u><a href="hotels.html?loc=' + loc.id + '">' + loc.name + '</a><u>/</u><span>' + esc(h.name) + '</span></div>' +
        '<div class="det" style="margin-top:14px"><div><span class="chip">' + icon('building', 14) + esc(h.type) + '</span> <span class="chip ghost">' + h.stars + '-Star</span><h1 style="margin-top:10px">' + esc(h.name) + '</h1>' +
        '<div class="meta"><span class="score">' + h.rating.toFixed(1) + '</span><b style="color:var(--secondary)">' + UI.label(h.rating) + '</b><span>' + h.reviewsCount.toLocaleString('en-IN') + ' reviews</span><span>' + icon('pin', 15) + esc(h.address) + '</span>' +
        '<button class="btn btn-ghost sm" data-wish="' + h.id + '">' + icon('heart', 15) + '<span>Save</span></button></div></div><div></div></div>' + gallery() +
        '<div class="det"><div>' +
        '<div class="card reveal"><h3>About this stay</h3><p class="muted">' + esc(h.description) + '</p><div class="two" style="margin-top:16px"><div class="am">' + icon('clock', 18) + '<span>Check-in <b>' + h.checkIn + '</b></span></div><div class="am">' + icon('clock', 18) + '<span>Check-out <b>' + h.checkOut + '</b></span></div></div></div>' +
        '<div class="card reveal" id="rooms"><h3>Choose your room</h3><p class="muted" style="margin:-8px 0 16px">' + (S.in ? 'Showing availability for ' + UI.fdate(S.in) + ' - ' + UI.fdate(S.out) : 'Select dates on the right to see live availability.') + '</p><div id="room-list">' + rooms.map(roomHtml).join('') + '</div></div>' +
        '<div class="card reveal"><h3>Amenities &amp; facilities</h3><div class="am-grid">' + h.amenities.map(function (k) { var a = RT.amenities[k]; return '<div class="am">' + icon(a.i, 18) + a.n + '</div>'; }).join('') + '</div></div>' +
        '<div class="card reveal"><h3>Near this hotel</h3><p class="muted" style="margin:-8px 0 14px">Distances from the property &middot; ' + esc(loc.airport) + '</p><div class="near-grid">' + nearby.map(function (n) { return '<div class="nr">' + icon('compass', 18) + '<span>' + esc(n.name) + '</span><b>' + UI.km(n.km) + '</b></div>'; }).join('') + '</div></div>' +
        '<div class="card reveal" id="reviews"><h3>Guest reviews</h3><div id="rev-list">' + reviews() + '</div><div id="rev-form"></div></div>' +
        '<div class="card reveal"><h3>Policies</h3><p class="muted">' + esc(h.policy) + '</p></div></div>' +
        '<aside><div class="card book-card reveal"><small class="muted">Starting from</small><div class="price">' + money(RT.minPrice(h)) + '<span> / night</span></div><small class="muted">+ 12% taxes &amp; fees</small>' +
        '<div style="margin:18px 0 6px" class="fld"><label>Check in</label><input type="date" id="d-in" min="' + RT.today() + '" value="' + (S.in || '') + '"></div><div class="fld"><label>Check out</label><input type="date" id="d-out" min="' + RT.today() + '" value="' + (S.out || '') + '"></div>' +
        '<div class="two"><div class="fld"><label>Adults</label><select id="d-ad">' + [1, 2, 3, 4, 5, 6].map(function (n) { return '<option' + (+S.adults === n || (!S.adults && n === 2) ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></div><div class="fld"><label>Children</label><select id="d-ch">' + [0, 1, 2, 3].map(function (n) { return '<option' + (+S.children === n ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></div></div>' +
        '<button class="btn btn-primary block" id="d-check"><span>Check availability</span>' + icon('search', 16) + '</button><p class="muted" style="font-size:13px;margin-top:12px;display:flex;gap:8px">' + icon('shield', 16) + 'Free cancellation up to 48 hours before check-in.</p></div></aside></div>';

    /* gallery lightbox */
    root.addEventListener('click', function (e) {
        var a = e.target.closest('[data-lb]'); if (!a) { return; }
        var lb = document.createElement('div'); lb.className = 'lightbox'; lb.innerHTML = '<img src="' + a.dataset.lb + '" alt=""><button aria-label="Close">' + icon('x', 28) + '</button>'; document.body.appendChild(lb); lb.onclick = function () { lb.remove(); };
    });
    /* availability */
    $('#d-in').addEventListener('change', function () { var o = $('#d-out'); o.min = RT.addDays(this.value, 1); if (!o.value || o.value <= this.value) { o.value = RT.addDays(this.value, 1); } });
    $('#d-check').addEventListener('click', function () {
        var i = $('#d-in').value, o = $('#d-out').value;
        if (!i || !o || o <= i) { UI.toast('Please choose valid check-in and check-out dates.', 'err'); return; }
        S.in = i; S.out = o; S.adults = $('#d-ad').value; S.children = $('#d-ch').value; UI.setSearch(Object.assign(UI.search(), S));
        $('#room-list').innerHTML = rooms.map(roomHtml).join(''); $('#rooms .muted').textContent = 'Showing availability for ' + UI.fdate(i) + ' - ' + UI.fdate(o);
        UI.hydrate(document); UI.reveal(document); $('#rooms').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    UI.reveal(document);

    /* review form (guests only) */
    var rf = $('#rev-form');
    if (u) {
        rf.innerHTML = '<hr style="border:0;border-top:1px solid var(--border);margin:18px 0"><h4 style="font-family:var(--font-body)">Write a review</h4><div class="rate-stars" id="rs">' + [1, 2, 3, 4, 5].map(function (n) { return '<button type="button" data-n="' + n + '" class="on">' + icon('star', 26) + '</button>'; }).join('') + '</div>' +
            '<div class="fld"><textarea id="rv-text" placeholder="Share your experience..."></textarea></div><button class="btn btn-dark" id="rv-send"><span>Post review</span>' + icon('arrow', 16) + '</button>';
        var rating = 5;
        $('#rs').addEventListener('click', function (e) { var b = e.target.closest('[data-n]'); if (!b) { return; } rating = +b.dataset.n; $$('#rs button').forEach(function (x) { x.classList.toggle('on', +x.dataset.n <= rating); }); });
        $('#rv-send').addEventListener('click', function () {
            var t = $('#rv-text').value.trim(); if (t.length < 10) { UI.toast('Please write at least 10 characters.', 'err'); return; }
            RT.addReview(h.id, u, rating, t); $('#rev-list').innerHTML = reviews(); $('#rv-text').value = ''; UI.toast('Thank you for your review!');
        });
    } else { rf.innerHTML = '<p class="muted" style="margin-top:14px"><a href="login.html?next=' + encodeURIComponent('hotel.html?id=' + h.id) + '" style="color:var(--primary-hover);font-weight:700">Log in</a> to write a review.</p>'; }
})();
