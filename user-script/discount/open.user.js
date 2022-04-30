// ==UserScript==
// @namespace    https://openuserjs.org/user/skypesky
// @name         (skypesky.cn) 淘宝天猫购物优惠券 搜券助手 省钱必备工具
// @author       skypesky
// @collaborator liang
// @copyright    2018, skypesky (https://openuserjs.org/users/skypesky)
// @version      18.09.14
// @description  [skypesky 出品]支持手机扫描二维码领取优惠券 淘宝天猫购物优惠券 优惠券 省钱必备工具 最新版(2018-09-14) 

// @license Apache-2.0

// @connect      *
// @grant        GM_getResourceText
// @grant        GM_addStyle


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


// ==========================js============================
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require      https://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min.js
// @require      https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js
// @require      https://cdn.bootcss.com/jquery-contextmenu/2.6.1/jquery.contextMenu.min.js
// @require      https://cdn.bootcss.com/izitoast/1.3.0/js/iziToast.min.js


// ==/UserScript== 


// 动态配置
const config = {
    successClass: `skypesky-search-success`,
    errorClass: `skypesky-search-error`,
    hideClass: `sky-hide`,
    errorMessage: `服务不可用,请确认已更新到最新版本!`,
    api: {
        search: {
            url: "https://skypesky.cn/api/search",
            method: "POST"
        }
    },
    server: {
        productDetail: {
            qrcode: {
                element: `div`,
                attr: {
                    id: `sky-qrcode`,
                    class: `sky-qrcode`,
                },
                show: true,
                options: {
                    default: {
                        width: 90,
                        height: 90,
                        render: 'canvas',
                        typeNumber: -1,
                        correctLevel: 0,
                        background: '#ffffff',
                        foreground: '#000000',
                        text: `http://weixin.qq.com/r/8DqNlTXEc2gMrXH292-i`
                    }
                }
            },
            discountButton: {
                element: `button`,
                attr: {
                    id: `sky-discountButton`,
                    class: `sky-discountButton`
                },
                show: true
            }
        },
        searchProduct: {
            discountTag: {
                element: `span`,
                attr: {
                    id: `sky-span`,
                    class: `sky-discountTag`
                }
            },
            show: true,
            message: {
                contextMenu: {
                    showAll: "显示所有商品",
                    showDiscount: "仅显示有券商品",
                    showFeedback: "正在开发中...",
                    showError: `错误的操作`
                },
                search: {
                    loading: `正在为您搜索优惠券,请稍候`
                }
            }
        }
    }
};

