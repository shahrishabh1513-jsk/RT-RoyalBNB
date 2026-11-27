(function () {
    if (!UI.requireLogin()) { return; }
    var $ = UI.$, icon = UI.icon, money = UI.money, esc = UI.esc, u = RT.user(), tab = 'up';
    function mine() { return RT.db().bookings.filter(function (b) { return b.userId === u.id && b.status !== 'pending'; }).sort(function (a, b) { return b.id - a.id; }); }
    function kind(b) { return b.status === 'cancelled' ? 'cx' : (b.checkOut < RT.today() || b.status === 'completed') ? 'prev' : 'up'; }
    function draw() {
        var all = mine(), cnt = { up: 0, prev: 0, cx: 0 }; all.forEach(function (b) { cnt[kind(b)]++; });
        $('#bk-tabs').innerHTML = [['up', 'Upcoming'], ['prev', 'Previous'], ['cx', 'Cancelled']].map(function (t) { return '<button class="tab' + (tab === t[0] ? ' on' : '') + '" data-t="' + t[0] + '">' + t[1] + ' (' + cnt[t[0]] + ')</button>'; }).join('');
        var list = all.filter(function (b) { return kind(b) === tab; });
        $('#bk-list').innerHTML = list.length ? list.map(function (b) {
            var h = RT.hotel(b.hotelId), r = RT.room(b.roomId); if (!h || !r) { return ''; }
            var acts = '<a class="btn btn-ghost sm" href="invoice.html?ref=' + b.ref + '">' + icon('download', 14) + '<span>Invoice</span></a>';
            if (kind(b) === 'up') { acts += '<button class="btn btn-danger sm" data-cancel="' + b.id + '"><span>Cancel booking</span></button>'; }
            if (kind(b) === 'prev' && b.status !== 'cancelled' && !b.reviewed) { acts += '<button class="btn btn-primary sm" data-review="' + b.id + '"><span>Write review</span></button>'; }
            if (kind(b) === 'prev') { acts += '<a class="btn btn-gold sm" href="hotel.html?id=' + h.id + '"><span>Book again</span></a>'; }
            return '<div class="bk reveal"><img src="' + r.images[0] + '" alt=""><div><span class="badge b-' + b.status + '">' + b.status + '</span> <span class="badge b-' + b.paymentStatus + '">' + b.paymentStatus.replace(/-/g, ' ') + '</span><h4 style="margin-top:6px">' + esc(h.name) + '</h4><div class="meta"><span>' + icon('pin', 14) + esc(h.city) + '</span><span>' + icon('bed', 14) + esc(r.name) + '</span><span>' + icon('calendar', 14) + UI.fdate(b.checkIn) + ' - ' + UI.fdate(b.checkOut) + '</span><span>' + icon('users', 14) + b.adults + 'A ' + b.children + 'C &middot; ' + b.rooms + ' room</span></div><small class="muted">Ref <b>' + b.ref + '</b></small>' + (b.status === 'cancelled' && b.refundAmount ? '<br><small style="color:var(--success)">Refund of ' + money(b.refundAmount) + ' initiated</small>' : '') + '</div><div class="bk-side"><div class="price" style="font-size:26px">' + money(b.total) + '</div><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end">' + acts + '</div></div></div>';
        }).join('') : '<div class="empty">' + icon('calendar', 40) + '<h3>No ' + (tab === 'up' ? 'upcoming' : tab === 'prev' ? 'previous' : 'cancelled') + ' bookings</h3><p class="muted">Your trips will appear here.</p><a class="btn btn-primary" style="margin-top:14px" href="hotels.html"><span>Find a hotel</span>' + icon('arrow', 16) + '</a></div>';
        UI.reveal(document);
    }
    document.addEventListener('click', function (e) {
        var t = e.target.closest('[data-t]'); if (t) { tab = t.dataset.t; draw(); return; }
        var c = e.target.closest('[data-cancel]');
        if (c) {
            var b = RT.db().bookings.filter(function (x) { return x.id === +c.dataset.cancel; })[0], pct = RT.diffDays(RT.today(), b.checkIn) >= 2 ? '100%' : '50%';
            UI.confirm('Cancel booking ' + b.ref + '? You will receive a ' + pct + ' refund (' + money(Math.round(b.total * (pct === '100%' ? 1 : .5))) + ') to your original payment method.', function () { RT.cancel(b.id); UI.toast('Booking cancelled'); draw(); }); return;
        }
        var rv = e.target.closest('[data-review]');
        if (rv) {
            var bk = RT.db().bookings.filter(function (x) { return x.id === +rv.dataset.review; })[0], h = RT.hotel(bk.hotelId), rating = 5;
            var m = UI.modal('<h3>Rate your stay</h3><p class="muted">' + esc(h.name) + ', ' + esc(h.city) + '</p><div class="rate-stars" id="rs2">' + [1, 2, 3, 4, 5].map(function (n) { return '<button type="button" class="on" data-n="' + n + '">' + icon('star', 30) + '</button>'; }).join('') + '</div><div class="fld"><textarea id="rt2" placeholder="Tell others about your stay..."></textarea></div><div class="row-end"><button class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary" id="rsend"><span>Submit review</span></button></div>', 'sm');
            m.querySelector('#rs2').onclick = function (ev) { var x = ev.target.closest('[data-n]'); if (!x) { return; } rating = +x.dataset.n; m.querySelectorAll('#rs2 button').forEach(function (y) { y.classList.toggle('on', +y.dataset.n <= rating); }); };
            m.querySelector('#rsend').onclick = function () { var tx = m.querySelector('#rt2').value.trim(); if (tx.length < 10) { UI.toast('Please write at least 10 characters.', 'err'); return; } RT.addReview(h.id, u, rating, tx, bk.id); m.close(); UI.toast('Thanks for your review!'); draw(); };
        }
    });
    draw();
})();