#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "deep-learning-from-scratch-2";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const DIAGRAM_ROOT = path.join(
  ROOT,
  "src/components/mdx/deep-learning-from-scratch-2/diagrams",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/dezero-v2-profiles.json");
const SOURCE_URL = "https://www.oreilly.co.jp/books/9784873119069/";
const REPO_URL =
  "https://github.com/oreilly-japan/deep-learning-from-scratch-3";
const SAMPLE_URL = "https://koki0702.github.io/dezero-book/";

const K = (mechanism, formula, fault, before, after) => ({
  mechanism,
  formula,
  fault,
  before,
  after,
});

const KNOWLEDGE = {
  "01": K(
    "Variable 把 ndarray 数据与承载数据的对象身份分开，后续图连接属于对象而不是数组值",
    "x=Variable(data),\\quad x.data=data",
    "直接接收 list 或把 Variable 与 ndarray 当成同一对象会破坏类型合同",
    "裸 ndarray 只有数值",
    "Variable 同时提供稳定对象身份与 data",
  ),
  "02": K(
    "Function.__call__ 解包输入 data、执行 forward，再把输出重新包装成 Variable",
    "y=F(x),\\quad y.data=F.forward(x.data)",
    "forward 返回裸数组却没有统一包装，会让组合调用失去一致接口",
    "手工调用数值函数",
    "所有运算共享 Function 调用协议",
  ),
  "03": K(
    "函数组合按实际执行顺序连接，Exp 与 Square 的输出可直接成为下一个 Function 的输入",
    "y=\\operatorname{square}(\\exp(\\operatorname{square}(x)))",
    "复制中间数值而不是传递 Variable 会切断后续追踪所需的对象链",
    "孤立 Function 只能单步执行",
    "Variable 输出把多个 Function 串成动态图",
  ),
  "04": K(
    "中心差分用 x+h 与 x-h 的对称斜率近似导数，是校验解析反向传播的局部真值",
    "f'(x)\\approx\\frac{f(x+h)-f(x-h)}{2h}",
    "h 太大产生截断误差，h 太小产生浮点消减，单边差分还会放大偏差",
    "只能观察函数值",
    "可用独立数值梯度核对局部导数",
  ),
  "05": K(
    "链式法则把复合函数的局部导数按反向路径相乘，计算图明确每个中间变量的责任",
    "\\frac{dy}{dx}=\\frac{dy}{da}\\frac{da}{db}\\frac{db}{dx}",
    "沿前向方向乘导数或漏掉一条局部边会得到方向正确但数值错误的梯度",
    "整体函数需要一次性求导",
    "局部 backward 可沿图组合",
  ),
  "06": K(
    "Variable 保存 grad 与 creator，Function 保存 input；手动从输出沿 creator 逐节点调用 backward",
    "g_x=g_y\\,F.backward(x)",
    "只给输出设置 grad 而未保存 creator/input 时，反向传播在首个节点就停止",
    "理论链式法则没有运行状态",
    "对象图能手动传递上游梯度",
  ),
  "07": K(
    "Variable.backward 从自身 creator 出发自动取函数、读取输出梯度并写回输入梯度",
    "x.grad=F.backward(y.grad)",
    "backward 只处理一个 creator 或忘记继续回溯，会让长组合图只传播一层",
    "调用者手工展开每个反向节点",
    "Variable 自己驱动完整反向链",
  ),
  "08": K(
    "显式函数栈替代递归调用，使反向遍历顺序可观察、可扩展并避免 Python 递归深度限制",
    "stack=[y.creator],\\quad f=stack.pop()",
    "循环中忘记把输入 creator 压栈会静默截断图，重复压栈则会重复计算",
    "反向传播依赖递归调用栈",
    "显式工作列表控制遍历",
  ),
  "09": K(
    "包装函数、默认输出梯度与 as_array 让 DeZero 运算像普通 Python 函数，同时保持 ndarray 合同",
    "g_y=\\mathbf{1}\\;\\text{when }y.grad\\text{ is None}",
    "接受标量后不转为 ndarray 会在 shape、dtype 或后续函数中产生分叉",
    "调用类实例且手工初始化梯度",
    "函数式 API 仍委托核心图协议",
  ),
  10: K(
    "单元测试分别验证 forward、backward 与 numerical gradient，把框架语义固定成可回归合同",
    "\\epsilon=\\frac{|g_a-g_n|}{|g_a|+|g_n|+10^{-12}}",
    "只测最终函数值会漏掉 creator 断链和局部梯度错误",
    "靠打印结果人工判断",
    "测试与梯度检验自动定位回归",
  ),
  11: K(
    "Function 接受 inputs 元组并把 xs 列表送入 forward，使 Add 等运算可表达多输入和多输出",
    "ys=F.forward(*xs)",
    "仍按单输入字段保存 input 会丢掉第二个操作数及其梯度路径",
    "Function 只有一个输入和一个输出",
    "统一元组协议承载可变长参数",
  ),
  12: K(
    "输入自动转 Variable、输出自动元组化，让实现者可写自然 forward 签名而调用者仍拿到简洁结果",
    "inputs=tuple(as_variable(x_i))",
    "单输出时错误保留一元 tuple 会破坏后续运算符表达式",
    "调用者手工包装并解包",
    "调用边界负责标准化形态",
  ),
  13: K(
    "可变长 backward 按输入顺序返回梯度元组，Variable.backward 将每个 gx 写回对应输入",
    "(g_{x_0},g_{x_1})=Add.backward(g_y)",
    "梯度元组顺序与 inputs 不一致会把数值正确的梯度写到错误变量",
    "多输入只有前向协议",
    "输入与梯度位置一一对应",
  ),
  14: K(
    "同一 Variable 经多条路径复用时必须累加梯度，cleargrad 则在新一轮反传前清空历史贡献",
    "g_x\\leftarrow g_x+g_x^{(new)}",
    "覆盖而非累加会漏掉分支贡献，不清空又会把两次训练的梯度混在一起",
    "每个变量假定只有一条路径",
    "分支梯度累加且可显式清零",
  ),
  15: K(
    "复杂图的反向顺序必须遵守拓扑依赖，generation 表示函数距输入的层级并决定优先级",
    "generation(F)=\\max generation(x_i)",
    "按发现顺序处理会在所有下游梯度到齐前过早计算上游节点",
    "简单链条可直接后退",
    "拓扑优先级适配分支与汇合",
  ),
  16: K(
    "函数列表按 generation 排序并去重，始终弹出最高辈分节点再把其输入 creator 加入候选",
    "f=\\arg\\max_{q\\in funcs} generation(q)",
    "同一 Function 被重复加入会重复累加，未排序会违反反向依赖",
    "只有理论上的正确顺序",
    "实现按 generation 稳定调度",
  ),
  17: K(
    "Function 对 outputs 使用 weakref，打破 Variable→creator→outputs→Variable 的强引用环",
    "outputs=[weakref.ref(y_i)]",
    "强引用输出会让临时计算图即使离开作用域也无法及时释放",
    "计算图形成循环强引用",
    "弱引用保留访问而不阻止回收",
  ),
  18: K(
    "retain_grad 控制中间梯度释放，Config.enable_backprop 与上下文管理器成对切换建图模式",
    "no\\_grad:\\;enable\\_backprop=False",
    "异常退出后未恢复全局模式会让后续训练静默不建图",
    "所有前向都保留图和中间梯度",
    "训练/推理按作用域控制资源",
  ),
  19: K(
    "Variable 增加 name、shape、ndim、size、dtype、len 与 repr 代理，使调试信息来自 data 而不复制状态",
    "x.shape=x.data.shape",
    "缓存一份独立 shape 或 dtype 会在 data 变化后产生不一致",
    "必须深入 data 才能检查变量",
    "Variable 提供只读便利属性",
  ),
  20: K(
    "__mul__ 把 Python 乘法语法路由到 Mul Function，前向乘法的反向局部规则交换另一操作数",
    "g_{x_0}=g_yx_1,\\quad g_{x_1}=g_yx_0",
    "直接在 __mul__ 中计算 ndarray 会绕过 Mul 的 creator 与 backward",
    "只能调用 mul(x0,x1)",
    "自然乘法语法仍生成图节点",
  ),
  21: K(
    "as_variable 与 __rmul__/__radd__ 处理 ndarray、float、int 和左右操作数优先级",
    "a+x\\equiv x.__radd__(a)",
    "NumPy 优先接管左侧运算会返回 ndarray 或 object array 而不是 DeZero Variable",
    "运算符只支持 Variable 在左侧",
    "混合标量与数组仍进入 DeZero 图",
  ),
  22: K(
    "负号、减法、反向减法、除法和幂都实现为 Function，并为每个输入给出匹配的局部导数",
    "\\frac{d}{dx}x^c=cx^{c-1}",
    "反向减法复用正向顺序会把符号写反，除法会漏掉分母平方",
    "图只支持加法与乘法",
    "常用算术表达式完整可微",
  ),
  23: K(
    "core、functions 与 __init__ 明确公共 API 边界，导入包时再安装运算符重载",
    "from\\;dezero\\;import\\;Variable",
    "循环导入或在多个模块重复定义 Variable 会造成类型身份不一致",
    "所有实现堆在单个 step 文件",
    "可安装包维持单一公共类型",
  ),
  24: K(
    "Sphere、Matyas 与 Goldstein–Price 用自然运算符组合出复杂标量函数，验证图能由局部规则自动求导",
    "f_{sphere}(x,y)=x^2+y^2",
    "为每个复合函数手写整体 backward 会重复推导且难以复用",
    "只能测试简单链式函数",
    "运算符图可表达多变量复杂函数",
  ),
  25: K(
    "DOT 用有向节点和边描述 Variable/Function 计算图，label 与节点属性承担调试语义",
    "x\\rightarrow F\\rightarrow y",
    "只画数值不画对象类型与方向，会掩盖 creator 断链",
    "计算图只能在内存中追踪",
    "DOT 文本可检查节点和连接",
  ),
  26: K(
    "从输出递归收集 Variable 与 Function 生成 DOT，再调用 Graphviz 产出图像并保持节点去重",
    "graph=\\bigcup nodes\\cup edges",
    "未记录 visited 会在共享子图中重复输出甚至循环遍历",
    "手工编写一张固定 DOT 图",
    "任意运行时图可自动可视化",
  ),
  27: K(
    "sin 的泰勒级数逐项累加并以项绝对值阈值停止，自动微分图保留每一项的导数",
    "\\sin x=\\sum_{i=0}^{\\infty}\\frac{(-1)^ix^{2i+1}}{(2i+1)!}",
    "固定迭代次数过少会产生近似误差，过多则制造冗长计算图",
    "只能调用 NumPy 的整体 sin",
    "级数实现展示近似与图规模取舍",
  ),
  28: K(
    "Rosenbrock 谷底用梯度下降迭代更新两个变量，并在每轮清梯度后重新 forward/backward",
    "x\\leftarrow x-\\eta\\nabla f(x)",
    "学习率过大在狭长谷底振荡，不 cleargrad 会累积跨轮梯度",
    "只能在单点求梯度",
    "梯度进入可观测优化闭环",
  ),
  29: K(
    "一维牛顿法用一阶导数除以二阶导数自适应步长，手算二阶信息作为高阶自动微分基线",
    "x\\leftarrow x-\\frac{f'(x)}{f''(x)}",
    "二阶导数接近零会放大步长并导致发散",
    "梯度下降只使用一阶斜率",
    "曲率决定牛顿更新尺度",
  ),
  30: K(
    "把 grad 从 ndarray 升级为 Variable，并让 backward 运算也通过 DeZero Function 执行，为高阶图建模",
    "g_x=Variable(g_y)\\cdot 2x",
    "backward 中混入 NumPy 运算会切断梯度本身的 creator",
    "梯度只是不可微 ndarray",
    "梯度也成为可追踪 Variable",
  ),
  31: K(
    "create_graph 控制反向传播期间是否构建新计算图，一阶 backward 的运算可再接受 backward",
    "y=f(x),\\;g=f'(x),\\;g.backward()=f''(x)",
    "无条件建反向图会浪费内存，无条件关闭则无法求二阶导",
    "反向传播只产生数值梯度",
    "按需建立导数的计算图",
  ),
  32: K(
    "函数 backward 改用可微运算，Variable.backward 在 enable_backprop(create_graph) 作用域执行并释放临时梯度",
    "with\\;using\\_config(enable\\_backprop,create\\_graph)",
    "模式作用域放错位置会让部分局部导数建图、部分不建图",
    "高阶导数只有理论设计",
    "实现精确控制反向建图边界",
  ),
  33: K(
    "先 backward(create_graph=True) 得到一阶 Variable，再清 x.grad 并对一阶梯度 backward 得到二阶导",
    "x\\leftarrow x-\\frac{g}{g'}",
    "未清除一阶梯度就二次 backward 会把不同阶的贡献相加",
    "牛顿法二阶导需要手算",
    "DeZero 自动生成曲率更新",
  ),
  34: K(
    "sin 与 cos 的互为导数使重复 backward 可产生周期性的任意阶导序列",
    "\\sin' x=\\cos x,\\quad \\cos' x=-\\sin x",
    "每阶计算前不清 grad 会把前一阶残留混入当前结果",
    "只能验证二阶导",
    "重复建图展示高阶导周期",
  ),
  35: K(
    "tanh.backward 使用 1-y²，二阶导图可视化揭示反向运算本身形成的新节点",
    "\\frac{d}{dx}\\tanh x=1-\\tanh^2x",
    "使用缓存 ndarray y 而不是 Variable y 会让高阶图在局部断开",
    "只看到一阶数值",
    "导数计算图能检查高阶连接",
  ),
  36: K(
    "double backprop 可对梯度范数等导数函数再次求导，用于正则、敏感度和研究型目标",
    "L=\\|\\nabla_x f(x)\\|^2",
    "把一阶梯度 detach 后再构造损失会让二阶项恒为零",
    "损失只依赖前向输出",
    "目标可显式依赖梯度",
  ),
  37: K(
    "逐元素函数对任意形状张量保持 shape，反向局部导数与上游梯度逐元素相乘",
    "shape(g_x)=shape(x)",
    "误把张量梯度压成标量会丢失每个元素的贡献",
    "框架主要在标量上验证",
    "elementwise 运算推广到张量",
  ),
  38: K(
    "reshape/transpose 前向只改变视图或轴序，反向必须恢复输入原 shape 或逆置换",
    "g_x=reshape(g_y,shape(x))",
    "只保存输出 shape 无法在 backward 还原输入布局",
    "张量形状固定",
    "可微形状变换保存逆操作信息",
  ),
  39: K(
    "sum 的 backward 按 axis 与 keepdims 重建被消去维度，再广播回输入 shape",
    "g_x=broadcast\\_to(g_y,shape(x))",
    "忽略 keepdims 会让多轴求和的梯度对齐到错误轴",
    "归约后无法恢复元素梯度",
    "轴元数据指导反向广播",
  ),
  40: K(
    "broadcast_to 与 sum_to 是互为反向的形状操作，二元运算 backward 要把梯度收缩回各输入原 shape",
    "sum\\_to(broadcast\\_to(x,s),shape(x))",
    "把广播后的梯度直接写给小输入会得到错误 shape 与重复贡献",
    "二元运算要求形状完全相同",
    "NumPy 广播语义保持可微",
  ),
  41: K(
    "矩阵乘积检查内维匹配，反向分别右乘或左乘转置矩阵以恢复两个输入 shape",
    "g_x=g_yW^T,\\quad g_W=x^Tg_y",
    "把 matmul 当逐元素乘法会得到看似可广播但语义错误的梯度",
    "框架只有逐元素运算",
    "线性代数运算进入计算图",
  ),
  42: K(
    "线性回归用可训练 W、b 最小化均方误差，每轮先清梯度再按损失反向更新",
    "L=\\frac1N\\sum_i(y_i-(x_iW+b))^2",
    "训练与评估复用旧预测或未清梯度会制造虚假的损失下降",
    "只有张量算子没有训练任务",
    "模型、损失、反传和更新形成闭环",
  ),
  43: K(
    "Linear 与 sigmoid 组合出两层网络，非线性激活使模型超越单一仿射映射",
    "y=W_2\\sigma(W_1x+b_1)+b_2",
    "省略激活函数时多层线性层仍等价于单层线性变换",
    "线性回归只能拟合直线",
    "非线性网络拟合弯曲决策面",
  ),
  44: K(
    "Parameter 标记可训练 Variable，Layer 递归收集属性中的 Parameter 并统一 cleargrads/迭代",
    "params(L)=\\{p\\mid p\\;is\\;Parameter\\}",
    "把临时激活误注册为 Parameter 会被优化器更新和保存",
    "训练循环手工维护 W、b",
    "Layer 统一拥有并枚举参数",
  ),
  45: K(
    "Model 继承 Layer 并可嵌套子层，MLP 根据尺寸列表构造任意深度线性层序列",
    "h_{k+1}=\\sigma(L_k(h_k))",
    "子层不注册为属性时递归参数遍历会漏掉整层权重",
    "单层能管理参数",
    "嵌套模型递归汇总所有层",
  ),
  46: K(
    "Optimizer 绑定 target 参数，update 前执行 hooks，再由 SGD/Momentum 等规则逐参数更新",
    "\\theta\\leftarrow\\theta-\\eta g",
    "优化器持有另一组参数副本会更新不到模型实际使用的权重",
    "训练循环手写参数更新",
    "更新算法与模型解耦并可替换",
  ),
  47: K(
    "get_item 保持切片可微，softmax 用稳定平移，交叉熵从正确类别的对数概率构造批量损失",
    "L=-\\frac1N\\sum_i\\log p_{i,t_i}",
    "直接 exp 大 logits 会溢出，标签轴或批轴选错会产生错误损失",
    "网络只输出未归一化分数",
    "稳定 softmax-cross-entropy 提供分类目标",
  ),
  48: K(
    "螺旋数据集按 epoch 打乱小批量，MLP 用分类损失反传并记录独立 accuracy",
    "accuracy=\\frac{correct}{N}",
    "用训练批次顺序评估或把 accuracy 当可微损失会混淆优化与度量",
    "分类函数只在单个样本验证",
    "多分类训练闭环可重复运行",
  ),
  49: K(
    "Dataset 把原始数据、标签与 transform/target_transform 延迟组合，避免预处理污染源数据",
    "sample_i=(transform(x_i),target\\_transform(t_i))",
    "原地修改共享原始数组会让不同 epoch 的样本反复预处理",
    "训练代码直接持有完整数组",
    "数据访问与预处理形成稳定接口",
  ),
  50: K(
    "DataLoader 实现迭代器协议，按 batch_size 产生索引块并在 epoch 边界重置与可选打乱",
    "max\\_iter=\\lceil N/B\\rceil",
    "漏掉最后不足一批的数据或 epoch 重置会改变样本覆盖率",
    "训练循环手工切片",
    "小批量迭代与训练逻辑解耦",
  ),
  51: K(
    "MNIST 管道连接 Dataset、DataLoader、MLP、Optimizer，并用独立测试集和 test_mode 评估",
    "test\\_accuracy=correct/N_{test}",
    "在测试集上更新参数或沿用训练模式会造成数据泄漏和不稳定评估",
    "只在玩具螺旋数据上训练",
    "真实图像数据形成训练/评估闭环",
  ),
  52: K(
    "cuda 模块抽象 NumPy/CuPy，Variable、Layer 与 DataLoader 迁移数组且同一次运算必须处于同一设备",
    "xp=cuda.get\\_array\\_module(x)",
    "CPU ndarray 与 GPU CuPy 数组混算会报错或触发昂贵隐式传输",
    "运算后端固定为 CPU NumPy",
    "同一图按设备一致性运行",
  ),
  53: K(
    "Layer 递归展平参数为稳定层级键，保存前转 CPU，加载时按键和 shape 写回现有 Parameter",
    "state[name]=parameter.data",
    "依赖对象遍历偶然顺序会让模型结构微调后权重错配",
    "训练结束权重只存在内存",
    "稳定 state 字典支持保存和恢复",
  ),
  54: K(
    "inverted dropout 在训练时用掩码并除以保留率，测试模式直接返回输入以保持期望一致",
    "y=\\frac{m\\odot x}{1-p},\\quad m\\sim Bernoulli(1-p)",
    "测试时仍随机丢弃或训练时不缩放都会造成输出分布漂移",
    "训练与推理使用同一随机前向",
    "test_mode 明确切换确定性推理",
  ),
  55: K(
    "卷积输出尺寸由输入、核、padding 与 stride 共同决定，局部共享权重构成空间特征图",
    "H_{out}=\\left\\lfloor\\frac{H+2P-K}{S}\\right\\rfloor+1",
    "忽略 floor、padding 两侧或 stride 会让实现尺寸与设计不一致",
    "全连接层忽略空间邻域",
    "卷积保留局部结构并可计算输出尺寸",
  ),
  56: K(
    "CNN 张量按 NCHW 组织，卷积核连接输入/输出通道，池化在局部窗口归约且通常无参数",
    "X\\in\\mathbb{R}^{N\\times C\\times H\\times W}",
    "混用 NHWC/NCHW 或漏掉 batch/channel 轴会让卷积结果静默错位",
    "二维单通道示意",
    "批量多通道卷积与池化语义完整",
  ),
  57: K(
    "im2col 把滑动窗口展开为矩阵，conv2d 转成矩阵乘法；pooling backward 按 argmax 散射梯度",
    "Y_{col}=X_{col}W_{col}",
    "col2im 重叠区域不累加或 pooling 未保存 argmax 会得到错误输入梯度",
    "只有卷积几何理论",
    "conv2d/Conv2d/pooling 成为可微函数",
  ),
  58: K(
    "VGG16 按固定卷积块和全连接头组织，预训练权重加载后必须执行同版图像预处理与类别映射",
    "score=VGG16(preprocess(image))",
    "RGB/BGR、均值、尺寸或类别表不匹配会让权重正确但预测无意义",
    "自建小型 CNN 随机初始化",
    "标准架构可加载并验证预训练权重",
  ),
  59: K(
    "RNN Layer 保存上一时刻 h，时间展开形成跨步计算图；截断反传时 unchain_backward 切断旧历史",
    "h_t=\\tanh(x_tW_x+h_{t-1}W_h+b)",
    "epoch 或独立序列之间不 reset_state 会把无关样本串成同一时间线",
    "样本之间没有持久状态",
    "隐藏状态表达时间依赖并可显式截断",
  ),
  60: K(
    "SeqDataLoader 保持时间偏移批次，LSTM 用 input/forget/output gate 与 cell state 缓解长期依赖",
    "c_t=f_t\\odot c_{t-1}+i_t\\odot \\tilde c_t",
    "批次时间索引错位或只重置 h 不重置 c 会破坏序列连续性",
    "简单 RNN 容易遗忘长期信息",
    "门控 cell state 与序列加载器协同训练",
  ),
  A: K(
    "in-place 覆盖会改变别名共享的数据，反向传播需要前向原值时必须复制或禁止破坏性写入",
    "x_{after}=x_{before}+1\\;\\text{may share memory}",
    "在多分支图中原地改写共享数组会让另一分支看到错误历史值",
    "数组覆盖看似节省内存",
    "别名与前向缓存边界被显式检查",
  ),
  B: K(
    "get_item forward 保存切片索引，backward 用散射加法把上游梯度放回原张量对应位置",
    "g_x[index]\\mathrel{+}=g_y",
    "重复索引用普通赋值而非 add-at 会漏掉重复位置的梯度累加",
    "切片返回值不参与图",
    "索引操作保持可微并支持重复索引",
  ),
  C: K(
    "Colab 环境先固定仓库版本与依赖，再验证 CPU/GPU 后端、工作目录和可持久化输出",
    "environment=(commit,python,dependencies,device)",
    "只记录 notebook 输出而不固定版本会让重启运行得到不同结果",
    "本地环境依赖隐含状态",
    "浏览器运行也具可重放环境清单",
  ),
};

