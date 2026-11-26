(function () {
    if (!UI.requireLogin()) { return; }
    var $ = UI.$, $$ = UI.$$, icon = UI.icon, money = UI.money, esc = UI.esc, u = RT.user();
    var b = RT.db().bookings.filter(function (x) { return x.id === +UI.qs('booking') && x.userId === u.id; })[0], root = $('#payment-root');
    if (!b) { root.innerHTML = '<div class="empty"><h3>Booking not found</h3><a class="btn btn-primary" href="bookings.html">My bookings</a></div>'; return; }
    var h = RT.hotel(b.hotelId), r = RT.room(b.roomId);

    function summary(extra) {
        return '<div class="card book-card"><div class="sum-hotel"><img src="' + r.images[0] + '" alt=""><div><h4>' + esc(h.name) + '</h4><small class="muted">' + esc(h.city) + '</small><br><small><b>' + esc(r.name) + '</b></small></div></div>' +
            '<div class="sumline"><span>Booking ref</span><b>' + b.ref + '</b></div><div class="sumline"><span>Check-in</span><span>' + UI.fdate(b.checkIn) + '</span></div><div class="sumline"><span>Check-out</span><span>' + UI.fdate(b.checkOut) + '</span></div><div class="sumline"><span>Guests</span><span>' + b.adults + ' adults, ' + b.children + ' children</span></div>' +
            '<div class="sumline"><span>Room charges (' + b.nights + 'n x ' + b.rooms + ')</span><span>' + money(b.subtotal) + '</span></div>' + (b.discount ? '<div class="sumline disc"><span>Coupon ' + b.coupon + '</span><span>- ' + money(b.discount) + '</span></div>' : '') + '<div class="sumline"><span>Taxes (12%)</span><span>' + money(b.tax) + '</span></div><div class="sumline tot"><span>Total</span><span>' + money(b.total) + '</span></div>' + (extra || '') + '</div>';
    }
    function done(pay) {
        $('#pay-title').textContent = 'Booking confirmed!';
        $('#pay-steps').innerHTML = '<div class="stp done"><i>&#10003;</i>Guest details</div><div class="stp done"><i>&#10003;</i>Payment</div><div class="stp on"><i>3</i>Confirmation</div>';
        root.innerHTML = '<div class="checkout"><div class="card success"><svg class="tick" viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M14 27l8 8 16-17"/></svg><h2>' + (pay.method === 'Pay at Hotel' ? 'Reservation confirmed' : 'Payment successful') + '</h2>' +
            '<p class="muted" style="margin:8px 0">Thank you, ' + esc(b.guestName) + '! A confirmation has been sent to ' + esc(b.email) + ' (demo mode).</p><div class="ref">' + b.ref + '</div><p class="muted" style="margin-bottom:22px">Transaction ' + pay.txnId + ' &middot; ' + pay.method + (pay.method === 'Pay at Hotel' ? ' &middot; pay ' + money(b.total) + ' at check-in' : ' &middot; ' + money(pay.amount) + ' paid') + '</p>' +
            '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap"><a class="btn btn-primary" href="bookings.html"><span>View my bookings</span>' + icon('arrow', 16) + '</a><a class="btn btn-ghost" href="invoice.html?ref=' + b.ref + '">' + icon('download', 16) + '<span>Invoice</span></a><a class="btn btn-ghost" href="index.html">Back to home</a></div></div><aside>' + summary() + '</aside></div>';
    }
    if (b.status === 'confirmed' || b.status === 'completed') { done(RT.db().payments.filter(function (p) { return p.bookingId === b.id; })[0] || { method: 'Online', txnId: '-', amount: b.total }); return; }
    if (b.status === 'cancelled') { root.innerHTML = '<div class="empty"><h3>This booking was cancelled</h3><a class="btn btn-primary" href="hotels.html">Find another stay</a></div>'; return; }

    var methods = [['UPI', 'smartphone', 'UPI', 'Pay with GPay, PhonePe, Paytm or any UPI app'], ['card', 'card', 'Credit / Debit Card', 'Visa, Mastercard, RuPay'], ['nb', 'building', 'Net Banking', 'All major Indian banks'], ['hotel', 'home', 'Pay at Hotel', 'Reserve now, pay at check-in']];
    root.innerHTML = '<div class="checkout"><div class="card"><h3>Payment method</h3><div class="pay-methods" id="pm">' + methods.map(function (m, i) { return '<label class="pm' + (i === 0 ? ' sel' : '') + '"><input type="radio" name="pm" value="' + m[0] + '"' + (i === 0 ? ' checked' : '') + '><span class="ico">' + icon(m[1] === 'smartphone' ? 'phone' : m[1], 20) + '</span><span><b>' + m[2] + '</b><small>' + m[3] + '</small></span></label>'; }).join('') + '</div><div class="pay-form" id="pf"></div>' +
        '<button class="btn btn-primary block" id="pay" style="margin-top:20px"><span id="pay-t">Pay ' + money(b.total) + '</span>' + icon('lock', 16) + '</button><p class="muted" style="font-size:12.5px;margin-top:12px;text-align:center">' + icon('shield', 14) + ' Demo checkout - no real payment is taken. Tip: a card number ending in <b>0000</b> simulates a failed payment.</p></div><aside>' + summary() + '</aside></div>';
    var cur = 'UPI';
    function form() {
        var f = $('#pf');
        if (cur === 'UPI') { f.innerHTML = '<div class="fld"><label>UPI ID</label><input id="upi" placeholder="yourname@okbank"></div>'; }
        else if (cur === 'card') { f.innerHTML = '<div class="fld"><label>Card number</label><input id="cn" inputmode="numeric" maxlength="19" placeholder="1234 5678 9012 3456"></div><div class="fld"><label>Name on card</label><input id="cname" placeholder="As printed on card"></div><div class="two"><div class="fld"><label>Expiry (MM/YY)</label><input id="cexp" maxlength="5" placeholder="08/29"></div><div class="fld"><label>CVV</label><input id="ccvv" type="password" maxlength="4" placeholder="***"></div></div>'; var cn = $('#cn'); cn.oninput = function () { this.value = this.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim(); }; $('#cexp').oninput = function () { var v = this.value.replace(/\D/g, '').slice(0, 4); this.value = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v; }; }
        else if (cur === 'nb') { f.innerHTML = '<div class="fld"><label>Select your bank</label><select id="bank"><option value="">Choose bank</option><option>State Bank of India</option><option>HDFC Bank</option><option>ICICI Bank</option><option>Axis Bank</option><option>Kotak Mahindra Bank</option><option>Bank of Baroda</option></select></div>'; }
        else { f.innerHTML = '<p class="muted">Your room is held for you. Please carry a valid photo ID and pay <b>' + money(b.total) + '</b> at the hotel reception during check-in.</p>'; }
        $('#pay-t').textContent = cur === 'hotel' ? 'Confirm reservation' : 'Pay ' + money(b.total);
    }
    $('#pm').addEventListener('change', function (e) { cur = e.target.value; $$('.pm').forEach(function (p) { p.classList.toggle('sel', p.querySelector('input').checked); }); form(); });
    form();
    $('#pay').onclick = function () {
        var btn = this, name = cur === 'UPI' ? 'UPI' : cur === 'card' ? 'Credit / Debit Card' : cur === 'nb' ? 'Net Banking' : 'Pay at Hotel', fail = false;
        if (cur === 'UPI' && !/^[\w.\-]{2,}@[\w]{2,}$/.test($('#upi').value.trim())) { UI.toast('Enter a valid UPI ID (e.g. name@okbank).', 'err'); return; }
        if (cur === 'card') {
            var n = $('#cn').value.replace(/\s/g, ''); if (n.length !== 16 || !$('#cname').value.trim() || !/^\d{2}\/\d{2}$/.test($('#cexp').value) || $('#ccvv').value.length < 3) { UI.toast('Please complete all card details.', 'err'); return; }
            fail = /0000$/.test(n);
        }
        if (cur === 'nb' && !$('#bank').value) { UI.toast('Please choose your bank.', 'err'); return; }
        if (RT.available(b.roomId, b.checkIn, b.checkOut) < 0) { return; }
        btn.disabled = true; btn.innerHTML = '<span class="spinner"></span><span>Processing...</span>';
        setTimeout(function () {
            var pay = RT.pay(b.id, name, !fail); b = RT.db().bookings.filter(function (x) { return x.id === b.id; })[0];
            if (fail) { btn.disabled = false; btn.innerHTML = '<span>Try again</span>' + icon('lock', 16); UI.toast('Payment failed - the bank declined the transaction.', 'err'); return; }
            done(pay); window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1700);
    };
})();
