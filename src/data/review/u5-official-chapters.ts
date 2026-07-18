import type { ReviewQuestion } from "./types";

export const u5OfficialChapterQuestions: ReviewQuestion[] = [
  {
    "id": "u5-official-learning-map-1",
    "chapter": "u5-official-learning-map",
    "level": 1,
    "question": "《Unity 5权威讲解》权威学习地图在原书项目主线中的输入和输出是什么？",
    "answer": "输入从TPS场景开始，输出到真实感与数据；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "全书导览",
      "原书复刻"
    ]
  },
  {
    "id": "u5-official-learning-map-2",
    "chapter": "u5-official-learning-map",
    "level": 2,
    "question": "《Unity 5权威讲解》权威学习地图为什么必须保留目录项“Unity 5 简介”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "全书导览",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-official-learning-map-3",
    "chapter": "u5-official-learning-map",
    "level": 3,
    "question": "《Unity 5权威讲解》权威学习地图的关键证据链是什么？",
    "answer": "TPS场景 → 角色战斗 → UI架构 → 世界系统 → 多人网络 → 真实感与数据。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "全书导览",
      "项目链路"
    ]
  },
  {
    "id": "u5-official-learning-map-4",
    "chapter": "u5-official-learning-map",
    "level": 4,
    "question": "《Unity 5权威讲解》权威学习地图最有诊断价值的失败样本是什么？",
    "answer": "把原书缩成编辑器、生命周期、物理和发布十三个通用主题，遗漏敌人 AI、射线导航、光照、两套网络和完整大厅排名。",
    "tags": [
      "全书导览",
      "失败注入"
    ]
  },
  {
    "id": "u5-official-learning-map-5",
    "chapter": "u5-official-learning-map",
    "level": 2,
    "question": "《Unity 5权威讲解》权威学习地图签发时必须保留什么不变量？",
    "answer": "15 章与数据库附录必须按项目依赖顺序可定位，内置网络与 Photon 两条历史链必须明确标注版本边界。",
    "tags": [
      "全书导览",
      "行为不变量"
    ]
  },
  {
    "id": "u5-official-learning-map-6",
    "chapter": "u5-official-learning-map",
    "level": 3,
    "question": "《Unity 5权威讲解》权威学习地图至少保存哪些验收证据？",
    "answer": "保存TPS场景、角色战斗、UI架构、世界系统、多人网络、真实感与数据各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "全书导览",
      "验收证据"
    ]
  },
  {
    "id": "u5-01-unity5-introduction-1",
    "chapter": "u5-01-unity5-introduction",
    "level": 1,
    "question": "第1章 Unity 5 简介在原书项目主线中的输入和输出是什么？",
    "answer": "输入从引擎定位开始，输出到可运行场景；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "Unity 5 简介",
      "原书复刻"
    ]
  },
  {
    "id": "u5-01-unity5-introduction-2",
    "chapter": "u5-01-unity5-introduction",
    "level": 2,
    "question": "第1章 Unity 5 简介为什么必须保留目录项“Unity 3D 游戏引擎的诞生”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "Unity 5 简介",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-01-unity5-introduction-3",
    "chapter": "u5-01-unity5-introduction",
    "level": 3,
    "question": "第1章 Unity 5 简介的关键证据链是什么？",
    "answer": "引擎定位 → 版本能力 → 安装许可 → 项目创建 → 编辑器视图 → 可运行场景。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "Unity 5 简介",
      "项目链路"
    ]
  },
  {
    "id": "u5-01-unity5-introduction-4",
    "chapter": "u5-01-unity5-introduction",
    "level": 4,
    "question": "第1章 Unity 5 简介最有诊断价值的失败样本是什么？",
    "answer": "只背窗口名称和快捷键，却无法新建、保存、运行项目，也说不清场景、游戏和项目视图各自的数据边界。",
    "tags": [
      "Unity 5 简介",
      "失败注入"
    ]
  },
  {
    "id": "u5-01-unity5-introduction-5",
    "chapter": "u5-01-unity5-introduction",
    "level": 2,
    "question": "第1章 Unity 5 简介签发时必须保留什么不变量？",
    "answer": "所有界面和安装步骤都必须落到可复现项目、明确 Unity 版本与可验证的场景编辑结果。",
    "tags": [
      "Unity 5 简介",
      "行为不变量"
    ]
  },
  {
    "id": "u5-01-unity5-introduction-6",
    "chapter": "u5-01-unity5-introduction",
    "level": 3,
    "question": "第1章 Unity 5 简介至少保存哪些验收证据？",
    "answer": "保存引擎定位、版本能力、安装许可、项目创建、编辑器视图、可运行场景各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "Unity 5 简介",
      "验收证据"
    ]
  },
  {
    "id": "u5-02-project-preparation-1",
    "chapter": "u5-02-project-preparation",
    "level": 1,
    "question": "第2章 准备游戏开发在原书项目主线中的输入和输出是什么？",
    "answer": "输入从游戏范围开始，输出到角色导入；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "准备游戏开发",
      "原书复刻"
    ]
  },
  {
    "id": "u5-02-project-preparation-2",
    "chapter": "u5-02-project-preparation",
    "level": 2,
    "question": "第2章 准备游戏开发为什么必须保留目录项“开发的游戏以及开发顺序”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "准备游戏开发",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-02-project-preparation-3",
    "chapter": "u5-02-project-preparation",
    "level": 3,
    "question": "第2章 准备游戏开发的关键证据链是什么？",
    "answer": "游戏范围 → 开发顺序 → 新建项目 → IDE配置 → 资源组织 → 角色导入。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "准备游戏开发",
      "项目链路"
    ]
  },
  {
    "id": "u5-02-project-preparation-4",
    "chapter": "u5-02-project-preparation",
    "level": 4,
    "question": "第2章 准备游戏开发最有诊断价值的失败样本是什么？",
    "answer": "把下载资源直接堆到 Assets 根目录，重命名或覆盖同名文件后才发现材质、动画和脚本依赖断裂。",
    "tags": [
      "准备游戏开发",
      "失败注入"
    ]
  },
  {
    "id": "u5-02-project-preparation-5",
    "chapter": "u5-02-project-preparation",
    "level": 2,
    "question": "第2章 准备游戏开发签发时必须保留什么不变量？",
    "answer": "导入资源必须保留目录、依赖、许可证和版本信息，项目结构必须让后续场景与脚本引用稳定。",
    "tags": [
      "准备游戏开发",
      "行为不变量"
    ]
  },
  {
    "id": "u5-02-project-preparation-6",
    "chapter": "u5-02-project-preparation",
    "level": 3,
    "question": "第2章 准备游戏开发至少保存哪些验收证据？",
    "answer": "保存游戏范围、开发顺序、新建项目、IDE配置、资源组织、角色导入各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "准备游戏开发",
      "验收证据"
    ]
  },
  {
    "id": "u5-03-game-scene-1",
    "chapter": "u5-03-game-scene",
    "level": 1,
    "question": "第3章 制作游戏场景在原书项目主线中的输入和输出是什么？",
    "answer": "输入从3D模型开始，输出到天空盒；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "制作游戏场景",
      "原书复刻"
    ]
  },
  {
    "id": "u5-03-game-scene-2",
    "chapter": "u5-03-game-scene",
    "level": 2,
    "question": "第3章 制作游戏场景为什么必须保留目录项“3D 模型”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "制作游戏场景",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-03-game-scene-3",
    "chapter": "u5-03-game-scene",
    "level": 3,
    "question": "第3章 制作游戏场景的关键证据链是什么？",
    "answer": "3D模型 → 纹理导入 → 材质 → PBR通道 → 光照 → 天空盒。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "制作游戏场景",
      "项目链路"
    ]
  },
  {
    "id": "u5-03-game-scene-4",
    "chapter": "u5-03-game-scene",
    "level": 4,
    "question": "第3章 制作游戏场景最有诊断价值的失败样本是什么？",
    "answer": "把纹理直接当材质、把法线图按颜色图导入，或用环境曝光掩盖缺失光源，导致目标机外观完全不同。",
    "tags": [
      "制作游戏场景",
      "失败注入"
    ]
  },
  {
    "id": "u5-03-game-scene-5",
    "chapter": "u5-03-game-scene",
    "level": 2,
    "question": "第3章 制作游戏场景签发时必须保留什么不变量？",
    "answer": "场景外观必须由可追溯模型、材质参数、光源和天空配置共同决定，不能依赖丢失引用或编辑器临时状态。",
    "tags": [
      "制作游戏场景",
      "行为不变量"
    ]
  },
  {
    "id": "u5-03-game-scene-6",
    "chapter": "u5-03-game-scene",
    "level": 3,
    "question": "第3章 制作游戏场景至少保存哪些验收证据？",
    "answer": "保存3D模型、纹理导入、材质、PBR通道、光照、天空盒各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "制作游戏场景",
      "验收证据"
    ]
  },
  {
    "id": "u5-04-player-character-1",
    "chapter": "u5-04-player-character",
    "level": 1,
    "question": "第4章 制作主人公角色在原书项目主线中的输入和输出是什么？",
    "answer": "输入从角色模型开始，输出到动画阴影；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "制作主人公角色",
      "原书复刻"
    ]
  },
  {
    "id": "u5-04-player-character-2",
    "chapter": "u5-04-player-character",
    "level": 2,
    "question": "第4章 制作主人公角色为什么必须保留目录项“空游戏对象”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "制作主人公角色",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-04-player-character-3",
    "chapter": "u5-04-player-character",
    "level": 3,
    "question": "第4章 制作主人公角色的关键证据链是什么？",
    "answer": "角色模型 → 组件缓存 → 输入向量 → 移动旋转 → 相机跟随 → 动画阴影。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "制作主人公角色",
      "项目链路"
    ]
  },
  {
    "id": "u5-04-player-character-4",
    "chapter": "u5-04-player-character",
    "level": 4,
    "question": "第4章 制作主人公角色最有诊断价值的失败样本是什么？",
    "answer": "每帧重复查找组件并用未经归一化的方向直接位移，导致斜向更快、相机抖动和动画状态漂移。",
    "tags": [
      "制作主人公角色",
      "失败注入"
    ]
  },
  {
    "id": "u5-04-player-character-5",
    "chapter": "u5-04-player-character",
    "level": 2,
    "question": "第4章 制作主人公角色签发时必须保留什么不变量？",
    "answer": "角色移动、相机、动画与阴影必须共享明确坐标和更新时序，在不同帧率下保持相同玩法结果。",
    "tags": [
      "制作主人公角色",
      "行为不变量"
    ]
  },
  {
    "id": "u5-04-player-character-6",
    "chapter": "u5-04-player-character",
    "level": 3,
    "question": "第4章 制作主人公角色至少保存哪些验收证据？",
    "answer": "保存角色模型、组件缓存、输入向量、移动旋转、相机跟随、动画阴影各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "制作主人公角色",
      "验收证据"
    ]
  },
  {
    "id": "u5-05-projectile-effects-1",
    "chapter": "u5-05-projectile-effects",
    "level": 1,
    "question": "第5章 制作子弹发射效果在原书项目主线中的输入和输出是什么？",
    "answer": "输入从输入发射开始，输出到视听反馈；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "子弹发射效果",
      "原书复刻"
    ]
  },
  {
    "id": "u5-05-projectile-effects-2",
    "chapter": "u5-05-projectile-effects",
    "level": 2,
    "question": "第5章 制作子弹发射效果为什么必须保留目录项“准备子弹模型”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "子弹发射效果",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-05-projectile-effects-3",
    "chapter": "u5-05-projectile-effects",
    "level": 3,
    "question": "第5章 制作子弹发射效果的关键证据链是什么？",
    "answer": "输入发射 → 子弹生成 → 刚体运动 → 碰撞感知 → 伤害结算 → 视听反馈。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "子弹发射效果",
      "项目链路"
    ]
  },
  {
    "id": "u5-05-projectile-effects-4",
    "chapter": "u5-05-projectile-effects",
    "level": 4,
    "question": "第5章 制作子弹发射效果最有诊断价值的失败样本是什么？",
    "answer": "只播放爆炸特效却没有唯一命中结算，或高速子弹穿过 Collider 后仍生成声音与粒子，造成证据与玩法脱节。",
    "tags": [
      "子弹发射效果",
      "失败注入"
    ]
  },
  {
    "id": "u5-05-projectile-effects-5",
    "chapter": "u5-05-projectile-effects",
    "level": 2,
    "question": "第5章 制作子弹发射效果签发时必须保留什么不变量？",
    "answer": "子弹命中、伤害、生命周期和视听效果必须由同一次发射事件关联，不能因帧率或对象复用重复结算。",
    "tags": [
      "子弹发射效果",
      "行为不变量"
    ]
  },
  {
    "id": "u5-05-projectile-effects-6",
    "chapter": "u5-05-projectile-effects",
    "level": 3,
    "question": "第5章 制作子弹发射效果至少保存哪些验收证据？",
    "answer": "保存输入发射、子弹生成、刚体运动、碰撞感知、伤害结算、视听反馈各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "子弹发射效果",
      "验收证据"
    ]
  },
  {
    "id": "u5-06-enemy-character-1",
    "chapter": "u5-06-enemy-character",
    "level": 1,
    "question": "第6章 制作敌对角色在原书项目主线中的输入和输出是什么？",
    "answer": "输入从模型与Avatar开始，输出到死亡清理；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "制作敌对角色",
      "原书复刻"
    ]
  },
  {
    "id": "u5-06-enemy-character-2",
    "chapter": "u5-06-enemy-character",
    "level": 2,
    "question": "第6章 制作敌对角色为什么必须保留目录项“Mecanim 动画系统”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "制作敌对角色",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-06-enemy-character-3",
    "chapter": "u5-06-enemy-character",
    "level": 3,
    "question": "第6章 制作敌对角色的关键证据链是什么？",
    "answer": "模型与Avatar → Animator → NavMesh追击 → AI决策 → 战斗反馈 → 死亡清理。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "制作敌对角色",
      "项目链路"
    ]
  },
  {
    "id": "u5-06-enemy-character-4",
    "chapter": "u5-06-enemy-character",
    "level": 4,
    "question": "第6章 制作敌对角色最有诊断价值的失败样本是什么？",
    "answer": "动画事件、碰撞和 AI Update 同时触发伤害，敌人死亡后仍寻路攻击，或对象销毁前留下未解绑事件。",
    "tags": [
      "制作敌对角色",
      "失败注入"
    ]
  },
  {
    "id": "u5-06-enemy-character-5",
    "chapter": "u5-06-enemy-character",
    "level": 2,
    "question": "第6章 制作敌对角色签发时必须保留什么不变量？",
    "answer": "敌人的导航、动画、攻击、受击与死亡状态必须单向可解释，任何事件只能在合法状态结算一次。",
    "tags": [
      "制作敌对角色",
      "行为不变量"
    ]
  },
  {
    "id": "u5-06-enemy-character-6",
    "chapter": "u5-06-enemy-character",
    "level": 3,
    "question": "第6章 制作敌对角色至少保存哪些验收证据？",
    "answer": "保存模型与Avatar、Animator、NavMesh追击、AI决策、战斗反馈、死亡清理各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "制作敌对角色",
      "验收证据"
    ]
  },
  {
    "id": "u5-07-unity-ui-1",
    "chapter": "u5-07-unity-ui",
    "level": 1,
    "question": "第7章 Unity UI在原书项目主线中的输入和输出是什么？",
    "answer": "输入从Canvas开始，输出到响应式显示；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "Unity UI",
      "原书复刻"
    ]
  },
  {
    "id": "u5-07-unity-ui-2",
    "chapter": "u5-07-unity-ui",
    "level": 2,
    "question": "第7章 Unity UI为什么必须保留目录项“Canvas 对象”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "Unity UI",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-07-unity-ui-3",
    "chapter": "u5-07-unity-ui",
    "level": 3,
    "question": "第7章 Unity UI的关键证据链是什么？",
    "answer": "Canvas → RectTransform → 视觉组件 → 交互组件 → 游戏数据 → 响应式显示。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "Unity UI",
      "项目链路"
    ]
  },
  {
    "id": "u5-07-unity-ui-4",
    "chapter": "u5-07-unity-ui",
    "level": 4,
    "question": "第7章 Unity UI最有诊断价值的失败样本是什么？",
    "answer": "用固定像素摆放所有控件并把装饰图也设为 Raycast Target，导致宽高比变化错位且输入被透明元素拦截。",
    "tags": [
      "Unity UI",
      "失败注入"
    ]
  },
  {
    "id": "u5-07-unity-ui-5",
    "chapter": "u5-07-unity-ui",
    "level": 2,
    "question": "第7章 Unity UI签发时必须保留什么不变量？",
    "answer": "UI 布局和输入必须在目标分辨率下保持锚点关系、命中顺序、可见状态与数据源一致。",
    "tags": [
      "Unity UI",
      "行为不变量"
    ]
  },
  {
    "id": "u5-07-unity-ui-6",
    "chapter": "u5-07-unity-ui",
    "level": 3,
    "question": "第7章 Unity UI至少保存哪些验收证据？",
    "answer": "保存Canvas、RectTransform、视觉组件、交互组件、游戏数据、响应式显示各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "Unity UI",
      "验收证据"
    ]
  },
  {
    "id": "u5-08-game-manager-1",
    "chapter": "u5-08-game-manager",
    "level": 1,
    "question": "第8章 游戏管理器在原书项目主线中的输入和输出是什么？",
    "answer": "输入从场景启动开始，输出到对象归还；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "游戏管理器",
      "原书复刻"
    ]
  },
  {
    "id": "u5-08-game-manager-2",
    "chapter": "u5-08-game-manager",
    "level": 2,
    "question": "第8章 游戏管理器为什么必须保留目录项“怪兽出现逻辑”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "游戏管理器",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-08-game-manager-3",
    "chapter": "u5-08-game-manager",
    "level": 3,
    "question": "第8章 游戏管理器的关键证据链是什么？",
    "answer": "场景启动 → 管理器实例 → 怪兽生成 → 对象借出 → 共享服务 → 对象归还。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "游戏管理器",
      "项目链路"
    ]
  },
  {
    "id": "u5-08-game-manager-4",
    "chapter": "u5-08-game-manager",
    "level": 4,
    "question": "第8章 游戏管理器最有诊断价值的失败样本是什么？",
    "answer": "静态 Instance 指向已销毁对象，或对象池只重置位置却保留血量、事件订阅和粒子播放状态。",
    "tags": [
      "游戏管理器",
      "失败注入"
    ]
  },
  {
    "id": "u5-08-game-manager-5",
    "chapter": "u5-08-game-manager",
    "level": 2,
    "question": "第8章 游戏管理器签发时必须保留什么不变量？",
    "answer": "管理器必须限制唯一实例、显式初始化与清理，并让池化对象每次借还都恢复完整状态。",
    "tags": [
      "游戏管理器",
      "行为不变量"
    ]
  },
  {
    "id": "u5-08-game-manager-6",
    "chapter": "u5-08-game-manager",
    "level": 3,
    "question": "第8章 游戏管理器至少保存哪些验收证据？",
    "answer": "保存场景启动、管理器实例、怪兽生成、对象借出、共享服务、对象归还各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "游戏管理器",
      "验收证据"
    ]
  },
  {
    "id": "u5-09-raycasting-1",
    "chapter": "u5-09-raycasting",
    "level": 1,
    "question": "第9章 灵活运用射线投射在原书项目主线中的输入和输出是什么？",
    "answer": "输入从射线来源开始，输出到激光表现；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "射线投射",
      "原书复刻"
    ]
  },
  {
    "id": "u5-09-raycasting-2",
    "chapter": "u5-09-raycasting",
    "level": 2,
    "question": "第9章 灵活运用射线投射为什么必须保留目录项“射线投射”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "射线投射",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-09-raycasting-3",
    "chapter": "u5-09-raycasting",
    "level": 3,
    "question": "第9章 灵活运用射线投射的关键证据链是什么？",
    "answer": "射线来源 → 方向距离 → LayerMask → 命中信息 → 玩法结算 → 激光表现。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "射线投射",
      "项目链路"
    ]
  },
  {
    "id": "u5-09-raycasting-4",
    "chapter": "u5-09-raycasting",
    "level": 4,
    "question": "第9章 灵活运用射线投射最有诊断价值的失败样本是什么？",
    "answer": "从错误相机或局部方向发射无限射线，命中自身碰撞体后仍触发场景爆炸或激光反馈。",
    "tags": [
      "射线投射",
      "失败注入"
    ]
  },
  {
    "id": "u5-09-raycasting-5",
    "chapter": "u5-09-raycasting",
    "level": 2,
    "question": "第9章 灵活运用射线投射签发时必须保留什么不变量？",
    "answer": "射线查询必须限定空间、层和触发器策略，命中结果只能驱动一次合法玩法结算。",
    "tags": [
      "射线投射",
      "行为不变量"
    ]
  },
  {
    "id": "u5-09-raycasting-6",
    "chapter": "u5-09-raycasting",
    "level": 3,
    "question": "第9章 灵活运用射线投射至少保存哪些验收证据？",
    "answer": "保存射线来源、方向距离、LayerMask、命中信息、玩法结算、激光表现各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "射线投射",
      "验收证据"
    ]
  },
  {
    "id": "u5-10-navigation-advanced-1",
    "chapter": "u5-10-navigation-advanced",
    "level": 1,
    "question": "第10章 导航仪高级技巧在原书项目主线中的输入和输出是什么？",
    "answer": "输入从烘焙NavMesh开始，输出到重新落网；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "导航高级技巧",
      "原书复刻"
    ]
  },
  {
    "id": "u5-10-navigation-advanced-2",
    "chapter": "u5-10-navigation-advanced",
    "level": 2,
    "question": "第10章 导航仪高级技巧为什么必须保留目录项“动态障碍物”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "导航高级技巧",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-10-navigation-advanced-3",
    "chapter": "u5-10-navigation-advanced",
    "level": 3,
    "question": "第10章 导航仪高级技巧的关键证据链是什么？",
    "answer": "烘焙NavMesh → 动态障碍 → 链接端点 → 代理进入 → 特殊移动 → 重新落网。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "导航高级技巧",
      "项目链路"
    ]
  },
  {
    "id": "u5-10-navigation-advanced-4",
    "chapter": "u5-10-navigation-advanced",
    "level": 4,
    "question": "第10章 导航仪高级技巧最有诊断价值的失败样本是什么？",
    "answer": "链接端点悬空或双向设置错误，代理进入跳跃状态后路径重算，无法完成动画也无法回到 NavMesh。",
    "tags": [
      "导航高级技巧",
      "失败注入"
    ]
  },
  {
    "id": "u5-10-navigation-advanced-5",
    "chapter": "u5-10-navigation-advanced",
    "level": 2,
    "question": "第10章 导航仪高级技巧签发时必须保留什么不变量？",
    "answer": "导航链接必须保持入口出口、方向、代价、动画和失败恢复一致，动态障碍不能让代理永久卡死。",
    "tags": [
      "导航高级技巧",
      "行为不变量"
    ]
  },
  {
    "id": "u5-10-navigation-advanced-6",
    "chapter": "u5-10-navigation-advanced",
    "level": 3,
    "question": "第10章 导航仪高级技巧至少保存哪些验收证据？",
    "answer": "保存烘焙NavMesh、动态障碍、链接端点、代理进入、特殊移动、重新落网各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "导航高级技巧",
      "验收证据"
    ]
  },
  {
    "id": "u5-11-lightmaps-light-probes-1",
    "chapter": "u5-11-lightmaps-light-probes",
    "level": 1,
    "question": "第11章 光照贴图与灯光探测器在原书项目主线中的输入和输出是什么？",
    "answer": "输入从Lightmap UV开始，输出到动态对象采样；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "光照贴图与灯光探测器",
      "原书复刻"
    ]
  },
  {
    "id": "u5-11-lightmaps-light-probes-2",
    "chapter": "u5-11-lightmaps-light-probes",
    "level": 2,
    "question": "第11章 光照贴图与灯光探测器为什么必须保留目录项“光照”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "光照贴图与灯光探测器",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-11-lightmaps-light-probes-3",
    "chapter": "u5-11-lightmaps-light-probes",
    "level": 3,
    "question": "第11章 光照贴图与灯光探测器的关键证据链是什么？",
    "answer": "Lightmap UV → 静态标记 → 光照设置 → 烘焙贴图 → Light Probe → 动态对象采样。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "光照贴图与灯光探测器",
      "项目链路"
    ]
  },
  {
    "id": "u5-11-lightmaps-light-probes-4",
    "chapter": "u5-11-lightmaps-light-probes",
    "level": 4,
    "question": "第11章 光照贴图与灯光探测器最有诊断价值的失败样本是什么？",
    "answer": "修改墙体或光源后继续使用旧烘焙数据，或把探针全放在地面，角色上半身出现明显错误光照。",
    "tags": [
      "光照贴图与灯光探测器",
      "失败注入"
    ]
  },
  {
    "id": "u5-11-lightmaps-light-probes-5",
    "chapter": "u5-11-lightmaps-light-probes",
    "level": 2,
    "question": "第11章 光照贴图与灯光探测器签发时必须保留什么不变量？",
    "answer": "烘焙输出必须对应当前场景几何、静态标记、UV、光源和质量设置，动态对象的探针采样应连续。",
    "tags": [
      "光照贴图与灯光探测器",
      "行为不变量"
    ]
  },
  {
    "id": "u5-11-lightmaps-light-probes-6",
    "chapter": "u5-11-lightmaps-light-probes",
    "level": 3,
    "question": "第11章 光照贴图与灯光探测器至少保存哪些验收证据？",
    "answer": "保存Lightmap UV、静态标记、光照设置、烘焙贴图、Light Probe、动态对象采样各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "光照贴图与灯光探测器",
      "验收证据"
    ]
  },
  {
    "id": "u5-12-scene-split-merge-1",
    "chapter": "u5-12-scene-split-merge",
    "level": 1,
    "question": "第12章 场景分离与合并在原书项目主线中的输入和输出是什么？",
    "answer": "输入从世界边界开始，输出到反向卸载；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "场景分离与合并",
      "原书复刻"
    ]
  },
  {
    "id": "u5-12-scene-split-merge-2",
    "chapter": "u5-12-scene-split-merge",
    "level": 2,
    "question": "第12章 场景分离与合并为什么必须保留目录项“场景分离”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "场景分离与合并",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-12-scene-split-merge-3",
    "chapter": "u5-12-scene-split-merge",
    "level": 3,
    "question": "第12章 场景分离与合并的关键证据链是什么？",
    "answer": "世界边界 → 场景分离 → 共享依赖 → Additive加载 → 初始化 → 反向卸载。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "场景分离与合并",
      "项目链路"
    ]
  },
  {
    "id": "u5-12-scene-split-merge-4",
    "chapter": "u5-12-scene-split-merge",
    "level": 4,
    "question": "第12章 场景分离与合并最有诊断价值的失败样本是什么？",
    "answer": "把共同依赖复制进多个场景，合并后出现重复管理器、灯光、EventSystem 或跨场景引用丢失。",
    "tags": [
      "场景分离与合并",
      "失败注入"
    ]
  },
  {
    "id": "u5-12-scene-split-merge-5",
    "chapter": "u5-12-scene-split-merge",
    "level": 2,
    "question": "第12章 场景分离与合并签发时必须保留什么不变量？",
    "answer": "拆分前后对象 GUID、世界坐标、光照、导航、事件、初始化顺序和卸载责任必须一致。",
    "tags": [
      "场景分离与合并",
      "行为不变量"
    ]
  },
  {
    "id": "u5-12-scene-split-merge-6",
    "chapter": "u5-12-scene-split-merge",
    "level": 3,
    "question": "第12章 场景分离与合并至少保存哪些验收证据？",
    "answer": "保存世界边界、场景分离、共享依赖、Additive加载、初始化、反向卸载各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "场景分离与合并",
      "验收证据"
    ]
  },
  {
    "id": "u5-13-built-in-networking-1",
    "chapter": "u5-13-built-in-networking",
    "level": 1,
    "question": "第13章 Unity 内置网络游戏在原书项目主线中的输入和输出是什么？",
    "answer": "输入从服务器初始化开始，输出到断线清理；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "Unity 内置网络游戏",
      "原书复刻"
    ]
  },
  {
    "id": "u5-13-built-in-networking-2",
    "chapter": "u5-13-built-in-networking",
    "level": 2,
    "question": "第13章 Unity 内置网络游戏为什么必须保留目录项“网络游戏的定义”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "Unity 内置网络游戏",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-13-built-in-networking-3",
    "chapter": "u5-13-built-in-networking",
    "level": 3,
    "question": "第13章 Unity 内置网络游戏的关键证据链是什么？",
    "answer": "服务器初始化 → 客户端连接 → 玩家生成 → 状态同步 → RPC事件 → 断线清理。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "Unity 内置网络游戏",
      "项目链路"
    ]
  },
  {
    "id": "u5-13-built-in-networking-4",
    "chapter": "u5-13-built-in-networking",
    "level": 4,
    "question": "第13章 Unity 内置网络游戏最有诊断价值的失败样本是什么？",
    "answer": "所有客户端都能直接修改生命值和生成子弹，延迟或重连后状态分叉，却只在本机双开测试里看起来正常。",
    "tags": [
      "Unity 内置网络游戏",
      "失败注入"
    ]
  },
  {
    "id": "u5-13-built-in-networking-5",
    "chapter": "u5-13-built-in-networking",
    "level": 2,
    "question": "第13章 Unity 内置网络游戏签发时必须保留什么不变量？",
    "answer": "网络对象必须有唯一所有权和可验证同步方向，RPC、状态同步与碰撞结算不能重复或信任错误端点。",
    "tags": [
      "Unity 内置网络游戏",
      "行为不变量"
    ]
  },
  {
    "id": "u5-13-built-in-networking-6",
    "chapter": "u5-13-built-in-networking",
    "level": 3,
    "question": "第13章 Unity 内置网络游戏至少保存哪些验收证据？",
    "answer": "保存服务器初始化、客户端连接、玩家生成、状态同步、RPC事件、断线清理各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "Unity 内置网络游戏",
      "验收证据"
    ]
  },
  {
    "id": "u5-14-photon-cloud-1",
    "chapter": "u5-14-photon-cloud",
    "level": 1,
    "question": "第14章 使用 Photon Cloud 制作网络游戏在原书项目主线中的输入和输出是什么？",
    "answer": "输入从连接Photon开始，输出到排名持久化；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "Photon Cloud 网络游戏",
      "原书复刻"
    ]
  },
  {
    "id": "u5-14-photon-cloud-2",
    "chapter": "u5-14-photon-cloud",
    "level": 2,
    "question": "第14章 使用 Photon Cloud 制作网络游戏为什么必须保留目录项“第二代 Unity 网络游戏引擎 UNET”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "Photon Cloud 网络游戏",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-14-photon-cloud-3",
    "chapter": "u5-14-photon-cloud",
    "level": 3,
    "question": "第14章 使用 Photon Cloud 制作网络游戏的关键证据链是什么？",
    "answer": "连接Photon → 匹配与房间 → 生成坦克 → 状态事件同步 → 大厅HUD → 排名持久化。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "Photon Cloud 网络游戏",
      "项目链路"
    ]
  },
  {
    "id": "u5-14-photon-cloud-4",
    "chapter": "u5-14-photon-cloud",
    "level": 4,
    "question": "第14章 使用 Photon Cloud 制作网络游戏最有诊断价值的失败样本是什么？",
    "answer": "用昵称或列表索引当玩家身份，重连或房间列表重排后把得分、按钮和坦克状态绑定到错误玩家。",
    "tags": [
      "Photon Cloud 网络游戏",
      "失败注入"
    ]
  },
  {
    "id": "u5-14-photon-cloud-5",
    "chapter": "u5-14-photon-cloud",
    "level": 2,
    "question": "第14章 使用 Photon Cloud 制作网络游戏签发时必须保留什么不变量？",
    "answer": "连接、房间、玩家、坦克、炮弹、得分和排名必须有唯一 ID、清晰所有权、幂等事件与离房清理。",
    "tags": [
      "Photon Cloud 网络游戏",
      "行为不变量"
    ]
  },
  {
    "id": "u5-14-photon-cloud-6",
    "chapter": "u5-14-photon-cloud",
    "level": 3,
    "question": "第14章 使用 Photon Cloud 制作网络游戏至少保存哪些验收证据？",
    "answer": "保存连接Photon、匹配与房间、生成坦克、状态事件同步、大厅HUD、排名持久化各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "Photon Cloud 网络游戏",
      "验收证据"
    ]
  },
  {
    "id": "u5-15-game-realism-1",
    "chapter": "u5-15-game-realism",
    "level": 1,
    "question": "第15章 提升游戏真实感在原书项目主线中的输入和输出是什么？",
    "answer": "输入从动画姿态开始，输出到角色移动；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "提升游戏真实感",
      "原书复刻"
    ]
  },
  {
    "id": "u5-15-game-realism-2",
    "chapter": "u5-15-game-realism",
    "level": 2,
    "question": "第15章 提升游戏真实感为什么必须保留目录项“布娃娃系统”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "提升游戏真实感",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-15-game-realism-3",
    "chapter": "u5-15-game-realism",
    "level": 3,
    "question": "第15章 提升游戏真实感的关键证据链是什么？",
    "answer": "动画姿态 → 布娃娃切换 → 碰撞受力 → 触点采样 → 屏幕射线 → 角色移动。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "提升游戏真实感",
      "项目链路"
    ]
  },
  {
    "id": "u5-15-game-realism-4",
    "chapter": "u5-15-game-realism",
    "level": 4,
    "question": "第15章 提升游戏真实感最有诊断价值的失败样本是什么？",
    "answer": "同时启用 Animator 和布娃娃刚体导致骨骼争夺，或把屏幕像素直接当世界坐标导致不同设备移动方向错误。",
    "tags": [
      "提升游戏真实感",
      "失败注入"
    ]
  },
  {
    "id": "u5-15-game-realism-5",
    "chapter": "u5-15-game-realism",
    "level": 2,
    "question": "第15章 提升游戏真实感签发时必须保留什么不变量？",
    "answer": "动画到布娃娃的切换必须保持姿态和碰撞一致，触屏输入必须基于触点阶段、相机射线与目标平面稳定解释。",
    "tags": [
      "提升游戏真实感",
      "行为不变量"
    ]
  },
  {
    "id": "u5-15-game-realism-6",
    "chapter": "u5-15-game-realism",
    "level": 3,
    "question": "第15章 提升游戏真实感至少保存哪些验收证据？",
    "answer": "保存动画姿态、布娃娃切换、碰撞受力、触点采样、屏幕射线、角色移动各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "提升游戏真实感",
      "验收证据"
    ]
  },
  {
    "id": "u5-appendix-database-1",
    "chapter": "u5-appendix-database",
    "level": 1,
    "question": "附录 数据库在原书项目主线中的输入和输出是什么？",
    "answer": "输入从游戏事件开始，输出到排名响应；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "数据库附录",
      "原书复刻"
    ]
  },
  {
    "id": "u5-appendix-database-2",
    "chapter": "u5-appendix-database",
    "level": 2,
    "question": "附录 数据库为什么必须保留目录项“数据库和数据库管理系统”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "数据库附录",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-appendix-database-3",
    "chapter": "u5-appendix-database",
    "level": 3,
    "question": "附录 数据库的关键证据链是什么？",
    "answer": "游戏事件 → 服务端校验 → 参数化写入 → 数据表 → 排序查询 → 排名响应。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "数据库附录",
      "项目链路"
    ]
  },
  {
    "id": "u5-appendix-database-4",
    "chapter": "u5-appendix-database",
    "level": 4,
    "question": "附录 数据库最有诊断价值的失败样本是什么？",
    "answer": "Unity 客户端直接拼接 SQL 并连接公网数据库，既暴露凭据又允许篡改分数和注入查询。",
    "tags": [
      "数据库附录",
      "失败注入"
    ]
  },
  {
    "id": "u5-appendix-database-5",
    "chapter": "u5-appendix-database",
    "level": 2,
    "question": "附录 数据库签发时必须保留什么不变量？",
    "answer": "客户端不得持有数据库高权限凭据，写入必须校验身份与范围，排名查询必须有稳定排序和分页合同。",
    "tags": [
      "数据库附录",
      "行为不变量"
    ]
  },
  {
    "id": "u5-appendix-database-6",
    "chapter": "u5-appendix-database",
    "level": 3,
    "question": "附录 数据库至少保存哪些验收证据？",
    "answer": "保存游戏事件、服务端校验、参数化写入、数据表、排序查询、排名响应各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "数据库附录",
      "验收证据"
    ]
  },
  {
    "id": "u5-official-final-review-1",
    "chapter": "u5-official-final-review",
    "level": 1,
    "question": "《Unity 5权威讲解》全书综合验收在原书项目主线中的输入和输出是什么？",
    "answer": "输入从冻结项目版本开始，输出到完整签发；中间每个对象、状态与事件都必须可追溯。",
    "tags": [
      "全书综合验收",
      "原书复刻"
    ]
  },
  {
    "id": "u5-official-final-review-2",
    "chapter": "u5-official-final-review",
    "level": 2,
    "question": "《Unity 5权威讲解》全书综合验收为什么必须保留目录项“Unity 5 简介”？",
    "answer": "它定义本章在 TPS 项目中的独有责任，不能被通用 API 教程替代。",
    "tags": [
      "全书综合验收",
      "目录覆盖"
    ]
  },
  {
    "id": "u5-official-final-review-3",
    "chapter": "u5-official-final-review",
    "level": 3,
    "question": "《Unity 5权威讲解》全书综合验收的关键证据链是什么？",
    "answer": "冻结项目版本 → 运行单机TPS → 注入战斗失败 → 验证网络重连 → 核对排名数据 → 完整签发。每一步保存对象 ID、状态、事件次数、结果与清理责任。",
    "tags": [
      "全书综合验收",
      "项目链路"
    ]
  },
  {
    "id": "u5-official-final-review-4",
    "chapter": "u5-official-final-review",
    "level": 4,
    "question": "《Unity 5权威讲解》全书综合验收最有诊断价值的失败样本是什么？",
    "answer": "单章示例都能运行，却无法组合成完整场景；网络、对象池和事件在重载或重连后产生重复对象和错误状态。",
    "tags": [
      "全书综合验收",
      "失败注入"
    ]
  },
  {
    "id": "u5-official-final-review-5",
    "chapter": "u5-official-final-review",
    "level": 2,
    "question": "《Unity 5权威讲解》全书综合验收签发时必须保留什么不变量？",
    "answer": "每一章都要保留正常、边界与失败样本，历史网络 API 只能作为原书复现，不能冒充当前生产推荐。",
    "tags": [
      "全书综合验收",
      "行为不变量"
    ]
  },
  {
    "id": "u5-official-final-review-6",
    "chapter": "u5-official-final-review",
    "level": 3,
    "question": "《Unity 5权威讲解》全书综合验收至少保存哪些验收证据？",
    "answer": "保存冻结项目版本、运行单机TPS、注入战斗失败、验证网络重连、核对排名数据、完整签发各节点、版本与场景指纹、正常边界失败三组记录，以及重载或重连后的清理结果。",
    "tags": [
      "全书综合验收",
      "验收证据"
    ]
  }
];