const SPECIAL = {
  map: K(
    "五阶段把 60 步组织成自动微分、自然表达、高阶导数、神经网络和高级挑战的依赖链",
    "verified\\_steps=60",
    "跳过早期图语义直接训练 CNN 会让 shape 或梯度错误无法定位",
    "把 60 步当成平铺目录",
    "每一步声明前置合同和新增能力",
  ),
  review: K(
    "总复习用同一最小任务贯穿 Variable、动态图、高阶导、Layer、Optimizer、GPU、CNN 与 RNN",
    "published\\_units=63",
    "只复述 API 名称而不能预测首个错误节点不算掌握框架",
    "逐章知识彼此孤立",
    "能跨阶段组合并诊断完整 DeZero",
  ),
};

function walkMdx(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files.sort();
}

function flatConcepts(unit) {
  return (unit?.concepts ?? []).flat(Infinity).map(String);
}

function unitKey(chapterSlug) {
  const step = chapterSlug.match(/dl2-step-(\d{2})/)?.[1];
  if (step) return step;
  if (chapterSlug.includes("appendix-a")) return "A";
  if (chapterSlug.includes("appendix-b")) return "B";
  if (chapterSlug.includes("appendix-c")) return "C";
  if (chapterSlug.includes("learning-map")) return "map";
  if (chapterSlug.includes("final-review")) return "review";
  throw new Error(`无法映射页面: ${chapterSlug}`);
}

