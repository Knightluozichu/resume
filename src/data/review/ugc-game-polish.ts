import type { ReviewQuestion } from "./types";

export const ugcGamePolishQuestions: ReviewQuestion[] = [
  {
    id: "ugc-game-polish-1",
    chapter: "ugc-game-polish",
    level: 1,
    question: `Unity 性能优化的三大杀手是什么？分别怎么解决？`,
    answer: `1）GC 卡顿——每帧 new 对象触发 GC 暂停主线程，用对象池消除每帧分配；2）DrawCall 过多——每个物体一个 DrawCall，用 SRP Batcher+GPU Instancing+静态批处理降 DrawCall；3）内存泄漏——对象不再使用但被引用，用 Memory Profiler 拍快照对比定位。`,
    tags: ["性能优化", "三大杀手"],
  },
  {
    id: "ugc-game-polish-2",
    chapter: "ugc-game-polish",
    level: 2,
    question: `Profiler 和 Frame Debugger 分别用来做什么？`,
    answer: `Profiler CPU 模块定位整体瓶颈——GC Alloc 找 GC 来源、CPU Usage 找耗时函数、Memory 找内存泄漏。Frame Debugger 逐帧查看每个 DrawCall 的详情——用了什么材质、为何没批处理、渲染顺序。Profiler 看宏观性能，Frame Debugger 看微观渲染。`,
    tags: ["Profiler", "Frame Debugger"],
  },
  {
    id: "ugc-game-polish-3",
    chapter: "ugc-game-polish",
    level: 3,
    question: `UX 反馈的三个层次是什么？怎么实现？`,
    answer: `1）视觉反馈——受击闪红（SpriteRenderer.color 临时改色）、震屏（Random.insideUnitSphere 偏移相机）、粒子特效、缓动动画（DOTween DOScale/DOFade）；2）听觉反馈——击中音效（AudioManager.Play）、环境音、BGM 动态切换；3）操作反馈——吸附（自动吸附边缘）、容错（Coyote Time）、预输入（Jump Buffer）。三层叠加让操作有重量感。`,
    tags: ["UX反馈", "手感打磨"],
  },
  {
    id: "ugc-game-polish-4",
    chapter: "ugc-game-polish",
    level: 4,
    question: `游戏从做完核心玩法到发布，完整的打磨流程是什么？`,
    answer: `1）性能优化：Profiler 定位 GC/DrawCall/内存三大瓶颈→对象池消除 GC→SRP Batcher+GPU Instancing 降 DrawCall→Memory Profiler 查泄漏；2）UX 打磨：加视觉反馈（闪红/震屏/粒子）+听觉反馈（音效/BGM）+操作反馈（缓动/吸附/预输入）；3）多平台适配：PlayerSettings 配 IL2CPP+Stripping→纹理 ASTC→BuildPipeline 构建→真机测试→提交商店。打磨占 50% 项目时间。`,
    tags: ["游戏打磨", "综合"],
  },
];
