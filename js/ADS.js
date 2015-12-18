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
    // 生成一个对象或数字
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
                                        } catch(e){
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
                                    if(options.xmlResponseListener){
                                        options.xmlResponseListener.call(req, req.responseXML);
                                        break;
                                    }
                                    break;
                                case 'text/html':
                                    if(options.htmlResponseListener){
                                        options.htmlResponseListener.call(req, req.responseText);
                                    }
                                    break;
                            }

                            // 针对响应成功完成的侦听器
                            if(options.completeListener){
                                options.completeListener.apply(req, arguments);
                            }
                        } else{
                            if(options.errorListener){
                                options.errorListener.apply(req, arguments);
                            }
                        }
                    } catch(e){
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
    function ajaxRequest(url, options){
        var req = getRequestObject(url, options);

        return req.send(options.send);
    }

    window['ADS']['ajaxRequest'] = ajaxRequest;

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






























