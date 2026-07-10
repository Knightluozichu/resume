import type { ReviewQuestion } from "./types";

export const umsEditorExtensionQuestions: ReviewQuestion[] = [
  {
    id: "ums-editor-extension-1",
    chapter: "ums-editor-extension",
    level: 1,
    question: `编辑器扩展的分层结构是什么？`,
    answer: `四层：数据层（ScriptableObject 定义数据结构）、编辑层（EditorWindow/CustomEditor 做可视化编辑）、字段层（PropertyDrawer 做字段级 UI）、入口层（MenuItem 做菜单注册）。从底到顶：先定义数据，再做编辑面板，再美化字段，最后注册菜单入口。每层各司其职，改动不影响其他层。`,
    tags: ["分层架构", "ScriptableObject", "编辑器扩展"],
  },
  {
    id: "ums-editor-extension-2",
    chapter: "ums-editor-extension",
    level: 2,
    question: `编辑器脚本为什么必须和运行时脚本分程序集？不分会有什么后果？`,
    answer: `UnityEditor 命名空间只在编辑器内可用，打包时 IL2CPP 不包含它。如果运行时代码引用了 UnityEditor（如 EditorWindow、AssetDatabase），打包直接报错 \`The type 'UnityEditor' could not be found\`。分程序集后，Editor asmdef 标记 Editor Only，打包时自动排除，运行时 asmdef 不引用 Editor 程序集，保证安全。大型项目必须用 asmdef。`,
    tags: ["程序集隔离", "asmdef", "打包"],
  },
  {
    id: "ums-editor-extension-3",
    chapter: "ums-editor-extension",
    level: 3,
    question: `ScriptableObject 做配置数据相比 JSON 配置表有什么优势和劣势？`,
    answer: `优势：Inspector 可视化编辑、支持 Unity 对象引用（直接拖贴图/预制体）、支持自定义 PropertyDrawer、可被 Addressables 加载、热重载方便。劣势：版本控制 diff 不友好（二进制或大段 YAML）、不可被外部工具生成、跨引擎不可用。Unity 项目内配置用 ScriptableObject，外部数据导入用 JSON。`,
    tags: ["ScriptableObject", "JSON", "配置数据"],
  },
  {
    id: "ums-editor-extension-4",
    chapter: "ums-editor-extension",
    level: 4,
    question: `CustomEditor 里直接改 target 的 C# 字段导致预制体修改不生效，原因和修法是什么？`,
    answer: `原因：直接改 C# 字段绕过了 SerializedObject，预制体覆盖系统不追踪这种修改。修法：用 serializedObject.FindProperty(\"fieldName\").floatValue = newVal + serializedObject.ApplyModifiedProperties() 修改数据。需要批量操作时用 Undo.RecordObject。SerializedObject 是编辑器数据访问的标准方式，桥接 Undo、Prefab、多选编辑等系统。虽然 API 啰嗦但必须用。`,
    tags: ["CustomEditor", "预制体", "SerializedObject"],
  },
];
