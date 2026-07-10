import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Brain, Zap, Trophy, Star, ArrowRight, CheckCircle2,
  BookOpen, Target, TrendingUp, MessageCircle, Award, Users
} from 'lucide-react';

// Design: Fresh Digital Space — emerald for action/growth, navy for knowledge, amber for achievement
// Math atmosphere: floating symbols + geometric lines + progress rings throughout

const FEATURES = [
  {
    icon: Brain,
    title: 'AI 苏格拉底式引导',
    desc: '不直接给答案，通过层层追问激发你的数学直觉，培养真正的解题能力。',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    icon: Target,
    title: '智能打分点评',
    desc: '每道题提交后，AI 从思路、步骤、表达三个维度给出详细评分和改进建议。',
    color: 'text-blue-800 bg-blue-50',
  },
  {
    icon: TrendingUp,
    title: '个性化学习路径',
    desc: '根据你的薄弱知识点，自动推荐最适合的下一道题，高效突破瓶颈。',
    color: 'text-blue-700 bg-blue-50',
  },
  {
    icon: BookOpen,
    title: '海量竞赛题库',
    desc: '涵盖 AMC、AIME、联赛、CMO 等各级竞赛真题，按知识点和难度精心分类。',
    color: 'text-blue-800 bg-blue-50',
  },
  {
    icon: MessageCircle,
    title: '24小时在线辅导',
    desc: '随时随地提问，AI 教练即时响应，不再受时间和地点限制。',
    color: 'text-emerald-700 bg-emerald-50',
  },
  {
    icon: Award,
    title: '竞赛备考规划',
    desc: '根据目标赛事和时间节点，制定科学的备考计划，稳步提升竞赛实力。',
    color: 'text-amber-600 bg-amber-50',
  },
];

const STATS = [
  { value: '10万+', label: '竞赛题目' },
  { value: '50万+', label: '学生使用' },
  { value: '98%', label: '好评率' },
  { value: '7-12', label: '覆盖年级' },
];

const TESTIMONIALS = [
  {
    name: '李同学',
    grade: '高二',
    avatar: '李',
    text: '用了两个月，AMC 10 从 90 分提升到 130 分！AI 教练的引导方式让我真正理解了每道题背后的思想。',
    stars: 5,
  },
  {
    name: '王同学',
    grade: '初三',
    avatar: '王',
    text: '以前做几何题总是没思路，现在 AI 教练会一步步引导我，感觉自己的逻辑能力提升了很多。',
    stars: 5,
  },
  {
    name: '张同学',
    grade: '高一',
    avatar: '张',
    text: '联赛备考神器！题库质量很高，AI 点评非常专业，比很多补习班老师讲得还清楚。',
    stars: 5,
  },
];

