import type { ReviewQuestion } from "./types";

/** Effective C# 相等性复习题 */
export const ecsEqualityQuestions: ReviewQuestion[] = [
  {
    id: "ecs-equality-1",
    chapter: "ecs-equality",
    level: 1,
    question: `引用类型上 == 和 Equals 的默认行为分别是什么？`,
    answer:
      `引用类型默认 == 比较引用——两个变量是否指向堆上同一对象。a == b 为 true 只有两者是同一对象。\n\nEquals 默认行为与 == 相同（也是引用比较），但 Equals 是虚方法可被重写为值比较；== 是运算符需单独重载。\n\nstring 是特例：== 被重载为值比较，所以 \"abc\" == \"abc\" 为 true（内容相同），即使它们可能是不同对象。\n\n重写 Equals 不会自动改变 == 的行为——两者独立，需分别处理保持一致。`,
    tags: ["==", "Equals", "引用比较", "默认行为"],
  },
  {
    id: "ecs-equality-2",
    chapter: "ecs-equality",
    level: 2,
    question:
      `为什么重写 Equals 必须同时重写 GetHashCode？不重写会怎样？`,
    answer:
      `字典和哈希表（Dictionary、HashSet）用 GetHashCode 定位桶，再用 Equals 判断桶内是否相等。查找流程：先算 key 的哈希找桶，再在桶内用 Equals 逐个比较。\n\n不重写 GetHashCode 的后果：如果重写了 Equals 为值比较但没重写 GetHashCode，两个 Equals 相等的对象可能返回不同的默认哈希（基于对象地址），被分到不同的桶。字典按一个对象的哈希找桶，找不到另一个相等对象的桶，结果 ContainsKey 返回 false——明明有相等的键却查不到。\n\n铁律：Equals 相等的对象必须返回相同哈希码（反之不必——哈希相同不代表对象相等，哈希碰撞是允许的）。重写 Equals 必须同时重写 GetHashCode 保证一致性。`,
    tags: ["GetHashCode", "Equals", "一致性", "字典查找"],
  },
  {
    id: "ecs-equality-3",
    chapter: "ecs-equality",
    level: 3,
    question:
      `值类型为什么应该实现 IEquatable<T>？不实现会有什么性能问题？`,
    answer:
      `值类型用默认 Equals（object 版）时参数是 object，每次调用都要装箱——值类型从栈拷贝到堆分配一个 object 包装，产生堆分配和 GC 压力。在大量比较场景（如 List<T>.Contains、Dictionary 查找）下，装箱开销显著。\n\n实现 IEquatable<T> 提供 bool Equals(T other)，参数是 T 而非 object，无需装箱。Dictionary<T>、List<T>.Contains、LINQ 的 Contains 等会优先调用 IEquatable<T> 的类型安全版本，避免装箱。\n\n值类型的完整相等性实现：同时重写 Equals(object)（转发到 Equals(T)）、重写 GetHashCode、重载 == 和 != 运算符、实现 IEquatable<T>。这样无论哪种比较路径都无装箱且行为一致。值类型不实现 IEquatable<T> 是常见性能陷阱。`,
    tags: ["IEquatable<T>", "装箱", "值类型", "性能"],
  },
  {
    id: "ecs-equality-4",
    chapter: "ecs-equality",
    level: 4,
    question:
      `实现一个值类型 Point 的完整相等性，要求 == 为值比较、可放入 Dictionary 且无装箱。说明每个成员的作用。`,
    answer:
      `public readonly struct Point : IEquatable<Point>\n{\n    public int X { get; }\n    public int Y { get; }\n    public Point(int x, int y) { X = x; Y = y; }\n\n    // 1. IEquatable<T>：类型安全，无装箱，Dictionary/Contains 优先调用\n    public bool Equals(Point other) => X == other.X && Y == other.Y;\n\n    // 2. object Equals：转发到类型安全版，供非泛型路径使用\n    public override bool Equals(object obj) => obj is Point p && Equals(p);\n\n    // 3. GetHashCode：相等的对象返回相同哈希，保证字典查找正确\n    public override int GetHashCode() => HashCode.Combine(X, Y);\n\n    // 4. == 和 !=：让 == 也是值比较，与 Equals 一致\n    public static bool operator ==(Point a, Point b) => a.Equals(b);\n    public static bool operator !=(Point a, Point b) => !a.Equals(b);\n}\n\n各成员作用：\n- Equals(Point)：IEquatable<T> 的类型安全方法，无装箱，是 Dictionary<int,Point>.ContainsKey 等泛型路径的入口。\n- Equals(object)：覆盖 object 的虚方法，供 ArrayList、非泛型集合等调用，转发到类型安全版避免重复逻辑。\n- GetHashCode：保证 Equals 相等的 Point 返回相同哈希，字典才能正确定位桶。HashCode.Combine 是标准做法。\n- == / !=：让 == 语义与 Equals 一致（值比较），否则 == 默认对值类型用反射比较，慢且行为不直观。\n\nreadonly struct 确保不可变，哈希码在生命周期内不变（可变类型的哈希会因字段变化而失效，字典查找出错）。`,
    tags: ["完整实现", "值类型", "IEquatable", "HashCode.Combine", "综合"],
  },
];
