import type { ReviewQuestion } from "./types";

export const gep2ScriptingSystemQuestions: ReviewQuestion[] = [
  {
    id: "gep2-scripting-system-1",
    chapter: "gep2-scripting-system",
    level: 1,
    question: `脚本系统由哪三层组成？它们的关系是什么？`,
    answer:
      `C++ 引擎层（Native 性能敏感代码，注册到反射表）↔ 绑定层（自动生成胶水代码，桥接 Lua/Python/C#，管 GC 句柄）↔ 脚本层（游戏逻辑，热重载、快速迭代）。脚本通过绑定层调 Native API，Native 也能经绑定层回调脚本。性能关键走 C++，频繁改动走脚本。`,
    tags: ["三层", "绑定", "脚本"],
  },
  {
    id: "gep2-scripting-system-2",
    chapter: "gep2-scripting-system",
    level: 2,
    question: `什么是热重载？它为什么能提升开发效率？`,
    answer:
      `热重载指改了脚本后无需重启引擎，运行中的引擎自动重新加载脚本并恢复状态，改动立即生效。开发时反复调玩法参数/逻辑，若每次都要重启引擎（加载场景几十秒），迭代极慢；热重载把「改-试」循环压到秒级，效率数倍提升。它只重建脚本层，引擎运行时不中断，靠文件监听触发重新加载、序列化恢复脚本状态。`,
    tags: ["热重载", "迭代效率"],
  },
  {
    id: "gep2-scripting-system-3",
    chapter: "gep2-scripting-system",
    level: 3,
    question: `绑定层为什么多靠「反射 + 代码生成」而不是手写胶水？`,
    answer:
      `手写绑定（为每个 C++ 类/方法写一个 Lua wrapper）枯燥且易错，引擎 API 上百个类、上千方法时根本维护不动。反射 + 代码生成：先给 C++ 类加反射元数据（字段名/类型/方法签名），再用工具扫反射表自动生成对应脚本绑定代码。加新 API 只需加反射注解，绑定代码自动更新，一致性强、维护成本低。代价是反射元数据有运行时开销和编译期复杂度，但相对手写绑定的维护噩梦值得。`,
    tags: ["绑定", "反射", "代码生成"],
  },
  {
    id: "gep2-scripting-system-4",
    chapter: "gep2-scripting-system",
    level: 4,
    question:
      `热重载时脚本持有的 Native 对象引用如何不失效？综合分析 GC 句柄管理的难点。`,
    answer:
      `脚本常持有 Native 对象引用（如脚本里有个变量指向某 Actor）。热重载会重建脚本虚拟机和所有脚本对象，若直接用裸指针，重载后旧指针失效、野指针崩溃。解法是「句柄表」：脚本不存裸指针，存一个句柄 ID，引擎侧维护 ID→Native 对象的表。重载前把 Native 对象序列化（或保持存活），重载后用句柄 ID 重新查表拿回对象，脚本状态也靠序列化恢复。难点：①Native 对象生命周期与脚本 GC 要协调（脚本释放时引擎别误删，引擎删除时脚本句柄要置空）；②循环引用（脚本引用 Native，Native 又回调脚本）易内存泄漏，需双向弱引用或手动断开；③重载时机要选在安全点（不在回调中途），否则状态半新半旧。这是脚本系统最易出 bug 的地方。`,
    tags: ["GC句柄", "热重载", "综合", "生命周期"],
  },
];
