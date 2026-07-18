import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第10章 GUI系统之窗口管理员——WMS",
  "10.1 窗口管理员——WMS综述",
  "10.1.1 WMS的启动",
  "10.1.2 WMS的基础功能",
  "10.1.3 WMS的工作方式",
  "10.1.4 WMS、AMS与Activity间的联系",
  "10.2 窗口属性",
  "10.2.1 窗口类型与层级",
  "10.2.2 窗口策略（Window Policy）",
  "10.2.3 窗口属性（LayoutParams）",
  "10.3 窗口的添加过程",
  "10.3.1 系统窗口的添加过程",
  "10.3.2 Activity窗口的添加过程",
  "10.3.3 窗口添加实例",
  "10.4 Surface管理",
  "10.4.1 Surface申请流程（relayout）",
  "10.4.2 Surface的跨进程传递",
  "10.4.3 Surface的业务操作",
  "10.5 performLayoutAndPlaceSurfacesLockedInner",
  "10.6 窗口大小的计算过程",
  "10.7 启动窗口的添加与销毁",
  "10.7.1 启动窗口的添加",
  "10.7.2 启动窗口的销毁",
  "10.8 窗口动画",
  "10.8.1 窗口动画类型",
  "10.8.2 动画流程跟踪——WindowStateAnimator",
  "10.8.3 AppWindowAnimator",
  "10.8.4 动画的执行过程"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第10章 GUI系统之窗口管理员——WMS" focus="从WMS职责、窗口属性与添加流程进入Surface、布局、启动窗口和动画" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第10章 GUI系统之窗口管理员——WMS" focus="只在应用侧解释窗口，遗漏WMS策略、Token、Surface分配和启动窗口替换时序" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第10章 GUI系统之窗口管理员——WMS" focus="WindowToken、类型层级、LayoutParams、add/relayout、Surface跨进程、窗口帧与动画状态" nodes={nodes}/>;}
