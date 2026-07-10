// 题库数据
export interface Problem {
  id: string;
  title: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  grade: string; // '7' | '8' | '9' | '10' | '11' | '12'
  topic: string;
  tags: string[];
  answer?: string;
  hints: string[];
  solution: string;
  source?: string;
}

export const PROBLEMS: Problem[] = [
  {
    id: 'p001',
    title: '整数分解问题',
    content: '将正整数 $n = 2024$ 表示为若干个连续正整数之和，共有多少种不同的表示方法？',
    difficulty: 'medium',
    grade: '8',
    topic: '数论',
    tags: ['整数', '因数分解', '连续整数'],
    hints: [
      '设连续正整数从 $a$ 开始，共 $k$ 项，则其和为 $ka + \\frac{k(k-1)}{2}$',
      '整理得 $k(2a+k-1) = 2 \\times 2024$，分析 $k$ 的奇偶性',
      '当 $k$ 为奇数时，$k | 2 \\times 2024$；当 $k$ 为偶数时，需要 $\\frac{k}{2}$ 整除 $2024$',
    ],
    solution: '设连续正整数从 $a$ 开始，共 $k$ 项（$k \\geq 2$），则：\n$$2024 = ka + \\frac{k(k-1)}{2}$$\n整理得 $k(2a+k-1) = 4048$。\n\n由于 $2a+k-1$ 与 $k$ 奇偶性不同，需要分析 $4048 = 2^4 \\times 11 \\times 23$ 的因数对。\n\n满足条件的表示方法共有 **5 种**。',
    answer: '5',
    source: 'AMC 2024 改编',
  },
  {
    id: 'p002',
    title: '三角形面积最大值',
    content: '在平面直角坐标系中，点 $A(0, 3)$，点 $B$ 在 $x$ 轴正半轴上，点 $C$ 在直线 $y = x$ 上，且 $BC \\perp AB$。当三角形 $ABC$ 的面积最大时，求点 $B$ 的坐标。',
    difficulty: 'medium',
    grade: '9',
    topic: '解析几何',
    tags: ['坐标系', '垂直', '面积最大值'],
    hints: [
      '设 $B(b, 0)$，则 $AB$ 的斜率为 $\\frac{0-3}{b-0} = -\\frac{3}{b}$',
      '由 $BC \\perp AB$，$BC$ 的斜率为 $\\frac{b}{3}$',
      '求出 $C$ 的坐标后，用叉积公式计算面积，再对 $b$ 求导',
    ],
    solution: '设 $B(b, 0)$（$b > 0$），$AB$ 斜率为 $-3/b$，$BC$ 斜率为 $b/3$。\n\n直线 $BC$：$y = \\frac{b}{3}(x - b)$，与 $y = x$ 联立得 $C\\left(\\frac{b^2}{b-3}, \\frac{b^2}{b-3}\\right)$（$b \\neq 3$）。\n\n面积 $S = \\frac{1}{2}|AB||BC| = \\frac{1}{2} \\cdot \\sqrt{b^2+9} \\cdot \\frac{b\\sqrt{b^2+9}}{3(b-3)} = \\frac{b(b^2+9)}{6(b-3)}$\n\n对 $b$ 求导令其为零，解得 $b = 3 + 3\\sqrt{2}$，此时面积最大。\n\n所以 $B$ 的坐标为 $(3+3\\sqrt{2},\\ 0)$。',
    answer: '$(3+3\\sqrt{2}, 0)$',
    source: '联赛预选题',
  },
  {
    id: 'p003',
    title: '数列递推问题',
    content: '数列 $\\{a_n\\}$ 满足 $a_1 = 1$，$a_{n+1} = \\dfrac{a_n}{1 + 3a_n}$，求 $a_{2024}$ 的值。',
    difficulty: 'easy',
    grade: '10',
    topic: '数列',
    tags: ['递推数列', '倒数变换', '等差数列'],
    hints: [
      '令 $b_n = \\frac{1}{a_n}$，对递推式取倒数',
      '观察 $b_{n+1}$ 与 $b_n$ 的关系，发现等差数列',
      '求出 $b_n$ 的通项公式，再取倒数',
    ],
    solution: '令 $b_n = \\frac{1}{a_n}$，则 $b_1 = 1$。\n\n由 $a_{n+1} = \\frac{a_n}{1+3a_n}$ 取倒数：\n$$b_{n+1} = \\frac{1}{a_{n+1}} = \\frac{1+3a_n}{a_n} = b_n + 3$$\n\n所以 $\\{b_n\\}$ 是公差为 $3$ 的等差数列，$b_n = 1 + 3(n-1) = 3n - 2$。\n\n因此 $a_{2024} = \\dfrac{1}{b_{2024}} = \\dfrac{1}{3 \\times 2024 - 2} = \\dfrac{1}{6070}$。',
    answer: '$\\dfrac{1}{6070}$',
    source: '高中数学联赛',
  },
  {
    id: 'p004',
    title: '组合计数：路径问题',
    content: '在 $5 \\times 5$ 的方格棋盘上，从左下角 $(0,0)$ 出发，每步只能向右或向上走一格，到达右上角 $(5,5)$，要求路径不经过点 $(2,2)$ 和 $(3,3)$，共有多少种走法？',
    difficulty: 'hard',
    grade: '11',
    topic: '组合数学',
    tags: ['路径计数', '容斥原理', '格路'],
    hints: [
      '总路径数为 $\\binom{10}{5}$',
      '用容斥原理：经过 $(2,2)$ 的路径数 + 经过 $(3,3)$ 的路径数 - 同时经过两点的路径数',
      '经过某点 $(a,b)$ 的路径数 = 到该点的路径数 × 从该点出发的路径数',
    ],
    solution: '总路径数：$\\binom{10}{5} = 252$\n\n经过 $(2,2)$ 的路径：$\\binom{4}{2} \\times \\binom{6}{3} = 6 \\times 20 = 120$\n\n经过 $(3,3)$ 的路径：$\\binom{6}{3} \\times \\binom{4}{2} = 20 \\times 6 = 120$\n\n同时经过 $(2,2)$ 和 $(3,3)$ 的路径：$\\binom{4}{2} \\times \\binom{2}{1} \\times \\binom{4}{2} = 6 \\times 2 \\times 6 = 72$\n\n由容斥原理：$252 - 120 - 120 + 72 = \\mathbf{84}$',
    answer: '84',
    source: 'AIME 改编',
  },
  {
    id: 'p005',
    title: '不等式证明',
    content: '设正实数 $a, b, c$ 满足 $a + b + c = 1$，证明：$$\\frac{a}{b+c} + \\frac{b}{a+c} + \\frac{c}{a+b} \\geq \\frac{3}{2}$$',
    difficulty: 'easy',
    grade: '10',
    topic: '不等式',
    tags: ['均值不等式', '柯西不等式', '对称不等式'],
    hints: [
      '注意到 $\\frac{a}{b+c} = \\frac{a}{1-a}$，或者直接利用 $\\frac{a}{b+c} = \\frac{a}{1-a} \\geq \\frac{4a-1}{2}$（由 AM-GM）',
      '更简洁的方法：注意 $\\frac{a}{b+c} + 1 = \\frac{a+b+c}{b+c} = \\frac{1}{b+c}$，三式相加',
      '利用调和均值 $\\leq$ 算术均值',
    ],
    solution: '**证明：**\n\n注意到 $\\frac{a}{b+c} = \\frac{a}{1-a}$，因此：\n$$\\sum \\frac{a}{b+c} = \\sum \\frac{a}{1-a} = \\sum \\left(\\frac{1}{1-a} - 1\\right) = \\sum \\frac{1}{1-a} - 3$$\n\n由调和-算术均值不等式：\n$$\\frac{3}{\\frac{1}{1-a}+\\frac{1}{1-b}+\\frac{1}{1-c}} \\leq \\frac{(1-a)+(1-b)+(1-c)}{3} = \\frac{2}{3}$$\n\n故 $\\sum \\frac{1}{1-a} \\geq \\frac{9}{2}$，从而 $\\sum \\frac{a}{b+c} \\geq \\frac{9}{2} - 3 = \\frac{3}{2}$。$\\square$',
    answer: '证明题',
    source: '数学竞赛基础',
  },
  {
    id: 'p006',
    title: '圆与切线',
    content: '已知圆 $C: x^2 + y^2 - 4x + 2y - 4 = 0$，过点 $P(4, -1)$ 作圆的切线，求切线方程。',
    difficulty: 'easy',
    grade: '11',
    topic: '解析几何',
    tags: ['圆', '切线', '点到直线距离'],
    hints: [
      '先将圆化为标准形式，找到圆心和半径',
      '判断点 $P$ 是否在圆上（若在圆上，切线斜率由半径决定）',
      '若 $P$ 在圆外，设切线方程，利用圆心到切线距离等于半径',
    ],
    solution: '圆的标准形式：$(x-2)^2 + (y+1)^2 = 9$，圆心 $C(2,-1)$，半径 $r=3$。\n\n点 $P(4,-1)$ 代入：$(4-2)^2 + (-1+1)^2 = 4 \\neq 9$，$P$ 在圆外。\n\n注意到 $P(4,-1)$ 与圆心 $C(2,-1)$ 纵坐标相同，故 $PC$ 水平，切线之一为竖线 $x = 4$。\n\n设另一切线斜率为 $k$：$y+1 = k(x-4)$，即 $kx - y - 4k - 1 = 0$。\n\n圆心到切线距离等于半径：$\\frac{|2k-(-1)-4k-1|}{\\sqrt{k^2+1}} = 3$\n\n解得 $k = \\frac{3}{4}$，切线方程为 $3x - 4y - 16 = 0$。\n\n**两条切线**：$x = 4$ 和 $3x - 4y - 16 = 0$。',
    answer: '$x=4$ 和 $3x-4y-16=0$',
    source: '高考真题',
  },
];

