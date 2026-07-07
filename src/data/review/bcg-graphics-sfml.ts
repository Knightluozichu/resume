import type { ReviewQuestion } from "./types";

/** C++ 游戏编程入门 · 图形与 SFML 复习题 */
export const bcgGraphicsSfmlQuestions: ReviewQuestion[] = [
  {
    id: "bcg-graphics-sfml-1",
    chapter: "bcg-graphics-sfml",
    level: 1,
    question: "SFML 每帧渲染的「三件套」是什么？为什么必须成对出现？",
    answer:
      "三件套：`window.clear()` 清屏 → `window.draw(sprite)` 绘制 → `window.display()` 显示。\n\n必须成对：\n- 漏 `clear()`：上一帧画面残留，产生拖影/残影叠在当前帧上。\n- 漏 `draw()`：屏幕空白（没画东西）。\n- 漏 `display()`：SFML 默认双缓冲，draw 画到后台缓冲，不调用 display 就不把后台交换到前台，窗口保持黑屏或停在上一帧。\n\n顺序也得对：先 clear 再 draw 再 display。clear 在 draw 之后等于把刚画的擦了。这是 SFML（及大多数双缓冲图形库）每帧的固定骨架。",
    tags: ["SFML", "clear", "draw", "display", "双缓冲"],
  },
  {
    id: "bcg-graphics-sfml-2",
    chapter: "bcg-graphics-sfml",
    level: 2,
    question: "Texture（纹理）和 Sprite（精灵）是什么关系？为什么不直接画 Texture？",
    answer:
      "Texture 是图片数据本身（加载到显存的像素阵列），Sprite 是「引用某张纹理 + 位置/旋转/缩放等变换」的可绘制实例。\n\n不直接画 Texture 的原因：\n1. 复用：一张纹理可被多个 Sprite 共享。比如 100 个相同敌人共用 1 张贴图，省显存；若每敌人都存纹理副本浪费巨量内存。\n2. 变换分离：Sprite 各自有独立的位置/旋转/缩放，纹理本身不变。移动敌人只改对应 Sprite 的位置，不动纹理。\n3. 职责单一：Texture 管「像素数据」，Sprite 管「怎么摆怎么画」，分离后各自职责清晰。\n\n用法：`Texture t; t.loadFromFile(\"a.png\"); Sprite s; s.setTexture(t); s.setPosition(100,200); window.draw(s);`\n\n注意：Texture 必须在 Sprite 使用期间保持存活（Sprite 不拥有纹理，只引用），纹理先于 Sprite 销毁会画出错乱。",
    tags: ["Texture", "Sprite", "纹理", "复用", "变换"],
  },
  {
    id: "bcg-graphics-sfml-3",
    chapter: "bcg-graphics-sfml",
    level: 3,
    question: "SFML 事件（Event）和实时输入（如 Keyboard::isKeyPressed）有什么区别？分别适合什么场景？",
    answer:
      "事件（Event）：通过 `window.pollEvent(e)` 取出队列里的一次性事件，如「按键被按下」「按键松开」「关闭窗口」。它是**离散瞬时**的，按一次产生一个事件。适合响应「单次触发」的动作，如按 ESC 暂停、按空格开火、点关闭按钮。\n\n实时输入（`Keyboard::isKeyPressed(Key::Right)`）：查询键盘**当前**状态，按住期间每帧都返回 true。适合**持续按住**的动作，如按住方向键移动、按住加速键加速。\n\n区别要点：\n1. 事件只在你按下/松开那一刻触发一次；实时输入按住期间持续为真。\n2. 移动这类「按住才生效」的用实时输入，否则要自己维护按键状态。\n3. 菜单确认、暂停这类「点按」的用事件，避免按住时反复触发。\n4. 窗口关闭、失去焦点等系统级交互只能靠事件。\n\n实战常两者混用：事件管窗口/菜单，实时输入管角色移动。",
    tags: ["Event", "实时输入", "isKeyPressed", "事件", "应用"],
  },
  {
    id: "bcg-graphics-sfml-4",
    chapter: "bcg-graphics-sfml",
    level: 4,
    question: "综合分析：设计一个 SFML 游戏的渲染流程，要求支持背景 + 多个角色精灵 + UI 文字三层绘制，并保证绘制顺序与性能。说明分层与批处理思路。",
    answer:
      "渲染流程（每帧）：\n```\nwindow.clear();\nwindow.draw(backgroundSprite);        // 第 1 层：背景\nfor (auto* e : entities)              // 第 2 层：角色，按 y 坐标排序\n  window.draw(e->getSprite());\nwindow.draw(scoreText);               // 第 3 层：UI 文字\nwindow.display();\n```\n\n分层思路：\n1. 顺序即层级：SFML 后画的覆盖先画的，所以按「背景→世界→UI」顺序 draw 即可实现层级，无需 Z-buffer。\n2. 角色间排序：2D 游戏常按 y 坐标排序实现「下面的人挡住上面的人」的伪 3D 感，每帧排序（或维护有序结构）。\n3. UI 永远最上：UI 文字最后画，不被任何世界物体遮挡；可用独立 View（视口）做屏幕坐标 UI，与世界坐标分离。\n\n性能思路：\n1. 减少绘制调用：每个 draw 是一次状态提交，精灵多时开销大。SFML 的 VertexArray 可把同纹理的多个精灵合成一次 draw（批处理），大幅降低调用数。\n2. 纹理图集（sprite sheet）：把多个小图合到一张大纹理，切换纹理昂贵，合图后整批精灵共用一纹理一次画完。\n3. 静态背景缓存：背景不变可用 RenderTexture 预渲染一次，每帧只 draw 这张缓存，不重画背景元素。\n4. 视锥剔除：屏幕外的精灵不 draw（虽 SFML 也会裁剪，但跳过 draw 调用本身省 CPU）。\n5. 避免每帧加载：纹理/字体在初始化时加载一次，循环里只 draw，绝不 loadFromFile。\n\n综合：分层靠 draw 顺序、角色层内部靠排序、UI 用独立 View 隔离；性能靠同纹理批处理（VertexArray + 图集）+ 静态缓存 + 资源预加载。这是从「能画出来」到「画得快」的关键升级。",
    tags: ["综合", "分层渲染", "绘制顺序", "批处理", "纹理图集", "性能", "View"],
  },
];
