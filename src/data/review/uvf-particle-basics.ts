import type { ReviewQuestion } from "./types";

export const uvfParticleBasicsQuestions: ReviewQuestion[] = [
  {
    id: "uvf-particle-basics-1",
    chapter: "uvf-particle-basics",
    level: 1,
    question: "Unity 中创建粒子特效使用的核心组件名称是什么？它的四个基本模块是什么？",
    answer: "核心组件是 ParticleSystem。四个基本模块：Main Module（全局参数如 Duration、Looping、Start Speed）、Emission（发射速率 Rate over Time 和 Bursts 突发）、Shape（发射形状如 Sphere/Cone/Box）、Renderer（渲染模式、材质、拖尾）。",
    tags: ["ParticleSystem", "基本模块"],
  },
  {
    id: "uvf-particle-basics-2",
    chapter: "uvf-particle-basics",
    level: 2,
    question: "ParticleSystem 中 Emission 模块的 Rate over Time 和 Bursts 有什么区别？分别在什么场景使用？",
    answer: "Rate over Time 是每秒持续发射的粒子数，适合持续型特效（火焰、烟雾、喷泉）。Bursts 是在特定时间点一次性发射一批粒子，适合爆发型特效（爆炸、撞击、闪光）。实际中常组合使用：火焰用 Rate over Time 持续发射，爆炸瞬间用 Bursts 一次性喷出大量碎片。",
    tags: ["Emission", "Rate over Time", "Bursts"],
  },
  {
    id: "uvf-particle-basics-3",
    chapter: "uvf-particle-basics",
    level: 3,
    question: "如何用代码在指定位置播放一个粒子特效？播放完成后如何自动销毁？",
    answer: "用 Instantiate 创建预制体，再调用 Play()。自动销毁用 ParticleSystem 的 isStopped 属性轮询，或用 Destroy 预估时长。代码：`var ps = Instantiate(prefab, pos, rot); ps.GetComponent<ParticleSystem>().Play(); Destroy(ps, ps.GetComponent<ParticleSystem>().main.duration);`。生产环境建议用对象池而非直接 Instantiate/Destroy，避免 GC。",
    tags: ["代码控制", "对象池", "Instantiate"],
  },
  {
    id: "uvf-particle-basics-4",
    chapter: "uvf-particle-basics",
    level: 4,
    question: "设计一个「篝火」特效，需要配置哪些 ParticleSystem 参数？如何让火焰看起来真实？",
    answer: "1）Main：Duration=5s Looping，Start Lifetime=1-2s 随机，Start Speed=2-4 向上，Start Size=0.3-0.8 随机；2）Emission：Rate=30/s 持续发射；3）Shape：Cone 角度15度，半径0.2；4）Color over Lifetime：从橙黄渐变到暗红再到透明；5）Size over Lifetime：先增大后缩小；6）Renderer：Additive 混合模式材质，贴图为柔边圆点。真实感靠：颜色渐变+尺寸曲线+Additive混合+随机参数+少量向上加速度模拟热气上升。",
    tags: ["篝火", "参数配置", "综合设计"],
  },
];
