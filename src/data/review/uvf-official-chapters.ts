import type { ReviewQuestion } from "./types";

export const uvfOfficialQuestions: ReviewQuestion[] = [
  {
    id: "uvf-official-learning-map-1",
    chapter: "uvf-official-learning-map",
    level: 1,
    question: "全书导读中，什么是“权威章序”？",
    answer: "由2017年版书目与目录固定的9章先后关系",
    tags: ["全书导读", "原书复刻"],
  },
  {
    id: "uvf-official-learning-map-2",
    chapter: "uvf-official-learning-map",
    level: 2,
    question: "全书导读为什么必须保留原目录单元“第1章 Unity3D游戏引擎概述”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或同类效果替代。",
    tags: ["全书导读", "目录覆盖"],
  },
  {
    id: "uvf-official-learning-map-3",
    chapter: "uvf-official-learning-map",
    level: 3,
    question: "全书导读的关键输入、状态与输出链是什么？",
    answer:
      "先固定原书9章和16个命名案例，再为每个案例建立触发、层级、材质、粒子、动画与性能证据；现代工具只能替换制作手段，不能改写案例边界。",
    tags: ["全书导读", "数据流"],
  },
  {
    id: "uvf-official-learning-map-4",
    chapter: "uvf-official-learning-map",
    level: 4,
    question: "全书导读最有诊断价值的故障样本应怎样设计？",
    answer:
      "只展示一个现代VFX Graph演示却没有火焰、雪花、刀光、旋风斩、冰冻术、传送门等原书案例映射。",
    tags: ["全书导读", "失败注入"],
  },
  {
    id: "uvf-official-learning-map-5",
    chapter: "uvf-official-learning-map",
    level: 2,
    question: "全书导读迁移到当前Unity时必须保留什么不变量？",
    answer:
      "章节顺序、火焰到升级特效的案例集合、移动游戏资源约束与Unity/3ds Max协作关系必须保留。",
    tags: ["全书导读", "现代迁移"],
  },
  {
    id: "uvf-official-learning-map-6",
    chapter: "uvf-official-learning-map",
    level: 3,
    question: "全书导读签发前至少保存哪些证据？",
    answer:
      "保存原章与案例映射、引擎概述、特效规范、Unity与MAX、场景与粒子、攻击技能、移动验收的状态快照、正常边界失败三组回放、目标设备性能以及修复后对照。",
    tags: ["全书导读", "验收证据"],
  },
  {
    id: "uvf-01-unity3d-engine-overview-1",
    chapter: "uvf-01-unity3d-engine-overview",
    level: 1,
    question: "第1章中，什么是“项目基线”？",
    answer: "可在指定编辑器、平台模块和示例资源上重复打开与运行的环境",
    tags: ["第1章", "原书复刻"],
  },
  {
    id: "uvf-01-unity3d-engine-overview-2",
    chapter: "uvf-01-unity3d-engine-overview",
    level: 2,
    question: "第1章为什么必须保留原目录单元“初识Unity3D”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或同类效果替代。",
    tags: ["第1章", "目录覆盖"],
  },
  {
    id: "uvf-01-unity3d-engine-overview-3",
    chapter: "uvf-01-unity3d-engine-overview",
    level: 3,
    question: "第1章的关键输入、状态与输出链是什么？",
    answer:
      "原章不是泛泛介绍Unity历史，而是把网页游戏与手机游戏的约束落到安装和学习路径。先锁定编辑器、目标平台模块与图形后端，再创建最小场景，才能让后续特效参数具有可复现基线。",
    tags: ["第1章", "数据流"],
  },
  {
    id: "uvf-01-unity3d-engine-overview-4",
    chapter: "uvf-01-unity3d-engine-overview",
    level: 4,
    question: "第1章最有诊断价值的故障样本应怎样设计？",
    answer:
      "用当前Unity Hub截图替代原章的平台比较和安装验证，或升级项目后没有记录粒子序列化变化。",
    tags: ["第1章", "失败注入"],
  },
  {
    id: "uvf-01-unity3d-engine-overview-5",
    chapter: "uvf-01-unity3d-engine-overview",
    level: 2,
    question: "第1章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "学习者必须能从干净环境创建项目、导入资源、播放最小场景并保存版本与平台证据。",
    tags: ["第1章", "现代迁移"],
  },
  {
    id: "uvf-01-unity3d-engine-overview-6",
    chapter: "uvf-01-unity3d-engine-overview",
    level: 3,
    question: "第1章签发前至少保存哪些证据？",
    answer:
      "保存原章与案例映射、平台目标、安装模块、创建工程、最小场景、播放烟测、构建记录的状态快照、正常边界失败三组回放、目标设备性能以及修复后对照。",
    tags: ["第1章", "验收证据"],
  },
  {
    id: "uvf-02-vfx-foundations-1",
    chapter: "uvf-02-vfx-foundations",
    level: 1,
    question: "第2章中，什么是“自然性”？",
    answer: "运动、消散、受力和节奏共同服从场景因果的可信程度",
    tags: ["第2章", "原书复刻"],
  },
  {
    id: "uvf-02-vfx-foundations-2",
    chapter: "uvf-02-vfx-foundations",
    level: 2,
    question: "第2章为什么必须保留原目录单元“游戏特效概述”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或同类效果替代。",
    tags: ["第2章", "目录覆盖"],
  },
  {
    id: "uvf-02-vfx-foundations-3",
    chapter: "uvf-02-vfx-foundations",
    level: 3,
    question: "第2章的关键输入、状态与输出链是什么？",
    answer:
      "先从玩法事件提取情绪和可读性，再选择粒子、模型、贴图或混合方案。移动规范不是最后压缩，而是在制作前固定尺寸、透明边、通道、压缩格式、峰值粒子数和叠加层数。",
    tags: ["第2章", "数据流"],
  },
  {
    id: "uvf-02-vfx-foundations-4",
    chapter: "uvf-02-vfx-foundations",
    level: 4,
    question: "第2章最有诊断价值的故障样本应怎样设计？",
    answer:
      "贴图尺寸和透明格式不受控、所有层使用同一种饱和色，或为了华丽堆叠粒子导致技能轮廓不可读。",
    tags: ["第2章", "失败注入"],
  },
  {
    id: "uvf-02-vfx-foundations-5",
    chapter: "uvf-02-vfx-foundations",
    level: 2,
    question: "第2章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "效果的情绪、主次层级、运动因果与移动资源预算必须同时可验收，不能只看静帧是否华丽。",
    tags: ["第2章", "现代迁移"],
  },
  {
    id: "uvf-02-vfx-foundations-6",
    chapter: "uvf-02-vfx-foundations",
    level: 3,
    question: "第2章签发前至少保存哪些证据？",
    answer:
      "保存原章与案例映射、情绪意图、效果分类、色彩脚本、贴图规格、层级组合、移动预算的状态快照、正常边界失败三组回放、目标设备性能以及修复后对照。",
    tags: ["第2章", "验收证据"],
  },
  {
    id: "uvf-03-unity3d-foundations-1",
    chapter: "uvf-03-unity3d-foundations",
    level: 1,
    question: "第3章中，什么是“资源坐标合同”？",
    answer: "统一Max与Unity的单位、轴向、枢轴和缩放的导入约束",
    tags: ["第3章", "原书复刻"],
  },
  {
    id: "uvf-03-unity3d-foundations-2",
    chapter: "uvf-03-unity3d-foundations",
    level: 2,
    question: "第3章为什么必须保留原目录单元“Unity3D界面介绍”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或同类效果替代。",
    tags: ["第3章", "目录覆盖"],
  },
  {
    id: "uvf-03-unity3d-foundations-3",
    chapter: "uvf-03-unity3d-foundations",
    level: 3,
    question: "第3章的关键输入、状态与输出链是什么？",
    answer:
      "该章连接DCC资源与Unity运行时。模型、动画和贴图先通过坐标合同进入项目，粒子系统再引用网格、材质与碰撞，最后封装成Prefab并在摄像机下验证构图；任何一步的默认值都可能污染后续案例。",
    tags: ["第3章", "数据流"],
  },
  {
    id: "uvf-03-unity3d-foundations-4",
    chapter: "uvf-03-unity3d-foundations",
    level: 4,
    question: "第3章最有诊断价值的故障样本应怎样设计？",
    answer:
      "直接在场景中修正错误缩放却不修导入设置，导致网格发射、碰撞半径和Prefab实例出现不同结果。",
    tags: ["第3章", "失败注入"],
  },
  {
    id: "uvf-03-unity3d-foundations-5",
    chapter: "uvf-03-unity3d-foundations",
    level: 2,
    question: "第3章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "同一资源重复导入的轴向、缩放、动画范围、材质引用和粒子结果必须一致。",
    tags: ["第3章", "现代迁移"],
  },
  {
    id: "uvf-03-unity3d-foundations-6",
    chapter: "uvf-03-unity3d-foundations",
    level: 3,
    question: "第3章签发前至少保存哪些证据？",
    answer:
      "保存原章与案例映射、Max导出、Unity导入、粒子属性、材质光源、Prefab封装、摄像机验收的状态快照、正常边界失败三组回放、目标设备性能以及修复后对照。",
    tags: ["第3章", "验收证据"],
  },
  {
    id: "uvf-04-scene-fire-snow-1",
    chapter: "uvf-04-scene-fire-snow",
    level: 1,
    question: "第4章中，什么是“火焰核心层”？",
    answer: "高亮、短寿命且快速上升的火焰内部粒子",
    tags: ["第4章", "原书复刻"],
  },
  {
    id: "uvf-04-scene-fire-snow-2",
    chapter: "uvf-04-scene-fire-snow",
    level: 2,
    question: "第4章为什么必须保留原目录单元“实例：火焰特效案例讲解”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或同类效果替代。",
    tags: ["第4章", "目录覆盖"],
  },
  {
    id: "uvf-04-scene-fire-snow-3",
    chapter: "uvf-04-scene-fire-snow",
    level: 3,
    question: "第4章的关键输入、状态与输出链是什么？",
    answer:
      "火焰需要核心火、外焰、烟和偶发火星形成不同生命周期；雪花需要近中远尺度、下落与横风、摄像机跟随发射体共同维持体积感。两个案例都必须在真实场景亮度和透明排序下验收。",
    tags: ["第4章", "数据流"],
  },
  {
    id: "uvf-04-scene-fire-snow-4",
    chapter: "uvf-04-scene-fire-snow",
    level: 4,
    question: "第4章最有诊断价值的故障样本应怎样设计？",
    answer:
      "只调一套粒子参数得到均匀贴片，或把雪发射器固定在世界原点导致玩家移动后降雪密度骤变。",
    tags: ["第4章", "失败注入"],
  },
  {
    id: "uvf-04-scene-fire-snow-5",
    chapter: "uvf-04-scene-fire-snow",
    level: 2,
    question: "第4章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "火焰的上升与消散、雪花的空间密度与风向、以及两者和场景光色的关系必须保持原案例意图。",
    tags: ["第4章", "现代迁移"],
  },
  {
    id: "uvf-04-scene-fire-snow-6",
    chapter: "uvf-04-scene-fire-snow",
    level: 3,
    question: "第4章签发前至少保存哪些证据？",
    answer:
      "保存原章与案例映射、参考拆层、发射形状、生命周期、材质混合、风与空间、场景对照的状态快照、正常边界失败三组回放、目标设备性能以及修复后对照。",
    tags: ["第4章", "验收证据"],
  },
  {
    id: "uvf-05-unity-max-weapon-buff-slash-1",
    chapter: "uvf-05-unity-max-weapon-buff-slash",
    level: 1,
    question: "第5章中，什么是“武器挂点”？",
    answer: "随骨骼稳定移动并承载特效Prefab的局部变换节点",
    tags: ["第5章", "原书复刻"],
  },
  {
    id: "uvf-05-unity-max-weapon-buff-slash-2",
    chapter: "uvf-05-unity-max-weapon-buff-slash",
    level: 2,
    question: "第5章为什么必须保留原目录单元“实例：武器特效案例讲解”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或同类效果替代。",
    tags: ["第5章", "目录覆盖"],
  },
  {
    id: "uvf-05-unity-max-weapon-buff-slash-3",
    chapter: "uvf-05-unity-max-weapon-buff-slash",
    level: 3,
    question: "第5章的关键输入、状态与输出链是什么？",
    answer:
      "武器效果依赖骨骼挂点和局部坐标，BUFF依赖持续循环和角色空间，刀光依赖动作路径和时间采样。Max负责可控几何与动画，Unity负责材质、粒子、触发和场景合成，两端通过命名与枢轴合同连接。",
    tags: ["第5章", "数据流"],
  },
  {
    id: "uvf-05-unity-max-weapon-buff-slash-4",
    chapter: "uvf-05-unity-max-weapon-buff-slash",
    level: 4,
    question: "第5章最有诊断价值的故障样本应怎样设计？",
    answer:
      "把效果烘焙在世界坐标，预览时正确但角色转身、缩放或切换动画后产生漂移和刀光断裂。",
    tags: ["第5章", "失败注入"],
  },
  {
    id: "uvf-05-unity-max-weapon-buff-slash-5",
    chapter: "uvf-05-unity-max-weapon-buff-slash",
    level: 2,
    question: "第5章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "角色换动作、换武器和改变缩放后，武器、BUFF和刀光仍应对齐目标骨骼与攻击时段。",
    tags: ["第5章", "现代迁移"],
  },
  {
    id: "uvf-05-unity-max-weapon-buff-slash-6",
    chapter: "uvf-05-unity-max-weapon-buff-slash",
    level: 3,
    question: "第5章签发前至少保存哪些证据？",
    answer:
      "保存原章与案例映射、Max动画、枢轴导出、骨骼挂点、材质序列、粒子组合、动作对拍的状态快照、正常边界失败三组回放、目标设备性能以及修复后对照。",
    tags: ["第5章", "验收证据"],
  },
  {
    id: "uvf-06-particle-hit-projectile-ui-1",
    chapter: "uvf-06-particle-hit-projectile-ui",
    level: 1,
    question: "第6章中，什么是“接触法线”？",
    answer: "决定受击火花、碎屑和贴花朝向的碰撞表面方向",
    tags: ["第6章", "原书复刻"],
  },
  {
    id: "uvf-06-particle-hit-projectile-ui-2",
    chapter: "uvf-06-particle-hit-projectile-ui",
    level: 2,
    question: "第6章为什么必须保留原目录单元“实例：受击特效案例讲解”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或同类效果替代。",
    tags: ["第6章", "目录覆盖"],
  },
  {
    id: "uvf-06-particle-hit-projectile-ui-3",
    chapter: "uvf-06-particle-hit-projectile-ui",
    level: 3,
    question: "第6章的关键输入、状态与输出链是什么？",
    answer:
      "受击案例从接触点和法线定位；飞行弹道拆成头部、拖尾与命中三个生命周期；UI案例额外处理Canvas、摄像机和排序层。三者共享对象池，但停止条件与空间坐标不能混用。",
    tags: ["第6章", "数据流"],
  },
  {
    id: "uvf-06-particle-hit-projectile-ui-4",
    chapter: "uvf-06-particle-hit-projectile-ui",
    level: 4,
    question: "第6章最有诊断价值的故障样本应怎样设计？",
    answer:
      "按固定秒数回收长拖尾导致尾部被截断，或把世界空间粒子直接放进UI层导致缩放和排序错误。",
    tags: ["第6章", "失败注入"],
  },
  {
    id: "uvf-06-particle-hit-projectile-ui-5",
    chapter: "uvf-06-particle-hit-projectile-ui",
    level: 2,
    question: "第6章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "命中位置、弹道连续性、UI遮挡关系和回收时机在不同帧率下都必须稳定。",
    tags: ["第6章", "现代迁移"],
  },
  {
    id: "uvf-06-particle-hit-projectile-ui-6",
    chapter: "uvf-06-particle-hit-projectile-ui",
    level: 3,
    question: "第6章签发前至少保存哪些证据？",
    answer:
      "保存原章与案例映射、触发事件、位置法线、头部拖尾、命中爆发、UI排序、池化回收的状态快照、正常边界失败三组回放、目标设备性能以及修复后对照。",
    tags: ["第6章", "验收证据"],
  },
  {
    id: "uvf-07-physical-attacks-1",
    chapter: "uvf-07-physical-attacks",
    level: 1,
    question: "第7章中，什么是“旋风斩环”？",
    answer: "围绕角色形成方向、范围和持续时间提示的环状攻击层",
    tags: ["第7章", "原书复刻"],
  },
  {
    id: "uvf-07-physical-attacks-2",
    chapter: "uvf-07-physical-attacks",
    level: 2,
    question: "第7章为什么必须保留原目录单元“实例：旋风斩特效案例讲解”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或同类效果替代。",
    tags: ["第7章", "目录覆盖"],
  },
  {
    id: "uvf-07-physical-attacks-3",
    chapter: "uvf-07-physical-attacks",
    level: 3,
    question: "第7章的关键输入、状态与输出链是什么？",
    answer:
      "旋风斩不是单个环形粒子，而是范围提示、角色旋转、武器轨迹、命中爆发和地面余波的协作。3连击必须让三段动作事件、判定和效果递进对齐，第三段形成清晰收束。",
    tags: ["第7章", "数据流"],
  },
  {
    id: "uvf-07-physical-attacks-4",
    chapter: "uvf-07-physical-attacks",
    level: 4,
    question: "第7章最有诊断价值的故障样本应怎样设计？",
    answer:
      "在Update中按近似时间播放效果，动画速度变化后刀光、伤害和音效分别漂移。",
    tags: ["第7章", "失败注入"],
  },
  {
    id: "uvf-07-physical-attacks-5",
    chapter: "uvf-07-physical-attacks",
    level: 2,
    question: "第7章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "攻击判定与视觉主体共享同一动作事件源，效果不能早于伤害，也不能因帧率跳过连击窗口。",
    tags: ["第7章", "现代迁移"],
  },
  {
    id: "uvf-07-physical-attacks-6",
    chapter: "uvf-07-physical-attacks",
    level: 3,
    question: "第7章签发前至少保存哪些证据？",
    answer:
      "保存原章与案例映射、前摇提示、动作挂点、刀光生成、命中判定、连击窗口、第三段收束的状态快照、正常边界失败三组回放、目标设备性能以及修复后对照。",
    tags: ["第7章", "验收证据"],
  },
  {
    id: "uvf-08-magic-attacks-1",
    chapter: "uvf-08-magic-attacks",
    level: 1,
    question: "第8章中，什么是“冰冻覆盖”？",
    answer: "以色调、晶体、雾气和速度变化共同表达冻结状态的组合层",
    tags: ["第8章", "原书复刻"],
  },
  {
    id: "uvf-08-magic-attacks-2",
    chapter: "uvf-08-magic-attacks",
    level: 2,
    question: "第8章为什么必须保留原目录单元“实例：冰冻术特效案例讲解”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或同类效果替代。",
    tags: ["第8章", "目录覆盖"],
  },
  {
    id: "uvf-08-magic-attacks-3",
    chapter: "uvf-08-magic-attacks",
    level: 3,
    question: "第8章的关键输入、状态与输出链是什么？",
    answer:
      "冰冻术强调目标材质与状态覆盖，法系旋风强调旋转体积和持续范围，闪电强调端点、分段路径与瞬时亮度。三例共享施法阶段，却需要不同的空间采样和终止条件。",
    tags: ["第8章", "数据流"],
  },
  {
    id: "uvf-08-magic-attacks-4",
    chapter: "uvf-08-magic-attacks",
    level: 4,
    question: "第8章最有诊断价值的故障样本应怎样设计？",
    answer:
      "直接改写共享材质颜色实现冰冻，导致所有使用该材质的角色一起变色且结束后无法恢复。",
    tags: ["第8章", "失败注入"],
  },
  {
    id: "uvf-08-magic-attacks-5",
    chapter: "uvf-08-magic-attacks",
    level: 2,
    question: "第8章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "法术的视觉阶段必须对应玩法状态；目标死亡、离开范围或材质替换时都能撤销临时覆盖并回收效果。",
    tags: ["第8章", "现代迁移"],
  },
  {
    id: "uvf-08-magic-attacks-6",
    chapter: "uvf-08-magic-attacks",
    level: 3,
    question: "第8章签发前至少保存哪些证据？",
    answer:
      "保存原章与案例映射、蓄力颜色、目标采样、主体生成、状态覆盖、命中反馈、材质恢复的状态快照、正常边界失败三组回放、目标设备性能以及修复后对照。",
    tags: ["第8章", "验收证据"],
  },
  {
    id: "uvf-09-common-skills-1",
    chapter: "uvf-09-common-skills",
    level: 1,
    question: "第9章中，什么是“治疗脉冲”？",
    answer: "从目标中心向外扩散并表达数值恢复的周期性亮度层",
    tags: ["第9章", "原书复刻"],
  },
  {
    id: "uvf-09-common-skills-2",
    chapter: "uvf-09-common-skills",
    level: 2,
    question: "第9章为什么必须保留原目录单元“实例：加血特效案例讲解”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或同类效果替代。",
    tags: ["第9章", "目录覆盖"],
  },
  {
    id: "uvf-09-common-skills-3",
    chapter: "uvf-09-common-skills",
    level: 3,
    question: "第9章的关键输入、状态与输出链是什么？",
    answer:
      "加血围绕目标和数值反馈循环，传送门需要稳定入口平面、旋转流场与穿越边界，升级以短时爆发强调状态跃迁。三例通过可复用Prefab统一资源和回收，但不能抹平语义差异。",
    tags: ["第9章", "数据流"],
  },
  {
    id: "uvf-09-common-skills-4",
    chapter: "uvf-09-common-skills",
    level: 4,
    question: "第9章最有诊断价值的故障样本应怎样设计？",
    answer:
      "复用同一套粒子只换颜色，使治疗、传送和升级拥有相同轮廓与节奏，战斗中无法快速辨认。",
    tags: ["第9章", "失败注入"],
  },
  {
    id: "uvf-09-common-skills-5",
    chapter: "uvf-09-common-skills",
    level: 2,
    question: "第9章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "玩家应从颜色、运动方向和空间形态区分三种技能；触发结果与视觉反馈必须一致且可中断。",
    tags: ["第9章", "现代迁移"],
  },
  {
    id: "uvf-09-common-skills-6",
    chapter: "uvf-09-common-skills",
    level: 3,
    question: "第9章签发前至少保存哪些证据？",
    answer:
      "保存原章与案例映射、技能语义、目标或入口、主体Prefab、阶段触发、数值反馈、结束回收的状态快照、正常边界失败三组回放、目标设备性能以及修复后对照。",
    tags: ["第9章", "验收证据"],
  },
  {
    id: "uvf-official-final-review-1",
    chapter: "uvf-official-final-review",
    level: 1,
    question: "总复习中，什么是“案例矩阵”？",
    answer: "按原书章节交叉记录案例、资源、触发、层级和验收状态的表",
    tags: ["总复习", "原书复刻"],
  },
  {
    id: "uvf-official-final-review-2",
    chapter: "uvf-official-final-review",
    level: 2,
    question: "总复习为什么必须保留原目录单元“第1章 Unity3D游戏引擎概述”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或同类效果替代。",
    tags: ["总复习", "目录覆盖"],
  },
  {
    id: "uvf-official-final-review-3",
    chapter: "uvf-official-final-review",
    level: 3,
    question: "总复习的关键输入、状态与输出链是什么？",
    answer:
      "总复习必须逐项签发火焰、雪花、武器、BUFF、刀光、受击、飞行弹道、UI、旋风斩、3连击、冰冻术、法系旋风、闪电、加血、传送门和升级等案例，并把基础章与工具章的环境、规范和导入合同纳入证据。",
    tags: ["总复习", "数据流"],
  },
  {
    id: "uvf-official-final-review-4",
    chapter: "uvf-official-final-review",
    level: 4,
    question: "总复习最有诊断价值的故障样本应怎样设计？",
    answer:
      "只录制一段效果合辑，没有原章映射、失败样本、资源预算和迁移差异，因而无法判断是否真正复现全书。",
    tags: ["总复习", "失败注入"],
  },
  {
    id: "uvf-official-final-review-5",
    chapter: "uvf-official-final-review",
    level: 2,
    question: "总复习迁移到当前Unity时必须保留什么不变量？",
    answer:
      "9章目录覆盖、案例语义、资产来源、阶段触发和移动性能预算必须同时通过，不能以现代效果数量替代原书案例。",
    tags: ["总复习", "现代迁移"],
  },
  {
    id: "uvf-official-final-review-6",
    chapter: "uvf-official-final-review",
    level: 3,
    question: "总复习签发前至少保存哪些证据？",
    answer:
      "保存原章与案例映射、9章清单、16例矩阵、资产追溯、正常边界失败、移动预算、迁移签发的状态快照、正常边界失败三组回放、目标设备性能以及修复后对照。",
    tags: ["总复习", "验收证据"],
  },
];
