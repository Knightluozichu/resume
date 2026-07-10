import type { ReviewQuestion } from "./types";

export const ugcRpgBasicsQuestions: ReviewQuestion[] = [
  {
    id: "ugc-rpg-basics-1",
    chapter: "ugc-rpg-basics",
    level: 1,
    question: `ScriptableObject 是什么？为什么 RPG 要用它？`,
    answer: `ScriptableObject 是 Unity 的数据资产类型，将数据存为资产文件与代码分离。RPG 用它因为：1）策划在 Inspector 编辑数值不改代码；2）内存中只一份实例，100 把剑共享；3）支持动态加载和保存。比 MonoBehaviour 省内存、比硬编码灵活。`,
    tags: ["ScriptableObject", "数据驱动"],
  },
  {
    id: "ugc-rpg-basics-2",
    chapter: "ugc-rpg-basics",
    level: 2,
    question: `背包系统的堆叠和拖拽怎么实现？`,
    answer: `堆叠：相同 ItemData 的物品 count+1 不超 maxStack，超过放新格子。拖拽：实现 IDragHandler/IDropHandler 接口。OnDrag 图标跟随鼠标，OnDrop 检查目标——空格放入/相同堆叠/不同交换，OnEndDrag 无效目标回原位。`,
    tags: ["背包系统", "堆叠", "拖拽"],
  },
  {
    id: "ugc-rpg-basics-3",
    chapter: "ugc-rpg-basics",
    level: 3,
    question: `RPG 对话系统怎么设计？怎么实现分支选择？`,
    answer: `用 ScriptableObject 定义对话节点：文本+选项列表+下一节点引用+条件。分支实现：每个选项有 conditions（需要某道具/某任务完成）和 nextNode（跳转目标）。对话 UI 显示文本和选项按钮，玩家选择后检查条件，满足则跳转 nextNode，不满足灰色禁用。对话末尾可触发任务或事件。`,
    tags: ["对话系统", "分支", "ScriptableObject"],
  },
  {
    id: "ugc-rpg-basics-4",
    chapter: "ugc-rpg-basics",
    level: 4,
    question: `设计一个完整的 RPG 数据系统，包括物品、装备、属性、成长。`,
    answer: `架构：1）ItemData（ScriptableObject）：定义物品基础属性+Use 方法；2）EquipmentData 继承 ItemData：加装备槽位+属性加成；3）CharacterStats（MonoBehaviour）：health/attack/defense/level/exp+GainExp 升级；4）Inventory：List<InventorySlot>，AddItem/RemoveItem+堆叠逻辑；5）EquipmentSystem：穿戴装备修改 CharacterStats；6）对话系统：对话节点 ScriptableObject+分支条件。核心：所有数据用 ScriptableObject，逻辑用 MonoBehaviour。`,
    tags: ["RPG系统", "综合"],
  },
];
