import type { ReviewQuestion } from "./types";

/** 最终场景渲染 复习题 */
export const rtwFinalSceneQuestions: ReviewQuestion[] = [
  {
    id: "rtw-final-scene-1",
    chapter: "rtw-final-scene",
    level: 1,
    question: `最终场景由哪三部分构成？地面用什么实现？`,
    answer: `三部分：极大漫反射球当地面（半径 1000）、三个主角球（哑光、金属、玻璃）、循环生成的上百个随机小球。地面用一个大半径的漫反射球实现，从内部看就是一片平面大地。`,
    tags: ["场景构成"],
  },
  {
    id: "rtw-final-scene-2",
    chapter: "rtw-final-scene",
    level: 2,
    question: `为什么最终场景要大量随机小球而不是几个大球？材质按概率分配有什么好处？`,
    answer: `大量随机小球提供丰富的反射/折射细节——玻璃球映出无数小球倒影、金属球反射周围彩色小球，能充分检验光线追踪是否正确。按概率分配材质（多漫反射、少金属/玻璃）让画面分布自然、有视觉重点，避免全是镜面或全哑光的呆板感，接近真实材质比例。`,
    tags: ["随机小球", "材质抽样"],
  },
  {
    id: "rtw-final-scene-3",
    chapter: "rtw-final-scene",
    level: 3,
    question: `阅读随机小球生成代码：if ((center−point3(4,0.2,0)).length()>0.9) 这个判断的作用是什么？`,
    answer: `它判断候选小球中心与主角球（中心 (4,0.2,0)、半径 0.2）的距离是否大于 0.9，只有大于才生成，从而避开主角球所在区域，防止随机小球生成在主角球内部导致几何穿插和奇怪交线。`,
    tags: ["读代码", "避让"],
  },
  {
    id: "rtw-final-scene-4",
    chapter: "rtw-final-scene",
    level: 4,
    question: `把 max_depth 从 50 降到 1，玻璃球会变成什么样？采样数和深度应如何权衡？`,
    answer: `max_depth=1 时光线进入玻璃后还没折射出来就到递归上限被截断成黑色，玻璃球变黑、看不到内部和透射。采样数影响噪点（太少满是噪点）、深度影响反射/折射层次（太浅玻璃镜面发黑）；两者都不能太小，但盲目调大收益递减（采样 √N 收敛、深层贡献趋零），典型取 samples=500、depth=50 在画质与耗时间权衡。`,
    tags: ["综合", "max_depth", "权衡"],
  },
];
