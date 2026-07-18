import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第19章 Android常用的工具小插件——Widget机制",
  "19.1 功能的提供者——AppWidgetProvider",
  "19.2 AppWidgetHost"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第19章 Android常用的小插件——Widget机制" focus="连接AppWidgetProvider与AppWidgetHost的远程视图更新机制" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第19章 Android常用的小插件——Widget机制" focus="把Widget当作普通View直接更新，忽略跨进程RemoteViews限制与Host所有权" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第19章 Android常用的小插件——Widget机制" focus="Widget ID、广播、RemoteViews、Host绑定、更新周期、进程死亡和点击PendingIntent" nodes={nodes}/>;}
