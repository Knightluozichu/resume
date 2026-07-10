import type { ReviewQuestion } from "./types";

/** CLR via C# · 反射与特性复习题 */
export const cvcReflectionAttributesQuestions: ReviewQuestion[] = [
  {
    id: "cvc-reflection-attributes-1",
    chapter: "cvc-reflection-attributes",
    level: 1,
    question: `什么是反射？Type 对象在反射中扮演什么角色？`,
    answer:
      `反射是 CLR 在运行时查询和操作类型元数据的能力——包括查询类型的方法、字段、属性、特性，动态创建对象，动态调用方法，动态设置属性。\n\nType 对象是反射的入口。每个加载的类型在 CLR 中有一个唯一的 Type 对象，包含了该类型的所有元数据信息。\n\n获取 Type 对象的方式：\n- \`typeof(T)\` — 编译期获取，T 是已知类型\n- \`obj.GetType()\` — 运行时获取，返回对象的实际类型\n- \`Type.GetType(\"Namespace.ClassName\")\` — 按名称获取\n\n从 Type 对象可以查询：\n- \`GetMethods()\` → MethodInfo[]：所有方法\n- \`GetFields()\` → FieldInfo[]：所有字段\n- \`GetProperties()\` → PropertyInfo[]：所有属性\n- \`GetCustomAttributes(attrType)\` → Attribute[]：特性\n- \`BaseType\` → Type：基类\n- \`GetInterfaces()\` → Type[]：实现的接口\n\nType 对象是 CLR 在加载程序集时从元数据构建的，所有同类型的 Type 引用指向同一个实例。`,
    tags: ["反射", "Type对象", "元数据", "typeof"],
  },
  {
    id: "cvc-reflection-attributes-2",
    chapter: "cvc-reflection-attributes",
    level: 2,
    question: `自定义特性如何工作？特性本身能改变代码行为吗？`,
    answer:
      `自定义特性的工作流程：\n\n1. **定义**：继承 System.Attribute\n\`\`\`csharp\n[AttributeUsage(AttributeTargets.Property)]\npublic class JsonFieldAttribute : Attribute\n{\n    public string Name { get; }\n    public JsonFieldAttribute(string name) { Name = name; }\n}\n\`\`\`\n\n2. **应用**：用 [AttributeName(参数)] 标注在代码元素上\n\`\`\`csharp\nclass User\n{\n    [JsonField(\"user_id\")]\n    public int Id { get; set; }\n}\n\`\`\`\n\n3. **编译**：编译器将特性信息写入程序集的元数据表中\n\n4. **运行时读取**：通过反射读取\n\`\`\`csharp\nvar attr = prop.GetCustomAttribute<JsonFieldAttribute>();\nstring jsonName = attr?.Name ?? prop.Name;\n\`\`\`\n\n特性本身**不能**改变代码行为。特性只是写入元数据的标注——它不执行任何代码。改变行为的是读取特性的反射代码。\n\n例如：\n- \`[Serializable]\` 不会让对象自动可序列化——是 BinaryFormatter 检查这个特性并决定是否序列化\n- \`[Obsolete]\` 不会让方法失效——是编译器读取特性并产生警告\n- \`[JsonField(\"name\")]\` 不会自动改 JSON 字段名——是 JsonSerializer 读取特性并据此序列化\n\n如果你定义了自定义特性但没人用反射读取它，它完全不起作用——只是占用元数据空间。`,
    tags: ["自定义特性", "Attribute", "元数据", "反射"],
  },
  {
    id: "cvc-reflection-attributes-3",
    chapter: "cvc-reflection-attributes",
    level: 3,
    question: `反射的性能问题有多严重？给出三种优化策略并说明原理。`,
    answer:
      `反射性能问题：\n反射比直接调用慢 100-1000 倍。原因：\n1. 每次 method.Invoke() 都做参数类型检查和安全检查\n2. 参数需要装箱（object[] 传参）\n3. 方法查找（GetMethod）需要搜索元数据表\n4. 无法被 JIT 内联优化\n\n三种优化策略：\n\n1. **缓存反射对象**：\n   GetMethod/GetProperty 每次搜索元数据，开销大。缓存 MethodInfo 避免重复查找。\n   \`\`\`csharp\n   // 坏：每次调用都查找\n   typeof(T).GetMethod(\"Process\").Invoke(obj, null);\n   // 好：静态缓存\n   static readonly MethodInfo s_method = typeof(T).GetMethod(\"Process\");\n   s_method.Invoke(obj, null);\n   \`\`\`\n\n2. **委托化（Delegate.CreateDelegate）**：\n   将 MethodInfo 编译为委托，后续直接调用委托——接近直接调用速度。\n   \`\`\`csharp\n   var method = typeof(T).GetMethod(\"Process\");\n   var del = (Func<T, string>)Delegate.CreateDelegate(\n       typeof(Func<T, string>), method);\n   string result = del(obj);  // 无反射开销\n   \`\`\`\n   原理：委托是强类型的函数指针，CLR 直接跳转到方法地址，无需类型检查和装箱。\n\n3. **表达式树编译**：\n   用 Expression 构建动态代码并编译为委托。比 Delegate.CreateDelegate 更灵活。\n   \`\`\`csharp\n   var param = Expression.Parameter(typeof(T));\n   var call = Expression.Call(param, method);\n   var lambda = Expression.Lambda<Func<T, string>>(call, param).Compile();\n   string result = lambda(obj);\n   \`\`\`\n   原理：表达式树编译生成 IL，JIT 优化后接近手写代码性能。\n\n4. **源生成器（.NET 6+）**：\n   在编译期生成代码，完全避免运行时反射。System.Text.Json 的源生成器模式在编译期生成序列化代码——零运行时反射开销。\n\n性能对比（调用方法 100 万次）：\n- 直接调用：~1ms\n- 委托/表达式树：~5ms\n- 反射 Invoke（缓存 MethodInfo）：~200ms\n- 反射 Invoke（无缓存）：~500ms`,
    tags: ["反射性能", "缓存", "委托", "表达式树", "源生成器"],
  },
  {
    id: "cvc-reflection-attributes-4",
    chapter: "cvc-reflection-attributes",
    level: 4,
    question: `设计一个简单的依赖注入容器，使用反射实现构造函数注入。说明核心实现步骤和反射优化策略。`,
    answer:
      `简单 DI 容器实现：\n\n\`\`\`csharp\npublic class SimpleContainer\n{\n    private readonly Dictionary<Type, Func<object>> _factories = new();\n    private readonly Dictionary<Type, ConstructorInfo> _constructors = new();\n\n    // 注册服务\n    public void Register<TInterface, TImplementation>()\n        where TImplementation : TInterface\n    {\n        var type = typeof(TImplementation);\n        // 找到构造函数（选参数最多的）\n        var ctor = type.GetConstructors()\n            .OrderByDescending(c => c.GetParameters().Length)\n            .First();\n        _constructors[type] = ctor;\n        _factories[typeof(TInterface)] = () => ResolveInternal(typeof(TImplementation));\n    }\n\n    // 解析服务\n    public T Resolve<T>() => (T)ResolveInternal(typeof(T));\n\n    private object ResolveInternal(Type type)\n    {\n        if (_factories.TryGetValue(type, out var factory))\n            return factory();\n\n        if (!_constructors.TryGetValue(type, out var ctor))\n        {\n            ctor = type.GetConstructors()\n                .OrderByDescending(c => c.GetParameters().Length)\n                .First();\n            _constructors[type] = ctor;  // 缓存\n        }\n\n        // 递归解析构造函数参数\n        var parameters = ctor.GetParameters();\n        var args = new object[parameters.Length];\n        for (int i = 0; i < parameters.Length; i++)\n        {\n            args[i] = ResolveInternal(parameters[i].ParameterType);\n        }\n\n        // 动态创建实例\n        return Activator.CreateInstance(type, args);\n    }\n}\n\`\`\`\n\n核心步骤：\n1. **注册**：记录接口到实现的映射，缓存构造函数信息\n2. **解析**：递归解析依赖——先解析构造函数参数的类型，再创建实例\n3. **创建**：Activator.CreateInstance 调用构造函数\n\n反射优化策略：\n\n1. **缓存 ConstructorInfo**：避免每次 Resolve 都调用 GetConstructors()\n\n2. **委托化创建**：将 ConstructorInfo 转为 Func<object[]> 委托\n\`\`\`csharp\n// 用表达式树编译构造函数调用\nvar paramExpr = Expression.Parameter(typeof(object[]), \"args\");\nvar paramCast = ctor.GetParameters()\n    .Select((p, i) => Expression.Convert(\n        Expression.ArrayIndex(paramExpr, Expression.Constant(i)),\n        p.ParameterType))\n    .ToArray();\nvar newExpr = Expression.New(ctor, paramCast);\nvar lambda = Expression.Lambda<Func<object[], object>>(\n    Expression.Convert(newExpr, typeof(object)), paramExpr).Compile();\n// 缓存 lambda，后续直接调用\nvar instance = lambda(args);\n\`\`\`\n\n3. **单例缓存**：注册为 Singleton 的服务只创建一次，避免重复反射\n\n4. **源生成器**：.NET 的 Microsoft.Extensions.DependencyInjection 在编译期生成解析代码——零运行时反射\n\n总结：简单 DI 容器用反射实现核心逻辑（查找构造函数、解析参数、创建实例）。生产级 DI 容器用缓存+表达式树+源生成器优化性能。`,
    tags: ["DI容器", "反射", "Activator", "构造函数注入", "表达式树"],
  },
];
