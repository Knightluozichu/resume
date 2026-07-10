import type { ReviewQuestion } from "./types";

/** Python编程：从入门到实践 · 数据可视化复习题 */
export const pccDataVizQuestions: ReviewQuestion[] = [
  {
    id: "pcc-data-viz-1",
    chapter: "pcc-data-viz",
    level: 1,
    question: `折线图、散点图、直方图、条形图分别适合展示什么？`,
    answer:
      `- **折线图**（plot）：展示趋势变化，特别是随时间的变化。例：月平均气温变化。\n- **散点图**（scatter）：展示两个变量之间的关系。例：身高与体重的关系。\n- **直方图**（hist）：展示数据分布（频率统计）。例：考试成绩的分布区间。\n- **条形图**（bar）：展示分类数据的数值对比。例：不同城市的 GDP 对比。\n\n选择依据：要展示什么关系？趋势→折线图，关系→散点图，分布→直方图，对比→条形图。选错类型会误导读者——比如用折线图连接不连续的分类数据，或用饼图展示超过 5 个分类。`,
    tags: ["图表类型", "折线图", "散点图"],
  },
  {
    id: "pcc-data-viz-2",
    chapter: "pcc-data-viz",
    level: 2,
    question: `Matplotlib 和 Plotly 各自适合什么场景？如何选择？`,
    answer:
      `**Matplotlib 适合**：静态高质量图表，用于论文、报告、出版物。优点是控制精细（每个元素可自定义）、输出格式多（PNG/PDF/SVG）、学术领域标准。缺点是无交互性。\n\n**Plotly 适合**：交互式图表，用于数据探索、Web 展示、仪表盘。优点是鼠标悬停看数值、缩放、筛选、导出 HTML。缺点是对出版级精细控制不如 Matplotlib。\n\n选择依据：\n- 需要打印或发表 → Matplotlib\n- 需要在浏览器交互探索 → Plotly\n- 需要地图投影 → Plotly（scatter_geo）\n- 需要精细排版控制 → Matplotlib\n\n实际项目常搭配使用：Plotly 快速探索数据，Matplotlib 生成出版级图表。`,
    tags: ["Matplotlib", "Plotly", "图表选择"],
  },
  {
    id: "pcc-data-viz-3",
    chapter: "pcc-data-viz",
    level: 3,
    question: `以下 API 调用代码有什么风险？如何改进？\n\`\`\`python\nresponse = requests.get(url)\ndata = response.json()\nprint(data[\"results\"])\n\`\`\``,
    answer:
      `风险：\n1. **网络异常**：requests.get() 可能因网络问题抛出 ConnectionError 或 Timeout\n2. **HTTP 错误**：服务器可能返回 404、500，但 response.json() 仍尝试解析错误页面\n3. **JSON 解析失败**：响应可能不是有效 JSON\n4. **键不存在**：data[\"results\"] 可能 KeyError\n\n改进：\n\`\`\`python\ntry:\n    response = requests.get(url, timeout=10)\n    response.raise_for_status()\n    data = response.json()\n    results = data.get(\"results\", [])\n    print(results)\nexcept requests.ConnectionError:\n    print(\"网络连接失败\")\nexcept requests.Timeout:\n    print(\"请求超时\")\nexcept requests.HTTPError as e:\n    print(f\"HTTP 错误: {e}\")\nexcept ValueError:\n    print(\"响应不是有效 JSON\")\n\`\`\`\n\n关键改进：加 timeout 防止无限等待，raise_for_status() 检查 HTTP 状态码，get() 安全取值避免 KeyError。`,
    tags: ["API", "异常处理", "requests"],
  },
  {
    id: "pcc-data-viz-4",
    chapter: "pcc-data-viz",
    level: 4,
    question: `描述从 API 获取数据到生成可视化图表的完整流程，每一步用到什么工具？`,
    answer:
      `完整流程：\n\n1. **API 请求**：用 \`requests.get(url, params=params)\` 发送 HTTP 请求获取数据。加 timeout 和 raise_for_status() 保证健壮性。\n\n2. **JSON 解析**：\`response.json()\` 将 JSON 响应解析为 Python 字典/列表。\n\n3. **数据提取**：用列表推导式或循环从解析后的数据中提取需要的字段。例如 \`mags = [eq[\"properties\"][\"mag\"] for eq in data[\"features\"]]\`\n\n4. **数据清洗**（可选）：用 pandas 处理缺失值、类型转换、过滤。\n\n5. **可视化**：\n   - Matplotlib：\`plt.plot()\`/\`plt.scatter()\`/\`plt.bar()\` 生成静态图表\n   - Plotly：\`px.scatter()\`/\`px.bar()\` 生成交互图表\n\n6. **展示/保存**：\`plt.show()\` 显示，\`plt.savefig()\` 保存图片，\`fig.write_html()\` 保存交互 HTML。\n\n每一步都可能出错——API 不可用、JSON 格式变化、数据缺失。需要 try-except 处理异常，确保流程健壮。`,
    tags: ["API", "数据流水线", "可视化流程"],
  },
];
