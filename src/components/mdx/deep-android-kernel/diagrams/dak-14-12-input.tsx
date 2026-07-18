import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第12章 问渠哪得清如许，为有源头活水来——InputManagerService与输入事件",
  "12.1 事件的分类",
  "12.2 事件的投递流程",
  "12.2.1 InputManagerService",
  "12.2.2 InputReaderThread",
  "12.2.3 InputDispatcherThread",
  "12.2.4 ViewRootImpl对事件的派发"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第12章 InputManagerService与输入事件" focus="从事件分类进入InputManagerService、InputReaderThread、InputDispatcherThread和ViewRootImpl派发" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第12章 InputManagerService与输入事件" focus="从View.dispatchTouchEvent反向猜输入全链，遗漏Reader、Dispatcher、窗口通道和ANR边界" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第12章 InputManagerService与输入事件" focus="内核事件、设备映射、窗口目标、队列时序、超时、坐标变换与应用消费结果" nodes={nodes}/>;}
