import type { ReviewQuestion } from "./types";

export const ummCharacterSystemQuestions: ReviewQuestion[] = [
  {
    id: "umm-character-system-1",
    chapter: "umm-character-system",
    level: 2,
    question: `MMO 角色系统的属性计算管线是怎样的？`,
    answer:
      `属性计算管线分三层：① 基础属性——来自角色等级和职业配置表（如 baseHP、baseATK）；② 装备加成——遍历已穿戴装备，累加其属性词条（如 +100ATK）；③ Buff/Debuff 修饰——遍历当前生效的 Buff，按百分比或固定值修正（如 +20%ATK 或 -50DEF）。最终值 = (base + equip) * (1 + buffPercent) + buffFlat。任何一层变化都触发管线重算。`,
    tags: ["属性系统", "计算管线", "角色"],
  },
  {
    id: "umm-character-system-2",
    chapter: "umm-character-system",
    level: 3,
    question: `Unity 中换装系统如何实现？关键点是什么？`,
    answer:
      `换装系统通过 SkinnedMeshRenderer + 共享骨骼实现：① 所有装备部件（头盔、护甲、武器）的网格共用同一套骨骼；② 换装时实例化新部件的 Mesh，绑定到角色的骨骼根节点；③ 用 SkinnedMeshRenderer.bones 数组指定对应的骨骼引用。关键点：骨骼绑定必须正确（部件的骨骼名与角色骨骼名一致），材质和贴图要做 AssetBundle 按需加载，避免内存膨胀。`,
    tags: ["换装系统", "SkinnedMeshRenderer", "骨骼"],
  },
  {
    id: "umm-character-system-3",
    chapter: "umm-character-system",
    level: 2,
    question: `为什么装备穿戴必须在服务器校验，不能信任客户端？`,
    answer:
      `如果客户端本地校验，玩家可以绕过限制（如穿未拥有的装备、穿不兼容职业的装备、同时穿多个同槽位装备）。服务器校验确保：① 物品确实在背包中；② 物品类型与槽位匹配；③ 职业和等级限制满足；④ 套装效果正确触发。校验通过后服务器更新装备状态、重算属性、广播给 AOI 范围内的其他玩家。客户端只做表现层播放。`,
    tags: ["装备系统", "服务端权威", "校验"],
  },
  {
    id: "umm-character-system-4",
    chapter: "umm-character-system",
    level: 1,
    question: `角色创建时的「捏脸」数据如何在网络中同步？`,
    answer:
      `捏脸数据是一组参数化数值（如眼睛大小 0.3、鼻子高度 0.7、脸型 2），不是模型文件。同步策略：创建时客户端把全部捏脸参数序列化为一个 Protobuf 消息上传服务器，服务器存入数据库。其他玩家需要看到该角色时，服务器下发捏脸参数，客户端用参数驱动 MorphTarget（BlendShape）重建面部。只传几十个 float，不传模型文件，带宽极小。`,
    tags: ["角色创建", "捏脸", "MorphTarget", "同步"],
  },
];
