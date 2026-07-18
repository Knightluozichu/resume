import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第1章 Android系统简介",
  "1.1 Android系统发展历程",
  "1.2 Android系统特点",
  "1.3 Android系统框架"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第1章 Android系统简介" focus="从发展历程、系统特点和四层框架建立Android 4.3整体坐标" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第1章 Android系统简介" focus="把Linux内核、Native库、Runtime、Framework和应用层画成互不交互的静态堆叠" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第1章 Android系统简介" focus="版本时间线、框架分层图、进程与库边界、设备启动基线" nodes={nodes}/>;}
