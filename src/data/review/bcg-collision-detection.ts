import type { ReviewQuestion } from "./types";

/** C++ 游戏编程入门 · 碰撞检测复习题 */
export const bcgCollisionDetectionQuestions: ReviewQuestion[] = [
  {
    id: "bcg-collision-detection-1",
    chapter: "bcg-collision-detection",
    level: 1,
    question: "AABB 碰撞检测的原理是什么？写出判断两个矩形是否重叠的条件。",
    answer:
      "AABB（Axis-Aligned Bounding Box，轴对齐包围盒）用不旋转的矩形包围物体，检测两矩形是否重叠。\n\n两矩形 A、B 不重叠的条件（任一成立即不碰）：\n- A 在 B 左边：A.right <= B.left\n- A 在 B 右边：A.left >= B.right\n- A 在 B 上边：A.bottom <= B.top\n- A 在 B 下边：A.top >= B.bottom\n\n重叠 = 上述都不成立，即：\n`A.left < B.right && A.right > B.left && A.top < B.bottom && A.bottom > B.top`\n\nSFML 用 `sprite.getGlobalBounds()` 取 FloatRect（含 left/top/width/height），两个 rect 调 `intersects()` 即可判断。AABB 最快，但物体非矩形或旋转时会有「视觉没碰但盒子碰了」的误差。",
    tags: ["AABB", "包围盒", "矩形重叠", "intersects"],
  },
  {
    id: "bcg-collision-detection-2",
    chapter: "bcg-collision-detection",
    level: 2,
    question: "圆形碰撞检测的原理是什么？相比 AABB 它更适合什么情况？",
    answer:
      "圆形碰撞：每个物体用一个圆（圆心 + 半径）包围。两圆碰撞当且仅当**圆心距离 < 半径之和**。\n\n距离用勾股定理：`d = sqrt((x1-x2)^2 + (y1-y2)^2)`，碰撞条件 `d < r1 + r2`。\n优化：比较平方避免开方，`d^2 < (r1+r2)^2`。\n\n相比 AABB 更适合：\n1. 物体本身接近圆形（球、子弹、圆角色），AABB 会在四角产生明显误差，圆形更贴合物体轮廓。\n2. 物体会旋转：AABB 旋转后包围盒要重算（且可能变大），圆形旋转不变，碰撞判断稳定。\n3. 距离自然表达「靠近程度」：可用于触发范围（如敌人侦测半径）、爆炸伤害衰减等。\n\n缺点：长条形物体（如剑、墙）用圆包围误差大，不如 AABB。",
    tags: ["圆形碰撞", "距离", "半径", "旋转", "适用"],
  },
  {
    id: "bcg-collision-detection-3",
    chapter: "bcg-collision-detection",
    level: 3,
    question: "像素级碰撞检测怎么做？为什么不能对所有物体都用它？如何与粗筛结合？",
    answer:
      "像素级碰撞：取两精灵在重叠区域内的像素，逐个检查是否**两物体在该像素都非透明**（alpha > 0）。若有任一像素双方都不透明，则真碰撞。这忽略透明边角，只算实际图形部分，最精确。\n\n不能全用它因为**极慢**：每个候选对要在重叠区逐像素比对，像素数可达数千，物体多时开销爆炸，远超 AABB/圆形。\n\n与粗筛结合（两阶段）：\n1. 粗筛：先用 AABB/圆形快速淘汰绝大多数不相交的对，只留下「包围盒重叠」的少数候选。\n2. 精判：仅对候选对做像素级检测。\n\n这样 1000 个物体里可能只有 5 对进入像素检测，性能可接受。这是「粗筛定候选、精判定真碰」的标准策略，兼顾精度与速度。\n\nSFML 实现像素检测需取纹理像素数组（`Texture::copyToImage` → `Image::getPixel`），开销大，建议缓存。",
    tags: ["像素级碰撞", "精度", "粗筛", "两阶段", "性能"],
  },
  {
    id: "bcg-collision-detection-4",
    chapter: "bcg-collision-detection",
    level: 4,
    question: "综合分析：一个有玩家、大量子弹、墙壁的游戏，如何设计碰撞检测策略，兼顾正确性、性能与代码可维护性？",
    answer:
      "分层策略：\n\n1. 分类与配对：并非所有物体都要两两检测。定义有意义的碰撞对：子弹↔敌人、玩家↔敌人、玩家↔墙壁、子弹↔墙壁。玩家子弹↔玩家这种无意义对直接跳过，省一半计算。\n\n2. 粗筛定候选：\n- 子弹↔敌人：用 AABB（子弹小、敌人方），先 `getGlobalBounds().intersects()` 淘汰。\n- 玩家↔墙壁：AABB。\n- 玩家↔敌人：AABB 粗筛。\n\n3. 精判定真碰：\n- 仅当粗筛命中且需要精确（如不规则角色）才做像素级。子弹/方块敌人用 AABB 已足够，不必像素。\n\n4. 空间分区减候选：子弹和敌人都多时，两两 AABB 仍是 O(N*M)。用空间分区（网格/四叉树）：把空间分格，每物体登记到所在格，碰撞只查同格及相邻格的物体，把候选从「全部」降到「邻近」，复杂度近 O(N)。\n\n5. 高速物体防穿透：子弹速度极快时一帧位移大于敌人尺寸，可能「跨过」敌人导致 AABB 漏检。用扫描线（射线检测）或子步进（一帧内分多步检测）解决。\n\n6. 代码可维护性：\n- 抽象碰撞接口：`bool collides(const Entity& a, const Entity& b)`，内部按类型分派 AABB/圆形/像素，调用方不关心细节。\n- 碰撞响应与检测分离：检测只返回「碰了 + 信息」，响应（扣血/反弹/销毁）由各实体自己处理，避免检测代码里塞业务逻辑。\n- 用碰撞层（layer mask）配置哪些层互检，新增物体类型只改配置不改检测循环。\n\n综合：分类配对减无意义计算 → 粗筛（AABB）定候选 → 必要时像素精判 → 空间分区降复杂度 → 子步进防穿透 → 接口抽象保可维护。这套组合拳让碰撞系统在物体增多时仍正确且快，且新增内容不必改检测核心。",
    tags: ["综合", "碰撞策略", "空间分区", "穿透", "碰撞层", "可维护性", "性能"],
  },
];
