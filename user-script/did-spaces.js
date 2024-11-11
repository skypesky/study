// ==UserScript==
// @name         DID Spaces 助手
// @namespace    http://tampermonkey.net/
// @version      2024-02-16
// @description  try to take over the world!
// @author       skypesky
// @match        https://*.didspaces.com/*
// @match        https://storage.staging.abtnet.io/*
// @match        https://spaces.staging.arcblock.io/*
// @match        https://*.did.abtnet.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=didspaces.com
// @grant        GM_registerMenuCommand
// @resource     toastr https://cdn.bootcss.com/izitoast/1.3.0/css/iziToast.min.css
// @resource avImage https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-07-11%2F5b45a5573f014.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618121209&t=1d42fd336c77b50622ce8d819f89b99a
//
// @require      https://cdn.bootcss.com/izitoast/1.3.0/js/iziToast.min.js
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js
// ==/UserScript==




(function () {
    'use strict';


    $(function() {
        Action.init();
    });

    class Action {

        static init() {

            GM_registerMenuCommand("Open homepage", function(event) {
                const url = `${window.location.origin}`;
                window.open(url);
            }, {
                autoClose: true,
            });

            GM_registerMenuCommand("Open dashboard", function(event) {
                const url = `${window.location.origin}/.well-known/service/admin/components`;
                window.open(url);
            }, {
                autoClose: true,
            });


            GM_registerMenuCommand("Open playground", function(event) {
                localStorage.setItem('debug', true);
                const mountPoint = Action.getMountPoint().mountPoint;
                const url = `${window.location.origin}${mountPoint}playground`;
                window.open(url);
            }, {
                autoClose: true,
            });

            if (location.href.includes('/customer/subscription/')) {
                GM_registerMenuCommand("Open subscription(admin)", (event) => {
                    Action.openAdminSubscriptionPage();
                }, {
                    autoClose: true,
                });
            }

            if(localStorage.getItem('debug') === 'true') {
                GM_registerMenuCommand("Disable debug mode", (event) => {
                    localStorage.removeItem('debug');
                }, {
                    autoClose: true,
                });
            } else {
                GM_registerMenuCommand("Enable debug mode", (event) => {
                    localStorage.setItem('debug', true);
                }, {
                    autoClose: true,
                });
            }
        }

        static openAdminSubscriptionPage() {
            const href = window.location.href;
            const isCustomerSubscriptionPage = href.includes('/customer/subscription/');

            if(isCustomerSubscriptionPage) {
                const subscriptionId = window.location.href.split('/').pop();
                const paymentKitComponentPoint = this.getPaymentKitMountPoint();
                if(!paymentKitComponentPoint) {
                    console.warn(`Can't find paymentKitComponentPoint`, unsafeWindow.blocklet);
                    return;
                }

                notification(`标题生成成功!`);

                const adminSubscriptionPageUrl = `${window.location.origin}${paymentKitComponentPoint.mountPoint}/admin/billing/${subscriptionId}`.replace('//admin', '/admin');
                console.log({ adminSubscriptionPageUrl })
                window.open(adminSubscriptionPageUrl);
            }
        }

        static getPaymentKitMountPoint() {
            return unsafeWindow.blocklet.componentMountPoints.find(x => x.did === "z2qaCNvKMv5GjouKdcDWexv6WqtHbpNPQDnAk");
        }

        static getMountPoint() {
            return unsafeWindow.blocklet.componentMountPoints.find(x => x.did === "z8iZnaYxnkMD5AKRjTKiCb8pQr1ut8UantAcf");
        }
    }



    function notification(message) {
        ToastMessage.success({ message });
    }


    // 导入样式库
    const ImportUtil = {

        importCss: function (cssList) {
            let styles = "";
            for (const c of cssList) {
                styles += GM_getResourceText(c);
            }
            GM_addStyle(styles);
        },

    }

    const ToastMessage = {
        success: function (options) {
            iziToast.success({
                message: options.message ? options.message : "",
                position: "topCenter",
                timeout: options.timeout ? options.timeout : 3000
            });
        }
    }

    })();
