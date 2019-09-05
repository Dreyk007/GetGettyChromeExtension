// Загружаем настройки расширения
let options;
chrome.storage.sync.get({
    server_url: null,
    api_key: null,
}, function (opts) {
    if (!opts.server_url)
        opts.server_url = 'http://127.0.0.1:5000';
    if (!opts.api_key)
        opts.api_key = false;

    options = opts
});

// Добавляем ссылку на загрузку фотографий для элементов галереи
function AddDownloadLink(el) {
    let article = el.parent();
    let place_for_link = $(article).find('div.gallery-mosaic-asset__editorial-info')[0];
    let new_link = $("<a></a>");
    let img_el = $(article).find('img.gallery-asset__thumb')[0];
    let img_url = $(img_el).attr('src');
    // Формировние ссылки
    new_link.attr('href', options.server_url + '/get_img?img=' + img_url + '&key=' + options.api_key);
    new_link.text('DOWNLOAD');
    let div_for_link = $("<div></div>").attr('style', 'font-weight: bold; text-align: left;');
    div_for_link.attr('id', 'download_full_size');
    div_for_link.append(new_link);
    $(place_for_link).append(div_for_link);
}

// Создаём экземпляр трекера мутаций и отслеживаем их, при условии, что всё прогрузилось.
MutationObserver = window.MutationObserver;
const observer = new MutationObserver(function (mutations) {
    if (options && options.server_url && options.api_key) {
        mutations.forEach(function (mutation) {

            let target_article = $(mutation.target);
            if (target_article.hasClass("gallery-mosaic-asset__container")
                && !target_article.find('#download_full_size').length) {

                AddDownloadLink(target_article);
            }
        });
    }
});

observer.observe(document.body, {
    subtree: true,
    attributes: true,
});
