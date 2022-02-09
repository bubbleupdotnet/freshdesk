// ==UserScript==
// @name         FreshDesk Add Info Links
// @namespace    https://www.bubbleup.net/
// @version      0.2
// @description  Adds links in FreshDesk tickets to search customer/user/orders in Shopify and Connect based on the email address in the ticket.
// @author       Joe
// @match        https://bubbleupllc.freshdesk.com/*
// @grant        none
// @downloadURL  https://github.com/bubbleupdotnet/freshdesk/raw/main/add_info_links.user.js
// ==/UserScript==

(function() {
    'use strict';

    let checkForElementLoaded = setInterval(function() {
        let checkedElement = document.querySelector('div[data-test-id="requester-info-contact-email"] .info-details-content');
        if(checkedElement === undefined) {
            //console.log('not loaded');
        } else {
            clearInterval(checkForElementLoaded);
            setTimeout(runBelowFunction, 5000);
        }
    }, 1000);

    function runBelowFunction() {
        let contactEmail = document.querySelector('div[data-test-id="requester-info-contact-email"] .info-details-content').innerText
        let moreInfoFDLinkElement = document.querySelector('.info-details-widget .contacts__view_more_info a[data-test-id="view-more-info"]');
        let connectViewUserElement = moreInfoFDLinkElement.cloneNode(true);
        let shopifyViewOrdersElement = moreInfoFDLinkElement.cloneNode(true);
        let shopifyViewCustomerElement = moreInfoFDLinkElement.cloneNode(true);

        connectViewUserElement.href = 'https://www.deniseaustin.com/connect/en/user/index?UserSearch%5Bemail%5D=' + contactEmail;
        connectViewUserElement.childNodes[3].nodeValue = 'Connect User (Denise Austin)';
        connectViewUserElement.style.display = 'block';
        connectViewUserElement.style.fontSize = '13px';
        connectViewUserElement.style.marginTop = '10px';

        shopifyViewOrdersElement.href = 'https://hlb-denise-austin.myshopify.com/admin/orders?query=' + contactEmail;
        shopifyViewOrdersElement.childNodes[3].nodeValue = 'Shopify Order (Denise Austin)';
        shopifyViewOrdersElement.style.display = 'block';
        shopifyViewOrdersElement.style.fontSize = '13px';
        shopifyViewOrdersElement.style.marginTop = '10px';


        shopifyViewCustomerElement.href = 'https://hlb-denise-austin.myshopify.com/admin/customers?query=' + contactEmail;
        shopifyViewCustomerElement.childNodes[3].nodeValue = 'Shopify Customer (Denise Austin)';
        shopifyViewCustomerElement.style.display = 'block';
        shopifyViewCustomerElement.style.fontSize = '13px';
        shopifyViewCustomerElement.style.marginTop = '10px';

        insertAfter(connectViewUserElement,moreInfoFDLinkElement);
        insertAfter(shopifyViewOrdersElement,moreInfoFDLinkElement);
        insertAfter(shopifyViewCustomerElement,moreInfoFDLinkElement);

        function insertAfter(newNode, existingNode) {
            existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
        }
    }
})();
