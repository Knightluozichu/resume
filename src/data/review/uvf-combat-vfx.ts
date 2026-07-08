import type { ReviewQuestion } from "./types";

export const uvfCombatVfxQuestions: ReviewQuestion[] = [
  {
    id: "uvf-combat-vfx-1",
    chapter: "uvf-combat-vfx",
    level: 1,
    question: "游戏战斗中「打击感」的四个核心要素是什么？",
    answer: "1）顿帧（Hit Stop）：命中瞬间短暂暂停游戏（Time.timeScale=0，持续0.05-0.1s），让玩家感受到「命中重量」；2）屏幕震屏（Camera Shake）：命中时摄像机抖动，强度与衰减控制震感；3）特效爆发：命中点 Burst 发射大量粒子+光效闪现；4）音效同步：命中音效+低频冲击音，与视觉同步爆发。四者缺一不可——没有顿帧感觉轻飘飘，没有震屏感觉远，没有特效感觉空，没有音效感觉假。",
    tags: ["打击感", "顿帧", "震屏", "四要素"],
  },
  {
    id: "uvf-combat-vfx-2",
    chapter: "uvf-combat-vfx",
    level: 2,
    question: "顿帧（Hit Stop）的实现原理是什么？为什么持续时间不能太长？",
    answer: "顿帧通过 `Time.timeScale = 0` 实现，让全局时间暂停。恢复用协程延迟：`Time.timeScale = 0; yield return new WaitForSecondsRealtime(0.08f); Time.timeScale = 1;`。注意用 WaitForSecondsRealtime 而非 WaitForSeconds，因为后者受 timeScale 影响。持续时间不能太长：0.05-0.1s 是最佳范围——短于0.05s 感觉不到顿挫，长于0.1s 会让玩家觉得卡顿/掉帧。重武器（大剑）用0.1s，轻武器（匕首）用0.05s，大招用0.15s。顿帧期间可以叠加慢动作特效（残影、扩散冲击波）增强冲击感。",
    tags: ["顿帧", "Hit Stop", "timeScale", "实现原理"],
  },
  {
    id: "uvf-combat-vfx-3",
    chapter: "uvf-combat-vfx",
    level: 3,
    question: "如何实现连击（Combo）系统中伤害倍率递增和特效升级？写出核心逻辑。",
    answer: "1）连击计数器：每次命中 comboCount++，超时（如2秒未命中）归零；2）倍率曲线：`float multiplier = 1f + comboCount * 0.1f`（每连击+10%），或用 AnimationCurve 定义非线性递增；3）特效升级：根据 comboCount 切换特效预制体——comboCount<3 用普通命中特效，3-5 用强化特效（更多粒子+更亮），>5 用终极特效（加冲击波+额外震屏）；4）代码：`void OnHit() { comboCount++; comboTimer = 2f; float dmg = baseDmg * (1f + comboCount * 0.1f); GameObject vfx = comboCount < 3 ? normalHitPrefab : (comboCount < 6 ? strongHitPrefab : ultimateHitPrefab); SpawnVfx(vfx, hitPoint); ShowDamageText(dmg, comboCount); } void Update() { if (comboTimer > 0) { comboTimer -= Time.deltaTime; if (comboTimer <= 0) comboCount = 0; } }`。",
    tags: ["连击", "Combo", "伤害倍率", "特效升级", "代码实现"],
  },
  {
    id: "uvf-combat-vfx-4",
    chapter: "uvf-combat-vfx",
    level: 4,
    question: "设计一个「大招技能」的完整特效时间线，从蓄力到结束如何编排所有特效元素？",
    answer: "时间线编排（总时长约3秒）：1）0-0.5s 蓄力：角色周围汇聚粒子（粒子向角色收缩，Force Field 吸引力），地面出现能量光环（扩散环+地面投影），屏幕轻微变暗+边缘暗角加强，低频蓄力音效渐强；2）0.5-0.6s 释放：顿帧0.1s（蓄力到极致的停顿），全屏闪白0.1s，角色身上爆发光柱（Burst 100粒子向上+垂直光柱 Shader），震屏强度最大（DoShake 0.5强度）；3）0.6-1.5s 命中：冲击波环沿地面扩散（扁平粒子+扭曲 Shader），范围内敌人受击飞溅粒子，每个敌人叠加命中特效+震屏；4）1.5-2.5s 余波：冲击波消散，地面残留烧焦痕迹（投影贴图），烟尘缓慢上升消散，时间逐渐恢复正常；5）2.5-3.0s 结束：屏幕暗角恢复，后处理色彩校正回到正常。关键：蓄力→释放的反差越大冲击感越强；顿帧在释放前让玩家有期待感；余波让特效有「重量」而非瞬间消失。",
    tags: ["大招技能", "特效时间线", "综合设计", "战斗特效"],
  },
];
