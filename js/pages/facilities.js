(function () {
    var hs = RT.activeHotels(), n = hs.length;
    var items = [['wifi', 'Free High-speed Wi-Fi', 'Stay connected for work, maps and streaming with fast Wi-Fi across rooms and lobbies.'], ['tv', 'Television', 'Smart LED TV with news, sports and entertainment channels in every room.'], ['ac', 'Air Conditioning', 'Individually controlled cooling to beat the desert afternoons in comfort.'],
        ['heater', 'Room Heater', 'Silent, efficient heaters keep winter evenings in the desert and hills warm and cosy.'], ['hotwater', 'Hot Water 24/7', 'Round-the-clock hot water in every bathroom - morning, midnight or after a dune safari.'], ['spa', 'Spa & Wellness', 'Ayurvedic massages and wellness therapies to unwind after a day of sightseeing.'],
        ['laundry', 'Laundry Service', 'Same-day laundry and pressing so you can pack light and travel longer.'], ['parking', 'Free Parking', 'Safe, free parking for cars and tempo travellers at the property.'], ['food', 'Restaurant & In-room Dining', 'Order local Rajasthani thalis and Gujarati favourites to your room or dine at the restaurant.'],
        ['service', '24/7 Customer Service', 'Our desk and your hotel are a call away at any hour, for any request.'], ['pool', 'Swimming Pool', 'Refresh in a pool with a view at selected resorts and palace hotels.'], ['shuttle', 'Airport Pickup', 'Arrive stress-free with pre-arranged airport and station transfers.']];
    document.getElementById('fac-grid').innerHTML = items.map(function (it, i) {
        var a = RT.amenities[it[0]], c = hs.filter(function (h) { return h.amenities.indexOf(it[0]) >= 0; }).length;
        return '<div class="fac reveal"><span class="em">' + a.e + '</span><span class="no">#' + String(i + 1).padStart(2, '0') + '</span><h3>' + it[1] + '</h3><p>' + it[2] + '</p><span class="tg">' + (c === n ? 'In all ' + n + ' hotels' : 'In ' + c + ' of ' + n + ' hotels') + '</span></div>';
    }).join('');
})();
