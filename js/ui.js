/* =====================================================================
   RT ROYAL BNB v2 - shared UI (icons, illustrated scenes, header, footer)
   ===================================================================== */
(function (w) {
    'use strict';
    var d = document;
    var $ = function (s, r) { return (r || d).querySelector(s); };
    var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };

    /* ------------------------------------------------------ icons -- */
    var P = {
        search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
        pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
        calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
        user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
        tv: '<rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/>',
        wind: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>',
        sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
        droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
        coffee: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>',
        phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
        mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
        clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
        heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
        arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
        arrowur: '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
        check: '<polyline points="20 6 9 17 4 12"/>',
        x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
        menu: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
        github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
        instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
        facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
        twitter: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>',
        car: '<path d="M5 17h14M3 13l2-6h14l2 6v4h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H3z"/>',
        leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
        shirt: '<path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
        headphones: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
        waves: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
        plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
        compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
        tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
        card: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
        trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"/>',
        edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
        plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
        minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
        logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
        home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
        grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
        bed: '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>',
        chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
        rupee: '<path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a4 4 0 0 0 0-10"/>',
        mess: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
        filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
        chev: '<polyline points="6 9 12 15 18 9"/>',
        eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
        download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
        lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
        building: '<rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/><line x1="8" y1="6" x2="8.01" y2="6"/><line x1="12" y1="6" x2="12.01" y2="6"/><line x1="16" y1="6" x2="16.01" y2="6"/><line x1="8" y1="10" x2="8.01" y2="10"/><line x1="12" y1="10" x2="12.01" y2="10"/><line x1="16" y1="10" x2="16.01" y2="10"/><line x1="8" y1="14" x2="8.01" y2="14"/><line x1="12" y1="14" x2="12.01" y2="14"/><line x1="16" y1="14" x2="16.01" y2="14"/>',
        up: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
        whatsapp: '<path d="M21 11.5a8.4 8.4 0 0 1-12.5 7.3L3 20.5l1.7-5.4A8.5 8.5 0 1 1 21 11.5z"/>'
    };
    function icon(n, size, cls) {
        return '<svg class="ic' + (cls ? ' ' + cls : '') + '" width="' + (size || 18) + '" height="' + (size || 18) + '" viewBox="0 0 24 24" fill="' + (n === 'star' ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || '') + '</svg>';
    }

    /* ------------------------------------------ illustrated scenes -- */
    var sid = 0;
    function dome(cx, by, r, f) { return '<path d="M' + (cx - r) + ' ' + by + 'a' + r + ' ' + r + ' 0 0 1 ' + 2 * r + ' 0z" fill="' + f + '"/><rect x="' + (cx - 1) + '" y="' + (by - r - 9) + '" width="2" height="9" fill="' + f + '"/><circle cx="' + cx + '" cy="' + (by - r - 10) + '" r="2" fill="' + f + '"/>'; }
    function bat(x, y, wd, f, s) { var o = ''; s = s || 5; for (var i = 0; i < Math.floor(wd / (s * 2)); i++) { o += '<rect x="' + (x + i * s * 2) + '" y="' + (y - s) + '" width="' + s + '" height="' + s + '" fill="' + f + '"/>'; } return o; }
    function arch(x, y, wd, h, f) { return '<path d="M' + x + ' ' + (y + h) + 'V' + (y + wd / 2) + 'a' + wd / 2 + ' ' + wd / 2 + ' 0 0 1 ' + wd + ' 0V' + (y + h) + 'z" fill="' + f + '"/>'; }
    function rect(x, y, wd, h, f, o) { return '<rect x="' + x + '" y="' + y + '" width="' + wd + '" height="' + h + '" fill="' + f + '"' + (o ? ' opacity="' + o + '"' : '') + '/>'; }
    function birds(x, y) { return '<g fill="none" stroke="#5B3B36" stroke-width="1.4" stroke-linecap="round" opacity=".6"><path d="M' + x + ' ' + y + 'q5 -6 10 0q5 -6 10 0"/><path d="M' + (x + 30) + ' ' + (y - 12) + 'q4 -5 8 0q4 -5 8 0"/><path d="M' + (x - 24) + ' ' + (y + 10) + 'q4 -5 8 0q4 -5 8 0"/></g>'; }
    function sky(id, stops) { return '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' + stops.map(function (s) { return '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"/>'; }).join('') + '</linearGradient>'; }
    function palace(c, win) {
        var o = rect(95, 312, 210, 46, c) + rect(165, 266, 70, 50, c) + rect(110, 282, 20, 36, c) + rect(270, 282, 20, 36, c) + rect(140, 296, 22, 22, c) + rect(238, 296, 22, 22, c);
        o += dome(200, 266, 34, c) + dome(120, 282, 11, c) + dome(280, 282, 11, c) + dome(151, 296, 9, c) + dome(249, 296, 9, c);
        o += bat(95, 312, 210, c, 5);
        for (var i = 0; i < 6; i++) { o += arch(106 + i * 33, 326, 12, 20, win); }
        o += arch(188, 280, 24, 36, win);
        return o;
    }

    function scene(kind) {
        var u = 's' + (++sid), o = '', defs = '', i, k;
        if (kind === 'udaipur') {
            defs = sky(u + 'a', [[0, '#FCE7BE'], [0.55, '#F2B37B'], [0.78, '#D98266']]) + sky(u + 'b', [[0, '#E7A27C'], [1, '#6E3F45']]);
            o += '<rect width="400" height="500" fill="url(#' + u + 'a)"/><circle cx="276" cy="226" r="92" fill="#FFF3D6" opacity=".25"/><circle cx="276" cy="226" r="58" fill="#FFF3D6" opacity=".92"/>';
            o += '<path d="M0 300L50 268L110 295L180 252L250 290L330 262L400 296V400H0Z" fill="#A8696A" opacity=".55"/><path d="M0 330L70 300L140 322L230 292L320 320L400 304V400H0Z" fill="#7C4B4C" opacity=".7"/>';
            o += palace('#4A2F2D', '#F6C970') + '<rect y="358" width="400" height="142" fill="url(#' + u + 'b)"/>';
            o += '<g transform="translate(0,716) scale(1,-1)" opacity=".22">' + palace('#2D1B1D', '#F6C970') + '</g>';
            for (i = 0; i < 9; i++) { o += '<rect x="' + (40 + (i * 53) % 300) + '" y="' + (375 + i * 14) + '" width="' + (50 + (i % 3) * 20) + '" height="1.6" fill="#FFF3D6" opacity=".28"/>'; }
            o += '<path d="M0 486Q100 462 200 484T400 474V500H0Z" fill="#33231F"/>' + birds(60, 120);
        } else if (kind === 'jaisalmer') {
            defs = sky(u + 'a', [[0, '#FDE6B8'], [0.5, '#F6C27C'], [1, '#E39A5B']]);
            o += '<rect width="400" height="500" fill="url(#' + u + 'a)"/><circle cx="300" cy="170" r="80" fill="#FFF0C9" opacity=".3"/><circle cx="300" cy="170" r="46" fill="#FFF6DD"/>';
            var fc = '#B97B3F';
            o += rect(80, 292, 240, 90, fc) + rect(60, 270, 34, 112, fc) + rect(150, 258, 34, 124, fc) + rect(230, 250, 34, 132, fc) + rect(300, 276, 34, 106, fc);
            o += bat(60, 270, 34, fc, 4) + bat(150, 258, 34, fc, 4) + bat(230, 250, 34, fc, 4) + bat(300, 276, 34, fc, 4) + bat(80, 292, 240, fc, 5);
            o += rect(190, 232, 24, 60, fc) + dome(202, 232, 12, fc);
            for (i = 0; i < 8; i++) { o += arch(96 + i * 28, 312, 9, 16, '#7A4B26'); }
            o += '<path d="M0 372Q120 338 240 366T400 350V500H0Z" fill="#E4A55F"/><path d="M0 410Q140 372 260 404T400 392V500H0Z" fill="#D18E49"/><path d="M0 450Q110 420 250 446T400 432V500H0Z" fill="#B87636"/>';
            o += '<path d="M60 478l22-34 22 34z" fill="#7A4B26"/><path d="M108 484l16-24 16 24z" fill="#5E3A1E"/>' + birds(70, 110);
        } else if (kind === 'jaipur') {
            defs = sky(u + 'a', [[0, '#FFE3D3'], [0.6, '#F7B4A0'], [1, '#E88E86']]);
            o += '<rect width="400" height="500" fill="url(#' + u + 'a)"/><circle cx="92" cy="118" r="52" fill="#FFF0E4" opacity=".4"/><circle cx="92" cy="118" r="30" fill="#FFF6EC"/>';
            var lv = [[100, 340, 200, 120], [116, 300, 168, 42], [136, 264, 128, 38], [156, 232, 88, 34], [176, 206, 48, 28]];
            lv.forEach(function (l, idx) {
                o += rect(l[0], l[1], l[2], l[3], idx % 2 ? '#CC6A60' : '#D9776B');
                var n = Math.floor(l[2] / 22);
                for (k = 0; k < n; k++) { o += arch(l[0] + 8 + k * ((l[2] - 16) / n), l[1] + 8, 9, idx === 0 ? 26 : 16, '#FBD7C9'); if (idx === 0) { o += arch(l[0] + 8 + k * ((l[2] - 16) / n), l[1] + 52, 9, 26, '#FBD7C9'); } }
                o += dome(l[0] + 6, l[1], 6, '#B85A52') + dome(l[0] + l[2] - 6, l[1], 6, '#B85A52');
            });
            o += dome(200, 206, 12, '#B85A52') + rect(60, 420, 280, 80, '#8C4A47') + rect(0, 452, 400, 48, '#5B2F31');
            for (i = 0; i < 7; i++) { o += arch(72 + i * 36, 432, 14, 22, '#F4BFA8'); }
            o += birds(250, 110);
        } else if (kind === 'jodhpur') {
            defs = sky(u + 'a', [[0, '#CFE3F2'], [0.6, '#F3E6D0'], [1, '#F6D9B0']]);
            o += '<rect width="400" height="500" fill="url(#' + u + 'a)"/><circle cx="82" cy="104" r="26" fill="#FFF7E2"/>';
            o += '<path d="M60 330Q100 250 170 232Q250 220 330 250Q380 270 400 330V500H60Z" fill="#8C6B4E"/>';
            var fcl = '#C9966A';
            o += rect(130, 196, 190, 44, fcl) + rect(120, 176, 30, 64, fcl) + rect(205, 166, 34, 74, fcl) + rect(290, 180, 30, 60, fcl) + bat(130, 196, 190, fcl, 5) + bat(120, 176, 30, fcl, 4) + bat(205, 166, 34, fcl, 4) + bat(290, 180, 30, fcl, 4) + dome(222, 166, 11, fcl);
            for (i = 0; i < 6; i++) { o += arch(142 + i * 28, 210, 8, 16, '#8C6B4E'); }
            var blues = ['#4B86B4', '#5E9BC9', '#8FBFE0', '#3A6E99', '#6FA7D1', '#A9CEE8'], n2 = 0;
            for (var r = 0; r < 6; r++) { for (var c = 0; c < 9; c++) { var bx = 10 + c * 44 + (r % 2) * 18 + ((c * 7 + r * 3) % 9), by = 296 + r * 34 + ((c * 5) % 7), bw = 34 + ((c + r) % 3) * 6, bh = 30 + ((c * 3 + r) % 4) * 5;
                if (by + bh > 500) { continue; } o += rect(bx, by, bw, bh, blues[(c + r * 2) % 6]) + rect(bx + 6, by + 8, 7, 9, '#F3E6D0', 0.85); n2++; } }
            o += '<path d="M0 500V480Q100 470 200 482T400 474V500Z" fill="#2E4C66" opacity=".55"/>' + birds(250, 90);
        } else if (kind === 'dwarka') {
            defs = sky(u + 'a', [[0, '#FCE0B0'], [0.5, '#EE9C6E'], [0.62, '#C9645F']]) + sky(u + 'b', [[0, '#3B7F93'], [1, '#1E4A5C']]);
            o += '<rect width="400" height="500" fill="url(#' + u + 'a)"/><circle cx="200" cy="330" r="92" fill="#FFE9B8" opacity=".3"/><circle cx="200" cy="330" r="52" fill="#FFF0C9"/>';
            o += '<rect y="360" width="400" height="140" fill="url(#' + u + 'b)"/>';
            for (i = 0; i < 10; i++) { o += '<rect x="' + (30 + (i * 67) % 300) + '" y="' + (372 + i * 12) + '" width="' + (60 + (i % 3) * 24) + '" height="1.6" fill="#FFE9B8" opacity=".35"/>'; }
            var t = '#4A2B2C';
            o += '<path d="M200 150L214 214L224 262L232 300L240 330H160L168 300L176 262L186 214Z" fill="' + t + '"/>' + rect(156, 330, 88, 36, t) + rect(140, 350, 120, 14, t) + rect(124, 362, 152, 10, t);
            o += dome(176, 300, 9, t) + dome(224, 300, 9, t) + '<rect x="199" y="124" width="2" height="30" fill="' + t + '"/><path d="M201 126l34 7-34 9z" fill="#F08A3C"/>';
            for (i = 0; i < 4; i++) { o += arch(166 + i * 20, 340, 8, 18, '#F6C970'); }
            o += '<path d="M0 500V470Q100 452 200 470T400 460V500Z" fill="#2A3B44"/>' + birds(70, 120);
        } else if (kind === 'desert') {
            defs = sky(u + 'a', [[0, '#3F8DB9'], [0.6, '#A9D3E6'], [1, '#EAF2F0']]);
            o += '<rect width="400" height="500" fill="url(#' + u + 'a)"/><ellipse cx="90" cy="90" rx="60" ry="14" fill="#fff" opacity=".7"/><ellipse cx="300" cy="140" rx="70" ry="12" fill="#fff" opacity=".6"/>';
            o += '<path d="M230 300L250 250L300 240L330 200L400 190V320Z" fill="#C9733E"/><path d="M0 330Q80 290 170 316T330 300T400 310V500H0Z" fill="#E4A25D"/>';
            o += '<path d="M0 360Q120 330 260 354T400 346V500H0Z" fill="#D9893F"/><path d="M0 410Q140 372 280 404T400 392V500H0Z" fill="#C97934"/>';
            o += '<path d="M190 500Q210 440 230 410Q246 384 232 364Q224 352 236 342" fill="none" stroke="#F0CDA0" stroke-width="24" stroke-linecap="round" opacity=".9"/>';
        } else if (kind === 'herowide') {
            return heroScene('xMidYMax slice');
        } else { // hero
            return heroScene();
        }
        return '<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img"><defs>' + defs + '</defs>' + o + '</svg>';
    }

    function heroScene(par) {
        var u = 'h' + (++sid), o = '', i;
        var defs = sky(u + 'a', [[0, '#FFF1D6'], [0.45, '#F7CE95'], [0.75, '#E9A074']]) + sky(u + 'b', [[0, '#F0B488'], [1, '#6E3F45']]);
        o += '<rect width="1000" height="700" fill="url(#' + u + 'a)"/><circle cx="700" cy="270" r="190" fill="#FFF3D6" opacity=".25"/><circle cx="700" cy="270" r="110" fill="#FFF6E2" opacity=".95"/>';
        o += '<path d="M0 420L120 340L240 400L380 320L520 396L680 330L820 392L1000 340V560H0Z" fill="#C98E72" opacity=".55"/><path d="M0 470L160 400L300 452L470 386L640 456L820 400L1000 450V560H0Z" fill="#9A6258" opacity=".7"/>';
        // fort left
        var fc = '#6B4137';
        o += '<g transform="translate(-30,98) scale(1.1)">' + rect(30, 330, 220, 90, fc) + rect(20, 290, 40, 130, fc) + rect(120, 270, 44, 150, fc) + rect(210, 300, 40, 120, fc) + bat(30, 330, 220, fc, 6) + bat(20, 290, 40, fc, 5) + bat(120, 270, 44, fc, 5) + bat(210, 300, 40, fc, 5) + dome(142, 270, 14, fc) + '</g>';
        // lake palace centre
        o += '<g transform="translate(330,108) scale(1.32)">' + palace('#4A2F2D', '#F6C970') + '</g>';
        // chhatris right
        o += '<g transform="translate(740,68) scale(1.2)">' + rect(30, 380, 190, 30, '#4A2F2D') + [0, 1, 2].map(function (k) { return rect(50 + k * 60, 340, 8, 40, '#4A2F2D') + rect(78 + k * 60, 340, 8, 40, '#4A2F2D') + dome(68 + k * 60, 340, 24, '#4A2F2D'); }).join('') + '</g>';
        o += '<rect y="560" width="1000" height="140" fill="url(#' + u + 'b)"/><g transform="translate(0,1280) scale(1,-1)" opacity=".18"><rect y="560" width="1000" height="1" fill="#000"/></g>';
        for (i = 0; i < 14; i++) { o += '<rect x="' + (30 + (i * 137) % 900) + '" y="' + (580 + (i * 17) % 100) + '" width="' + (90 + (i % 4) * 30) + '" height="2" fill="#FFF3D6" opacity=".3"/>'; }
        o += '<path d="M0 676Q250 640 500 668T1000 654V700H0Z" fill="#33231F"/>' + birds(190, 140) + birds(820, 180);
        return '<svg viewBox="0 0 1000 700" preserveAspectRatio="' + (par || 'xMidYMid slice') + '" xmlns="http://www.w3.org/2000/svg" role="img"><defs>' + defs + '</defs>' + o + '</svg>';
    }

    /* -------------------------------------------------- formatting -- */
    function money(n) { return '\u20B9' + Number(n).toLocaleString('en-IN'); }
    function fdate(s) { if (!s) { return ''; } var dt = new Date(s.length > 10 ? s : s + 'T12:00:00'); return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
    function esc(s) { return String(s === undefined || s === null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function stars(r, sz) { var o = '<span class="stars" aria-label="' + r + ' out of 5">'; for (var i = 1; i <= 5; i++) { o += icon('star', sz || 14, i <= Math.round(r) ? 'on' : 'off'); } return o + '</span>'; }
    function label(r) { return r >= 4.8 ? 'Exceptional' : r >= 4.5 ? 'Excellent' : r >= 4.2 ? 'Very Good' : 'Good'; }
    function km(n) { return (n < 10 ? n.toFixed(1).replace('.0', '') : Math.round(n)) + ' km'; }
    function qs(k) { return new URLSearchParams(location.search).get(k); }

    /* ---------------------------------------------- search memory -- */
    var UI = {};
    UI.search = function () { try { return JSON.parse(sessionStorage.getItem('rtbnb2_search')) || {}; } catch (e) { return {}; } };
    UI.setSearch = function (s) { sessionStorage.setItem('rtbnb2_search', JSON.stringify(s)); };

    /* ------------------------------------------------- components -- */
    UI.hotelRow = function (h, s) {
        var cheapest = RT.minPrice(h), q = UI.qsFromSearch(s);
        var u = RT.user(), wished = u && u.wishlist.indexOf(h.id) >= 0;
        var near = h.nearby.slice().sort(function (a, b) { return a.km - b.km; }).slice(0, 3);
        var am = h.amenities.slice(0, 4).map(function (k) { var a = RT.amenities[k]; return '<span class="mini">' + icon(a.i, 14) + a.n + '</span>'; }).join('');
        return '<article class="hrow reveal"><a class="hrow-img" href="hotel.html?id=' + h.id + q + '"><img loading="lazy" src="' + h.images[0] + '" alt="' + esc(h.name) + '">' +
            '<span class="tag-loc">' + icon('pin', 13) + esc(h.city) + '</span><span class="more-btn">More details</span></a>' +
            '<button class="wish' + (wished ? ' on' : '') + '" data-wish="' + h.id + '" title="Save to wishlist" aria-label="Save to wishlist">' + icon('heart', 18) + '</button>' +
            '<div class="hrow-body"><div class="hrow-head"><div><span class="chip">' + icon('building', 14) + esc(h.type) + '</span> <span class="chip ghost">' + h.stars + ' ' + icon('star', 12, 'on') + '</span></div>' +
            '<h3><a href="hotel.html?id=' + h.id + q + '">' + esc(h.name) + '</a></h3><p class="muted">' + icon('pin', 14) + esc(h.area) + ', ' + esc(h.city) + '</p></div>' +
            '<div class="rate-line"><span class="score">' + h.rating.toFixed(1) + '</span><b>' + label(h.rating) + '</b><span class="muted">' + h.reviewsCount.toLocaleString('en-IN') + ' reviews</span></div>' +
            '<div class="mini-list">' + am + '</div>' +
            '<ul class="near">' + near.map(function (n) { return '<li>' + icon('compass', 14) + '<span>' + esc(n.name) + '</span><b>' + km(n.km) + '</b></li>'; }).join('') + '</ul></div>' +
            '<div class="hrow-price"><div><small>Starting from</small><div class="price">' + money(cheapest) + '<span> / night</span></div><small class="muted">+ 12% taxes &amp; fees</small></div>' +
            '<div class="offer">' + icon('tag', 14) + 'Free cancellation up to 48 hrs. Use code <b>RT10</b> for 10% off.</div>' +
            '<a class="btn btn-primary" href="hotel.html?id=' + h.id + q + '#rooms"><span>Select</span>' + icon('arrow', 16) + '</a></div></article>';
    };
    UI.hotelTile = function (h) {
        return '<a class="tile reveal" href="hotel.html?id=' + h.id + '"><img loading="lazy" src="' + h.images[0] + '" alt="' + esc(h.name) + '"><span class="tile-rate">' + icon('star', 12) + h.rating.toFixed(1) + '</span>' +
            '<div class="tile-info"><h4>' + esc(h.name) + '</h4><p>' + esc(h.city) + ' &middot; ' + esc(h.type) + '</p><span class="tile-price">' + money(RT.minPrice(h)) + '</span></div></a>';
    };
    UI.qsFromSearch = function (s) {
        s = s || {}; var p = [];
        if (s.in) { p.push('in=' + s.in); } if (s.out) { p.push('out=' + s.out); }
        if (s.adults) { p.push('adults=' + s.adults); } if (s.children !== undefined && s.children !== '') { p.push('children=' + s.children); }
        return p.length ? '&' + p.join('&') : '';
    };

    UI.toast = function (msg, type) {
        var t = d.createElement('div'); t.className = 'toast ' + (type || 'ok');
        t.innerHTML = icon(type === 'err' ? 'x' : 'check', 16) + '<span>' + msg + '</span>'; d.body.appendChild(t);
        requestAnimationFrame(function () { t.classList.add('show'); });
        setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 300); }, 2800);
    };
    UI.modal = function (html, cls) {
        var m = d.createElement('div'); m.className = 'modal-bg';
        m.innerHTML = '<div class="modal ' + (cls || '') + '"><button class="modal-x" aria-label="Close">' + icon('x', 18) + '</button>' + html + '</div>'; d.body.appendChild(m);
        requestAnimationFrame(function () { m.classList.add('show'); });
        function close() { m.classList.remove('show'); setTimeout(function () { m.remove(); }, 250); }
        m.addEventListener('click', function (e) { if (e.target === m || e.target.closest('.modal-x') || e.target.closest('[data-close]')) { close(); } });
        m.close = close; return m;
    };
    UI.confirm = function (msg, yes) {
        var m = UI.modal('<h3>Are you sure?</h3><p class="muted">' + msg + '</p><div class="row-end"><button class="btn btn-ghost" data-close>No, go back</button><button class="btn btn-primary" data-yes>Yes, continue</button></div>', 'sm');
        m.querySelector('[data-yes]').onclick = function () { m.close(); yes(); };
    };
    UI.requireLogin = function () {
        if (RT.user()) { return true; }
        location.href = 'login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search); return false;
    };

    /* guest steppers */
    UI.guestPicker = function (root, init, onchange) {
        var st = { adults: +init.adults || 2, children: +init.children || 0 };
        root.innerHTML = '<button type="button" class="gp-btn">' + icon('users', 18) + '<span class="gp-text"></span>' + icon('chev', 14) + '</button><div class="gp-pop">' +
            ['adults', 'children'].map(function (k) { return '<div class="gp-row"><div><b>' + (k === 'adults' ? 'Adults' : 'Children') + '</b><small>' + (k === 'adults' ? 'Age 13+' : 'Age 0-12') + '</small></div><div class="step"><button type="button" data-k="' + k + '" data-d="-1">' + icon('minus', 14) + '</button><span data-v="' + k + '"></span><button type="button" data-k="' + k + '" data-d="1">' + icon('plus', 14) + '</button></div></div>'; }).join('') + '</div>';
        function paint() { $('.gp-text', root).textContent = st.adults + (st.adults > 1 ? ' Adults' : ' Adult') + ', ' + st.children + (st.children === 1 ? ' Child' : ' Children'); $$('[data-v]', root).forEach(function (s) { s.textContent = st[s.dataset.v]; }); }
        root.addEventListener('click', function (e) {
            var b = e.target.closest('.gp-btn'); if (b) { root.classList.toggle('open'); return; }
            var s = e.target.closest('[data-k]'); if (s) { var k = s.dataset.k, v = st[k] + (+s.dataset.d); if (k === 'adults' && (v < 1 || v > 8)) { return; } if (k === 'children' && (v < 0 || v > 6)) { return; } st[k] = v; paint(); if (onchange) { onchange(st); } }
        });
        d.addEventListener('click', function (e) { if (!root.contains(e.target)) { root.classList.remove('open'); } });
        paint(); root.getState = function () { return st; }; return root;
    };

    /* search bar (home + hotels) */
    UI.searchBar = function (host, opts) {
        opts = opts || {}; var s = Object.assign({}, UI.search(), opts.values || {});
        var tdy = RT.today();
        host.innerHTML = '<form class="sbar" autocomplete="off"><label class="sf">' + icon('pin', 20) + '<span><small>Where to?</small><select name="loc"><option value="">All destinations</option>' +
            RT.locations.map(function (l) { return '<option value="' + l.id + '"' + (s.loc === l.id ? ' selected' : '') + '>' + l.name + ', ' + l.state + '</option>'; }).join('') + '</select></span></label>' +
            '<label class="sf">' + icon('calendar', 20) + '<span><small>Check in</small><input type="date" name="in" min="' + tdy + '" value="' + (s.in || '') + '"></span></label>' +
            '<label class="sf">' + icon('calendar', 20) + '<span><small>Check out</small><input type="date" name="out" min="' + tdy + '" value="' + (s.out || '') + '"></span></label>' +
            '<div class="sf gp" id="gp-' + (++sid) + '"></div><button class="btn btn-dark sbtn" type="submit"><span>Search</span>' + icon('search', 16) + '</button></form>';
        var form = $('form', host), gp = UI.guestPicker($('.gp', host), s);
        form.elements['in'].addEventListener('change', function () { var i = this.value; if (i) { form.elements['out'].min = RT.addDays(i, 1); if (!form.elements['out'].value || form.elements['out'].value <= i) { form.elements['out'].value = RT.addDays(i, 1); } } });
        form.addEventListener('submit', function (e) {
            e.preventDefault(); var g = gp.getState(), v = { loc: form.elements['loc'].value, in: form.elements['in'].value, out: form.elements['out'].value, adults: g.adults, children: g.children };
            if ((v.in && !v.out) || (!v.in && v.out) || (v.in && v.out <= v.in)) { UI.toast('Please choose a valid check-in and check-out date.', 'err'); return; }
            UI.setSearch(v); if (opts.onsearch) { opts.onsearch(v); } else { location.href = 'hotels.html'; }
        });
        return form;
    };

    /* ---------------------------------------------- header/footer -- */
    function header(page) {
        var u = RT.user();
        var links = [['home', 'index.html', 'Home'], ['hotels', 'hotels.html', 'Hotels'], ['facilities', 'facilities.html', 'Facilities'], ['about', 'about.html', 'About Us'], ['contact', 'contact.html', 'Contact']];
        var dest = RT.locations.map(function (l) { return '<a href="hotels.html?loc=' + l.id + '">' + icon('pin', 14) + l.name + '</a>'; }).join('');
        var nav = links.map(function (l) {
            if (l[0] === 'hotels') { return '<div class="dd"><a href="' + l[1] + '" class="' + (page === l[0] ? 'on' : '') + '">' + l[2] + icon('chev', 13) + '</a><div class="dd-menu">' + dest + '</div></div>'; }
            return '<a href="' + l[1] + '" class="' + (page === l[0] ? 'on' : '') + '">' + l[2] + '</a>';
        }).join('');
        var right = u ? '<div class="dd dd-right"><button class="avatar-btn" aria-label="Account"><span class="avatar">' + esc(u.name.charAt(0).toUpperCase()) + '</span><span class="hide-sm">' + esc(u.name.split(' ')[0]) + '</span>' + icon('chev', 13) + '</button>' +
            '<div class="dd-menu"><a href="bookings.html">' + icon('calendar', 15) + 'My Bookings</a><a href="profile.html">' + icon('user', 15) + 'My Profile</a><a href="profile.html#wishlist">' + icon('heart', 15) + 'Wishlist</a><a href="#" id="logout-link">' + icon('logout', 15) + 'Logout</a></div></div>'
            : '<a class="btn btn-ghost sm" href="login.html">Login</a><a class="btn btn-primary sm" href="login.html?mode=register"><span>Register</span></a>';
        return '<header class="site-header" id="site-header"><div class="wrap nav"><a class="brand" href="index.html"><span class="brand-badge"><img src="images/logo/royal_bnb_gold.png" alt="RT Royal BnB logo"></span>' +
            '<span class="brand-text"><b>Royal BnB</b><small>Stay Royal. Travel Smart.</small></span></a><nav class="menu" id="menu">' + nav + '</nav><div class="nav-right">' + right +
            '<button class="burger" id="burger" aria-label="Menu">' + icon('menu', 22) + '</button></div></div></header>';
    }
    function footer() {
        var year = new Date().getFullYear();
        var soc = [['github', 'https://github.com/RT1504', 'GitHub'], ['instagram', 'https://www.instagram.com/', 'Instagram'], ['facebook', 'https://www.facebook.com/', 'Facebook'], ['twitter', 'https://twitter.com/', 'X / Twitter']]
            .map(function (s) { return '<a class="soc" href="' + s[1] + '" target="_blank" rel="noopener" aria-label="' + s[2] + '">' + icon(s[0], 18) + '</a>'; }).join('');
        return '<footer class="site-footer"><div class="foot-wave"></div><div class="wrap"><div class="foot-top"><div class="foot-brand"><a class="brand light" href="index.html"><span class="brand-badge"><img src="images/logo/royal_bnb_gold.png" alt="RT Royal BnB logo"></span><span class="brand-text"><b>Royal BnB</b><small>Stay Royal. Travel Smart.</small></span></a>' +
            '<p>We bring you closer to the royal cities of Rajasthan and the sacred coast of Dwarka with handpicked hotels, honest prices and 24/7 support.</p><div class="socs">' + soc + '</div></div>' +
            '<div><h5>Quick Access</h5><a href="index.html">Home</a><a href="hotels.html">Find Hotels</a><a href="bookings.html">My Bookings</a><a href="profile.html">My Profile</a><a href="about.html">About Us</a><a href="contact.html">Contact Us</a></div>' +
            '<div><h5>Top Destinations</h5>' + RT.locations.map(function (l) { return '<a href="hotels.html?loc=' + l.id + '">' + l.name + '</a>'; }).join('') + '</div>' +
            '<div><h5>Get in touch</h5><p class="fl">' + icon('phone', 15) + '<a href="tel:+917861976128">+91 78619 76128</a></p><p class="fl">' + icon('mail', 15) + '<a href="mailto:hello@royalbnb.com">hello@royalbnb.com</a></p><p class="fl">' + icon('pin', 15) + '<span>RT Hub, opp. Sumandeep College, near Suzlon Company, Vadodara, Gujarat 391760</span></p>' +
            '<form class="news" id="news-form"><input type="email" required placeholder="Your email for offers"><button class="btn btn-primary sm" aria-label="Subscribe">' + icon('arrow', 16) + '</button></form></div></div>' +
            '<div class="foot-bottom"><p>&copy; Copyright ' + year + ' <b>RT_ROYAL_BNB</b>. All rights reserved.</p><p class="credit">Design &amp; Developed by <a href="https://github.com/RT1504" target="_blank" rel="noopener">RT1504</a></p>' +
            '<div class="foot-btns"><a class="btn btn-gold sm" href="https://github.com/RT1504" target="_blank" rel="noopener">' + icon('github', 16) + '<span>GitHub</span></a><a class="btn btn-outline-light sm" href="admin/index.html">' + icon('lock', 15) + '<span>Admin</span></a><button class="btn btn-outline-light sm" id="to-top">' + icon('up', 15) + '<span>Top</span></button></div></div></div></footer>';
    }

    /* --------------------------------------------------- bootstrap -- */
    UI.hydrate = function (root) {
        $$('[data-i]', root).forEach(function (e) { e.innerHTML = icon(e.dataset.i, +e.dataset.s || 18); e.removeAttribute('data-i'); });
        $$('[data-scene]', root).forEach(function (e) { e.innerHTML = scene(e.dataset.scene); e.removeAttribute('data-scene'); });
        $$('[data-am]', root).forEach(function (e) { e.textContent = RT.amenities[e.dataset.am].e; });
    };
    UI.reveal = function (root) {
        var io = 'IntersectionObserver' in w ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12 }) : null;
        $$('.reveal:not(.in)', root).forEach(function (e, i) { if (io) { e.style.transitionDelay = ((i % 4) * 70) + 'ms'; io.observe(e); } else { e.classList.add('in'); } });
        $$('[data-count]:not(.counted)', root).forEach(function (e) {
            e.classList.add('counted'); var to = +e.dataset.count, suf = e.dataset.suf || '', dec = +e.dataset.dec || 0;
            var run = function () { var t0 = performance.now(); (function f(t) { var p = Math.min(1, (t - t0) / 1400); e.textContent = (to * (1 - Math.pow(1 - p, 3))).toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suf; if (p < 1) { requestAnimationFrame(f); } })(t0); };
            if (io) { var o2 = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { run(); o2.disconnect(); } }, { threshold: 0.4 }); o2.observe(e); } else { run(); }
        });
    };
    UI.wishClicks = function () {
        d.addEventListener('click', function (e) {
            var b = e.target.closest('[data-wish]'); if (!b) { return; }
            e.preventDefault(); var u = RT.user(); if (!u) { UI.requireLogin(); return; }
            var id = +b.dataset.wish, i = u.wishlist.indexOf(id);
            if (i >= 0) { u.wishlist.splice(i, 1); b.classList.remove('on'); UI.toast('Removed from wishlist'); } else { u.wishlist.push(id); b.classList.add('on'); UI.toast('Saved to your wishlist'); }
            RT.save();
        });
    };

    UI.init = function (page) {
        d.body.classList.add('page-' + page);
        var hh = $('#app-header'), ff = $('#app-footer');
        if (hh) { hh.outerHTML = header(page); }
        if (ff) { ff.outerHTML = footer(); }
        UI.hydrate(d); UI.wishClicks();
        var burger = $('#burger'), menu = $('#menu');
        if (burger) { burger.onclick = function () { menu.classList.toggle('open'); }; }
        var lo = $('#logout-link'); if (lo) { lo.onclick = function (e) { e.preventDefault(); RT.logout(); UI.toast('You have been logged out'); setTimeout(function () { location.href = 'index.html'; }, 600); }; }
        var nf = $('#news-form'); if (nf) { nf.onsubmit = function (e) { e.preventDefault(); var em = nf.querySelector('input').value; var db = RT.db(); if (!db.subscribers.some(function (s) { return s.email === em; })) { db.subscribers.push({ email: em, date: RT.today() }); RT.save(); } nf.reset(); UI.toast('Subscribed! Watch your inbox for royal offers.'); }; }
        var tt = $('#to-top'); if (tt) { tt.onclick = function () { w.scrollTo({ top: 0, behavior: 'smooth' }); }; }
        var sh = $('#site-header'); if (sh) { var sc = function () { sh.classList.toggle('scrolled', w.scrollY > 10); }; w.addEventListener('scroll', sc, { passive: true }); sc(); }
        d.addEventListener('click', function (e) {          /* ripple on buttons */
            var b = e.target.closest('.btn'); if (!b) { return; }
            var r = b.getBoundingClientRect(), s = d.createElement('span'); s.className = 'ripple'; s.style.left = (e.clientX - r.left) + 'px'; s.style.top = (e.clientY - r.top) + 'px'; b.appendChild(s); setTimeout(function () { s.remove(); }, 600);
        });
        UI.reveal(d);
    };

    UI.$ = $; UI.$$ = $$; UI.icon = icon; UI.scene = scene; UI.money = money; UI.fdate = fdate; UI.esc = esc; UI.stars = stars; UI.label = label; UI.km = km; UI.qs = qs;
    w.UI = UI;
})(window);
