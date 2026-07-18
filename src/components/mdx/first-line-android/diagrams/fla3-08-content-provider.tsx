import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第8章 跨程序共享数据，探究ContentProvider",
  "8.1 ContentProvider简介",
  "8.2 运行时权限",
  "8.3 访问其他程序中的数据",
  "8.4 创建自己的ContentProvider",
  "8.5 Kotlin课堂：泛型和委托",
  "8.6 小结与点评"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第8章 跨程序共享数据，探究ContentProvider" focus="理解ContentProvider、ContentResolver、URI、运行时权限、跨进程CRUD和泛型委托，并建立最小授权边界" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第8章 跨程序共享数据，探究ContentProvider" focus="读取系统联系人并实现自有Provider，测试授权拒绝、非法URI、projection/selection输入、并发访问和游标关闭" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第8章 跨程序共享数据，探究ContentProvider" focus="URI合同、权限与导出矩阵、游标所有权图、Provider并发与注入测试" nodes={nodes} />; }
