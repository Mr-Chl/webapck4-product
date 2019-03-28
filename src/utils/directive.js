import Checker from '@/utils/local_checker';
import Store from '@/store';

export default {
  install(Vue) {
    // #245局部参数验证
    Vue.directive('checker', {
      // 将参数注册到store的所须交验的参数集合中
      bind(el, binding, vnode, oldVnode) {
        const value = vnode.data.model.value;
        const rule = binding.value;
        const label = `${ rule.label }_${ vnode.componentInstance._uid }`;
        const component = vnode.context.$el.className;

        Store.dispatch('checkRegister', {
          component: component,
          label: label,
          // 如果value有值代表绑定之初就有值，可以看作是回填数据
          // 回填数据绑定时就触发校验，因为update时value和oldValue是相同的，不会触发update
          status: value ? Checker({
            $el: el,
            value: value,
            rule: rule,
          }) : false,
        });
      },

      // 每次update时候更新校验结果
      update(el, binding, vnode, oldVnode) {
        const value = vnode.data.model.value;
        const oldValue = oldVnode.data.model.value;
        const rule = binding.value;
        const label = `${ rule.label }_${ vnode.componentInstance._uid }`;
        const component = vnode.context.$el.className;

        if (rule.disabled) return;

        // 通过比较更新前后的绑定值，可以忽略不必要的模板更新
        if (value === oldValue) return;

        Store.dispatch('checkRegister', {
          component: component,
          label: label,
          status: Checker({
            $el: el,
            value: value,
            rule: rule,
          }),
        });
      },

      // 当节点销毁时销毁Store中的组件状态
      unbind(el, binding, vnode, oldVnode) {
        const rule = binding.value;
        const label = `${ rule.label }_${ oldVnode.componentInstance._uid }`;
        const component = vnode.context.$el.className;
        Store.dispatch('checkRegister', {
          label: label,
          component: component,
          destroy: true,
        });
      },
    });
  },
};
