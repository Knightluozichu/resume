import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-04-02",
  title: "4.2 Build的演进之路",
  family: "engineering",
  nodes: ["读取项目模型", "解析依赖", "执行阶段", "运行验证", "生成产物"],
  concepts: [
    "4.2 Build的演进之路",
    "手工Build的烦恼",
    "自动化Build",
    "Java 与 XML",
    "消除重复",
  ],
  mechanism:
    "构建系统把源文件、生成步骤、依赖与产物声明成有向无环图；Maven 以生命周期、插件和依赖坐标复用构建约定",
  success: "4.2 Build的演进之路 的输入、机制、输出与复位轨迹一致",
  failure:
    "4.2 Build的演进之路 在“构建脚本依赖开发机未声明的文件或环境变量，干净环境无法重现产物”处拒绝",
} as const;

export function Crv18Section0402Lab() {
  return <CoderMechanismLab {...profile} />;
}
