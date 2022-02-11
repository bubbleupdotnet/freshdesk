// ==UserScript==
// @name         FreshDesk Add Info Links
// @namespace    https://www.bubbleup.net/
// @version      0.6
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
			let wpUser = {
				searchUrl: 'https://' + wpUrl + '/wp-admin/admin.php?page=pmpro-memberslist&s=' + encodeURIComponent(contactEmail),
				linkText: 'WP User ' + csGroup
			}
			createNewElAddParams(moreInfoFDLinkElement, wpUser.searchUrl, wpUser.linkText);

			let wpActiveSub = {
				searchUrl: 'https://' + wpUrl + '/wp-admin/edit.php?post_status=wc-active&post_type=shop_subscription&s=' + encodeURIComponent(contactEmail),
				linkText : 'WP Active Sub ' + csGroup
			}
			createNewElAddParams(moreInfoFDLinkElement, wpActiveSub.searchUrl, wpActiveSub.linkText);

			let wpCancelledSub = {
				searchUrl: 'https://' + wpUrl + '/wp-admin/edit.php?post_status=wc-cancelled&post_type=shop_subscription&s=' + encodeURIComponent(contactEmail),
				linkText : 'WP Active Sub ' + csGroup
			}
			createNewElAddParams(moreInfoFDLinkElement, wpCancelledSub.searchUrl, wpCancelledSub.linkText);

			let wpPendingSubCancel = {
				searchUrl: 'https://' + wpUrl + '/wp-admin/edit.php?post_status=wc-pending-cancel&post_type=shop_subscription&s=' + encodeURIComponent(contactEmail),
				linkText : 'WP Pending Cancel Sub ' + csGroup
			}
			createNewElAddParams(moreInfoFDLinkElement, wpPendingSubCancel.searchUrl, wpPendingSubCancel.linkText);
		}
		if(myShopifyUrl !== '') {
			let shopifyCustomer = {
				searchUrl: 'https://' + myShopifyUrl + '/admin/customers?query=' + contactEmail,
				linkText : 'Shopify Customer ' + csGroup
			}
			createNewElAddParams(moreInfoFDLinkElement, shopifyCustomer.searchUrl, shopifyCustomer.linkText);

			let shopifyOrder = {
				searchUrl: 'https://' + myShopifyUrl + '/admin/orders?query=' + contactEmail,
				linkText : 'Shopify Order ' + csGroup
			}
			createNewElAddParams(moreInfoFDLinkElement, shopifyOrder.searchUrl, shopifyOrder.linkText);
		}
		if(connectUrl !== '') {
			let connectUser = {
				searchUrl: 'https://' + connectUrl + '/connect/en/user/index?UserSearch%5Bemail%5D=' + contactEmail,
				linkText : 'Connect User ' + csGroup
			}
			createNewElAddParams(moreInfoFDLinkElement, connectUser.searchUrl, connectUser.linkText);
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
