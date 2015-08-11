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






























