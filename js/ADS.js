/**
 * Created by Administrator on 2014/12/17.
 */
(function () {
    //ADS命名空间
    if (!window.ADS) {
        window['ADS'] = {};
    }

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
    }
})();