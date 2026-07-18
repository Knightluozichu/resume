import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第4章 软件也要拼脸蛋，UI开发的点点滴滴",
  "4.1 该如何编写程序界面",
  "4.2 常用控件的使用方法",
  "4.3 详解3种基本布局",
  "4.4 系统控件不够用？创建自定义控件",
  "4.5 最常用和最难用的控件：ListView",
  "4.6 更强大的滚动控件：RecyclerView",
  "4.7 编写界面的最佳实践",
  "4.8 Kotlin课堂：延迟初始化和密封类",
  "4.9 小结与点评"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第4章 软件也要拼脸蛋，UI开发的点点滴滴" focus="从XML/View测量布局、常用控件、三类布局、自定义控件、ListView与RecyclerView复用建立可访问且稳定的界面" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第4章 软件也要拼脸蛋，UI开发的点点滴滴" focus="实现同一列表的ListView和RecyclerView版本，在长列表、旋转、字体放大和快速滚动下比较绑定、复用和状态" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第4章 软件也要拼脸蛋，UI开发的点点滴滴" focus="测量布局图、RecyclerView复用轨迹、多尺寸截图、无障碍与交互状态检查表" nodes={nodes} />; }
