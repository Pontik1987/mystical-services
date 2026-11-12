// AJAX — максимально простой
document.addEventListener('submit', function(e) {
    var form = e.target;

    // РЕПОСТ
    if (form.classList.contains('repost-form')) {
        e.preventDefault();
        var btn = form.querySelector('.repost-btn');
        if (!btn) return;

        var parts = form.action.split('/');
        var postId = parts[parts.length - 1];

        fetch('/api/repost/' + postId, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.is_reposted) {
                btn.classList.add('active');
                btn.style.background = '#10b981';
                btn.style.color = 'white';
            } else {
                btn.classList.remove('active');
                btn.style.background = '';
                btn.style.color = '';
            }
            var count = form.parentElement.querySelector('.repost-count');
            if (count) count.textContent = '🔄 ' + (data.count || 0);
        })
        .catch(function(err) { console.error('Repost:', err); });
        return;
    }

    // ЛАЙКИ
    if (form.classList.contains('reaction-form')) {
        e.preventDefault();
        var btn = form.querySelector('.reaction-btn');
        if (!btn) return;

        var parts = form.action.split('/');
        var postId = parts[parts.length - 1];

        fetch('/api/like/' + postId, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            var count = btn.querySelector('.reaction-count');
            if (data.count > 0) {
                if (!count) {
                    count = document.createElement('span');
                    count.className = 'reaction-count';
                    btn.appendChild(count);
                }
                count.textContent = data.count;
            } else if (count) {
                count.remove();
            }
            if (data.is_liked) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        })
        .catch(function(err) { console.error('Like:', err); });
        return;
    }

    // СУПЕР-РЕАКЦИИ
    if (form.classList.contains('super-reaction-form')) {
        e.preventDefault();
        var btn = form.querySelector('.super-reaction-btn');
        if (!btn) return;

        var parts = form.action.split('/');
        var postId = parts[parts.length - 1];

        fetch('/api/super_like/' + postId, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.error) {
                alert(data.error);
                return;
            }
            if (data.is_super) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        })
        .catch(function(err) { console.error('SuperLike:', err); });
        return;
    }

    // ЗАКЛАДКИ
    if (form.classList.contains('bookmark-form')) {
        e.preventDefault();
        var btn = form.querySelector('.bookmark-btn');
        if (!btn) return;

        var parts = form.action.split('/');
        var postId = parts[parts.length - 1];

        fetch('/api/bookmark/' + postId, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.is_bookmarked) {
                btn.classList.add('active');
                btn.textContent = '🔖';
            } else {
                btn.classList.remove('active');
                btn.textContent = '📑';
            }
        })
        .catch(function(err) { console.error('Bookmark:', err); });
        return;
    }
});
