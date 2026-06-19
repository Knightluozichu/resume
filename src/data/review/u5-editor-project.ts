/** 复习题库 · 编辑器与项目结构（u5-editor-project）。《Unity 5 权威讲解》第1章改编（全书首章）。 */

import type { ReviewQuestion } from "./types";

export const u5EditorProjectQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "u5-ep-1",
    chapter: "u5-editor-project",
    level: 1,
    question: "什么是「游戏引擎」？它至少替开发者包办了哪几件底层的事？",
    answer:
      "游戏引擎是一套帮你把游戏跑起来的现成软件框架，把底层脏活都包了，让你专注做玩法。它至少包办四件事：**渲染**（把模型/贴图/灯光算成屏幕画面）、**物理**（重力、碰撞、反弹）、**输入**（把键鼠/手柄/触摸信号变成代码能读的事件）、**资源管理**（加载和释放模型、贴图、声音等素材）。Unity 就是这样一个游戏引擎。",
    tags: ["游戏引擎", "定义", "渲染", "物理"],
  },
  {
    id: "u5-ep-2",
    chapter: "u5-editor-project",
    level: 1,
    question: "Unity 编辑器的五大窗口分别叫什么？",
    answer:
      "**Hierarchy（层级）**、**Scene（场景）**、**Game（游戏）**、**Inspector（检视面板）**、**Project（工程）**。本章把整个编辑器比作一间数字片场：Hierarchy 是演员名单、Scene 是导演摆位台、Game 是摄影机取景、Inspector 是选中演员的资料卡、Project 是道具仓库。",
    tags: ["五大窗口", "编辑器", "定义"],
  },
  {
    id: "u5-ep-3",
    chapter: "u5-editor-project",
    level: 1,
    question: "`Inspector`（检视面板）窗口显示的是什么内容？",
    answer:
      "显示并编辑**当前选中对象**的全部属性——选中哪个 GameObject，它就显示哪个对象的「资料卡」，包括位置、大小、挂着的所有组件及每个组件的参数，都能在这里直接改。选中变了，Inspector 显示的内容就跟着变。",
    tags: ["Inspector", "检视面板", "定义"],
  },
  {
    id: "u5-ep-4",
    chapter: "u5-editor-project",
    level: 1,
    question: "什么是「场景（Scene）」？它的文件后缀是什么？",
    answer:
      "场景是一个**关卡、一个界面或一个可独立加载的「房间」**（比如主菜单是一个场景，第一关是另一个场景）。游戏由若干场景组成，运行时通常一次加载一个场景。场景文件的后缀是 `.unity`。",
    tags: ["场景", "Scene", "定义"],
  },
  {
    id: "u5-ep-5",
    chapter: "u5-editor-project",
    level: 1,
    question:
      "什么是「GameObject」？什么是「组件（Component）」？两者是什么关系？",
    answer:
      "GameObject 是 Unity 场景里最基本的「东西」（角色、摄影机、灯光、地面都是），但它本身只是个**空壳**，什么都不会。组件是挂在 GameObject 上、给它某种能力的功能模块。关系：一个 GameObject 通过**挂上若干组件**才获得能力——挂 Transform 才有位置，挂 Renderer 才画得出来，挂脚本才有玩法逻辑。",
    tags: ["GameObject", "组件", "Component", "定义"],
  },
  {
    id: "u5-ep-6",
    chapter: "u5-editor-project",
    level: 1,
    question: "一个 Unity 项目里，哪个文件夹是「你的资源根目录」？",
    answer:
      "`Assets` 文件夹。你的模型、贴图、脚本、场景文件全放在这里（可以再分子文件夹整理）。Project 窗口显示的就是 `Assets` 里的内容；只有放进 `Assets`（或其子文件夹）的东西，Unity 才会自动识别和导入。",
    tags: ["Assets", "项目结构", "定义"],
  },

  // ── L2 理解：为什么 / 区别 ──
  {
    id: "u5-ep-7",
    chapter: "u5-editor-project",
    level: 2,
    question: "Scene 窗口和 Game 窗口最容易搞混，它们的本质区别是什么？",
    answer:
      "**Scene 窗口是给制作者用的「导演摆位视角」**：你可以从任意角度自由观察、拖动和编辑对象，玩家永远看不到它。**Game 窗口显示的是玩家真正会看到的画面**——即场景里那台摄影机拍到的内容。一句话：Scene 是你摆位用的，Game 是玩家看的。点 Play 后游戏就在 Game 窗口里跑。",
    tags: ["Scene", "Game", "区别"],
  },
  {
    id: "u5-ep-8",
    chapter: "u5-editor-project",
    level: 2,
    question:
      "`Hierarchy` 窗口和 `Project` 窗口都列了一堆东西，它们的区别是什么？",
    answer:
      "**Project 是「仓库里有哪些素材」**（对应 `Assets` 文件夹的全部资源：模型、贴图、脚本……），**Hierarchy 是「当前这一场用上了哪些对象」**（当前场景里实际存在的 GameObject）。素材要先从 Project 拖进场景，才会出现在 Hierarchy 里、出现在游戏中。一个是素材库，一个是场上名单。",
    tags: ["Hierarchy", "Project", "区别"],
  },
  {
    id: "u5-ep-9",
    chapter: "u5-editor-project",
    level: 2,
    question: "为什么 `Library` 和 `ProjectSettings` 文件夹不建议手动去碰？",
    answer:
      "`Library` 是 Unity 根据 `Assets` **自动生成的缓存**（导入后的素材、编译结果等），删了会自动重新生成，所以不该进版本管理、更不该手动编辑——手改可能让缓存和源资源不一致。`ProjectSettings` 存项目级配置，应该通过编辑器的菜单来改而不是手动改文件，手动改容易破坏格式或写出非法配置。记住：只动 `Assets`，其余交给 Unity。",
    tags: ["Library", "ProjectSettings", "项目结构"],
  },
  {
    id: "u5-ep-10",
    chapter: "u5-editor-project",
    level: 2,
    question:
      "为什么说「GameObject 本身什么都不会」？这反映了 Unity 的什么设计思路？",
    answer:
      "因为 GameObject 默认只是个空壳，连「在哪个位置」都得靠组件告诉它。能力全由挂上去的组件提供。这反映 Unity 的「**组合优于继承**」思路：不靠继承造一个个庞大的对象类，而是把功能拆成一块块可复用的组件，需要什么本事就给 GameObject 挂什么组件。所以 Inspector 里看到的那一串，就是它挂着的全部组件。",
    tags: ["GameObject", "组件", "组合", "设计思路"],
  },
  {
    id: "u5-ep-11",
    chapter: "u5-editor-project",
    level: 2,
    question: "Unity 的层级是「一层套一层」的，请按从外到内的顺序说出这条链。",
    answer:
      "**Project（仓库里的资源）→ 拖进 → Scene（场景）→ 场景里是一个个 GameObject → 每个 GameObject 挂着若干 Component（组件）**。资源先在 Project 仓库里，拖进场景后变成 GameObject，每个 GameObject 身上挂着提供具体能力的组件。",
    tags: ["层级", "Project", "Scene", "GameObject", "Component"],
  },
  {
    id: "u5-ep-12",
    chapter: "u5-editor-project",
    level: 2,
    question:
      "在 Hierarchy 里选中一个 GameObject 后，Inspector 里冒出来的那一串东西是什么？",
    answer:
      "是这个 GameObject 挂着的**所有组件（Component）**。Inspector 把每个组件的属性都列出来给你看和改——比如 Transform 组件的位置/旋转/缩放、Renderer 组件的材质、你写的脚本组件的公开参数等。这正是「选中谁就显示谁的资料卡」。",
    tags: ["Inspector", "组件", "GameObject"],
  },

  // ── L3 应用：动手 / 排错 ──
  {
    id: "u5-ep-13",
    chapter: "u5-editor-project",
    level: 3,
    question:
      "在 Play（运行）模式下把角色的移动速度从 5 调到 10，点 Stop 后这个 10 还在吗？为什么 Unity 这样设计？",
    answer:
      "**不在，会还原回 5。** Play 模式下对场景所做的任何修改都是**临时**的，只为方便你测试；点 Stop 退出运行模式时场景会**整体还原**到点 Play 之前的样子。Unity 这样设计是为了让你能在运行中安全地随便折腾、试参数，而不必担心把搭好的场景弄乱。代价是：运行中调出的好数值要记下来，Stop 后回到编辑模式再填回去才永久生效。",
    tags: ["Play模式", "运行模式", "坑", "工作流"],
  },
  {
    id: "u5-ep-14",
    chapter: "u5-editor-project",
    level: 3,
    question:
      "你在 Scene 窗口里把对象摆得好好的，切到 Game 窗口却看不到。可能是什么原因，怎么排查？",
    answer:
      "把 Scene（导演摆位视角）和 Game（玩家通过摄影机看到的画面）搞混了——**Scene 里看得到不等于摄影机拍得到**。Game 窗口显示的是场景里那台摄影机拍到的内容。排查：检查场景里那台摄影机（Main Camera）的位置和朝向，确认目标对象落在摄影机的取景范围（视锥）内；调整摄影机位置或把对象移进取景范围即可。",
    tags: ["Scene", "Game", "摄影机", "排错"],
  },
  {
    id: "u5-ep-15",
    chapter: "u5-editor-project",
    level: 3,
    question:
      "把做好的模型放进了项目文件夹，Project 窗口里却看不到、用不了。哪里出了问题？最稳妥的做法是什么？",
    answer:
      "素材多半没放进 `Assets` 文件夹（放到了项目根目录或 `Library` 等其它目录）——**Unity 只导入 `Assets` 里的东西**。最稳妥的做法是直接把文件**拖进 Project 窗口**：Unity 会自动把它放到 `Assets`（或当前选中的子文件夹）下，并完成导入、生成预览。之后就能在 Project 里看到、拖进场景使用。",
    tags: ["Assets", "Project", "导入", "排错"],
  },
  {
    id: "u5-ep-16",
    chapter: "u5-editor-project",
    level: 3,
    question:
      "Unity 新建 C# 脚本默认给的模板里有 `Start()` 和 `Update()` 两个方法，它们各在什么时候被调用？玩法逻辑通常写在哪个里？",
    answer:
      "`Start()` 在该对象**第一次启用时只调用一次**，适合做初始化（比如读取初始数据、找引用）。`Update()` 在游戏运行时**每一帧都调用一次**（一秒可能几十上百次），是写玩法逻辑的主战场——读输入、移动角色、检测状态都在这里。所以「每帧要做的玩法逻辑」通常写在 `Update()` 里，「只做一次的准备工作」写在 `Start()` 里。",
    tags: ["MonoBehaviour", "Start", "Update", "脚本"],
  },

  // ── L4 综合：贯通 / 迁移 ──
  {
    id: "u5-ep-17",
    chapter: "u5-editor-project",
    level: 4,
    question:
      "用「数字片场」这个比喻，把五大窗口、GameObject、Component、以及编辑-运行工作流串成一个完整的故事讲一遍。",
    answer:
      "把 Unity 编辑器想成一间**数字片场**：你是导演。**Project**（道具仓库）里堆着所有素材；你把要用的从仓库拖进**场景**，它们就成了场上的演员和道具——也就是 **GameObject**，全列在 **Hierarchy**（演员名单）里。每个 GameObject 本身是空壳，靠挂 **Component**（技能/装备）才有本事：Transform 给位置、Renderer 让它画得出来、脚本给玩法逻辑。你在 **Scene**（导演摆位台）里自由调度摆位，随时切到 **Game**（摄影机取景）看观众实际会看到的画面；选中某个演员，**Inspector**（资料卡）就显示并让你调它的全部组件属性。做游戏就是这套循环：在编辑模式搭场景、挂脚本 → 点 **Play** 让戏真跑起来测试 → 在 Game 里观察 → 点 Stop 回编辑模式改 → 再来一遍。切记 Play 里改的东西 Stop 后会丢，永久改动要在编辑模式做。",
    tags: ["综合", "数字片场", "工作流", "贯通"],
  },
];
