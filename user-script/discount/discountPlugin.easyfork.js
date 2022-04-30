// ==UserScript==
// @name         [skypesky 出品]支持手机扫描二维码领取优惠券 淘宝天猫购物优惠券 优惠券 省钱必备工具 最新版(2018-06-21) 
// @author       skypesky
// @collaborator liang
// @namespace    http://www.skypesky.cn
// @version      18.06.21
// @description  帮助淘宝天猫用户查询当前商品的优惠券
// @updateURL    https://greasyfork.org/scripts/40146-taobao-%E6%B7%98%E5%AE%9D%E5%A4%A9%E7%8C%AB%E8%B4%AD%E7%89%A9%E5%8A%A9%E6%89%8B-%E4%BC%98%E6%83%A0%E5%88%B8%E5%8A%A9%E6%89%8B-%E6%94%AF%E6%8C%81%E6%89%AB%E7%A0%81%E9%A2%86%E5%88%B8-%E7%9C%81%E9%92%B1%E5%BF%85%E5%A4%87%E5%B7%A5%E5%85%B7-%E6%9C%80%E6%96%B0%E7%89%88-2018-05-18-skypesky/code/taobao%20%E6%B7%98%E5%AE%9D%E5%A4%A9%E7%8C%AB%E8%B4%AD%E7%89%A9%E5%8A%A9%E6%89%8B%20%E4%BC%98%E6%83%A0%E5%88%B8%E5%8A%A9%E6%89%8B%20%E6%94%AF%E6%8C%81%E6%89%AB%E7%A0%81%E9%A2%86%E5%88%B8%20%E7%9C%81%E9%92%B1%E5%BF%85%E5%A4%87%E5%B7%A5%E5%85%B7%20%E6%9C%80%E6%96%B0%E7%89%88(20180518)%20%5Bskypesky%5D.user.js

// ==========================详情页===========================
// @include      http*://s.taobao.com/search*
// @include      http*://list.tmall.com*
// @include      http*://list.tmall.hk/search_product.htm*
// @include      http*://www.tmall.com/*

// ==========================搜索页============================
// @include      http*://item.taobao.com/*
// @include      http*://detail.tmall.com/*
// @include      http*://chaoshi.detail.tmall.com/*
// @include      http*://detail.tmall.hk/*
// @include      http*://detail.yao.95095.com/item.htm*

// @grant        none
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require      https://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min.js
// @require      https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js

// ==/UserScript==

