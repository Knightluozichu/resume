import type { ReviewQuestion } from "./types";

export const jpgDomBomQuestions: ReviewQuestion[] = [
  {
    id: "jpg-dom-bom-1",
    chapter: "jpg-dom-bom",
    level: 2,
    question: `DOM 和 BOM 的关系是什么？window 和 document 谁是根？`,
    answer:
      `BOM 以 window 为根对象，document 是 window 的一个属性（window.document），DOM 是 document 之下的文档节点树。所以 window 是 BOM 的根，document 是 DOM 的根，而 DOM 寄生于 BOM 之内（document 挂在 window 上）。DOM 专门操作 HTML 文档结构（节点树、增删改查），BOM 操作浏览器窗口与环境（location/history/navigator/screen/storage）。JS 通过 BOM 访问浏览器，通过 DOM（BOM 的 document 部分）访问页面内容。两者共同构成「JS 与浏览器交互」的完整 API。window 还是全局对象，所有全局变量和 BOM API 都挂在它上面。`,
    tags: ["DOM", "BOM", "window", "document"],
  },
  {
    id: "jpg-dom-bom-2",
    chapter: "jpg-dom-bom",
    level: 3,
    question: `什么是事件委托？它解决什么问题？有什么局限？`,
    answer:
      `事件委托（event delegation）是利用事件冒泡，把本应绑定在多个子元素上的监听器改为绑定在共同父元素上，通过 e.target 判断实际触发的子元素。解决的问题：① 内存——100 个 li 各加监听器需 100 个对象，委托只需 1 个；② 动态元素——后增删的子元素无需重新绑定/解绑，父节点监听器自动覆盖；③ 代码简洁——逻辑集中一处。局限：① 不冒泡的事件（focus/blur）无法直接委托，需用 focusin/focusout 替代；② 需精确判断 target（如 e.target.closest('li')）避免点到子元素误判；③ 若父节点监听器逻辑复杂可能影响性能。现代框架（React 合成事件）底层就用委托。`,
    tags: ["事件委托", "事件冒泡", "性能", "动态元素"],
  },
  {
    id: "jpg-dom-bom-3",
    chapter: "jpg-dom-bom",
    level: 3,
    question: `什么是重排和重绘？为什么频繁 DOM 操作慢？如何优化？`,
    answer:
      `重排（layout）是重新计算元素几何（尺寸/位置/可见性改变触发），昂贵；重绘（repaint）是重绘像素（颜色等改变触发，不重排），重排必伴随重绘。频繁 DOM 操作慢，因为每次修改可能触发重排，浏览器要重新计算整个或部分文档布局，连带影响后续元素。循环里 100 次 appendChild 触发 100 次重排。优化：① 批量写用 DocumentFragment 离线操作，只触发 1 次重排；② 读写分离避免布局抖动（连续读 offsetHeight 会强制同步布局）；③ 用 transform/opacity 替代 top/left（走合成层不触发重排）；④ 用 rAF 批处理视觉更新与刷新同步；⑤ 频繁改样式用 class 切换而非逐条 style。`,
    tags: ["重排", "重绘", "性能优化", "DocumentFragment", "transform"],
  },
  {
    id: "jpg-dom-bom-4",
    chapter: "jpg-dom-bom",
    level: 4,
    question: `什么是布局抖动（layout thrashing）？如何避免？`,
    answer:
      `布局抖动指在循环或连续代码中交替读取布局属性（offsetHeight/getBoundingClientRect 等，会强制浏览器立即执行同步布局）和写入样式（触发重排），导致浏览器反复「强制同步布局」多次。每次读布局属性后浏览器标记布局脏，紧接着写样式又触发重新计算，下一轮读又强制布局——形成抖动，性能急剧下降。避免方法：① 读写分离——先集中读所有布局属性，再集中写样式，避免交替；② 用 rAF 批处理——把写操作推迟到下一帧；③ 缓存布局值——读一次存变量，不反复读；④ 用 FastDOM 模式（读阶段 + 写阶段分离）。现代框架（React 的批量更新）底层就避免抖动。`,
    tags: ["布局抖动", "layout thrashing", "强制同步布局", "性能"],
  },
];
