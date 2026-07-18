import type { ReviewQuestion } from "./types";

export const ugcOfficialQuestions: ReviewQuestion[] = [
  {
    id: "ugc-official-learning-map-1",
    chapter: "ugc-official-learning-map",
    level: 1,
    question: "全书导读中，什么是“权威章序”？",
    answer: "由2015年版书目和目录固定的11章顺序",
    tags: ["全书导读", "原书复刻"],
  },
  {
    id: "ugc-official-learning-map-2",
    chapter: "ugc-official-learning-map",
    level: 2,
    question:
      "全书导读为什么必须保留原目录单元“第1章 Unity 3D基础以及开发环境的搭建”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或其他案例替代。",
    tags: ["全书导读", "目录覆盖"],
  },
  {
    id: "ugc-official-learning-map-3",
    chapter: "ugc-official-learning-map",
    level: 3,
    question: "全书导读的关键输入、状态与输出链是什么？",
    answer:
      "用同一案例证据模板追踪策划目标、场景清单、资源、脚本、输入、状态、胜负和性能；导读只连接11章，不替代任何案例。",
    tags: ["全书导读", "数据流"],
  },
  {
    id: "ugc-official-learning-map-4",
    chapter: "ugc-official-learning-map",
    level: 4,
    question: "全书导读最有诊断价值的故障样本应怎样设计？",
    answer:
      "故意破坏“权威章序”对应的首个输入或门禁，保存首条偏离信号，并用同一回放在修复后证明它恢复。",
    tags: ["全书导读", "失败注入"],
  },
  {
    id: "ugc-official-learning-map-5",
    chapter: "ugc-official-learning-map",
    level: 2,
    question: "全书导读迁移到当前Unity时必须保留什么不变量？",
    answer:
      "必须保留原章的场景、玩法目标和状态契约；NGUI、旧输入接口或资源API可以替换，但不能删除“第1章 Unity 3D基础以及开发环境的搭建”及其可观察结果。",
    tags: ["全书导读", "现代迁移"],
  },
  {
    id: "ugc-official-learning-map-6",
    chapter: "ugc-official-learning-map",
    level: 3,
    question: "全书导读签发前至少保存哪些证据？",
    answer:
      "保存版本与设备、场景入口、正常边界失败三组输入、环境、策划、场景架构、核心玩法、移动交互、优化证据的状态快照、Profiler数据以及修复后回放。",
    tags: ["全书导读", "验收证据"],
  },
  {
    id: "ugc-01-unity3d-foundation-environment-1",
    chapter: "ugc-01-unity3d-foundation-environment",
    level: 1,
    question: "第1章中，什么是“项目基线”？",
    answer: "可重复打开构建并运行的固定版本项目",
    tags: ["第1章", "原书复刻"],
  },
  {
    id: "ugc-01-unity3d-foundation-environment-2",
    chapter: "ugc-01-unity3d-foundation-environment",
    level: 2,
    question: "第1章为什么必须保留原目录单元“Unity 3D基础知识概览”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或其他案例替代。",
    tags: ["第1章", "目录覆盖"],
  },
  {
    id: "ugc-01-unity3d-foundation-environment-3",
    chapter: "ugc-01-unity3d-foundation-environment",
    level: 3,
    question: "第1章的关键输入、状态与输出链是什么？",
    answer:
      "从干净目录导入一份案例，解析序列化资产和脚本，打开指定入口场景，在编辑器和目标设备执行烟雾测试；任何自动升级都先在副本完成。",
    tags: ["第1章", "数据流"],
  },
  {
    id: "ugc-01-unity3d-foundation-environment-4",
    chapter: "ugc-01-unity3d-foundation-environment",
    level: 4,
    question: "第1章最有诊断价值的故障样本应怎样设计？",
    answer:
      "故意破坏“项目基线”对应的首个输入或门禁，保存首条偏离信号，并用同一回放在修复后证明它恢复。",
    tags: ["第1章", "失败注入"],
  },
  {
    id: "ugc-01-unity3d-foundation-environment-5",
    chapter: "ugc-01-unity3d-foundation-environment",
    level: 2,
    question: "第1章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "必须保留原章的场景、玩法目标和状态契约；NGUI、旧输入接口或资源API可以替换，但不能删除“Unity 3D基础知识概览”及其可观察结果。",
    tags: ["第1章", "现代迁移"],
  },
  {
    id: "ugc-01-unity3d-foundation-environment-6",
    chapter: "ugc-01-unity3d-foundation-environment",
    level: 3,
    question: "第1章签发前至少保存哪些证据？",
    answer:
      "保存版本与设备、场景入口、正常边界失败三组输入、Unity版本、编辑器、目标SDK、项目导入、场景入口、运行日志的状态快照、Profiler数据以及修复后回放。",
    tags: ["第1章", "验收证据"],
  },
  {
    id: "ugc-02-3d-billiards-1",
    chapter: "ugc-02-3d-billiards",
    level: 1,
    question: "第2章中，什么是“击球冲量”？",
    answer: "在一个物理时刻改变母球动量的瞬时作用",
    tags: ["第2章", "原书复刻"],
  },
  {
    id: "ugc-02-3d-billiards-2",
    chapter: "ugc-02-3d-billiards",
    level: 2,
    question: "第2章为什么必须保留原目录单元“游戏背景及功能概述”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或其他案例替代。",
    tags: ["第2章", "目录覆盖"],
  },
  {
    id: "ugc-02-3d-billiards-3",
    chapter: "ugc-02-3d-billiards",
    level: 3,
    question: "第2章的关键输入、状态与输出链是什么？",
    answer:
      "输入先确定球杆方向和力度，固定物理步施加一次冲量；碰撞与袋口触发更新回合状态，所有球静止后才允许下一杆，主菜单和比赛场景通过明确状态对象交接。",
    tags: ["第2章", "数据流"],
  },
  {
    id: "ugc-02-3d-billiards-4",
    chapter: "ugc-02-3d-billiards",
    level: 4,
    question: "第2章最有诊断价值的故障样本应怎样设计？",
    answer:
      "故意破坏“击球冲量”对应的首个输入或门禁，保存首条偏离信号，并用同一回放在修复后证明它恢复。",
    tags: ["第2章", "失败注入"],
  },
  {
    id: "ugc-02-3d-billiards-5",
    chapter: "ugc-02-3d-billiards",
    level: 2,
    question: "第2章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "必须保留原章的场景、玩法目标和状态契约；NGUI、旧输入接口或资源API可以替换，但不能删除“游戏背景及功能概述”及其可观察结果。",
    tags: ["第2章", "现代迁移"],
  },
  {
    id: "ugc-02-3d-billiards-6",
    chapter: "ugc-02-3d-billiards",
    level: 3,
    question: "第2章签发前至少保存哪些证据？",
    answer:
      "保存版本与设备、场景入口、正常边界失败三组输入、球桌场景、瞄准、冲量、碰撞、进球判定、多视角的状态快照、Profiler数据以及修复后回放。",
    tags: ["第2章", "验收证据"],
  },
  {
    id: "ugc-03-3d-maze-box-1",
    chapter: "ugc-03-3d-maze-box",
    level: 1,
    question: "第3章中，什么是“重力感应”？",
    answer: "由设备加速度计提供姿态和运动线索的输入",
    tags: ["第3章", "原书复刻"],
  },
  {
    id: "ugc-03-3d-maze-box-2",
    chapter: "ugc-03-3d-maze-box",
    level: 2,
    question: "第3章为什么必须保留原目录单元“游戏背景及功能概述”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或其他案例替代。",
    tags: ["第3章", "目录覆盖"],
  },
  {
    id: "ugc-03-3d-maze-box-3",
    chapter: "ugc-03-3d-maze-box",
    level: 3,
    question: "第3章的关键输入、状态与输出链是什么？",
    answer:
      "菜单选择关卡后加载迷宫，输入适配器提供归一化倾斜，物理控制器施加重力，终点和跌落区域产生结果；编辑器键盘模拟必须与真机传感器共享同一语义。",
    tags: ["第3章", "数据流"],
  },
  {
    id: "ugc-03-3d-maze-box-4",
    chapter: "ugc-03-3d-maze-box",
    level: 4,
    question: "第3章最有诊断价值的故障样本应怎样设计？",
    answer:
      "故意破坏“重力感应”对应的首个输入或门禁，保存首条偏离信号，并用同一回放在修复后证明它恢复。",
    tags: ["第3章", "失败注入"],
  },
  {
    id: "ugc-03-3d-maze-box-5",
    chapter: "ugc-03-3d-maze-box",
    level: 2,
    question: "第3章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "必须保留原章的场景、玩法目标和状态契约；NGUI、旧输入接口或资源API可以替换，但不能删除“游戏背景及功能概述”及其可观察结果。",
    tags: ["第3章", "现代迁移"],
  },
  {
    id: "ugc-03-3d-maze-box-6",
    chapter: "ugc-03-3d-maze-box",
    level: 3,
    question: "第3章签发前至少保存哪些证据？",
    answer:
      "保存版本与设备、场景入口、正常边界失败三组输入、传感器、输入滤波、迷宫倾斜、滚球、终点、结果场景的状态快照、Profiler数据以及修复后回放。",
    tags: ["第3章", "验收证据"],
  },
  {
    id: "ugc-04-crossing-meridian-1",
    chapter: "ugc-04-crossing-meridian",
    level: 1,
    question: "第4章中，什么是“NGUI”？",
    answer: "原书采用的第三方Unity界面插件",
    tags: ["第4章", "原书复刻"],
  },
  {
    id: "ugc-04-crossing-meridian-2",
    chapter: "ugc-04-crossing-meridian",
    level: 2,
    question: "第4章为什么必须保留原目录单元“游戏背景及功能概述”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或其他案例替代。",
    tags: ["第4章", "目录覆盖"],
  },
  {
    id: "ugc-04-crossing-meridian-3",
    chapter: "ugc-04-crossing-meridian",
    level: 3,
    question: "第4章的关键输入、状态与输出链是什么？",
    answer:
      "主菜单建立选项并进入游戏场景，虚拟控件转换触摸，Player控制器消费输入，敌人AI选择追踪或攻击，炸弹拥有独立生成爆炸回收链，结算冻结玩法而非只遮住画面。",
    tags: ["第4章", "数据流"],
  },
  {
    id: "ugc-04-crossing-meridian-4",
    chapter: "ugc-04-crossing-meridian",
    level: 4,
    question: "第4章最有诊断价值的故障样本应怎样设计？",
    answer:
      "故意破坏“NGUI”对应的首个输入或门禁，保存首条偏离信号，并用同一回放在修复后证明它恢复。",
    tags: ["第4章", "失败注入"],
  },
  {
    id: "ugc-04-crossing-meridian-5",
    chapter: "ugc-04-crossing-meridian",
    level: 2,
    question: "第4章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "必须保留原章的场景、玩法目标和状态契约；NGUI、旧输入接口或资源API可以替换，但不能删除“游戏背景及功能概述”及其可观察结果。",
    tags: ["第4章", "现代迁移"],
  },
  {
    id: "ugc-04-crossing-meridian-6",
    chapter: "ugc-04-crossing-meridian",
    level: 3,
    question: "第4章签发前至少保存哪些证据？",
    answer:
      "保存版本与设备、场景入口、正常边界失败三组输入、NGUI界面、触摸输入、Player、敌人AI、炸弹、结算的状态快照、Profiler数据以及修复后回放。",
    tags: ["第4章", "验收证据"],
  },
  {
    id: "ugc-05-tomb-coin-pusher-1",
    chapter: "ugc-05-tomb-coin-pusher",
    level: 1,
    question: "第5章中，什么是“推板周期”？",
    answer: "推板在前后边界之间可重复验证的运动轨迹",
    tags: ["第5章", "原书复刻"],
  },
  {
    id: "ugc-05-tomb-coin-pusher-2",
    chapter: "ugc-05-tomb-coin-pusher",
    level: 2,
    question: "第5章为什么必须保留原目录单元“游戏背景及功能概述”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或其他案例替代。",
    tags: ["第5章", "目录覆盖"],
  },
  {
    id: "ugc-05-tomb-coin-pusher-3",
    chapter: "ugc-05-tomb-coin-pusher",
    level: 3,
    question: "第5章的关键输入、状态与输出链是什么？",
    answer:
      "离线界面读取存档并进入游戏，投币命令检查余额后从池取得金币，推板按物理兼容方式运动，奖励和回收触发器分别结算与释放，帮助界面解释规则。",
    tags: ["第5章", "数据流"],
  },
  {
    id: "ugc-05-tomb-coin-pusher-4",
    chapter: "ugc-05-tomb-coin-pusher",
    level: 4,
    question: "第5章最有诊断价值的故障样本应怎样设计？",
    answer:
      "故意破坏“推板周期”对应的首个输入或门禁，保存首条偏离信号，并用同一回放在修复后证明它恢复。",
    tags: ["第5章", "失败注入"],
  },
  {
    id: "ugc-05-tomb-coin-pusher-5",
    chapter: "ugc-05-tomb-coin-pusher",
    level: 2,
    question: "第5章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "必须保留原章的场景、玩法目标和状态契约；NGUI、旧输入接口或资源API可以替换，但不能删除“游戏背景及功能概述”及其可观察结果。",
    tags: ["第5章", "现代迁移"],
  },
  {
    id: "ugc-05-tomb-coin-pusher-6",
    chapter: "ugc-05-tomb-coin-pusher",
    level: 3,
    question: "第5章签发前至少保存哪些证据？",
    answer:
      "保存版本与设备、场景入口、正常边界失败三组输入、离线界面、投币、推板、金币堆、奖励区、帮助的状态快照、Profiler数据以及修复后回放。",
    tags: ["第5章", "验收证据"],
  },
  {
    id: "ugc-06-coke-cans-1",
    chapter: "ugc-06-coke-cans",
    level: 1,
    question: "第6章中，什么是“滑屏发球”？",
    answer: "把一次触摸轨迹映射为方向和力度的输入",
    tags: ["第6章", "原书复刻"],
  },
  {
    id: "ugc-06-coke-cans-2",
    chapter: "ugc-06-coke-cans",
    level: 2,
    question: "第6章为什么必须保留原目录单元“背景以及功能概述”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或其他案例替代。",
    tags: ["第6章", "目录覆盖"],
  },
  {
    id: "ugc-06-coke-cans-3",
    chapter: "ugc-06-coke-cans",
    level: 3,
    question: "第6章的关键输入、状态与输出链是什么？",
    answer:
      "选关进入主场景后生成球和罐阵，控制板显示手势，发球器只接受一次完整滑动，罐子稳定倒下后结算分数，静态共享数据只保存跨场景的最小关卡状态。",
    tags: ["第6章", "数据流"],
  },
  {
    id: "ugc-06-coke-cans-4",
    chapter: "ugc-06-coke-cans",
    level: 4,
    question: "第6章最有诊断价值的故障样本应怎样设计？",
    answer:
      "故意破坏“滑屏发球”对应的首个输入或门禁，保存首条偏离信号，并用同一回放在修复后证明它恢复。",
    tags: ["第6章", "失败注入"],
  },
  {
    id: "ugc-06-coke-cans-5",
    chapter: "ugc-06-coke-cans",
    level: 2,
    question: "第6章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "必须保留原章的场景、玩法目标和状态契约；NGUI、旧输入接口或资源API可以替换，但不能删除“背景以及功能概述”及其可观察结果。",
    tags: ["第6章", "现代迁移"],
  },
  {
    id: "ugc-06-coke-cans-6",
    chapter: "ugc-06-coke-cans",
    level: 3,
    question: "第6章签发前至少保存哪些证据？",
    answer:
      "保存版本与设备、场景入口、正常边界失败三组输入、选关、滑屏轨迹、发球、罐阵、分数板、回合的状态快照、Profiler数据以及修复后回放。",
    tags: ["第6章", "验收证据"],
  },
  {
    id: "ugc-07-tank-battle-1",
    chapter: "ugc-07-tank-battle",
    level: 1,
    question: "第7章中，什么是“发射门”？",
    answer: "同时检查弹药冷却和游戏状态的命令条件",
    tags: ["第7章", "原书复刻"],
  },
  {
    id: "ugc-07-tank-battle-2",
    chapter: "ugc-07-tank-battle",
    level: 2,
    question: "第7章为什么必须保留原目录单元“游戏背景以及功能概述”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或其他案例替代。",
    tags: ["第7章", "目录覆盖"],
  },
  {
    id: "ugc-07-tank-battle-3",
    chapter: "ugc-07-tank-battle",
    level: 3,
    question: "第7章的关键输入、状态与输出链是什么？",
    answer:
      "选关数据初始化战场，坦克控制器产生瞄准与发射请求，炮弹从池生成并在命中或超时回收，计时器与弹药状态驱动失败条件，得分界面读取不可变结果。",
    tags: ["第7章", "数据流"],
  },
  {
    id: "ugc-07-tank-battle-4",
    chapter: "ugc-07-tank-battle",
    level: 4,
    question: "第7章最有诊断价值的故障样本应怎样设计？",
    answer:
      "故意破坏“发射门”对应的首个输入或门禁，保存首条偏离信号，并用同一回放在修复后证明它恢复。",
    tags: ["第7章", "失败注入"],
  },
  {
    id: "ugc-07-tank-battle-5",
    chapter: "ugc-07-tank-battle",
    level: 2,
    question: "第7章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "必须保留原章的场景、玩法目标和状态契约；NGUI、旧输入接口或资源API可以替换，但不能删除“游戏背景以及功能概述”及其可观察结果。",
    tags: ["第7章", "现代迁移"],
  },
  {
    id: "ugc-07-tank-battle-6",
    chapter: "ugc-07-tank-battle",
    level: 3,
    question: "第7章签发前至少保存哪些证据？",
    answer:
      "保存版本与设备、场景入口、正常边界失败三组输入、选关、坦克、瞄准、炮弹、弹药时间、得分的状态快照、Profiler数据以及修复后回放。",
    tags: ["第7章", "验收证据"],
  },
  {
    id: "ugc-08-dog-runner-1",
    chapter: "ugc-08-dog-runner",
    level: 1,
    question: "第8章中，什么是“碰撞监视器”？",
    answer: "把特定碰撞区域转换为玩法事件的组件",
    tags: ["第8章", "原书复刻"],
  },
  {
    id: "ugc-08-dog-runner-2",
    chapter: "ugc-08-dog-runner",
    level: 2,
    question: "第8章为什么必须保留原目录单元“背景以及功能概述”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或其他案例替代。",
    tags: ["第8章", "目录覆盖"],
  },
  {
    id: "ugc-08-dog-runner-3",
    chapter: "ugc-08-dog-runner",
    level: 3,
    question: "第8章的关键输入、状态与输出链是什么？",
    answer:
      "输入驱动小狗动作，碰撞监视器把障碍和收集事件写入回合状态，磁铁扩大金币吸附范围，圆球改变临时能力，静态数据只承载跨场景分数和选择。",
    tags: ["第8章", "数据流"],
  },
  {
    id: "ugc-08-dog-runner-4",
    chapter: "ugc-08-dog-runner",
    level: 4,
    question: "第8章最有诊断价值的故障样本应怎样设计？",
    answer:
      "故意破坏“碰撞监视器”对应的首个输入或门禁，保存首条偏离信号，并用同一回放在修复后证明它恢复。",
    tags: ["第8章", "失败注入"],
  },
  {
    id: "ugc-08-dog-runner-5",
    chapter: "ugc-08-dog-runner",
    level: 2,
    question: "第8章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "必须保留原章的场景、玩法目标和状态契约；NGUI、旧输入接口或资源API可以替换，但不能删除“背景以及功能概述”及其可观察结果。",
    tags: ["第8章", "现代迁移"],
  },
  {
    id: "ugc-08-dog-runner-6",
    chapter: "ugc-08-dog-runner",
    level: 3,
    question: "第8章签发前至少保存哪些证据？",
    answer:
      "保存版本与设备、场景入口、正常边界失败三组输入、小狗、跑道、碰撞监视器、金币、磁铁、圆球、教程加载的状态快照、Profiler数据以及修复后回放。",
    tags: ["第8章", "验收证据"],
  },
  {
    id: "ugc-09-3d-virtual-parking-1",
    chapter: "ugc-09-3d-virtual-parking",
    level: 1,
    question: "第9章中，什么是“车型ID”？",
    answer: "跨选车与游戏场景引用车辆配置的稳定标识",
    tags: ["第9章", "原书复刻"],
  },
  {
    id: "ugc-09-3d-virtual-parking-2",
    chapter: "ugc-09-3d-virtual-parking",
    level: 2,
    question: "第9章为什么必须保留原目录单元“游戏背景及功能概述”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或其他案例替代。",
    tags: ["第9章", "目录覆盖"],
  },
  {
    id: "ugc-09-3d-virtual-parking-3",
    chapter: "ugc-09-3d-virtual-parking",
    level: 3,
    question: "第9章的关键输入、状态与输出链是什么？",
    answer:
      "选择结果进入关卡配置，车辆控制器处理转向油门制动，多相机共享同一车辆状态，停车区同时检查位置、朝向、速度和停留时间，碰撞次数进入评分。",
    tags: ["第9章", "数据流"],
  },
  {
    id: "ugc-09-3d-virtual-parking-4",
    chapter: "ugc-09-3d-virtual-parking",
    level: 4,
    question: "第9章最有诊断价值的故障样本应怎样设计？",
    answer:
      "故意破坏“车型ID”对应的首个输入或门禁，保存首条偏离信号，并用同一回放在修复后证明它恢复。",
    tags: ["第9章", "失败注入"],
  },
  {
    id: "ugc-09-3d-virtual-parking-5",
    chapter: "ugc-09-3d-virtual-parking",
    level: 2,
    question: "第9章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "必须保留原章的场景、玩法目标和状态契约；NGUI、旧输入接口或资源API可以替换，但不能删除“游戏背景及功能概述”及其可观察结果。",
    tags: ["第9章", "现代迁移"],
  },
  {
    id: "ugc-09-3d-virtual-parking-6",
    chapter: "ugc-09-3d-virtual-parking",
    level: 3,
    question: "第9章签发前至少保存哪些证据？",
    answer:
      "保存版本与设备、场景入口、正常边界失败三组输入、主菜单、选车、车辆、停车关卡、多视角、停车判定的状态快照、Profiler数据以及修复后回放。",
    tags: ["第9章", "验收证据"],
  },
  {
    id: "ugc-10-save-mushroom-village-1",
    chapter: "ugc-10-save-mushroom-village",
    level: 1,
    question: "第10章中，什么是“飞行输入”？",
    answer: "由虚拟摇杆和按钮组成的方向速度与动作命令",
    tags: ["第10章", "原书复刻"],
  },
  {
    id: "ugc-10-save-mushroom-village-2",
    chapter: "ugc-10-save-mushroom-village",
    level: 2,
    question: "第10章为什么必须保留原目录单元“背景以及功能概述”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或其他案例替代。",
    tags: ["第10章", "目录覆盖"],
  },
  {
    id: "ugc-10-save-mushroom-village-3",
    chapter: "ugc-10-save-mushroom-village",
    level: 3,
    question: "第10章的关键输入、状态与输出链是什么？",
    answer:
      "主菜单选择模式，剧情场景保存下一入口，飞机控制器消费统一输入，星星和圆圈触发目标进度，模式规则决定胜负，加载场景原子切换剧情与玩法资源。",
    tags: ["第10章", "数据流"],
  },
  {
    id: "ugc-10-save-mushroom-village-4",
    chapter: "ugc-10-save-mushroom-village",
    level: 4,
    question: "第10章最有诊断价值的故障样本应怎样设计？",
    answer:
      "故意破坏“飞行输入”对应的首个输入或门禁，保存首条偏离信号，并用同一回放在修复后证明它恢复。",
    tags: ["第10章", "失败注入"],
  },
  {
    id: "ugc-10-save-mushroom-village-5",
    chapter: "ugc-10-save-mushroom-village",
    level: 2,
    question: "第10章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "必须保留原章的场景、玩法目标和状态契约；NGUI、旧输入接口或资源API可以替换，但不能删除“背景以及功能概述”及其可观察结果。",
    tags: ["第10章", "现代迁移"],
  },
  {
    id: "ugc-10-save-mushroom-village-6",
    chapter: "ugc-10-save-mushroom-village",
    level: 3,
    question: "第10章签发前至少保存哪些证据？",
    answer:
      "保存版本与设备、场景入口、正常边界失败三组输入、飞机、剧情、经典模式、时间模式、星星圆圈、加载的状态快照、Profiler数据以及修复后回放。",
    tags: ["第10章", "验收证据"],
  },
  {
    id: "ugc-11-baina-racing-1",
    chapter: "ugc-11-baina-racing",
    level: 1,
    question: "第11章中，什么是“体感转向”？",
    answer: "把设备姿态映射为赛车转向的输入方式",
    tags: ["第11章", "原书复刻"],
  },
  {
    id: "ugc-11-baina-racing-2",
    chapter: "ugc-11-baina-racing",
    level: 2,
    question: "第11章为什么必须保留原目录单元“游戏背景以及功能概述”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或其他案例替代。",
    tags: ["第11章", "目录覆盖"],
  },
  {
    id: "ugc-11-baina-racing-3",
    chapter: "ugc-11-baina-racing",
    level: 3,
    question: "第11章的关键输入、状态与输出链是什么？",
    answer:
      "输入适配器产生转向油门，车辆控制器推进赛车，检查点序列和道路监视器验证路线，金币和警示牌提供奖励与风险，模式状态机在终点生成可比较结果。",
    tags: ["第11章", "数据流"],
  },
  {
    id: "ugc-11-baina-racing-4",
    chapter: "ugc-11-baina-racing",
    level: 4,
    question: "第11章最有诊断价值的故障样本应怎样设计？",
    answer:
      "故意破坏“体感转向”对应的首个输入或门禁，保存首条偏离信号，并用同一回放在修复后证明它恢复。",
    tags: ["第11章", "失败注入"],
  },
  {
    id: "ugc-11-baina-racing-5",
    chapter: "ugc-11-baina-racing",
    level: 2,
    question: "第11章迁移到当前Unity时必须保留什么不变量？",
    answer:
      "必须保留原章的场景、玩法目标和状态契约；NGUI、旧输入接口或资源API可以替换，但不能删除“游戏背景以及功能概述”及其可观察结果。",
    tags: ["第11章", "现代迁移"],
  },
  {
    id: "ugc-11-baina-racing-6",
    chapter: "ugc-11-baina-racing",
    level: 3,
    question: "第11章签发前至少保存哪些证据？",
    answer:
      "保存版本与设备、场景入口、正常边界失败三组输入、赛车、虚拟体感输入、计时模式、竞速模式、道路监视器、终点的状态快照、Profiler数据以及修复后回放。",
    tags: ["第11章", "验收证据"],
  },
  {
    id: "ugc-official-final-review-1",
    chapter: "ugc-official-final-review",
    level: 1,
    question: "全书总复习中，什么是“案例覆盖”？",
    answer: "11个原章都有唯一页面和可重放交付物",
    tags: ["全书总复习", "原书复刻"],
  },
  {
    id: "ugc-official-final-review-2",
    chapter: "ugc-official-final-review",
    level: 2,
    question: "全书总复习为什么必须保留原目录单元“第1章环境与案例基线”？",
    answer:
      "它定义了本页在原书中的独有问题边界，不能被现代功能清单或其他案例替代。",
    tags: ["全书总复习", "目录覆盖"],
  },
  {
    id: "ugc-official-final-review-3",
    chapter: "ugc-official-final-review",
    level: 3,
    question: "全书总复习的关键输入、状态与输出链是什么？",
    answer:
      "依次重放环境导入、桌球、迷宫、穿越子午线、推金币、可乐可乐、坦克、酷跑、停车、飞行和赛车；每个案例注入一个最小失败并确认回到首个错误契约。",
    tags: ["全书总复习", "数据流"],
  },
  {
    id: "ugc-official-final-review-4",
    chapter: "ugc-official-final-review",
    level: 4,
    question: "全书总复习最有诊断价值的故障样本应怎样设计？",
    answer:
      "故意破坏“案例覆盖”对应的首个输入或门禁，保存首条偏离信号，并用同一回放在修复后证明它恢复。",
    tags: ["全书总复习", "失败注入"],
  },
  {
    id: "ugc-official-final-review-5",
    chapter: "ugc-official-final-review",
    level: 2,
    question: "全书总复习迁移到当前Unity时必须保留什么不变量？",
    answer:
      "必须保留原章的场景、玩法目标和状态契约；NGUI、旧输入接口或资源API可以替换，但不能删除“第1章环境与案例基线”及其可观察结果。",
    tags: ["全书总复习", "现代迁移"],
  },
  {
    id: "ugc-official-final-review-6",
    chapter: "ugc-official-final-review",
    level: 3,
    question: "全书总复习签发前至少保存哪些证据？",
    answer:
      "保存版本与设备、场景入口、正常边界失败三组输入、环境基线、十个案例、场景谱系、核心玩法、失败注入、迁移发布的状态快照、Profiler数据以及修复后回放。",
    tags: ["全书总复习", "验收证据"],
  },
];
