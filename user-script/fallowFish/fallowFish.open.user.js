// ==UserScript==
// @name         闲鱼助手 淘宝闲鱼
// @author:      skypesky
// @namespace    http://skyepsky.cn/openJs/fallowFish
// @version      18.12.20
// @description  [skypesky 出品]闲鱼助手 完美去除广告+搜索框

// @license Apache-2.0

// @grant        GM_addStyle

// @include      http*://2.taobao.com/*
// @include      http*://s.2.taobao.com/*

// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js

// @update       2018-05-12 隐藏首页的广告
// @update       2018-05-11 创建
// ==/UserScript==

(function () {

    'use strict';

    let style = `
    .sky-search-div  {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 60px;
    }
    .sky-search-input {
        max-width: 200px;
        height: 32px;
        padding: 0px 10px;
        margin: 0px;
    }
    .sky-search-button {
        width: 54px;
        height: 36px;
        display: inline;
        padding: 6px 12px;
        margin: 6px 0px 0px 0px;
        background-color: #ffd84d;
        color: black;
        border: 1px solid #ccc;
    }
    .sky-btn-primary {
        color: #fff;
        background-color: #337ab7;
        border-color: #2e6da4;
    }
    .sky-white {
        color: white;
    }
        `;
    try {
        GM_addStyle(style)
    } catch (e) {
        console.warn(e);
    }

    var targetList = [
        ".guide-img",
        'img[alt="Scan me!"]',
        '.close-img',
        ".download-layer",
    ];

    // 这段函数每次执行都会触犯添加元素的事件,在body里面寻找节点会更加完美
    $('body').on('DOMNodeInserted', function (event) {
        for (var i = 0; i < targetList.length; ++i) {
            var removeElement = $('body').find(targetList[i]);
            if ($(removeElement).length > 0) {
                console.log($(removeElement));
                console.log("成功了: " + targetList[i]);
                $(removeElement).remove();
                // 删除元素
                targetList.splice(i, 1);
            }
        }
    });


    // 添加搜索框
    addNormalSearchBox();
    // 添加首页搜索框
    addHomeSearchBox();
})();

// 获取搜索框
function addNormalSearchBox() {
    // 创建元素
    var element = $("<div class='idle-search'><form method='get' action='//s.2.taobao.com/list/list.htm' name='search' target='_top'><input class='input-search' id='J_HeaderSearchQuery' name='q' type='text' value='' placeholder='搜闲鱼' /><input type='hidden' name='search_type' value='item' autocomplete='off' /><input type='hidden' name='app' value='shopsearch' autocomplete='off' /><button class='btn-search' type='submit'><i class='iconfont'>&#xe602;</i><span class='search-img'></span></button></form></div>");

    // 添加到元素中
    $('.idle-header').append(element);
}

function addHomeSearchBox() {
    // 创建元素
    var element = $(`<div class="sky-search-div">
    <form method="get" action='//s.2.taobao.com/list/list.htm'>
        <input name="q" class="sky-search-input" type="text" placeholder="搜闲鱼">
        <input type='hidden' name='search_type' value='item' autocomplete='off' />
        <input type='hidden' name='app' value='shopsearch' autocomplete='off' />
        <button class="sky-search-button sky-btn-primary" type="submit">
            搜索
        </button>
    </form>
</div>`);

    // 添加到元素中
    $('div.slodbar-wrap').before(element);
}