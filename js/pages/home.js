(function () {
    var $ = UI.$, icon = UI.icon, money = UI.money;
    UI.searchBar($('#home-search'));

    /* destinations */
    var hotels = RT.activeHotels();
    var emoji = { udaipur: 'Lake City', jaisalmer: 'Golden City', jaipur: 'Pink City', jodhpur: 'Blue City', dwarka: 'Sacred Coast' };
    $('#dest-grid').innerHTML = RT.locations.map(function (l) {
        var hs = hotels.filter(function (h) { return h.locationId === l.id; });
        var avg = hs.reduce(function (a, h) { return a + h.rating; }, 0) / (hs.length || 1);
        var from = Math.min.apply(null, hs.map(function (h) { return RT.minPrice(h); }));
        return '<a class="dest reveal" href="hotels.html?loc=' + l.id + '"><div class="art" data-scene="' + l.id + '"></div><span class="rate">' + icon('star', 13) + avg.toFixed(1) + '</span><span class="go">' + icon('arrowur', 16) + '</span>' +
            '<div class="dest-info"><h3>' + l.name + '</h3><p>' + l.tag + ' &middot; ' + hs.length + ' hotels</p><span class="from">' + money(from) + '</span></div></a>';
    }).join('');
    var cats = [['heritage', '\uD83C\uDFF0', 'Heritage'], ['desert', '\uD83D\uDC2A', 'Desert'], ['lakes', '\uD83D\uDEF6', 'Lakes'], ['spiritual', '\uD83D\uDD4C', 'Spiritual'], ['honeymoon', '\uD83D\uDC96', 'Honeymoon'], ['family', '\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67', 'Family']];
    $('#cats').innerHTML = cats.map(function (c) { return '<a class="cat" href="hotels.html?cat=' + c[0] + '"><span>' + c[1] + '</span>' + c[2] + '</a>'; }).join('');

    /* featured hotels */
    $('#featured').innerHTML = hotels.slice().sort(function (a, b) { return b.rating - a.rating; }).slice(0, 8).map(UI.hotelTile).join('');

    /* trip plans */
    var plans = [
        { t: '3 Days in Udaipur', loc: 'udaipur', dur: '3 Nights', best: 'Oct - Mar', budget: '\u20B96,500 / day', desc: 'Palaces, lakes and the most romantic sunsets in India.',
          days: [['Day 1 - Lake Pichola', 'Check in, City Palace tour, sunset boat ride to Jag Mandir.'], ['Day 2 - Hills & Gardens', 'Sajjangarh Monsoon Palace, Saheliyon Ki Bari, evening dance show at Bagore Ki Haveli.'], ['Day 3 - Ghats & Temples', 'Jagdish Temple, Fateh Sagar Lake and shopping at Hathi Pol bazaar.']] },
        { t: 'Golden Circuit (7 Days)', loc: 'jaipur', dur: '6 Nights', best: 'Nov - Feb', budget: '\u20B95,800 / day', desc: 'Jaipur, Jodhpur and Jaisalmer - forts, blue lanes and dunes.',
          days: [['Day 1-2 - Jaipur', 'Amer Fort, Hawa Mahal, City Palace and the Johari bazaar.'], ['Day 3-4 - Jodhpur', 'Mehrangarh Fort, Jaswant Thada and the Clock Tower market.'], ['Day 5-7 - Jaisalmer', 'Golden Fort, Patwon Ki Haveli and a night under the stars at Sam Dunes.']] },
        { t: 'Dwarka Sacred Coast', loc: 'dwarka', dur: '2 Nights', best: 'Oct - Mar', budget: '\u20B93,800 / day', desc: 'Temple aarti, Gomti ghats and Arabian Sea sunsets.',
          days: [['Day 1 - Dwarka', 'Morning aarti at Dwarkadhish Temple, Gomti Ghat, Rukmini Devi Temple.'], ['Day 2 - Around Dwarka', 'Nageshwar Jyotirlinga, Gopi Talav and Bet Dwarka by boat.']] }
    ];
    var cur = 0;
    function drawPlan() {
        var p = plans[cur];
        $('#plan-tabs').innerHTML = plans.map(function (x, i) { return '<button class="' + (i === cur ? 'on' : '') + '" data-p="' + i + '">' + x.t + '</button>'; }).join('');
        $('#plan-days').innerHTML = p.days.map(function (d) { return '<div class="tl"><b>' + d[0] + '</b><span>' + d[1] + '</span></div>'; }).join('');
        var l = RT.location(p.loc);
        $('#plan-card').innerHTML = '<h3>' + p.t + '</h3><p class="muted">' + p.desc + '</p><div class="plan-meta"><span>' + icon('clock', 16) + p.dur + '</span><span>' + icon('sun', 16) + 'Best: ' + p.best + '</span><span>' + icon('rupee', 16) + p.budget + '</span></div>' +
            '<div style="border-radius:16px;overflow:hidden;height:170px;position:relative;margin-bottom:16px"><div style="position:absolute;inset:0">' + UI.scene(p.loc) + '</div></div>' +
            '<a class="btn btn-dark block" href="hotels.html?loc=' + l.id + '"><span>Find hotels in ' + l.name + '</span>' + icon('arrow', 16) + '</a>';
        $('#plan-card svg').style.cssText = 'width:100%;height:100%';
    }
    document.addEventListener('click', function (e) { var b = e.target.closest('[data-p]'); if (b) { cur = +b.dataset.p; drawPlan(); } });
    drawPlan();

    /* must-visit places */
    var places = [['jaipur', 'Hawa Mahal', 'Jaipur', 'Palace of Winds with 953 lattice windows - glows rose at sunrise.', 'Best time: Oct - Mar'], ['udaipur', 'City Palace & Lake Pichola', 'Udaipur', 'Sunset boat rides past marble palaces and lakeside ghats.', 'Best time: Sep - Mar'],
        ['jodhpur', 'Mehrangarh Fort', 'Jodhpur', 'A 15th-century fort above the indigo rooftops of the Blue City.', 'Best time: Oct - Feb'], ['jaisalmer', 'Sam Sand Dunes', 'Jaisalmer', 'Camel safaris, folk music and star-lit desert camps.', 'Best time: Nov - Feb'],
        ['dwarka', 'Dwarkadhish Temple', 'Dwarka', 'One of the Char Dham - sacred shikhara by the Gomti river and sea.', 'Best time: Oct - Mar'], ['jaisalmer', 'Jaisalmer Fort', 'Jaisalmer', 'A living golden fort with havelis, cafes and 800 years of stories.', 'Best time: Oct - Mar']];
    $('#places').innerHTML = places.map(function (p) { return '<a class="place reveal" href="hotels.html?loc=' + RT.locations.filter(function (l) { return l.name === p[2]; })[0].id + '"><div class="art" data-scene="' + p[0] + '"></div><div><span class="tagp">' + p[2] + '</span><h4>' + p[1] + '</h4><p>' + p[3] + '</p><small>' + icon('sun', 13) + ' ' + p[4] + '</small></div></a>'; }).join('');

    /* offers */
    $('#coupons').innerHTML = RT.db().coupons.map(function (c) { return '<div class="coupon" data-code="' + c.code + '"><b>' + c.code + '</b>' + c.desc + '</div>'; }).join('');
    document.addEventListener('click', function (e) { var c = e.target.closest('.coupon'); if (!c) { return; } try { navigator.clipboard.writeText(c.dataset.code); } catch (x) { /* ignore */ } UI.toast('Code ' + c.dataset.code + ' copied!'); });
    var pk = [['Royal Rajasthan Circuit', '7 nights - Jaipur, Jodhpur, Jaisalmer', 38999, 45999, '15% OFF', 'jaipur'], ['Desert Honeymoon', '3 nights - Jaisalmer luxury tent + dunes', 24999, 31299, '20% OFF', 'jaisalmer'], ['Lake City Escape', '2 nights - Udaipur palace stay + boat ride', 16499, 18299, '10% OFF', 'udaipur']];
    $('#pkgs').innerHTML = pk.map(function (p) { return '<div class="pkg reveal"><span class="off">' + p[4] + '</span><span class="eyebrow">Package</span><h4>' + p[0] + '</h4><p>' + p[1] + '</p><div class="pp">' + money(p[2]) + '<s>' + money(p[3]) + '</s></div><a class="btn btn-ghost sm" style="margin-top:14px" href="hotels.html?loc=' + p[5] + '"><span>View hotels</span>' + icon('arrow', 15) + '</a></div>'; }).join('');

    /* stories */
    var st = [['jaipur', '10 Hidden Gems in Rajasthan', '5 min read', 'Step-by-step lanes, step-wells and sunrise points away from the crowds.'], ['jaisalmer', 'Packing Essentials for a Desert Trip', '4 min read', 'Layers for cold nights, sun protection and what to keep in your day bag.']];
    $('#stories').innerHTML = st.map(function (s) { return '<a class="place reveal" href="contact.html"><div class="art" data-scene="' + s[0] + '"></div><div><span class="tagp">' + s[2] + '</span><h4>' + s[1] + '</h4><p>' + s[3] + '</p><small>Read story &rarr;</small></div></a>'; }).join('');
    UI.hydrate(document);
})();