export const TOPICS = ['全部', '数论', '代数', '几何', '组合数学', '解析几何', '数列', '不等式', '函数'];
export const GRADES = ['全部年级', '7年级', '8年级', '9年级', '10年级', '11年级', '12年级'];
export const DIFFICULTIES = [
  { value: 'easy', label: '基础', color: 'text-emerald-600 bg-emerald-50' },
  { value: 'medium', label: '提高', color: 'text-blue-600 bg-blue-50' },
  { value: 'hard', label: '竞赛', color: 'text-amber-600 bg-amber-50' },
  { value: 'expert', label: '奥赛', color: 'text-red-600 bg-red-50' },
];

// 订阅计划
export interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: '免费体验',
    price: 0,
    period: '永久免费',
    description: '适合初次了解，感受AI教练魅力',
    features: [
      '每日 3 道练习题',
      '基础知识点讲解',
      '答案查看',
      '社区讨论',
    ],
  },
  {
    id: 'pro',
    name: 'Pro 学员',
    price: 49,
    period: '每月',
    description: '适合备考 AMC/联赛的认真学生',
    features: [
      '无限量练习题',
      'AI 苏格拉底式引导',
      '智能打分 + 详细点评',
      '个性化学习路径',
      '错题本 & 知识图谱',
      '模拟考试 + 排名',
    ],
    highlight: true,
    badge: '最受欢迎',
  },
  {
    id: 'elite',
    name: '精英冲刺',
    price: 199,
    period: '每月',
    description: '适合冲击 AIME/USAMO 的顶尖学生',
    features: [
      '包含 Pro 全部功能',
      '名师每周直播答疑',
      '一对一 AI 深度辅导',
      'IMO 级别题库专区',
      '竞赛备考规划',
      '优先客服支持',
    ],
    badge: '冲击顶尖',
  },
];

// AI 对话模拟响应
export const AI_RESPONSES = {
  greeting: '你好！我是你的奥数AI教练 🎯 这道题考查的是{topic}的核心思想。先别急着看答案，我们一起来分析一下——',
  hint1: '很好的思路！我来给你一个提示：{hint}',
  hint2: '继续！你已经走对方向了。再想想：{hint}',
  correct: '🎉 太棒了！你答对了！你的解题过程非常清晰，特别是{praise}这一步，展示了很好的数学直觉。',
  incorrect: '思路不错，但这里有个小问题：{error}。不用灰心，我们来看看正确的推导方向——',
  encouragement: ['继续加油！每道难题都是成长的机会 💪', '很好！你的思维方式很有潜力 ✨', '这道题确实有挑战性，但你能行！🌟'],
};
