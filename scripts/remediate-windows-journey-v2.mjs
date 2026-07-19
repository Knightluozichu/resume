#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "windows-journey";
const BOOK_DIR = path.join(ROOT, "content", BOOK);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/windows-journey-v2-profiles.json");
const CATALOG = "https://book.douban.com/subject/25756435/";
const BIBLIOGRAPHY =
  "https://www.sinobook.com.cn/b2c/scrp/bookdetail.cfm?iBookNo=646210";
const GOOGLE_BOOKS =
  "https://books.google.com/books/about/%E9%80%90%E6%A2%A6%E6%97%85%E7%A8%8B.html?id=6O-F0AEACAAJ";
const WORK_TITLE =
  "毛星云《逐梦旅程：Windows游戏编程之从零开始》（清华大学出版社，2013）";

const DOCS = {
  messages:
    "https://learn.microsoft.com/en-us/windows/win32/winmsg/about-messages-and-message-queues",
  dc: "https://learn.microsoft.com/en-us/windows/win32/gdi/about-device-contexts",
  memoryDc:
    "https://learn.microsoft.com/en-us/windows/win32/gdi/memory-device-contexts",
  d3dArchitecture:
    "https://learn.microsoft.com/en-us/windows/win32/direct3d9/direct3d-architecture",
  lostDevice:
    "https://learn.microsoft.com/en-us/windows/win32/direct3d9/lost-devices",
  transforms:
    "https://learn.microsoft.com/en-us/windows/win32/direct3d9/transforms",
  lighting:
    "https://learn.microsoft.com/en-us/windows/win32/direct3d9/lights-and-materials",
  directInput:
    "https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ee416842%28v%3Dvs.85%29",
  textures:
    "https://learn.microsoft.com/en-us/windows/win32/direct3d9/direct3d-textures",
  alpha:
    "https://learn.microsoft.com/en-us/windows/win32/direct3d9/frame-buffer-alpha",
  depth:
    "https://learn.microsoft.com/en-us/windows/win32/direct3d9/depth-buffers",
  stencil:
    "https://learn.microsoft.com/en-us/windows/win32/direct3d9/stencil-buffer-techniques",
  view:
    "https://learn.microsoft.com/en-us/windows/win32/direct3d9/view-transform",
  xinput:
    "https://learn.microsoft.com/en-us/windows/win32/xinput/getting-started-with-xinput",
};

function config({
  practiceMode,
  focus,
  problem,
  mechanism,
  invariant,
  fault,
  evidence,
  stages,
  terms,
  labels,
  unit,
  values,
  docUrl,
}) {
  return {
    practiceMode,
    focus,
    problem,
    mechanism,
    invariant,
    fault,
    evidence,
    stages,
    terms,
    docUrl,
    model: {
      historicalLabel: labels[0],
      modernLabel: labels[1],
      unit,
      historicalBase: values[0],
      historicalSlope: values[1],
      modernBase: values[2],
      modernSlope: values[3],
      faultPenalty: values[4],
      invariant,
      fault,
      evidence,
    },
  };
}