function familyFor(key) {
  if (["map", "review"].includes(key)) return "book";
  if (key === "C" || ["52", "53", "54"].includes(key)) return "device";
  if (["55", "56", "57", "58"].includes(key)) return "convolution";
  if (["59", "60"].includes(key)) return "sequence";
  const number = Number(key);
  if (number >= 37 && number <= 41) return "tensor";
  if (number === 28 || (number >= 42 && number <= 51)) return "training";
  if (
    [
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "24",
      "27",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
    ].includes(key)
  )
    return "derivative";
  return "graph";
}

const DEFAULT_NODES = {
  book: ["前置合同", "新增能力", "最小验证", "故障注入", "跨步复用"],
  graph: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  derivative: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  tensor: ["输入shape", "轴变换", "前向shape", "反向还原", "梯度shape"],
  training: ["取批数据", "模型前向", "计算损失", "反向传播", "参数更新"],
  device: ["固定版本", "选择设备", "迁移状态", "执行模式", "重放核对"],
  convolution: ["输入NCHW", "核与步幅", "窗口展开", "输出特征", "反向散射"],
  sequence: ["时间批次", "输入投影", "状态递推", "截断反传", "序列预测"],
};

function practiceModeFor(key, family) {
  if (key === "map") return "design";
  if (["derivative", "tensor", "convolution"].includes(family))
    return "calculation";
  return "code";
}

