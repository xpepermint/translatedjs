import * as merge from 'lodash.merge';
import MessageFormat from 'intl-messageformat';
import RelativeFormat = require('intl-relativeformat');

export const defaultFormats = {
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

export class I18n {
  locale: string;
  messages: any;
  formats: any;

  /*
  * Class constructor.
  */

  constructor ({
    locale = 'en-US',
    messages = {},
    formats = {}
  }: {
    locale: string,
    messages?: any,
    formats?: any
  }) {
    this.locale = locale;
    this.messages = messages;
    this.formats = merge(MessageFormat.formats, defaultFormats, formats);
  }

  /*
  * Returns formatted number.
  */

  formatNumber (value: number, options: any = {}) {
    let {format, ...props} = options;
    props = merge(this.formats.number[format], props);

    return new Intl.NumberFormat(this.locale, props).format(value);
  }

  /*
  * Returns formatted date.
  */

  formatDate (value: number | Date, options: any = {}) {
    let {format, ...props} = options;
    props = merge(this.formats.date[format], props);

    return new Intl.DateTimeFormat(this.locale, props).format(value);
  }

  /*
  * Returns formatted date.
  */

  formatTime (value: number | Date, options: any = {}) {
    let {format, ...props} = options;
    props = merge(this.formats.time[format], props);

    if (Object.keys(props).length === 0) {
      props = this.formats.time.short;
    }

    return new Intl.DateTimeFormat(this.locale, props).format(value);
  }

  /*
  * Returns formatted number as percentage.
  */

  formatRelativeTime (value: number, options: any = {}) {
    return new RelativeFormat(this.locale, options).format(value);
  }

  /*
  * Returns formatted message.
  */

  formatMessage (message: string, vars: any = {}) {
    return new MessageFormat(message, this.locale, this.formats).format(vars);
  }

}
