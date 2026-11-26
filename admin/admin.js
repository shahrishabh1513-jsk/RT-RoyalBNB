/* RT ROYAL BNB v2 - admin shell + helpers */
(function (w) {
    'use strict';
    var A = {}, icon = UI.icon;
    A.img = function (s) { return /^(data:|https?:|\/)/.test(s || '') ? s : '../' + s; };
    A.guard = function () { if (!RT.admin()) { location.replace('index.html'); return false; } return true; };
    A.badge = function (s) { return '<span class="badge b-' + String(s).replace(/\s+/g, '-') + '">' + String(s).replace(/-/g, ' ') + '</span>'; };
    A.csv = function (name, rows) {
        var t = rows.map(function (r) { return r.map(function (c) { return '"' + String(c === undefined || c === null ? '' : c).replace(/"/g, '""') + '"'; }).join(','); }).join('\n');
        var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([t], { type: 'text/csv' })); a.download = name; document.body.appendChild(a); a.click(); a.remove();
    };
    A.readImage = function (file, maxW) {
        return new Promise(function (res, rej) {
            if (['image/jpeg', 'image/png', 'image/webp'].indexOf(file.type) < 0) { return rej(new Error('Only JPG, PNG or WEBP images are allowed.')); }
            if (file.size > 6 * 1024 * 1024) { return rej(new Error('Image is larger than 6 MB.')); }
            var fr = new FileReader(); fr.onerror = rej;
            fr.onload = function () { var im = new Image(); im.onerror = rej; im.onload = function () { var s = Math.min(1, (maxW || 1100) / im.width), c = document.createElement('canvas'); c.width = Math.round(im.width * s); c.height = Math.round(im.height * s); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', 0.8)); }; im.src = fr.result; };
            fr.readAsDataURL(file);
        });
    };
    A.nav = [['dashboard', 'Dashboard', 'grid'], ['hotels', 'Manage Hotels', 'building'], ['rooms', 'Manage Rooms', 'bed'], ['bookings', 'Bookings', 'calendar'], ['customers', 'Manage Customers', 'users'], ['payments', 'Manage Payments', 'card'], ['messages', 'Messages', 'mess']];
    A.shell = function (active, title, actions) {
        if (!A.guard()) { return null; }
        var ad = RT.admin(), unread = RT.db().queries.filter(function (q) { return !q.seen; }).length, root = document.getElementById('a-root');
        document.body.classList.add('admin');
        root.innerHTML = '<div class="a-shell"><aside class="a-side" id="a-side"><a class="brand light" href="dashboard.html"><span class="brand-badge"><img src="../images/logo/royal_bnb_gold.png" alt="RT Royal BnB"></span><span class="brand-text"><b>Royal BnB</b><small>Admin Panel</small></span></a><nav class="a-nav">' +
            A.nav.map(function (n) { return '<a href="' + n[0] + '.html" class="' + (n[0] === active ? 'on' : '') + '">' + icon(n[2], 18) + n[1] + (n[0] === 'messages' && unread ? '<span class="cnt">' + unread + '</span>' : '') + '</a>'; }).join('') + '<a href="../index.html" target="_blank">' + icon('home', 18) + 'View website</a></nav>' +
            '<div class="a-credit">&copy; Copyright ' + new Date().getFullYear() + ' <b>RT_ROYAL_BNB</b><br>Design &amp; Developed by <b>RT1504</b><br><a class="btn btn-gold sm" href="https://github.com/RT1504" target="_blank" rel="noopener">' + icon('github', 15) + '<span>GitHub</span></a></div></aside>' +
            '<div class="a-main"><div class="a-top"><div style="display:flex;align-items:center;gap:12px"><button class="ib a-burger" id="a-burger" aria-label="Menu">' + icon('menu', 18) + '</button><h1>' + title + '</h1></div><div class="right">' + (actions || '') +
            '<span class="avatar" title="' + ad.name + '">' + ad.name.charAt(0).toUpperCase() + '</span><button class="btn btn-ghost sm" id="a-logout">' + icon('logout', 15) + '<span>Logout</span></button></div></div><div class="a-body page-fade" id="a-body"></div></div></div>';
        document.getElementById('a-burger').onclick = function () { document.getElementById('a-side').classList.toggle('open'); };
        document.getElementById('a-logout').onclick = function () { RT.adminLogout(); location.href = 'index.html'; };
        return document.getElementById('a-body');
    };
    A.hotelName = function (id) { var h = RT.hotel(id); return h ? h.name : '(deleted)'; };
    w.A = A;
})(window);
