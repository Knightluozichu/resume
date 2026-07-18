import type { ReviewQuestion } from "./types";

const units: Array<{
  slug: ReviewQuestion["chapter"];
  title: string;
  thesis: string;
  invariant: string;
  terms: string[];
  chain: readonly string[];
}> = [
  {
    slug: "lop-official-learning-map",
    title: "《Linux操作系统实战（Ubuntu）（慕课版）》权威学习地图",
    thesis:
      "按人民邮电出版社官方目录复原9章117个核心层级，从Ubuntu安装、命令与管理进入编程环境、网络、Shell、正则和俄罗斯方块项目。",
    invariant:
      "9章117个核心层级均有唯一教学归属，官方2021版身份、实验环境、命令副作用和项目结果都可追溯。",
    terms: [
      "Ubuntu实战",
      "9章",
      "117个目录坐标",
      "嵌入式开发",
      "项目证据",
      "9章完整路线",
    ],
    chain: [
      "核对版本目录",
      "建立Ubuntu环境",
      "掌握命令管理",
      "构建编程工具链",
      "配置网络自动化",
      "交付项目实战",
    ],
  },
  {
    slug: "lop-01-recognizing-linux",
    title: "第1章 认识 Linux 操作系统",
    thesis:
      "从操作系统和嵌入式系统进入Linux历史、优势、发行版，再以虚拟机、Ubuntu和增强工具完成可重复安装。",
    invariant:
      "镜像、虚拟硬件、磁盘分区、用户身份和网络设置均可追溯，重装或回滚不会依赖未记录状态。",
    terms: [
      "操作系统",
      "嵌入式系统",
      "Linux发行版",
      "虚拟机",
      "Ubuntu安装",
      "第1章 认识 Linux 操作系统",
    ],
    chain: [
      "辨认系统角色",
      "选择发行版本",
      "创建虚拟硬件",
      "安装Ubuntu",
      "安装虚拟机工具",
      "保存基线快照",
    ],
  },
  {
    slug: "lop-02-using-linux",
    title: "第2章 Linux 操作系统的使用",
    thesis:
      "由终端、Shell和命令格式进入用户/系统、文件、压缩打包及常用功能命令，重点是参数、输入输出和退出状态。",
    invariant:
      "当前目录、引用与通配符、标准输入输出错误、返回码和副作用都明确，危险命令先在隔离目录验证。",
    terms: [
      "终端",
      "Shell",
      "命令格式",
      "文件命令",
      "退出状态",
      "第2章 Linux 操作系统的使用",
    ],
    chain: [
      "打开终端会话",
      "解析命令行",
      "解析路径与权限",
      "执行命令",
      "组合管道重定向",
      "检查退出状态",
    ],
  },
  {
    slug: "lop-03-user-management",
    title: "第3章 Linux 用户管理",
    thesis:
      "围绕用户属性、用户组和账户配置文件，使用用户/组命令维护身份，并以磁盘配额限制块与inode资源。",
    invariant:
      "UID/GID、主组/附加组、口令状态、家目录所有权和配额记录一致，不遗留孤儿身份或越权文件。",
    terms: [
      "UID与GID",
      "用户组",
      "账户配置文件",
      "磁盘配额",
      "最小权限",
      "第3章 Linux 用户管理",
    ],
    chain: [
      "读取身份数据库",
      "设计用户与组",
      "创建修改账户",
      "配置目录权限",
      "启用磁盘配额",
      "审计身份与用量",
    ],
  },
  {
    slug: "lop-04-software-management",
    title: "第4章 Linux 软件管理",
    thesis:
      "从软件包管理概念进入dpkg静态包、Deb制作和APT仓库机制，区分本地数据库操作与依赖解析。",
    invariant:
      "包来源、版本、架构、依赖、文件清单和配置状态一致，失败事务不留下半配置包。",
    terms: [
      "dpkg",
      "Deb软件包",
      "APT",
      "软件依赖",
      "包数据库",
      "第4章 Linux 软件管理",
    ],
    chain: [
      "识别包元数据",
      "检查依赖关系",
      "构建或获取Deb",
      "更新仓库索引",
      "安装配置软件",
      "验证与回滚",
    ],
  },
  {
    slug: "lop-05-programming-environment",
    title: "第5章 Linux 编程环境",
    thesis:
      "把Vim编辑模式、GCC编译流程与选项、GDB调试和Makefile规则串成从源文件到可诊断程序的Linux开发闭环。",
    invariant:
      "源文件、编译选项、头文件、目标文件、链接库和调试符号可追溯，Make依赖图与真实产物一致。",
    terms: [
      "Vim模式",
      "GCC编译流程",
      "GDB",
      "Makefile规则",
      "增量构建",
      "第5章 Linux 编程环境",
    ],
    chain: [
      "编辑源文件",
      "预处理与编译",
      "汇编与链接",
      "运行失败样本",
      "用GDB定位",
      "用Make固化依赖",
    ],
  },
  {
    slug: "lop-06-network-configuration",
    title: "第6章 Linux 网络配置",
    thesis:
      "以IP、子网掩码、网关和DNS建立网络模型，比较图形/命令配置，并部署TFTP、NFS与SSH服务。",
    invariant:
      "地址、前缀、路由、DNS、监听端口、导出目录和身份认证互相匹配，配置重启后按预期保留。",
    terms: [
      "IP地址",
      "子网掩码",
      "默认网关",
      "DNS",
      "TFTP/NFS/SSH",
      "第6章 Linux 网络配置",
    ],
    chain: [
      "采集接口状态",
      "计算同网段范围",
      "配置地址路由",
      "验证DNS解析",
      "启动网络服务",
      "端到端排障",
    ],
  },
  {
    slug: "lop-07-shell-programming",
    title: "第7章 Shell 编程",
    thesis:
      "从脚本头和执行方式进入变量、语句、函数、脚本调用，再用猜数字与石头剪刀布验证控制流和输入边界。",
    invariant:
      "变量引用安全、输入经过验证、错误状态可传播、临时资源有清理钩子，同一输入能重放。",
    terms: [
      "shebang",
      "Shell变量",
      "条件与循环",
      "Shell函数",
      "脚本调用",
      "第7章 Shell 编程",
    ],
    chain: [
      "声明解释器",
      "读取校验输入",
      "展开变量",
      "执行分支循环",
      "调用函数脚本",
      "检查状态并清理",
    ],
  },
  {
    slug: "lop-08-regular-expressions",
    title: "第8章 正则表达式",
    thesis:
      "从正则表达式起源和概念进入元字符、匹配规则及文本处理工具，明确模式语言、Shell引用和工具方言。",
    invariant:
      "模式方言、字符集、行边界与Shell引用明确，正负样本都通过后才用于批量修改。",
    terms: [
      "正则表达式",
      "元字符",
      "匹配规则",
      "grep",
      "文本处理流水线",
      "第8章 正则表达式",
    ],
    chain: [
      "定义文本样本",
      "选择正则方言",
      "写出匹配边界",
      "执行文本工具",
      "检查假阳假阴",
      "固化回归样本",
    ],
  },
  {
    slug: "lop-09-tetris-project",
    title: "第9章 项目实战：俄罗斯方块游戏",
    thesis:
      "以俄罗斯方块项目贯通背景、需求、功能设计、软件框架、终端核心技术、代码逻辑与最终效果。",
    invariant:
      "方块占用不越界不重叠，旋转和下落可预测，锁定/消行/计分状态转换只发生一次。",
    terms: [
      "需求分析",
      "棋盘模型",
      "方块旋转",
      "游戏循环",
      "项目验收",
      "第9章 项目实战：俄罗斯方块游戏",
    ],
    chain: [
      "冻结需求规则",
      "设计棋盘与方块",
      "解析输入时钟",
      "检测移动旋转",
      "消行计分绘制",
      "重放并验收",
    ],
  },
  {
    slug: "lop-official-final-review",
    title: "《Linux操作系统实战（Ubuntu）（慕课版）》全书总复习",
    thesis:
      "用可重建Ubuntu实验机和可重放俄罗斯方块项目串联身份、文件、软件包、编译调试、网络服务、Shell与正则证据。",
    invariant:
      "所有命令有预期退出码和副作用，配置可恢复，服务端到端可验证，项目在固定输入下得到相同状态轨迹。",
    terms: [
      "环境快照",
      "命令证据",
      "身份与依赖",
      "网络服务",
      "项目重放",
      "安装与命令",
    ],
    chain: [
      "恢复干净快照",
      "重建用户软件",
      "编译调试程序",
      "配置验证网络",
      "运行自动化脚本",
      "重放项目并审计",
    ],
  },
];

export const lopOfficialQuestions: ReviewQuestion[] = units.flatMap((unit) =>
  unit.terms.map(
    (term, index): ReviewQuestion => ({
      id: unit.slug + "-" + (index + 1),
      chapter: unit.slug,
      level: index < 2 ? 2 : index < 4 ? 3 : 4,
      question:
        unit.title +
        "：如何用“" +
        term +
        "”定位“" +
        unit.chain[index % unit.chain.length] +
        "”阶段的首个Linux状态分叉？",
      answer:
        unit.thesis +
        " 先固定Ubuntu快照、身份和输入，预测“" +
        term +
        "”在“" +
        unit.chain[index % unit.chain.length] +
        "”的命令、退出码和副作用；只改变一个条件并停在首错。通过条件是：" +
        unit.invariant +
        " 恢复后以同一输入重放并比较文件、账户、包、网络或项目状态。",
      tags: [term, unit.chain[index % unit.chain.length], "Linux操作系统实战"],
    }),
  ),
);
