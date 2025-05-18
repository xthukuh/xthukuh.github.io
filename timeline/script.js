(function() {
    const timeline = document.querySelector('ul.timeline');
    const loading = document.querySelector('.loading');
    if (!timeline) throw  new Error('Missing timeline element.');
    const timeline_entries = Object.entries(PROFILE.timeline).reverse();
    let timeline_html = '';
    for (const [year, items] of timeline_entries) {
        for (const item of items) {
            let html = ''
            + `<li data-date="${year}" class="event ${[...new Set((item.tags || '').split(',').map(v => v.trim()).filter(v => !!v))].join(' ')}">`
            + `<h3 class="lime">${item.title}</h3>`
            + (item.institution ? `<p class="institution"><small>${item.institution}</small></p>` : '')
            + `<p>${item.description}</p>`
            ;
            if (Array.isArray(item.gallery) && item.gallery.length) {
                html += '<div class="gallery">';
                for (const gallery_item of item.gallery) {
                    let data_caption = gallery_item.caption;
                    if (/^https?:\/\//.test(data_caption)) data_caption = `<a href='${data_caption}' target='_blank'>autohotkey.com</a>`;
                    html += `<a href="${gallery_item.href}" data-fancybox="gallery" data-caption="${data_caption}">`;
                    html += `<img class="img-fluid" src="${gallery_item.href}" title="${gallery_item.caption}" />`;
                    html += `</a>`;
                }
                html += '\n</div>';
            }
            html += `</li>`;
            timeline_html += html;
        }
    }
    timeline.innerHTML = timeline_html;
    setTimeout(() => {
        timeline.classList.remove('hidden');
        loading.classList.add('hidden');
        // setTimeout(() => {
        //     window.scrollTo(0, document.body.scrollHeight);
        // }, 0);
    }, 500);
})
.call(this);