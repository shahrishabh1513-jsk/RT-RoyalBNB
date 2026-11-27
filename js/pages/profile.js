(function () {
    if (!UI.requireLogin()) { return; }
    var $ = UI.$, icon = UI.icon, esc = UI.esc, u = RT.user(), tab = location.hash === '#wishlist' ? 'wish' : 'info';
    function draw() {
        u = RT.user(); var nb = RT.db().bookings.filter(function (b) { return b.userId === u.id && b.status !== 'pending'; }).length;
        var body = '';
        if (tab === 'info') {
            body = '<div class="card"><h3>Personal details</h3><form id="pf" novalidate><div class="two"><div class="fld"><label>Full name</label><input name="name" value="' + esc(u.name) + '"></div><div class="fld"><label>Email (cannot be changed)</label><input value="' + esc(u.email) + '" disabled></div></div><div class="two"><div class="fld"><label>Phone</label><input name="phone" value="' + esc(u.phone) + '"></div><div class="fld"><label>City</label><input name="city" value="' + esc(u.city || '') + '"></div></div><button class="btn btn-primary" type="submit"><span>Save changes</span>' + icon('check', 16) + '</button></form></div>';
        } else if (tab === 'pass') {
            body = '<div class="card"><h3>Change password</h3><form id="pw" novalidate style="max-width:420px"><div class="fld"><label>Current password</label><input type="password" name="old"></div><div class="fld"><label>New password (min 6 characters)</label><input type="password" name="n1"></div><div class="fld"><label>Confirm new password</label><input type="password" name="n2"></div><button class="btn btn-primary" type="submit"><span>Update password</span>' + icon('lock', 16) + '</button></form></div>';
        } else {
            var hs = u.wishlist.map(RT.hotel).filter(Boolean);
            body = '<div class="card" id="wishlist"><h3>My wishlist</h3>' + (hs.length ? '<div class="wl">' + hs.map(UI.hotelTile).join('') + '</div>' : '<p class="muted">You have not saved any hotels yet. Tap the heart on any hotel to save it.</p><a class="btn btn-primary" style="margin-top:12px" href="hotels.html"><span>Browse hotels</span>' + icon('arrow', 16) + '</a>') + '</div>';
        }
        $('#profile-root').innerHTML = '<aside><div class="card pcard"><div class="avatar">' + esc(u.name.charAt(0).toUpperCase()) + '</div><h3 style="margin-bottom:2px">' + esc(u.name) + '</h3><small class="muted">' + esc(u.email) + '</small><div class="plist"><div><span>Member since</span><b>' + UI.fdate(u.joined) + '</b></div><div><span>Bookings</span><b>' + nb + '</b></div><div><span>Wishlist</span><b>' + u.wishlist.length + '</b></div></div>' +
            '<a class="btn btn-dark block" style="margin-top:16px" href="bookings.html"><span>My bookings</span>' + icon('arrow', 16) + '</a></div></aside><section><div class="tabs" style="margin-top:0">' + [['info', 'Personal details'], ['pass', 'Password'], ['wish', 'Wishlist']].map(function (t) { return '<button class="tab' + (tab === t[0] ? ' on' : '') + '" data-t="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div>' + body + '</section>';
        UI.hydrate(document); UI.reveal(document);
        var pf = $('#pf'); if (pf) { pf.onsubmit = function (e) { e.preventDefault(); var n = pf.elements['name'].value.trim(), p = pf.elements['phone'].value.trim(); if (n.length < 3) { UI.toast('Please enter your name.', 'err'); return; } if (!/^[0-9+\-\s]{10,14}$/.test(p)) { UI.toast('Please enter a valid phone number.', 'err'); return; } if (RT.db().users.some(function (x) { return x.phone === p && x.id !== u.id; })) { UI.toast('This phone number is already used.', 'err'); return; } u.name = n; u.phone = p; u.city = pf.elements['city'].value.trim(); RT.save(); UI.toast('Profile updated'); draw(); }; }
        var pw = $('#pw'); if (pw) { pw.onsubmit = function (e) { e.preventDefault(); var f = pw.elements; if (u.password !== RT.hash(f['old'].value)) { UI.toast('Current password is incorrect.', 'err'); return; } if (f['n1'].value.length < 6) { UI.toast('New password must be at least 6 characters.', 'err'); return; } if (f['n1'].value !== f['n2'].value) { UI.toast('Passwords do not match.', 'err'); return; } u.password = RT.hash(f['n1'].value); RT.save(); pw.reset(); UI.toast('Password updated'); }; }
    }
    document.addEventListener('click', function (e) { var t = e.target.closest('[data-t]'); if (t) { tab = t.dataset.t; draw(); } });
    draw();
})();