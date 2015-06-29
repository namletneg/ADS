/**
 * Created by f on 2015/6/29.
 */
function MyLogger(id) {
    var logWindow = null,
        createWindow = function () {
            var // 取得窗口大小
                browserWindowSize = ADS.getBrowserWindowSize(),
                top = ((browserWindowSize.height - 200) / 2) || 0,
                left = ((browserWindowSize.width - 200) / 2) || 0;

            logWindow = document.createElement('ul');
            logWindow.setAttribute('id', id);
            // 位置
            logWindow.style.position = 'absolute';
            logWindow.style.top = top + 'px';
            logWindow.style.left = left + 'px';
            // 大小
            logWindow.style.width = '200px';
            logWindow.style.height = '200px';
            //logWindow.style.overflow = 'scroll';
            // 外观
            logWindow.style.margin = 0;
            logWindow.style.padding = 0;
            logWindow.style.border = '1px solid black';
            logWindow.style.backgroundColor = 'white';
            logWindow.style.listStyle = 'none';
            logWindow.style.font = '12px/12px Verdana, Tahoma, Sans';

            document.body.appendChild(logWindow);
        };

    id = id || 'ADSLogWindow';
    this.writeRaw = function (message) {
        var li = document.createElement('li');

        // 初始化的窗口不存在，创建
        if (!logWindow) {
            createWindow();
        }

        li.style.padding = '2px';
        li.style.border = 0;
        li.style.borderBottom = '1px dotted black';
        li.style.margin = 0;
        li.style.color = '#000';
        li.style.font = '10px/10px Verdana, Tahoma, Sans';

        if (typeof message == 'undefined') {
            li.appendChild(document.createTextNode('Message was undefined'));
        } else if (typeof li.innerHTML !== 'undefined') {
            //判断 innerHTML 方法是否存在
            li.innerHTML = message;
        } else {
            li.appendChild(document.createTextNode(message));
        }

        logWindow.appendChild(li);
        return true;
    };
}

MyLogger.prototype = {
    constructor: MyLogger,
    write: function (message) {
        if (typeof message === 'string' && message.length === 0) {
            return this.writeRaw('ADS.log: null message');
        }
        // 如果 message 不是字符串， 则尝试调用 toString()方法，
        // 如果不存在该访问则记录对象类型
        if (typeof message !== 'string') {
            if (message = message.toString()) {
                return this.writeRaw(message);
            } else {
                return this.writeRaw(typeof message);
            }
        }
        // 转换 < 和 > 以便 .innerTHML 不会将 message 作为 HTML 进行解析
        message = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return this.writeRaw(message);
    },
    // 向日志窗口写入一个标题
    header: function (message) {
        message = '<span style="color: #fff; background-color: #000; font-weight: bold; padding: 0 5px;">' + message + '</span>';
        return this.writeRaw(message);
    }
};

if (!window.ADS) {
    window['ADS'] = {};
}
window['ADS']['log'] = new MyLogger();