(function () {
    'use strict';

    const SingleProductList = [
        {
            'webUrl': 'http*://item.taobao.com/*',
            'testUrl': [
                'https://detail.tmall.com/item.htm?spm=a230r.1.14.49.540ebfacqvEYTO&id=567321234000&ns=1&abbucket=19&sku_properties=5919063:6536025'
            ],
            'description': '淘宝商品详情页',
            'rule': /\/\/item.taobao.com\//,
            'title': {
                'selector': '.tb-main-title',
            }
        },
        {
            'webUrl': 'http*://detail.tmall.com/*',
            'testUrl': [
                'https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.44.3485471b9MXFa6&id=548041586009&skuId=3487271543110&standard=1&user_id=1956576107&cat_id=2&is_b=1&rn=3845a7b75c21c0c215f9387e6da29c12'
            ],
            'description': '天猫商品详情页',
            'rule': /\/\/detail.tmall.com\//,
            'title': {
                'selector': '.tb-detail-hd > h1',
            }
        },
        {
            'webUrl': 'http*://chaoshi.detail.tmall.com/*',
            'testUrl': [
                'https://chaoshi.detail.tmall.com/item.htm?spm=a3204.7933263.0.0.30755689u71e3R&id=40553443841&rewcatid=50514008'
            ],
            'description': '天猫超市商品详情页',
            'rule': /\/\/chaoshi.detail.tmall.com\//,
            'title': {
                'selector': '.tb-detail-hd > h1',
            }
        },
        {
            'webUrl': 'http*://detail.tmall.hk/*',
            'testUrl': [
                'https://detail.tmall.hk/item.htm?spm=a220m.1000858.1000725.1.245adef3e8C0PD&id=537322241064&skuId=3208297513344&user_id=2248370076&cat_id=52792006&is_b=1&rn=08fddf654f15cf5f597126d24d58036f'
            ],
            'description': '天猫国际商品详情页',
            'rule': /\/\/detail.tmall.hk\//,
            'title': {
                'selector': '.tb-detail-hd > h1',
            }
        },
        {
            'webUrl': 'http*://detail.yao.95095.com/item.htm*',
            'testUrl': [
                'https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.31.32b94fc54dnadz&id=566728087172&user_id=1756499995&cat_id=2&is_b=1&rn=452988c5bbaabcd343620724279e4566'
            ],
            'description': '天猫医药商品详情页',
            'rule': /\/\/detail.yao.95095.com\//,
            'title': {
                'selector': '.tb-detail-hd > h1',
            }
        },
    ];

    const SearchProductList = [
        {
            'webUrl': 'https://s.taobao.com/search/*',
            'testUrl': [
                'https://s.taobao.com/search?q=%E8%83%8C%E5%8C%85&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20180530&ie=utf8'
            ],
            'description': '淘宝网直接搜索',
            'rule': /\/\/s.taobao.com\/search/,
            'id': {
                'selector': '.title a[data-nid]',
                'attr': 'data-nid'
            },
            'title': {
                'selector': 'div.title a',
            },
            'image': {
                'selector': '.pic-box-inner'
            }
        },
        {
            'webUrl': 'http*://list.tmall.hk/search_product.htm*from=yao..pc_1_searchbutton',
            'description': '天猫医药馆直接搜索',
            'testUrl': [
                'https://list.tmall.com/search_product.htm?spm=a220m.1000858.1000723.3.70424fc5QClXuA&&from=rs_1_key-top-s&q=%D1%F8%CE%B8%D4%E7%B2%CD'
            ],
            'rule': /\/\/list.tmall.com\/search_product.htm[\s\S]*from=yao..pc_1_searchbutton/,
            'id': {
                'selector': 'div.product[data-id]',
                'attr': 'data-id'
            },
            'title': {
                'selector': '.productTitle a',
            },
            'image': {
                'selector': '.productImg-wrap'
            }
        },
        {
            'webUrl': 'http*://list.tmall.com/search_product.htm*from=chaoshi..pc_1_searchbutton',
            'testUrl': [
                'https://list.tmall.com/search_product.htm?q=%D3%CD&user_id=725677994&type=p&cat=50514008&spm=a3204.7084717.a2227oh.d100&from=chaoshi.index.pc_1_searchbutton',
                'https://list.tmall.com//search_product.htm?q=%D3%CD%D1%CC%BB%FA&user_id=725677994&type=p&cat=50514008&spm=a3204.7933263.a2227oh.d100&xl=%D3%CD_1&from=chaoshi..pc_1_suggest'
            ],
            'description': '天猫超市直接搜索',
            'rule': /\/\/list.tmall.com\/+search_product.htm[\s\S]*from=chaoshi/,
            'id': {
                'selector': 'li.product',
                'attr': 'data-itemid'
            },
            'title': {
                'selector': '.product-title a',
            },
            'image': {
                'selector': '.product-img'
            }
        },
        {
            'webUrl': 'http*://list.tmall.hk/search_product.htm',
            'testUrl': [
                'https://list.tmall.hk/search_product.htm?q=%C3%E6%C4%A4&spm=a2231.7718719.a2227oh.d100&type=p&from=tmallhk.list.pc_1_searchbutton'
            ],
            'description': '天猫国际直接搜索',
            'rule': /\/\/list.tmall.hk\/search_product.htm/,
            'id': {
                'selector': 'div.product[data-id]',
                'attr': 'data-id'
            },
            'title': {
                'selector': '.productTitle',
            },
            'image': {
                'selector': '.productImg-wrap'
            }
        },
        {
            'webUrl': 'https://list.tmall.com/search_product.htm*from=mallfp..pc_1_searchbutton',
            'testUrl': [
                'https://list.tmall.com/search_product.htm?q=%C4%DA%D2%C2&type=p&spm=a220m.1000858.a2227oh.d100&from=.list.pc_1_searchbutton',
                'https://list.tmall.com/search_product.htm?q=%B1%CA%D0%BE&type=p&vmarket=&spm=875.7931836%2FB.a2227oh.d100&from=mallfp..pc_1_searchbutton'
            ],
            'description': '天猫直接搜索',
            'rule': /\/\/list.tmall.com\/search_product.htm*/,
            'id': {
                'selector': 'div.product[data-id]',
                'attr': 'data-id'
            },
            'title': {
                'selector': '.productTitle',
            },
            'image': {
                'selector': '.productImg-wrap'
            }
        }    
    ];

    $(function () {
        // 商品详情页搜券程序
        Util.run(SingleProductList, new SingleProduct());        
    });

    $(window).on('load', function() {
        // 商品搜索页搜券程序
        Util.run(SearchProductList, new SearchProduct());
    })

})();