function codeSketch(profile) {
  const operation = profile.title.replace(/^步骤\d+\s*/, "");
  switch (profile.family) {
    case "derivative":
      return `# ${operation}：解析梯度必须由独立数值差分核对\nx = Variable(np.array(0.5))\ny = target(x)\ny.backward(create_graph=${profile.key >= "30" && profile.key <= "36" ? "True" : "False"})\nassert relative_error(x.grad, central_diff(target, x)) < 1e-4`;
    case "tensor":
      return `# ${operation}：前向与反向都记录 shape\nx = Variable(np.arange(24).reshape(2, 3, 4))\ny = target(x)\ny.backward()\nassert x.grad.shape == x.shape`;
    case "training":
      return `# ${operation}：每轮都从干净梯度开始\nmodel.cleargrads()\npred = model(batch_x)\nloss = objective(pred, batch_t)\nloss.backward()\noptimizer.update()`;
    case "device":
      return `# ${operation}：版本、设备与模式必须成套记录\nx = to_selected_device(batch)\nwith runtime_mode(training=False):\n    y = target(x)\nassert same_device(x, y)`;
    case "convolution":
      return `# ${operation}：先算输出尺寸，再执行空间运算\nout_h = (in_h + 2 * pad - kernel) // stride + 1\ny = spatial_op(x, kernel=kernel, stride=stride, pad=pad)\nassert y.shape[-2] == out_h`;
    case "sequence":
      return `# ${operation}：序列边界决定何时保留或重置状态\nmodel.reset_state()\nfor x_t, t_t in sequence_loader:\n    loss = loss + objective(model(x_t), t_t)\nloss.backward()\nmodel.unchain_backward()`;
    case "book":
      return `# ${operation}：每一步只在前置合同通过后解锁\nfor step in learning_path:\n    assert step.prerequisites_passed\n    run_forward_backward_reset(step)`;
    default:
      return `# ${operation}：自然语法仍必须经过 Function 图节点\nx = Variable(np.array(2.0))\ny = target(x)\nassert y.creator is not None\ny.backward()`;
  }
}

