"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-12",
  title: "第 12 章：子弹、拾取物与战斗碰撞",
  focus:
    "把 Bullet、准星、Pickup 与玩家—僵尸—子弹碰撞组织成有生命周期和冷却时间的明确规则",
  invariant:
    "子弹命中后只消费一次，Pickup 只在激活窗口内生效，同一实体不能在擦除后继续参与本帧碰撞",
  fault:
    "遍历 vector 时擦除当前子弹却继续使用失效迭代器，导致跳过下一颗或重复命中",
  evidence:
    "实体 active 标志、AABB 对、命中事件、迭代器位置、冷却计时和生命值变化",
  concepts: [
    "bullet 类（bullet class）",
    "准星（crosshair）",
    "pickup 类（pickup class）",
    "碰撞检测（detecting collisions）",
    "玩家 僵尸 子弹（player zombie bullet）",
  ],
  zones: [
    {
      label: "生成与瞄准",
      detail: "准星、射击输入、Bullet 初始状态",
    },
    {
      label: "碰撞规则",
      detail: "玩家、僵尸、子弹、Pickup 的交互矩阵",
    },
    {
      label: "生命周期",
      detail: "激活、消费、冷却、擦除与重生",
    },
  ],
  trace: ["生成实体", "推进位置", "检测碰撞", "提交效果", "安全回收"],
  scenarios: [
    {
      label: "子弹命中僵尸",
      input: "一颗 active 子弹首次与一个活僵尸 AABB 重叠",
      expected: "僵尸受一次伤，子弹立即失活且不再命中其他目标",
    },
    {
      label: "Pickup 超时",
      input: "Pickup 激活窗口结束后玩家进入其旧位置",
      expected: "不再触发生命或弹药效果，状态等待下次合法生成",
    },
  ],
} satisfies CppGameBuildModel;

export function PickupsBulletsPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function PickupsBulletsFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function PickupsBulletsFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