const SAMPLE_PROBLEMS = [
  { topic: '数论', title: '整数分解问题', difficulty: '提高', grade: '初二' },
  { topic: '不等式', title: 'AM-GM 不等式应用', difficulty: '基础', grade: '高一' },
  { topic: '组合数学', title: '路径计数问题', difficulty: '竞赛', grade: '高二' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Math atmosphere layer — floating symbols + geometric construction lines */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {['∑', 'π', '∞', '∫', '√', '∂', 'Δ', '∈', 'φ', 'θ'].map((sym, i) => (
          <span
            key={i}
            className="math-bg-symbol"
            style={{
              top: `${8 + (i * 9) % 82}%`,
              left: `${3 + (i * 11) % 92}%`,
              fontSize: `${2.5 + (i % 4) * 0.8}rem`,
              opacity: 0.035 + (i % 3) * 0.015,
              transform: `rotate(${(i * 13) % 28 - 14}deg)`,
              fontFamily: "'Noto Serif SC', serif",
            }}
          >
            {sym}
          </span>
        ))}
        {/* Geometric construction lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.025 }}>
          <line x1="5%" y1="20%" x2="25%" y2="40%" stroke="#10B981" strokeWidth="1" />
          <line x1="75%" y1="10%" x2="95%" y2="35%" stroke="#1E40AF" strokeWidth="1" />
          <circle cx="15%" cy="60%" r="40" fill="none" stroke="#10B981" strokeWidth="1" />
          <polygon points="80%,70% 90%,85% 70%,85%" fill="none" stroke="#1E40AF" strokeWidth="1" />
          <line x1="40%" y1="85%" x2="60%" y2="95%" stroke="#F59E0B" strokeWidth="1" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6 animate-fade-in-up">
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1 text-sm font-medium">
                <Sparkle className="w-3.5 h-3.5 mr-1.5" />
                AI 驱动 · 名师监督 · 竞赛专属
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-foreground">
                你的专属
                <span className="gradient-text block">奥数AI教练</span>
                24小时在线辅导
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                面向 <strong className="text-foreground">7-12年级</strong> 竞赛生，AI 教练用苏格拉底式引导帮你真正理解数学，而不只是背答案。智能打分、即时点评、个性化路径。
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/practice">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all gap-2 text-base px-6">
                    开始今日挑战
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="gap-2 text-base px-6 border-border hover:bg-accent">
                    查看订阅计划
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {['A', 'B', 'C', 'D'].map((l) => (
                    <div key={l} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center text-xs font-bold text-primary">
                      {l}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">50万+</strong> 学生正在使用
                </p>
              </div>
            </div>

            {/* Right: Hero illustration */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/manus-storage/hero-illustration_daf5ec01.png"
                  alt="奥数AI教练插图"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating cards */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-border flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">本周完成</div>
                  <div className="text-sm font-bold text-foreground">42 道题</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-border flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Trophy size={18} className="text-amber-600" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">综合评分</div>
                  <div className="text-sm font-bold text-foreground">92 / 100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — emerald/navy color discipline */}
      <section className="py-12 bg-gradient-to-r from-emerald-50/60 via-blue-50/40 to-emerald-50/60 border-y border-border/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label }, i) => (
              <div key={label} className="text-center">
                <div
                  className="text-3xl font-bold mb-1"
                  style={{
                    fontFamily: "'Noto Serif SC', serif",
                    color: i % 2 === 0 ? '#10B981' : '#1E40AF',
                  }}
                >
                  {value}
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Problems */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="bg-blue-50 text-blue-700 border-blue-200 mb-3">精选题目</Badge>
            <h2 className="text-3xl font-bold text-foreground">今日推荐练习</h2>
            <p className="text-muted-foreground mt-2">根据你的水平智能推荐，每天更新</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {SAMPLE_PROBLEMS.map((p, i) => (
              <Link key={i} href="/practice">
                <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-border hover:border-primary/30">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="text-xs">{p.topic}</Badge>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        p.difficulty === '基础' ? 'bg-emerald-50 text-emerald-700' :
                        p.difficulty === '提高' ? 'bg-blue-50 text-blue-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>{p.difficulty}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{p.grade}</span>
                      <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/practice">
              <Button variant="outline" className="gap-2">
                查看全部题目 <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features — with math atmosphere layer */}
      <section className="py-16 bg-gray-50/80 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute right-0 top-0 w-64 h-64 opacity-[0.03]" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#1E40AF" strokeWidth="2" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="#1E40AF" strokeWidth="1" />
            <line x1="100" y1="20" x2="100" y2="180" stroke="#1E40AF" strokeWidth="1" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="#10B981" strokeWidth="1.5" />
          </svg>
          <svg className="absolute left-0 bottom-0 w-48 h-48 opacity-[0.03]" viewBox="0 0 150 150">
            <polygon points="75,10 140,130 10,130" fill="none" stroke="#10B981" strokeWidth="2" />
            <line x1="75" y1="10" x2="75" y2="130" stroke="#F59E0B" strokeWidth="1" />
          </svg>
        </div>
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-3">核心功能</Badge>
            <h2 className="text-3xl font-bold text-foreground">为什么选择奥数AI教练？</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              结合顶尖数学教师的教学经验与最新AI技术，打造真正有效的竞赛辅导体验
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
              <Card
                key={title}
                className="border-0 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white shadow-sm"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color} shadow-sm`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-base">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  <div className="mt-4 flex items-center gap-1">
                    <div className="h-0.5 w-8 rounded-full bg-primary/30" />
                    <div className="h-0.5 w-3 rounded-full bg-primary/15" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">使用流程</Badge>
            <h2 className="text-3xl font-bold text-foreground">三步开始你的奥数之旅</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
              { step: '01', title: '选择题目', desc: '按年级、知识点、难度筛选，或让AI为你智能推荐', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              { step: '02', title: 'AI陪你拆题', desc: '遇到困难时，AI教练通过追问引导你找到解题突破口', color: 'bg-blue-50 text-blue-800 border-blue-200' },
              { step: '03', title: '获得深度点评', desc: '提交答案后，AI即时打分并给出思路、步骤、表达三维评价', color: 'bg-amber-50 text-amber-700 border-amber-200' },
            ].map(({ step, title, desc, color }) => (
              <div key={step} className="text-center group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 ${color} shadow-sm group-hover:shadow-md transition-shadow`}>
                  <span className="text-2xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                    {step}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-gray-50/80 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-purple-50 text-purple-700 border-purple-200 mb-3">学员反馈</Badge>
            <h2 className="text-3xl font-bold text-foreground">他们这样评价奥数AI教练</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, grade, avatar, text, stars }) => (
              <Card key={name} className="border-border bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                      {avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{name}</div>
                      <div className="text-xs text-muted-foreground">{grade}学生</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — strong brand close */}
      <section className="py-20 bg-gradient-to-br from-emerald-50/60 via-blue-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-10 top-10 w-32 h-32 rounded-full border-2 border-emerald-200/40" />
          <div className="absolute right-20 top-20 w-16 h-16 rounded-full border border-blue-200/30" />
          <div className="absolute left-10 bottom-10 text-6xl font-bold text-blue-100/60" style={{ fontFamily: "'Noto Serif SC', serif" }}>∑</div>
        </div>
        <div className="container text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-emerald-700 font-medium">今日已有 1,284 名学生完成练习</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            让AI陪你拆解每道难题
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            免费体验 3 道题，感受苏格拉底式引导的魅力。无需信用卡，随时取消。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/practice">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-md gap-2 text-base px-8">
                开始今日挑战 <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="gap-2 text-base px-8 border-border bg-white/80">
                查看订阅方案
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">∑</span>
              </div>
              <span className="font-semibold text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                奥数AI教练
              </span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/practice"><span className="hover:text-foreground transition-colors">练习</span></Link>
              <Link href="/pricing"><span className="hover:text-foreground transition-colors">订阅</span></Link>
              <span className="hover:text-foreground transition-colors cursor-pointer">关于我们</span>
              <span className="hover:text-foreground transition-colors cursor-pointer">隐私政策</span>
            </div>
            <p className="text-xs text-muted-foreground">© 2025 奥数AI教练. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Inline sparkle icon
function Sparkle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}
