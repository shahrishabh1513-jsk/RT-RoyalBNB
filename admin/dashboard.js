(function () {
    var body = A.shell('dashboard', 'Dashboard', '<a class="btn btn-primary sm" href="hotels.html"><span data-i="plus" data-s="15"></span><span>Add hotel</span></a>'); if (!body) { return; }
    var db = RT.db(), money = UI.money, icon = UI.icon, today = RT.today();
    var paid = db.payments.filter(function (p) { return p.status === 'success'; });
    var revenue = paid.reduce(function (a, p) { return a + p.amount; }, 0);
    var live = db.bookings.filter(function (b) { return b.status !== 'cancelled' && b.status !== 'pending'; });
    var inv = db.rooms.filter(function (r) { return r.status === 'active'; }).reduce(function (a, r) { return a + r.quantity; }, 0);
    var occ = db.bookings.filter(function (b) { return (b.status === 'confirmed' || b.status === 'completed') && b.checkIn <= today && b.checkOut > today; }).reduce(function (a, b) { return a + b.rooms; }, 0);
    var month = today.slice(0, 7), newM = live.filter(function (b) { return b.createdAt.slice(0, 7) === month; }).length;

    // revenue per month (6 months)
    var months = []; for (var i = 5; i >= 0; i--) { var d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i); months.push({ k: d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'), l: d.toLocaleString('en-IN', { month: 'short' }), v: 0 }); }
    paid.forEach(function (p) { var m = months.filter(function (x) { return x.k === p.createdAt.slice(0, 7); })[0]; if (m) { m.v += p.amount; } });
    var max = Math.max.apply(null, months.map(function (m) { return m.v; }).concat([1]));

    // bookings by destination (donut)
    var cols = ['#C6A15B', '#34302B', '#38845C', '#D45B55', '#82796C'], per = RT.locations.map(function (l, i) { return { n: l.name, c: cols[i], v: live.filter(function (b) { var h = RT.hotel(b.hotelId); return h && h.locationId === l.id; }).length }; });
    var tot = per.reduce(function (a, p) { return a + p.v; }, 0) || 1, off = 0, R = 52, C = 2 * Math.PI * R;
    var donut = '<svg width="150" height="150" viewBox="0 0 150 150"><g transform="rotate(-90 75 75)">' + per.map(function (p) { var len = p.v / tot * C, s = '<circle cx="75" cy="75" r="' + R + '" fill="none" stroke="' + p.c + '" stroke-width="24" stroke-dasharray="' + len + ' ' + (C - len) + '" stroke-dashoffset="' + (-off) + '"/>'; off += len; return s; }).join('') + '</g><text x="75" y="72" text-anchor="middle" font-family="Playfair Display,serif" font-size="26" font-weight="700" fill="#34302B">' + live.length + '</text><text x="75" y="90" text-anchor="middle" font-size="11" fill="#82796C">bookings</text></svg>';

    // top hotels
    var rev = {}; paid.forEach(function (p) { var b = RT.db().bookings.filter(function (x) { return x.id === p.bookingId; })[0]; if (b) { rev[b.hotelId] = (rev[b.hotelId] || 0) + p.amount; } });
    var top = Object.keys(rev).map(function (k) { return { h: RT.hotel(k), v: rev[k] }; }).filter(function (x) { return x.h; }).sort(function (a, b) { return b.v - a.v; }).slice(0, 5), tmax = top.length ? top[0].v : 1;

    var recent = db.bookings.slice().sort(function (a, b) { return b.id - a.id; }).slice(0, 8);
    body.innerHTML = '<div class="stats-a">' +
        [['Total revenue', money(revenue), 'rupee', 'From ' + paid.length + ' successful payments'], ['Total bookings', live.length, 'calendar', newM + ' new this month'], ['Occupancy today', Math.round(occ / inv * 100) + '%', 'bed', occ + ' of ' + inv + ' rooms occupied'], ['Customers', db.users.length, 'users', db.users.filter(function (u) { return u.status === 'active'; }).length + ' active']]
            .map(function (s) { return '<div class="sc reveal"><div><small>' + s[0] + '</small><b>' + s[1] + '</b><span class="d">' + s[3] + '</span></div><span class="ico">' + icon(s[2], 24) + '</span></div>'; }).join('') + '</div>' +
        '<div class="grid2"><div class="panel reveal"><h3>Revenue <small>Last 6 months</small></h3><div class="bars">' + months.map(function (m) { return '<div class="bar"><b>' + (m.v ? (m.v >= 100000 ? (m.v / 100000).toFixed(1) + 'L' : Math.round(m.v / 1000) + 'k') : '-') + '</b><i style="height:' + Math.max(3, m.v / max * 100) + '%"></i>' + m.l + '</div>'; }).join('') + '</div></div>' +
        '<div class="panel reveal"><h3>Bookings by destination</h3><div class="donut-wrap">' + donut + '<div class="legend">' + per.map(function (p) { return '<span><i style="background:' + p.c + '"></i>' + p.n + ' <b>' + p.v + '</b></span>'; }).join('') + '</div></div></div></div>' +
        '<div class="grid2"><div class="panel reveal"><h3>Recent bookings <a class="link-arrow" href="bookings.html">View all</a></h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Ref</th><th>Guest</th><th>Hotel</th><th>Check-in</th><th>Amount</th><th>Status</th></tr></thead><tbody>' +
        recent.map(function (b) { return '<tr><td><b>' + b.ref + '</b></td><td>' + UI.esc(b.guestName) + '</td><td>' + UI.esc(A.hotelName(b.hotelId)) + '</td><td>' + UI.fdate(b.checkIn) + '</td><td>' + money(b.total) + '</td><td>' + A.badge(b.status) + '</td></tr>'; }).join('') + '</tbody></table></div></div>' +
        '<div class="panel reveal"><h3>Top hotels by revenue</h3><div class="rank">' + top.map(function (t) { return '<div class="rank-i"><img src="' + A.img(t.h.images[0]) + '" alt=""><div><b>' + UI.esc(t.h.name) + '</b><div class="mini-bar"><i style="width:' + (t.v / tmax * 100) + '%"></i></div></div><b>' + money(t.v) + '</b></div>'; }).join('') + '</div></div></div>';
    UI.hydrate(document); UI.reveal(document);
})();
