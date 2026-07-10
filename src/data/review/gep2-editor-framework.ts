import type { ReviewQuestion } from "./types";

export const gep2EditorFrameworkQuestions: ReviewQuestion[] = [
  {
    id: "gep2-editor-framework-1",
    chapter: "gep2-editor-framework",
    level: 1,
    question: `离线资产管线的四个阶段是什么？为什么运行时不解析原始 .fbx？`,
    answer:
      `DCC 导出（Blender/Maya 出 .fbx/.psd）→ 导入（解析元数据、校验去重）→ 处理（压缩优化，如 Draco/Mipmap）→ 序列化（写引擎格式 .geo/.mat）。运行时不解析原始 .fbx 是因为 .fbx 解析慢且重，离线一次烘焙成引擎专用格式后，运行时直接加载零解析成本，启动快、帧内不卡。`,
    tags: ["资产管线", "四阶段", "烘焙"],
  },
  {
    id: "gep2-editor-framework-2",
    chapter: "gep2-editor-framework",
    level: 2,
    question: `为什么编辑器要复用引擎运行时，而不是单独写一套？`,
    answer:
      `编辑器里所见即所得，要求编辑时和运行时表现完全一致——同一套渲染、物理、动画。若单独写一套，两套代码会逐渐不一致（编辑器里调好的效果，运行时跑出来不对）。复用运行时保证「编辑器里看到的就是玩家看到的」，还省一半开发量。编辑器只是「运行时 + 工具层（检视器/视口/命令栈）」的包裹，运行时是核心。`,
    tags: ["运行时复用", "所见即所得"],
  },
  {
    id: "gep2-editor-framework-3",
    chapter: "gep2-editor-framework",
    level: 3,
    question: `反射（Reflection）在编辑器里起什么作用？`,
    answer:
      `反射让引擎在运行时知道每个类的字段名、类型、偏移等元数据。编辑器据此自动生成属性面板：遍历组件的字段，按类型渲染对应控件（float 拖拽、color 取色器、资源引用拖拽），不用为每个类手写 UI。序列化也靠反射遍历字段存盘读盘。没有反射，每加一个新组件都要手写一套编辑器 UI 和序列化代码，迭代极慢。反射是「元数据驱动 UI」的基础。`,
    tags: ["反射", "属性面板", "序列化"],
  },
  {
    id: "gep2-editor-framework-4",
    chapter: "gep2-editor-framework",
    level: 4,
    question:
      `编辑器的撤销/重做为什么用命令栈（Command Pattern）？综合分析其设计。`,
    answer:
      `命令栈把每次编辑操作封装成可执行+可撤销的命令对象（Do/Undo 两方法）。执行时压栈，撤销时弹栈调用 Undo，重做再压回。好处：①所有操作统一接口，新操作只需实现命令；②操作可组合（宏命令一次撤销多步）；③支持跨操作类型的状态恢复（移动、改属性、删除都走同一栈）。若用「存档点」方式（每次操作存整个场景快照），内存和耗时随场景变大爆炸；命令栈只存「差异」，开销小。权衡：命令必须正确实现 Undo（可逆），有些操作（如删资源）的逆操作很麻烦，需谨慎设计数据可恢复性。这是编辑器迭代体验的基石。`,
    tags: ["命令栈", "撤销重做", "综合"],
  },
];
