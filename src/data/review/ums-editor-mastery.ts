import type { ReviewQuestion } from "./types";

export const umsEditorMasteryQuestions: ReviewQuestion[] = [
  {
    id: "ums-editor-mastery-1",
    chapter: "ums-editor-mastery",
    level: 1,
    question: "Unity 编辑器扩展的三把钥匙是什么？",
    answer: "EditorWindow 做独立工具面板（批量操作、数据导入导出），PropertyDrawer 做字段级定制（Inspector 内自定义类型美化），Gizmo 做场景可视化（范围标记、调试辅助）。三者分别解决工具面板、字段显示、场景可视化三个层面的问题。",
    tags: ["EditorWindow", "PropertyDrawer", "Gizmo"],
  },
  {
    id: "ums-editor-mastery-2",
    chapter: "ums-editor-mastery",
    level: 2,
    question: "为什么编辑器脚本里修改数据要用 SerializedProperty 而不是直接改 C# 字段？",
    answer: "SerializedProperty 是 Unity 编辑器的数据访问层，桥接了 Undo/Redo、Prefab 覆盖、多对象编辑、场景脏标记等系统。直接改 C# 字段绕过这些系统，导致 Undo 不生效、Prefab 修改不保存、场景不标记为已修改。用 SerializedProperty 虽然 API 啰嗦（FindPropertyRelative + floatValue），但保证了编辑器数据一致性。",
    tags: ["SerializedProperty", "Undo", "Prefab"],
  },
  {
    id: "ums-editor-mastery-3",
    chapter: "ums-editor-mastery",
    level: 3,
    question: "EditorWindow 和 PropertyDrawer 各自适合什么场景？举一个必须用 EditorWindow 的例子。",
    answer: "EditorWindow 适合独立工具面板（批量操作、数据导入导出、多列布局），PropertyDrawer 适合 Inspector 内的字段级美化（滑动条、颜色选择器、条件显示）。批量重命名选中物体必须用 EditorWindow——它需要访问 Selection.gameObjects 并提供按钮操作，PropertyDrawer 只能定制已有字段的显示，无法添加全局操作入口。",
    tags: ["场景选择", "EditorWindow", "PropertyDrawer"],
  },
  {
    id: "ums-editor-mastery-4",
    chapter: "ums-editor-mastery",
    level: 4,
    question: "OnDrawGizmos 和 OnDrawGizmosSelected 有什么区别？大量 Gizmo 导致卡顿怎么解决？",
    answer: "OnDrawGizmos 每帧对所有挂载物体绘制（始终显示），OnDrawGizmosSelected 仅对选中物体绘制。大量 Gizmo 卡顿原因：场景里几百个物体全画 OnDrawGizmos。解决方案：1）改用 OnDrawGizmosSelected 只画选中物体；2）加 `[DrawGizmo(GizmoType.Selected)]` 条件控制；3）用 LOD 思路——距离相机远的简化绘制或跳过；4）Gizmo 绘制里避免复杂计算（缓存结果）。",
    tags: ["Gizmo", "性能优化", "场景可视化"],
  },
];
