import type { ReviewQuestion } from "./types";

/** 网页抓取 复习题 */
export const popWebScrapingQuestions: ReviewQuestion[] = [
  {
    id: "pop-web-scraping-1",
    chapter: "pop-web-scraping",
    level: 1,
    question: `requests + BeautifulSoup 爬虫的四阶段管道是什么？各阶段职责是什么？`,
    answer: `四阶段为：1) 请求阶段——用 requests 获取 HTML 原文，处理超时重试和编码；2) 解析阶段——用 BeautifulSoup 将 HTML 解析为可查询的 DOM 树；3) 清洗阶段——用 find/select 提取目标节点，去除空白标签噪声；4) 存储阶段——将清洗后的结构化数据写入 CSV/JSON/数据库。四阶段解耦，每阶段可独立测试和替换。`,
    tags: ["爬虫管道", "BeautifulSoup", "基础"],
  },
  {
    id: "pop-web-scraping-2",
    chapter: "pop-web-scraping",
    level: 2,
    question: `礼貌爬虫的三要点是什么？为什么爬虫必须遵守 robots.txt 和控制请求频率？`,
    answer: `三要点是：1) 遵守 robots.txt——尊重站点声明的禁止抓取路径；2) 控制频率——加延时（如 1-2 秒/请求）避免压垮服务器；3) 伪装 UA 和标识——用真实 User-Agent 并可留联系方式。原因：高频请求等同于 DoS 攻击，会导致目标服务器过载、IP 被封甚至法律风险；robots.txt 是站点所有者的明确意愿，违反可能构成侵权。礼貌爬虫是长期稳定采集的前提。`,
    tags: ["robots.txt", "频率控制", "礼仪", "生产实践"],
  },
  {
    id: "pop-web-scraping-3",
    chapter: "pop-web-scraping",
    level: 3,
    question: `请编写一个从新闻列表页提取标题、链接和发布时间的爬虫函数，要求处理缺失字段和编码问题。`,
    answer: `\`\`\`python\nimport requests\nfrom bs4 import BeautifulSoup\n\ndef scrape_news(url, timeout=10):\n    resp = requests.get(url, timeout=timeout,\n                        headers={'User-Agent': 'Mozilla/5.0'})\n    resp.encoding = resp.apparent_encoding  # 自动修正编码\n    soup = BeautifulSoup(resp.text, 'html.parser')\n    results = []\n    for item in soup.select('div.news-item'):\n        title_tag = item.select_one('h3.title a')\n        time_tag = item.select_one('span.date')\n        if not title_tag:\n            continue  # 跳过无标题项\n        results.append({\n            'title': title_tag.get_text(strip=True),\n            'link': title_tag.get('href', ''),\n            'time': time_tag.get_text(strip=True) if time_tag else 'N/A'\n        })\n    return results\n\`\`\`\n\n要点：apparent_encoding 修正乱码，select_one 返回 None 时跳过，get_text(strip=True) 去空白，缺失字段给默认值。`,
    tags: ["BeautifulSoup", "select", "编码处理", "代码编写"],
  },
  {
    id: "pop-web-scraping-4",
    chapter: "pop-web-scraping",
    level: 4,
    question: `面对动态加载（JS 渲染）的网页和反爬机制，如何选择爬虫技术栈并设计容错策略？`,
    answer: `需分层决策：1) 静态 HTML 优先 requests+BeautifulSoup，轻量快速；2) 动态内容若数据在 XHR 接口里，直接抓接口 JSON 更高效，需分析 Network 面板找真实 API；3) 必须渲染 JS 时用 Playwright/Selenium 无头浏览器，重量级但通用；4) 反爬应对：IP 轮换代理池、UA 随机化、Cookie/Session 维持、验证码识别或人工介入；5) 容错策略：单页失败重试+跳过、断点续爬记录进度、增量爬取对比去重、数据校验防脏数据。核心权衡是通用性 vs 速度——无头浏览器最通用但最慢，接口直抓最快但需逆向分析。`,
    tags: ["动态渲染", "反爬", "Playwright", "架构设计", "综合"],
  },
];
