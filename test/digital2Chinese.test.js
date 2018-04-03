const assert = require('assert');
const digital2Chinese = require('../src/digital2Chinese');

describe('数字转换中文', () => {
  it('测试小整数', () => {
    assert.equal(digital2Chinese(130), '壹佰叁拾');
  });
  it('测试小数点', () => {
    assert.equal(digital2Chinese(1654.21), '壹仟陆佰伍拾肆点贰壹');
  });
  it('测试大整数数', () => {
    assert.equal(digital2Chinese(234567203.21), '贰亿叁仟肆佰伍拾陆万柒仟贰佰零叁点贰壹');
  });
  it('测试小数', () => {
    assert.equal(digital2Chinese(0.234567263), '零点贰叁肆伍陆柒贰陆叁');
  });
  it('测试带零的整数10000', () => {
    assert.equal(digital2Chinese(10000), '壹万');
  });
  it('测试带零的整数1000', () => {
    assert.equal(digital2Chinese(1000), '壹仟');
  });
  it('测试带零的整数100', () => {
    assert.equal(digital2Chinese(100), '壹佰');
  });
  it('测试带零的整数10', () => {
    assert.equal(digital2Chinese(10), '壹拾');
  });
  it('测试零', () => {
    assert.equal(digital2Chinese(0), '零');
  });
  it('带零的整数101', () => {
    assert.equal(digital2Chinese(101), '壹佰零壹');
  });
  it('带零的整数1010', () => {
    assert.equal(digital2Chinese(1010), '壹仟零壹拾');
  });
  it('带零的整数11010', () => {
    assert.equal(digital2Chinese(11010), '壹万壹仟零壹拾');
  });
  it('带零的整数66011', () => {
    assert.equal(digital2Chinese(66011), '陆万陆仟零壹拾壹');
  });
  it('带零的整数11100', () => {
    assert.equal(digital2Chinese(11100), '壹万壹仟壹佰');
  });
  it('100000000', () => {
    assert.equal(digital2Chinese(100000000), '壹亿');
  });
  it('10000000', () => {
    assert.equal(digital2Chinese(10000000), '壹仟万');
  });
  it('1000000', () => {
    assert.equal(digital2Chinese(1000000), '壹佰万');
  });
  it('100000', () => {
    assert.equal(digital2Chinese(100000), '壹拾万');
  });
  it('10000', () => {
    assert.equal(digital2Chinese(10000), '壹万');
  });
  it('1000', () => {
    assert.equal(digital2Chinese(1000), '壹仟');
  });
  it('100', () => {
    assert.equal(digital2Chinese(100), '壹佰');
  });
  console.log(() => {throw new Error('1')});
  it('不能为空', () => {
    assert.throws(() => digital2Chinese(), /不能为空/, '没有抛出期望的信息');
  });
  it('不能为空', () => {
    assert.throws(() => digital2Chinese(''), /不能为空/, '没有抛出期望的信息');
  });
  it('含有无效字符！', () => {
    assert.throws(() => digital2Chinese('1a1'), /含有无效字符！/, '没有抛出期望的信息');
  });
  it('数字的格式不正确！', () => {
    assert.throws(() => digital2Chinese('111,1,11'), /数字的格式不正确！/, '没有抛出期望的信息');
  });
  it('金额过大，应小于1000亿元！', () => {
    assert.throws(() => digital2Chinese('12345678987654321'), /金额过大，应小于1000亿元！/, '没有抛出期望的信息');
  });
});