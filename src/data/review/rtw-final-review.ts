import type { ReviewQuestion } from "./types";

/** Ray Tracing in One Weekend 总复习 复习题 */
export const rtwFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "rtw-final-review-1",
    chapter: "rtw-final-review",
    level: 1,
    question: `把全书数据流串成一条链。`,
    answer: `相机 get_ray 产射线 → world.hit 求交得 hit_record → mat_ptr->scatter 算衰减与散射方向 → ray_color 递归 → 多次采样平均 → write_color 伽马校正输出。`,
    tags: ["数据流"],
  },
  {
    id: "rtw-final-review-2",
    chapter: "rtw-final-review",
    level: 2,
    question: `三类材质的散射方向本质区别是什么？`,
    answer: `漫反射：N + 随机单位向量（余弦加权）；金属：reflect(d,N) + fuzz 模糊（镜面反射加扰动）；电介质：Snell 折射，全内反射时走反射，按 Schlick 概率选反射/折射。三者衰减分别为 albedo、金属色、约白。`,
    tags: ["材质对照"],
  },
  {
    id: "rtw-final-review-3",
    chapter: "rtw-final-review",
    level: 3,
    question: `渲染出「整体偏暗」和「画面穿透选远点」各对应数据流哪一环、根因是什么？`,
    answer: `偏暗对应 write_color 环节，根因是漏伽马校正（未对通道开平方），线性值直接映射压暗中间调。穿透/选远点对应 world.hit 环节，根因是 hittable_list 遍历时未收紧 t_max，后命中的更远物体覆盖了近物体。`,
    tags: ["bug 诊断"],
  },
  {
    id: "rtw-final-review-4",
    chapter: "rtw-final-review",
    level: 4,
    question: `渲染出「玻璃球发黑、其余正常」，给出诊断思路与可能根因。`,
    answer: `只有玻璃出问题，说明 get_ray、hit、采样、伽马都正常，问题在 scatter 或递归深度。可能根因：(1) max_depth 太小，光进玻璃后没折射出来被截断成黑——调大 depth；(2) 漏判全内反射，refract 产生非法向量——补 cannot_refract 走 reflect；(3) front_face 搞反导致 ratio 错误、折射方向失真。逐一核对电介质 scatter 代码定位修复。`,
    tags: ["综合", "诊断", "电介质"],
  },
];
