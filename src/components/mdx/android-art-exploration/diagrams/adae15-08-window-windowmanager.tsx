import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第8章 理解Window和WindowManager",
  "8.1 Window和WindowManager",
  "8.2 Window的内部机制",
  "8.2.1 Window的添加过程",
  "8.2.2 Window的删除过程",
  "8.2.3 Window的更新过程",
  "8.3 Window的创建过程",
  "8.3.1 Activity的Window创建过程",
  "8.3.2 Dialog的Window创建过程",
  "8.3.3 Toast的Window创建过程"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第8章 理解Window和WindowManager" focus="沿WindowManager接口、WindowManagerGlobal、ViewRootImpl和WMS解释Window添加、删除、更新及三类创建过程" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第8章 理解Window和WindowManager" focus="在无效token或已销毁Context上添加Window，或忘记移除导致WindowLeaked" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第8章 理解Window和WindowManager" focus="跨进程调用图、token表、add/remove/update轨迹、Activity/Dialog/Toast对照和泄漏测试" nodes={nodes} />; }
