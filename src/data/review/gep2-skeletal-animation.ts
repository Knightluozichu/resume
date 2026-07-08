import type { ReviewQuestion } from "./types";

export const gep2SkeletalAnimationQuestions: ReviewQuestion[] = [
  {
    id: "gep2-skeletal-animation-1",
    chapter: "gep2-skeletal-animation",
    level: 1,
    question: "骨骼动画中「骨骼层级」和「蒙皮」分别是什么？",
    answer:
      "骨骼层级是一棵树（Root→Spine→Neck→Head 等），子骨骼继承父骨骼的变换，局部矩阵自顶向下相乘得到世界矩阵。蒙皮是让网格顶点跟随骨骼的技术：每个顶点绑定若干骨骼及权重，最终位置 = Σ wᵢ·Mᵢ·v，骨骼动则顶点平滑跟随。",
    tags: ["骨骼层级", "蒙皮"],
  },
  {
    id: "gep2-skeletal-animation-2",
    chapter: "gep2-skeletal-animation",
    level: 2,
    question:
      "蒙皮公式 v&apos; = Σ wᵢ·Mᵢ·v 中的 Mᵢ（蒙皮矩阵）是怎么算出来的？",
    answer:
      "Mᵢ = offsetMatrixᵢ · poseMatrixᵢ。offsetMatrix（绑定姿势逆矩阵）把顶点从模型空间转到「该骨骼的绑定空间」，是美术建模时的固定数据；poseMatrixᵢ 是当前帧该骨骼的世界姿势矩阵。两者相乘表示「顶点先回到骨骼空间，再随骨骼当前姿势变换到新位置」。权重 wᵢ 之和为 1，多块骨骼加权混合才平滑。",
    tags: ["蒙皮矩阵", "offset", "pose"],
  },
  {
    id: "gep2-skeletal-animation-3",
    chapter: "gep2-skeletal-animation",
    level: 3,
    question: "为什么一个顶点通常绑定最多 4 块骨骼？更多骨骼会怎样？",
    answer:
      "4 块是 GPU 着色器实现的常用上限：顶点属性里存 4 个骨骼索引（uvec4）+ 4 个权重（vec4），刚好填满一个寄存器组，访问高效。更多骨骼需要拆成多个属性槽或多次 draw，增加带宽和指令开销。实际肘部、膝盖这类弯曲处 2-3 块骨骼已足够平滑；更多骨骼收益递减却显著增加 GPU 负担。这是精度与性能的工程权衡。",
    tags: ["权重", "GPU", "权衡"],
  },
  {
    id: "gep2-skeletal-animation-4",
    chapter: "gep2-skeletal-animation",
    level: 4,
    question:
      "为什么美术只调骨骼关键帧，引擎就能让顶点动？整个数据流是怎样的？",
    answer:
      "美术在 DCC 工具里对骨骼摆姿势并存关键帧（每骨骼几个 4×4 矩阵），不存每顶点动画。运行时：①动画系统按时间在关键帧间插值得到每骨骼局部姿势；②自顶向下把局部矩阵相乘，累积出每骨骼世界矩阵；③算蒙皮矩阵 Mᵢ=offset·pose；④顶点着色器里用 Mᵢ 和权重算最终位置。关键在于「骨骼数量远少于顶点」，存骨骼动画数据量小，蒙皮在 GPU 并行算，CPU 不碰每顶点。这就是骨骼动画相比「每顶点关键帧」省存储又省 CPU 的原因。",
    tags: ["数据流", "综合", "GPU蒙皮"],
  },
];
