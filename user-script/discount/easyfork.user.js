// ==UserScript==
// @name         [skypesky 出品] 扫描二维码领取优惠券 淘宝天猫购物优惠券(2018-09-14) 
// @author       skypesky
// @collaborator liang
// @namespace    http://www.skypesky.cn
// @version      18.09.14
// @description  帮助淘宝天猫用户查询当前商品的优惠券
// @updateURL    https://greasyfork.org/scripts/40146-taobao-%E6%B7%98%E5%AE%9D%E5%A4%A9%E7%8C%AB%E8%B4%AD%E7%89%A9%E5%8A%A9%E6%89%8B-%E4%BC%98%E6%83%A0%E5%88%B8%E5%8A%A9%E6%89%8B-%E6%94%AF%E6%8C%81%E6%89%AB%E7%A0%81%E9%A2%86%E5%88%B8-%E7%9C%81%E9%92%B1%E5%BF%85%E5%A4%87%E5%B7%A5%E5%85%B7-%E6%9C%80%E6%96%B0%E7%89%88-2018-05-18-skypesky/code/taobao%20%E6%B7%98%E5%AE%9D%E5%A4%A9%E7%8C%AB%E8%B4%AD%E7%89%A9%E5%8A%A9%E6%89%8B%20%E4%BC%98%E6%83%A0%E5%88%B8%E5%8A%A9%E6%89%8B%20%E6%94%AF%E6%8C%81%E6%89%AB%E7%A0%81%E9%A2%86%E5%88%B8%20%E7%9C%81%E9%92%B1%E5%BF%85%E5%A4%87%E5%B7%A5%E5%85%B7%20%E6%9C%80%E6%96%B0%E7%89%88(20180518)%20%5Bskypesky%5D.user.js


// @connect      *
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceURL
// @grant        GM_notification

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

// ==========================资源============================
// @resource     toastr https://cdn.bootcss.com/izitoast/1.3.0/css/iziToast.min.css
// @resource     contexMenu https://cdn.bootcss.com/jquery-contextmenu/2.6.1/jquery.contextMenu.min.css
// @resource     lib http://www.skycumulus.cn:9090/taobaoAdmin/dist/css/lib.css

// ==========================js============================
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require      https://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min.js
// @require      https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js
// @require      https://cdn.bootcss.com/jquery-contextmenu/2.6.1/jquery.contextMenu.min.js
// @require      https://cdn.bootcss.com/izitoast/1.3.0/js/iziToast.min.js

// ==/UserScript==


const config = {
    successClassTag: `skypesky-search-success`,
    errorClassTag: `skypesky-search-error`,
    requestApi: {
        url: "https://skypesky.cn/api/search",
        method: "POST"
    }
};



(function () {

    'use strict';

    //导入的样式
    const cssList = [
        "contexMenu",
        "toastr"
    ];

    const SingleProductList = [{
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

    const SearchProductList = [{
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
            },
            'product': {
                'selector': '.J_MouserOnverReq',
            }
        },
        {

            'webUrl': 'http*://list.tmall.hk/search_product.htm*from=yao..pc_1_searchbutton',
            'description': '天猫医药馆直接搜索',
            'testUrl': [
                'https://list.tmall.com/search_product.htm?spm=a222y.22577.6850814529.3.60042883GjWeq6&abbucket=&cat=53350009&acm=lb-zebra-22578-290927.1003.8.426589&aldid=176543&q=%B2%B9%C9%F6&abtest=&scm=1003.8.lb-zebra-22578-290927.ITEM_14466834623622_426589'
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
            },
            'product': {
                'selector': 'div.product',
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
            },
            'product': {
                'selector': 'li.product',
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
            },
            'product': {
                'selector': 'div.product',
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
            },
            'product': {
                'selector': 'div.product[data-id]'
            }
        }
    ];

    // 动态加载执行事件,建议把function去除掉
    $(function () {
        $('body').css('background', '#F4F4F4');
        // 添加样式
        importUtil.setCssList(cssList);
        importUtil.importCss();
        // 商品详情页搜券程序
        Util.run(SingleProductList, new SingleProduct());
        // 商品搜索页搜券程序
        Util.run(SearchProductList, new SearchProduct());
    });

})();

// 商品详情
function SingleProduct() {
    // 二维码
    this._qrocde = null;
    // 优惠券图标
    this._discountIcon = null;
}

// 注册事件
SingleProduct.prototype.registerEvent = function () {
    console.log("SingleProduct registerEvent");
    // click discountIcon
    $('#skypesky-discountIcon').bind('click', (event) => {
        console.log(`registerEvent 再次发起请求`);
        // 验证id,title的合法性
        if (!Validate.checkIdAndTitle(id, title)) {
            console.error(`${id} or ${title} error!`);
            return;
        }
        // 请求api
        $.ajax({
            url: config.requestApi.url,
            method: config.requestApi.method,
            data: {
                title: title,
                id: id
            },
            success: (result) => {
                this.handlerDiscount(result);
            }
        });
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 1000) {
            // 隐藏优惠券和qrcode
            $('#skypesky-discountIcon').hide();
            $('#skypesky-qrcode').hide();
        } else {
            $('#skypesky-discountIcon').show();
            $('#skypesky-qrcode').show();
        }
    });
}

