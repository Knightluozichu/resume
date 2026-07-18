import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第3章 Android编译系统",
  "3.1 Makefile入门",
  "3.2 Android编译系统",
  "3.2.1 Makefile依赖树的概念",
  "3.2.2 树根节点droid",
  "3.2.3 main.mk解析",
  "3.2.4 droidcore节点",
  "3.2.5 dist_files",
  "3.2.6 Android.mk的编写规则"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第3章 Android编译系统" focus="从Makefile入门追踪依赖树、droid、main.mk、droidcore、dist_files和Android.mk规则" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第3章 Android编译系统" focus="只记make目标名称，不验证变量继承、依赖边和产物为何进入目标映像" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第3章 Android编译系统" focus="目标依赖图、变量展开、构建命令、增量失效、dist产物与模块安装路径" nodes={nodes}/>;}
