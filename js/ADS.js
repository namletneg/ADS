/**
 * Created by Administrator on 2014/12/17.
 */
(function () {
    //ADS命名空间
    if (!window.ADS) {
        window['ADS'] = {};
    }

    // nodeType常量
    window['ADS']['node'] = {
        ELEMENT_NODE: 1,
        ATTRIBUTE_NODE: 2,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12
    };

    function isCompatible(other) {
        //使用能力检测来检查必要条件
        if (other === false || !Array.prototype.push || !Object.hasOwnProperty || !document.createElement || !document.getElementsByTagName) {
            return false;
        }
        return true;
    }

    window['ADS']['isCompatible'] = isCompatible;

    function $() {
        var elements = [],
            len = arguments.length,
            i, element;

        //查询作为参数提供的所有元素
        for (i = 0; i < len; i++) {
            element = arguments[i];
            //如果该参数是一个字符串那假设它是一个ID
            if (typeof element === 'string') {
                element = document.getElementById(element);
            }
            //如果只提供了一个参数
            //则立即返回这个元素
            if (len === 1) {
                return element;
            }
            //否则，将它添加到数组中
            elements.push(element);
        }
        //返回包含多个被请求元素的数组
        return elements;
    }

    window['ADS']['$'] = $;

    function exampleLibraryMethod(obj) {
        if (!(obj = $(obj))) return false;
    }

    window['ADS']['exampleLibraryMethod'] = exampleLibraryMethod;

    function addEvent(node, type, listener) {
        if (!isCompatible()) {
            return false;
        }
        if (!(node = $(node))) {
            return false;
        }
        if (node.addEventListener) {
            // W3C的方法
            node.addEventListener(type, listener, false);
            return true;
        } else if (node.attachEvent) {
            // IE
            node.attachEvent('on' + type, listener);
            return true;
        } else {
            node['on' + type] = listener;
            return true;
        }
    }

    window['ADS']['addEvent'] = addEvent;

    function removeEvent(node, type, listener) {
        if (!(node = $(node))) {
            return false;
        }
        if (node.removeEventListener) {
            node.removeEventListener(type, listener, false);
            return true
        } else if (node.detachEvent()) {
            // IE
            node.detachEvent('on' + type, listener);
            return true;
        } else {
            node['on' + type] = null;
            return true;
        }
    }

    window['ADS']['removeEvent'] = removeEvent;

    function getElementsByClassName(className, tag, parent) {
        var allTags,
            matchingElements = [],
            regex,
            element,
            i, len;

        parent = parent || document;
        tag = tag || '*';
        if (!(parent = $(parent))) {
            return false;
        }

        //查找所以匹配的标签
        allTags = (tag === '*' && parent.all) ? parent.all : parent.getElementsByTagName(tag);

        //创建一个正则表达式，来判断 className 是否正确
        className = className.replace(/\-/g, '\\-');
        regex = new RegExp('(^|\\s)' + className + '(\\s|$)');

        //检查每个元素
        for (i = 0, len = allTags.length; i < len; i++) {
            element = allTags[i];
            if (regex.test(element.className)) {
                matchingElements.push(element);
            }
        }
        //返回任何匹配的元素
        return matchingElements;
    }

    window['ADS']['getElementsByClassName'] = getElementsByClassName;

    function toggleDisplay(node, value) {
        if (!(node = $(node))) {
            return false;
        }

        if (node.style.display !== 'none') {
            node.style.display = 'none';
        } else {
            node.style.display = value || '';
        }
        return true;
    }

    window['ADS']['toggleDisplay'] = toggleDisplay;

    function insertAfter(node, referenceNode) {
        if (!(node = $(node))) {
            return false;
        }
        if (!(referenceNode = $(referenceNode))) {
            return false
        }
        if (referenceNode.nextSibling) {
            referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
        } else {
            referenceNode.parentNode.appendChild(node);
        }
        return node;
    }

    window['ADS']['insertAfter'] = insertAfter;

    function removeChildren(parent) {
        if (!(parent = $(parent))) {
            return false;
        }
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        return parent;
    }

    window['ADS']['removeChildren'] = removeChildren;

    function prependChild(parent, newChild) {
        if (!(parent = $(parent))) {
            return false;
        }
        if (!(newChild = $(newChild))) {
            return false;
        }
        if (parent.firstChild) {
            //存在子节点，则在该节点前插入
            parent.insertBefore(newChild, parent.firstChild);
        } else {
            //不存在子节点，则直接添加
            parent.appendChild(newChild);
        }
        return parent;
    }

    window['ADS']['prependChild'] = prependChild;

    // 修改作用域
    function bindFunction(obj, func) {
        return function () {
            func.apply(obj, arguments);
        };
    }

    window['ADS']['bindFunction'] = bindFunction;

    // 获取窗口的大小
    function getBrowserWindowSize() {
        var de = document.documentElement;
        return {
            width: window.innerWidth || (de && de.clientWidth) || document.body.clientWidth,
            height: window.innerHeight || (de && de.clientHeight) || document.body.clientHeight
        }
    }

    window['ADS']['getBrowserWindowSize'] = getBrowserWindowSize;

    // 迭代 DOM 树
    function walkElementsLinear(func, node) {
        var root = node || window.document,
            nodes = root.getElementsByTagName('*'),
            i, len;

        for (i = 0, len = nodes.length; i < len; i++) {
            func.call(nodes[i]);
        }
    }

    window['ADS']['walkElementsLinear'] = walkElementsLinear;

    // 递归遍历 DOM , depth、returnedFromParent 没完善
    function walkTheDOMRecursive(func, node, depth, returnedFromParent) {
        var root = node || window.document;

        returnedFromParent = func.call(root, depth++, returnedFromParent);
        node = root.firstChild;

        while (node) {
            walkTheDOMRecursive(func, node, depth, returnedFromParent);
            node = node.nextSibling;
        }
    }

    window['ADS']['walkTheDOMRecursive'] = walkTheDOMRecursive;

    // 递归遍历 DOM，查找每个节点的属性
    function walkTheDOMWithAttributes(node, func, depth, returnedFromParent) {
        var root = node || window.document,
            i, len,
            attributes;

        returnedFromParent = func(node, depth, returnedFromParent);


        if (root.attributes) {
            attributes = root.attributes;
            for (i = 0, len = attributes.length; i < len; i++) {
                walkTheDOMWithAttributes(attributes[i], func, depth - 1, returnedFromParent);
            }
        }
        if (root.nodeType !== ADS.node.ATTRIBUTE_NODE) {
            node = root.firstChild;
            while (node) {
                walkTheDOMWithAttributes(node, func, depth, returnedFromParent);
                node = node.nextSibling;
            }
        }
    }

    window['ADS']['walkTheDOMWithAttributes'] = walkTheDOMWithAttributes;

    // 将 word-word 转换成 wordWord 驼峰命名法
    function camelize(str) {
        return str.replace(/-(\w)/g, function (strMatch, p1) {
            return p1.toUpperCase();
        });
    }

    window['ADS']['camelize'] = camelize;

    // 是否嵌入图片前加载
    function addLoadEvent(loadEvent, waitForImages) {
        if (!isCompatible()) {
            return false;
        }
        // 为true，则使用常规的添加事件方法
        if (waitForImages) {
            return addEvent(window, 'load', loadEvent);
        }
        // 否则使用一些不同的方式包装loadEvent（）方法
        // 以便为this关键字指定正确的内容，
        // 同时确保事件不会被执行两次
        var init = function () {
            // 如果这个函数被调用了则返回
            if (arguments.callee.done) {
                return;
            }
            // 标记这个函数是否运行过
            arguments.callee.done = true;
            // 在document的环境中运行加载事件
            loadEvent.apply(document, arguments);
        };

        // 为DOMContentLoaded注册事件侦听器
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', init, false);
        } else if (/WebKit/i.test(navigator.userAgent)) {
            // 对Safari, 使用setInterval() 函数检测document是否载入完成
            var _timer = setInterval(function () {
                if (/loaded|complete/.test(document.readyState)) {
                    clearInterval(_timer);
                    init();
                }
            }, 10);
        } else {
            // 对IE 附加一个在加载过程最后执行的脚本，
            // 并检测该脚本是否载入完成
            document.write('<script id="__ie_onload" defer></script>');
            var script = document.getElementById('__ie_onload');
            script.onreadystatechange = function () {
                if (this.readyState === 'complete') {
                    init();
                }
            };
        }
        return true;
    }

    window['ADS']['addLoadEvent'] = addLoadEvent;

    // 阻止事件冒泡
    function stopPropagation(event) {
        event = event || window.event;
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

    window['ADS']['stopPropagation'] = stopPropagation;

    // 取消默认行为
    function preventDefault(event) {
        event = event || window.event;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }

    window['ADS']['preventDefault'] = preventDefault;

    // 访问事件对象
    function getEventObject(event) {
        return event || window.event;
    }

    window['ADS']['getEventObject'] = getEventObject;

    // 兼容 target
    function getTarget(event) {
        event = getEventObject(event);

        // W3C 或 MSIE 的模型
        var target = event.target || event.srcElement;

        // 如果像Safari中一样是一个文本节点
        // 重新将目标对象指定为父元素
        if (target.nodeType === ADS.node.TEXT_NODE) {
            target = node.parentNode;
        }
        return target;
    }

    window['ADS']['getTarget'] = getTarget;

    // Error
    // 获取鼠标按下的键值
    function getMouseButton(event) {
        event = getEventObject(event);

        var buttons = {
            left: false,
            middle: false,
            right: false
        };

        // 检查event对象的toString()方法的值，
        // event.toString() 返回 ‘[object MouseEvent]’
        // W3C DOM对象有toString()方法，IE8以下没有
        if (event.toString && event.toString().indexOf('MouseEvent') !== -1) {
            // W3C方法
            switch (event.button) {
                case 0:
                    buttons.left = true;
                    break;
                case 1:
                    buttons.middle = true;
                    break;
                case 2:
                    buttons.right = true;
                    break;
                default:
                    break;

            }
        } else if (event.button) {
            // MSIE方法
            switch (event.button) {
                case 1:
                    buttons.left = true;
                    break;
                case 2:
                    buttons.right = true;
                    break;
                case 3:
                    buttons.left = true;
                    buttons.right = true;
                    break;
                case 4:
                    buttons.middle = true;
                    break;
                case 5:
                    buttons.left = true;
                    buttons.middle = true;
                    break;
                case 6:
                    buttons.middle = true;
                    buttons.right = true;
                    break;
                case 7:
                    buttons.left = true;
                    buttons.middle = true;
                    buttons.right = true;
                    break;
                default:
                    break;
            }
        } else {
            return false;
        }
        return buttons;
    }

    window['ADS']['getMouseButton'] = getMouseButton;

    // 获取鼠标相对于文档的位置
    function getPointerPositionInDocument(event) {
        event = getEventObject(event);

        var x = event.pageX || (event.clientX + document.documentElement.scrollLeft || document.body.scrollLeft),
            y = event.pageY || (event.clientY + document.documentElement.scrollTop || document.body.scrollTop);

        return {
            'x': x,
            'y': y
        };
    }

    window['ADS']['getPointerPositionInDocument'] = getPointerPositionInDocument;

    // 获取 键/码表
    function getKeyPressed(event) {
        event = getEventObject(event);

        var code = event.keyCode,
            value = String.fromCharCode(code);

        return {
            code: code,
            value: value
        };
    }

    window['ADS']['getKeyPressed'] = getKeyPressed;

    // 通过ID修改单个元素的样式
    function setStyleById(element, styles) {

        if (!(element = $(element))) {
            return false;
        }
        for (var key in styles) {
            if (!styles.hasOwnProperty(key)) {
                continue;
            }
            if (element.style.setProperty) {
                // DOM2 样式规范方法
                element.style.setProperty(key, styles[key]);
            } else {
                // 备用方法 IE
                element.style[camelize(key)] = styles[key];
            }
        }
        return true;
    }

    window['ADS']['setStyleById'] = setStyleById;

    // 通过className修改多个元素的样式
    function setStylesByClassName(parent, tag, className, styles) {
        var elements, i, len;

        if (!(parent = $(parent))) {
            return false;
        }
        elements = getElementsByClassName(className, tag, parent);
        for (i = 0, len = elements.length; i < len; i++) {
            setStyleById(elements[i], styles);
        }
        return true;
    }

    window['ADS']['setStylesByClassName'] = setStylesByClassName;


    // 通过tagName修改多个元素的样式
    function setStylesByTagName(tagName, styles, parent) {
        var elements, i, len;

        parent = $(parent) || document;
        elements = parent.getElementsByTagName(tagName);
        for (i = 0, len = elements.length; i < len; i++) {
            setStyleById(elements[i], styles);
        }
        return true;
    }

    window['ADS']['setStylesByTagName'] = setStylesByTagName;

    // 获取包含元素 className 的数组
    function getClassNames(element) {
        if (!(element = $(element))) {
            return false;
        }
        // 用一个空格替换多个空格
        //  基于空格分割类名
        return element.className.replace(/\s+/g, ' ').split(' ');
    }

    window['ADS']['getClassNames'] = getClassNames;

    // 检查是否存在 className
    function hasClassName(element, className) {
        if (!(element = $(element))) {
            return false;
        }
        return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
    }

    window['ADS']['hasClassName'] = hasClassName;

    // 添加 className
    function addClassName(element, className) {
        if (!(element = $(element))) {
            return false;
        }
        if (!hasClassName(element, className)) {
            element.className += (element.className ? ' ' : '') + className;
            return true;
        }
        return false;
    }

    window['ADS']['addClassName'] = addClassName;

    // 删除 className
    function removeClassName(element, className) {
        if (!(element = $(element))) {
            return false;
        }
        if (hasClassName(element, className)) {
            element.className = element.className.replace(new RegExp("(\\s|^)" + className + "(\\s|$)"), " ");
            return true;
        }
        return false;
    }

    window['ADS']['removeClassName'] = removeClassName;

    // 切换 className
    function toggleClassName(element, className) {
        if (!(element = $(element))) {
            return false;
        }
        if (hasClassName(element, className)) {
            removeClassName(element, className);
        } else {
            addClassName(element, className);
        }
    }

    window['ADS']['toggleClassName'] = toggleClassName;

    // 获取样式表
    function getStyleSheets(url, media) {
        var styleSheets = document.styleSheets,
            sheets = [],
            sheetsMedia,
            i, len;

        for (i = 0, len = styleSheets.length; i < len; i++) {
            if (url && styleSheets[i].href.indexOf(url) === -1) {
                continue;
            }
            if (media) {
                // 规范化 media字符串
                media = media.replace(/,\s*/g, ',');
                if (typeof styleSheets[i].media.mediaText !== 'undefined') {   // 防止 mediaText 为空，用 undefined判断
                    // DOM方法
                    sheetsMedia = styleSheets[i].media.mediaText.replace(/,\s*/g, ',');
                    // Safari 会添加额外的逗号和空格
                    sheetsMedia = sheetsMedia.replace(/,\s*$/, '');
                } else {
                    // MSIE 方法
                    sheetsMedia = styleSheets[i].media.replace(/,\s*/g, ',');
                }
                // 如果Media不匹配跳过
                if (media !== sheetsMedia) {
                    continue;
                }
            }
            sheets.push(styleSheets[i]);
        }
        return sheets;
    }

    window['ADS']['getStyleSheets'] = getStyleSheets;

    // 添加新样式表
    function addStyleSheet(url, media) {
        var link;
        media = media || 'screen';
        link = document.createElement('link');
        link.setAttribute('rel', 'stylesheets');
        link.setAttribute('type', 'text/css');
        link.setAttribute('url', url);
        link.setAttribute('media', media);
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    window['ADS']['addStyleSheet'] = addStyleSheet;

    // 删除样式表
    function removeStyleSheet(url, media) {
        var sheets = getStyleSheets(url, media),
            i, len, node;

        for (i = 0, len = sheets.length; i < len; i++) {
            node = sheets[i].ownerNode || sheets[i].owningElement;
            sheets[i].disabled = true;
            node.parentNode.removeChild(node);
        }
    }

    window['ADS']['removeStyleSheet'] = removeStyleSheet;

    // 编辑一条样式规则
    function editCSSRule(selector, styles, url, media) {
        var styleSheets = (typeof url === 'object' ? url : getStyleSheets(url, media)),
            rules,
            i, len, j, key;

        for (i = 0, len = styleSheets.length; i < len; i++) {
            // 取规则列表
            // DOM2样式是 styleSheets[i].cssRules
            // MSIE方法是 styleSheets[i].rules
            rules = styleSheets[i].cssRules || styleSheets[i].rules;
            if (!rules) {
                continue;
            }

            // 转换大写形式
            selector = selector.toUpperCase();

            for (j = 0; j < rules.length; j++) {
                // 检查是否匹配
                if (rules[i].selectorText.toUpperCase() == selector) {
                    for (key in styles) {
                        if (!styles.hasOwnProperty(key)) {
                            continue;
                        }
                        // 设置新的样式属性
                        rules[j].style[camelize(key)] = styles[key];
                    }
                }
            }
        }
    }

    window['ADS']['editCSSRule'] = editCSSRule;

    // 添加一条样式规则
    function addCSSRule(selector, styles, index, url, media) {
        var styleSheets,
            str = '',
            newIndex,
            key, i, len;

        for (key in styles) {
            if (!styles.hasOwnProperty(key)) {
                continue;
            }
            str += key + ':' + styles[key] + ';';
        }

        styleSheets = (typeof url === 'object' ? url : getStyleSheets(url, media));

        for (i = 0, len = styleSheets.length; i < len; i++) {
            // 添加规则
            if (styleSheets[i].insertRule) {
                // DOM2 样式规则的方法
                newIndex = (index >= 0 ? index : styleSheets[i].cssRules.length);
                styleSheets[i].insertRule(selector + '{' + str + '}', newIndex);
            } else if (styleSheets[i].addRule) {
                // MSIE 的方法
                // index = -1 是列表的末尾
                newIndex = (index >= 0 ? index : -1);
                styleSheets[i].addRule(selector, str, newIndex);
            }
        }
    }

    window['ADS']['addCSSRule'] = addCSSRule;

    // 访问元素的样式
    function getStyle(element, property) {
        var value, css;

        if (!(element = $(element)) || !property) {
            return false;
        }

        value = element.style[camelize(property)];
        if (!value) {
            // 取得计算的样式值
            if (document.defaultView && document.defaultView.getComputedStyle) {
                // DOM 方法
                css = document.defaultView.getComputedStyle(element, null);
                value = css ? css.getPropertyValue(property) : null;
            } else if (element.currentStyle) {
                // MSIE 方法
                value = element.currentStyle[camelize(property)];
            }
        }

        // 返回空字符串而不是auto
        return value === 'auto' ? '' : value;
    }

    window['ADS']['getStyle'] = getStyle;


    // 公共方法
    // 解析JSON文本
    // 生成一个对象或数组
    function parseJSON(s, filter) {
        var j,
            walk = function (k, v) {
                var key;
                if (v && typeof v === 'object') {
                    for (key in v) {
                        if (v.hasOwnProperty(key)) {
                            v[key] = walk(key, v[key]);
                        }
                    }
                }
                return filter(k, v);
            };

        if (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(s)) {
            try {
                j = eval('(' + s + ')');
            } catch (e) {
                throw new SyntaxError('parseJSON');
            }
        } else {
            throw new SyntaxError('parseJSON');
        }

        if (typeof filter === 'function') {
            j = walk('', j);
        }
        return j;
    }

    // 设置 XMLHttpRequest 对象的各个不同的部分
    // jsResponseListener 请求到的字符串参数，需要 eval()执行；
    function getRequestObject(url, options) {
        var req = false;

        if (XMLHttpRequest) {
            req = new XMLHttpRequest();
        } else if (ActiveXObject) {
            req = new ActiveXObject('Microsoft.XMLHTTP');
        }
        if (!req) {
            return false;
        }

        // 定义默认的选项
        options = options || {};
        options.method = options.method || 'GET';
        options.send = options.send || null;

        // 为请求的每个阶段定义不同的监听器
        req.onreadystatechange = function () {
            switch (req.readyState) {
                case 1:
                    // 载入中
                    if (options.loadListener) {
                        options.loadListener.apply(req, arguments);
                    }
                    break;
                case 2:
                    // 载入完成
                    if (options.loadedListener) {
                        options.loadedListener.apply(req, arguments);
                    }
                    break;
                case 3:
                    // 交互
                    if (options.interactiveListener) {
                        options.interactiveListener.apply(req, arguments);
                    }
                    break;
                case 4:
                    // 完成
                    // 如果失败则抛出错误
                    try {
                        if (req.status && req.status == 200) {
                            var contentType = req.getResponseHeader('Content-Type'),
                            // 头部包含其他字符集，提取所需部分
                                mimeType = contentType.match(/\s*([^;]+)\s*(;|$)/i)[1];

                            switch (mimeType) {
                                case 'text/javascript':
                                case 'application/javascript':
                                    // 响应是JavaScript,
                                    // req.responseText作为回调的参数
                                    if (options.jsResponseListener) {
                                        options.jsResponseListener.call(req, req.responseText);
                                    }
                                    break;
                                case 'application/json':
                                    // 响应是JSON，因此需要用匿名函数对 req.responseText 进行解析
                                    // 以返回作为回调函数的JSON对象
                                    if (options.jsonResponseListener) {
                                        var json;
                                        try {
                                            json = parseJSON(req.responseText);
                                        } catch (e) {
                                            json = false;
                                        }
                                        options.jsonResponseListener.call(req, json);
                                    }
                                    break;
                                case 'text/xml':
                                case 'application/xml':
                                case 'application/xhtml+xml':
                                    // 响应是xml,
                                    // req.responseText作为回调的参数
                                    if (options.xmlResponseListener) {
                                        options.xmlResponseListener.call(req, req.responseXML);
                                        break;
                                    }
                                    break;
                                case 'text/html':
                                    if (options.htmlResponseListener) {
                                        options.htmlResponseListener.call(req, req.responseText);
                                    }
                                    break;
                            }

                            // 针对响应成功完成的侦听器
                            if (options.completeListener) {
                                // this 指向 req
                                options.completeListener.apply(req, arguments);
                            }
                        } else {
                            if (options.errorListener) {
                                options.errorListener.apply(req, arguments);
                            }
                        }
                    } catch (e) {
                        // 忽略错误
                    }
                    break;
            }
        };
        // 开启请求
        req.open(options.method, url, true);
        req.setRequestHeader('X-ADS-Ajax-Request', 'AjaxRequest');
        return req;
    }

    window['ADS']['getRequestObject'] = getRequestObject;

    // 封装 ajax 请求
    function ajaxRequest(url, options) {
        var req = getRequestObject(url, options);

        return req.send(options.send);
    }

    window['ADS']['ajaxRequest'] = ajaxRequest;

    /* 跨域请求数据 */
    var // XssHttpRequest 对象的计数器
        XssHttpRequestCount = 0,
        XssHttpRequest = function () {
            this.requestID = 'XSS_HTTP_REQUEST_' + (++XssHttpRequestCount);
        };
    XssHttpRequest.prototype = {
        constructor: XssHttpRequest,
        url: null,
        scriptObject: null,
        responseJSON: null,
        // status: 1 成功，2 失败
        status: 0,
        readyState: 0,
        timeout: 30000,
        onreadystatechange: function () {
        },
        setReadyState: function (newReadyState) {
            // 如果比当前状态更新
            // 则只更新就绪状态
            if (this.readyState < newReadyState || newReadyState === 0) {
                this.readyState = newReadyState;
                this.onreadystatechange();
            }
        },
        open: function (url, timeout) {
            this.timeout = timeout || this.timeout;
            // 给url添加参数 'XSS_HTTP_REQUEST_CALLBACK'
            this.url = url + ((url.indexOf('?') !== -1) ? '&' : '?') + 'XSS_HTTP_REQUEST_CALLBACK=' + this.requestID + '_CALLBACK';
            this.setReadyState(0);
        },
        send: function () {
            var requestObject = this,
                timeoutWatcher;

            // 创建一个载入外部数据的新script对象
            requestObject.scriptObject = document.createElement('script');
            requestObject.scriptObject.setAttribute('id', requestObject.requestID);
            requestObject.scriptObject.setAttribute('type', 'text/javascript');
            // 尚未设置scr属性

            // 超时后设置
            timeoutWatcher = setTimeout(function () {
                // 在window设置回调函数为空方法
                window[requestObject.requestID + '_CALLBACK'] = function () {
                };

                // 移除脚本以防止进一步载入
                requestObject.scriptObject.parentNode.removeChild(requestObject.scriptObject);
                // 将状态设置为错误
                requestObject.status = 2;
                requestObject.statusText = 'Timeout after' + requestObject.timeout + 'milliseconds';

                // 更新就绪状态
                requestObject.setReadyState(2);
                requestObject.setReadyState(3);
                requestObject.setReadyState(4);
            }, requestObject.timeout);

            // 设置回调函数
            window[requestObject.requestID + '_CALLBACK'] = function (JSON) {
                clearTimeout(timeoutWatcher);

                // 更新就绪状态
                requestObject.setReadyState(2);
                requestObject.setReadyState(3);

                // 将状态设置为成功
                requestObject.responseJSON = JSON;
                requestObject.status = 1;
                requestObject.statusText = 'Loaded.';

                // 更新就绪状态
                requestObject.setReadyState(4);
            };

            // 设置初始就绪状态
            requestObject.setReadyState(1);

            // 设置src属性
            requestObject.scriptObject.setAttribute('scr', requestObject.url);
            document.getElementsByTagName('body')[0].appendChild(requestObject.scriptObject);
        }
    };

    window['ADS']['XssHttpRequest'] = XssHttpRequest;

    // 设置 XssHttpRequest对象的不同部分
    function getXssRequestObject(url, options) {
        var req = new XssHttpRequest();

        options = options || {};
        // 默认超时时间为 30s
        options.timeout = options.timeout || 30000;

        req.onreadystatechange = function () {
            switch (req.readyState) {
                case 1:
                    // 载入中
                    if (options.loadListener) {
                        options.loadListener.apply(req, arguments);
                    }
                    break;
                case 2:
                    // 载入完成
                    if (options.loadedListener) {
                        options.loadedListener.apply(req, arguments);
                    }
                    break;
                case 3:
                    // 交互
                    if (options.interactiveListener) {
                        options.interactiveListener.apply(req, arguments);
                    }
                    break;
                case 4:
                    // 完成
                    if (req.status === 1) {
                        if (options.completeListener) {
                            options.completeListener.apply(req, arguments);
                        }
                    } else {
                        if (options.errorListener) {
                            options.errorListener.apply(req, arguments);
                        }
                    }
                    break;
            }
        };
        req.open(url, options.timeout);
        return req;
    }

    window['ADS']['getXssRequestObject'] = getXssRequestObject;

    // 发送 XssHttpRequest请求
    function xssRequest(url, options) {
        var req = getXssRequestObject(url, options);
        return req.send(null);
    }

    // error
    window['ADS']['xssRequest'] = xssRequest;


    /* 解决 ajax 后退annual和标签问题 */
    // 生成回调函数的一个辅助方法
    function makeCallback(method, target) {
        return function () {
            method.apply(target, arguments);
        }
    }

    // 一个用来基于 hash 触发注册的方法的URL hash 侦听器
    var actionPager = {
        // 前一个 hash
        lastHash: '',
        // 为 hash模式注册的方法列表
        callbacks: [],
        // Safari历史记录列表
        safariHistory: false,
        // 对为IE准备的 iframe 的引用
        msieHistory: false,
        // 应该被转换的链接的类名
        ajaxifyClassName: '',
        // 应用程序的根目录。当创建 hash 时，它将是被清理后的URL
        ajaxifyRoot: '',

        init: function (ajaxfyClass, ajaxifyRoot, startingHash) {
            this.ajaxifyClassName = ajaxfyClass || 'ADSActonLink';
            this.ajaxifyRoot = ajaxifyRoot || '';

            if (/Safari/i.test(navigator.userAgent)) {
                this.safariHistory = [];
            } else if (/MSIE/i.test(navigator.userAgent)) {
                // 如果是 MSIE ，添加一个 iframe 以便跟踪重写（override）后退按钮
                this.msieHistory = document.createElement('iframe');
                this.msieHistory.setAttribute('id', 'msieHistory');
                this.msieHistory.setAttribute('name', 'msieHistory');
                setStyleById(this.msieHistory, {
                    'width': '100px',
                    'height': '100px',
                    'border': '1px solid black',
                    'visibility': 'visible',
                    'zIndex': '-1'
                });
                document.body.appendChild(this.msieHistory);
                this.msieHistory = frames['msieHistory'];
            }

            // 将链接转换为 Ajax 链接
            this.ajaxifyLinks();
            // 取得当前的地址
            var location = this.getLocation();
            // 检查地址中是否包含hash（来自书签）
            // 或者是否已经提供了 hash
            if (!location.hash && !startingHash) {
                startingHash = 'start';
            }

            // 按照需要保存 hash
            var ajaxHash = this.getHashFromURL(location.hash) || startingHash;
            this.addBackButtonHash(ajaxHash);

            // 添加监视时间以观察地址栏中的变化
            var watcherCallback = makeCallback(this.watchLocationForChange, this);
            window.setInterval(watcherCallback, 200);
        },
        ajaxifyLinks: function () {
            // 将链接转换为锚以便 Ajax 进行处理
            var links = getElementsByClassName(this.ajaxifyClassName, 'a', document);

            for (var i = 0, len = links.length; i < len; i++) {
                if (hasClassName(links[i], 'ADSActionPagerModified')) {
                    continue;
                }
                // 将 href 属性转换为 #value 形式
                links[i].setAttribute('href', this.convertURLToHash(links.getAttribute('href')));
                addClassName(links[i], 'ADSActionPagerModified');

                // 注册单击事件以便在必要时添加历史记录
                addEvent(links[i], 'click', function () {
                    if (this.href && this.href.indexOf('#') > -1) {
                        actionPager.addBackButtonHash(actionPager.getHashFromURL(this.href));
                    }
                })
            }
        },
        addBackButtonHash: function (ajaxHash) {
            // 保存 hash
            if (!ajaxHash) {
                return false;
            }
            if (this.safariHistory !== false) {
                // 为 Safari 使用特殊数组
                if (this.safariHistory.length == 0) {
                    this.safariHistory[window.history.length] = ajaxHash;
                } else {
                    this.safariHistory[window.history.length + 1] = ajaxHash;
                }
                return true;
            } else if (this.msieHistory !== false) {
                // 在MISIE中通过导航iframe
                this.msieHistory.document.execCommand('Stop');
                this.msieHistory.location.href = '/fakepage?hash=' + ajaxHash + '&title=' + document.title;
                return true;
            } else {
                // 通过改变地址的值
                // 使用 makeCallback 包装函数
                // 以便在超时方法内部使 this， 引用actionPager
                var timeoutCallback = makeCallback(function () {
                    if (this.getHashFromURL(window.location.href) != ajaxHash) {
                        window.location.replace(location.href + '#' + ajaxHash);
                    }
                }, this);
                setTimeout(timeoutCallback, 200);
                return true;
            }
            return false;
        },
        watchLocationForChange: function () {
            var newHash;
            // 取得新的hash值
            if (this.safariHistory !== false) {
                // 在safari中从历史记录数组中取得
                if (this.safariHistory[history.length]) {
                    newHash = this.safariHistory[history.length];
                }
            } else if (this.msieHistory !== false) {
                // 在MSIE中从 iframe 的地址中取得
                newHash = this.msieHistory.location.href.split('&')[0].split('=')[1];
            } else if (location.hash != '') {
                // 对其他浏览器从 window.location 中取得
                newHash = this.getHashFromURL(window.location.href);
            }

            // 如果新 hash 与最后一次的 hash 不同，则更新页面
            if (newHash && newHash != this.lastHash) {
                if (this.msieHistory !== false && this.getHashFromURL(window.location.href) != newHash) {
                    // 修复MSIE 中的地址栏
                    // 以便能适当地加上标签（或加入收藏夹）
                    location.hash = newHash;
                }

                // 在发生异常的情况下使用 try/catch
                // 结构尝试执行任何注册的侦听器
                try {
                    this.executeListeners(newHash);
                    // 在通过处理程序添加任何新链接的情况下进行更新
                    this.ajaxifyLinks();
                } catch (e) {
                    // 这里讲捕获到回调函数的任何异常
                    alert(e);
                }

                // 将其保存为最后一个hash
                this.lastHash = newHash;
            }
        },
        register: function (regex, method, context) {
            var obj = {
                'regex': regex
            };

            if (context) {
                // 一个已经指定的环境
                obj.callback = function (matches) {
                    method.apply(context, matches);
                };
            } else {
                // 以window作为环境
                obj.callback = function (matches) {
                    method.apply(window, matches);
                };
            }

            // 将侦听器添加到回调函数数组中
            this.callbacks.push(obj);
        },
        convertURLToHash: function (url) {
            if (!url) {
                // 没有url ，因而返回一个 '#'
                return '#';
            } else if (url.indexOf('#') != -1) {
                // 存在hash
                return url.split('#')[1];
            } else {
                // 如果 URL 中包含域名（MSIE）则去掉它
                if(url.indexOf('://') != -1){
                    url = url.match(/:\/\/[^\/]+(.*)/)[1];
                }
                // 按照init() 中的约定去掉跟目录
                return '#' + url.substr(this.ajaxifyRoot.length);
            }
        },
        getHashFromURL: function(url){
            if(!url || url.indexOf('#') == -1){
                return '';
            }
            return url.split('#')[1];
        },
        getLocation: function () {
            var url, parts,
                href = window.location.href;
            // 检查 hash
            if(!window.location.hash){
                // 没有则生成一个
                url = {
                    host: null,
                    hash: null
                };

                if(href.indexOf('#') > -1){
                    parts = href.split('#')[1];
                    url.domain = parts[0];
                    url.hash = parts[1];
                } else {
                    url.domain = window.location;
                }
                return url;
            }
            return window.location;
        },
        executeListeners: function (hash) {
            var matches;
            // 执行与 hash 匹配的任何侦听器
            for(var i in this.callbacks){
                if(matches = hash.match(this.callbacks[i].regex)){
                    this.callbacks[i].callback(matches);
                }
            }
        }
    };

    window['ADS']['actionPager'] = actionPager;


    /* ajax 排队请求 */
    // 复制对象
    function clone(myObj){
        var myNewObj;

        if(typeof myObj !== 'object' || myObj === null){
            return myObj;
        }

        myNewObj = new Object();
        for(var i in myObj){
            myNewObj[i] = clone(myObj[i]);
        }
        return myNewObj;
    }

    // 用于保存队列的数组
    var requestQueue = [];

    // 为使 ADS.ajaxRequest 方法启用排队功能的包装对象
    function ajaxRequestQueue(url, options, queue){
        queue = queue || 'default';

        // 这个对象将把可选的侦听器包装在另一个函数中
        // 因此，可选的对象必须是唯一的。否则，如果该方法被调用时
        // 使用的是共享的可选对象，那么会导致陷入递归中
        options = clone(options) || {};
        if(!requestQueue[queue]){
            requestQueue[queue] = [];
        }

        // 当前一次请求完成是，需哟使用 completeListener
        // 调用队列中的下一次请求。如果完成侦听器已经有定义，那么需要首先调用它

        // 取得旧的侦听器
        var userCompleteListener = options.completeListener;
        // 添加新侦听器
        options.completeListener = function(){
            // 如果存在旧的侦听器则首先调用它
            if(userCompleteListener){
                // this 引用的是请求对象
                userCompleteListener.apply(this, arguments);
            }

            // 从队列中移除这个请求
            requestQueue[queue].shift();

            // 调用队列中的下一项
            if(requestQueue[queue][0]){
                // 请求保存在 req 属性中，但为防止它是一个POST请求，故也需包含send 选项
                var q= requestQueue[queue][0].req.send(requestQueue[queue][0].send);
            }
        };

        // 如果发生了错误，应该通过调用相应的错误处理方法取消队列中的其他请求

        // 取得旧侦听器
        var userErrorListener = options.errorListener;
        // 添加新侦听器
        options.errorListener = function () {
            if(userErrorListener){
                userErrorListener.apply(this, arguments);
            }

            // 由于已经调用了错误侦听器，故从队列中移除这个请求
            requestQueue[queue].shift();

            // 由于出错需要取消队列中的其余请求，但首先要调用每一个请求的 errorListener。
            // 通过调用队列中下一项的错误侦听器就会清除所以排队的请求，
            // 因为在链中的调用是依次发生的

            // 检测队列中是否还存在请求
            if(requestQueue[queue].length){
                // 取得下一项
                var q = requestQueue[queue].shift();

                // 中断请求
                q.req.abort();

                // 伪造请求对象，以便 errorListener 认为请求已经完成并相应地运行
                var fakeRequest = new Object();

                // 将 status设置为0，将 readyState 设置为4
                // 就好像请求虽然完成但却失败了一样
                fakeRequest.status = 0;
                fakeRequest.readyState = 4;

                fakeRequest.responseText = null;
                fakeRequest.responseXML = null;

                // 设置错误信息，以便需要是提示
                fakeRequest.statesText = '队列中的请求接受失败';

                // 调用状态改变，如果readyState是4，而 status不是200，则会调用errorListener
                q.error.apply(fakeRequest);
            }
        };

        // 将这个请求添加到队列中
        requestQueue[queue].push({
            req: getRequestObject(url, options),
            send: options.send,
            error: options.errorListener
        });

        // 如果队列的长度表明只有一个项（即第一个）则调用请求
        if(requestQueue[queue].length === 1){
            ajaxRequest(url, options);
        }
    }

    window['ADS']['ajaxRequestQueue'] = ajaxRequestQueue;




})();

// 给 String 对象的原型增加新方法
//-------------------------------------
// 重复一个字符串
if (!String.repeat) {
    String.prototype.repeat = function (num) {
        return new Array(num + 1).join(this);
    }
}

//  清除结尾和开头处的空白符

if (!String.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}






























