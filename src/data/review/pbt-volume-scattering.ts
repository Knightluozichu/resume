import type { ReviewQuestion } from "./types";

/** 体积散射 复习题 */
export const pbtVolumeScatteringQuestions: ReviewQuestion[] = [
  {
    id: "pbt-volume-scattering-1",
    chapter: "pbt-volume-scattering",
    level: 1,
    question: `体积散射中吸收和外散射有什么区别？`,
    answer: `吸收是光能被介质转化为热能，光强永久损失。外散射是光被粒子偏转到其他方向，对当前光线而言光强减少，但被偏转的光可能通过内散射贡献到其他方向。两者都导致衰减，但能量去向不同。`,
    tags: ["体积散射", "基础"],
  },
  {
    id: "pbt-volume-scattering-2",
    chapter: "pbt-volume-scattering",
    level: 2,
    question: `为什么体积渲染比表面渲染计算量大得多？`,
    answer: `表面渲染在光线-表面交点计算一次BRDF。体积渲染需要沿光线连续采样多个点（光线步进），每个点都要计算密度、衰减、内散射积分（需要对所有光源和方向积分），计算量是表面渲染的数十到数百倍。`,
    tags: ["性能", "体积渲染"],
  },
  {
    id: "pbt-volume-scattering-3",
    chapter: "pbt-volume-scattering",
    level: 3,
    question: `Henyey-Greenstein 相函数的 g 参数如何影响散射方向？`,
    answer: `g=0 各向同性散射（均匀），g>0 前向散射（光倾向于沿原方向继续，如烟雾），g<0 后向散射（光被反弹，如血液）。|g|越大各向异性越强。g控制了体积介质的视觉外观——前向散射的雾看起来发光且通透，后向散射的物质看起来更不透明。`,
    tags: ["相函数", "HG模型"],
  },
  {
    id: "pbt-volume-scattering-4",
    chapter: "pbt-volume-scattering",
    level: 4,
    question: `设计一个同时渲染表面和体积的积分器，分析如何平衡精度与性能。`,
    answer: `使用混合积分器：沿光线步进，在体积中按指数分布采样距离（free-flight sampling），在每个采样点计算内散射和自发光；如果光线先碰到表面，在表面计算BRDF。平衡策略：1）用重要性采样选择步长（按σt分布采样而非固定步长）；2）对内散射用多重重要性采样（结合光源采样和相函数采样）；3）用俄罗斯轮盘赌控制深度；4）对低密度区域用解析近似（如指数衰减解析解）代替步进。精度通过增加采样数提升，性能通过减少步进点和优化采样分布保证。`,
    tags: ["积分器设计", "综合"],
  },
];