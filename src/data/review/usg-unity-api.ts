import type { ReviewQuestion } from "./types";

/** Unity API 核心调用 复习题 */
export const usgUnityApiQuestions: ReviewQuestion[] = [
  {
    id: "usg-unity-api-1",
    chapter: "usg-unity-api",
    level: 1,
    question: `Unity 四大核心 API 分别是什么？各负责什么功能？`,
    answer: `Transform 管变换（位置/旋转/缩放），每个 GameObject 必有；GameObject 管对象生命周期（Instantiate 创建、Destroy 销毁、SetActive 开关、Find 查找）；Input 管输入（GetKeyDown 按键、GetAxis 轴值、mousePosition 鼠标）；Time 管时间（deltaTime 帧间隔、timeScale 时间缩放、fixedDeltaTime 物理步长）。`,
    tags: ["Transform", "GameObject", "Input", "Time"],
  },
  {
    id: "usg-unity-api-2",
    chapter: "usg-unity-api",
    level: 2,
    question: `为什么 Update 中的移动逻辑必须乘 Time.deltaTime？`,
    answer: `Update 每帧调用，但帧间隔不固定——60fps 每帧约 0.0167s，30fps 每帧约 0.033s。不乘 deltaTime 时 \`speed\` 是每帧移动距离，帧率越高每秒移动越快（60fps 移动 60*speed，30fps 移动 30*speed）。乘 deltaTime 后每帧移动 \`speed * deltaTime\`，一秒累加正好 \`speed\`（米/秒），与帧率无关。这是保证游戏在不同设备上表现一致的基础。`,
    tags: ["Time.deltaTime", "帧率无关", "移动"],
  },
  {
    id: "usg-unity-api-3",
    chapter: "usg-unity-api",
    level: 3,
    question: `GetComponent 为什么应该缓存？如何正确缓存跨对象引用？`,
    answer: `GetComponent 需遍历组件列表做类型匹配，有查找开销，每帧调用累积影响性能。正确缓存：同对象组件在 Awake 中 \`GetComponent<T>()\` 存入字段；跨对象引用放 Start 中（Awake 时其他对象可能未初始化）。缓存的引用在对象生命周期内有效。对于 Rigidbody/Collider/Animator 等频繁访问的组件，缓存引用是基本性能习惯。跨对象还可用 \`[SerializeField] private\` 在 Inspector 拖拽赋值。`,
    tags: ["GetComponent", "缓存", "性能"],
  },
  {
    id: "usg-unity-api-4",
    chapter: "usg-unity-api",
    level: 4,
    question: `实现一个支持 WASD 移动 + 鼠标转向 + 空格跳跃的角色控制器，写出核心逻辑并说明为什么这样设计。`,
    answer: `Awake 缓存 Rigidbody。FixedUpdate 中读 Input.GetAxis 的 WASD 轴值，用 \`_rb.MovePosition(transform.position + moveDir * speed * Time.fixedDeltaTime)\` 移动物理（放 FixedUpdate 保证碰撞稳定）。Update 中读 mousePosition 算转向角度，\`transform.rotation = Quaternion.LookRotation(direction)\`。Update 中检测 \`Input.GetKeyDown(KeyCode.Space)\`，用 \`_rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse)\` 跳跃。设计要点：物理移动放 FixedUpdate 乘 fixedDeltaTime；输入检测放 Update；跳跃用 Impulse 力模式瞬间施加。缓存 Rigidbody 避免每帧 GetComponent。`,
    tags: ["角色控制", "Input", "Rigidbody", "综合"],
  },
];
