(function () {
    var $ = UI.$, $$ = UI.$$, icon = UI.icon;
    var S = UI.search(), q = UI.qs;
    // URL params override remembered search
    if (q('loc') !== null) { S.loc = q('loc'); }
    ['in', 'out', 'adults', 'children'].forEach(function (k) { if (q(k)) { S[k] = q(k); } });
    var cat = q('cat') || '';
    var F = { price: 16000, rate: 0, stars: [], am: [] };
    UI.setSearch(S);

    var AMS = ['wifi', 'ac', 'pool', 'spa', 'parking', 'breakfast', 'food', 'shuttle'];
    $('#f-rate').innerHTML = [[0, 'Any rating'], [4, '4.0+ Very Good'], [4.5, '4.5+ Excellent'], [4.7, '4.7+ Exceptional']].map(function (r) { return '<label class="chk"><input type="radio" name="rate" value="' + r[0] + '"' + (r[0] === 0 ? ' checked' : '') + '>' + r[1] + '</label>'; }).join('');
    $('#f-stars').innerHTML = [5, 4, 3].map(function (n) { return '<label class="chk"><input type="checkbox" data-star="' + n + '">' + n + ' Star <em>' + UI.stars(n, 12) + '</em></label>'; }).join('');
    $('#f-am').innerHTML = AMS.map(function (k) { return '<label class="chk"><input type="checkbox" data-am="' + k + '">' + RT.amenities[k].n + '</label>'; }).join('');

    function tabs() {
        var all = RT.activeHotels();
        $('#loc-tabs').innerHTML = '<button class="loc-tab' + (!S.loc ? ' on' : '') + '" data-loc="">All <small>' + all.length + '</small></button>' + RT.locations.map(function (l) {
            return '<button class="loc-tab' + (S.loc === l.id ? ' on' : '') + '" data-loc="' + l.id + '">' + icon('pin', 14) + l.name + ' <small>' + all.filter(function (h) { return h.locationId === l.id; }).length + '</small></button>';
        }).join('');
    }
    function catOk(h) {
        if (!cat) { return true; }
        var rooms = RT.hotelRooms(h.id);
        return ({
            heritage: /Heritage|Haveli|Palace/.test(h.type), desert: h.locationId === 'jaisalmer', lakes: h.locationId === 'udaipur', spiritual: h.locationId === 'dwarka', honeymoon: h.stars >= 4 && h.rating >= 4.6,
            family: rooms.some(function (r) { return (r.adults + r.children) >= 4; })
        })[cat];
    }
    function avail(h) {
        if (!S.in || !S.out) { return true; }
        var a = +S.adults || 1, c = +S.children || 0;
        return RT.hotelRooms(h.id).some(function (r) { return RT.available(r.id, S.in, S.out) > 0 && r.adults >= a && (r.adults + r.children) >= (a + c); });
    }
    function render() {
        var list = RT.activeHotels().filter(function (h) {
            if (S.loc && h.locationId !== S.loc) { return false; }
            if (RT.minPrice(h) > F.price || h.rating < F.rate) { return false; }
            if (F.stars.length && F.stars.indexOf(h.stars) < 0) { return false; }
            if (F.am.some(function (a) { return h.amenities.indexOf(a) < 0; })) { return false; }
            return catOk(h) && avail(h);
        });
        var s = $('#sort').value;
        list.sort(function (a, b) {
            if (s === 'plow') { return RT.minPrice(a) - RT.minPrice(b); } if (s === 'phigh') { return RT.minPrice(b) - RT.minPrice(a); }
            if (s === 'rate') { return b.rating - a.rating; }
            if (s === 'near') { return Math.min.apply(null, a.nearby.slice(0, 2).map(function (n) { return n.km; })) - Math.min.apply(null, b.nearby.slice(0, 2).map(function (n) { return n.km; })); }
            return (b.featured - a.featured) || (b.rating * Math.log(b.reviewsCount) - a.rating * Math.log(a.reviewsCount));
        });
        var l = S.loc ? RT.location(S.loc) : null;
        $('#res-title').textContent = list.length + ' hotel' + (list.length === 1 ? '' : 's') + (l ? ' in ' + l.name : (cat ? ' - ' + cat.charAt(0).toUpperCase() + cat.slice(1) : ' across Rajasthan & Dwarka'));
        $('#results').innerHTML = list.length ? list.map(function (h) { return UI.hotelRow(h, S); }).join('') :
            '<div class="empty">' + icon('search', 40) + '<h3>No hotels match your filters</h3><p class="muted">Try another destination, different dates or reset the filters.</p><button class="btn btn-primary" style="margin-top:14px" id="f-reset2">Reset filters</button></div>';
        UI.hydrate(document); UI.reveal(document); tabs();
    }
    function reset() {
        F = { price: 16000, rate: 0, stars: [], am: [] }; cat = ''; $('#f-price').value = 16000; $('#f-price-v').textContent = UI.money(16000);
        $$('#filters input[type=checkbox]').forEach(function (i) { i.checked = false; }); $$('#filters input[name=rate]')[1] && ($$('#filters input[name=rate]').forEach(function (i) { i.checked = i.value === '0'; }));
        render();
    }
    UI.searchBar($('#hotels-search'), { values: S, onsearch: function (v) { S = v; cat = ''; render(); } });
    document.addEventListener('click', function (e) {
        var t = e.target.closest('[data-loc]'); if (t) { S.loc = t.dataset.loc; UI.setSearch(S); cat = ''; var sel = $('#hotels-search select[name=loc]'); if (sel) { sel.value = S.loc; } render(); }
        if (e.target.closest('#f-reset') || e.target.closest('#f-reset2')) { reset(); }
        if (e.target.closest('#f-toggle')) { $('#filters').classList.toggle('open'); }
    });
    $('#f-price').addEventListener('input', function () { F.price = +this.value; $('#f-price-v').textContent = UI.money(F.price); render(); });
    $('#filters').addEventListener('change', function (e) {
        var t = e.target;
        if (t.name === 'rate') { F.rate = +t.value; }
        if (t.dataset.star) { F.stars = $$('[data-star]:checked').map(function (i) { return +i.dataset.star; }); }
        if (t.dataset.am) { F.am = $$('#f-am [data-am]:checked').map(function (i) { return i.dataset.am; }); }
        render();
    });
    $('#sort').addEventListener('change', render);
    render();
})();