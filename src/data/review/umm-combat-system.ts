import type { ReviewQuestion } from "./types";

export const ummCombatSystemQuestions: ReviewQuestion[] = [
  {
    id: "umm-combat-system-1",
    chapter: "umm-combat-system",
    level: 2,
    question: `MMO 战斗系统的伤害计算公式通常包含哪些因素？`,
    answer:
      `典型公式：最终伤害 = (攻击方ATK * 技能倍率 - 防守方DEF * 防御系数) * 暴击倍数 * 抗性系数 * 随机浮动。其中 ATK 含基础+装备+Buff，技能倍率来自技能表，DEF 含基础+装备+Buff，暴击倍率由暴击率判定触发，抗性系数按属性克制（如火抗减免火系伤害），随机浮动 ±10% 增加不确定性。所有计算在服务器执行，客户端只收结果。`,
    tags: ["战斗系统", "伤害计算", "公式"],
  },
  {
    id: "umm-combat-system-2",
    chapter: "umm-combat-system",
    level: 3,
    question: `Unity 中如何实现扇形技能的范围检测？`,
    answer:
      `扇形检测 = 距离判定 + 角度判定。① 距离：Vector3.Distance(施法者, 目标) &lt;= 技能半径；② 角度：Vector3.Angle(施法者前方向量, 施法者到目标的方向向量) &lt;= 扇形半角。两条件同时满足即在范围内。批量检测时遍历 AOI 范围内实体逐一判定，或用 Physics.OverlapSphere 先粗筛距离，再对结果做角度判定。`,
    tags: ["战斗系统", "范围检测", "扇形"],
  },
  {
    id: "umm-combat-system-3",
    chapter: "umm-combat-system",
    level: 2,
    question: `技能 CD（冷却时间）为什么必须在服务器管理？`,
    answer:
      `如果 CD 在客户端管理，玩家可以修改内存跳过 CD 实现无冷却释放。服务器管理 CD：收到 CastSkillReq 时检查服务器记录的 lastCastTime，如果 currentTime - lastCastTime &lt; cd 则拒绝。释放成功后更新 lastCastTime。客户端收到成功回包后才播放技能动画并显示 CD UI，收到失败回包则不播放。这样即使客户端篡改也只是自己看到假象，不影响服务器逻辑。`,
    tags: ["技能系统", "CD", "服务端权威"],
  },
  {
    id: "umm-combat-system-4",
    chapter: "umm-combat-system",
    level: 1,
    question: `弹道技能（如火球术）的飞行过程如何同步？客户端和服务器各做什么？`,
    answer:
      `服务器生成弹道实体，记录起点、方向、速度、伤害。但弹道飞行是高频位置更新，全量同步费带宽。常用策略：服务器只同步弹道的「生成」和「命中」两个事件，客户端收到生成事件后自行模拟弹道飞行轨迹（用起点+方向+速度做匀速运动），命中时收到服务器的 DamageNotify 播放命中特效。如果客户端模拟偏差大（如目标移动了），服务器在命中时纠正最终位置。`,
    tags: ["弹道技能", "同步", "预测校正"],
  },
];