// 商品详情
function SingleProduct() {
    // 二维码
    this._qrocde = null;
    // 优惠券图标
    this._discountIcon = null;
}

// 运行函数
SingleProduct.prototype.run = function (website) {

    // 存放当前对象(SingleProduct的6一个实例)
    let _this = this;

    // 创建discountIcon
    _this.createDiscountIcon("点我搜券");
    $('body').append(_this._discountIcon);

    // 创建qrcode
    _this.createQrcode();
    $(_this._discountIcon).before(_this._qrcode);

    // 获取title
    let url = window.location.href;
    let id = (url.match(/[&?]id=\d+[&]?/g) + "").match(/\d+/g) + "";
    // 获取id
    let title = $.trim($(website.title.selector).text());

    console.log(`id: ${id} title: ${title}`);


    // 验证id,title的合法性
    if (!Validate.checkIdAndTitle(id, title)) {
        console.error(`${id} or ${title} error!`);
        return;
    }
    // 请求api
    $.ajax({
        url: 'https://www.skypesky.cn/api/search',
        method: "POST",
        data: {
            title: title,
            id: id
        },
        success: function (res) {
            if (res != null && res.flag) {  // 优惠券存在
                // 更新discountIcon
                _this.updateDiscountIcon("查找成功! " + res.data.resultInfo.couponInfo);
                _this._discountIcon.attr('onclick', 'window.open("' + res.data.spreadUrl + '")');
                // 更新qrcode
                _this.updateQrcode(res.data.spreadUrl);
                $(_this._discountIcon).before(_this._qrcode);
            } else {    // 优惠券不存在
                // 更新discountIcon
                _this.updateDiscountIcon('优惠券逃跑了*_*');
                _this._discountIcon.removeAttr('onclick');
            }
        }
    });

    // click discountIcon
    $('#skypesky-discountIcon').bind('click', function (event) {
        console.log("repeat require api");
        // 验证id,title的合法性
        if (!Validate.checkIdAndTitle(id, title)) {
            console.error(`${id} or ${title} error!`);
            return;
        }
        // 请求api
        $.ajax({
            url: 'https://www.skypesky.cn/api/search',
            method: "POST",
            data: {
                title: title,
                id: id
            },
            success: function (res) {
                if (res != null && res.flag) {  // 优惠券存在
                    // 更新discountIcon
                    _this.updateDiscountIcon("查找成功! " + res.data.resultInfo.couponInfo);
                    // 设置跳转的链接
                    _this._discountIcon.attr('onclick', 'window.open("' + res.data.spreadUrl + '")');
                    // 更新qrcode
                    _this.updateQrcode(res.data.spreadUrl);
                    $(_this._discountIcon).before(_this._qrcode);
                } else {    // 优惠券不存在
                    // 更新discountIcon
                    _this.updateDiscountIcon('优惠券逃跑了*_*');
                    _this._discountIcon.removeAttr('onclick');
                }
            }
        });
    });

    // on scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 1000) {
            // hide discount and qrcode image
            $('#skypesky-discountIcon').hide();
            $('#skypesky-qrcode').hide();
        } else {
            $('#skypesky-discountIcon').show();
        }
    });

    // show qrcode
    $('#skypesky-discountIcon').bind('mouseenter', function (event) {
        $('#skypesky-qrcode').show();
    });

    // hide qrcode
    $('#skypesky-discountIcon').bind('mouseleave', function (event) {
        $('#skypesky-qrcode').hide();
    });

};

