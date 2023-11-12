// ==UserScript==
// @name         leetcode support
// @namespace    http://tampermonkey.net/
// @version      2021.12.07
// @description  leetcode自动生成markdown
// @author       skypesky
// @match        https://leetcode.cn/problems/*
// @match        https://github.com/skypesky/leetcode-for-javascript*
// @match        https://gitee.com/skypesky/leetcode-for-javascript*
// @match        https://leetcode-cn.com/problemset/all/*
// @connect      *
// @grant        GM_setClipboard
// @grant        GM_notification
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @resource     toastr https://cdn.bootcss.com/izitoast/1.3.0/css/iziToast.min.css
// @resource avImage https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-07-11%2F5b45a5573f014.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618121209&t=1d42fd336c77b50622ce8d819f89b99a
//
// @require      https://cdn.bootcss.com/izitoast/1.3.0/js/iziToast.min.js
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';

    window.onload = function () {

        ImportUtil.importCss(["toastr"]);
        View.init();

        console.log('onload running...');

        searchLeetcodeSingle();
        searchLeetcodeList();


        // 当在leetcode搜索题解时
        $(document).on('input', `input[class^="block"]`, () => {
            console.log('input running...');
            searchLeetcodeList();
        })


        // 点击leetcode标题,生成文件名
        $(document).on('click', `div.text-title-large`, function (event) {
            event.stopPropagation();

            GM_setClipboard(LeetcodeService.getMarkdownNFileName());
            GM_setValue(`leetcodeUrl`, window.location.href);

            notification(`文件名生成成功!`);
        });

        // 点击leetcode标题的下方,生成文档标题
        $(document).on('dblclick', `div[data-track-load="description_content"]`, function (event) {
            event.stopPropagation();

            const title = LeetcodeService.getTitle();
            const url = location.href;
            const text = `# [${title}](${url})`;

            GM_setClipboard(text);
            GM_setValue(`leetcodeUrl`, window.location.href);
            notification(`标题生成成功!`);
        });

        // 双击md文件的时候, 生成表格行
        $(document).on('dblclick', `[role="row"]`, function (event) {
            event.stopPropagation();

            const questionElement = $(this).find(`[role="rowheader"] a`);
            const question = questionElement.text().replace('.md', '');
            const readmeUrl = `https://github.com/${questionElement.attr('href')}`;
            const leetcodeUrl = GM_getValue('leetcodeUrl') || `leetcodeUrl`;
            const text = `| [${question}](${leetcodeUrl}) | [题解](${readmeUrl}) | | |`;

            GM_setClipboard(text);
            notification('Github复制成功');

            window.open('https://github.com/skypesky/leetcode-for-javascript/edit/master/README.md');
        });
    }

    class GithubService {

        async getGithubUrl(title) {
            return this.getGithubResponse().then(response => {
                const { responseText } = response,
                    aElement = $(responseText).find(`[title^="${title}"]`);

                if (!aElement.length) {
                    return {
                        title,
                        href: null,
                    }
                }
                return {
                    title,
                    href: `https://github.com${aElement.attr('href')}`
                };
            });
        }

        async getGithubUrls(titles) {

            return this.getGithubResponse().then(response => {

                const { responseText } = response;

                return titles.map(title => {
                    const aElement = $(responseText).find(`[title^="${title}"]`);
                    if (!aElement.length) {
                        return {
                            title,
                            href: null,
                        }
                    }
                    return {
                        title,
                        href: `https://github.com${aElement.attr('href')}`,
                    };
                });

            });

        }

        async getGithubResponse() {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: `https://github.com/skypesky/leetcode-for-javascript`,
                    onload: (response) => {
                        resolve(response);
                    },
                    onerror: (error) => {
                        console.error(error);
                        reject(error);
                    }
                })
            });
        }

    }


    class LeetcodeService {

        static titleSelector = `div.text-title-large a`;

        static getTitle() {
            return $(LeetcodeService.titleSelector).text();
        }

        static getMarkdownNFileName() {
            return `${LeetcodeService.getTitle()}.md`;
        }

    }

    class View {

        static CONTAINER_ID = `#diy-container`;

        static init() {
            View.addContainerElement().addFileNameElement().addMarkdownTitleElement();
        }

        static addContainerElement() {
            const target = $(`[data-cypress="QuestionTitle"]`);
            $('<div id="diy-container" style="width: 100%;height: 24px; padding: 4px 0px; border: 1px solid pink;"></div>').insertAfter(target);
            return this;
        }

        static addFileNameElement() {
            const target = $(View.CONTAINER_ID);
            $('<span id="file-name" style="margin-left: 16px;">生成文件名</span>').appendTo(target);
            return this;
        }

        static addMarkdownTitleElement() {
            const target = $(View.CONTAINER_ID);
            $('<span id="markdown-title" style="margin-left: 16px;">生成markdown标题</span>').appendTo(target);
            return this;
        }

        static addGithubTag(href) {
            const target = $(View.CONTAINER_ID);
            $(`<a id="github-tag" target="_blank" href="${href}" style="margin-left: 16px; color: rgb(90, 183, 38);">github 题解链接</a>`).appendTo(target);
            return this;
        }

        static addGithubNotSolution() {
            const target = $(View.CONTAINER_ID);
            $(`<a id="github-tag" target="_blank" href="https://github.com/skypesky/leetcode-for-javascript" style="margin-left: 16px; color: red">无题解</a>`).appendTo(target);
            return this;
        }

    }

    function notification(message) {
        ToastMessage.success({ message });
    }

    async function searchLeetcodeList() {
        const elements = Array.from($(`[class^="odd:bg-overlay-3"]`));

        if (!elements.length) {
            console.warn('searchLeetcodeList not work!');
            return;
        }

        const titles = elements.map(e => {
            return $(e).find('[class^="h-5"]').text();
        });
        const urls = await new GithubService().getGithubUrls(titles);

        console.log('titles', titles);
        console.log('urls', [...urls]);

        [...urls].forEach((url, i) => {
            const aElement = $(elements[i]).find('[class^="h-5"]');
            console.log(aElement);
            if (url.href) {
                aElement.attr('style', 'color: green;');
            } else {
                aElement.attr('style', 'color: red;');
            }
            aElement.attr('data-href', url.href);
        });


    }

    function searchLeetcodeSingle() {
        new GithubService().getGithubUrl(LeetcodeService.getTitle()).then(data => {
            if (data.href) {
                View.addGithubTag(data.href);
            } else {
                View.addGithubNotSolution();
            }
        }).catch(error => {
            console.error(error);
            View.addGithubNotSolution();
        });
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