// Сохранение настроек в chrome.storage

function save_options() {
    const server_url = document.getElementById('server_url').value || null;
    const api_key = document.getElementById('api_key').value || null;
    chrome.storage.sync.set({
        server_url, api_key
    }, function () {
        // Даём пользователю понять, что настройки сохранены
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 1000);
    });
}

// Восстановление настроек
function restore_options() {
    chrome.storage.sync.get({
        server_url: null,
        api_key: null,
    }, function (opts) {
        document.getElementById('server_url').value = opts.server_url;
        document.getElementById('api_key').value = opts.api_key;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
