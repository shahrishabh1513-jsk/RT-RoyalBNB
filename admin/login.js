(function () {
    var $ = UI.$, icon = UI.icon;
    if (RT.admin()) { location.replace('dashboard.html'); return; }
    var f = $('#af'), msg = $('#msg');
    f.addEventListener('submit', function (e) {
        e.preventDefault(); var n = f.elements['u'].value, p = f.elements['p'].value;
        if (!n || !p) { msg.className = 'msg err'; msg.textContent = 'Please enter both username and password.'; return; }
        if (RT.adminLogin(n, p)) { msg.className = 'msg ok'; msg.textContent = 'Login successful - redirecting...'; setTimeout(function () { location.href = 'dashboard.html'; }, 600); }
        else { msg.className = 'msg err'; msg.textContent = 'Invalid admin username or password.'; }
    });
    $('.eye').onclick = function () { var i = f.elements['p']; i.type = i.type === 'password' ? 'text' : 'password'; };
    UI.hydrate(document);
})();
