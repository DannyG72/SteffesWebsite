function fireFoxDownload() {
    console.log('Attempting to download firefox directly or open a new tab on the firefox download page.');
    var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
    var isWin = navigator.platform.toUpperCase().indexOf('WIN')>=0;

    //If the user had windows or Mac in their browser version, we will automatically give them the respective link for the download.
    if ((isWin) && (!isMac)) {
        window.location.href = 'https://download.mozilla.org/?product=firefox-latest-ssl&os=osx&lang=en-US';
    }
    else if ((isMac)&& (!isWin)) {
        window.location.href = 'https://download.mozilla.org/?product=firefox-latest-ssl&os=win&lang=en-US';
    }
    // If both isWin and isMac failed, the user is most likely on a mobile device or some other type of device(ex, a smart TV, play station, etc). Redirecting them
    // to a new tab where Firefox will figure out which download link to give them.
    else {
        let newFirefoxWin = window.open('https://www.mozilla.org/en-US/firefox/new/', '_blank');
        newFirefoxWin.focus();

    };
};
