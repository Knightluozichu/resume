import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第9章 使用ContentProvider实现数据共享",
  "9.1 数据共享标准：ContentProvider",
  "9.1.1 ContentProvider简介",
  "9.1.2 Uri简介",
  "9.1.3 使用ContentResolver操作数据",
  "9.2 开发ContentProvider",
  "9.2.1 ContentProvider与ContentResolver的关系",
  "9.2.2 开发ContentProvider子类",
  "9.2.3 配置ContentProvider",
  "9.2.4 使用ContentResolver调用方法",
  "9.2.5 创建ContentProvider的说明",
  "实例：使用ContentProvider共享单词数据",
  "9.3 操作系统的ContentProvider",
  "9.3.1 使用ContentProvider管理联系人",
  "9.3.2 使用ContentProvider管理多媒体内容",
  "9.4 监听ContentProvider的数据改变",
  "9.4.1 ContentObserver简介",
  "9.4.2 实例：监听用户发出的短信",
  "9.5 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第9章 使用ContentProvider实现数据共享" focus="通过ContentProvider、ContentResolver、URI、系统Provider和ContentObserver完成受权限保护的数据共享" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第9章 使用ContentProvider实现数据共享" focus="通过ContentProvider、ContentResolver、URI、系统Provider和ContentObserver完成受权限保护的数据共享" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第9章 使用ContentProvider实现数据共享" focus="Provider合同、URI表、权限矩阵、CRUD测试和观察者通知轨迹" nodes={nodes} />; }
