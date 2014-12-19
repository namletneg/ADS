/**
 * Created by Administrator on 2014/12/17.
 */
(function(){
    //ADS命名空间
    if(!window.ADS){
        window['ADS'] = {};
    }

    function isCompatible(other){
        //使用能力检测来检查必要条件
        if(other === false || !Array.prototype.push || !Object.hasOwnProperty || !document.createElement || !document.getElementsByTagName){
            return false;
        }
        return true;
    }
    window['ADS']['isCompatible'] = isCompatible;

    function $(){
        var elements = new Array(),
            len = arguments.length,
            i,element;

        //查询作为参数提供的所有元素
        for(i = 0; i < len; i++){
            element = arguments[i];
            //如果该参数是一个字符串那假设它是一个ID
            if(typeof element === 'string'){
                element = document.getElementById(element);
            }
            //如果只提供了一个参数
            //则立即返回这个元素
            if(len === 1){
                return element;
            }
            //否则，将它添加到数组中
            elements.push(element);
        }
        //返回包含多个被请求元素的数组
        return elements;
    }
    window['ADS']['$'] = $;

    function exampleLibraryMethod(obj){
        if(!(obj = $(obj))) return false;
    }
    window['ADS']['exampleLibraryMethod'] = exampleLibraryMethod;

    function addEvent(node , type, listener){
        if(!isCompatible()){
            return false;
        }
        if(exampleLibraryMethod(node)){
            return false;
        }
        if(node.addEventListener){
            // W3C的方法
            node.addEventListener(type, listener, false);
            return true;
        } else if(node.attachEvent){
            // IE
            node.attachEvent('on' + type, listener);
            return true;
        } else{
            node['on' + type] = listener;
            return true;
        }
        return false;
    }
    window['ADS']['addEvent'] = addEvent;

    function removeEvent(node, type, listener){
        if(exampleLibraryMethod(node)){
            return false;
        }
        if(node.removeEventListener){
            node.removeEventListener(type, listener, false);
            return true
        } else if(node.detachEvent()){
            // IE
            node.detachEvent('on' + type, listener);
            return true;
        } else{
            node['on' + type] = null;
            return true;
        }
    }
    window['ADS']['removeEvent'] = removeEvent;

    function getElementsByClassName(className, tag, parent){
        parent = parent || document;
        if(!(parent = $(parent))) {
            return false;
        }
    }







})();