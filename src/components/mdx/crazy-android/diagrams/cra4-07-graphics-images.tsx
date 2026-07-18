import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第7章 图形与图像处理",
  "7.1 使用简单图片",
  "7.1.1 使用Drawable对象",
  "7.1.2 Bitmap和BitmapFactory",
  "7.1.3 Android 9新增的ImageDecoder",
  "7.2 绘图",
  "7.2.1 Android绘图基础：Canvas、Paint等",
  "7.2.2 Path类",
  "7.2.3 绘制游戏动画",
  "实例：采用双缓冲实现画图板",
  "实例：弹球游戏",
  "7.3 图形特效处理",
  "7.3.1 使用Matrix控制变换",
  "7.3.2 使用drawBitmapMesh扭曲图像",
  "实例：可揉动的图片",
  "7.3.3 使用Shader填充图形",
  "7.4 逐帧（Frame）动画",
  "7.4.1 AnimationDrawable与逐帧动画",
  "7.4.2 实例：在指定点爆炸",
  "7.5 补间（Tween）动画",
  "7.5.1 Tween动画与Interpolator",
  "7.5.2 位置、大小、旋转度、透明度改变的补间动画",
  "实例：蝴蝶飞舞",
  "7.5.3 自定义补间动画",
  "7.6 Android 8增强的属性动画",
  "7.6.1 属性动画的API",
  "7.6.2 使用属性动画",
  "实例：大珠小珠落玉盘",
  "7.7 使用SurfaceView实现动画",
  "7.7.1 SurfaceView的绘图机制",
  "7.7.2 实例：基于SurfaceView开发示波器",
  "7.8 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第7章 图形与图像处理" focus="以Bitmap、Canvas、Paint、Path、Matrix、Shader、逐帧/补间/属性动画和SurfaceView完成图像流水线" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第7章 图形与图像处理" focus="以Bitmap、Canvas、Paint、Path、Matrix、Shader、逐帧/补间/属性动画和SurfaceView完成图像流水线" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第7章 图形与图像处理" focus="像素输出、帧时间、内存预算、动画时间线、Surface生命周期和资源释放记录" nodes={nodes} />; }
