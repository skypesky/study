// ==UserScript==
// @name         [skypesky 出品]电影天堂 电影天堂2018 阳光电影 在线电影迅雷下载(2018-05-28)最新版
// @author       skypesky
// @namespace    http://skypesky.cn/thunderdownload
// @version      18.05.28
// @description  点击链接直接使用迅雷下载视频

// @include      http*://www.dytt8.net/*
// @include      http*://www.dy2018.com/*
// @include      http*://www.ygdy8.com/*

// @updateUrl    https://greasyfork.org/scripts/367983-%E7%94%B5%E5%BD%B1%E5%A4%A9%E5%A0%82-%E7%94%B5%E5%BD%B1%E7%BD%91%E7%AB%99-%E7%82%B9%E5%87%BB%E9%93%BE%E6%8E%A5%E7%9B%B4%E6%8E%A5%E4%BD%BF%E7%94%A8%E8%BF%85%E9%9B%B7%E4%B8%8B%E8%BD%BD-skypesky/code/%E7%94%B5%E5%BD%B1%E5%A4%A9%E5%A0%82%20%E7%94%B5%E5%BD%B1%E7%BD%91%E7%AB%99%20%E7%82%B9%E5%87%BB%E9%93%BE%E6%8E%A5%E7%9B%B4%E6%8E%A5%E4%BD%BF%E7%94%A8%E8%BF%85%E9%9B%B7%E4%B8%8B%E8%BD%BD(skypesky).user.js
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    const websiteList = [
        {
            "url": "http://www.dytt8.net/html/gndy/jddy/*",
            'testUrl': 'http://www.dytt8.net/html/gndy/dyzz/20180508/56825.html',
            "description": "电影天堂",
            "rule": /\/\/www.dytt8.net\//,
            "copy": {
                "selector": "a[thunderpid]",
                "ruleList": [
                    /thunder:\/\/[^"']*/
                ],
                "removeEventList": [
                    "click",
                ],
                "removeAttrList": [
                    "onclick"
                ]
            },
            "paste": {
                "attr": "href",
            }
        },
        {
            "url": "http*://www.dy2018.com/i/*",
            'testUrl': 'https://www.dy2018.com/i/99185.html',
            "description": "电影天堂2018",
            "rule": /\/\/www.dy2018.com\//,
            "copy": {
                "selector": "a[thunderpid]",
                "ruleList": [
                    /thunder:\/\/[^"']*/
                ],
                "removeEventList": [
                    "click",
                ],
                "removeAttrList": [
                    "onclick"
                ]
            },
            "paste": {
                "attr": "href",
            }
        },
        {
            "url": "http*://www.ygdy8.com/* ",
            'testUrl': 'http://www.ygdy8.com/html/gndy/jddy/20161114/52499.html',
            "description": "阳光电影",
            "rule": /\/\/www.ygdy8.com\//,
            "copy": {
                "selector": "a[thunderpid]",
                "ruleList": [
                    /thunder:\/\/[^"']*/
                ],
                "removeEventList": [
                    "click",
                ],
                "removeAttrList": [
                    "onclick"
                ]
            },
            "paste": {
                "attr": "href",
            }
        },
    ];

    $(function () {
       run(websiteList, changeLink);
    });

})();

function run(websiteList, callback) {
    var index = select(websiteList);
    if (index != -1) {
        console.log("路径匹配成功!"+websiteList[index].description);
        callback(websiteList[index]);
    } else {

    }
}

/*
**
** @desc: 选择网站,完成copy
** @param: websiteList => 网站配置
** @return: 返回匹配的下标
**
*/
function select(websiteList) {
    if (websiteList == 'undefined' || !websiteList.length) {
        return -1;
    }
    // 获取当前的路径
    var url = window.location.href;
    // 匹配路径
    for (var i = 0; i < websiteList.length; ++i) {
        if (websiteList[i].rule.test(url)) {
            return i;
        }
    }
    return -1;
}


// 点击链接即可使用迅雷下载服务
function changeLink(website) {

    // 注册一个定时器
    var task = setInterval(function (event) {
        // 获取标签数组
        var linkElement = $(website.copy.selector);
        // 元素存在
        if (linkElement.length > 0) {

            // 设置匹配模式
            var pattern = website.copy.rule;

            // 即使是一部电视剧,也能完美支持
            for (var index = 0; index < linkElement.length; ++index) {

                // 去除改元素的onclick事件(尔后将从事件监听中去除)
                removeEvent(linkElement[index], website.copy.removeEventList);

                console.log("index: " + index);

                // 存放下载的链接
                var downloadUrl = getDownloadUrl(linkElement[index], website.copy.ruleList);

                console.log("downloadUrl: " + downloadUrl);
                
                if (downloadUrl == null)
                    continue;
                // 点击按钮将启动迅雷下载组件,href就是下载链接
                $(linkElement[index]).attr(website.paste.attr, downloadUrl);
                // 去除元素的属性
                removeAttr(website.copy.selector, website.copy.removeAttrList);
            }

            // 关闭定时器
            clearInterval(task);
        }
    }, 50);

    // test error https://www.80s.tw/movie/22758
    // test error https://www.80s.tw/movie/22758
    // thunder://QUFodHRwOi8vZGwxODMuODBzLmltOjkyMC8xODA1L+e6oua1t+ihjOWKqOS/ruWkjeeJiC/nuqLmtbfooYzliqjkv67lpI3niYgubXA0Wlo=
    // thunder://QUFodHRwOi8vZGwxODMuODBzLmltOjkyMC8xODA1L+e6oua1t+ihjOWKqOS/ruWkjeeJiC/nuqLmtbfooYzliqjkv67lpI3niYgubXA0Wlo=
}

/*
**
** @desc: 匹配下载路径(只要匹配任意一条就返回)
** @param: selector => 元素选择器
**         ruleList => 规则列表
** @return: 匹配成功,返回下载路径,否则返回null
** 
*/
function getDownloadUrl(selector, ruleList) {

    for (var i = 0; i < ruleList.length; ++i) {
        // 匹配成功返回匹配的字符串
        if (ruleList[i].test($(selector).prop('outerHTML'))) {
            return $(selector).prop('outerHTML').match(ruleList[i])[0];
        }
    }
    // 匹配失败返回null
    return null;
}
/*
**
** @desc: 移除元素属性
** @param: selector => 元素选择器
**         removeAttrList => 移除属性的列表
**
*/
function removeAttr(selector, removeAttrList) {
    if (typeof (removeAttrList) == "undefined" || removeAttrList.length <= 0 || removeAttrList == null) {
        return;
    }
    for (var i = 0; i < removeAttrList.length; ++i) {
        $(selector).removeAttr(removeAttrList[i]);
    }
}

/*
**
** @desc: 移除元素事件列表
** @param: selector => 元素选择器
**         removeEventList => 移除事件的列表
**
*/
function removeEvent(selector, removeEventList) {
    if (typeof (removeEventList) == "undefined" || removeEventList.length <= 0 || !removeEventList) {
        return;
    }
    for (var i = 0; i < removeEventList.length; ++i) {
        console.log(removeEventList[i]);
        $(selector).unbind(removeEventList[i]);
    }
}
