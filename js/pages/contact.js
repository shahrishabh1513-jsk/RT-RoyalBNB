(function () {
    var f = document.getElementById('cf'), u = RT.user();
    f.elements['dest'].innerHTML += RT.locations.map(function (l) { return '<option>' + l.name + ', ' + l.state + '</option>'; }).join('') + '<option>Not sure yet - suggest something</option>';
    f.elements['date'].min = RT.today();
    if (u) { f.elements['name'].value = u.name; f.elements['email'].value = u.email; f.elements['phone'].value = u.phone; }
    f.onsubmit = function (e) {
        e.preventDefault(); var v = function (n) { return UI.esc(f.elements[n].value); }, err = document.getElementById('cf-err'); err.textContent = '';
        if (v('name').length < 3) { err.textContent = 'Please enter your name.'; return; } if (!/^\S+@\S+\.\S+$/.test(f.elements['email'].value.trim())) { err.textContent = 'Please enter a valid email address.'; return; }
        if (v('message').length < 5) { err.textContent = 'Please add a short message.'; return; }
        var db = RT.db(), subj = (v('dest') ? 'Trip enquiry: ' + v('dest') : 'General enquiry') + (v('trav') ? ' (' + v('trav') + ')' : '') + (f.elements['date'].value ? ' on ' + f.elements['date'].value : '');
        db.queries.push({ id: RT.nextId('queries'), name: v('name'), email: v('email'), phone: v('phone'), subject: subj, message: v('message'), date: RT.today(), seen: 0 }); RT.save();
        f.reset(); if (u) { f.elements['name'].value = u.name; f.elements['email'].value = u.email; f.elements['phone'].value = u.phone; }
        UI.modal('<div class="success" style="padding:20px 10px"><svg class="tick" viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M14 27l8 8 16-17"/></svg><h3>Thank you!</h3><p class="muted">We have received your message and will confirm availability within 24 hours.</p><div class="row-end" style="justify-content:center"><button class="btn btn-primary" data-close><span>Close</span></button></div></div>', 'sm');
    };
})();
