$(function () {

  var app = {
    init: function () {
      var self = this;

      self.initTemplate();
      self.render();
    },
    initTemplate: function () {
      var self = this;

      self.tpl = {};

      self.tpl.product = $('#template-product').html();
    },

    render: function () {
      var self = this;
      var pageCode = pageConfig.pageCode;

      switch (pageCode) {
        case 'buy':
          self.renderBuy();
          break;
        case 'pay':
          break;
        default:
          break;
      }
    },
    renderBuy: function () {
      var self = this;
      var data = {
        productList: [{
          title: '啊滴滴答答滴滴答答滴滴答答滴滴答答',
          originPrice: '￥1000.00',
          date: '2016-11-22',
          isHasDiscount: true,
          discountInfo: '顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶的地方方法',
          productClassName: 'with-btn-buy',
          discountPrice: '￥500.00',
          actualPrice: '￥800.00',
          isHasBuyBtn: true,
          url: '#ccc'
        }, {
          title: '啊滴滴答答滴滴答答滴滴答答滴滴答答',
          originPrice: '￥1000.00',
          date: '2016-11-22',
          isHasDiscount: true,
          discountInfo: '顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶的地方方法',
          productClassName: 'with-btn-buy',
          discountPrice: '￥500.00',
          isHasBuyBtn: true,
          actualPrice: '￥800.00',
          url: '#ccc'
        }]
      };
      util.loadData('/', '', function () {
        alert(1);
      }, function () {
        setTimeout(function () {
          $('#product-list').html(
            ejs.render(self.tpl.product, data)
          );
        }, 1000);
      });
    }
  };

  var util = {
    loadData: function (url, params, successCallback, errorCallback) {
      $.ajax({
        url: url,
        type: 'GET',
        cache: false,
        timeout: 3000,
        data: params || null,
        dataType: 'json',
        error: function () {
          errorCallback && errorCallback(arguments);
        },
        success: function (result) {
          successCallback && successCallback(result);
        }
      });
    }
  };

  app.init();
});