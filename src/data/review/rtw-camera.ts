import type { ReviewQuestion } from "./types";

/** 相机与光线生成 复习题 */
export const rtwCameraQuestions: ReviewQuestion[] = [
  {
    id: "rtw-camera-1",
    chapter: "rtw-camera",
    level: 1,
    question: "相机由哪三个向量描述视口？get_ray(u,v) 的方向是什么？",
    answer: "lower_left_corner（左下角）、horizontal（水平跨度）、vertical（垂直跨度）。方向 = lower_left_corner + u·horizontal + v·vertical − origin，即从相机起点指向视口上 (u,v) 对应点。",
    tags: ["视口", "get_ray"],
  },
  {
    id: "rtw-camera-2",
    chapter: "rtw-camera",
    level: 2,
    question: "fov 与视口尺寸的关系是什么？fov 大是广角还是长焦？",
    answer: "h=tan(θ/2)，viewport_height=2h，viewport_width=aspect×viewport_height。fov 越大 h 越大、视口越宽，视野越广（广角）；fov 越小视口越窄，像长焦镜头把远处物体「拉近压缩」。",
    tags: ["fov", "视场角"],
  },
  {
    id: "rtw-camera-3",
    chapter: "rtw-camera",
    level: 3,
    question: "fov=90°、宽高比 16:9、焦距 1 时，视口宽高各是多少？",
    answer: "θ=90°，h=tan(45°)=1，viewport_height=2，viewport_width=(16/9)×2≈3.556。视口比图像更宽以匹配 16:9 的宽高比。",
    tags: ["手算", "视口尺寸"],
  },
  {
    id: "rtw-camera-4",
    chapter: "rtw-camera",
    level: 4,
    question: "为什么在像素内对 u、v 加随机抖动再发射光线能抗锯齿？采样数太少会怎样？",
    answer: "抖动使每个像素多次采样落在视口上略微不同的点，平均后边缘像素的颜色是「半覆盖」的真实比例，锯齿被柔化。采样太少时方差大，画面出现明显噪点；采样越多越平滑，但耗时线性增长，需在画质与性能间权衡。",
    tags: ["综合", "抗锯齿", "采样"],
  },
];
