const isNumber = (args) => Object.prototype.toString.call(args) === '[object Number]';

const chineseMap = {
  0: '零',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
};

const unit = ['', '十', '百', '千', '万'];
const units = ['', '万', '亿'];

function transformInt(num) {
  const result = `${num}`.split('').reverse().map((item, index) => +item ? `${chineseMap[item]}${unit[index]}` : '零');
  return Array.from(new Set(result)).reverse().join('');
}

const transformDec = (num) => `${num}`.split('').map((item, index) => chineseMap[item]).join('');

function split(num) {
  let tmp = '';
  const list = `${num}`.split('').reduce((result, current) => {
    tmp += current;
    if (tmp.length === 4) {
      result.push(tmp);
      tmp = '';
    }
    return result;
  }, []);
  if (tmp) list.push(tmp);
  return list;
}

function main(num) {
  if (!isNumber(num)) throw new Error('need enter number.');

  const numStr = `${num}`;
  const nums = numStr.split('.');
  const integer = nums[0];
  const decimal = nums[1] || '';
  const decimalChinese = transformDec(decimal);
  if (`${integer}`.length <= 4 && !decimalChinese) return transformInt(integer);

  const integerList = split(integer).reverse().map(item => transformInt(item));
  const IntegerChinese = integerList.map((item, index) => `${item}${units[index]}`).reverse().join('');
  if (decimalChinese) return `${IntegerChinese}点${decimalChinese}`;
  return IntegerChinese;
};

module.export = main;
