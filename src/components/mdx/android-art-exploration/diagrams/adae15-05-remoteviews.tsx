import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第5章 理解RemoteViews",
  "5.1 RemoteViews的应用",
  "5.1.1 RemoteViews在通知栏上的应用",
  "5.1.2 RemoteViews在桌面小部件上的应用",
  "5.1.3 PendingIntent概述",
  "5.2 RemoteViews的内部机制",
  "5.3 RemoteViews的意义"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第5章 理解RemoteViews" focus="在通知与桌面小部件中使用受限View操作和PendingIntent，并解释RemoteViews跨进程apply/reapply机制" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第5章 理解RemoteViews" focus="把RemoteViews当普通View树操作，或复用错误PendingIntent导致动作被覆盖" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第5章 理解RemoteViews" focus="通知样本、小部件更新、PendingIntent身份矩阵、跨进程操作列表和失败日志" nodes={nodes} />; }