const searchProductConfigList = [
    // {
    //     webUrl: 'https://www.taobao.com/',
    //     testUrl: [
    //         'https://s.taobao.com/search?q=%E8%83%8C%E5%8C%85&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20180530&ie=utf8'
    //     ],
    //     description: '淘宝网首页',
    //     rule: /\/\/www.taobao.com\//,
    //     taskList: [
    //         // {
    //     //         description: `淘抢购`,
    //     //         id: {
    //     //             selector: '.qiang-list > li > a',
    //     //             attr: 'href',
    //     //             ruleArray: [
    //     //                 /\d{12}/
    //     //             ]
    //     //         },
    //     //         title: {
    //     //             selector: '.qiang-list .info h4',
    //     //         },
    //     //         image: {
    //     //             selector: '.qiang-list > li .img-wrapper'
    //     //         },
    //     //         product: {
    //     //             selector: '.qiang-list li',
    //     //         },
    //     //         run: "active",
    //     //     },
    //     //     {
    //     //         description: `猜你喜欢`,
    //     //         id: {
    //     //             selector: 'a.hotsale-item',
    //     //             attr: 'href',
    //     //             ruleArray: [
    //     //                 /&id=\d{12}/,
    //     //                 /\d{12}/
    //     //             ]
    //     //         },
    //     //         title: {
    //     //             selector: 'a.hotsale-item h4',
    //     //         },
    //     //         image: {
    //     //             selector: 'a.hotsale-item .img-wrapper'
    //     //         },
    //     //         product: {
    //     //             selector: 'div.tbh-hotsale div.item',
    //     //         },
    //     //         run: "active",
    //     //     }
    //     ],
    // },
    {
        webUrl: 'https://s.taobao.com/search/*',
        testUrl: [
            'https://s.taobao.com/search?q=%E8%83%8C%E5%8C%85&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20180530&ie=utf8'
        ],
        description: '淘宝网直接搜索',
        rule: /\/\/s.taobao.com\/search/,
        taskList: [{
            id: {
                'selector': '.title a[data-nid]',
                'attr': 'data-nid'
            },
            title: {
                selector: 'div.title a',
            },
            image: {
                selector: '.pic-box-inner'
            },
            product: {
                selector: '.J_MouserOnverReq',
            },
            run: "normal",
        }],
    },
    {
        webUrl: 'http*://list.tmall.hk/search_product.htm*from=yao..pc_1_searchbutton',
        description: '天猫医药馆直接搜索',
        testUrl: [
            'https://list.tmall.com/search_product.htm?spm=a222y.22577.6850814529.3.60042883GjWeq6&abbucket=&cat=53350009&acm=lb-zebra-22578-290927.1003.8.426589&aldid=176543&q=%B2%B9%C9%F6&abtest=&scm=1003.8.lb-zebra-22578-290927.ITEM_14466834623622_426589'
        ],
        rule: /\/\/list.tmall.com\/search_product.htm[\s\S]*from=yao..pc_1_searchbutton/,
        taskList: [{
            id: {
                selector: 'div.product[data-id]',
                attr: 'data-id'
            },
            title: {
                selector: '.productTitle a',
            },
            image: {
                selector: '.productImg-wrap'
            },
            product: {
                selector: 'div.product',
            },
            run: "normal"
        }]
    },
    {
        webUrl: 'http*://list.tmall.com/search_product.htm*from=chaoshi..pc_1_searchbutton',
        testUrl: [
            'https://list.tmall.com/search_product.htm?q=%D3%CD&user_id=725677994&type=p&cat=50514008&spm=a3204.7084717.a2227oh.d100&from=chaoshi.index.pc_1_searchbutton',
            'https://list.tmall.com//search_product.htm?q=%D3%CD%D1%CC%BB%FA&user_id=725677994&type=p&cat=50514008&spm=a3204.7933263.a2227oh.d100&xl=%D3%CD_1&from=chaoshi..pc_1_suggest'
        ],
        description: '天猫超市直接搜索',
        rule: /\/\/list.tmall.com\/+search_product.htm[\s\S]*from=chaoshi/,
        taskList: [{
            id: {
                selector: 'li.product',
                attr: 'data-itemid'
            },
            title: {
                selector: '.product-title a',
            },
            image: {
                selector: '.product-img'
            },
            product: {
                selector: 'li.product',
            },
            run: "normal"
        }]

    },
    {
        webUrl: 'http*://list.tmall.hk/search_product.htm',
        testUrl: [
            'https://list.tmall.hk/search_product.htm?q=%C3%E6%C4%A4&spm=a2231.7718719.a2227oh.d100&type=p&from=tmallhk.list.pc_1_searchbutton'
        ],
        description: '天猫国际直接搜索',
        rule: /\/\/list.tmall.hk\/search_product.htm/,
        taskList: [{
            id: {
                selector: 'div.product[data-id]',
                attr: 'data-id'
            },
            title: {
                selector: '.productTitle',
            },
            image: {
                selector: '.productImg-wrap'
            },
            product: {
                selector: 'div.product',
            },
            run: "normal"
        }]

    },
    {
        webUrl: 'https://list.tmall.com/search_product.htm*from=mallfp..pc_1_searchbutton',
        testUrl: [
            'https://list.tmall.com/search_product.htm?q=%C4%DA%D2%C2&type=p&spm=a220m.1000858.a2227oh.d100&from=.list.pc_1_searchbutton',
            'https://list.tmall.com/search_product.htm?q=%B1%CA%D0%BE&type=p&vmarket=&spm=875.7931836%2FB.a2227oh.d100&from=mallfp..pc_1_searchbutton'
        ],
        description: '天猫直接搜索',
        rule: /\/\/list.tmall.com\/search_product.htm*/,
        taskList: [{
            id: {
                selector: 'div.product[data-id]',
                attr: 'data-id'
            },
            title: {
                selector: '.productTitle',
            },
            image: {
                selector: '.productImg-wrap'
            },
            product: {
                selector: 'div.product[data-id]'
            },
            run: "normal"
        }]
    },
    {
        webUrl: 'http://ai.taobao.com/search/index.htm?',
        testUrl: [
            'http://ai.taobao.com/search/index.htm?spm=a231o.7076277.1998559106.9.30094608TXd6XR&prepvid=200_11.15.202.13_44923_1536896328704&extra=&pid=mm_10011550_0_0&app_pvid=200_11.15.202.13_44923_1536896328704&channelId=8&cat=50000436&key=%E7%94%B7T%E6%81%A4&unid=&clk1=&source_id='
        ],
        description: '淘宝全球购直接搜索',
        rule: /\/\/g.taobao.com\/brand_detail.htm/,
        taskList: [{
            id: {
                selector: 'div.item a.shopname[data-nid]',
                attr: 'data-nid',
            },
            title: {
                selector: 'div.item div.title a',
            },
            image: {
                selector: 'div.item .pic-box-inner .pic'
            },
            product: {
                selector: 'div.item'
            },
            run: "normal"
        }]

    },
    {
        webUrl: 'http://ai.taobao.com/search/index.htm?',
        testUrl: [
            'http://ai.taobao.com/search/index.htm?spm=a231o.7076277.1998559106.9.30094608TXd6XR&prepvid=200_11.15.202.13_44923_1536896328704&extra=&pid=mm_10011550_0_0&app_pvid=200_11.15.202.13_44923_1536896328704&channelId=8&cat=50000436&key=%E7%94%B7T%E6%81%A4&unid=&clk1=&source_id='
        ],
        description: '淘宝全球购首页',
        rule: /\/\/www.taobao.com\/markets\/gmall\/pc-index/,
        taskList: [{
            id: {
                selector: 'div.gb-fp-goods:not(div#guid-929283) div.J_BD.bd ul li a',
                attr: "href",
                ruleArray: [
                    /id=\d+/,
                    /\d+/
                ]
            },
            title: {
                selector: 'div.J_BD.bd ul li a div.title',
            },
            image: {
                selector: 'div.J_BD.bd ul li a div.img-box',
                attr: {
                    class: "sky-position-relative"
                }
            },
            product: {
                selector: 'div.J_BD.bd ul li:not(div.J_BD.bd ul li a.goto-box)'
            },
            run: "normal"
        }]

    }
];