/*
** @desc: 创建qrcode
** @param: text => 扫描链接
** @return: 返回qrcode
*/
SingleProduct.prototype.createQrcode = function (text = 'http://weixin.qq.com/r/8DqNlTXEc2gMrXH292-i') {

    text = Util.toUtf8(text);
    let id = 'skypesky-qrcode';
    // create qrcode element
    this._qrcode = $('<div></div>');
    // set id property
    this._qrcode.attr('id', id);
    // set css qrcode
    this._qrcode.css({
        'position': 'fixed',
        'left': '5px',
        'bottom': '10rem',
        'display': 'none',
        'z-index': '666'
    });
    // create qrcode image
    this._qrcode.qrcode({
        width: 90,
        height: 90,
        render: 'canvas',
        typeNumber: -1,
        correctLevel: 0,
        background: '#ffffff',
        foreground: '#000000',
        text: text
    });

    return this._qrcode;
};
/*
** @desc: 更新qrcode
** @param: text => 扫描链接
** @return: 返回qrcode
*/
SingleProduct.prototype.updateQrcode = function (text) {
    this.removeQrcode();
    this.createQrcode(text);
    return this._qrcode;
};
/*
** @desc: 移除qrcode
** @param:
** @return:
*/
SingleProduct.prototype.removeQrcode = function () {
    console.log("remove qrcode");
    this._qrcode.remove();
};

// 显示信息
SingleProduct.prototype.show = function () {
    console.log(this._qrcode);
    console.log(this._discountIcon);
};

/*
** @desc: 创建discountIcon
** @param:  text => 显示的文本信息
** @return: 返回discountIcon
*/
SingleProduct.prototype.createDiscountIcon = function (text = '点我搜券') {

    // 设置id
    let id = 'skypesky-discountIcon';
    // create tag
    this._discountIcon = $('<button></button>').text(text);
    // set id property
    this._discountIcon.attr('id', id);
    this._discountIcon.attr('type', 'button');
    //set css property
    this._discountIcon.css({
        'position': 'fixed',
        'left': '0px',
        'bottom': '3rem',
        'margin-left': '5px',
        'padding': ".5em 1em",
        'width': '90px',
        'height': 'auto',
        'line-height': '24px',
        'font-family': 'Hiragino Sans GB,microsoft yahei,sans-serif',
        'font-size': '12px',
        'white-space': 'normal',
        'color': '#fff',
        'background-color': '#0e90d2',
        'border-color': '#0e90d2',
        'display': 'inline-block',
        'border-radius': '0',
        'border': '1px solid transparent',
        'text-align': 'center',
        'z-index': '666'
    });

    return this._discountIcon;
};
/*
** @desc: 更新discountIcon
** @param: text => 显示的文本信息
** @return: 返回discountIcon
*/
SingleProduct.prototype.updateDiscountIcon = function (text) {
    this._discountIcon.text(text);
    return this._discountIcon;
};

// 商品搜索处理类
function SearchProduct() {
    this._discountTag = null;
};

/*
** @desc: 创建discountTag
** @param: text => 显示的文本信息
** @return: 返回discountTag
*/
SearchProduct.prototype.createDiscountTag = function (text) {
    var id = 'skypesky-discountTag';
    // create tag
    this._discountTag = $('<span></span>');
    // 设置文本信息
    this._discountTag.text(text);
    // 设置id属性
    this._discountTag.attr('id', id);
    // 设置样式
    this._discountTag.css({
        'position': 'absolute',
        'right': '0px',
        'top': '0px',
        'padding': '0.5em 0.2em',
        'width': '80px',
        'height': 'auto',
        'line-height': '14px',
        'font-family': 'Hiragino Sans GB,microsoft yahei,sans-serif',
        'font-size': '14px',
        'white-space': 'normal',
        'color': '#fff',
        'background-color': '#FF2220',
        'display': 'inline-block',
        'text-align': 'center',
        'z-index': '8'
    });

    return this._discountTag;
};

