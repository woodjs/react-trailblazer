$(function () {

  var app = {
    init: function () {
      var self = this;

      self.initElement();
      self.initEvent();
      self.initTemplate();
      self.initState();
      self.initStore();
      self.initAddress();
      self.initPrompt();
    },

    initElement: function () {
      var self = this;

      self.jq = {};

      self.jq.$appContainerList = $('.app-container');
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
      self.jq.$selectAddressList = $('.select-address');
      self.jq.$normalSelectAddress = $("#normal-select-address");
      self.jq.$specialSelectAddress = $("#special-select-address");
      self.jq.$normalInvoiceInputList = self.jq.$normalInvoice.find('.invoice-input input');
      self.jq.$specialInvoiceInputList = self.jq.$specialInvoice.find('.invoice-input input');
    },

    initEvent: function () {
      var self = this;

      self.jq.$toReferer.on('click', function () {
        console.log('to referer!');
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

      self.jq.$selectAddressList.on('click', function () {
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

        self.jq.$appContainerList.hide();
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
        var $this = $(this);

        if ($this.is('.disabled')) return;
        self.submitInvoiceInfo('normal');
      });

      self.jq.$submitSpecialInvoice.on('click', function () {
        var $this = $(this);

        if ($this.is('.disabled')) return;
        self.submitInvoiceInfo('special');
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

    initStore: function () {
      var self = this;

      self.store = {};
      self.store.address = {
        province: null
      };
    },

    initAddress: function () {
      var self = this;
      var province = self.jq.$normalSelectAddress.data('province');
      var city = self.jq.$normalSelectAddress.data('city');
      var area = self.jq.$normalSelectAddress.data('area');

      self.renderProvince(province);
      province && self.renderCity(province, city);
      city && self.renderArea(province, city, area);

      province && self.jq.$curAddressList.html(self.jq.$normalSelectAddress.html());
    },

    initPrompt: function () {
      var self = this;
      var div = document.createElement('div');

      div.className = 'prompt';

      document.body.appendChild(div);

      self.prompt = div;
    },

    submitInvoiceInfo: function (type) {
      var self = this;
      var params = self.getParams(type);

      if (params) {
        if (type === 'normal') {
          self.jq.$submitNormalInvoice.addClass('disabled');
          self.jq.$submitNormalInvoice.html(self.jq.$submitNormalInvoice.data('submiting'));
        } else if (type === 'special') {
          self.jq.$submitSpecialInvoice.addClass('disabled');
          self.jq.$submitSpecialInvoice.html(self.jq.$submitSpecialInvoice.data('submiting'));
        }

        util.ajax('/', 'POST', params, function () {
          alert('您的发票信息已保存，近期会给您寄出。');
          self.resetSubmitBtn(type);
          window.location.href = './page1.html';
        }, function (xhr) {

          util.showPrompt((xhr && xhr.response && xhr.response.message) || 'network error!');
          self.resetSubmitBtn(type);
        })
      }
    },

    resetSubmitBtn: function (type) {
      var self = this;

      if (type === 'normal') {
        self.jq.$submitNormalInvoice.removeClass('disabled');
        self.jq.$submitNormalInvoice.html(self.jq.$submitNormalInvoice.data('origin-text'));
      } else if (type === 'special') {
        self.jq.$submitSpecialInvoice.removeClass('disabled');
        self.jq.$submitSpecialInvoice.html(self.jq.$submitSpecialInvoice.data('origin-text'));
      }
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

    setStore: function (type, data, indexObj) {
      var self = this;
      var tempCity = self.store.address.province && self.store.address.province[indexObj.province];
      switch (type) {
        case 'province':
          self.store.address.province = data;
          break;
        case 'city':
          tempCity && (tempCity.children = data);
          break;
        case 'area':
          tempCity && tempCity.children && tempCity.children[indexObj.city] && (tempCity.children[indexObj.city].children = data);
          break;
        default:
      }
      console.log(self.store.address);
    },

    setCurAddress: function () {
      var self = this;
      var tempProvince = self.jq.$provinceList.find('.active');
      var tempCity = self.jq.$cityList.find('.active');
      var tempArea = self.jq.$areaList.find('.active');
      var province = tempProvince.html() || '';
      var city = tempCity.html() || '';
      var area = tempArea.html() || '';
      var provinceCode = tempProvince.data('value') || '';
      var cityCode = tempCity.data('value') || '';
      var areaCode = tempArea.data('value') || '';
      var result = province + city + area;

      self.jq.$curAddressList.html(result);
      self.jq.$selectAddressList.html('<span>' + result + '</span>');
      self.jq.$selectAddressList
        .data('province', provinceCode)
        .data('city', cityCode)
        .data('area', areaCode);
    },

    rebuildAddressData: function (result, code) {
      var self = this;
      var list = result.data;
      var storeTemp = {};
      for (var i = 0; i < list.length; i++) {
        var temp = list[i];
        temp.className = '';
        if (!temp.hasChildren) temp.className += ' no-next-grade';
        if (code && (temp.value == code)) temp.className += ' active';

        storeTemp[temp.value] = temp;
      }

      return {
        storeData: storeTemp,
        renderData: result
      };
    },

    renderProvince: function (provinceCode) {
      var self = this;

      if (self.state.provinceLoaded) return;
      self.jq.$provinceList.html('');
      self.jq.$provinceListLoading.show();
      util.ajax('../data/province.json', 'GET', '', function (result) {
        var data = self.rebuildAddressData(result, provinceCode);
        var html = ejs.render(self.tpl.addressItem, data.renderData);

        self.jq.$provinceListLoading.hide();
        self.jq.$provinceList.html(html);
        self.initProvinceEvent();
        self.state.provinceLoaded = true;
        self.setStore('province', data.storeData);
      });
    },

    initProvinceEvent: function () {
      var self = this;

      self.jq.$provinceList.find('.address-item').on('click', function () {
        var $this = $(this);
        var value;

        value = $this.data('value');
        self.jq.$province.hide();

        self.setAddressItemStatus($this);

        if ($this.is('.no-next-grade')) {
          self.jq.$selectAddressList
            .data('city', '-')
            .data('area', '-');

          self.jq.$toInvoice.click();
          return;
        }
        self.jq.$city.show();
        self.renderCity();
      });
    },

    renderCity: function (provinceCode, cityCode) {
      var self = this;

      if (self.state.cityLoaded) return;
      self.jq.$cityList.html('');
      self.jq.$cityListLoading.show();
      util.ajax('../data/city.json', 'GET', '', function (result) {
        var data = self.rebuildAddressData(result, cityCode);
        var html = ejs.render(self.tpl.addressItem, data.renderData);

        self.jq.$cityListLoading.hide();
        self.jq.$cityList.html(html);
        self.initCityEvent();
        self.state.cityLoaded = true;
        self.setStore('city', data.storeData, {
          province: provinceCode
        });
      });
    },

    initCityEvent: function () {
      var self = this;

      self.jq.$cityList.find('.address-item').on('click', function () {
        var $this = $(this);
        var value;

        value = $this.data('value');
        self.jq.$city.hide();
        self.setAddressItemStatus($this);

        if ($this.is('.no-next-grade')) {
          self.jq.$selectAddressList
            .data('area', '-');

          self.jq.$toInvoice.click();
          return;
        }

        self.jq.$area.show();
        self.renderArea();
      });
    },

    renderArea: function (provinceCode, cityCode, areaCode) {
      var self = this;

      if (self.state.areaLoaded) return;
      self.jq.$areaList.html('');
      self.jq.$areaListLoading.show();
      util.ajax('../data/area.json', 'GET', '', function (result) {
        var data = self.rebuildAddressData(result, areaCode);
        var html = ejs.render(self.tpl.addressItem, data.renderData);

        self.jq.$areaListLoading.hide();
        self.jq.$areaList.html(html);
        self.initAreaEvent();
        self.state.areaLoaded = true;
        self.setStore('area', data.storeData, {
          province: provinceCode,
          city: cityCode
        });
      });
    },

    initAreaEvent: function () {
      var self = this;

      self.jq.$areaList.find('.address-item').on('click', function () {
        var $this = $(this);
        var value = $this.data('value');

        self.setAddressItemStatus($this);

        self.jq.$toInvoice.click();
      });
    },

    getParams: function (type) {
      var self = this;
      var $list = [];
      var $selectAddress = null;
      var result = {};

      if (type === 'normal') {
        $list = self.jq.$normalInvoiceInputList;
        $selectAddress = self.jq.$normalSelectAddress;
      } else if (type === 'special') {
        $list = self.jq.$specialInvoiceInputList;
        $selectAddress = self.jq.$specialSelectAddress;
      } else {
        return false;
      }

      for (var i = 0; i < $list.length; i++) {
        var $temp = $($list[i]);
        var regex = $temp.data('regex');
        var value = $.trim($temp.val());

        if (value) {
          result[$.trim($temp.attr('name'))] = value;
        } else {
          util.showPrompt(($temp.attr('placeholder') || '') + '必须填写');
          return false;
        }
      }

      if ($selectAddress) {
        var province = $selectAddress.data('province') || '';
        var city = $selectAddress.data('city') || '';
        var area = $selectAddress.data('area') || '';

        if (province && city && area) {
          result.province = province === '-' ? '' : province;
          result.city = city === '-' ? '' : city;
          result.area = area === '-' ? '' : area;
        } else {
          util.showPrompt(($selectAddress.data('placeholder') || '') + '必须填写');
          return false;
        }
      }

      return result;
    }
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

    handleAjaxError: function (xhr) {
      var self = this;

      self.showPrompt((xhr && xhr.response && xhr.response.message) || 'network error!');
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