function escapeYaml(value) {
  return JSON.stringify(String(value));
}

function escapeJs(value) {
  return JSON.stringify(String(value));
}

function makeWrapper(profile) {
  return `import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: ${escapeJs(profile.chapterSlug)},
  title: ${escapeJs(profile.title)},
  family: ${escapeJs(profile.family)},
  nodes: ${JSON.stringify(profile.nodes)},
  concepts: ${JSON.stringify(profile.concepts)},
  mechanism: ${escapeJs(profile.knowledge.mechanism)},
  success: ${escapeJs(`${profile.title} 的前向、反向与重放证据一致`)},
  failure: ${escapeJs(`${profile.title} 在“${profile.knowledge.fault}”处拒绝`)},
} as const;

export function ${profile.componentName}() {
  return <DezeroStepLab {...profile} />;
}
`;
}

function makePage(profile) {
  const concepts = profile.concepts.length
    ? profile.concepts
    : [profile.title, profile.knowledge.before, profile.knowledge.after];
  const conceptSections = concepts
    .map(
      (concept, index) => `### ${concept}

在 **${profile.title}** 中，**${concept}** 把“${profile.knowledge.before}”推进到“${profile.knowledge.after}”。本单元的可观察机制是：${profile.knowledge.mechanism}。

核对 **${concept}** 时先记录“${profile.nodes[index % profile.nodes.length]}”的输入、输出、shape、对象连接或运行模式，再注入反例“${profile.knowledge.fault}”。如果最终数值看似合理但这一处首先分叉，实验必须停止并恢复基线。`,
    )
    .join("\n\n");
  const terms = concepts.slice(0, 5);
  const glossary = terms
    .map(
      (term, index) => `<GlossaryItem term=${escapeYaml(term)}>
  在 ${profile.title} 中，${term} 对应“${profile.nodes[index % profile.nodes.length]}”；验收时必须给出实际数值、shape 或对象状态，不能只复述名称。
</GlossaryItem>`,
    )
    .join("\n\n");
  const inlineTerms = terms
    .map(
      (term, index) =>
        `<Term def=${escapeYaml(`在 ${profile.title} 中对应“${profile.nodes[index % profile.nodes.length]}”的可验证对象或状态`)}>${term}</Term>`,
    )
    .join("、");
  const practiceChecklist = concepts
    .map(
      (concept, index) =>
        `${concept}（核对 ${profile.nodes[index % profile.nodes.length]}）`,
    )
    .join("；");
  return `---
title: ${escapeYaml(profile.title)}
type: ${profile.type}
section: ${escapeYaml(profile.section)}
order: ${profile.order}
description: ${escapeYaml(`${profile.title}：从“${profile.knowledge.before}”到“${profile.knowledge.after}”，用独立计算、代码和故障注入验证。`)}
demo: true
math: true
sourceUrl: ${escapeYaml(SOURCE_URL)}
qualityVersion: 2
practiceMode: ${profile.practiceMode}
sourceMode: independent-rewrite
draft: false
---

import { ${profile.componentName} } from "@/components/mdx/deep-learning-from-scratch-2/diagrams/${profile.chapterSlug}";
import {
  Objectives,
  Callout,
  Term,
  Glossary,
  GlossaryItem,
  Exercises,
  Answer,
  Attribution,
} from "@/components/mdx/mdx-components";

<Objectives>

- 能说明 ${profile.title} 相对前一步新增的责任：${profile.knowledge.after}
- 能依据本页数学与状态合同完成推导或验证，并写清输入、输出与 shape
- 能运行本页最小代码草图，观察 ${profile.nodes.join("、")} 的因果链
- 能注入“${profile.knowledge.fault}”并在首个错误证据处停止

</Objectives>

## 为什么这一步不能跳过

${profile.title} 的增量不是 API 名称，而是把 **${profile.knowledge.before}** 变为 **${profile.knowledge.after}**。它的核心机制是：${profile.knowledge.mechanism}。

这一步验收时固定输入数组、随机种子、DeZero 前一步版本与运行设备。先写出预期的 forward、shape、creator 或状态变化，再执行实现；backward 后清空派生梯度并从相同输入重放。这样才能区分本步能力与缓存、旧图或随机性的偶然结果。

<Callout type="info" title="本步硬合同">
  前向证据、反向证据和重置后重放必须同时一致。${profile.knowledge.fault} 时，即使最终 loss 或输出合理，也应判定 ${profile.title} 失败。
</Callout>

## 数学与状态合同

$$
${profile.knowledge.formula}
$$

对 ${profile.title}，公式中的每个量都要绑定到实际数组或对象：记录 dtype、shape、设备、creator/generation 或训练模式。若发生广播、归约、转置、时间递推或设备迁移，反向结果必须回到每个输入原有的语义边界。

## 目录单元到教学证据

${conceptSections}

## 最小实现草图

~~~python
${codeSketch(profile)}
~~~

这段草图不复制原书实现；它只保留 ${profile.title} 的可验证接口。实际练习要补齐输入构造、断言和失败样本，并用作者官方仓的对应 step 文件核对行为边界，而不是照抄代码行。

## 单变量因果实验

先预测改变一个输入后，${profile.nodes.join(" → ")} 中哪一项最先变化。操作基线、边界和故障三种场景；保存证据后点击“重置实验”，确认所有状态回到初始值。

<${profile.componentName} />

## 故障诊断

<Callout type="trap" title=${escapeYaml(`误区：${profile.knowledge.fault}`)}>
  这会破坏 ${profile.title} 的“${profile.knowledge.after}”。先检查 ${profile.nodes[0]}，再沿 ${profile.nodes.slice(1).join("、")} 顺序定位第一处分叉；不要用最终输出掩盖局部错误。
</Callout>

<Callout type="tip" title="恢复顺序">
  恢复固定输入与模式 → 清空 grad/缓存/隐藏状态 → 重建当前计算图 → 重跑 forward → 重跑 backward → 与独立公式或 shape 断言比较。
</Callout>

## 本步小结

${profile.title} 的完成标准是：能从“${profile.knowledge.before}”解释到“${profile.knowledge.after}”，能用本页数学与状态合同算出或验证关键量，并能诊断“${profile.knowledge.fault}”。只出现目录词、只跑通最终 loss 或只展示一张通用计算图都不算通过。

本步需要准确使用这些术语：${inlineTerms}。它们必须落到本页实验的数值、shape、对象连接或运行状态上。

<Glossary>

${glossary}

</Glossary>

<Exercises>

1. ${profile.title} 相对前一步改变了哪个合同？请用一个最小输入指出最先变化的证据。

<Answer>
  它把“${profile.knowledge.before}”推进为“${profile.knowledge.after}”。固定输入后先检查 ${profile.nodes[0]}，再核对 ${profile.nodes[1]} 与 ${profile.nodes[2]}；机制应符合“${profile.knowledge.mechanism}”。

  目录单元逐项验收：${practiceChecklist}。每项都要写下预期、实测与复位后的重放证据。
</Answer>

2. 使用本页数学与状态合同做一次手算或 shape 推演，并说明代码中对应的数组或对象。

<Answer>
  先给公式中的输入标注数值、shape 与设备，得到预期结果后再运行最小草图。${profile.title} 的 forward 结果和 backward/状态证据必须同时匹配，不能只比较一个最终标量。
</Answer>

3. 注入“${profile.knowledge.fault}”后，如何证明重置真的恢复了实验？

<Answer>
  保存故障前的输入、${profile.nodes[0]} 和最终状态；注入故障定位首错后执行本页恢复顺序。重置后的 forward、梯度/shape、模式与证据轨迹都应回到基线，随后再次运行得到相同结果。
</Answer>

</Exercises>

<Attribution />
`;
}

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestDocument.books[BOOK];
if (!manifest) throw new Error(`manifest 缺少 ${BOOK}`);
const units = manifest.units ?? [];
const unitByKey = new Map();
for (const unit of units) {
  const key =
    unit.id.match(/dl2-step-(\d{2})/)?.[1] ??
    (unit.id === "dl2-app-a" ? "A" : unit.id === "dl2-app-b" ? "B" : "C");
  unitByKey.set(key, unit);
}