// 运行函数
SearchProduct.prototype.run = function (website) {

    // 存放当前SearchProduct的实例
    let _this = this;

    //==============定时器检测路径变化====================
    // 获取初始的url
    var originUrl = window.location.href;
    // 注册一个定时器
    var task = setInterval(function () {
        // 用户切换商品页,导致url发送变化
        if (originUrl != window.location.href) {
            originUrl = window.location.href;
            // 再次执行搜券函数
            _this.run(website);
        }
    }, 1000);
    //==============/定时器检测路径变化===================

    let idList = $(website.id.selector);
    let titleList = $(website.title.selector);
    let imageList = $(website.image.selector);

    // console.log(idList.length, titleList.length, imageList.length);

    for (let i = 0; i < idList.length; ++i) {
        // 获取id
        let id = !website.id.rule ? $.trim($(idList[i]).attr(website.id.attr)) : $.trim($(idList[i]).attr(website.id.attr).match(website.id.rule).toString());
        // 获取标题
        let title = $.trim($(titleList[i]).text());

        // console.log("=======================================================================");
        // console.log(`index: ${i} id: ${id} title: ${title}`);
        // console.log("=======================================================================");
        // 请求api
        if (!Validate.checkIdAndTitle(id, title)) {
            console.error(`${id} or ${title} error!`);
            continue;
        }
        $.ajax({
            url: 'https://www.skypesky.cn/api/search',
            method: "POST",
            data: {
                title: title,
                id: id
            },
            success: function (res) {
                if (res && res.flag) { // 优惠券存在
                    // 创建标签显示优惠信息
                    _this.createDiscountTag(res.data.resultInfo.couponInfo);
                    // 设置需要跳转的链接
                    _this._discountTag.attr('onclick', 'window.open("' + res.data.spreadUrl + '")');
                    $(imageList[i]).append(_this._discountTag);
                } else { //优惠券不存在
                    console.info("sorry discount exsit");
                }
            }
        });
    }

};


// 工具类
var Util = {

    // 选择配置
    select: function (configList) {
        let url = window.location.href;
        for (let i = 0; i < configList.length; ++i) {
            if (configList[i].rule.test(url)) {
                return i;
            }
        }
        return -1;
    },
    // 执行配置
    run: function (configList, object) {
        let index = this.select(configList);
        console.log("index: "+index);
        if (index != -1) { //匹配成功
            console.log("匹配成功! " + configList[index].description);
            object.run(configList[index]);
        } else { //匹配失败
            console.log("匹配失败!");
        }
    },

    // 解决乱码问题
    toUtf8: function (str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    },

    // 请求api
    search: function (id, title, callback) {
        // 验证id,title的合法性
        if (!Validate.checkIdAndTitle(id, title)) {
            console.error(`{id} or {title} error!`);
            return;
        }
        // 请求api
        $.ajax({
            url: 'https://www.skypesky.cn/api/search',
            method: "POST",
            data: {
                title: title,
                id: id
            },
            success: function (res) {
                callback(res);
            }
        });
    }
};

// 验证工具类
var Validate = {
    // 验证id
    checkId: function (id) {
        // id不合法返回false
        if (id == undefined || id == null || id == "") {
            return false;
        }
        return true;
    },
    // 验证title
    checkTitle: function (title) {
        // title不合法返回false
        if (title == undefined || title == null || title == "") {
            return false;
        }
        return true;
    },
    checkIdAndTitle: function (id, title) {
        // id, title需要同时满足条件
        return (this.checkId(id) && this.checkTitle(title));
    }
};

