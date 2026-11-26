(function () {
    var body = A.shell('messages', 'Messages', '<button class="btn btn-ghost sm" id="readall"><span>Mark all as read</span></button>'); if (!body) { return; }
    var esc = UI.esc;
    function draw() {
        var qs = RT.db().queries.slice().sort(function (a, b) { return b.id - a.id; });
        body.innerHTML = qs.length ? qs.map(function (q) { return '<div class="msg-c ' + (q.seen ? '' : 'new') + '"><div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap"><div><b>' + esc(q.subject) + '</b> ' + (q.seen ? '' : '<span class="badge b-pending">new</span>') + '<br><small class="muted">' + esc(q.name) + ' &middot; <a href="mailto:' + esc(q.email) + '" style="color:var(--primary-hover)">' + esc(q.email) + '</a>' + (q.phone ? ' &middot; ' + esc(q.phone) : '') + ' &middot; ' + UI.fdate(q.date) + '</small></div><div class="acts">' + (q.seen ? '' : '<button class="btn btn-ghost sm" data-rd="' + q.id + '"><span>Mark as read</span></button>') + '<button class="ib dng" data-dl="' + q.id + '" title="Delete">' + UI.icon('trash', 15) + '</button></div></div><p class="muted" style="margin-top:10px">' + esc(q.message) + '</p></div>'; }).join('') : '<div class="empty"><h3>No messages yet</h3></div>';
    }
    document.addEventListener('click', function (e) {
        if (e.target.closest('#readall')) { RT.db().queries.forEach(function (q) { q.seen = 1; }); RT.save(); location.reload(); return; }
        var r = e.target.closest('[data-rd]'); if (r) { RT.db().queries.forEach(function (q) { if (q.id === +r.dataset.rd) { q.seen = 1; } }); RT.save(); location.reload(); return; }
        var d = e.target.closest('[data-dl]'); if (d) { UI.confirm('Delete this message?', function () { var db = RT.db(); db.queries = db.queries.filter(function (q) { return q.id !== +d.dataset.dl; }); RT.save(); location.reload(); }); }
    });
    draw();
})();