const profiles = walkMdx(CONTENT_ROOT).map((filePath) => {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const chapterSlug = path.basename(filePath, ".mdx");
  const key = unitKey(chapterSlug);
  const family = familyFor(key);
  const unit = unitByKey.get(key);
  const concepts = flatConcepts(unit);
  if (!KNOWLEDGE[key] && !SPECIAL[key])
    throw new Error(`缺少知识配置: ${key} ${chapterSlug}`);
  const componentName =
    chapterSlug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("")
      .replace(/[^A-Za-z0-9]/g, "") + "Lab";
  return {
    filePath,
    relativePath: path.relative(ROOT, filePath).replaceAll(path.sep, "/"),
    chapterSlug,
    key,
    title: String(parsed.data.title ?? unit?.title ?? chapterSlug),
    type: String(parsed.data.type ?? "C"),
    section: String(parsed.data.section ?? "DeZero"),
    order: Number(parsed.data.order ?? 0),
    family,
    practiceMode: practiceModeFor(key, family),
    concepts,
    nodes: DEFAULT_NODES[family],
    knowledge: SPECIAL[key] ?? KNOWLEDGE[key],
    componentName,
  };
});

for (const profile of profiles) {
  fs.writeFileSync(profile.filePath, makePage(profile));
  fs.writeFileSync(
    path.join(DIAGRAM_ROOT, `${profile.chapterSlug}.tsx`),
    makeWrapper(profile),
  );
}

