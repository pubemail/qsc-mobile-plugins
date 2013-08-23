// Generated by CoffeeScript 1.6.1

/*
QSCMobile API
*/


(function() {
  var M, QSCMobile;

  QSCMobile = (function() {

    function QSCMobile() {}

    /*
    @param {Object} opts - config options
    */


    QSCMobile.prototype.construtor = function(opts) {
      this.opts = opts;
      this.callbacks = {};
      return this.requestCount = 0;
    };

    /*
    向平台发送请求
    
    @private
    @param {Object} msg - msg
    @param {String} msg.fn - 平台应执行的函数
    @param {Object} msg.args - 函数参数
    @param {Object} msg.success - The callback that handles data when success
    @param {Object} msg.error - The callback that handles error
    */


    QSCMobile.prototype.sendRequest = function(msg) {
      var args, error, fn, id, success;
      fn = msg.fn, args = msg.args, success = msg.success, error = msg.error;
      this.requestCount++;
      id = this.requestCount;
      this.callbacks[id] = {};
      this.callbacks[id].success = success;
      this.callbacks[id].error = error;
      msg = JSON.stringify({
        id: id,
        fn: fn,
        args: args
      });
      return window.location.hash = msg;
    };

    /*
    平台向 Webview 返回消息时直接注入调用
    
    @example
      M.onRequest({id: 123, data: 'hello world'});
    
    @private
    @param {Object} msg - msg
    @param {Interger} msg.id - Request ID
    @param {String} msg.data - 函数返回数据
    @param {String} msg.error - 错误信息
    */


    QSCMobile.prototype.onRequest = function(msg) {
      var data, error, id, _base, _base1;
      id = msg.id, data = msg.data, error = msg.error;
      if (error) {
        return typeof (_base = this.callbacks[id]).error === "function" ? _base.error(error) : void 0;
      } else {
        return typeof (_base1 = this.callbacks[id]).success === "function" ? _base1.success(data) : void 0;
      }
    };

    /*
    QSC Mobile View API
    
    @example
      M.view.card('qiuShiGou', 'title', 'Here is some contents');
    
    @mixin
    */


    QSCMobile.prototype.view = {
      /*
      按照参数绘制 card
      
      @param {String} pluginID pluginID
      @param {String} title card title
      @param {String} content card content
      */

      card: function(pluginID, title, content) {
        var args;
        args = {
          pluginID: pluginID,
          title: title,
          content: content
        };
        return this.sendMessage({
          fn: 'draw.card',
          args: args
        });
      }
    };

    /*
    QSC Mobile KVDB API
    
    @example
      M.kvdb.set('key', 'value', onsuccess, onerror);
    
    @mixin
    */


    QSCMobile.prototype.kvdb = {
      /*
      写入记录
      
      @param {String} key key
      @param {*} value value
      @param {Function} success The callback that handles data when success
      @param {Function} error The callback that handles error
      */

      set: function(key, value, success, error) {
        var msg;
        msg = {
          fn: 'KVDB.set',
          args: {
            key: key,
            value: value
          },
          success: success,
          error: error
        };
        return this.sendMessage(msg);
      },
      /*
      取出记录
      
      @param {String} key key
      @param {Function} success The callback that handles data when success
      @param {Function} error The callback that handles error
      */

      get: function(key, success, error) {
        var msg;
        msg = {
          fn: 'KVDB.get',
          args: {
            key: key
          },
          success: success,
          error: error
        };
        return this.sendMessage(msg);
      },
      /*
      删除记录
      
      @param {String} key - key
      @param {Function} success The callback that handles data when success
      @param {Function} error The callback that handles error
      */

      remove: function(key, success, error) {
        var msg;
        msg = {
          fn: 'KVDB.remove',
          args: {
            key: key
          },
          success: success,
          error: error
        };
        return this.sendMessage(msg);
      },
      /*
      清空记录
      
      @param {Function} success The callback that handles data when success
      @param {Function} error The callback that handles error
      */

      clear: function(success, error) {
        var msg;
        msg = {
          fn: 'KVDB.clear',
          success: success,
          error: error
        };
        return this.sendMessage(msg);
      }
    };

    /*
    QSCMobile Config API
    
    @example
      M.config.set('key', 'value', onsuccess, onerror);
    
    @mixin
    */


    QSCMobile.prototype.config = {
      set: function(key, value, success, error) {},
      get: function(key, success, error) {},
      remove: function(key, success, error) {}
    };

    /*
    QSCMobile Config API
    
    @example
      var onsuccess = function(data) {
        console.log("Stuid is "+data);
      }
      var onerror = function(e) {
        console.log("Error: "+e);
      }
      M.user.stuid(onsuccess, onerror);
    
    @mixin
    */


    QSCMobile.prototype.user = {
      /*
      学号
      
      @param {Function} success The callback that handles data when success
      @param {Function} error The callback that handles error
      */

      stuid: function(success, error) {
        return this.sendMessage({
          fn: 'user.stuid',
          success: success,
          error: error
        });
      },
      /*
      密码
      
      @private
      
      @param {Function} success The callback that handles data when success
      @param {Function} error The callback that handles error
      */

      pwd: function(success, error) {
        return this.sendMessage({
          fn: 'user.pwd',
          success: success,
          error: error
        });
      },
      /*
      用户名
      
      @param {Function} success The callback that handles data when success
      @param {Function} error The callback that handles error
      */

      id: function(success, error) {
        return this.sendMessage({
          fn: 'user.id',
          success: success,
          error: error
        });
      },
      /*
      真实名字
      
      @private
      
      @param {Function} success The callback that handles data when success
      @param {Function} error The callback that handles error
      */

      name: function(success, error) {
        return this.sendMessage({
          fn: 'user.name',
          success: success,
          error: error
        });
      }
    };

    return QSCMobile;

  })();

  M = new QSCMobile;

}).call(this);
