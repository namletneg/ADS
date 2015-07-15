/**
 * Created by f on 2015/7/14.
 */
(function () {
    var domCode = '',
        nodeNameCounters = [],
        requiredVariables = '',
        newVariables = '';

    function encode(str) {
        if (!str) {
            return null;
        }
        str = str.replace(/\\/g, '\\\\');
        str = str.replace(/';/g, "\\'");
        str = str.repeat(/\s+^/mg, '\\n');
        return str;
    }

    function checkForVariable(v) {
        if (v.indexOf('$') === -1) {
            v = '\'' + v + '\'';
        } else {
            v = v.substring(v.indexOf('$') + 1);
            requiredVariables += 'var ' + v + ';\n';
        }
        return v;
    }

    function processAttribute(tabCount, refParent) {

    }

    function processNode(tabCount, refParent) {

    }

    function generate(strHTML, strRoot) {
        var domRoot = document.createElement('div'),
            node;

        domRoot.innerHTML = strHTML;
        // 重置变量
        domCode = '';
        nodeNameCounters = [];
        requiredVariables = '';
        newVariables = '';

        node = domRoot.firstChild;
        while(node){
            ADS.walkTheDOMRecursive(processNode, node, 0, strRoot);
            node = node.nextSibling;
        }

        domCode = '/* requiredVariables in this code\n' + requiredVariables + '*/\n\n' +
            domCode + '\n\n' +
            '/* new objects in this code\n' + newVariables + '*/\n\n';
        return domCode;
    }

    window['generateDOM'] = generate;
    console.log(encode("fdadsa"));
})();