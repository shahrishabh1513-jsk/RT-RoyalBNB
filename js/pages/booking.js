(function () {
    if (!UI.requireLogin()) { return; }
    var $ = UI.$, icon = UI.icon, money = UI.money, esc = UI.esc, u = RT.user();
    var r = RT.room(UI.qs('room')), root = $('#booking-root');
    if (!r) { root.innerHTML = '<div class="empty"><h3>Room not found</h3><a class="btn btn-primary" href="hotels.html">Browse hotels</a></div>'; return; }
    var h = RT.hotel(r.hotelId), S = UI.search();
    var st = { in: UI.qs('in') || S.in || RT.addDays(RT.today(), 1), out: UI.qs('out') || S.out || '', rooms: +UI.qs('rooms') || 1, adults: +(UI.qs('adults') || S.adults || 2), children: +(UI.qs('children') || S.children || 0), coupon: '' };
    if (!st.out || st.out <= st.in) { st.out = RT.addDays(st.in, 1); }

    root.innerHTML = '<div class="checkout"><div><div class="card reveal"><h3>Guest details</h3><form id="bf" novalidate>' +
        '<div class="two"><div class="fld"><label>Full name *</label><input name="name" value="' + esc(u.name) + '" required></div><div class="fld"><label>Email *</label><input type="email" name="email" value="' + esc(u.email) + '" required></div></div>' +
        '<div class="two"><div class="fld"><label>Phone *</label><input name="phone" value="' + esc(u.phone) + '" inputmode="tel" required></div><div class="fld"><label>Rooms</label><select name="rooms">' + [1, 2, 3].map(function (n) { return '<option' + (n === st.rooms ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></div></div>' +
        '<div class="two"><div class="fld"><label>Check in *</label><input type="date" name="in" min="' + RT.today() + '" value="' + st.in + '" required></div><div class="fld"><label>Check out *</label><input type="date" name="out" min="' + RT.addDays(RT.today(), 1) + '" value="' + st.out + '" required></div></div>' +
        '<div class="two"><div class="fld"><label>Adults</label><select name="adults">' + [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) { return '<option' + (n === st.adults ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></div><div class="fld"><label>Children</label><select name="children">' + [0, 1, 2, 3, 4].map(function (n) { return '<option' + (n === st.children ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></div></div>' +
        '<div class="fld"><label>Special requests (optional)</label><textarea name="requests" placeholder="Late check-in, extra bed, celebration setup..."></textarea></div><div class="fld"><span class="err" id="b-err"></span></div></form></div>' +
        '<div class="card reveal"><h3>Cancellation policy</h3><p class="muted">Free cancellation up to 48 hours before check-in (full refund). Within 48 hours, 50% of the amount is refunded. ' + esc(h.policy) + '</p></div></div>' +
        '<aside><div class="card book-card reveal"><div class="sum-hotel"><img src="' + r.images[0] + '" alt=""><div><h4>' + esc(h.name) + '</h4><small class="muted">' + icon('pin', 13) + esc(h.city) + '</small><br><small><b>' + esc(r.name) + '</b></small></div></div><div id="sum"></div>' +
        '<div class="coupon-box"><input id="cp" placeholder="Coupon code (e.g. RT10)"><button class="btn btn-ghost sm" id="cp-apply" type="button">Apply</button></div><div id="cp-msg" style="font-size:13px;margin-bottom:10px"></div>' +
        '<button class="btn btn-primary block" id="go"><span>Continue to payment</span>' + icon('arrow', 16) + '</button></div></aside></div>';

    var f = $('#bf');
    function read() { st.in = f.elements['in'].value; st.out = f.elements['out'].value; st.rooms = +f.elements['rooms'].value; st.adults = +f.elements['adults'].value; st.children = +f.elements['children'].value; }
    function sum() {
        read(); var box = $('#sum');
        if (!st.in || !st.out || st.out <= st.in) { box.innerHTML = '<p class="muted">Choose valid dates.</p>'; return null; }
        var p = RT.price(r, st.in, st.out, st.rooms, st.coupon), av = RT.available(r.id, st.in, st.out);
        box.innerHTML = '<div class="sumline"><span>' + UI.fdate(st.in) + ' &rarr; ' + UI.fdate(st.out) + '</span><span>' + p.nights + ' night' + (p.nights > 1 ? 's' : '') + '</span></div><div class="sumline"><span>' + money(r.price) + ' x ' + p.nights + ' x ' + st.rooms + ' room' + (st.rooms > 1 ? 's' : '') + '</span><span>' + money(p.subtotal) + '</span></div>' +
            (p.discount ? '<div class="sumline disc"><span>Coupon ' + p.coupon + '</span><span>- ' + money(p.discount) + '</span></div>' : '') + '<div class="sumline"><span>Taxes &amp; fees (12%)</span><span>' + money(p.tax) + '</span></div><div class="sumline tot"><span>Total payable</span><span>' + money(p.total) + '</span></div>' +
            (av < st.rooms ? '<p class="avail low" style="margin-top:8px">Only ' + av + ' room(s) available for these dates.</p>' : '');
        return { p: p, av: av };
    }
    f.addEventListener('change', function (e) { if (e.target.name === 'in') { f.elements['out'].min = RT.addDays(e.target.value, 1); if (f.elements['out'].value <= e.target.value) { f.elements['out'].value = RT.addDays(e.target.value, 1); } } sum(); });
    $('#cp-apply').onclick = function () {
        var code = $('#cp').value.trim().toUpperCase(); if (!code) { return; }
        var s = RT.price(r, st.in, st.out, st.rooms, code), m = $('#cp-msg');
        if (s.coupon) { st.coupon = code; m.style.color = 'var(--success)'; m.textContent = 'Coupon applied - you save ' + money(s.discount) + '!'; UI.toast('Coupon ' + code + ' applied'); }
        else { st.coupon = ''; m.style.color = 'var(--danger)'; m.textContent = 'Invalid coupon or minimum amount not reached.'; }
        sum();
    };
    $('#go').onclick = function () {
        var s = sum(), err = $('#b-err'); err.textContent = '';
        var name = f.elements['name'].value.trim(), email = f.elements['email'].value.trim(), phone = f.elements['phone'].value.trim();
        if (!s) { err.textContent = 'Please choose valid check-in and check-out dates.'; return; }
        if (name.length < 3) { err.textContent = 'Please enter the guest name.'; return; }
        if (!/^\S+@\S+\.\S+$/.test(email)) { err.textContent = 'Please enter a valid email address.'; return; }
        if (!/^[0-9+\-\s]{10,14}$/.test(phone)) { err.textContent = 'Please enter a valid phone number.'; return; }
        if (s.av < st.rooms) { err.textContent = 'Sorry, not enough rooms are available for these dates.'; return; }
        if (st.adults > r.adults * st.rooms) { err.textContent = 'This room type fits up to ' + r.adults + ' adults per room. Please add rooms.'; return; }
        var db = RT.db(); db.bookings = db.bookings.filter(function (b) { return !(b.userId === u.id && b.status === 'pending'); });
        var b = RT.createBooking({ userId: u.id, roomId: r.id, checkIn: st.in, checkOut: st.out, rooms: st.rooms, adults: st.adults, children: st.children, guestName: name, phone: phone, email: email, requests: f.elements['requests'].value.trim(), coupon: st.coupon });
        location.href = 'payment.html?booking=' + b.id;
    };
    sum(); UI.reveal(document);
})();