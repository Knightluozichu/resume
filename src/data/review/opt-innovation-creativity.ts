import type { ReviewQuestion } from "@/data/review/types";

export const optInnovationCreativityQuestions: ReviewQuestion[] = [
  {
    id: "opt-ic-1",
    chapter: "opt-innovation-creativity",
    level: 1,
    question: `SCAMPER的七个动词分别是什么？`,
    answer:
      `SCAMPER七个动词：S（Substitute）替代——换材料/组件；C（Combine）合并——组合功能；A（Adapt）调整——修改适应新场景；M（Modify）修改——改变大小/形状/颜色等属性；P（Put to other use）其他用途——用于新场景；E（Eliminate）消除——删减简化；R（Rearrange/Reverse）重组/逆转——重排顺序或反向思考。七个动词从现有产品出发系统化触发七种创新路径。`,
    tags: ["SCAMPER", "奔驰法", "七动词", "创新路径"],
  },
  {
    id: "opt-ic-2",
    chapter: "opt-innovation-creativity",
    level: 2,
    question: `TRIZ理论中的「技术矛盾」是什么意思？它与普通的折中妥协有什么区别？`,
    answer:
      `技术矛盾是指改善一个参数导致另一个参数恶化——例如让产品更轻但强度下降。普通折中妥协是在两个参数间找平衡点（更轻但更脆弱），而TRIZ通过矛盾矩阵查表推荐40条发明原理，系统化消除矛盾而非妥协——例如用蜂窝结构同时实现更轻和更强。区别在于：折中接受矛盾存在，TRIZ通过创新原理让矛盾消失，实现双赢而非取舍。`,
    tags: ["TRIZ", "技术矛盾", "折中妥协", "40条原理"],
  },
  {
    id: "opt-ic-3",
    chapter: "opt-innovation-creativity",
    level: 2,
    question: `设计思维的五个阶段分别是什么？为什么「共情」是第一步？`,
    answer:
      `设计思维五阶段：共情（深入理解用户需求和痛点）、定义（聚焦核心问题）、构思（发散产生方案）、原型（快速制作低成本模型）、测试（验证假设并迭代）。共情是第一步因为：创新的价值在于解决真实用户问题，如果不先理解用户，后续所有阶段的努力可能方向全错。共情确保创新从用户真实需求出发而非技术人员的假设出发，避免「解决了不存在的问题」。`,
    tags: ["设计思维", "共情", "以人为本", "五阶段"],
  },
  {
    id: "opt-ic-4",
    chapter: "opt-innovation-creativity",
    level: 3,
    question: `思维导图如何帮助创新？它与线性笔记相比有什么优势？`,
    answer:
      `思维导图以核心主题为中心向外放射状展开分支，每个分支再继续细分。帮助创新的方式：①可视化呈现思维结构，让复杂关系一目了然；②放射状结构符合大脑联想思维模式，激发新连接；③允许同时看到全局和细节，发现隐藏的关联。与线性笔记相比的优势：线性笔记是单向序列，限制思维发散；思维导图是非线性网络，允许跳跃联想和自由扩展，更适合发散思考和创意生成。`,
    tags: ["思维导图", "放射状结构", "线性笔记", "可视化思维"],
  },
];
