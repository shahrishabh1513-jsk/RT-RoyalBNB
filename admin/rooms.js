(function () {
    var body = A.shell('rooms', 'Manage Rooms', '<button class="btn btn-primary sm" id="add"><span data-i="plus" data-s="15"></span><span>Add room</span></button>'); if (!body) { return; }
    var icon = UI.icon, money = UI.money, esc = UI.esc, hf = UI.qs('hotel') || '';
    var today = RT.today(), tmr = RT.addDays(today, 1);
    function draw() {
        var rooms = RT.db().rooms.filter(function (r) { return !hf || String(r.hotelId) === String(hf); });
        body.innerHTML = '<div class="toolbar"><select id="hf" style="max-width:340px"><option value="">All hotels</option>' + RT.db().hotels.map(function (h) { return '<option value="' + h.id + '"' + (String(hf) === String(h.id) ? ' selected' : '') + '>' + esc(h.name) + ' (' + h.city + ')</option>'; }).join('') + '</select><span class="muted">' + rooms.length + ' room categories</span></div>' +
            '<div class="panel"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Room</th><th>Hotel</th><th>Price / night</th><th>Guests</th><th>Inventory</th><th>Free tonight</th><th>Active</th><th>Actions</th></tr></thead><tbody>' + rooms.map(function (r) {
                var free = RT.available(r.id, today, tmr);
                return '<tr><td><div style="display:flex;gap:12px;align-items:center"><img class="thumb" src="' + A.img(r.images[0]) + '" alt=""><div><span class="nm">' + esc(r.name) + '</span><small>' + esc(r.category) + ' &middot; ' + esc(r.bed) + ' &middot; ' + r.size + ' sq ft</small></div></div></td><td>' + esc(A.hotelName(r.hotelId)) + '</td><td><b>' + money(r.price) + '</b></td><td>' + r.adults + 'A + ' + r.children + 'C</td><td>' + r.quantity + ' rooms</td><td><b style="color:' + (free ? 'var(--success)' : 'var(--danger)') + '">' + free + '</b> / ' + r.quantity + '<div class="mini-bar"><i style="width:' + (free / r.quantity * 100) + '%"></i></div></td>' +
                    '<td><span class="sw' + (r.status === 'active' ? ' on' : '') + '" data-tg="' + r.id + '"></span></td><td><div class="acts"><button class="ib" data-ed="' + r.id + '" title="Edit">' + icon('edit', 15) + '</button><button class="ib dng" data-del="' + r.id + '" title="Delete">' + icon('trash', 15) + '</button></div></td></tr>'; }).join('') + '</tbody></table></div></div>';
        UI.hydrate(document); document.getElementById('hf').onchange = function () { hf = this.value; draw(); };
    }
    function form(r) {
        var isNew = !r; r = r || { hotelId: hf || RT.db().hotels[0].id, name: '', category: 'Deluxe Room', price: '', adults: 2, children: 1, bed: 'King', size: 320, quantity: 5, amenities: ['wifi', 'tv', 'ac', 'hotwater'], status: 'active', description: '' };
        var m = UI.modal('<h3>' + (isNew ? 'Add room category' : 'Edit room') + '</h3><form id="rf" novalidate><div class="fld"><label>Hotel</label><select name="hotel"' + (isNew ? '' : ' disabled') + '>' + RT.db().hotels.map(function (h) { return '<option value="' + h.id + '"' + (h.id === r.hotelId ? ' selected' : '') + '>' + esc(h.name) + '</option>'; }).join('') + '</select></div>' +
            '<div class="two"><div class="fld"><label>Room name *</label><input name="name" value="' + esc(r.name) + '"></div><div class="fld"><label>Category</label><select name="cat">' + ['Standard Room', 'Deluxe Room', 'Heritage Room', 'Premium Room', 'Sea View Room', 'Luxury Tent', 'Royal Tent', 'Suite', 'Premium Suite', 'Family Suite', 'Villa'].map(function (c) { return '<option' + (r.category === c ? ' selected' : '') + '>' + c + '</option>'; }).join('') + '</select></div></div>' +
            '<div class="two"><div class="fld"><label>Price / night (&#8377;) *</label><input name="price" inputmode="numeric" value="' + r.price + '"></div><div class="fld"><label>Rooms in inventory *</label><input name="qty" inputmode="numeric" value="' + r.quantity + '"></div></div>' +
            '<div class="two"><div class="fld"><label>Max adults</label><input name="adults" inputmode="numeric" value="' + r.adults + '"></div><div class="fld"><label>Max children</label><input name="children" inputmode="numeric" value="' + r.children + '"></div></div>' +
            '<div class="two"><div class="fld"><label>Bed type</label><input name="bed" value="' + esc(r.bed) + '"></div><div class="fld"><label>Size (sq ft)</label><input name="size" inputmode="numeric" value="' + r.size + '"></div></div>' +
            '<div class="fld"><label>Description</label><textarea name="desc">' + esc(r.description) + '</textarea></div><div class="fld"><label>Amenities</label><div class="am-pick">' + Object.keys(RT.amenities).map(function (k) { return '<label class="chk"><input type="checkbox" name="am" value="' + k + '"' + (r.amenities.indexOf(k) >= 0 ? ' checked' : '') + '>' + RT.amenities[k].n + '</label>'; }).join('') + '</div></div><div class="fld"><label>Status</label><select name="status"><option value="active"' + (r.status === 'active' ? ' selected' : '') + '>Active</option><option value="inactive"' + (r.status !== 'active' ? ' selected' : '') + '>Inactive</option></select></div><div class="fld"><span class="err" id="e"></span></div>' +
            '<div class="row-end"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary" type="submit"><span>' + (isNew ? 'Add room' : 'Save changes') + '</span></button></div></form>');
        m.querySelector('#rf').onsubmit = function (ev) {
            ev.preventDefault(); var f = ev.target.elements, err = m.querySelector('#e');
            var d = { name: f['name'].value.trim(), category: f['cat'].value, price: +f['price'].value, quantity: +f['qty'].value, adults: +f['adults'].value, children: +f['children'].value, bed: f['bed'].value.trim(), size: +f['size'].value, description: f['desc'].value.trim(), status: f['status'].value, amenities: Array.prototype.slice.call(m.querySelectorAll('[name=am]:checked')).map(function (c) { return c.value; }) };
            if (d.name.length < 3) { err.textContent = 'Please enter a room name.'; return; } if (!(d.price >= 500)) { err.textContent = 'Please enter a valid price (min 500).'; return; } if (!(d.quantity >= 1) || !(d.adults >= 1)) { err.textContent = 'Inventory and adults must be at least 1.'; return; }
            var db = RT.db();
            if (isNew) { var hid = +f['hotel'].value; if (db.rooms.filter(function (x) { return x.hotelId === hid; }).length >= 4) { err.textContent = 'A hotel can have at most 4 room categories.'; return; } var h = RT.hotel(hid); db.rooms.push(Object.assign({ id: RT.nextId('rooms'), hotelId: hid, images: h.images.slice(0, 3) }, d)); UI.toast('Room added'); }
            else { Object.assign(r, d); UI.toast('Room updated'); }
            if (!RT.save()) { return; } m.close(); draw();
        };
    }
    document.addEventListener('click', function (e) {
        if (e.target.closest('#add')) { form(null); return; }
        var ed = e.target.closest('[data-ed]'); if (ed) { form(RT.room(ed.dataset.ed)); return; }
        var tg = e.target.closest('[data-tg]'); if (tg) { var r = RT.room(tg.dataset.tg); r.status = r.status === 'active' ? 'inactive' : 'active'; RT.save(); UI.toast(r.name + ' is now ' + r.status); draw(); return; }
        var dl = e.target.closest('[data-del]'); if (dl) { var rr = RT.room(dl.dataset.del); var fut = RT.db().bookings.some(function (b) { return b.roomId === rr.id && b.status === 'confirmed' && b.checkOut >= today; }); if (fut) { UI.toast('This room has upcoming bookings - deactivate it instead.', 'err'); return; } UI.confirm('Delete <b>' + esc(rr.name) + '</b>?', function () { var db = RT.db(); db.rooms = db.rooms.filter(function (x) { return x.id !== rr.id; }); RT.save(); UI.toast('Room deleted'); draw(); }); }
    });
    draw();
})();
