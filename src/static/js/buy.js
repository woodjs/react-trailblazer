$(function () {

  var app = {
    init: function () {
      var self = this;

      self.initElement();
      self.initEvent();
      self.initTemplate();
      self.initStore();
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

    initStore: function () {
      var self = this;

      self.store = {};
      self.store.product = {};
    },

    render: function () {
      var self = this;
      var pageCode = pageConfig.pageCode;

      switch (pageCode) {
        case 'buy':
          self.renderPageBuy();
          break;
        default:
          self.renderPagePay(productId);
      }
    },

    setStore: function (type, data, productId) {
      var self = this;

      self.store.product[productId] = data;

      console.log(self.store);
    },

    getStore: function (type, productId) {
      var self = this;

      return  (productId && self.store.product[productId]) || null;
    },

    renderPageBuy: function () {
      var self = this;

      self.jq.$productList.html('');
      self.jq.$productListLoading.show();
      util.ajax('../data/product_list.json', 'GET', '', successCallback);

      function successCallback(result, isLocal) {
        var html = ejs.render(self.tpl.product, result);

        self.jq.$productListLoading.hide();
        self.jq.$productList.html(html);
        self.initPageBuyEvent();
      }
    },

    renderPagePay: function (productId) {
      var self = this;

      self.jq.$order.html('');
      self.jq.$orderLoading.show();

      var data = self.getStore('product', productId);
      if (data) {
        successCallback(data, true);
        return;
      }

      util.ajax('../data/order.json', 'GET', '', successCallback);

      function successCallback(result, isLocal) {
        if (!isLocal) self.setStore('product', result, productId);

        var productHtml = ejs.render(self.tpl.product, result);
        result.productHtml = productHtml;
        var html = ejs.render(self.tpl.order, result);

        self.jq.$orderLoading.hide();
        self.jq.$order.html(html);
        self.initPagePayEvent();
      }
    },

    showPageBuy: function () {
      var self = this;

      self.jq.$pagePay.hide();
      self.jq.$pageBuy.show();
    },

    showPagePay: function (productId) {
      var self = this;

      self.jq.$pageBuy.hide();
      self.jq.$pagePay.show();

      self.renderPagePay(productId);
    },

    initPageBuyEvent: function () {
      var self = this;

      self.jq.$productList.find('.btn-buy').on('click', function () {
        var $this = $(this);
        var productId = $this.data('productid');

        self.showPagePay(productId);
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
    init: function () {
      var self = this;

      self.initPrompt();
    },

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

    handleAjaxError: function (xhr) {
      var self = this;

      self.showPrompt((xhr && xhr.response && xhr.response.message) || 'network error!');
    },

    initPrompt: function () {
      var self = this;
      var div = document.createElement('div');

      div.className = 'prompt';

      document.body.appendChild(div);

      self.prompt = div;
    },

    showPrompt: function (val) {
      var self = this;

      self.prompt.innerHTML = val;
      self.prompt.style.opacity = 1;
      setTimeout(function () {
        self.prompt.style.opacity = 0;
      }, 3000);
    }
  };

  app.init();
  util.init();
});