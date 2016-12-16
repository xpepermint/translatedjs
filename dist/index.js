"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var merge = require("lodash.merge");
var intl_messageformat_1 = require("intl-messageformat");
var RelativeFormat = require("intl-relativeformat");
exports.defaultFormats = {
    number: {
        integer: {
            maximumFractionDigits: 0
        },
        decimal: {
            maximumFractionDigits: 2
        },
        currency: {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'code'
        }
    },
    date: {
        decimal: {
            maximumFractionDigits: 2
        }
    }
};
var I18n = (function () {
    /*
    * Class constructor.
    */
    function I18n(_a) {
        var _b = _a.locale, locale = _b === void 0 ? 'en-US' : _b, _c = _a.messages, messages = _c === void 0 ? {} : _c, _d = _a.formats, formats = _d === void 0 ? {} : _d;
        this.locale = locale;
        this.messages = messages;
        this.formats = merge(intl_messageformat_1["default"].formats, exports.defaultFormats, formats);
    }
    /*
    * Returns formatted number.
    */
    I18n.prototype.formatNumber = function (value, options) {
        if (options === void 0) { options = {}; }
        var format = options.format, props = __rest(options, ["format"]);
        props = merge(this.formats.number[format], props);
        return new Intl.NumberFormat(this.locale, props).format(value);
    };
    /*
    * Returns formatted date.
    */
    I18n.prototype.formatDate = function (value, options) {
        if (options === void 0) { options = {}; }
        var format = options.format, props = __rest(options, ["format"]);
        props = merge(this.formats.date[format], props);
        return new Intl.DateTimeFormat(this.locale, props).format(value);
    };
    /*
    * Returns formatted date.
    */
    I18n.prototype.formatTime = function (value, options) {
        if (options === void 0) { options = {}; }
        var format = options.format, props = __rest(options, ["format"]);
        props = merge(this.formats.time[format], props);
        if (Object.keys(props).length === 0) {
            props = this.formats.time.short;
        }
        return new Intl.DateTimeFormat(this.locale, props).format(value);
    };
    /*
    * Returns formatted number as percentage.
    */
    I18n.prototype.formatRelativeTime = function (value, options) {
        if (options === void 0) { options = {}; }
        return new RelativeFormat(this.locale, options).format(value);
    };
    /*
    * Returns formatted message.
    */
    I18n.prototype.formatMessage = function (key, vars) {
        if (vars === void 0) { vars = {}; }
        var message = this.messages[key] || key;
        return new intl_messageformat_1["default"](message, this.locale, this.formats).format(vars);
    };
    return I18n;
}());
exports.I18n = I18n;
