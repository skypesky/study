// ==UserScript==
// @name         leangoo theme
// @namespace    http://tampermonkey.net/
// @version      2021.05.07
// @description  try to take over the world!
// @author       skypesky
// @match        https://www.leangoo.com/kanban/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    if (top === window) {
        // https://dss1.bdstatic.com/lvoZeXSm1A5BphGlnYG/skin/868.jpg?2
        const imageUrls = [
            `https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/56073c0753a31b8b86456a78d04b2751.jpg`,
            `https://wallpaperm.cmcm.com/d44e304d2f49d4593484933cec7b9186.jpg`,
            `https://wallpaperm.cmcm.com/b266d85f6a27d8e0f0d1d0c927d69de3.jpg`,
            `https://wallpaperm.cmcm.com/b944a2d62c43c6f6782fa33e0d065897.jpg`,
        ];
        let index = 0;
        const body = document.body;
        body.style.backgroundSize = `cover`;
        body.style.backgroundRepeat = `no-repeat`;
        body.style.backgroundImage = `url(${imageUrls[index]})`;
        body.style.transition = "all 2s";

        // return;

        setInterval(() => {
            index = (index + 1) % imageUrls.length;
            body.style.backgroundImage = `url(${imageUrls[index]})`;
        }, 5000);

    }

})();
