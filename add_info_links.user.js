// ==UserScript==
// @name         FreshDesk Add Info Links
// @namespace    https://www.bubbleup.net/
// @version      0.5
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
			setTimeout(initFunction, 5000);
		}
	}, 1000);

	function initFunction() {
		let groupName = document.querySelector('.group-field span.ember-power-select-selected-item').innerText;
		if(groupName.includes('Denise Austin')) {
			let contactEmail = document.querySelector('div[data-test-id="requester-info-contact-email"] .info-details-content').innerText
			let moreInfoFDLinkElement = document.querySelector('.info-details-widget .contacts__view_more_info a[data-test-id="view-more-info"]');

			let csGroup = '(Denise Austin)';
			let connectUrl = 'www.deniseaustin.com';
			let myShopifyUrl = 'hlb-denise-austin.myshopify.com';
			let wpUrl = 'web.deniseaustin.com';

			formatParams(contactEmail, moreInfoFDLinkElement, csGroup, connectUrl, myShopifyUrl, wpUrl);
		}
	}

	function formatParams(contactEmail, moreInfoFDLinkElement, csGroup, connectUrl, myShopifyUrl, wpUrl){
		if(wpUrl !== '') {
			let wpUserSearchUrl = 'https://' + wpUrl + '/wp-admin/admin.php?page=pmpro-memberslist&s=' + encodeURIComponent(
				contactEmail);
			let wpUserLinkText = 'WP User ' + csGroup;
			createNewElAddParams(moreInfoFDLinkElement, wpUserSearchUrl, wpUserLinkText);

			let wpActiveSubSearchUrl = 'https://' + wpUrl + '/wp-admin/edit.php?post_status=wc-active&post_type=shop_subscription&s=' + encodeURIComponent(
				contactEmail);
			let wpActiveSubLinkText = 'WP Active Sub ' + csGroup;
			createNewElAddParams(moreInfoFDLinkElement, wpActiveSubSearchUrl, wpActiveSubLinkText);

			let wpCancelledSubSearchUrl = 'https://' + wpUrl + '/wp-admin/edit.php?post_status=wc-cancelled&post_type=shop_subscription&s=' + encodeURIComponent(
				contactEmail);
			let wpCancelledSubLinkText = 'WP Cancelled Sub ' + csGroup;
			createNewElAddParams(moreInfoFDLinkElement, wpCancelledSubSearchUrl, wpCancelledSubLinkText);

			let wpPendingSubCancelSearchUrl = 'https://' + wpUrl + '/wp-admin/edit.php?post_status=wc-pending-cancel&post_type=shop_subscription&s=' + encodeURIComponent(contactEmail);
			let wpPendingSubCancelLinkText = 'WP Pending Cancel Sub ' + csGroup;
			createNewElAddParams(moreInfoFDLinkElement, wpPendingSubCancelSearchUrl, wpPendingSubCancelLinkText);
		}
		if(myShopifyUrl !== '') {
			let shopifyCustomerSearchUrl = 'https://' + myShopifyUrl + '/admin/customers?query=' + contactEmail;
			let shopifyCustomerLinkText = 'Shopify Customer ' + csGroup;
			createNewElAddParams(moreInfoFDLinkElement, shopifyCustomerSearchUrl, shopifyCustomerLinkText);

			let shopifyOrderSearchUrl = 'https://' + myShopifyUrl + '/admin/orders?query=' + contactEmail;
			let shopifyOrderLinkText = 'Shopify Order ' + csGroup;
			createNewElAddParams(moreInfoFDLinkElement, shopifyOrderSearchUrl, shopifyOrderLinkText);
		}
		if(connectUrl !== '') {
			let connectUserSearchUrl = 'https://' + connectUrl + '/connect/en/user/index?UserSearch%5Bemail%5D=' + contactEmail;
			let connectUserLinkText = 'Connect User ' + csGroup;
			createNewElAddParams(moreInfoFDLinkElement, connectUserSearchUrl, connectUserLinkText);
		}
	}

	function createNewElAddParams(moreInfoFDLinkElement, searchUrl, linkText){
		let newElement = moreInfoFDLinkElement.cloneNode(true);

		newElement.href = searchUrl;
		newElement.childNodes[3].nodeValue = linkText;
		newElement.style.display = 'block';
		newElement.style.fontSize = '13px';
		newElement.style.marginTop = '10px';

		insertAfter(newElement, moreInfoFDLinkElement)
	}

	function insertAfter(newNode, existingNode) {
		existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
	}
})();
