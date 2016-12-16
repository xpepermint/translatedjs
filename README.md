![Build Status](https://travis-ci.org/xpepermint/translatedjs.svg?branch=master)&nbsp;[![NPM Version](https://badge.fury.io/js/typeable.svg)](https://badge.fury.io/js/typeable)&nbsp;[![Dependency Status](https://gemnasium.com/xpepermint/translatedjs.svg)](https://gemnasium.com/xpepermint/translatedjs)

# translated.js

> Internationalization (i18n) and localization (l10n) library.

This library uses [ECMAScript Internationalization API](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl) and industry standards [ICU Message Format](http://userguide.icu-project.org/formatparse/messages) and [Unicode CLDR](http://cldr.unicode.org/) locale data. It is build on top of  [intl-messageformat](https://github.com/yahoo/intl-messageformat) and [intl-relativeformat](https://github.com/yahoo/intl-relativeformat) packages from [Yahoo Inc.](https://github.com/yahoo).

This is a light weight open source package for use on **server** or in **browser** (using module bundler). The source code is available on [GitHub](https://github.com/xpepermint/translatedjs) where you can also find our [issue tracker](https://github.com/xpepermint/translatedjs/issues).

## Related Projects

* [vue-translated](https://github.com/xpepermint/vue-translated): Internationalization (i18n) and localization (l10n) library for Vue.js v2.

## Installation

Run the command below to install the package.

```
$ npm install --save translated
```

## Usage Example

```js
import {I18n} from 'translated';

let i18n = new I18n({
  locale: 'en-US',
  messages: {
    hello: 'Hello, {name}!'
  },
  formats : {
    number: {}, // custom number formats for Intl.NumberFormat
    date: {}, // custom date formats for Intl.DateTimeFormat
    time: {} // custom time formats for Intl.DateTimeFormat
  }
});

i18n.formatMessage('hello', {name: 'John'}); // -> Hello, John!
i18n.formatNumber(1231, {format: 'decimal'}); // -> 1,231.00
i18n.formatNumber(0.81, {format: 'percent'}); // -> 80 %
i18n.formatNumber(1234, {format: 'currency'}); // -> 1,234.00 USD
i18n.formatDate(new Date(), {format: 'short'}); // -> 8. 2. 11
i18n.formatRelativeTime(new Date()); // -> 1 month ago
```

## API

**I18n({locale, messages, formats})**

> Core class for internationalization and localization.

| Name | Type | Required | Default | Description
|------|------|----------|---------|------------
| locale | String | No | en-US | Language culture [name](https://msdn.microsoft.com/en-us/library/ee825488).
| messages | Object | No | {} | Object with translations.
| formats | Object | No | {} | Object with custom formats.

```js
import {I18n} from 'translated';

let i18n = new I18n({
  locale: 'en-US',
  messages: {
    hello: 'Hello, {name}!'
  },
  formats : {
    number: {}, // custom number formats for Intl.NumberFormat
    date: {}, // custom date formats for Intl.DateTimeFormat
    time: {} // custom time formats for Intl.DateTimeFormat
  }
});
```

**I18n.prototype.formatDate(value, options)**

> Converts a `value` into formatted date string.

| Name | Type | Required | Default | Description
|------|------|----------|---------|------------
| value | Date, Integer | Yes | - | Date object.
| options | Object | No | - | Options which are passed directly into the  [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) constructor.

```js
i18n.formatDate(Date.now(), {month: 'numeric', year: 'numeric'}); // -> 2/1974
```

Note that a `format` option is also supported and can be set to `short`, `medium`, `long` or `full`.

```js
i18n.formatDate(Date.now(), {format: 'short'}); // -> 12/16/16
```

**I18n.prototype.formatMessage(message, vars)**

> Compiles ICU message into string.

| Name | Type | Required | Default | Description
|------|------|----------|---------|------------
| message | String | Yes | - | ICU message (supports `number`, `date`, `plural`, and `select`).
| vars | Object | No | - | Data object.

You can use a `plural` argument to select sub-messages based on a numeric value, together with the plural rules for the specified language.

```js
i18n.formatMessage(`
  You have {num, plural,
  =0 {no photos.}
  =1 {one photo.}
  other {# photos.}
}`, {num: 3}); // -> You have 3 photos.
```

You can use a `select` argument to select sub-messages via a fixed set of keywords.

```js
i18n.formatMessage(`
  It's {gender, select,
  male {him.}
  female {her.}
  other {something.}
}`, {gender: 'female'}); // -> It's her.
```

You can use a `date` or a `time` argument to convert a date variable into a date/time string. The available built-in date formats are `short`, `medium`, `long` and `full`.

```js
i18n.formatMessage(`{val, date, short}`, {val: new Date()}); // -> 12/16/16
i18n.formatMessage(`{val, time, short}`, {val: new Date()}); // -> 4:11 PM
```

You can use a `number` argument to format a number. The available built-in number formats are `integer`, `decimal`, `currency` and `percent`.

```js
i18n.formatMessage(`{val, number, integer}`, {val: 1234.56}); // -> 1,234
```

**I18n.prototype.formatNumber(value, options)**

> Converts a `value` into formatted string.

| Name | Type | Required | Default | Description
|------|------|----------|---------|------------
| value | Number | Yes | - | Integer or decimal number.
| options | Object | No | - | Options which are passed directly into the  [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) constructor.

```js
i18n.formatNumber(1234.56, {maximumFractionDigits: 0}); // -> 1,234
```

Note that a `format` option is also supported and can be set to `integer`, `decimal`, `currency` and `percent`.

```js
i18n.formatNumber(0.1891, {format: 'percent'}); // -> 19%
```

**I18n.prototype.formatRelativeTime(value, options)**

> Converts a `value` into relative time (e.g. 3 days ago).

| Name | Type | Required | Default | Description
|------|------|----------|---------|------------
| value | Date, Integer | Yes | - | Date object.
| options | Object | No | - | Options for customizing the output (`units` and `style`).

```js
i18n.formatRelativeTime(Date.now()); // -> yesterday
```

By default, the relative time is computed to the `best fit` unit, but you can explicitly call it to force units to be displayed in `second`, `minute`, `hour`, `day`, `month` or `year`.

```js
i18n.formatRelativeTime(Date.now(), {units: 'day'}); // -> 2 days ago
```

By default, the relative time is computed as `best fit`, which means that instead of `1 day ago`, it will display `yesterday`, or `in 1 year` will be `next year`, etc. But you can force to always use the `numeric` alternative:

```js
i18n.formatRelativeTime(Date.now(), {style: 'numeric'}); // -> 2 days ago
```

**I18n.prototype.formatTime(value, options)**

> Converts a `value` into formatted time string.

| Name | Type | Required | Default | Description
|------|------|----------|---------|------------
| value | Date, Integer | Yes | - | Date object.
| options | Object | No | - | Options which are passed directly into the  [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) constructor.

```js
i18n.formatTime(Date.now(), {hour: 'numeric'}); // -> 4 PM
```

Note that a `format` option is also supported and can be set to `short`, `medium`, `long` or `full`.

```js
i18n.formatTime(Date.now(), {format: 'short'}); // -> 4:11 PM
```

## Support

### Browsers

If you need to support old browsers with no support for [Intl](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl) then you need to include a polyfill. The easiest way is to use [FT Polyfill Service](https://cdn.polyfill.io).

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"></script>
```

### Node.js

Node.js has the [Intl](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl) APIs built-in, but only includes the English locale data by default. To support other languages download the latest [ICU data file](http://site.icu-project.org/download) and then run our scripts with the `--icu-data-dir` option.

The easiest way to get `ICU data` is by installing the [icu4c-data](https://www.npmjs.com/package/icu4c-data) package (`v0.58.2` or higher).

```js
$ npm install —save icu4c-data
```

Now you can run your scripts like this (`Node v7+`):

```js
$ node --icu-data-dir=node_modules/icu4c-data index.js
```

## License (MIT)

```
Copyright (c) 2016 Kristijan Sedlak <xpepermint@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