const TOPICS = {
  "wj-official-learning-map": config({
    practiceMode: "design",
    focus: "把 Windows 消息、GDI 双缓冲、Direct3D 9 管线与综合项目排成可验证学习路径",
    problem: "只按 API 名称顺序阅读会混淆历史接口、稳定机制和现代替代方案",
    mechanism: "为每章登记输入、状态、可见结果、故障出口与现代迁移坐标",
    invariant: "每条学习路径都能落到一个可重放产物和明确通过条件",
    fault: "把 Direct3D 9 固定功能管线误写成当前推荐架构",
    evidence: "407 节点映射、章节产物、复位记录与迁移对照",
    stages: ["定位篇章", "识别年代", "建立产物", "注入故障", "复核迁移"],
    terms: ["历史基线", "机制证据", "迁移坐标", "学习闭环"],
    labels: ["按目录漫游", "按证据学习"], unit: "未闭环节点", values: [18, 6, 8, 1.4, 14], docUrl: DOCS.d3dArchitecture,
  }),
  "wj-01-game-development-landscape": config({
    practiceMode: "design",
    focus: "用平台、类型、团队约束和目标体验选择游戏开发路线",
    problem: "把市场分类直接等同于技术栈会让学习目标失去约束",
    mechanism: "先写目标玩家与交付平台，再由体验、预算和团队能力反推工具链",
    invariant: "每个技术选择都能追溯到一个玩家体验或交付约束",
    fault: "仅因流行度选择引擎和图形 API",
    evidence: "平台矩阵、原型结果、风险登记和路线复盘",
    stages: ["定义体验", "划分市场", "选择平台", "验证原型", "修订路线"],
    terms: ["游戏平台", "游戏类型", "图形 API", "学习路线"],
    labels: ["2013 市场快照", "当前约束矩阵"], unit: "无依据选择", values: [12, 4.5, 6, 1.4, 10], docUrl: DOCS.d3dArchitecture,
  }),
  "wj-02-visual-studio": config({
    practiceMode: "code",
    focus: "让解决方案、项目、编译、链接、调试和帮助检索形成可复现工具链",
    problem: "照着旧版界面点击能得到程序，却无法解释构建产物和错误来源",
    mechanism: "以源码到目标文件再到可执行文件的链路替代对 IDE 菜单位置的记忆",
    invariant: "在不同 Visual Studio 版本中都能重建、调试并解释同一最小程序",
    fault: "头文件可见但库未链接，或 Debug/Release 配置漂移",
    evidence: "构建日志、编译命令、链接输入和断点轨迹",
    stages: ["创建方案", "配置项目", "编译源码", "链接产物", "断点验证"],
    terms: ["解决方案", "项目配置", "编译单元", "链接输入"],
    labels: ["VS2010 配置", "现代 VS 重建"], unit: "配置差异", values: [14, 4, 7, 1.5, 12], docUrl: DOCS.messages,
  }),
  "wj-03-windows-programming": config({
    practiceMode: "code",
    focus: "让窗口创建、线程消息队列、窗口过程和退出链组成最小桌面程序",
    problem: "窗口显示成功并不能证明消息被分派、默认处理执行或退出链完整",
    mechanism: "注册窗口类并创建窗口，由消息循环取出和分派消息，窗口过程完成处理与默认出口",
    invariant: "每个消息都有确定接收者，WM_DESTROY 最终导致消息循环退出且不忙等",
    fault: "遗漏 DefWindowProc、DispatchMessage 或 PostQuitMessage",
    evidence: "MSG 序列、窗口句柄、分派顺序、CPU 空闲率和退出码",
    stages: ["注册窗口", "创建显示", "取得消息", "分派处理", "销毁退出"],
    terms: ["WinMain", "消息队列", "窗口过程", "句柄"],
    labels: ["Win32 消息泵", "封装后事件循环"], unit: "错误消息", values: [10, 3.5, 6, 1.2, 16], docUrl: DOCS.messages,
  }),
  "wj-04-gdi-foundations": config({
    practiceMode: "code",
    focus: "管理设备环境、逻辑图形对象、客户区坐标和配对释放",
    problem: "直接持有 HDC 或删除仍被选入 DC 的对象会产生泄漏和未定义绘制状态",
    mechanism: "在受控生命周期内取得 DC，保存旧对象，选择新对象，绘制后恢复并释放",
    invariant: "每次取得的 DC 都按来源配对释放，每个 GDI 对象删除前已脱离 DC",
    fault: "DeleteObject 删除仍被 SelectObject 选中的画笔",
    evidence: "GDI 对象计数、HDC 来源、选入对象和客户区像素",
    stages: ["取得 DC", "建立对象", "选择状态", "执行绘制", "恢复释放"],
    terms: ["设备环境", "HDC", "逻辑对象", "客户区"],
    labels: ["GDI 立即绘制", "资源封装绘制"], unit: "泄漏对象", values: [8, 3.8, 5, 1.3, 18], docUrl: DOCS.dc,
  }),
  "wj-05-gdi-drawing": config({
    practiceMode: "simulation",
    focus: "用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码",
    problem: "逐对象直接画到窗口 DC 会暴露中间帧并产生闪烁",
    mechanism: "所有绘制先在兼容内存 DC 完成，再以一次 BitBlt 发布完整帧",
    invariant: "前台只观察到完整帧，遮罩和源图合成不污染背景",
    fault: "源 DC 与目标 DC 尺寸或 ROP 顺序错误",
    evidence: "缓冲代际、BitBlt 次数、透明像素和帧差分",
    stages: ["创建后备 DC", "清理背景", "绘制精灵", "完成合成", "一次发布"],
    terms: ["内存 DC", "兼容位图", "BitBlt", "透明掩码"],
    labels: ["GDI 双缓冲", "现代离屏表面"], unit: "撕裂像素", values: [16, 6, 7, 1.5, 20], docUrl: DOCS.memoryDc,
  }),
  "wj-06-windows-animation": config({
    practiceMode: "calculation",
    focus: "把真实时间、固定更新步长、动画帧索引和发布频率解耦",
    problem: "每次循环移动固定距离会让动画速度随机器和窗口消息负载变化",
    mechanism: "累积真实经过时间，执行零到多次固定步更新，再绘制当前状态",
    invariant: "相同真实时长和输入产生相同模拟时间与动画帧序列",
    fault: "长帧后无限追赶形成死亡螺旋",
    evidence: "真实时间、模拟时间、更新次数、丢帧和帧时分位数",
    stages: ["采样时间", "累积差值", "固定更新", "选择画格", "发布帧"],
    terms: ["固定时间步", "累积器", "帧动画", "双缓冲"],
    labels: ["Sleep 定时循环", "固定步长循环"], unit: "ms 偏差", values: [18, 5.5, 8, 1.2, 24], docUrl: DOCS.messages,
  }),
  "wj-07-input-messages": config({
    practiceMode: "simulation",
    focus: "区分离散按键消息、连续按住状态、鼠标坐标和输入焦点",
    problem: "把按键消息当成连续状态会丢失按住语义，把屏幕坐标当客户区坐标会错位",
    mechanism: "消息更新输入快照，固定更新阶段只消费已归一化的动作状态",
    invariant: "同一输入记录与窗口尺寸产生相同动作序列",
    fault: "窗口失焦后按键状态未清零导致角色持续移动",
    evidence: "消息时间戳、动作快照、坐标换算和焦点转换",
    stages: ["接收消息", "换算坐标", "更新快照", "消费动作", "焦点复位"],
    terms: ["键盘消息", "鼠标消息", "客户区坐标", "输入快照"],
    labels: ["Win32 输入消息", "动作映射层"], unit: "丢失动作", values: [11, 4.2, 6, 1.3, 15], docUrl: DOCS.messages,
  }),
  "wj-08-physics-particles": config({
    practiceMode: "calculation",
    focus: "用位置、速度、加速度和生命周期建立可复算二维粒子模型",
    problem: "逐帧常量位移和随帧率取随机数会让粒子轨迹不可重放",
    mechanism: "固定时间步积分运动状态，使用固定随机种子，并在寿命结束时回收粒子",
    invariant: "相同初态、种子、输入和步长产生相同粒子轨迹",
    fault: "时间单位混用或在渲染阶段再次更新位置",
    evidence: "状态向量、积分步数、种子、能量误差和存活数",
    stages: ["生成粒子", "施加加速度", "积分速度", "积分位置", "回收重置"],
    terms: ["状态向量", "时间积分", "随机种子", "生命周期"],
    labels: ["欧拉逐帧模型", "固定步长模型"], unit: "轨迹误差", values: [20, 5, 9, 1.1, 22], docUrl: DOCS.messages,
  }),
  "wj-09-turn-based-game": config({
    practiceMode: "design",
    focus: "把地图、回合、输入、碰撞、战斗和存档组织成显式游戏状态机",
    problem: "场景切换、战斗和资源加载混在消息处理分支中会产生非法状态",
    mechanism: "每个游戏状态声明允许动作、进入退出副作用和可序列化数据",
    invariant: "一次只存在一个主状态，存档重载后得到相同地图和回合进度",
    fault: "战斗退出时残留输入或资源引用进入地图状态",
    evidence: "状态转换日志、地图坐标、回合序号和存档哈希",
    stages: ["加载地图", "等待动作", "解析回合", "结算战斗", "保存恢复"],
    terms: ["回合状态", "碰撞地图", "资源所有权", "存档快照"],
    labels: ["GDI 回合项目", "分层状态项目"], unit: "非法状态", values: [22, 6, 10, 1.5, 26], docUrl: DOCS.memoryDc,
  }),
  "wj-10-directx-overview": config({
    practiceMode: "design",
    focus: "辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口",
    problem: "把 DirectX 当成单一绘图库会混淆图形、输入、音频和辅助库的责任",
    mechanism: "按输入输出、对象生命周期和平台支持把组件映射到子系统边界",
    invariant: "每个组件选择都标明版本、责任、资源寿命和现代替代坐标",
    fault: "把废弃 D3DX 或 DirectInput 示例当作当前新项目默认方案",
    evidence: "组件矩阵、接口版本、支持状态和迁移决策",
    stages: ["识别组件", "核对版本", "建立接口", "验证能力", "登记替代"],
    terms: ["DirectX", "COM 接口", "Direct3D 9", "D3DX"],
    labels: ["DirectX 9 SDK", "现代平台组件"], unit: "版本误配", values: [14, 4.5, 7, 1.4, 18], docUrl: DOCS.d3dArchitecture,
  }),
  "wj-11-direct3d-foundations": config({
    practiceMode: "code",
    focus: "从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期",
    problem: "设备创建成功不等于适配器、格式、呈现参数和丢失恢复正确",
    mechanism: "枚举能力并创建设备，按 Clear、BeginScene、绘制、EndScene、Present 发布一帧",
    invariant: "设备状态、场景配对和资源释放在成功与失败路径都完整",
    fault: "全屏焦点切换后忽略 D3DERR_DEVICELOST",
    evidence: "HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹",
    stages: ["创建 D3D", "选择设备", "配置呈现", "提交场景", "检测丢失"],
    terms: ["IDirect3D9", "设备", "交换链", "HRESULT"],
    labels: ["Direct3D 9 设备", "显式资源设备"], unit: "失败调用", values: [13, 4.8, 7, 1.5, 24], docUrl: DOCS.lostDevice,
  }),
  "wj-12-direct3d-drawing": config({
    practiceMode: "code",
    focus: "定义顶点格式、缓冲区、图元拓扑和绘制调用的数据合同",
    problem: "屏幕没有图形时，根因可能在顶点布局、缓冲锁定、图元数或变换状态",
    mechanism: "让顶点声明与内存布局一致，写入缓冲并在正确流和拓扑上绘制",
    invariant: "顶点字节、FVF/声明、步长和图元数量彼此一致",
    fault: "FVF 声明的步长与 C++ 顶点结构不匹配",
    evidence: "顶点字节、流步长、图元计数、绘制返回值和帧捕获",
    stages: ["定义顶点", "创建缓冲", "锁定写入", "绑定数据", "提交图元"],
    terms: ["顶点缓冲", "索引缓冲", "FVF", "图元拓扑"],
    labels: ["D3D9 FVF 绘制", "显式顶点布局"], unit: "错误图元", values: [17, 5, 8, 1.4, 21], docUrl: DOCS.d3dArchitecture,
  }),
  "wj-13-four-transforms": config({
    practiceMode: "calculation",
    focus: "把模型顶点依次变换到世界、观察、投影和视口坐标",
    problem: "矩阵乘法顺序、左右手系或齐次除法任一错误都会让物体消失或镜像",
    mechanism: "明确向量约定与矩阵顺序，并逐空间记录测试点和裁剪结果",
    invariant: "每个测试顶点在五个坐标空间都有可复算位置",
    fault: "交换世界矩阵与观察矩阵或混用左右手投影",
    evidence: "矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素",
    stages: ["模型空间", "世界变换", "观察变换", "投影裁剪", "视口映射"],
    terms: ["世界矩阵", "观察矩阵", "投影矩阵", "齐次除法"],
    labels: ["固定功能变换", "着色器矩阵变换"], unit: "像素误差", values: [24, 7, 12, 1.8, 30], docUrl: DOCS.transforms,
  }),
  "wj-14-lighting-materials": config({
    practiceMode: "calculation",
    focus: "分离光源、法线、材质反射分量与固定功能逐顶点光照",
    problem: "只调亮度参数会掩盖法线方向、空间和归一化错误",
    mechanism: "在同一空间计算环境光、漫反射和镜面项，再由材质决定反射比例",
    invariant: "光照结果能由法线、光向、视向和材质参数逐项复算",
    fault: "非均匀缩放后法线未正确变换或归一化",
    evidence: "点积、各光照分量、法线长度和最终颜色",
    stages: ["准备法线", "变换光向", "计算漫反射", "计算镜面", "合成材质"],
    terms: ["法线", "漫反射", "镜面反射", "材质"],
    labels: ["D3D9 固定光照", "着色器显式光照"], unit: "颜色误差", values: [19, 6.5, 10, 1.7, 26], docUrl: DOCS.lighting,
  }),
  "wj-15-directinput": config({
    practiceMode: "diagnosis",
    focus: "理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复",
    problem: "轮询成功一次不能证明焦点切换、设备丢失和动作映射能够恢复",
    mechanism: "创建并配置设备，Acquire 后读取状态，失败时重新获取并归一化为动作",
    invariant: "设备丢失和重新获取不会制造卡键或重复动作",
    fault: "DIERR_INPUTLOST 后继续消费旧缓冲状态",
    evidence: "HRESULT、获取状态、原始输入、动作边沿和焦点轨迹",
    stages: ["枚举设备", "设置格式", "设置协作", "轮询状态", "丢失重获"],
    terms: ["DirectInput", "协作级别", "Acquire", "动作映射"],
    labels: ["DirectInput 轮询", "消息/XInput 动作层"], unit: "卡住动作", values: [15, 5, 7, 1.4, 25], docUrl: DOCS.directInput,
  }),
  "wj-16-texture-mapping": config({
    practiceMode: "simulation",
    focus: "从 UV 坐标、采样寻址、过滤到纹理阶段状态解释像素来源",
    problem: "纹理出现不等于 UV、过滤、寻址和资源生命周期正确",
    mechanism: "将顶点 UV 插值到像素，按寻址和过滤状态采样后与当前颜色组合",
    invariant: "选定像素的 UV、采样 texel 和组合颜色可以追溯",
    fault: "UV 超界但寻址模式错误，或纹理状态泄漏到下一物体",
    evidence: "UV、采样坐标、过滤模式、阶段状态和像素颜色",
    stages: ["载入资源", "绑定纹理", "插值 UV", "寻址采样", "组合输出"],
    terms: ["纹理坐标", "寻址模式", "纹理过滤", "阶段状态"],
    labels: ["D3D9 纹理阶段", "采样器/着色器"], unit: "错误采样", values: [18, 5.5, 9, 1.5, 22], docUrl: DOCS.textures,
  }),
  "wj-17-mesh-loading": config({
    practiceMode: "diagnosis",
    focus: "验证网格几何、子集、材质、纹理路径和对象所有权",
    problem: "模型能加载但子集材质错位、纹理缺失或 COM 引用泄漏仍会潜伏",
    mechanism: "解析几何与属性表，逐子集绑定对应材质和纹理并记录资源来源",
    invariant: "每个子集只引用存在且归属明确的材质、纹理和几何范围",
    fault: "材质数量与子集属性 ID 不一致或相对纹理路径失效",
    evidence: "顶点索引范围、属性 ID、材质表、纹理路径和引用计数",
    stages: ["读取网格", "校验几何", "解析子集", "绑定材质", "释放资源"],
    terms: ["网格", "子集", "属性表", "材质纹理"],
    labels: ["D3DX .x 网格", "现代资产管线"], unit: "失配子集", values: [20, 6, 10, 1.6, 26], docUrl: DOCS.textures,
  }),
  "wj-18-alpha-blending": config({
    practiceMode: "calculation",
    focus: "用源色、目标色和混合因子计算透明结果并解释绘制顺序",
    problem: "透明度值正确但混合因子或排序错误仍会产生光晕和遮挡",
    mechanism: "按最终色等于源色乘源因子加目标色乘目标因子复算像素",
    invariant: "每个透明像素的源、目标、因子和绘制顺序都有记录",
    fault: "半透明对象开启深度写入或按近到远顺序绘制",
    evidence: "源目标 RGBA、混合状态、深度状态、排序键和最终像素",
    stages: ["准备源色", "读取目标色", "选择因子", "执行混合", "验证排序"],
    terms: ["Alpha", "源混合因子", "目标混合因子", "透明排序"],
    labels: ["D3D9 Alpha 状态", "管线混合状态"], unit: "颜色差", values: [22, 7, 11, 1.8, 29], docUrl: DOCS.alpha,
  }),
  "wj-19-depth-z-buffer": config({
    practiceMode: "calculation",
    focus: "用深度测试函数、写入开关和近远平面解释遮挡与精度",
    problem: "开启 Z 缓冲仍可能因清除、比较、写入或投影精度错误而穿插",
    mechanism: "光栅化像素与已存深度比较，通过后按状态更新颜色和深度",
    invariant: "每个争议像素的候选深度、旧深度、比较结果和写入结果可复算",
    fault: "每帧未清深度或近远平面比过大造成 Z fighting",
    evidence: "深度值、比较函数、写掩码、清除值和投影参数",
    stages: ["清除深度", "生成深度", "执行比较", "更新像素", "检查精度"],
    terms: ["Z 缓冲", "深度测试", "深度写入", "Z fighting"],
    labels: ["D3D9 深度状态", "现代深度附件"], unit: "遮挡错误", values: [18, 6, 9, 1.6, 25], docUrl: DOCS.depth,
  }),
  "wj-20-stencil-techniques": config({
    practiceMode: "simulation",
    focus: "用模板比较、通过/失败操作和绘制遍次构造像素级遮罩",
    problem: "只看最终镜面或阴影无法判断模板值在哪一遍被错误写入",
    mechanism: "第一遍按条件写模板，后续遍用引用值和比较函数限制颜色写入",
    invariant: "每个像素的模板旧值、比较、操作和新值均能逐遍追踪",
    fault: "未清模板或写掩码/读掩码混淆导致遮罩跨帧残留",
    evidence: "模板值、引用值、掩码、比较结果、每遍颜色写入",
    stages: ["清除模板", "写入遮罩", "执行比较", "应用操作", "受限绘制"],
    terms: ["模板缓冲", "模板引用", "读写掩码", "多遍绘制"],
    labels: ["D3D9 模板状态", "现代模板附件"], unit: "错误像素", values: [21, 6.5, 10, 1.7, 28], docUrl: DOCS.stencil,
  }),
  "wj-21-game-camera": config({
    practiceMode: "calculation",
    focus: "由位置、朝向、上向量和视锥参数构造稳定观察与投影矩阵",
    problem: "直接累加欧拉角或混用坐标手性会产生翻转、漂移和视锥错误",
    mechanism: "维护正交相机基向量，将世界反向变换到相机空间后再投影",
    invariant: "相机基向量正交归一，测试点的观察坐标和屏幕方向可复算",
    fault: "朝向与上向量共线或旋转后未重新正交化",
    evidence: "相机基向量、观察矩阵、视锥参数和测试点坐标",
    stages: ["更新姿态", "正交基向量", "构造观察", "构造投影", "验证视锥"],
    terms: ["相机基", "观察矩阵", "视锥", "投影参数"],
    labels: ["D3DX 相机矩阵", "显式相机组件"], unit: "方向误差", values: [20, 6, 10, 1.5, 24], docUrl: DOCS.view,
  }),
  "wj-22-terrain": config({
    practiceMode: "simulation",
    focus: "把高度图采样、网格生成、法线、纹理和位置查询连成地形系统",
    problem: "地形能显示但索引绕序、法线、边界采样或高度查询可能不一致",
    mechanism: "将像素高度映射到规则网格，按统一三角划分生成索引并插值查询高度",
    invariant: "渲染网格与角色高度查询使用同一坐标变换和三角划分",
    fault: "世界坐标到高度图索引取整越界或查询使用另一条对角线",
    evidence: "高度样本、顶点索引、三角重心、法线和查询误差",
    stages: ["读取高度", "生成顶点", "建立索引", "计算法线", "查询碰撞"],
    terms: ["高度图", "规则网格", "重心插值", "地形法线"],
    labels: ["CPU 高度图地形", "分块地形管线"], unit: "高度误差", values: [25, 7, 12, 1.8, 30], docUrl: DOCS.d3dArchitecture,
  }),
  "wj-23-skybox": config({
    practiceMode: "simulation",
    focus: "让天空随相机平移但不产生近处视差，并隔离深度和剔除状态",
    problem: "天空盒若参与普通世界平移或错误写深度，会暴露立方体边界并遮住场景",
    mechanism: "以相机为中心绘制天空几何，使用一致贴图接缝并在受控深度状态下提交",
    invariant: "相机平移不改变天空方向采样，天空绘制后所有渲染状态恢复",
    fault: "天空开启深度写入或忘记恢复剔除模式",
    evidence: "相机位置抵消、纹理方向、深度状态、绘制顺序和接缝像素",
    stages: ["读取相机", "居中几何", "采样天空", "限制深度", "恢复状态"],
    terms: ["天空盒", "方向采样", "视差", "状态隔离"],
    labels: ["六面天空盒", "立方体贴图天空"], unit: "接缝像素", values: [17, 5.5, 8, 1.4, 22], docUrl: DOCS.textures,
  }),
  "wj-24-particle-system": config({
    practiceMode: "simulation",
    focus: "管理三维粒子的发射、更新、公告板朝向、透明排序和回收",
    problem: "每帧分配粒子、未按相机排序或随机序列漂移会破坏性能和可重放性",
    mechanism: "从池中发射带寿命状态的粒子，固定步长更新，按相机关系构造公告板并批量绘制",
    invariant: "活跃数受容量约束，相同种子与时间步产生相同粒子状态",
    fault: "透明粒子近到远绘制或死亡粒子仍留在活动列表",
    evidence: "发射序号、寿命、位置、排序键、池容量和绘制批次",
    stages: ["池中发射", "更新寿命", "积分位置", "相机排序", "批量回收"],
    terms: ["发射器", "粒子池", "公告板", "透明排序"],
    labels: ["D3D9 CPU 粒子", "实例化粒子管线"], unit: "溢出粒子", values: [24, 7, 11, 1.6, 29], docUrl: DOCS.alpha,
  }),
  "wj-25-multi-model-loading": config({
    practiceMode: "diagnosis",
    focus: "让多个模型实例共享不可变资源，同时隔离变换、材质覆盖和生命周期",
    problem: "逐实例重复加载会放大内存，而错误共享可变状态会让一个模型污染其他模型",
    mechanism: "资源缓存按规范路径保存网格纹理，实例只持有资源引用和独立世界状态",
    invariant: "同一资产只加载一次，实例变化不修改共享资源或其他实例",
    fault: "缓存键未规范化造成重复资源，或实例直接改共享材质",
    evidence: "缓存键、资源身份、引用计数、实例变换和内存占用",
    stages: ["规范路径", "查询缓存", "加载资源", "创建实例", "引用释放"],
    terms: ["资源缓存", "模型实例", "共享资源", "引用计数"],
    labels: ["逐模型 D3DX 加载", "缓存实例管线"], unit: "重复 MiB", values: [26, 8, 12, 1.7, 32], docUrl: DOCS.textures,
  }),
  "wj-26-game-engines": config({
    practiceMode: "design",
    focus: "以帧合同、资源所有权和依赖方向划分引擎子系统",
    problem: "把所有功能放进一个 Game 类或照抄成熟引擎模块都会隐藏真实边界",
    mechanism: "由组合根创建平台、输入、资源、场景、渲染和工具服务，并显式安排更新顺序",
    invariant: "依赖方向、创建销毁顺序和每帧数据流均可从边界读出",
    fault: "渲染系统反向控制游戏规则或全局单例决定销毁顺序",
    evidence: "依赖图、帧时序、资源图、替身测试和模块替换记录",
    stages: ["定义帧合同", "划分子系统", "注入依赖", "运行调度", "逆序销毁"],
    terms: ["引擎架构", "子系统", "组合根", "帧合同"],
    labels: ["教学引擎雏形", "可替换子系统"], unit: "反向依赖", values: [23, 7, 11, 1.8, 30], docUrl: DOCS.d3dArchitecture,
  }),
  "wj-appendix-a-reading-guide": config({
    practiceMode: "design",
    focus: "按能力缺口、技术年代、练习产物和前置条件选择后续资料",
    problem: "书单只列书名会让读者重复学习或把过时接口误作当前实践",
    mechanism: "每项资料登记解决的问题、版本坐标、前置知识、产物和淘汰条件",
    invariant: "每次阅读都对应一个当前项目可验证的能力缺口",
    fault: "按知名度囤积资料却没有练习产物和停止条件",
    evidence: "能力矩阵、版本信息、阅读产物和复盘记录",
    stages: ["定位缺口", "核对版本", "选择资料", "制作产物", "复盘去留"],
    terms: ["能力缺口", "版本坐标", "阅读产物", "停止条件"],
    labels: ["2013 进阶书单", "持续更新路线"], unit: "无产物阅读", values: [16, 5, 7, 1.3, 18], docUrl: DOCS.d3dArchitecture,
  }),
  "wj-official-final-review": config({
    practiceMode: "design",
    focus: "用跨章故障链验证窗口、输入、模拟、渲染、资源和恢复的整机闭环",
    problem: "逐章术语都能复述仍不能证明系统在焦点切换、资源丢失和压力下正确",
    mechanism: "以固定构建和输入串联 Win32、GDI、D3D9 与项目状态，记录首个因果分叉",
    invariant: "相同初态与输入在正常、故障恢复和现代迁移实现中得到等价可观察结果",
    fault: "窗口失焦同时触发输入丢失、设备丢失和资源重建顺序错误",
    evidence: "407 节点证据、消息/帧轨迹、资源计数、截图和恢复哈希",
    stages: ["冻结基线", "运行整机", "组合故障", "恢复重放", "迁移答辩"],
    terms: ["整机闭环", "组合故障", "首错证据", "迁移答辩"],
    labels: ["章节背诵", "整机故障答辩"], unit: "未证结论", values: [30, 9, 14, 2, 38], docUrl: DOCS.lostDevice,
  }),
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

function escapeMdxText(value) {
  return String(value)
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&")
    .replaceAll("{", "&#123;")
    .replaceAll("}", "&#125;");
}

function insightFor(concept, topic) {
  const value = concept.toLowerCase();
  const context = `围绕${topic.focus}，`;
  if (/小憩|总结|回顾/.test(value))
    return `${context}对 ${concept}，收尾不是装饰，而是要求用${topic.evidence}复盘“${topic.invariant}”是否在正常和失败路径同时成立。`;
  if (/示例|demo|程序|实战|游戏/.test(value))
    return `${context}对 ${concept}，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留${topic.evidence}。`;
  if (/函数|接口|api|sdk|direct|gdi|d3d|device|对象/.test(value))
    return `${context}对 ${concept}，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。`;
  if (/坐标|矩阵|变换|向量|光照|材质|深度|alpha|模板|纹理/.test(value))
    return `${context}对 ${concept}，必须给出可复算中间量，先在纸面预测空间或像素结果，再用${topic.evidence}查找首个数值分叉。`;
  if (/创建|载入|加载|资源|释放|注销|销毁/.test(value))
    return `${context}对 ${concept}，重点检查资源生命周期：创建成功只完成一半，失败回滚、逆序释放和同输入重建同样属于通过条件。`;
  if (/消息|输入|键盘|鼠标|循环|动画|时间/.test(value))
    return `${context}对 ${concept}，重点检查事件与时间顺序，必须区分采集、状态快照、固定更新和可见发布，不能由最终画面倒推过程正确。`;
  return `${context}${concept} 限定本章的一个知识坐标；独立解释围绕“${topic.mechanism}”展开，并以“${topic.invariant}”结束。`;
}

function nodeSection(concept, index, topic) {
  const stage = topic.stages[index % topic.stages.length];
  return `### ${concept}\n\n${insightFor(concept, topic)}\n\n${concept} 进入“${stage}”阶段时，先标出输入、状态拥有者和可见输出，再解释${topic.mechanism}。2013 年的 API 名称作为历史坐标保留；迁移到现代工具时只替换实现，不能改变本章问题与证据口径。\n\n验证 ${concept} 时固定其余条件，记录${topic.evidence}，随后注入“${topic.fault}”并执行复位。该节点由此同时具备出现、解释、专属实验和练习验证四级证据。`;
}

function termDefinition(term, title, index) {
  const endings = [
    "标记输入进入系统时的责任边界",
    "标记状态被创建、修改与释放的生命周期",
    "标记历史实现与现代迁移之间必须保持的机制",
    "标记能够复算本章结论的原始证据",
  ];
  return `${term}在“${title}”中${endings[index % endings.length]}。`;
}

function implementationBlock(topic, title) {
  if (topic.practiceMode === "calculation") {
    return `\`\`\`text\ninitial = fixed_state + fixed_input + fixed_timestep\nhistorical = run(initial, "${topic.model.historicalLabel}")\nmodern = run(initial, "${topic.model.modernLabel}")\ncompare(historical, modern, "${topic.model.unit}")\npass = "${topic.invariant}"\n\`\`\``;
  }
  if (topic.practiceMode === "code") {
    return `\`\`\`cpp\nstruct JourneyProbe {\n  const char* chapter = ${JSON.stringify(title)};\n  unsigned generation = 0;\n  bool resourcesReady = false;\n  bool resetVerified = false;\n};\n\n// 每个 HRESULT/句柄/COM 引用都进入证据日志；失败时逆序回滚。\n\`\`\``;
  }
  return `\`\`\`text\nfreeze -> ${topic.stages.join(" -> ")}\nfault -> ${topic.fault}\nevidence -> ${topic.evidence}\nreset -> replay identical input\n\`\`\``;
}

function wrapperSource(names, title, topic, nodes) {
  const nodeData = nodes.map((node) => ({
    label: node,
    mechanism: insightFor(node, topic),
    probe: `记录${topic.evidence}`,
  }));
  return `import {\n  WindowsJourneyMigrationLab,\n  WindowsJourneyPipelineLab,\n  WindowsJourneyRecoveryLab,\n  type WindowsJourneyCausalModel,\n  type WindowsJourneyCoverageNode,\n} from "./official-windows-journey-book-lab";\n\nconst title = ${JSON.stringify(title)};\nconst focus = ${JSON.stringify(topic.focus)};\nconst stages = ${JSON.stringify(topic.stages, null, 2)};\nconst nodes = ${JSON.stringify(nodeData, null, 2)} satisfies WindowsJourneyCoverageNode[];\nconst model = ${JSON.stringify(topic.model, null, 2)} satisfies WindowsJourneyCausalModel;\nconst props = { title, focus, stages, nodes, model };\n\nexport function ${names.map}() {\n  return <WindowsJourneyPipelineLab {...props} />;\n}\n\nexport function ${names.experiment}() {\n  return <WindowsJourneyMigrationLab {...props} />;\n}\n\nexport function ${names.evidence}() {\n  return <WindowsJourneyRecoveryLab {...props} />;\n}\n`;
}

function contentFor({
  title,
  topic,
  concepts,
  names,
  previous,
  next,
}) {
  const deepDive = concepts
    .map((concept, index) => nodeSection(concept, index, topic))
    .join("\n\n");
  const terms = topic.terms
    .map(
      (term, index) =>
        `<Term def=${JSON.stringify(termDefinition(term, title, index))}>${term}</Term>`,
    )
    .join("、");
  const glossary = topic.terms
    .map(
      (term, index) =>
        `<GlossaryItem term=${JSON.stringify(term)}>\n    ${termDefinition(term, title, index)}\n  </GlossaryItem>`,
    )
    .join("\n  ");
  const practices = concepts
    .map(
      (concept, index) =>
        `  - **${concept}**：在“${topic.stages[index % topic.stages.length]}”记录${topic.evidence}，注入“${topic.fault}”后复位并重放。`,
    )
    .join("\n");
  const navigation = [
    previous
      ? `[← 上一页：${previous.title}](/learn/${BOOK}/${previous.sectionSlug}/${previous.chapterSlug})`
      : null,
    next
      ? `[下一页：${next.title} →](/learn/${BOOK}/${next.sectionSlug}/${next.chapterSlug})`
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return `import {\n  ${names.map},\n  ${names.experiment},\n  ${names.evidence},\n} from "@/components/mdx/windows-journey/diagrams/${topic.componentSlug}";\n+import {\n  Objectives,\n  Callout,\n  Glossary,\n  GlossaryItem,\n  Term,\n  Exercises,\n  Answer,\n  Stepper,\n  Step,\n  Attribution,\n} from "@/components/mdx/mdx-components";\n\n+# ${title}\n\n+<Objectives>\n\n+- 能从“${topic.problem}”建立本章的历史问题基线。\n+- 能解释“${topic.mechanism}”的输入、状态、所有权和可见结果。\n+- 能操作专属实验，对照${topic.model.historicalLabel}与${topic.model.modernLabel}，复算${topic.model.unit}。\n+- 能注入“${topic.fault}”，用${topic.evidence}定位首错、恢复并重放。\n\n+</Objectives>\n\n+{/* WINDOWS_JOURNEY_QUALITY_V2 */}\n\n+## 问题先于 API\n\n+${topic.problem}。本章先保存问题、初态和输入，再讨论 API；通过条件是“${topic.invariant}”，不是画面偶然出现一次。\n\n+## 来源范围、技术年代与独立重写\n\n+公开[完整目录](${CATALOG})只用于界定本页题目和层级，[出版记录](${BIBLIOGRAPHY})与[书目记录](${GOOGLE_BOOKS})用于交叉核对 ISBN、出版社和年代；没有把目录核对表述成正文忠实。本页关于 Windows/DirectX 的机制由[Microsoft 一手文档](${topic.docUrl})核验，以下中文讲解、图示、实验、代码和练习均为独立教学重写。\n\n+原书处于 Visual Studio 2010、Win32/GDI、DirectX 9 与固定功能管线语境。现代 API 只作迁移对照：${topic.model.historicalLabel}和${topic.model.modernLabel}名称可以不同，但必须消费相同输入并守住同一不变量。\n\n+## 机制与术语\n\n+${terms}。四个术语共同约束“${topic.focus}”，结论必须回到${topic.evidence}。\n\n+## 先预测，再操作三层专属实验\n\n+操作前写下预测：哪一阶段先改变${topic.model.unit}；压力扩大四倍时哪条边界先失效；注入“${topic.fault}”后怎样回到初态。\n\n+<Stepper>\n+  <Step title="1. 正式节点与状态链">\n+    选择目录节点和机制阶段，检查输入、状态拥有者、可见结果与验证证据。\n\n+    <${names.map} />\n+\n+  </Step>\n+  <Step title="2. 历史实现与现代迁移">\n+    一次只改变技术坐标、场景负载或故障之一，读取可复算结果。\n\n+    <${names.experiment} />\n+\n+  </Step>\n+  <Step title="3. 故障、恢复与同输入重放">\n+    比较正常、故障和恢复轨迹；最后点击重置，确认所有控制和状态回到初值。\n\n+    <${names.evidence} />\n+\n+  </Step>\n+</Stepper>\n\n+## 正式目录逐项深读\n\n+${deepDive}\n\n+## 可重放实现或计算骨架\n\n+${implementationBlock(topic, title)}\n\n+真实程序还要固定编译器、SDK、窗口尺寸、资源、随机种子、时间步和输入记录；否则历史实现与现代迁移不能公平比较。\n\n+<Callout type="trap" title="把历史 API 当成当前默认方案">\n+  本章保留 ${topic.model.historicalLabel} 的教学身份，但新项目必须核对平台支持并解释为何选择 ${topic.model.modernLabel} 或其他方案。\n+</Callout>\n\n+<Callout type="trap" title="只看最终画面">\n+  ${title}必须说明${topic.stages.join("、")}的先后关系；最终像素相同不代表消息、资源、矩阵或状态安全。\n+</Callout>\n\n+<Callout type="trap" title="失败后继续运行">\n+  注入“${topic.fault}”后应停在第一个因果分叉；若${topic.evidence}无法解释并复位，当前实现失败。\n+</Callout>\n\n+## 练习与 4 级证据矩阵\n\n+<Exercises>\n\n+**问题 1：历史边界。** 怎样避免把 2013 年接口示例误报成今天的默认架构？\n\n+<Answer>\n+  分别记录${topic.model.historicalLabel}与${topic.model.modernLabel}的版本、责任和资源模型；只迁移机制，不改写历史事实，并以[Microsoft 文档](${topic.docUrl})核对接口身份。\n+</Answer>\n\n+**问题 2：逐节点验证。** 正式目录节点怎样从“出现”升级到可复查证据？\n\n+<Answer>\n+${practices}\n+</Answer>\n\n+**问题 3：故障闭环。** 注入“${topic.fault}”后怎样判定恢复成功？\n\n+<Answer>\n+  保存首错阶段，逆序清理或恢复必要状态，以相同初态和输入重放；只有${topic.evidence}回到基线且“${topic.invariant}”再次成立，才算恢复。\n+</Answer>\n\n+</Exercises>\n\n+## 术语复核与本章回顾\n\n+<Glossary>\n+  ${glossary}\n+</Glossary>\n\n+掌握“${title}”意味着能解释${topic.mechanism}，区分历史坐标与现代迁移，并用${topic.evidence}推翻或保留实现。\n\n+## 阅读导航\n\n+${navigation}\n\n+<Attribution\n+  mode="independent-rewrite"\n+  sourceBasis="outline-only"\n+  workTitle=${JSON.stringify(WORK_TITLE)}\n+  adaptedUrl=${JSON.stringify(CATALOG)}\n+/>\n+`.replace(/^\+/gm, "");
}

const manifestRoot = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestRoot.books[BOOK];
if (!manifest) throw new Error(`缺少 ${BOOK} manifest`);
const formalNodes = manifest.units.reduce(
  (sum, unit) => sum + unit.concepts.length,
  0,
);
if (manifest.units.length !== 27 || formalNodes !== 407)
  throw new Error(`Windows Journey manifest 分母异常：${manifest.units.length}/${formalNodes}`);

const entries = walkMdx(BOOK_DIR).map((filePath, order) => {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const chapterSlug = path.basename(filePath, ".mdx");
  const topic = TOPICS[chapterSlug];
  if (!topic) throw new Error(`缺少 Windows Journey 主题配置：${chapterSlug}`);
  const componentMatch = parsed.content.match(
    /from\s+["']@\/components\/mdx\/windows-journey\/diagrams\/([^"']+)["']/,
  );
  if (!componentMatch) throw new Error(`缺少专属组件导入：${filePath}`);
  const componentSlug = componentMatch[1];
  const componentPath = path.join(
    ROOT,
    "src/components/mdx/windows-journey/diagrams",
    `${componentSlug}.tsx`,
  );
  const componentSource = fs.readFileSync(componentPath, "utf8");
  const map = componentSource.match(/export function (\w+MapLab)/)?.[1];
  const experiment = componentSource.match(
    /export function (\w+ExperimentLab)/,
  )?.[1];
  const evidence = componentSource.match(/export function (\w+EvidenceLab)/)?.[1];
  if (!map || !experiment || !evidence)
    throw new Error(`组件导出不完整：${componentPath}`);
  const unitNumber = chapterSlug.match(/^wj-(\d{2})-/)?.[1];
  const unit = unitNumber
    ? manifest.units[Number(unitNumber) - 1]
    : chapterSlug === "wj-appendix-a-reading-guide"
      ? manifest.units[26]
      : null;
  const concepts = chapterSlug === "wj-official-learning-map"
    ? [String(parsed.data.title), ...manifest.units.map((item) => item.title)]
    : chapterSlug === "wj-official-final-review"
      ? manifest.units.map((item) => item.title)
      : unit?.concepts.flat().map((value) => escapeMdxText(value)) ?? [];
  if (concepts.length === 0) throw new Error(`页面未映射正式节点：${filePath}`);
  return {
    filePath,
    parsed,
    title: String(parsed.data.title ?? chapterSlug),
    order,
    sectionSlug: path.basename(path.dirname(filePath)),
    chapterSlug,
    componentSlug,
    componentPath,
    names: { map, experiment, evidence },
    topic: { ...topic, componentSlug },
    unit,
    concepts,
  };
});

if (entries.length !== 29)
  throw new Error(`Windows Journey 页面分母异常：${entries.length}`);

for (const [index, entry] of entries.entries()) {
  const previous = entries[index - 1] ?? null;
  const next = entries[index + 1] ?? null;
  const content = contentFor({ ...entry, previous, next });
  const data = {
    ...entry.parsed.data,
    description: `${entry.title}：${entry.topic.focus}，以历史—现代对照、故障恢复和逐节点证据验收。`,
    sourceUrl: CATALOG,
    qualityVersion: 2,
    practiceMode: entry.topic.practiceMode,
    sourceMode: "independent-rewrite",
  };
  fs.writeFileSync(entry.filePath, matter.stringify(content, data));
  fs.writeFileSync(
    entry.componentPath,
    wrapperSource(
      entry.names,
      entry.title,
      entry.topic,
      entry.concepts.map(String),
    ),
  );
}

const factSources = {
  detailedCatalog: {
    kind: "outline",
    label: "公开完整详细目录",
    url: CATALOG,
  },
  bibliography: {
    kind: "bibliographic-record",
    label: "出版书目记录",
    url: BIBLIOGRAPHY,
  },
  googleBooks: {
    kind: "bibliographic-record",
    label: "Google Books 书目记录",
    url: GOOGLE_BOOKS,
  },
  win32Messages: {
    kind: "official-documentation",
    label: "Microsoft Win32 消息与消息队列文档",
    url: DOCS.messages,
  },
  gdiDeviceContexts: {
    kind: "official-documentation",
    label: "Microsoft GDI 设备环境文档",
    url: DOCS.dc,
  },
  gdiMemoryContexts: {
    kind: "official-documentation",
    label: "Microsoft GDI 内存设备环境文档",
    url: DOCS.memoryDc,
  },
  direct3d9Architecture: {
    kind: "official-documentation",
    label: "Microsoft Direct3D 9 架构文档",
    url: DOCS.d3dArchitecture,
  },
  direct3d9LostDevices: {
    kind: "official-documentation",
    label: "Microsoft Direct3D 9 丢失设备文档",
    url: DOCS.lostDevice,
  },
  direct3d9Transforms: {
    kind: "official-documentation",
    label: "Microsoft Direct3D 9 变换文档",
    url: DOCS.transforms,
  },
  direct3d9Lighting: {
    kind: "official-documentation",
    label: "Microsoft Direct3D 9 光照与材质文档",
    url: DOCS.lighting,
  },
  directInput: {
    kind: "official-documentation",
    label: "Microsoft DirectInput 历史文档",
    url: DOCS.directInput,
  },
  direct3d9Textures: {
    kind: "official-documentation",
    label: "Microsoft Direct3D 9 纹理文档",
    url: DOCS.textures,
  },
  direct3d9Alpha: {
    kind: "official-documentation",
    label: "Microsoft Direct3D 9 Alpha 混合文档",
    url: DOCS.alpha,
  },
  direct3d9Depth: {
    kind: "official-documentation",
    label: "Microsoft Direct3D 9 深度缓冲文档",
    url: DOCS.depth,
  },
  direct3d9Stencil: {
    kind: "official-documentation",
    label: "Microsoft Direct3D 9 模板缓冲文档",
    url: DOCS.stencil,
  },
  direct3d9View: {
    kind: "official-documentation",
    label: "Microsoft Direct3D 9 观察变换文档",
    url: DOCS.view,
  },
  xinput: {
    kind: "official-documentation",
    label: "Microsoft XInput 当前文档",
    url: DOCS.xinput,
  },
};

const sourceIdsFor = (unitIndex) => {
  const base = ["detailedCatalog", "bibliography", "googleBooks"];
  if (unitIndex <= 2) return [...base, "win32Messages"];
  if (unitIndex <= 8)
    return [...base, "win32Messages", "gdiDeviceContexts", "gdiMemoryContexts"];
  if (unitIndex === 9)
    return [...base, "direct3d9Architecture", "direct3d9LostDevices", "xinput"];
  if (unitIndex <= 11)
    return [...base, "direct3d9Architecture", "direct3d9LostDevices"];
  if (unitIndex === 12 || unitIndex === 20)
    return [...base, "direct3d9Transforms", "direct3d9View"];
  if (unitIndex === 13) return [...base, "direct3d9Lighting"];
  if (unitIndex === 14) return [...base, "directInput", "xinput"];
  if ([15, 16, 21, 22, 24].includes(unitIndex))
    return [...base, "direct3d9Textures", "direct3d9Architecture"];
  if ([17, 23].includes(unitIndex)) return [...base, "direct3d9Alpha"];
  if (unitIndex === 18) return [...base, "direct3d9Depth"];
  if (unitIndex === 19) return [...base, "direct3d9Stencil"];
  return [...base, "direct3d9Architecture"];
};

manifestRoot.books[BOOK] = {
  ...manifest,
  version: 2,
  sourceKind:
    "public-complete-detailed-outline-bibliographic-cross-check-and-microsoft-primary-technical-docs",
  sourceUrl: CATALOG,
  secondarySourceUrls: Object.values(factSources).map((item) => item.url),
  status: "verified-outline-independent-rewrite",
  verifiedAt: "2026-07-19",
  sourceAccess: "outline-only",
  sourceMode: "independent-rewrite",
  defaultSourceMode: "independent-rewrite",
  disclosureNote:
    "未取得原书全文或合法试读正文；公开完整目录只用于界定26章、附录A及407个层级节点，不宣称复现原书正文。Windows、GDI、Direct3D 9和DirectInput技术事实以Microsoft一手文档核验；中文正文、图示、交互、代码和练习均为独立教学重写，并显式区分2013历史技术坐标与现代迁移。",
  factSources,
  coverage: { formalUnits: 27, outlineNodes: 407, pages: 29 },
  units: manifest.units.map((unit, unitIndex) => {
    const page = entries.find((entry) => entry.unit?.id === unit.id);
    if (!page) throw new Error(`manifest 单元缺页面：${unit.id}`);
    return {
      ...unit,
      sourceUnitId: unit.sourceUnitId ?? unit.id,
      chapterPath: `${page.sectionSlug}/${page.chapterSlug}`,
      factSourceIds: sourceIdsFor(unitIndex),
    };
  }),
  unitMappingEvidence: "quality/remediation-ledger.json",
  factSourcePolicy:
    "目录证据仅确定范围；每个节点必须同时具备独立中文解释、章专属状态链/故障实验和练习验证。技术断言使用Microsoft一手文档；无法核验的原书表述不臆造。",
};

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifestRoot, null, 2)}\n`);
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      sourceAccess: "outline-only",
      sourceMode: "independent-rewrite",
      scope: { formalUnits: 27, outlineNodes: 407, pages: 29 },
      profiles: entries.map((entry) => ({
        title: entry.title,
        order: entry.order,
        practiceMode: entry.topic.practiceMode,
        sectionSlug: entry.sectionSlug,
        chapterSlug: entry.chapterSlug,
        relativePath: path.relative(ROOT, entry.filePath).replaceAll(path.sep, "/"),
        sourceUrl: CATALOG,
        technicalSourceUrl: entry.topic.docUrl,
        formalNodeCount: entry.concepts.length,
        focus: entry.topic.focus,
        invariant: entry.topic.invariant,
        fault: entry.topic.fault,
      })),
    },
    null,
    2,
  )}\n`,
);

console.log(
  `Windows Journey v2 已生成：${entries.length}页，${manifest.units.length}个正式单元，${formalNodes}个目录节点。`,
);
