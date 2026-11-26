(function () {
    var $ = UI.$, icon = UI.icon, root = $('#auth-form');
    var next = UI.qs('next') || 'index.html', mode = UI.qs('mode') === 'register' ? 'register' : 'login';
    if (RT.user() && !UI.qs('mode')) { location.replace(next); return; }
    var resetCode = null, resetEmail = null;

    function logo() { return '<div class="auth-logo"><span class="brand-badge"><img src="images/logo/royal_bnb_gold.png" alt="RT Royal BnB"></span><b>ROYAL BNB</b></div>'; }
    function soc() { return '<div class="auth-soc"><a href="https://github.com/RT1504" target="_blank" rel="noopener" aria-label="GitHub" style="background:#34302B">' + icon('github', 16) + '</a><a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram" style="background:#C6A15B">' + icon('instagram', 16) + '</a><a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter" style="background:#82796C">' + icon('twitter', 16) + '</a></div>'; }
    function pw(name, ph) { return '<div class="fld"><label>' + ph + '</label><div class="pw"><input type="password" name="' + name + '" autocomplete="' + (name === 'password' ? 'current-password' : 'new-password') + '"><button type="button" class="eye" aria-label="Show password">' + icon('eye', 18) + '</button></div></div>'; }
    function msg(t, k) { var m = $('#msg'); m.className = 'msg ' + k; m.textContent = t; }

    function draw() {
        if (mode === 'login') {
            root.innerHTML = logo() + '<h2>Welcome Back</h2><div class="msg" id="msg"></div><form id="f" novalidate><div class="fld"><label>Email address</label><input type="email" name="email" autocomplete="email" placeholder="you@example.com"></div>' + pw('password', 'Password') + '<a href="#" class="forgot" data-m="forgot">Forgot Password?</a><button class="btn-login" type="submit">Log in</button></form>' +
                '<div class="alt">Don\'t have an account?<br><a href="#" data-m="register">Create Account</a></div>' + soc() + '<div class="demo-hint">Demo user: <b>aarav@example.com</b> / <b>Test@123</b> &middot; <a href="admin/index.html" style="text-decoration:underline">Admin login</a></div>';
        } else if (mode === 'register') {
            root.innerHTML = logo() + '<h2>Create your account</h2><div class="msg" id="msg"></div><form id="f" novalidate><div class="two"><div class="fld"><label>Full name</label><input name="name" autocomplete="name"></div><div class="fld"><label>Phone</label><input name="phone" inputmode="tel" autocomplete="tel"></div></div><div class="fld"><label>Email address</label><input type="email" name="email" autocomplete="email"></div><div class="two">' + pw('password', 'Password (min 6)') + pw('confirm', 'Confirm password') + '</div><button class="btn-login" type="submit">Create account</button></form><div class="alt">Already have an account?<br><a href="#" data-m="login">Log in</a></div>' + soc();
        } else if (mode === 'forgot') {
            root.innerHTML = logo() + '<h2>Reset your password</h2><div class="msg" id="msg"></div><form id="f" novalidate><div class="fld"><label>Registered email</label><input type="email" name="email" placeholder="you@example.com"></div><button class="btn-login" type="submit">Send reset code</button></form><div class="alt"><a href="#" data-m="login">Back to login</a></div>';
        } else {
            root.innerHTML = logo() + '<h2>Set a new password</h2><div class="msg" id="msg"></div><form id="f" novalidate><div class="fld"><label>6-digit reset code</label><input name="code" inputmode="numeric" maxlength="6"></div>' + pw('password', 'New password') + '<button class="btn-login" type="submit">Update password</button></form><div class="alt"><a href="#" data-m="login">Back to login</a></div>';
            msg('Demo mode: no email is sent. Your reset code is ' + resetCode, 'info');
        }
        UI.hydrate(root); bind();
    }
    function bind() {
        var f = $('#f'), b = f.querySelector('.btn-login');
        root.querySelectorAll('.eye').forEach(function (e) { e.onclick = function () { var i = e.parentNode.querySelector('input'); i.type = i.type === 'password' ? 'text' : 'password'; }; });
        f.onsubmit = function (ev) {
            ev.preventDefault(); var v = function (n) { return f.elements[n] ? f.elements[n].value.trim() : ''; }, pwv = f.elements['password'] ? f.elements['password'].value : '';
            if (mode === 'login') {
                if (!/^\S+@\S+\.\S+$/.test(v('email'))) { return msg('Please enter a valid email address.', 'err'); } if (!pwv) { return msg('Please enter your password.', 'err'); }
                var r = RT.login(v('email'), pwv); if (!r.ok) { return msg(r.msg, 'err'); }
                msg('Welcome back, ' + r.user.name.split(' ')[0] + '! Redirecting...', 'ok'); b.disabled = true; setTimeout(function () { location.href = next; }, 700);
            } else if (mode === 'register') {
                if (v('name').length < 3) { return msg('Please enter your full name.', 'err'); } if (!/^[0-9+\-\s]{10,14}$/.test(v('phone'))) { return msg('Please enter a valid phone number.', 'err'); }
                if (!/^\S+@\S+\.\S+$/.test(v('email'))) { return msg('Please enter a valid email address.', 'err'); } if (pwv.length < 6) { return msg('Password must be at least 6 characters.', 'err'); }
                if (pwv !== f.elements['confirm'].value) { return msg('Passwords do not match.', 'err'); }
                var rr = RT.register({ name: v('name'), phone: v('phone'), email: v('email'), password: pwv }); if (!rr.ok) { return msg(rr.msg, 'err'); }
                msg('Account created! Redirecting...', 'ok'); b.disabled = true; setTimeout(function () { location.href = next; }, 800);
            } else if (mode === 'forgot') {
                var u = RT.db().users.filter(function (x) { return x.email === v('email').toLowerCase(); })[0];
                if (!u) { return msg('No account found with this email.', 'err'); }
                resetCode = String(Math.floor(100000 + Math.random() * 900000)); resetEmail = u.email; mode = 'reset'; draw();
            } else {
                if (v('code') !== resetCode) { return msg('Incorrect reset code.', 'err'); } if (pwv.length < 6) { return msg('Password must be at least 6 characters.', 'err'); }
                var us = RT.db().users.filter(function (x) { return x.email === resetEmail; })[0]; us.password = RT.hash(pwv); RT.save(); mode = 'login'; draw(); msg('Password updated - please log in.', 'ok');
            }
        };
    }
    root.addEventListener('click', function (e) { var a = e.target.closest('[data-m]'); if (a) { e.preventDefault(); mode = a.dataset.m; draw(); } });
    draw(); UI.init('login');
})();
