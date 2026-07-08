import type { ReviewQuestion } from "./types";

export const ugc2dPlatformerQuestions: ReviewQuestion[] = [
  {
    id: "ugc-2d-platformer-1",
    chapter: "ugc-2d-platformer",
    level: 1,
    question: "Unity 的 Tilemap 系统是什么？怎么用？",
    answer: "Tilemap 是 2D 瓦片地图系统，用图块拼接搭建关卡。用法：1）创建 Tilemap；2）画 Tile Palette 图块；3）给 Tilemap 加 Tilemap Collider 2D 自动生成碰撞体；4）加 Composite Collider 2D 合并碰撞体。配合 Rigidbody2D 做物理。",
    tags: ["Tilemap", "2D关卡"],
  },
  {
    id: "ugc-2d-platformer-2",
    chapter: "ugc-2d-platformer",
    level: 2,
    question: "Coyote Time 和 Jump Buffer 各解决什么问题？",
    answer: "Coyote Time 解决刚离开边缘按跳没反应的挫败感——离地后 0.1 秒仍可跳。Jump Buffer 解决落地前按跳没反应——落地前 0.1 秒按跳着地自动跳。两者让操作容错更高，手感更流畅。蔚蓝和马里奥都用了这些机制。",
    tags: ["Coyote Time", "Jump Buffer", "手感"],
  },
  {
    id: "ugc-2d-platformer-3",
    chapter: "ugc-2d-platformer",
    level: 3,
    question: "可变跳跃高度怎么实现？为什么要用？",
    answer: "实现：跳跃时记录 velocity.y，松开跳跃键时把 velocity.y 乘 0.5（减速上升）。长按跳得高，短按跳得低。原因：玩家需要精确控制跳跃高度来通过不同高度的平台。固定高度跳跃不够灵活，可变高度让玩家有更多操作空间，手感更好。",
    tags: ["可变跳跃", "手感优化"],
  },
  {
    id: "ugc-2d-platformer-4",
    chapter: "ugc-2d-platformer",
    level: 4,
    question: "设计一个完整的 2D 平台跳跃角色控制器，包括所有手感优化。",
    answer: "核心组件：1）Rigidbody2D+BoxCollider2D 物理基础；2）水平移动用 velocity.x 精确控制；3）Coyote Time 离地 0.1 秒可跳；4）Jump Buffer 落地前 0.1 秒预输入；5）可变跳跃松键减速；6）下落重力倍率 2x 更利落；7）空中操控速度降低；8）Physics Material 2D Friction=0 防卡墙；9）IsGrounded 用 BoxCast 检测；10）所有物理在 FixedUpdate。核心原则：手感比物理真实重要。",
    tags: ["平台控制器", "综合"],
  },
];
