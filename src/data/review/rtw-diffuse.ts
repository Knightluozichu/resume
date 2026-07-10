import type { ReviewQuestion } from "./types";

/** 漫反射与兰伯特模型 复习题 */
export const rtwDiffuseQuestions: ReviewQuestion[] = [
  {
    id: "rtw-diffuse-1",
    chapter: "rtw-diffuse",
    level: 1,
    question: `兰伯特余弦律的物理含义是什么？`,
    answer: `漫反射表面的亮度正比于入射光与法线夹角 θ 的余弦 cosθ。光线越斜（θ 越大），单位面积分到的能量越少，表面越暗；正入射最亮。`,
    tags: ["兰伯特"],
  },
  {
    id: "rtw-diffuse-2",
    chapter: "rtw-diffuse",
    level: 2,
    question: `为什么散射方向用 N + 随机单位向量能近似余弦分布？`,
    answer: `在单位球面上均匀采样得到 s，加到法线 N 上后，合成方向 d 与 N 夹角越大概率越小，自然产生与 cosθ 成正比的密度，正是兰伯特律要求的分布。无需显式算余弦，几何采样内置了正确加权。`,
    tags: ["散射方向", "采样"],
  },
  {
    id: "rtw-diffuse-3",
    chapter: "rtw-diffuse",
    level: 3,
    question: `写入像素前为什么要开平方（伽马校正）？不做会怎样？`,
    answer: `光能量累加是线性的，但显示器亮度与信号约呈 γ=2.2 非线性。不做伽马校正时线性值直接映射会压暗中间调，画面整体偏暗发灰。开平方（γ=2 近似）把线性值提亮回感知均匀的亮度，灰墙才自然。`,
    tags: ["伽马校正", "write_color"],
  },
  {
    id: "rtw-diffuse-4",
    chapter: "rtw-diffuse",
    level: 4,
    question: `采样数从 1 加到 100，漫反射球的噪点如何变化？为什么不能一次就消净？`,
    answer: `噪点随采样数增加而减少（方差与 1/N 成正比），表面越来越平滑。但蒙特卡洛积分的收敛是 √N 级，想噪声减半需 4 倍采样，无法一次消净；只能用更多采样或更优采样策略（如重要性采样）在画质与耗时间权衡。`,
    tags: ["综合", "采样", "蒙特卡洛"],
  },
];
