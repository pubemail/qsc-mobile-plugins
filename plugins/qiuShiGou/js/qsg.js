// Generated by CoffeeScript 1.6.1
var Data, View, data, view;

Data = (function() {

  function Data() {
    this.api = '//m.myqsc.com/qiu-shi-gou/process.php';
  }

  /*
  获取物品信息
  
  @param {Object} args 参数
  @param {Function} callback function to callback when success
  @param {Function} callback function to callback when fail
  */


  Data.prototype.get = function(args, success, error) {
    args.method = 'query';
    return $.ajax({
      url: this.api,
      data: args,
      success: success,
      error: error
    });
  };

  /*
  上传新的物品信息
  
  @param {Object} data 物品信息
  @param {Function} callback function to callback when success
  @param {Function} callback function to callback when fail
  */


  Data.prototype.upload = function(data, success, error) {
    data.uuid = Math.uuid();
    data.method = 'upload';
    return $.ajax({
      url: this.api,
      data: data,
      success: success,
      error: error
    });
  };

  return Data;

})();

View = (function() {

  function View(data) {
    this.data = data;
    this.query = {};
  }

  /*
  返回 header 的 HTML
  */


  View.prototype.headerHTML = function(title) {
    return '<span class="title">' + title + '</span><div class="icon"><i class="icon-circle-arrow-left"></i></div>';
  };

  View.prototype.list = function(query) {
    var error, success,
      _this = this;
    this.query = query;
    success = function(items) {
      var html;
      items = items.filter(function(item) {
        return item != null;
      });
      html = items.map(function(item) {
        var arr;
        arr = [['物品', item.name], ['校区', item.campus], ['地点', item.place], ['具体描述', item.detail], ['联系方式', item.contact]];
        arr = arr.map(function(elem) {
          elem = elem.map(function(el) {
            return '<td>' + el + '</td>';
          });
          return "<tr>" + (elem.join('')) + "</tr>";
        });
        return "<table>" + (arr.join('')) + "</table>";
      });
      $('#items').html(html.join(''));
      $('.prev').toggleClass('disabled', query.page === 1);
      return $('.next').toggleClass('disabled', items.length !== 10);
    };
    error = function() {
      return _this.msg('获取数据失败，请检查网络连接');
    };
    return this.data.get(query, success, error);
  };

  View.prototype.nextPage = function() {
    $('html, body').scrollTop(0);
    this.query.page++;
    return this.list(this.query);
  };

  View.prototype.prevPage = function() {
    $('html, body').scrollTop(0);
    this.query.page--;
    return this.list(this.query);
  };

  View.prototype.section = function(section) {
    $('.section').hide();
    return $('#' + section).show();
  };

  View.prototype.about = function() {
    return this.section('about');
  };

  View.prototype.lost = function() {
    $('#list .header .title').html('寻物启事');
    this.list({
      type: 'lost',
      page: 1
    });
    $('#search').hide();
    return this.section('list');
  };

  View.prototype.found = function() {
    $('#list .header .title').html('失物招领');
    this.list({
      type: 'found',
      page: 1
    });
    $('#search').hide();
    return this.section('list');
  };

  View.prototype.upload = function() {
    return this.section('upload');
  };

  View.prototype.index = function() {
    return this.section('index');
  };

  View.prototype.search = function() {
    $('#list .header .title').html('物品搜索');
    $('#search').show();
    this.list({
      keyword: '',
      page: 1
    });
    return this.section('list');
  };

  View.prototype.msg = function(msg) {
    return alert(msg);
  };

  return View;

})();

data = new Data;

view = new View(data);

$(function() {
  $('#about-icon').on('click', function() {
    return view.about();
  });
  $('body').on('click', '.icon-circle-arrow-left', function() {
    return view.index();
  });
  $('body').on('click', 'table', function() {
    return $(this).toggleClass('clicked');
  });
  $('body').on('click', '.prev', function() {
    if (!$(this).hasClass('disabled')) {
      return view.prevPage();
    }
  });
  $('body').on('click', '.next', function() {
    if (!$(this).hasClass('disabled')) {
      return view.nextPage();
    }
  });
  $('.icon.search').on('click', function() {
    var query;
    query = {
      keyword: $('#search-input').val(),
      page: 1
    };
    return view.list(query);
  });
  $('#index').on('click', '.menu li', function() {
    var section;
    section = $(this).attr('class');
    return typeof view[section] === "function" ? view[section]() : void 0;
  });
  $('.select .option').click(function() {
    $(this).parent().find('.selected').removeClass('selected');
    return $(this).addClass('selected');
  });
  $('#upload .submit').click(function() {
    var elem, fail, obj, success, _i, _j, _len, _len1, _ref, _ref1;
    obj = {};
    _ref = ['name', 'detail', 'place', 'contact'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      elem = _ref[_i];
      obj[elem] = $('#upload .' + elem).val();
    }
    _ref1 = ['type', 'campus'];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      elem = _ref1[_j];
      obj[elem] = $('#upload .' + elem).find('.selected').text();
    }
    obj['type'] = obj['type'] === '失物招领' ? 'found' : 'lost';
    success = function() {
      return view.msg('上传成功');
    };
    fail = function() {
      return view.msg('上传失败，请检查您的网络连接');
    };
    return data.upload(obj, success, fail);
  });
  return view.index();
});
