import type { ReviewQuestion } from "./types";

/** 系统架构与并行 复习题 */
export const pbtSystemArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "pbt-system-architecture-1",
    chapter: "pbt-system-architecture",
    level: 1,
    question: `BVH 加速结构的核心原理是什么？`,
    answer: `用AABB二叉树组织几何体，每个节点存储包围子树的包围盒。光线追踪时先测试AABB，不相交则跳过整个子树，只有叶子节点才做三角形求交，将O(N)降到O(logN)。`,
    tags: ["BVH", "加速结构"],
  },
  {
    id: "pbt-system-architecture-2",
    chapter: "pbt-system-architecture",
    level: 2,
    question: `为什么瓦片化渲染是并行渲染的标准策略？`,
    answer: `每个瓦片独立渲染无需线程同步；瓦片内数据局部化缓存友好；无锁队列动态分配实现负载均衡。瓦片大小通常16x16到64x64，太小启动开销大，太大并行度不足。`,
    tags: ["并行渲染", "瓦片化"],
  },
  {
    id: "pbt-system-architecture-3",
    chapter: "pbt-system-architecture",
    level: 3,
    question: `为什么内存局部性对渲染性能至关重要？`,
    answer: `BVH遍历中每次访问节点需读取内存，缓存未命中(cache miss)延迟约100ns，比三角形求交计算(几ns)慢数十倍。好的BVH构建(如Morton排序)让相邻节点在内存中连续，提高缓存命中率。内存局部性差时，即使算法复杂度最优，实际性能也可能差10倍。`,
    tags: ["内存局部性", "性能"],
  },
  {
    id: "pbt-system-architecture-4",
    chapter: "pbt-system-architecture",
    level: 4,
    question: `分析 PBRT 的组件设计如何体现「接口隔离」与「可扩展性」原则。`,
    answer: `PBRT用抽象基类定义接口：Integrator基类统一PT/BDPT/MLT的调用方式，新增算法只需继承实现Li()；Sampler基类支持Halton/Sobol/随机等不同采样策略；Light基类统一点光源/面光源/环境光；BSDF基类统一Lambert/Cook-Torrance/Fresnel。接口隔离使组件可独立替换——换积分器不影响场景，换采样器不影响积分器。可扩展性体现在用户可继承任意基类添加自定义实现（如自定义BRDF或自定义积分器），无需修改PBRT核心代码。`,
    tags: ["系统架构", "设计模式", "综合"],
  },
];