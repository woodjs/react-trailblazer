$(function () {

  var app = {
    init: function () {
      var self = this;

      self.initElement();
      self.initEvent();
      self.initTemplate();
      self.render();
    },

    initElement: function () {
      var self = this;

      self.jq = {};

      self.jq.$pageBuy = $('#page-buy');
      self.jq.$pagePay = $('#page-pay');
      self.jq.$toReferer = $('#to-referer');
      self.jq.$toPageBuy = $('#to-page-buy');
      self.jq.$productList = $('#product-list');
      self.jq.$order = $('#order');
      self.jq.$productListLoading = $('#product-list-loading');
      self.jq.$orderLoading = $('#order-loading');
    },

    initEvent: function () {
      var self = this;

      self.jq.$toReferer.on('click', function () {
        alert('back to app!');
      });

      self.jq.$toPageBuy.on('click', function () {
        self.showPageBuy();
      });
    },

    initTemplate: function () {
      var self = this;

      self.tpl = {};

      self.tpl.product = $('#template-product').html();
      self.tpl.order = $('#template-order').html();
    },

    render: function () {
      var self = this;
      var pageCode = pageConfig.pageCode;

      switch (pageCode) {
        case 'buy':
          self.renderPageBuy();
          break;
        default:
          self.renderPagePay();
          break;
      }
    },

    renderPageBuy: function () {
      var self = this;
      util.loadData('../data/product_list.json', 'GET', function (result) {
        var html = ejs.render(self.tpl.product, result);

        self.jq.$productListLoading.hide();
        self.jq.$productList.html(html);
        self.initPageBuyEvent();
      });
    },

    renderPagePay: function () {
      var self = this;
      util.loadData('../data/order.json', 'GET', function (result) {
        var productHtml = ejs.render(self.tpl.product, result);
        result.productHtml = productHtml;
        var html = ejs.render(self.tpl.order, result);

        self.jq.$orderLoading.hide();
        self.jq.$order.html(html);
        self.initPagePayEvent();
      });
    },

    showPageBuy: function () {
      var self = this;

      self.jq.$pageBuy.show();
      self.jq.$pagePay.hide();
    },

    showPagePay: function () {
      var self = this;

      self.jq.$pageBuy.hide();
      self.jq.$pagePay.show();
      self.renderPagePay();
    },

    initPageBuyEvent: function () {
      var self = this;

      self.jq.$productList.find('.btn-buy').on('click', function () {
        self.showPagePay();
      });
    },

    initPagePayEvent: function () {
      var self = this;

      self.jq.$order.find('.pay-item').on('click', function () {
        alert('pay!');
        window.location.href = './page2.html';
      });
    },

  };

  var util = {
    loadData: function (url, params, successCallback, errorCallback) {
      var self = this;

      $.ajax({
        url: url,
        type: 'GET',
        cache: false,
        timeout: 3000,
        data: params || null,
        dataType: 'json',
        success: function (result) {
          successCallback && successCallback(result);
        },
        error: function () {
          errorCallback ? errorCallback(arguments) : self.handleAjaxError(arguments);
        }
      });
    },
    handleAjaxError: function () {
    }
  };

  app.init();
});