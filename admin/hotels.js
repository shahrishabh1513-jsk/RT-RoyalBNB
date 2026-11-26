(function () {
    var body = A.shell('hotels', 'Manage Hotels', '<button class="btn btn-primary sm" id="add"><span data-i="plus" data-s="15"></span><span>Add hotel</span></button>'); if (!body) { return; }
    var icon = UI.icon, money = UI.money, esc = UI.esc, st = { q: '', loc: '' };
    var TYPES = ['Heritage Palace', 'Boutique Haveli', 'Heritage Hotel', 'Hill Resort', 'Desert Resort', 'Beach Resort', 'Garden Resort', 'City Hotel', 'Temple-side Hotel', 'Budget Heritage', 'Budget Boutique', 'Budget Stay'];

    function draw() {
        var list = RT.db().hotels.filter(function (h) { return (!st.loc || h.locationId === st.loc) && (!st.q || (h.name + h.city + h.type).toLowerCase().indexOf(st.q.toLowerCase()) >= 0); });
        body.innerHTML = '<div class="toolbar"><div class="grow">' + icon('search', 16) + '<input id="q" placeholder="Search hotels..." value="' + esc(st.q) + '"></div><select id="lf"><option value="">All destinations</option>' + RT.locations.map(function (l) { return '<option value="' + l.id + '"' + (st.loc === l.id ? ' selected' : '') + '>' + l.name + '</option>'; }).join('') + '</select><span class="muted">' + list.length + ' hotels</span></div>' +
            '<div class="panel"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Hotel</th><th>Destination</th><th>Type</th><th>Rating</th><th>From</th><th>Rooms</th><th>Active</th><th>Actions</th></tr></thead><tbody>' + list.map(function (h) {
                return '<tr><td><div style="display:flex;gap:12px;align-items:center"><img class="thumb" src="' + A.img(h.images[0]) + '" alt=""><div><span class="nm">' + esc(h.name) + '</span><small>' + h.stars + '-star &middot; ' + esc(h.area) + '</small></div></div></td><td>' + esc(h.city) + '</td><td>' + esc(h.type) + '</td><td>' + h.rating.toFixed(1) + ' <small>(' + h.reviewsCount + ')</small></td><td>' + money(RT.minPrice(h)) + '</td><td>' + RT.db().rooms.filter(function (r) { return r.hotelId === h.id; }).length + '</td>' +
                    '<td><span class="sw' + (h.status === 'active' ? ' on' : '') + '" data-tg="' + h.id + '"></span></td><td><div class="acts"><button class="ib" data-ed="' + h.id + '" title="Edit">' + icon('edit', 15) + '</button><a class="ib" href="../hotel.html?id=' + h.id + '" target="_blank" title="View">' + icon('eye', 15) + '</a><button class="ib dng" data-del="' + h.id + '" title="Delete">' + icon('trash', 15) + '</button></div></td></tr>'; }).join('') + '</tbody></table></div></div>';
        UI.hydrate(document);
        document.getElementById('q').oninput = function () { st.q = this.value; var p = this.selectionStart; draw(); var n = document.getElementById('q'); n.focus(); n.setSelectionRange(p, p); };
        document.getElementById('lf').onchange = function () { st.loc = this.value; draw(); };
    }
    function form(h) {
        var isNew = !h; h = h || { name: '', locationId: 'udaipur', type: TYPES[0], stars: 4, area: '', tagline: '', description: '', amenities: ['wifi', 'tv', 'ac', 'hotwater'], nearby: [], images: [], status: 'active' };
        var imgs = h.images.slice();
        var m = UI.modal('<h3>' + (isNew ? 'Add new hotel' : 'Edit hotel') + '</h3><form id="hf" novalidate><div class="two"><div class="fld"><label>Hotel name *</label><input name="name" value="' + esc(h.name) + '"></div><div class="fld"><label>Destination *</label><select name="loc">' + RT.locations.map(function (l) { return '<option value="' + l.id + '"' + (h.locationId === l.id ? ' selected' : '') + '>' + l.name + ', ' + l.state + '</option>'; }).join('') + '</select></div></div>' +
            '<div class="two"><div class="fld"><label>Property type</label><select name="type">' + TYPES.map(function (t) { return '<option' + (h.type === t ? ' selected' : '') + '>' + t + '</option>'; }).join('') + '</select></div><div class="fld"><label>Star class</label><select name="stars">' + [3, 4, 5].map(function (n) { return '<option' + (h.stars === n ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></div></div>' +
            '<div class="two"><div class="fld"><label>Area / locality *</label><input name="area" value="' + esc(h.area) + '" placeholder="e.g. Lake Pichola Ghats"></div>' + (isNew ? '<div class="fld"><label>Starting price / night (&#8377;) *</label><input name="price" inputmode="numeric" placeholder="4500"></div>' : '<div class="fld"><label>Status</label><select name="status"><option value="active"' + (h.status === 'active' ? ' selected' : '') + '>Active</option><option value="inactive"' + (h.status !== 'active' ? ' selected' : '') + '>Inactive</option></select></div>') + '</div>' +
            '<div class="fld"><label>Tagline</label><input name="tagline" value="' + esc(h.tagline) + '"></div><div class="fld"><label>Description</label><textarea name="description">' + esc(h.description) + '</textarea></div>' +
            '<div class="fld"><label>Amenities</label><div class="am-pick">' + Object.keys(RT.amenities).map(function (k) { return '<label class="chk"><input type="checkbox" name="am" value="' + k + '"' + (h.amenities.indexOf(k) >= 0 ? ' checked' : '') + '>' + RT.amenities[k].n + '</label>'; }).join('') + '</div></div>' +
            '<div class="fld"><label>Nearby places with distance (one per line: Place | km)</label><textarea name="nearby" placeholder="City Palace | 0.6">' + h.nearby.map(function (n) { return n.name + ' | ' + n.km; }).join('\n') + '</textarea></div>' +
            '<div class="fld"><label>Photos (first one is the cover)</label><input type="file" id="files" accept="image/*" multiple><div id="prev" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"></div></div><div class="fld"><span class="err" id="e"></span></div>' +
            '<div class="row-end"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button type="submit" class="btn btn-primary"><span>' + (isNew ? 'Add hotel' : 'Save changes') + '</span></button></div></form>', 'xl');
        function prev() { m.querySelector('#prev').innerHTML = imgs.map(function (s, i) { return '<div style="position:relative"><img src="' + A.img(s) + '" style="width:84px;height:62px;object-fit:cover;border-radius:10px"><button type="button" data-rm="' + i + '" style="position:absolute;top:-6px;right:-6px;background:var(--danger);color:#fff;border-radius:50%;width:20px;height:20px;font-size:12px">&times;</button></div>'; }).join(''); }
        prev();
        m.querySelector('#prev').onclick = function (e) { var b = e.target.closest('[data-rm]'); if (b) { imgs.splice(+b.dataset.rm, 1); prev(); } };
        m.querySelector('#files').onchange = function () { var fs = Array.prototype.slice.call(this.files); Promise.all(fs.map(function (f) { return A.readImage(f, 1100); })).then(function (r) { imgs = imgs.concat(r); prev(); }).catch(function (e) { UI.toast(e.message || 'Could not read image', 'err'); }); };
        m.querySelector('#hf').onsubmit = function (ev) {
            ev.preventDefault(); var f = ev.target.elements, err = m.querySelector('#e'); err.textContent = '';
            var name = f['name'].value.trim(), area = f['area'].value.trim();
            if (name.length < 3 || area.length < 2) { err.textContent = 'Please enter the hotel name and area.'; return; }
            if (isNew && !(+f['price'].value >= 500)) { err.textContent = 'Please enter a valid starting price (min 500).'; return; }
            if (!imgs.length) { err.textContent = 'Please add at least one photo.'; return; }
            var loc0 = f['loc'].value; if ((isNew || loc0 !== h.locationId) && RT.db().hotels.filter(function (x) { return x.locationId === loc0 && x !== h; }).length >= 5) { err.textContent = 'Each destination can have at most 5 hotels.'; return; }
            var loc = RT.location(f['loc'].value), am = Array.prototype.slice.call(m.querySelectorAll('[name=am]:checked')).map(function (c) { return c.value; });
            var near = f['nearby'].value.split('\n').map(function (l) { var p = l.split('|'); return { name: (p[0] || '').trim(), km: parseFloat(p[1]) }; }).filter(function (n) { return n.name && !isNaN(n.km); });
            while (imgs.length < 3) { imgs.push(imgs[imgs.length - 1]); }
            var data = { name: name, locationId: loc.id, city: loc.name, type: f['type'].value, stars: +f['stars'].value, area: area, address: area + ', ' + loc.name + ', ' + loc.state, tagline: f['tagline'].value.trim(), description: f['description'].value.trim() || (name + ' in ' + loc.name + '.'), amenities: am, nearby: near, images: imgs };
            var db = RT.db();
            if (isNew) {
                var id = RT.nextId('hotels'), p = +f['price'].value;
                db.hotels.push(Object.assign({ id: id, rating: 4, reviewsCount: 0, priceFrom: p, featured: 0, status: 'active', checkIn: '12:00 PM', checkOut: '11:00 AM', policy: 'Free cancellation up to 48 hours before check-in. Valid photo ID required at check-in.' }, data));
                var base = ['wifi', 'tv', 'ac', 'hotwater'], rid = RT.nextId('rooms');
                db.rooms.push({ id: rid, hotelId: id, category: 'Deluxe Room', name: 'Deluxe Room', price: p, adults: 2, children: 1, bed: 'King', size: 320, quantity: 6, amenities: base, images: imgs.slice(0, 3), status: 'active', description: 'A comfortable deluxe room at ' + name + '.' });
                db.rooms.push({ id: rid + 1, hotelId: id, category: 'Suite', name: 'Premium Suite', price: Math.round(p * 1.7 / 100) * 100, adults: 3, children: 2, bed: 'King + Sofa bed', size: 520, quantity: 3, amenities: base.concat('breakfast'), images: imgs.slice(0, 3), status: 'active', description: 'A spacious premium suite at ' + name + '.' });
                UI.toast('Hotel added with 2 room categories - edit them in Manage Rooms');
            } else { Object.assign(h, data, { status: f['status'].value }); UI.toast('Hotel updated'); }
            if (!RT.save()) { return; } m.close(); draw();
        };
    }
    document.addEventListener('click', function (e) {
        if (e.target.closest('#add')) { form(null); return; }
        var ed = e.target.closest('[data-ed]'); if (ed) { form(RT.hotel(ed.dataset.ed)); return; }
        var tg = e.target.closest('[data-tg]'); if (tg) { var h = RT.hotel(tg.dataset.tg); h.status = h.status === 'active' ? 'inactive' : 'active'; RT.save(); UI.toast(h.name + ' is now ' + h.status); draw(); return; }
        var dl = e.target.closest('[data-del]'); if (dl) { var hh = RT.hotel(dl.dataset.del); UI.confirm('Delete <b>' + esc(hh.name) + '</b> and all of its rooms? Existing booking records are kept.', function () { var db = RT.db(); db.hotels = db.hotels.filter(function (x) { return x.id !== hh.id; }); db.rooms = db.rooms.filter(function (x) { return x.hotelId !== hh.id; }); RT.save(); UI.toast('Hotel deleted'); draw(); }); }
    });
    draw();
})();
