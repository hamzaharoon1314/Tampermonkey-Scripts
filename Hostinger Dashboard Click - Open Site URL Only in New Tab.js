// ==UserScript==
// @name         Hostinger Dashboard Click → Open Site URL Only in New Tab
// @namespace    https://github.com/hamzaharoon1314/Tampermonkey-Scripts
// @version      1.2
// @description  Prevents default action; opens clicked Dashboard site in a new tab only, not in the current tab too.
// @author       You
// @match        https://hpanel.hostinger.com/websites*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    document.addEventListener('click', function (e) {
        const button = e.target.closest('button.website-row__action-button');

        if (!button) return;
        const buttonText = button.textContent.trim();
        if (buttonText !== 'Dashboard') return;

        // Prevent default behavior and stop other handlers
        e.preventDefault();
        e.stopImmediatePropagation();

        const websiteRow = button.closest('.website-row.websites-list-table__row');
        if (!websiteRow) return;

        const domainAnchor = websiteRow.querySelector('.website-row__website-domain');
        if (!domainAnchor) return;

        const domain = domainAnchor.textContent.trim().split(' ')[0];
        if (!domain) return;

        const url = `https://hpanel.hostinger.com/websites/${domain}`;
        window.open(url, '_blank');
    }, true); // useCapture true to intercept early
})();
