import test from 'ava';
import {I18n} from '../dist';

test('method `formatNumber` should return formatted number', (t) => {
  let i18n = new I18n({locale: 'sl-SI'});
  t.is(i18n.formatNumber(123456789.12345), '123.456.789,123');
  t.is(i18n.formatNumber(123456789.12345, {maximumFractionDigits: 0}), '123.456.789');
  t.is(i18n.formatNumber(123456789.12345, {format: 'integer'}), '123.456.789');
  t.is(i18n.formatNumber(123456789.12345, {format: 'decimal'}), '123.456.789,12');
  t.is(i18n.formatNumber(1.312, {format: 'percent'}), '131 %');
  t.is(i18n.formatNumber(123456789.12345, {format: 'currency'}), '123.456.789,12 USD');
});

test('method `formatDate` should return formatted date', (t) => {
  let i18n = new I18n({locale: 'sl-SI'});
  t.is(i18n.formatDate(131231321239), '27. 2. 1974');
  t.is(i18n.formatDate(131231321239, {month: 'numeric', year: 'numeric'}), '2/1974');
  t.is(i18n.formatDate(1312313212391, {format: 'short'}), '2. 8. 11');
  t.is(i18n.formatDate(1312313212391, {format: 'medium'}), '2. avg. 2011');
  t.is(i18n.formatDate(1312313212391, {format: 'long'}), '2. avgust 2011');
  t.is(i18n.formatDate(1312313212391, {format: 'full'}), 'torek, 2. avgust 2011');
});

test('method `formatTime` should return formatted time', (t) => {
  let i18n = new I18n({locale: 'sl-SI'});
  t.is(i18n.formatTime(131231321239), '22:08');
  t.is(i18n.formatTime(131231321239, {hour: 'numeric'}), '22h');
  t.is(i18n.formatTime(1312313212391, {format: 'short'}), '21:26');
  t.is(i18n.formatTime(1312313212391, {format: 'medium'}), '21:26:52');
  t.is(i18n.formatTime(1312313212391, {format: 'long'}), '21:26:52 GMT+2');
  t.is(i18n.formatTime(1312313212391, {format: 'full'}), '21:26:52 GMT+2');
});

test('method `formatRelativeTime` should return relative time', (t) => {
  let i18n = new I18n({locale: 'sl-SI'});
  t.is(i18n.formatRelativeTime(131231321239), 'pred 43 leti');
});

test('method `formatMessage` should return formatted message', (t) => {
  let i18n = new I18n({locale: 'sl-SI'});
  t.is(i18n.formatMessage('foo {bar}', {bar: 'bar'}), 'foo bar');
});
