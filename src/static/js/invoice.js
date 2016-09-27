$(function () {

  var app = {
    init: function () {
      var self = this;

      self.initElement();
      self.initEvent();
      self.initTemplate();
      self.initState();
    },

    initElement: function () {
      var self = this;

      self.jq = {};

      self.jq.$invoiceType = $('#invoice-type');
      self.jq.$itemInvoiceTypeList = $('.item-invoice-type');
      self.jq.$normalInvoice = $('#normal-invoice');
      self.jq.$specialInvoice = $('#special-invoice');
      self.jq.$province = $('#province');
      self.jq.$city = $('#city');
      self.jq.$area = $('#area');
      self.jq.$provinceList = $('#province-list');
      self.jq.$cityList = $('#city-list');
      self.jq.$areaList = $('#area-list');
      self.jq.$provinceListLoading = $('#province-list-loading');
      self.jq.$cityListLoading = $('#city-list-loading');
      self.jq.$areaListLoading = $('#area-list-loading');
      self.jq.$curAddressList = $('.cur-address');
      self.jq.$toReferer = $('#to-referer');
      self.jq.$toInvoiceTypeList = $('.to-invoice-type');
      self.jq.$toInvoice = $('#to-invoice');
      self.jq.$toProvince = $('#to-province');
      self.jq.$toCity = $('#to-city');
      self.jq.$submitNormalInvoice = $('#submit-normal-invoice');
      self.jq.$submitSpecialInvoice = $('#submit-special-invoice');
      self.jq.$selectAddress = $('.select-address');
    },

    initEvent: function () {
      var self = this;

      self.jq.$toReferer.on('click', function () {
        alert('to referer!');
        window.location.href = './page1.html';
      });

      self.jq.$itemInvoiceTypeList.on('click', function (e) {
        var $this = $(this);
        var targetId = $this.data('target');

        self.jq.$invoiceType.hide();
        $('#' + targetId).show();
      });

      self.jq.$toInvoiceTypeList.on('click', function () {
        $(this).closest('.app-container').hide();
        self.jq.$invoiceType.show();
      });

      self.jq.$selectAddress.on('click', function () {
        var $this = $(this);
        var refererId = $this.data('referer');

        $('#' + refererId).hide();
        self.jq.$province.show();
        self.jq.$toInvoice.data('referer', refererId);

        self.renderProvince();
      });

      self.jq.$toInvoice.on('click', function () {
        var $this = $(this);
        var refererId = $this.data('referer');
        self.jq.$province.hide();
        $('#' + refererId).show();
      });

      self.jq.$toProvince.on('click', function () {
        self.jq.$city.hide();
        self.jq.$province.show();
      });

      self.jq.$toCity.on('click', function () {
        self.jq.$area.hide();
        self.jq.$city.show();
      });

      self.jq.$submitNormalInvoice.on('click', function () {
        self.getParams('normal');
      });

      self.jq.$submitSpecialInvoice.on('click', function () {
        self.getParams('special');
      });
    },

    initTemplate: function () {
      var self = this;

      self.tpl = {};

      self.tpl.addressItem = $('#template-address-item').html();
    },

    initState: function () {
      var self = this;

      self.state = {};

      self.state.provinceLoaded = false;
      self.state.cityLoaded = false;
      self.state.areaLoaded = false;
    },

    setAddressItemStatus: function ($this) {
      var self = this;

      if (!$this.is('.active')) {
        $this.addClass('active').siblings().removeClass('active');
        self.resetAddressItem($this);
      }
    },

    resetAddressItem: function ($this) {
      var self = this;
      var parentId = $this.closest('.box-address-items').attr('id');

      if (parentId === 'province-list') {
        self.jq.$cityList.find('.active').removeClass('active');
        self.jq.$areaList.find('.active').removeClass('active');
        self.state.cityLoaded = false;
        self.state.areaLoaded = false;
      } else if (parentId === 'city-list') {
        self.jq.$areaList.find('.active').removeClass('active');
        self.state.areaLoaded = false;
      }

      self.setCurAddress();
    },

    setCurAddress: function () {
      var self = this;
      var province = self.jq.$provinceList.find('.active').html() || '';
      var city = self.jq.$cityList.find('.active').html() || '';
      var area = self.jq.$areaList.find('.active').html() || '';
      var result = province + city + area;

      self.jq.$curAddressList.html(result);
      self.jq.$selectAddress.html('<span>' + result +'</span>');
    },

    renderProvince: function () {
      var self = this;

      if (self.state.provinceLoaded) return;
      self.jq.$provinceList.html('');
      self.jq.$provinceListLoading.show();
      util.loadData('../data/province.json', 'GET', function (result) {
        var html = ejs.render(self.tpl.addressItem, result);

        self.jq.$provinceListLoading.hide();
        self.jq.$provinceList.html(html);
        self.initProvinceEvent();
        self.state.provinceLoaded = true;
      });
    },

    initProvinceEvent: function () {
      var self = this;

      self.jq.$provinceList.find('.address-item').on('click', function () {
        var $this = $(this);
        var value;

        if ($this.is('.no-next-grade')) return;

        value = $this.data('value');
        self.jq.$province.hide();
        self.jq.$city.show();
        self.setAddressItemStatus($this);
        self.renderCity();
      });
    },

    renderCity: function () {
      var self =this;

      if (self.state.cityLoaded) return;
      self.jq.$cityList.html('');
      self.jq.$cityListLoading.show();
      util.loadData('../data/city.json', 'GET', function (result) {
        var html = ejs.render(self.tpl.addressItem, result);

        self.jq.$cityListLoading.hide();
        self.jq.$cityList.html(html);
        self.initCityEvent();
        self.state.cityLoaded = true;
      });
    },

    initCityEvent: function () {
      var self = this;

      self.jq.$cityList.find('.address-item').on('click', function () {
        var $this = $(this);
        var value;

        if ($this.is('.no-next-grade')) return;

        value = $this.data('value');
        self.jq.$city.hide();
        self.jq.$area.show();
        self.setAddressItemStatus($this);
        self.renderArea();
      });
    },

    renderArea: function () {
      var self = this;

      if (self.state.areaLoaded) return;
      self.jq.$areaList.html('');
      self.jq.$areaListLoading.show();
      util.loadData('../data/area.json', 'GET', function (result) {
        var html = ejs.render(self.tpl.addressItem, result);

        self.jq.$areaListLoading.hide();
        self.jq.$areaList.html(html);
        self.initAreaEvent();
        self.state.areaLoaded = true;
      });
    },

    initAreaEvent: function () {
      var self = this;

      self.jq.$areaList.find('.address-item').on('click', function () {
        var $this = $(this);
        var value = $this.data('value');

        self.setAddressItemStatus($this);
      });
    },

    getParams: function (type) {
      if (type === 'normal') {

      } else if (type = 'special') {

      }

      alert(type);
    }
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