import type { ReviewQuestion } from "./types";

/** Python 数据模型 复习题 */
export const flpDataModelQuestions: ReviewQuestion[] = [
  {
    id: "flp-data-model-1",
    chapter: "flp-data-model",
    level: 1,
    question: `什么是 Python 的特殊方法（dunder methods）？写出两个例子并说明它们分别被哪种语法调用。`,
    answer:
      `特殊方法是以双下划线包裹的方法（如 \`__len__\`、\`__getitem__\`），它们是 Python 数据模型的实现接口。内置函数和语法通过调用它们与对象交互。\n\n例子：\n1. \`__len__\`：被 \`len(obj)\` 调用，返回对象的长度。\n2. \`__getitem__\`：被 \`obj[i]\` 或 \`obj[a:b]\` 调用，实现索引与切片。\n\n自定义类型只要实现了相应特殊方法，就能被内置函数和语法（\`len()\`、\`[]\`、\`for\`、\`+\` 等）无缝接受。`,
    tags: ["特殊方法", "dunder", "数据模型"],
  },
  {
    id: "flp-data-model-2",
    chapter: "flp-data-model",
    level: 2,
    question: `为什么 Python 推荐用 \`len(obj)\` 而不是直接调用 \`obj.__len__()\`？两者有什么本质区别？`,
    answer:
      `\`len(obj)\` 是内置函数，内部调用 \`obj.__len__()\`，但做了两件 \`obj.__len__()\` 直接调用做不到的事：\n\n1. 类型检查：\`len()\` 保证返回值是整数（\`__len__\` 返回非整数会抛 \`TypeError\`），且对内置类型（如 \`list\`、\`str\`）走的是 CPython 的快速路径，直接读取内部长度字段，不经过 Python 方法调用。\n2. 一致性：\`len()\` 是统一的接口，调用者不需要知道对象类型，只要它实现了 \`__len__\` 就能求长度。直接调 \`obj.__len__()\` 则绕过了数据模型的抽象，且对内置类型反而更慢。\n\n本质区别：\`len()\` 是数据模型的「正面入口」，\`__len__\` 是实现细节。Pythonic 的做法是用内置函数/语法，让特殊方法待在幕后。`,
    tags: ["len", "特殊方法", "快速路径", "Pythonic"],
  },
  {
    id: "flp-data-model-3",
    chapter: "flp-data-model",
    level: 3,
    question: `请实现一个 \`Vector\` 类，支持 \`v[i]\` 索引、\`len(v)\`、\`repr(v)\` 和 \`v1 + v2\` 运算，并解释每个特殊方法的作用。`,
    answer:
      `\`\`\`python\nclass Vector:\n    def __init__(self, comps):\n        self._comps = list(comps)\n\n    def __len__(self):\n        return len(self._comps)          # 支持 len(v)\n\n    def __getitem__(self, i):\n        return self._comps[i]            # 支持 v[i] 和 v[a:b] 切片\n\n    def __repr__(self):\n        return f\"Vector({self._comps})\"  # 开发者友好表示\n\n    def __add__(self, other):\n        if len(self) != len(other):\n            return NotImplemented         # 让 Python 尝试 other.__radd__\n        return Vector([a + b for a, b in zip(self, other)])  # 支持 v1 + v2\n\`\`\`\n\n各方法作用：\n- \`__len__\`：让 \`len(v)\` 返回维度数。\n- \`__getitem__\`：让 \`v[i]\` 取分量；因为返回的是底层列表的元素，切片 \`v[0:2]\` 也能工作（返回列表而非 Vector，需注意）。\n- \`__repr__\`：让 \`repr(v)\` 和交互式终端显示对象状态，便于调试。\n- \`__add__\`：让 \`+\` 做逐分量相加并返回新 Vector。返回 \`NotImplemented\` 而非抛异常，是让 Python 有机会尝试右操作数的 \`__radd__\`，更符合数据模型约定。`,
    tags: ["Vector", "__getitem__", "__add__", "NotImplemented"],
  },
  {
    id: "flp-data-model-4",
    chapter: "flp-data-model",
    level: 4,
    question: `有人说「特殊方法就是 Java 的接口，实现它就等于实现接口」，请指出这种类比的两处根本错误，并说明特殊方法的「隐式调用」机制有何工程意义。`,
    answer:
      `两处根本错误：\n\n1. 静态声明 vs 隐式协议：Java 接口是静态声明的契约，类必须显式 \`implements\` 才算实现；Python 特殊方法是隐式的，任何对象只要定义了同名方法就算「实现了协议」，无需声明。这正是「鸭子类型」——\`for\` 循环不检查对象是否「实现了 Iterable 接口」，只尝试调用 \`__iter__\`（或退回到 \`__getitem__\`）。\n2. 调用方不同：Java 接口方法通常由程序员显式调用（\`obj.method()\`）；Python 特殊方法主要由解释器在执行语法/内置函数时隐式调用。你不应该写 \`obj.__len__()\`，而应写 \`len(obj)\`，让解释器去分发。\n\n「隐式调用」机制的工程意义：\n1. 语法统一性：\`+\`、\`for\`、\`with\` 等语法对内置类型和自定义类型一视同仁，自定义类型能融入语言生态（被 \`sorted\`、\`json.dumps\`、\`pickle\` 接受）。\n2. 可替换性：函数参数只要对象「行为像序列」就能工作，不绑定具体类型，降低耦合。\n3. 扩展性：第三方库可以通过实现特殊方法让自己的对象表现得像内置类型，而无需修改语言。\n\n所以特殊方法不是「接口的实现」，而是「让对象融入语言语法的钩子」，二者抽象层次不同。`,
    tags: ["鸭子类型", "隐式调用", "协议", "工程意义"],
  },
];
