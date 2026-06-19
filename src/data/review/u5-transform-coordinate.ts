/** 复习题库 · 场景、Transform 与坐标空间（u5-transform-coordinate）。《Unity 5 权威讲解》第3章改编。 */

import type { ReviewQuestion } from "./types";

export const u5TransformCoordinateQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "u5-tc-1",
    chapter: "u5-transform-coordinate",
    level: 1,
    question: "Transform 组件记录哪三样东西（「三件套」）？",
    answer:
      "Transform 记录 GameObject 的**位置（Position）、旋转（Rotation）、缩放（Scale）**——合称「三件套」。位置说它站在哪、旋转说它朝哪个方向转了多少、缩放说它被放大或缩小了多少倍。其中位置用一个 Vector3（三个数 x、y、z）来装。每个 GameObject 都必有 Transform 且不可移除。",
    tags: ["Transform", "三件套", "位置", "旋转", "缩放", "定义"],
  },
  {
    id: "u5-tc-2",
    chapter: "u5-transform-coordinate",
    level: 1,
    question: "什么是「局部坐标（localPosition）」？",
    answer:
      "局部坐标是子物体**相对它父物体**的位置——通俗说就是「相对爸爸在哪」。代码里用 `transform.localPosition` 读写。它的关键性质：只要你不单独挪子物体、只移动父物体，它**不变**。挂了父之后，Inspector 面板里显示的 Position 值就是这套局部坐标。",
    tags: ["局部坐标", "localPosition", "定义"],
  },
  {
    id: "u5-tc-3",
    chapter: "u5-transform-coordinate",
    level: 1,
    question: "什么是「世界坐标（position）」？",
    answer:
      "世界坐标是物体在整个场景（世界）里的**绝对位置**——「在整个片场里的哪个坐标」。代码里用 `transform.position` 读写。它的关键性质：父物体一移动，子物体的世界 position 就**跟着变**，哪怕你压根没碰子物体本身。",
    tags: ["世界坐标", "position", "定义"],
  },
  {
    id: "u5-tc-4",
    chapter: "u5-transform-coordinate",
    level: 1,
    question: "什么是「父子层级（parent-child）」？它最关键的一条规矩是什么？",
    answer:
      "父子层级是 GameObject 之间的从属关系：一个物体可以挂在另一个物体下面，成为它的「子物体」，被挂靠的叫「父物体」。最关键的规矩是 **「父动子跟」**——父物体一移动 / 旋转 / 缩放，所有子物体跟着一起变换，而子物体相对父物体的局部位置保持不变。就像把剑、帽子挂到演员身上，演员一走一转，道具跟着动。",
    tags: ["父子层级", "parent-child", "父动子跟", "定义"],
  },
  {
    id: "u5-tc-5",
    chapter: "u5-transform-coordinate",
    level: 1,
    question: "什么是「Vector3」？它能表示哪两类东西？",
    answer:
      "Vector3 是由三个浮点数 (x, y, z) 组成的值。它能表示两类东西：①**位置**——从原点出发的位移，箭头终点就是那个点；②**方向 + 大小**——一根箭头指向哪个朝向、有多长。常用属性有 `magnitude`（长度 / 大小）和 `normalized`（只保留方向的单位版本）。Unity 里位置、位移、速度、缩放都用 Vector3 装。",
    tags: ["Vector3", "向量", "定义"],
  },
  {
    id: "u5-tc-6",
    chapter: "u5-transform-coordinate",
    level: 1,
    question:
      "`transform.position` 和 `transform.localPosition` 分别读写哪套坐标？",
    answer:
      "`transform.position` 读写**世界坐标**（物体在整个场景里的绝对位置）；`transform.localPosition` 读写**局部坐标**（物体相对它父物体的位置）。一句话：position 是「在整个片场里」，localPosition 是「相对爸爸」。",
    tags: ["transform.position", "transform.localPosition", "区别"],
  },

  // ── L2 理解：为什么 / 区别 ──
  {
    id: "u5-tc-7",
    chapter: "u5-transform-coordinate",
    level: 2,
    question:
      "只拖动父物体、完全不碰子物体本身。子物体的 localPosition 会变吗？世界 position 会变吗？为什么？",
    answer:
      "`localPosition` **不变**，世界 `position` **会变**。原因：localPosition 是「子相对父的偏移」，你没动子物体本身，这段相对偏移就是常数，所以不变；世界 position 是「子在整个场景里的绝对位置」，由 $P_{world} = P_{parent} + R \\cdot P_{local}$ 决定，父的世界位置 $P_{parent}$ 一变，子的世界坐标自然跟着变。这就是「父动子跟、局部位置恒定」。",
    tags: ["局部坐标", "世界坐标", "父动子跟", "理解"],
  },
  {
    id: "u5-tc-8",
    chapter: "u5-transform-coordinate",
    level: 2,
    question:
      "为什么同一个子物体，「相对爸爸」和「在整个世界里」会是两套不同的坐标？用片场比喻说明。",
    answer:
      "因为位置的描述要看**参照物**。拿演员手里举的剑打比方：你说「在演员右手」，这是相对演员（父）说的——演员走到哪，剑都「在右手」，这套说法不随演员移动而变，就是局部坐标；你说「在片场东南角第三块地砖上」，这是相对整个片场（世界）说的——演员一走，这个绝对位置立刻过时，这套就是世界坐标。同一把剑，两种说法都对，只是参照物不同，所以是两套坐标。",
    tags: ["局部坐标", "世界坐标", "参照物", "片场比喻", "理解"],
  },
  {
    id: "u5-tc-9",
    chapter: "u5-transform-coordinate",
    level: 2,
    question:
      "把物体挂成子物体后，代码里 `transform.position` 的值和 Inspector 里显示的 Position 数字对不上，为什么？",
    answer:
      "因为挂了父之后，**Inspector 显示的 Position 其实是局部坐标（相对父）**，而 `transform.position` 读的是**世界坐标（绝对）**——两者本来就是两套坐标，自然对不上。想要和 Inspector 显示一致的那套（相对父），用 `transform.localPosition`；想要绝对位置，用 `transform.position`。读值前先想清楚「我要的是相对谁的位置」。",
    tags: ["Inspector", "localPosition", "position", "理解"],
  },
  {
    id: "u5-tc-10",
    chapter: "u5-transform-coordinate",
    level: 2,
    question:
      "Vector3 既能当「位置」又能当「方向」用，这两种用法的区别是什么？`normalized` 又是干什么的？",
    answer:
      "当**位置**用时，关心的是 Vector3 作为「从原点出发的位移」其终点落在哪——即那个点的坐标；当**方向**用时，关心的是这根箭头**指向哪个朝向**、有多长（`magnitude` 给长度）。`normalized` 把向量长度归一化成 1、只保留方向，得到一个**单位向量**——当你只在乎「朝哪个方向」、不在乎「多远」时（比如表示朝向、移动方向）就用它。",
    tags: ["Vector3", "方向", "magnitude", "normalized", "理解"],
  },
  {
    id: "u5-tc-11",
    chapter: "u5-transform-coordinate",
    level: 2,
    question:
      "公式 $P_{world} = P_{parent} + R \\cdot P_{local}$ 里的 $R$ 是什么？为什么父旋转时不能直接把 $P_{local}$ 加上去？",
    answer:
      "$R$ 代表**父物体旋转对应的旋转作用**——它把子物体的局部偏移方向转到世界方向。父转身时，挂在它右手的剑会绕着父一起转到新朝向，所以「右手前方」这段偏移本身也得跟着父的朝向旋转，不能原封不动直接相加。只有父**不旋转、不缩放**（纯平移）时，$R$ 退化为「什么都不做」，公式才简化成 $P_{world} = P_{parent} + P_{local}$。",
    tags: ["坐标合成", "旋转", "R", "理解"],
  },

  // ── L3 应用：动手 / 排错 / 代码 ──
  {
    id: "u5-tc-12",
    chapter: "u5-transform-coordinate",
    level: 3,
    question:
      "【手算】父物体世界坐标 $P_{parent} = (3, 0, 2)$，子物体局部坐标 $P_{local} = (1, 0, -4)$，父无旋转无缩放。求子物体的世界坐标 $P_{world}$。",
    answer:
      "纯平移情形用 $P_{world} = P_{parent} + P_{local}$，向量按对应分量相加：\n$$P_{world} = (3, 0, 2) + (1, 0, -4) = (4, 0, -2)$$\nx 分量 $3+1=4$，y 分量 $0+0=0$，z 分量 $2+(-4)=-2$。所以子物体的世界坐标是 $(4, 0, -2)$。",
    tags: ["手算", "坐标合成", "纯平移", "应用"],
  },
  {
    id: "u5-tc-13",
    chapter: "u5-transform-coordinate",
    level: 3,
    question:
      "【手算】接上题，父无旋转无缩放，$P_{parent} = (3, 0, 2)$、$P_{local} = (1, 0, -4)$。现在把父沿 +x 方向移动 5 米，求子物体新的世界坐标，并说出它的 localPosition 变了没有。",
    answer:
      "父往 +x 移 5 米后 $P_{parent}$ 变成 $(8, 0, 2)$，子物体没被单独挪动，$P_{local}$ 仍是 $(1, 0, -4)$：\n$$P_{world} = (8, 0, 2) + (1, 0, -4) = (9, 0, -2)$$\n子物体新的世界坐标是 $(9, 0, -2)$（x 跟着 +5）。它的 `localPosition` **没变**，依旧是 $(1, 0, -4)$——只有父在动，相对偏移是常数。",
    tags: ["手算", "父动子跟", "localPosition", "应用"],
  },
  {
    id: "u5-tc-14",
    chapter: "u5-transform-coordinate",
    level: 3,
    question:
      "你想让一个物体「武器」永远跟着「角色」移动和转身，但相对角色的位置固定在右手。应该怎么做？用到哪个坐标 / API？",
    answer:
      "把「武器」设成「角色」的**子物体**即可——父子层级会自动实现「父动子跟」。具体：用 `weapon.transform.SetParent(player.transform)`（或在编辑器里把 Weapon 拖到 Player 下面）。设好之后，调整武器的 `transform.localPosition`（和 localRotation）让它位于角色右手；此后角色移动 / 转身，武器的世界 position 由引擎按 $P_{world} = P_{parent} + R \\cdot P_{local}$ 自动重算，而它的 localPosition 保持「右手」那个固定值不变。",
    tags: ["父子层级", "SetParent", "localPosition", "应用"],
  },
  {
    id: "u5-tc-15",
    chapter: "u5-transform-coordinate",
    level: 3,
    question:
      "调用 `transform.SetParent(newParent)` 把物体换到新父下，物体却「瞬移」到了别处。怎么回事？怎么控制它视觉上不动？",
    answer:
      "`SetParent` 的行为取决于 `worldPositionStays` 参数：默认 / 传 `true` 时**保持世界位置不动**（只重算 localPosition），传 `false` 时**保持 localPosition**（世界位置会跳）。出现「瞬移」通常是用了 `SetParent(newParent, false)`（或某些重载默认 false），它让物体去对齐新父的本地坐标，看起来就跳走了。想让物体视觉上不动，用 `transform.SetParent(newParent, true)`；想让它对齐新父本地坐标，才用 `false`。",
    tags: ["SetParent", "worldPositionStays", "瞬移", "排错"],
  },
  {
    id: "u5-tc-16",
    chapter: "u5-transform-coordinate",
    level: 3,
    question:
      "给父物体做了非均匀缩放（Scale =(2, 1, 1)），结果挂在它身上、自身有旋转的子物体被拉斜了。为什么？怎么避免？",
    answer:
      "因为父的缩放（连同旋转）会一并作用到子物体上。当**父的非均匀缩放**叠加**子物体自身的旋转**时，会产生**剪切（skew）**，把子物体拉成歪斜的形状——这是非均匀缩放沿父子链传递的固有副作用。避免办法：①尽量只对父物体做**均匀缩放**（三个分量相等）；②需要单独拉长某个轴时，把缩放放在**不带旋转**的子物体上；③或重新组织层级，别让「旋转 + 非均匀缩放」叠在同一条父子链上。",
    tags: ["非均匀缩放", "剪切", "skew", "排错"],
  },

  // ── L4 综合：贯通 / 迁移 ──
  {
    id: "u5-tc-17",
    chapter: "u5-transform-coordinate",
    level: 4,
    question:
      "用「数字片场」的比喻，把 Transform、父子层级、局部坐标、世界坐标、坐标合成公式串成一个完整的故事讲一遍。",
    answer:
      "在数字片场里，每个演员（GameObject）都自带一块「站位牌」——**Transform**，写着他站哪（位置）、朝哪（旋转）、多大（缩放）。你可以把道具挂到演员身上，形成**父子层级**：剑、帽子是子物体，演员是父物体。挂上之后有了两套位置说法：剑「在演员右手」是**局部坐标 localPosition**（相对爸爸，演员走到哪都不变），剑「在片场东南角第三块地砖」是**世界坐标 position**（绝对位置，演员一走就变）。这两套的换算关系就是合成公式：纯平移时 $P_{world} = P_{parent} + P_{local}$，父还会旋转 / 缩放时为 $P_{world} = P_{parent} + R \\cdot P_{local}$——子的绝对位置 = 父的绝对位置 + 父的朝向作用于「相对父的固定偏移」。所以「父动子跟、局部位置恒定」不是魔法，是这条公式里 $P_{local}$ 恒定、只有 $P_{parent}$ 在变的必然结果。",
    tags: ["综合", "数字片场", "坐标合成", "贯通"],
  },
  {
    id: "u5-tc-18",
    chapter: "u5-transform-coordinate",
    level: 4,
    question:
      "为什么 Unity 要同时提供「局部坐标」和「世界坐标」两套，而不是只用世界坐标一套就好？各自在什么场景更顺手？",
    answer:
      "因为两套坐标各自解决不同的问题，缺一不可：①**局部坐标**让「相对关系」表达起来稳定、可复用——比如「武器永远在角色右手」「炮塔永远在坦克车身上方」，只要设好 localPosition，父怎么移动旋转都不用你重算，挪动整个父级（连同一窝子物体）也只需改父的一个值；做嵌套结构、装配模型、骨骼层级时局部坐标最顺手。②**世界坐标**让「绝对关系」好判断——比如「这两个物体在世界里相距多远」「这个点在不在某个世界区域内」「朝世界的正北方走」，这些跟谁是谁的爸爸无关，用世界坐标直接算最直接。只有一套世界坐标的话，每次移动父物体都得手动把所有子物体的绝对坐标重算一遍，父子层级的「父动子跟」便利就没了。两套并存，正是为了让相对与绝对各自用最省力的方式表达。",
    tags: ["综合", "局部坐标", "世界坐标", "设计", "迁移"],
  },
];
