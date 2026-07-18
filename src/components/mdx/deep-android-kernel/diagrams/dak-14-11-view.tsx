import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第11章 让你的界面炫彩起来的GUI系统之View体系",
  "11.1 应用程序中的View框架",
  "11.2 Activity中View Tree的创建过程",
  "11.3 在WMS中注册窗口",
  "11.4 ViewRoot的基本工作方式",
  "11.5 View Tree的遍历时机",
  "11.6 View Tree的遍历流程",
  "11.7 View和ViewGroup属性",
  "11.7.1 View的基本属性",
  "11.7.2 ViewGroup的属性",
  "11.7.3 View、ViewGroup和ViewParent",
  "11.7.4 Callback接口",
  "11.8 作画工具集——Canvas",
  "11.8.1 绘制UI——Skia",
  "11.8.2 数据中介——Surface.lockCanvas",
  "11.8.3 解锁并提交结果——unlockCanvasAndPost",
  "11.9 draw和onDraw",
  "11.10 View中的消息传递",
  "11.10.1 View中TouchEvent的投递流程",
  "11.10.2 ViewGroup中TouchEvent的投递流程",
  "11.11 View动画"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第11章 GUI系统之View体系" focus="追踪View Tree创建、WMS注册、ViewRoot遍历、属性、Canvas、draw、触摸投递和动画" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第11章 GUI系统之View体系" focus="只看View.onDraw，忽略窗口注册、遍历触发、父子测量、Surface提交和事件消费" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第11章 GUI系统之View体系" focus="DecorView树、ViewRootImpl、traversal调度、measure/layout/draw、Canvas提交与TouchEvent路径" nodes={nodes}/>;}
