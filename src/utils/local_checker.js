/* #245局部参数校验
 * *
 * 创建：2018-03-27 */


// 错误元素定位
const _triggerPosition = ({ $el, value, rule, isInit }, _message) => {
  if (!$el || isInit) return;

  const $elContainer = $el.parentElement;
  $elContainer.classList.add('_relative');
  $el.classList.add('check_error');

  let $message = $elContainer.getElementsByClassName('check_error_msg')[0];
  if (!$message) {
    $message = document.createElement('p');
    $elContainer.appendChild($message);
    $message.classList.add('check_error_msg');
  }
  $message.innerHTML = _message;
};

// 清除错误元素定位
const _clearTrigger = ({ $el }) => {
  const $elContainer = $el.parentElement;
  let $message = $elContainer.getElementsByClassName('check_error_msg')[0];
  if ($message) {
    $elContainer.removeChild($message);
    $elContainer.classList.remove('_relative');
    $el.classList.remove('check_error');
  }
};

// 检查参数是否为空
const _checkRequired = (info) => {
  const { value, rule } = info;

  if (typeof value === 'undefined' || value === '') {
    let _message = `${ rule.label }不能为空`;
    _triggerPosition(info, _message);
    return false;
  }

  return true;
};

// 检查正则
const _checkReg = (info) => {
  const { value, rule } = info;

  if (!rule.regs || !rule.regs.length) return true;

  for (let i = 0, len = rule.regs.length; i < len; i++) {
    let _i = rule.regs[i];
    let { reg, message } = _i;

    if (!reg.test(value)) {
      let _message = `${ rule.label }${ message }`;
      _triggerPosition(info, _message);
      return false;
    }
  }

  return true;
};

// 校验
const localChecker = (info) => {
  const { value, rule } = info;

  // 如果参数标定为非必填项并且值为空，则跳过验证
  if (!rule && rule.required === false && value === '') return true;

  // 检查参数是否为空
  if (!_checkRequired(info)) return false;

  // 检查正则
  if (!_checkReg(info)) return false;

  _clearTrigger(info);
  return true;
};

export default localChecker;