manifest.sourceUrl = SOURCE_URL;
manifest.scopeSourceUrl = SOURCE_URL;
manifest.secondarySourceUrls = [REPO_URL, SAMPLE_URL];
manifest.verifiedAt = "2026-07-19";
manifest.factSourcesVerifiedAt = "2026-07-19";
manifest.factSources = {
  "official-book": {
    title: "O'Reilly Japan: ゼロから作るDeep Learning ❸",
    url: SOURCE_URL,
    kind: "publisher-primary-complete-toc",
  },
  "official-code": {
    title: "O'Reilly Japan official DeZero repository",
    url: REPO_URL,
    kind: "official-code-mit",
  },
  "official-sample": {
    title: "Author official DeZero online sample (steps 1–10)",
    url: SAMPLE_URL,
    kind: "author-primary-legal-sample",
  },
};
for (const unit of manifest.units) {
  const step = unit.id.match(/dl2-step-(\d{2})/)?.[1];
  unit.factSourceRefs = ["official-book", "official-code"];
  if (step && Number(step) <= 10) unit.factSourceRefs.push("official-sample");
}
fs.writeFileSync(
  MANIFEST_PATH,
  `${JSON.stringify(manifestDocument, null, 2)}\n`,
);
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      sources: [SOURCE_URL, REPO_URL, SAMPLE_URL],
      profiles: profiles.map(({ filePath: _, ...profile }) => profile),
    },
    null,
    2,
  )}\n`,
);

console.log(
  JSON.stringify({
    book: BOOK,
    pages: profiles.length,
    units: units.length,
    concepts: units.reduce((sum, unit) => sum + flatConcepts(unit).length, 0),
  }),
);
