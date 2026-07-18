import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第13章 综合技术",
  "13.1 使用CrashHandler来获取应用的crash信息",
  "13.2 使用multidex来解决方法数越界",
  "13.3 Android的动态加载技术",
  "13.4 反编译初步",
  "13.4.1 使用dex2jar和jd-gui反编译apk",
  "13.4.2 使用apktool对apk进行二次打包"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第13章 综合技术" focus="建立CrashHandler、multidex、动态加载与反编译/重打包实验，理解诊断、构建和代码边界" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第13章 综合技术" focus="收集崩溃时泄露敏感数据，或把动态加载与二次打包当作无信任边界的普通功能" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第13章 综合技术" focus="崩溃包、方法数报告、类加载图、签名差异、反编译结果和安全边界" nodes={nodes} />; }
