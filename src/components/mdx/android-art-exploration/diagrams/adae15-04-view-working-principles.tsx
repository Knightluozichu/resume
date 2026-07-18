import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第4章 View的工作原理",
  "4.1 初识ViewRoot和DecorView",
  "4.2 理解MeasureSpec",
  "4.2.1 MeasureSpec",
  "4.2.2 MeasureSpec和LayoutParams的对应关系",
  "4.3 View的工作流程",
  "4.3.1 measure过程",
  "4.3.2 layout过程",
  "4.3.3 draw过程",
  "4.4 自定义View",
  "4.4.1 自定义View的分类",
  "4.4.2 自定义View须知",
  "4.4.3 自定义View示例",
  "4.4.4 自定义View的思想"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第4章 View的工作原理" focus="沿ViewRoot、DecorView、MeasureSpec、measure/layout/draw三阶段实现可验证的自定义View" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第4章 View的工作原理" focus="在onDraw分配对象、忽略padding与建议尺寸，或把测量尺寸和布局位置混为一谈" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第4章 View的工作原理" focus="View树、MeasureSpec表、三阶段调用轨迹、尺寸断言和自定义View检查单" nodes={nodes} />; }
