(function () {
    var $ = UI.$, $$ = UI.$$, icon = UI.icon, money = UI.money, esc = UI.esc;
    var r = RT.room(UI.qs('id')), root = $('#room-root');
    if (!r || r.status !== 'active') { root.innerHTML = '<div class="empty"><h3>Room not found</h3><a class="btn btn-primary" href="hotels.html">Browse hotels</a></div>'; return; }
    var h = RT.hotel(r.hotelId), S = Object.assign({}, UI.search());
    ['in', 'out', 'adults', 'children'].forEach(function (k) { if (UI.qs(k)) { S[k] = UI.qs(k); } });
    document.title = r.name + ' - ' + h.name + ' | Royal BnB';
    var others = RT.hotelRooms(h.id).filter(function (x) { return x.id !== r.id; });
    root.innerHTML = '<div class="crumb"><a href="index.html">Home</a><u>/</u><a href="hotels.html">Hotels</a><u>/</u><a href="hotel.html?id=' + h.id + '">' + esc(h.name) + '</a><u>/</u><span>' + esc(r.name) + '</span></div>' +
        '<div class="det" style="margin-top:18px"><div><span class="chip ghost">' + esc(r.category) + '</span><h1 style="margin:10px 0 4px">' + esc(r.name) + '</h1><p class="muted">' + icon('pin', 15) + ' at <a href="hotel.html?id=' + h.id + '" style="color:var(--primary-hover);font-weight:600">' + esc(h.name) + '</a>, ' + esc(h.city) + ' &middot; ' + UI.stars(h.rating, 14) + ' ' + h.rating.toFixed(1) + '</p>' +
        '<div class="card reveal" style="margin-top:20px;padding:14px"><div style="border-radius:16px;overflow:hidden;aspect-ratio:16/9;position:relative"><img id="main-img" src="' + r.images[0] + '" alt="" style="width:100%;height:100%;object-fit:cover"></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px">' +
        r.images.map(function (s, i) { return '<img class="thumb" data-src="' + s + '" src="' + s + '" alt="" style="border-radius:12px;height:90px;width:100%;object-fit:cover;cursor:pointer;border:2px solid ' + (i ? 'transparent' : 'var(--primary)') + ';transition:.25s">'; }).join('') + '</div></div>' +
        '<div class="card reveal"><h3>About this room</h3><p class="muted">' + esc(r.description) + '</p><div class="am-grid" style="margin-top:16px"><div class="am">' + icon('bed', 18) + r.bed + ' bed</div><div class="am">' + icon('grid', 18) + r.size + ' sq ft</div><div class="am">' + icon('users', 18) + (r.adults) + ' adults + ' + r.children + ' children</div></div></div>' +
        '<div class="card reveal"><h3>Room amenities</h3><div class="am-grid">' + r.amenities.map(function (k) { var a = RT.amenities[k]; return '<div class="am">' + icon(a.i, 18) + a.n + '</div>'; }).join('') + '</div></div>' +
        (others.length ? '<div class="card reveal"><h3>Other room category</h3>' + others.map(function (o) { return '<div class="room-card" style="margin:0"><div class="img"><img src="' + o.images[0] + '" alt=""></div><div><span class="chip ghost">' + esc(o.category) + '</span><h4>' + esc(o.name) + '</h4><p class="muted">' + esc(o.bed) + ' &middot; ' + o.size + ' sq ft</p></div><div class="rc-side"><div class="price">' + money(o.price) + '</div><a class="btn btn-ghost sm" href="room.html?id=' + o.id + '">View</a></div></div>'; }).join('') + '</div>' : '') +
        '</div><aside><div class="card book-card reveal"><div class="price">' + money(r.price) + '<span> / night</span></div><small class="muted">+ 12% taxes &amp; fees</small>' +
        '<div class="two" style="margin-top:16px"><div class="fld"><label>Check in</label><input type="date" id="r-in" min="' + RT.today() + '" value="' + (S.in || '') + '"></div><div class="fld"><label>Check out</label><input type="date" id="r-out" min="' + RT.today() + '" value="' + (S.out || '') + '"></div></div>' +
        '<div class="fld"><label>Rooms</label><select id="r-rooms">' + [1, 2, 3].map(function (n) { return '<option>' + n + '</option>'; }).join('') + '</select></div><div id="r-sum"></div>' +
        '<button class="btn btn-primary block" id="r-book"><span>Book this room</span>' + icon('arrow', 16) + '</button></div></aside></div>';

    $$('.thumb').forEach(function (t) { t.onclick = function () { $('#main-img').src = t.dataset.src; $$('.thumb').forEach(function (x) { x.style.borderColor = 'transparent'; }); t.style.borderColor = 'var(--primary)'; }; });
    function calc() {
        var i = $('#r-in').value, o = $('#r-out').value, box = $('#r-sum');
        if (!i || !o || o <= i) { box.innerHTML = '<p class="muted" style="margin-bottom:14px;font-size:13.5px">Select dates to see availability and the total price.</p>'; return null; }
        var n = +$('#r-rooms').value, av = RT.available(r.id, i, o), p = RT.price(r, i, o, n);
        box.innerHTML = (av >= n ? '<p class="avail' + (av <= 2 ? ' low' : '') + '" style="margin-bottom:10px">' + icon('check', 13) + ' ' + av + ' room' + (av > 1 ? 's' : '') + ' available</p>' : '<p class="avail low" style="margin-bottom:10px">Only ' + av + ' room(s) left for these dates</p>') +
            '<div class="sumline"><span>' + money(r.price) + ' x ' + p.nights + ' night' + (p.nights > 1 ? 's' : '') + ' x ' + n + '</span><span>' + money(p.subtotal) + '</span></div><div class="sumline"><span>Taxes &amp; fees (12%)</span><span>' + money(p.tax) + '</span></div><div class="sumline tot"><span>Total</span><span>' + money(p.total) + '</span></div><div style="height:14px"></div>';
        return av >= n ? { i: i, o: o, n: n } : null;
    }
    ['r-in', 'r-out', 'r-rooms'].forEach(function (id) { $('#' + id).addEventListener('change', function () { if (id === 'r-in') { var o = $('#r-out'); o.min = RT.addDays(this.value, 1); if (!o.value || o.value <= this.value) { o.value = RT.addDays(this.value, 1); } } calc(); }); });
    $('#r-book').addEventListener('click', function () {
        var c = calc(); if (!c) { UI.toast('Please select available dates first.', 'err'); return; }
        location.href = 'booking.html?room=' + r.id + '&in=' + c.i + '&out=' + c.o + '&rooms=' + c.n + (S.adults ? '&adults=' + S.adults : '') + (S.children ? '&children=' + S.children : '');
    });
    calc(); UI.reveal(document);
})();
