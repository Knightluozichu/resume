import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "Introducing Kotlin",
  "1. Your First Kotlin Application",
  "2. Variables, Constants, and Types",
  "3. Conditionals",
  "4. Functions",
  "5. Anonymous Functions and the Function Type",
  "6. Null Safety and Exceptions",
  "7. Strings",
  "8. Numbers",
  "9. Standard Functions",
  "10. Lists and Sets",
  "11. Maps",
  "12. Defining Classes",
  "13. Initialization",
  "14. Inheritance",
  "15. Objects",
  "16. Interfaces and Abstract Classes",
  "17. Generics",
  "18. Extensions",
  "19. Functional Programming Basics",
  "20. Java Interoperability",
  "21. Building Your First Android Application with Kotlin",
  "22. Introduction to Coroutines",
  "23. Afterword",
  "A. More Challenges",
  "Glossary",
  "Index"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="《Kotlin编程权威指南》权威学习地图" focus="沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="《Kotlin编程权威指南》权威学习地图" focus="把23章压成几个主题页，或混入第二版与现代Android内容" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="《Kotlin编程权威指南》权威学习地图" focus="27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表" nodes={nodes} />; }
