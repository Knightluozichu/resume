import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第5章 手机平板要兼顾，探究Fragment",
  "5.1 Fragment是什么",
  "5.2 Fragment的使用方式",
  "5.3 Fragment的生命周期",
  "5.4 动态加载布局的技巧",
  "5.5 Fragment的最佳实践：一个简易版的新闻应用",
  "5.6 Kotlin课堂：扩展函数和运算符重载",
  "5.7 小结与点评"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第5章 手机平板要兼顾，探究Fragment" focus="区分Fragment实例、View生命周期和宿主Activity生命周期，用动态布局与新闻应用验证双栏适配和状态恢复" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第5章 手机平板要兼顾，探究Fragment" focus="实现手机单栏和平板双栏新闻界面，旋转并切换后台，核对Fragment实例、View重建、选中项和回退栈" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第5章 手机平板要兼顾，探究Fragment" focus="三层生命周期图、Fragment事务与回退栈记录、单双栏状态模型、视图绑定清理测试" nodes={nodes} />; }