// 运行函数
SingleProduct.prototype.run = function (website) {

    // 注册事件
    this.registerEvent();

    // 创建discountIcon
    this.createDiscountIcon("点我搜券");
    $('body').append(this._discountIcon);

    // 创建qrcode
    this.createQrcode();
    $(this._discountIcon).before(this._qrcode);

    // 获取title
    let url = window.location.href;
    let id = (url.match(/[&?]id=\d+[&]?/g) + "").match(/\d+/g) + "";
    // 获取id
    let title = $.trim($(website.title.selector).text());


    // 验证id,title的合法性
    if (!Validate.checkIdAndTitle(id, title)) {
        console.error(`${id} or ${title} error!`);
        return;
    }

    // 第一次请求api   
    $.ajax({
        url: config.requestApi.url,
        method: config.requestApi.method,
        data: {
            title: title,
            id: id
        },
        success: (result) => {
            this.handlerDiscount(result);
        }
    });

};

/*
 ** @desc: 处理优惠券
 ** @param: 
 ** @return: 
 */
SingleProduct.prototype.handlerDiscount = function (result) {
    console.log("handlerDiscount");
    if (result != null && result.flag) { // 优惠券存在
        // 更新discountIcon
        this.updateDiscountIcon("查找成功! " + result.data.resultInfo.coupon_info);
        // 设置跳转的链接
        this._discountIcon.attr('onclick', 'window.open("' + result.data.spreadUrl + '")');
        // 更新qrcode
        this.updateQrcode(result.data.spreadUrl);
        $(this._discountIcon).before(this._qrcode);
    } else { // 优惠券不存在
        // 更新discountIcon
        this.updateDiscountIcon('优惠券逃跑了*_*');
        this._discountIcon.removeAttr('onclick');
    }
}

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
    this._qrcode.remove();
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
    // 统计数据
    this._statistic = new Statistic();
    // 搜索的商品数
    this._number = 0;
    // website
    this._website = null;
};

/*
 ** @desc: 创建discountTag
 ** @param: text => 显示的文本信息
 ** @return: 返回discountTag
 */
SearchProduct.prototype.createDiscountTag = function (text) {
    let id = 'skypesky-discountTag';
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
        'background-color': '#DC143C',
        'display': 'inline-block',
        'text-align': 'center',
        'z-index': '8'
    });

    return this._discountTag;
};

/*
 ** @desc: 注册事件
 ** @param: 
 ** @return: 
 */
SearchProduct.prototype.registerEvent = function () {

    console.log("registerEvent()");
    // 添加右键菜单    
    $.contextMenu({
        selector: 'body',
        callback: (key, options) => {
            if (key == "showSome") {
                // 仅显示优惠券信息
                ToastMessage.success({
                    message: `仅显示含有优惠券(共${this._statistic.successCount}张)的商品!`,
                    timeout: 3000
                });
                this.onlyShowDiscount();
            } else if (key == "showAll") {
                // 显示所有商品信息
                ToastMessage.success({
                    message: "显示所有商品!",
                    timeout: 3000
                });
                this.showAll();
            } else if (key == "feedback") {
                // this.feedback();
                ToastMessage.error({
                    message: "此功能暂未开放!",
                    timeout: 3000
                });
            } else {
                console.log("选择无效!")
            }
        },
        items: {
            "showSome": {
                name: "仅显示优惠券信息",
            },
            "line1": "--------------------",
            "showAll": {
                name: "显示所有信息",
            },
            "line2": "--------------------",
            "feedback": {
                name: "反馈",
            }
        }
    });

    // 当用户翻页时,也能正常搜券
    this.changePageRun(this._website);
}
// 运行函数
SearchProduct.prototype.run = function (website) {

    this._website = website;

    // 获取信息
    let idList = $(website.id.selector);
    let titleList = $(website.title.selector);
    let imageList = $(website.image.selector);

    // 获取商品总数
    this._number = idList.length;

    // console.log(idList.length, titleList.length, imageList.length);

    // 正在搜索优惠券...
    ToastMessage.success({
        message: "正在搜索优惠券,请稍候...",
        timeout: 15000
    });

    for (let i = 0; i < idList.length; ++i) {
        // 获取id
        let id = !website.id.rule ? $.trim($(idList[i]).attr(website.id.attr)) : $.trim($(idList[i]).attr(website.id.attr).match(website.id.rule).toString());
        // 获取标题(去除左右的空格)
        let title = $.trim($(titleList[i]).text());

        // 验证id和title
        if (!Validate.checkIdAndTitle(id, title)) {
            console.error(`${id} or ${title} error!`);
            continue;
        }
        // 请求api
        $.ajax({
            url: config.requestApi.url,
            method: config.requestApi.method,
            data: {
                title: title,
                id: id
            },
            success: (res) => {

                if (res && res.flag) { // 优惠券存在
                    // 成功的请求数
                    this._statistic.successCount++;

                    // 创建标签显示优惠信息
                    this.createDiscountTag(res.data.resultInfo.coupon_info);
                    // 设置需要跳转的链接
                    this._discountTag.attr('onclick', 'window.open("' + res.data.spreadUrl + '")');
                    $(imageList[i]).append(this._discountTag);


                    $($(website.product.selector)[i]).addClass(config.successClassTag);
                } else { //优惠券不存在

                    // 失败的请求数
                    this._statistic.errorCount++;

                    $($(website.product.selector)[i]).addClass(config.errorClassTag);
                }
            }
        });


    }

    // 找到优惠券给出提示
    let task = setInterval(() => {
        if (this._statistic.getAllCount() == idList.length) {
            clearInterval(task);
            // 注册事件
            this.registerEvent();
            ToastMessage.clear();
            ToastMessage.info({
                message: `已找到${this._statistic.successCount}张商品优惠券`,
            });
        }
    }, 100);

};