const productDetailConfigList = [{
        webUrl: 'http*://item.taobao.com/*',
        testUrl: [
            'https://detail.tmall.com/item.htm?spm=a230r.1.14.49.540ebfacqvEYTO&id=567321234000&ns=1&abbucket=19&sku_properties=5919063:6536025'
        ],
        description: '淘宝商品详情页',
        rule: /\/\/item.taobao.com\//,
        title: {
            selector: '.tb-main-title',
        }
    },
    {
        webUrl: 'http*://detail.tmall.com/*',
        testUrl: [
            'https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.44.3485471b9MXFa6&id=548041586009&skuId=3487271543110&standard=1&user_id=1956576107&cat_id=2&is_b=1&rn=3845a7b75c21c0c215f9387e6da29c12'
        ],
        description: '天猫商品详情页',
        rule: /\/\/detail.tmall.com\//,
        title: {
            selector: '.tb-detail-hd > h1',
        }
    },
    {
        webUrl: 'http*://chaoshi.detail.tmall.com/*',
        testUrl: [
            'https://chaoshi.detail.tmall.com/item.htm?spm=a3204.7933263.0.0.30755689u71e3R&id=40553443841&rewcatid=50514008'
        ],
        description: '天猫超市商品详情页',
        rule: /\/\/chaoshi.detail.tmall.com\//,
        title: {
            selector: '.tb-detail-hd > h1',
        }
    },
    {
        webUrl: 'http*://detail.tmall.hk/*',
        testUrl: [
            'https://detail.tmall.hk/item.htm?spm=a220m.1000858.1000725.1.245adef3e8C0PD&id=537322241064&skuId=3208297513344&user_id=2248370076&cat_id=52792006&is_b=1&rn=08fddf654f15cf5f597126d24d58036f'
        ],
        description: '天猫国际商品详情页',
        rule: /\/\/detail.tmall.hk\//,
        title: {
            selector: '.tb-detail-hd > h1',
        }
    },
    {
        webUrl: 'http*://detail.yao.95095.com/item.htm*',
        testUrl: [
            'https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.31.32b94fc54dnadz&id=566728087172&user_id=1756499995&cat_id=2&is_b=1&rn=452988c5bbaabcd343620724279e4566'
        ],
        description: '天猫医药商品详情页',
        rule: /\/\/detail.yao.95095.com\//,
        title: {
            selector: '.tb-detail-hd > h1',
        }
    },
];



