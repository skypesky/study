// ==UserScript==
// @name         [skypesky 出品]闲鱼助手 完美去除广告+搜索框(2019-04-02)
// @author:      skypesky
// @namespace    http://skyepsky.cn/fallowFish
// @version      19.04.02
// @description  闲鱼助手 完美去除广告+搜索框

// @grant        GM_addStyle


// @include      http*://2.taobao.com/*
// @include      http*://s.2.taobao.com/*

// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js

// @downloadURL none
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
    // 替换链接
    $(function() {
        replaceAllLink();
    });
   
})();

function replaceAllLink() {
    // https://s.2.taobao.com/list/list.htm?start=&end=&itemfrom=1&cpp=true&st_trust=1&ist=1&userId=0&q=da
    let originTag = "//s.2.taobao.com/list/list.htm";
    let realTag = "//s.2.taobao.com/list/list";
    let elementArray = $(`[href^='${originTag}']`);
    console.log(elementArray);
    // 替换
    [].forEach.call(elementArray, function(item, index) {
        $(item).attr('href', $(item).attr('href').replace(originTag, realTag));
    });
    // form处理
    $(`form[action]`).attr('action', $(`form[action]`).attr('action').replace(originTag, realTag));
}

// 获取搜索框
function addNormalSearchBox() {   
   // 创建元素
   var element = $(`<div class="sky-search-div">
    <form method="get" action='//s.2.taobao.com/list'>
        <input name="q" class="sky-search-input" type="text" placeholder="搜闲鱼">
        <input type='hidden' name='search_type' value='item' autocomplete='off' />
        <input type='hidden' name='app' value='shopsearch' autocomplete='off' />
        <button class="sky-search-button sky-btn-primary" type="submit">
            搜索
        </button>
    </form>
    </div>`);

   // 添加到元素中
   $('div#page').before(element);
}

function addHomeSearchBox() {
    // 创建元素
    var element = $(`<div class="sky-search-div">
    <form method="get" action='//s.2.taobao.com/list/list'>
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