/**
 ** @desc: 仅显示优惠券信息
 ** @param: 
 ** @return:
 */
SearchProduct.prototype.onlyShowDiscount = function () {

    console.log("onlyShowDiscount");
    let task = setInterval(() => {
        if (this._statistic.getAllCount() == this._number) {
            clearInterval(task);
            const errorProductList = $(`.${config.errorClassTag}`);
            console.log("errorProductList: " + errorProductList.length);
            errorProductList.hide();
        }
    }, 100);
}

/**
 ** @desc: 显示所有信息(不管有没有优惠券)
 ** @param: 
 ** @return:
 */
SearchProduct.prototype.showAll = function () {
    console.log("showAll");
    let task = setInterval(() => {
        if (this._statistic.getAllCount() == this._number) {
            clearInterval(task);
            const errorProductList = $(`.${config.errorClassTag}`);
            console.log("errorProductList: " + errorProductList.length);
            errorProductList.show();
        }
    }, 100);
}

/*
 ** @desc: 定时检测网站路径的变化,当网站的路径变化时,再次运行搜券程序
 ** @param: website => 网站配置项
 */
SearchProduct.prototype.changePageRun = function (website) {

    // 获取初始的url
    let originUrl = window.location.href;
    // 注册一个定时器
    let task = setInterval(() => {
        // 用户切换商品页,导致url发送变化
        if (originUrl != window.location.href) {
            clearInterval(task);
            originUrl = window.location.href;
            // 清空数据
            this.clear();
            // 再次执行搜券函数
            this.run(this._website);
        }
    }, 100);

};

/*
 ** @desc: 清除一些参数
 ** @param:
 ** @return:
 */
SearchProduct.prototype.clear = function () {
    // 清除统计数据
    this._statistic.clear();
    // 搜索的商品数置为0
    this._number = 0;
}

// 工具类
const Util = {

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
        if (index != -1) { //匹配成功
            console.log("匹配成功! " + configList[index].description);
            object.run(configList[index]);
        } else { //匹配失败
            console.log("匹配失败!");
        }
    },

    // 解决乱码问题
    toUtf8: function (str) {
        let out, i, len, c;
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
    }
};

// 验证工具类
const Validate = {

    // 验证id
    checkId: function (id) {
        // id不合法或者不是纯数字,返回false
        if (id == undefined || id == null || id == "" || !/\d*/.test(id)) {
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
    },
};

// 统计数据
function Statistic() {
    this.successCount = 0;
    this.errorCount = 0;
}
/*
 ** @desc: 清空统计数据
 ** @param:
 ** @return:
 */
Statistic.prototype.clear = function () {
    this.successCount = 0;
    this.errorCount = 0;
}
/*
 ** @desc: 获取总的统计数
 ** @param:
 ** @return: 返回总的统计数
 */
Statistic.prototype.getAllCount = function () {
    return this.successCount + this.errorCount;
}

/*
 ** @desc: 获取成功率
 ** @param:
 ** @return: 返回统计的成功率,保留两位小数
 */
Statistic.prototype.getSuccessRate = function () {
    return (this.successCount / this.getAllCount()).toFixed(2);
}

// 导入样式库
const importUtil = {

    cssList: [],

    importCss: function () {
        let styles = "";
        for (let i = 0; i < this.cssList.length; ++i) {
            styles += GM_getResourceText(this.cssList[i]);
        }
        GM_addStyle(styles);
    },

    setCssList: function (cssList) {
        this.cssList = cssList;
    },

    clear: function () {
        this.cssList = null;
    }

}

const ToastMessage = {
    success: function (paramObject) {
        iziToast.success({
            message: paramObject.message ? paramObject.message : "",
            position: "bottomLeft",
            timeout: paramObject.timeout ? paramObject.timeout : 3000
        });
    },
    error: function (paramObject) {
        iziToast.error({
            message: paramObject.message ? paramObject.message : "",
            position: "bottomLeft",
            timeout: paramObject.timeout ? paramObject.timeout : 3000
        });
    },
    info: function (paramObject) {
        iziToast.info({
            message: paramObject.message ? paramObject.message : "",
            position: "bottomLeft",
            timeout: paramObject.timeout ? paramObject.timeout : 3000
        });
    },
    clear: function () {
        iziToast.destroy();
    }
}