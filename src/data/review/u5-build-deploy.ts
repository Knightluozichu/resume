/** 复习题库 · 构建与发布（u5-build-deploy）。《Unity 5 权威讲解》第13章（收官章）改编。 */

import type { ReviewQuestion } from "./types";

export const u5BuildDeployQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "u5-bd-1",
    chapter: "u5-build-deploy",
    level: 1,
    question: "把游戏从工程打成某平台成品包的大致步骤是什么？",
    answer:
      "**File → Build Settings → 选目标平台**（PC/Mac/Linux Standalone、WebGL、Android、iOS…）**→ 勾选 `Scenes In Build`**（哪些场景进包、按什么顺序）**→ 点 Build（出包）或 Build And Run（出包并运行）**，最后得到该平台的产物（Win 出 `.exe`、Mac 出 `.app`、Android 出 `.apk`、WebGL 出一个网页文件夹）。一句话：同一个工程，按目标平台各打一个成品包。",
    tags: ["构建", "Build Settings", "流程", "定义"],
  },
  {
    id: "u5-bd-2",
    chapter: "u5-build-deploy",
    level: 1,
    question: "`Scenes In Build` 是什么？里面的「索引 0」有什么特殊含义？",
    answer:
      "**`Scenes In Build`** 是 Build Settings 顶部的**场景清单**，决定**哪些场景进最终包、按什么顺序**。每个场景有一个从 0 开始的**构建索引**。**索引 0 的场景 = 游戏启动时第一个被加载的场景**（通常是主菜单 / 启动画面）。关键：只有进了这个列表的场景，运行时才能被 `LoadScene` 加载到。",
    tags: ["Scenes In Build", "构建索引", "启动场景", "定义"],
  },
  {
    id: "u5-bd-3",
    chapter: "u5-build-deploy",
    level: 1,
    question: "切换场景该用哪个 API？需要引入什么命名空间？",
    answer:
      "用 **`SceneManager.LoadScene(名字 或 构建索引)`**，需要 **`using UnityEngine.SceneManagement;`**。它按场景名或 `Scenes In Build` 里的索引加载一个场景、替换当前场景。异步版本是 `SceneManager.LoadSceneAsync`。注意：老代码里的 `Application.LoadLevel` **已被弃用**，一律改用 `SceneManager.LoadScene`。",
    tags: ["SceneManager.LoadScene", "命名空间", "场景切换", "定义"],
  },
  {
    id: "u5-bd-4",
    chapter: "u5-build-deploy",
    level: 1,
    question: "`Development Build` 勾选项是干什么的？",
    answer:
      "勾上 **`Development Build`** 后，构建出的包会**带调试符号、能连 Profiler 做性能分析、能在设备上看 `Debug.Log` 日志**，方便测试期排错。代价是**包更大、运行更慢**，并可能暴露调试信息。所以它只在开发 / 测试期勾上，**发布给玩家的正式版必须取消勾选**。代码里可用 `Debug.isDebugBuild` 判断当前是不是开发版。",
    tags: ["Development Build", "调试", "Profiler", "定义"],
  },
  {
    id: "u5-bd-5",
    chapter: "u5-build-deploy",
    level: 1,
    question: "Mono 和 IL2CPP 这两种「脚本后端」各是怎么把 C# 落地的？",
    answer:
      "**Mono**：`C# → IL（中间语言）→ 运行时执行`（靠运行时 JIT / 解释）。**IL2CPP**：`C# → IL → 转成 C++ 源码 → 编成平台原生机器码`。两者在 **Player Settings 的 Scripting Backend** 里选。Mono 构建快、迭代快；IL2CPP 构建慢，但性能 / 兼容更好，**iOS、WebGL 等平台必须用 IL2CPP**。",
    tags: ["脚本后端", "Mono", "IL2CPP", "定义"],
  },
  {
    id: "u5-bd-6",
    chapter: "u5-build-deploy",
    level: 1,
    question: "跨平台存档 / 写文件应该用哪个路径？退出游戏用什么 API？",
    answer:
      "存档 / 写文件用 **`Application.persistentDataPath`**——它在各平台（Windows 用户目录、Android 应用私有目录、iOS 沙盒…）都指向一个**合法可写目录**，别写死绝对路径。退出游戏用 **`Application.Quit()`**（注意它在**编辑器里不会真退出**，只在打包后的成品里才生效）。",
    tags: ["persistentDataPath", "Application.Quit", "存档", "定义"],
  },
  {
    id: "u5-bd-7",
    chapter: "u5-build-deploy",
    level: 1,
    question: "Build 和 Build And Run 有什么区别？",
    answer:
      "两者都在 Build Settings 里：**Build** 只**生成成品包**（让你选一个输出位置），生成完不自动运行；**Build And Run** 则**生成后立刻把它跑起来**（PC 直接启动 exe、Android 装到连着的手机上运行等）。调试 / 快速验证用 Build And Run，正式出包用 Build。",
    tags: ["Build", "Build And Run", "构建", "定义"],
  },
  {
    id: "u5-bd-8",
    chapter: "u5-build-deploy",
    level: 1,
    question: "怎么拿到「当前正在运行的场景」？",
    answer:
      "用 **`SceneManager.GetActiveScene()`**（命名空间 `UnityEngine.SceneManagement`），它返回当前激活的 `Scene`，可读它的 `.name`（名字）和 `.buildIndex`（构建索引）。常见用法：重新开始本关 `SceneManager.LoadScene(SceneManager.GetActiveScene().name)`。",
    tags: ["GetActiveScene", "当前场景", "重开", "定义"],
  },

  // ── L2 理解：辨析 / 关系 ──
  {
    id: "u5-bd-9",
    chapter: "u5-build-deploy",
    level: 2,
    question:
      "开发期和发布期，脚本后端（Mono / IL2CPP）和 Development Build 各该怎么选？为什么？",
    answer:
      "**开发期**：脚本后端常用 **Mono**（构建快、迭代快），并**勾上 `Development Build`**（能连 Profiler、看日志，方便排错）。**发布期**：用 **IL2CPP**（性能 / 兼容更好；iOS、WebGL 等本来就必需），并**取消勾选 `Development Build`**（否则包更大更慢、还暴露调试信息）。一句话：开发图快图好调（Mono + Development），发布图稳图小（IL2CPP + 取消 Development）。",
    tags: ["Mono", "IL2CPP", "Development Build", "辨析"],
  },
  {
    id: "u5-bd-10",
    chapter: "u5-build-deploy",
    level: 2,
    question:
      "同步 `LoadScene` 和异步 `LoadSceneAsync` 有什么区别？什么时候用哪个？",
    answer:
      "**`LoadScene`（同步）**：直接加载、加载期间**会卡住一下**（小场景没感觉）。**`LoadSceneAsync`（异步）**：在**后台加载**，返回一个 `AsyncOperation`，可每帧读它的 `op.progress`（约 0~0.9）**做加载进度条**，不黑屏卡死。**小场景 / 切菜单**用同步图省事；**大关卡**用异步 + 进度条，体验更平滑。",
    tags: ["LoadScene", "LoadSceneAsync", "异步加载", "辨析"],
  },
  {
    id: "u5-bd-11",
    chapter: "u5-build-deploy",
    level: 2,
    question:
      "为什么说 `SceneManager.LoadScene` 是现役 API，而 `Application.LoadLevel` 不该再用？",
    answer:
      "`Application.LoadLevel` 是 Unity **5.3 之前**的老 API，**已被弃用（deprecated）**——编译器会警告，且用不上新功能。Unity 5.3+ 起场景管理统一到 **`UnityEngine.SceneManagement` 命名空间**下的 `SceneManager`：`LoadScene`（同步）/ `LoadSceneAsync`（异步）/ `GetActiveScene` 等功能更全。所以看到老代码 / 旧教程里的 `Application.LoadLevel` 一律替换为 `SceneManager.LoadScene`。",
    tags: ["Application.LoadLevel", "弃用", "SceneManager", "辨析"],
  },
  {
    id: "u5-bd-12",
    chapter: "u5-build-deploy",
    level: 2,
    question:
      "「场景文件在 Project 里存在」和「场景能被 `LoadScene` 加载到」是一回事吗？",
    answer:
      "**不是一回事。** Project 里有场景文件，只代表你能在编辑器里打开它；但要让运行时 `SceneManager.LoadScene` 加载得到，它**必须被加进 Build Settings 的 `Scenes In Build` 列表**（且勾选打开）——没进列表的场景**不进包、运行时加载不到**，会报「scene not in build settings」。所以新加的场景记得拖进 `Scenes In Build`。",
    tags: ["Scenes In Build", "场景文件", "加载不到", "辨析"],
  },
  {
    id: "u5-bd-13",
    chapter: "u5-build-deploy",
    level: 2,
    question: "为什么不能在代码里写死像 `C:/save.txt` 这样的存档绝对路径？",
    answer:
      "因为这种绝对路径**只在你这台机器 / 这个平台上成立**：换台电脑可能没有 `C:/`、没有写权限；换到 Android / iOS 根本没有这种路径、应用只能写自己的沙盒目录。结果就是「自己机器上好好的，一换平台 / 换机就读不到 / 报无权限」。应改用 **`Application.persistentDataPath`** 拼路径，它在各平台都指向合法可写目录。",
    tags: ["persistentDataPath", "绝对路径", "跨平台", "辨析"],
  },

  // ── L3 应用：用法 / 排错 ──
  {
    id: "u5-bd-14",
    chapter: "u5-build-deploy",
    level: 3,
    question:
      "运行时 `SceneManager.LoadScene(\"Game\")` 报「scene 'Game' couldn't be loaded ... not been added to the build settings」。最先查什么？怎么修？",
    answer:
      "**最先查 File → Build Settings 的 `Scenes In Build` 列表里有没有 `Game` 场景。** 这个报错几乎总是因为该场景**没被加进构建列表**（光在 Project 里有文件不算数）。**修法**：① 打开 File → Build Settings；② 把 `Game` 场景**拖进 `Scenes In Build` 列表**（或先打开它再点 Add Open Scenes）；③ 确认它前面的**勾选是打开的**；④ 顺手核对场景名拼写、按索引加载时索引是否对应正确。",
    tags: ["scene not in build settings", "Scenes In Build", "排错", "应用"],
  },
  {
    id: "u5-bd-15",
    chapter: "u5-build-deploy",
    level: 3,
    question:
      "你在编辑器里点「退出游戏」按钮（调了 `Application.Quit()`），结果毫无反应。是 bug 吗？怎么验证退出逻辑？",
    answer:
      "**不是 bug。`Application.Quit()` 在编辑器里本来就不会真退出**（编辑器需要保持运行），它只在**打包后的成品**里才真正关掉程序。要在编辑器里也验证退出逻辑，可以这样写：\n```csharp\npublic void QuitGame()\n{\n#if UNITY_EDITOR\n    UnityEditor.EditorApplication.isPlaying = false; // 编辑器里停 Play\n#else\n    Application.Quit(); // 成品里真退出\n#endif\n}\n```\n另外 WebGL 上 `Quit()` 通常也无意义（网页不能自己关）。",
    tags: ["Application.Quit", "编辑器无效", "排错", "应用"],
  },
  {
    id: "u5-bd-16",
    chapter: "u5-build-deploy",
    level: 3,
    question:
      "写一段「点开始按钮加载 Game 场景、点退出按钮退出游戏」的脚本，并说明按钮怎么接上。",
    answer:
      '```csharp\nusing UnityEngine;\nusing UnityEngine.SceneManagement;\n\npublic class MainMenu : MonoBehaviour\n{\n    public void OnStart()  // 接「开始」按钮的 onClick\n    {\n        SceneManager.LoadScene("Game");\n    }\n\n    public void OnQuit()   // 接「退出」按钮的 onClick\n    {\n        Application.Quit();\n    }\n}\n```\n接法：把这个脚本挂到场景里某个对象上，在「开始」按钮的 Inspector → On Click() 里把该对象拖进去、选 `MainMenu.OnStart`；「退出」按钮选 `MainMenu.OnQuit`。前提：`Game` 场景已在 `Scenes In Build` 列表里；`Application.Quit()` 在编辑器里不退、打包后才生效。',
    tags: ["LoadScene", "Application.Quit", "按钮", "应用"],
  },
  {
    id: "u5-bd-17",
    chapter: "u5-build-deploy",
    level: 3,
    question:
      "做一个「异步加载 Game 场景 + 进度条」的加载界面。代码怎么写？`op.progress` 有什么要注意的？",
    answer:
      '用 `LoadSceneAsync` + 协程读 `op.progress`：\n```csharp\nusing UnityEngine;\nusing UnityEngine.UI;\nusing UnityEngine.SceneManagement;\nusing System.Collections;\n\npublic class Loader : MonoBehaviour\n{\n    public Slider bar;\n    public void Enter() => StartCoroutine(Run("Game"));\n    IEnumerator Run(string s)\n    {\n        AsyncOperation op = SceneManager.LoadSceneAsync(s);\n        while (!op.isDone)\n        {\n            bar.value = Mathf.Clamp01(op.progress / 0.9f);\n            yield return null;\n        }\n    }\n}\n```\n**注意**：实际加载时 `op.progress` 会**停在约 0.9**（剩下是切换帧），所以要用 `op.progress / 0.9f` 归一化再 `Clamp01`，否则进度条永远到不了满；`op.isDone` 变 true 后引擎自动激活新场景。',
    tags: ["LoadSceneAsync", "进度条", "op.progress", "应用"],
  },
  {
    id: "u5-bd-18",
    chapter: "u5-build-deploy",
    level: 3,
    question:
      "你发布的正式包又大又慢，还被人扒出了调试日志。最可能哪里设错了？怎么修？",
    answer:
      "**最可能是构建时还勾着 `Development Build`**（可能还连带 Autoconnect Profiler / Script Debugging）——它会带上调试符号、可连 Profiler、暴露 `Debug.Log`，本是给开发测试用的，误带进发布版就成了体积负担和信息泄露风险。**修法**：发布正式版前，去 File → Build Settings **取消勾选 `Development Build`** 再 Build。开发期想要这些调试能力，就单独打一个开发版，别拿它当发布包。",
    tags: ["Development Build", "发布版", "排错", "应用"],
  },
  {
    id: "u5-bd-19",
    chapter: "u5-build-deploy",
    level: 3,
    question:
      "写一段跨平台安全的存档代码（写入一个 JSON 字符串），并只在开发版打印存档路径日志。",
    answer:
      '```csharp\nusing UnityEngine;\nusing System.IO;\n\npublic class SaveSystem : MonoBehaviour\n{\n    public void Save(string json)\n    {\n        // 跨平台安全的可写路径，绝不写死绝对路径\n        string path = Path.Combine(Application.persistentDataPath, "save.json");\n        File.WriteAllText(path, json);\n\n        // 只在勾了 Development Build 的开发版打印\n        if (Debug.isDebugBuild)\n            Debug.Log($"已存档到 {path}");\n    }\n}\n```\n要点：① 路径用 **`Application.persistentDataPath`** 拼，各平台都合法可写；② `Debug.isDebugBuild` 在开发版（勾了 Development Build）为 true、正式版为 false，可让调试日志 / 作弊菜单只在开发版生效。',
    tags: ["persistentDataPath", "Debug.isDebugBuild", "存档", "应用"],
  },

  // ── L4 综合：贯通 / 迁移 ──
  {
    id: "u5-bd-20",
    chapter: "u5-build-deploy",
    level: 4,
    question:
      "你要把一个分「主菜单 / 关卡 / 结算」三场景的游戏发布到 PC 和 Android 两个平台，还要支持存档。请把 Scenes In Build、场景跳转、脚本后端 / Development Build、存档路径、退出 整条发布链路串一遍。",
    answer:
      '按「先排场景、再写跳转、最后按平台出包」这条主线：\n**① 排好 `Scenes In Build`**：把 MainMenu / Game / GameOver 三个场景都加进 Build Settings 的 `Scenes In Build` 列表，让 **MainMenu 在索引 0**（启动先加载主菜单）。没进列表的场景运行时加载不到。\n**② 写场景跳转**：`using UnityEngine.SceneManagement;`，点开始 `SceneManager.LoadScene("Game")`、死亡 `LoadScene("GameOver")`、重开 `LoadScene(SceneManager.GetActiveScene().name)`；大关卡用 `LoadSceneAsync` + 进度条。别用已弃用的 `Application.LoadLevel`。\n**③ 存档跨平台**：用 `Path.Combine(Application.persistentDataPath, "save.json")` 而非写死绝对路径——PC 和 Android 都指向各自合法可写目录。\n**④ 退出**：`Application.Quit()`（编辑器里不退、成品里才退；可用 `#if UNITY_EDITOR` 在编辑器里停 Play 验证）。\n**⑤ 按平台出包**：分别选 **PC（Standalone）** 和 **Android** 两个目标平台各 Build 一次；Android 必须用 **IL2CPP**（也对 64 位等有要求）。发布正式版**取消勾选 `Development Build`**；开发期想调试就单独打个勾了 Development 的开发版。\n**贯穿原则**：场景必须进 `Scenes In Build`（索引 0 = 启动场景）；用现役 `SceneManager` API；路径用 `persistentDataPath`；发布版取消 Development Build、按各平台分别出包。',
    tags: [
      "综合",
      "Scenes In Build",
      "SceneManager",
      "IL2CPP",
      "persistentDataPath",
      "迁移",
    ],
  },
];