// 选择执行的控制器
const Controller = {
    // 匹配网站
    select: function (configList, keyword) {
        for (let i = 0; i < configList.length; ++i) {
            if (configList[i].rule.test(keyword)) {
                return i;
            }
        }
        return -1;
    },
    // 匹配执行的控制器
    run: function (websiteConfigList, callback) {
        // 当前网址路径为关键字
        let keyword = window.location.href;
        let index = this.select(websiteConfigList, keyword);

        if (index != -1) { //匹配成功
            console.log("匹配成功! " + websiteConfigList[index].description);
            callback(websiteConfigList[index]);
        } else { //匹配失败
            console.log("匹配失败!");
        }
    }
};


const SearchServer = {
    //任务数统计
    _taskStatistic: new Statistic(),
    _activeTaskStatistic: new Statistic(),
    _normalTaskStatistic: new Statistic(),
    run: function (searchProductConfig) {
        this.searchAll(searchProductConfig.taskList);

        // 右键菜单
        this.addContextMenu();
    },

    // 查询单个task
    searchOne: function (task) {

        if (task.run == "normal") { // 节点加载完成时执行
            this.searchOneWhenNormal(task, (object) => {
                if (object.flag) {
                    this._taskStatistic.successCount++;
                }
            });
        } else if (task.run = "active") {
            // 统计任务的错误数
            this._taskStatistic.errorCount++;
            // let lastDistance = $(window).scrollTop();
            // let nowDistance;
            // $(window).scroll(() => {
            //     nowDistance = $(window).scrollTop();
            //     if (Math.abs(lastDistance - nowDistance) > 30) {
            //         console.log(`active`);
            //         lastDistance = nowDistance;
            //         this.searchOneWhenActive(task, (object) => {
            //             if (object.flag) {
            //                 this._taskStatistic.successCount++;
            //             }
            //         });
            //     }
            // });
        } else {
            this._taskStatistic.errorCount++;
        }
    },
    searchOneWhenActive: function (task, callback) {

        // 初始化
        let idArray = $(`${task.id.selector}:not(.${config.errorClass}):not(.${config.successClass})`);
        let titleArray = $(`${task.title.selector}:not(.${config.errorClass}):not(.${config.successClass})`);
        let imageArray = $(`${task.image.selector}:not(.${config.errorClass}):not(.${config.successClass})`);

        // 验证选择器
        if (!(idArray.length == titleArray.length && idArray.length == imageArray.length)) {
            console.error(`id: ${idArray.length}, title: ${titleArray.length}, image: ${imageArray.length} 选择器错误!`);
            return;
        }

        // active task总数
        this._activeTaskStatistic.allCount += idArray.length;

        for (let i = 0; i < 10; ++i) {

            let id = !task.id.ruleArray ? $.trim($(idArray[i]).attr(task.id.attr)) : Util.match($.trim($(idArray[i]).attr(task.id.attr)), task.id.ruleArray);
            let title = $.trim($(titleArray[i]).text());

            let prodcut = new Product();
            prodcut.setId(id);
            prodcut.setTitle(title);

            // 查询优惠券
            prodcut.search(config.api.search.url, config.api.search.method, (result) => {

                if (result.flag) { //查询成功         
                    // 创建优惠券图标
                    let discountTag = Util.createElement(config.server.searchProduct.discountTag.element, config.server.searchProduct.discountTag.attr);
                    discountTag.text(result.data.resultInfo.coupon_info);
                    // 点击图标可直接跳转到领券页面
                    discountTag.attr('onclick', 'window.open("' + result.data.spreadUrl + '")');
                    $(imageArray[i]).append(discountTag);
                    // fixed
                    $(imageArray[i]).css('position', 'relative');
                    // 标识查询成功
                    $($(task.product.selector)[i]).addClass(config.successClass);
                    // 统计成功数
                    this._activeTaskStatistic.successCount++;
                } else {
                    // 标识查询失败
                    $($(task.product.selector)[i]).addClass(config.errorClass);
                    // 统计失败数
                    this._activeTaskStatistic.errorCount++;
                }
            });
        }

        // 回调函数
        let action = setInterval(() => {
            // 单个任务执行完毕
            if (this._activeTaskStatistic.isAll()) {
                clearInterval(action);
                callback({
                    flag: true,
                    statistic: this._activeTaskStatistic,
                    type: `active`
                });
            }
        }, 50);

    },
    searchOneWhenNormal: function (task, callback) {

        // 初始化
        let idArray = $(task.id.selector);
        let titleArray = $(task.title.selector);
        let imageArray = $(task.image.selector);

        // 验证选择器
        if (!(idArray.length == titleArray.length && idArray.length == imageArray.length)) {
            console.log(`id: ${idArray.length}, title: ${titleArray.length}, image: ${imageArray.length} 选择器错误!`);
            return;
        }

        // normal task总数
        this._normalTaskStatistic.allCount += idArray.length;

        for (let i = 0; i < idArray.length; ++i) {
            // 获取id, title
            let id = !task.id.ruleArray ? $.trim($(idArray[i]).attr(task.id.attr)) : Util.match($.trim($(idArray[i]).attr(task.id.attr)), task.id.ruleArray);
            let title = $.trim($(titleArray[i]).text());

            let prodcut = new Product();
            prodcut.setId(id);
            prodcut.setTitle(title);

            // 查询优惠券
            prodcut.search(config.api.search.url, config.api.search.method, (result) => {

                if (result.flag) { //查询成功         
                    // 创建优惠券图标
                    let discountTag = Util.createElement(config.server.searchProduct.discountTag.element, config.server.searchProduct.discountTag.attr);
                    discountTag.text(result.data.resultInfo.coupon_info);
                    // 点击图标可直接跳转到领券页面
                    discountTag.attr('onclick', 'window.open("' + result.data.spreadUrl + '")');
                    $(imageArray[i]).append(discountTag);
                    // fixed
                    task.image.attr ? $(imageArray[i]).attr(task.image.attr) : null;
                    // 标识查询成功
                    $($(task.product.selector)[i]).addClass(config.successClass);
                    // 统计成功数
                    this._normalTaskStatistic.successCount++;
                } else {
                    // 标识查询失败
                    $($(task.product.selector)[i]).addClass(config.errorClass);
                    // 统计失败数
                    this._normalTaskStatistic.errorCount++;
                }
                product = null;
            });
        }

        // 回调函数
        let action = setInterval(() => {
            // 单个任务执行完毕
            if (this._normalTaskStatistic.isAll()) {
                clearInterval(action);
                callback({
                    flag: true,
                    statistic: this._normalTaskStatistic,
                    type: `normal`
                });
            }
        }, 50);
    },
    searchAll: function (taskList) {

        // 正在搜券
        let info = iziToast.info({
            title: `skypesky`,
            message: config.server.searchProduct.message.search.loading,
            position: `bottomLeft`,
            timeout: false
        });

        for (let i = 0; i < taskList.length; ++i) {
            this.searchOne(taskList[i]);
        }

        // 任务总数统计
        this._taskStatistic.allCount = taskList.length;

        let action = setInterval(() => {
            if (this._taskStatistic.isAll()) {
                clearInterval(action);
                iziToast.destroy();
                iziToast.success({
                    message: `已找到${this._normalTaskStatistic.successCount}张商品优惠券`,
                    position: "bottomLeft"
                });
            }
        }, 50);


        // 用户翻页操作,执行搜券操作
        this.runWhenChangePage(taskList);
    },
    // 用户翻页操作,执行搜券操作
    runWhenChangePage: function (taskList) {

        // 最近的一次访问路径
        let lastUrl = window.location.href;
        // 实时路径
        let currentUrl;

        // 监听路径变化
        let action = setInterval(() => {
            // 路劲前后不一致,重新执行搜券操作
            if ((currentUrl = window.location.href) != lastUrl) {
                clearInterval(action);
                lastUrl = currentUrl;
                this.clearStatistic();
                this.searchAll(taskList);
            }
        }, 200);
    },
    clearStatistic: function () {
        this._taskStatistic.clear();
        this._normalTaskStatistic.clear();
        this._activeTaskStatistic.clear();
    },
    addContextMenu: function () {
        // 添加右键菜单    
        $.contextMenu({
            selector: 'body',
            callback: (key, options) => {
                if (key == "showDiscount") {
                    // 仅显示优惠券信息
                    iziToast.success({
                        message: config.server.searchProduct.message.contextMenu.showDiscount,
                        position: "bottomLeft"
                    });
                    $(`.${config.errorClass}`).addClass(config.hideClass);
                } else if (key == "showAll") {
                    iziToast.success({
                        message: config.server.searchProduct.message.contextMenu.showAll,
                        position: "bottomLeft"
                    });
                    $(`.${config.errorClass}`).removeClass(config.hideClass);
                } else if (key == "feedback") {
                    iziToast.error({
                        message: config.server.searchProduct.message.contextMenu.showFeedback,
                        position: "bottomLeft"
                    });
                } else {
                    console.log(config.server.searchProduct.message.contextMenu.showError);
                }
            },
            items: {
                "showDiscount": {
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
    }
};

const DetailServer = {
    run: function (productDetailConfig) {
        this.search(productDetailConfig);
    },
    search: function (productDetailConfig) {

        // 提取数据
        let url = window.location.href;
        let id = (url.match(/[&?]id=\d+[&]?/g) + "").match(/\d+/g) + "";
        let title = $.trim($(productDetailConfig.title.selector).text());

        let product = new Product();
        product.setId(id);
        product.setTitle(title);
        product.search(config.api.search.url,
            config.api.search.method,
            (result) => {

                // 创建button
                let discountButton = Util.createElement(config.server.productDetail.discountButton.element, config.server.productDetail.discountButton.attr);
                // 创建qrcode
                let qrcode = Util.createElement(config.server.productDetail.qrcode.element, config.server.productDetail.qrcode.attr);

                if (result.flag) { //查询成功
                    // 修改qrcode的链接信息
                    config.server.productDetail.qrcode.options.default.text = result.data.spreadUrl;
                    // 配置qrcode的信息
                    qrcode.qrcode(config.server.productDetail.qrcode.options.default);
                    // 显示优惠信息
                    discountButton.text(result.data.resultInfo.coupon_info);
                    // 点击图标可直接跳转到领券页面
                    discountButton.attr('onclick', 'window.open("' + result.data.spreadUrl + '")');

                } else { //查询失败
                    // 配置qrcode的信息
                    qrcode.qrcode(config.server.productDetail.qrcode.options.default);
                    discountButton.text("优惠券逃跑了*_*");
                    discountButton.removeAttr("onclick");
                }
                $('body').append(discountButton);
                $('body').append(qrcode);

                // 隐藏二维码的时机
                this.hideQrcodeAndDiscountButton();
            });
    },
    hideQrcodeAndDiscountButton() {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 1000) {
                // 隐藏优惠券和qrcode
                $(`#${config.server.productDetail.discountButton.attr.id}`).hide();
                $(`#${config.server.productDetail.qrcode.attr.id}`).hide();
            } else {
                $(`#${config.server.productDetail.discountButton.attr.id}`).show();
                $(`#${config.server.productDetail.qrcode.attr.id}`).show();
            }
        });
    }
};

// 商品对象
function Product() {
    this._id = null;
    this._title = null;
}

// 验证商品id
Product.prototype.checkId = function () {
    if (this._id == undefined || this._id.length <= 0) {
        return false;
    }
    return true;
};

// 验证商品title
Product.prototype.checkTitle = function () {
    if (this._title == undefined || this._title.length <= 0) {
        return false;
    }
    return true;
};

Product.prototype.setId = function (id = null) {
    this._id = id;
};

Product.prototype.setTitle = function (title = null) {
    this._title = title;
};

Product.prototype.getId = function () {
    return this._id;
};

Product.prototype.getTitle = function () {
    return this._title;
};

// 查询商品
Product.prototype.search = function (url, method = "post", callback) {
    if (!this.checkId() || !this.checkTitle()) {
        console.error(`url非法: ${url}`);
        return false;
    }
    $.ajax({
        url: url,
        method: method,
        data: {
            id: this._id,
            title: this._title
        },
        success: function (result) {
            callback(result);
        },
        error: (result) => {
            iziToast.error({
                message: config.errorMessage,
                position: "bottomLeft"
            });
        }
    });
};


// 统计数据
function Statistic() {
    this.successCount = 0;
    this.errorCount = 0;
    this.allCount = 0;
};
/*
 ** @desc: 清空统计数据
 ** @param:
 ** @return:
 */
Statistic.prototype.clear = function () {
    this.successCount = 0;
    this.errorCount = 0;
    this.allCount = 0;
};
/*
 ** @desc: 获取总的统计数
 ** @param:
 ** @return: 返回总的统计数
 */
Statistic.prototype.getAllCount = function () {
    return this.successCount + this.errorCount;
};

/*
 ** @desc: 获取成功率
 ** @param:
 ** @return: 返回统计的成功率,保留两位小数
 */
Statistic.prototype.getSuccessRate = function () {
    return (this.successCount / this.getAllCount()).toFixed(2);
};

Statistic.prototype.isAll = function () {
    return ((this.successCount + this.errorCount) == this.allCount);
}

const Util = {
    createElement: function (element = "<div></div>", attr = null) {
        return $(`<${element}></${element}>`).attr(attr);
    },
    show: function (condition, callback) {
        if (condition) {
            callback();
        }
    },
    // 该元素在窗口中可见吗?
    onScreen: function (element) {
        if (element.length <= 0) {
            return false;
        }
        let $window = $(window);
        if (element.offset().top <= $window.height() + $window.scrollTop() && element.offset().top + element.height() >= $window.scrollTop()) {
            return true;
        } else {
            return false;
        }
    },
    // 元素不可见或者已经查询过的元素,返回false,不再需要动态查询,否则返回true
    needActiveSearch(element) {
        return this.onScreen($($(element).not(`.${config.errorClass}`).not(`.${config.successClass}`)));
    },
    match: function (str, ruleArray) {
        let result = str;
        for (let i = 0; i < ruleArray.length; ++i) {
            result = result.match(ruleArray[i]) + "";
        }
        return result;
    }
};




$(function () {

    // 商品详情
    Controller.run(productDetailConfigList, function (websiteConfig) {
        DetailServer.run(websiteConfig);
    });

    $(window).load(function () {
        // 搜索程序    
        Controller.run(searchProductConfigList, function (websiteConfig) {
            SearchServer.run(websiteConfig);
        });
    });

});