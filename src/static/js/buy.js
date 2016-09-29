$(function () {

  var app = {
    init: function () {
      var self = this;

      self.initElement();
      self.initEvent();
      self.initTemplate();
      self.initPrompt();
      self.render();
    },

    initElement: function () {
      var self = this;

      self.jq = {};

      self.jq.$pageBuy = $('#page-buy');
      self.jq.$pagePay = $('#page-pay');
      self.jq.$pageBuyHeader = $('#page-buy-header');
      self.jq.$pagePayHeader = $('#page-pay-header');
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
        console.log('back to app!');
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

    initPrompt: function () {
      var self = this;
      var div = document.createElement('div');

      div.className = 'prompt';

      document.body.appendChild(div);

      self.prompt = div;
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
      util.ajax('../data/product_list.json', 'GET', '', function (result) {
        var html = ejs.render(self.tpl.product, result);

        self.jq.$productListLoading.hide();
        self.jq.$productList.html(html);
        self.initPageBuyEvent();
      });
    },

    renderPagePay: function () {
      var self = this;

      self.jq.$order.html('');
      self.jq.$orderLoading.show();
      util.ajax('../data/order.json', 'GET', '', function (result) {
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


      self.jq.$pagePay.hide();
      self.jq.$pageBuy.show();
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
        console.log('pay!');
        window.location.href = './page2.html';
      });
    },

  };


  var util = {
    ajax: function (url, method, params, successCallback, errorCallback) {
      var self = this;

      $.ajax({
        url: url,
        type: method || 'GET',
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

    handleAjaxError: function (params) {
      var self = this;

      self.showPrompt((params && params.message) || 'network error!');
    },

    showPrompt: function (val) {

      app.prompt.innerHTML = val;
      app.prompt.style.opacity = 1;
      setTimeout(function () {
        app.prompt.style.opacity = 0;
      }, 3000);
    }
  };

  app.init();
});