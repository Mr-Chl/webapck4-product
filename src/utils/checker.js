/* 表单校验
 * *
 * 创建：2018-01-08 */


// 错误元素定位
const _triggerPosition = (domId) => {
  if (!domId) return;
  let el = document.getElementById(domId);
  el.classList.add('params_error');
  el.scrollIntoView();

  let scrollTop = 0;
  if (document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
    document.documentElement.scrollTop = scrollTop - 85;
  } else {
    scrollTop = document.body.scrollTop;
    document.body.scrollTop = scrollTop - 85;
  }

  let timer = setTimeout(() => {
    el.classList.remove('params_error');
    clearTimeout(timer);
  }, 3200);
};

// 检查是否为空
const _checkRequired = (value, label, domId) => {
  if (typeof value === 'undefined' || value === '') {
    window.vue.$message({ message: `${ label }不能为空！`, type: 'error' });
    _triggerPosition(domId);
    return false;
  }
  return true;
};

// 检查字符长度
const _checkLength = (value, label, limit, type, domId) => {
  switch (type) {
    case 'minLength':
      if (String(value).length < limit) {
        window.vue.$message({ message: `${ label }不能少于${ limit }字符！`, type: 'error' });
        _triggerPosition(domId);
        return false;
      }
      break;

    case 'maxLength':
      if (String(value).length > limit) {
        window.vue.$message({ message: `${ label }不能超过${ limit }字符！`, type: 'error' });
        _triggerPosition(domId);
        return false;
      }
      break;

    case 'maxValue':
      switch (typeof limit) {
        case 'number':
          if (Number(value) > limit) {
            window.vue.$message({ message: `${ label }不能超过最大值${ limit }！`, type: 'error' });
            _triggerPosition(domId);
            return false;
          }
          break;

        case 'object':
          if (Number(value) > limit.maxValue) {
            window.vue.$message({ message: `${ limit.message }`, type: 'error' });
            _triggerPosition(domId);
            return false;
          }
          break;
      }
      break;
  }
  return true;
};

// 检查通用正则
const _checkCommonReg = (value, label, reg, domId) => {
  if (!reg.test(value)) {
    window.vue.$message({ message: `请输入正确的${ label }！`, type: 'error' });
    _triggerPosition(domId);
    return false;
  }
  return true;
};

// 检查自定义正则
const _checkCustomReg = (value, label, regArr, domId) => {
  for (let i = 0, len = regArr.length; i < len; i++) {
    let _i = regArr[i];
    let { reg, message } = _i;

    if (!reg.test(value)) {
      window.vue.$message({ message: `${ label }${ message }`, type: 'error' });
      _triggerPosition(domId);
      return false;
    }
  }
  return true;
};

// 校验
const checker = (params, paramsMap) => {
  for (let paramsKey in params) {
    let paramsItem = params[paramsKey];
    if (
      typeof paramsItem === 'string' ||
      typeof paramsItem === 'undefined' ||
      typeof paramsItem === 'number'
    ) {
      if (typeof paramsMap[paramsKey] === 'string') {
        // 校验不携带配置项的参数
        // 仅校验简单非空情况，例如：paramsMap: { id: '用户ID' } => '用户ID不能为空'
        if (!_checkRequired(paramsItem, paramsMap[paramsKey])) return paramsKey;
      } else if (typeof paramsMap[paramsKey] === 'object') {
        // 如果参数标定为非必填项，则跳过验证
        if (!paramsItem && paramsMap[paramsKey].required === false) continue;

        // 校验携带配置项的参数
        let confs = paramsMap[paramsKey];

        for (let confKey in confs) {
          let confValue = confs[confKey];
          let { label, domId } = confs;

          // 免验金牌
          if (confs.depLabel && params[confs.depLabel] !== confs.depValue) continue;

          switch (confKey) {
            case 'label':
              if (!_checkRequired(paramsItem, label, domId)) return paramsKey;
              break;

            case 'minLength':
              if (!_checkLength(paramsItem, label, confValue, 'minLength', domId)) return paramsKey;
              break;

            case 'maxLength':
              if (!_checkLength(paramsItem, label, confValue, 'maxLength', domId)) return paramsKey;
              break;

            case 'maxValue':
              if (!_checkLength(paramsItem, label, confValue, 'maxValue', domId)) return paramsKey;
              break;

            case 'reg':
              if (typeof confValue === 'object' && confValue instanceof Array) {
                if (!_checkCustomReg(paramsItem, label, confValue, domId)) return paramsKey;
              } else {
                if (!_checkCommonReg(paramsItem, label, confValue, domId)) return paramsKey;
              }
              break;

            // case 'extra':
            //   if (typeof confValue === 'function') {
            //     if (!confValue(params[paramsKey], item)) {
            //       _triggerPosition(domId);
            //       return paramsKey;
            //     }
            //   }
            //   break;
          } // end switch
        } // end for
      } // end else if
    } else if (typeof paramsItem === 'object' && paramsItem instanceof Array && paramsMap[paramsKey]) {
      // 如果参数包含数组，则递归调用chacker
      for (let i = 0, len = paramsItem.length; i < len; i++) {
        let errorParams = '';
        if (paramsMap[paramsKey] instanceof Array) {
          errorParams = checker(paramsItem[i], paramsMap[paramsKey][i]);
        } else {
          errorParams = checker(paramsItem[i], paramsMap[paramsKey]);
        }
        if (errorParams) return errorParams;
      }
    } else if (typeof paramsItem === 'object' && paramsItem instanceof Object && paramsMap[paramsKey]) {
      // 如果参数为多维对象，则递归调用chacker
      let errorParams = checker(paramsItem, paramsMap[paramsKey]);
      if (errorParams) return errorParams;
    }

    // // 所通过的参数log
    // if (paramsMap[paramsKey]) {
    //   console.log(params, '<========当前校验集合');
    //   console.log(paramsKey, '<========校验通过');
    //   console.log(paramsItem, '<========值为');
    //   console.log(paramsMap[paramsKey], '<========校验规则为');
    //   console.log('======================');
    // }
  }

  return '';
};

export default checker;
