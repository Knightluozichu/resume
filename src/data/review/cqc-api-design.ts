import type { ReviewQuestion } from "./types";

/** 编写高质量代码 · API 设计复习题 */
export const cqcApiDesignQuestions: ReviewQuestion[] = [
  {
    id: "cqc-api-design-1",
    chapter: "cqc-api-design",
    level: 1,
    question: "API 设计的三层原则是什么？请简述每一层的要求。",
    answer:
      "API 设计三层原则：\n\n1. 命名清晰：方法名说明「做什么」，参数名说明「用什么」，返回类型说明「得到什么」。如 `FindUser(int userId)` 比 `Do(int t)` 清晰得多。\n\n2. 参数精简：参数数量不超过 3 个，多了用选项对象封装。布尔参数考虑拆分方法或用枚举。如 `SendEmail(EmailOptions options)` 比 9 个参数的方法好用。\n\n3. 错误明确：用异常或 Result 类型表达失败，不靠返回码加注释。如 `void Delete(int id)` 失败抛异常比 `int Delete(int id)` 返回 0/1/-1 含义不明更清晰。\n\n好的 API 让调用方不看文档就能用对。",
    tags: ["三层原则", "命名", "参数", "错误处理"],
  },
  {
    id: "cqc-api-design-2",
    chapter: "cqc-api-design",
    level: 2,
    question: "为什么布尔参数是 API 设计的坏味道？应该用什么替代？",
    answer:
      "布尔参数在调用处含义不明：`Process(data, true)` 中的 `true` 读者无法知道是什么意思，必须查看方法定义。两个以上布尔参数更危险：`Send(email, true, false)` 容易传反且无法从调用处发现。\n\n替代方案：\n\n1. 用枚举替代——`Process(data, ProcessMode.Fast)` 自描述，调用处一目了然。\n2. 拆分方法——`ProcessFast(data)` 和 `ProcessThorough(data)` 各自语义明确，无歧义。\n3. 用选项对象——`Process(new ProcessOptions { Mode = Fast })`，适合多参数场景。\n\n枚举是最常用的替代，因为保留了单参数签名的同时消除了歧义。两个布尔参数时必须拆分或用枚举。",
    tags: ["布尔参数", "坏味道", "枚举", "拆分方法"],
  },
  {
    id: "cqc-api-design-3",
    chapter: "cqc-api-design",
    level: 3,
    question: "API 演进时哪些操作是安全的，哪些是危险的？必须做破坏性变更时应该怎么处理？",
    answer:
      "安全操作（不破坏调用方）：\n1. 新增可选参数——`Process(input, timeout: 30)`，旧调用仍有效\n2. 新增重载——`Process(byte[])` 不影响旧的 `Process(string)`\n3. 新增方法和新接口成员（接口带默认实现）\n4. 放宽参数类型——`ArrayList` 改为 `IList`\n\n危险操作（破坏调用方）：\n1. 删除或重命名公开成员——调用方编译失败\n2. 修改参数顺序或类型——调用方编译失败\n3. 修改返回类型——调用方编译失败\n4. 改变异常行为——原来不抛异常现在抛了\n\n必须做破坏性变更时的处理：\n1. 用 `[Obsolete(\"请用 NewMethod 替代\")]` 标记旧成员\n2. 保留旧成员一段时间（至少一个主版本）\n3. 在文档和迁移指南中说明替代方案\n4. 最终在主版本中删除",
    tags: ["API演进", "安全操作", "危险操作", "Obsolete", "兼容性"],
  },
  {
    id: "cqc-api-design-4",
    chapter: "cqc-api-design",
    level: 4,
    question: "综合分析：以下 API 有哪些问题？请重新设计一个更好的版本。\n```\npublic int Save(string path, byte[] data,\n    bool compress, bool encrypt, bool overwrite)\n// 返回 0=成功 1=失败 2=已存在 3=无权限\n```",
    answer:
      "问题分析：\n\n1. 参数过多：6 个参数难以记忆顺序，调用处 `Save(path, data, true, false, false)` 无法理解含义。\n2. 布尔参数坏味道：compress、encrypt、overwrite 三个布尔在调用处含义不明，容易传反。\n3. 返回码含义不明：0/1/2/3 需要查文档，调用方容易忘记检查。\n4. 错误处理不佳：用返回码而非异常，调用方可能忽略错误。\n\n重新设计：\n```\npublic enum CompressionMode { None, Fast, Thorough }\n\npublic class SaveOptions\n{\n    public required string Path { get; init; }\n    public required byte[] Data { get; init; }\n    public CompressionMode Compression { get; init; } = CompressionMode.None;\n    public bool Encrypt { get; init; } = false;\n    public bool Overwrite { get; init; } = false;\n}\n\npublic void Save(SaveOptions options)\n{\n    if (!options.Overwrite && File.Exists(options.Path))\n        throw new FileAlreadyExistsException(options.Path);\n    // ... 保存逻辑，失败抛 IOException 等\n}\n```\n\n改进点：用选项对象封装参数、布尔改枚举、用异常替代返回码、required 属性保证必填。",
    tags: ["综合", "API重设计", "选项对象", "枚举", "异常"],
  },
];
