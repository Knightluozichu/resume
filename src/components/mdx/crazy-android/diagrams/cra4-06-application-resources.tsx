import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第6章 Android应用资源",
  "6.1 应用资源概述",
  "6.1.1 资源的类型及存储方式",
  "6.1.2 使用资源",
  "6.2 字符串、颜色、尺寸资源",
  "6.2.1 颜色值的定义",
  "6.2.2 定义字符串、颜色、尺寸资源文件",
  "6.2.3 使用字符串、颜色、尺寸资源",
  "6.3 数组（Array）资源",
  "6.4 使用Drawable资源",
  "6.4.1 图片资源",
  "6.4.2 StateListDrawable资源",
  "实例：高亮显示正在输入的文本框",
  "6.4.3 LayerDrawable资源",
  "实例：定制拖动条的外观",
  "6.4.4 ShapeDrawable资源",
  "实例：椭圆形、渐变背景的文本框",
  "6.4.5 ClipDrawable资源",
  "实例：徐徐展开的风景",
  "6.4.6 AnimationDrawable资源",
  "6.5 属性动画（Property Animation）资源",
  "实例：不断渐变的背景色",
  "6.6 使用原始XML资源",
  "6.6.1 定义原始XML资源",
  "6.6.2 使用原始XML文件",
  "6.7 使用布局（Layout）资源",
  "6.8 使用菜单（Menu）资源",
  "6.9 样式（Style）和主题（Theme）资源",
  "6.9.1 样式资源",
  "6.9.2 主题资源",
  "实例：给所有窗口添加边框、背景",
  "6.10 属性（Attribute）资源",
  "6.11 使用原始资源",
  "6.12 国际化",
  "6.12.1 为Android应用提供国际化资源",
  "6.12.2 国际化Android应用",
  "6.13 自适应不同屏幕的资源",
  "6.14 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第6章 Android应用资源" focus="从资源类型、R引用、Drawable、动画、XML、布局、菜单、Style、Theme、Attribute和限定符建立适配体系" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第6章 Android应用资源" focus="从资源类型、R引用、Drawable、动画、XML、布局、菜单、Style、Theme、Attribute和限定符建立适配体系" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第6章 Android应用资源" focus="资源限定符决策表、Drawable状态图、主题解析链、国际化与多屏截图" nodes={nodes} />; }
