import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Brain, Send, Lightbulb, CheckCircle2, XCircle, Star,
  ChevronRight, RotateCcw, BookOpen, Trophy, Filter, Loader2
} from 'lucide-react';
import { PROBLEMS, TOPICS, GRADES, DIFFICULTIES, type Problem } from '@/lib/data';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ScoreResult {
  total: number;
  breakdown: { label: string; score: number; max: number; comment: string }[];
  overall: string;
  improvement: string;
}

const HINT_STAGES = [0, 1, 2]; // 0 = no hint shown, 1 = hint1, 2 = hint2

function renderMath(text: string) {
  // Simple inline math rendering using spans (KaTeX would be loaded globally)
  return text.replace(/\$([^$]+)\$/g, '<span class="font-mono text-blue-700 bg-blue-50 px-1 rounded text-sm">$1</span>');
}

function MathContent({ content }: { content: string }) {
  return (
    <div
      className="leading-relaxed"
      dangerouslySetInnerHTML={{ __html: renderMath(content) }}
    />
  );
}

function ScoreRing({ score, max = 100 }: { score: number; max?: number }) {
  const pct = score / max;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);
  const color = pct >= 0.85 ? '#10B981' : pct >= 0.6 ? '#F59E0B' : '#EF4444';

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#E5E7EB" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.23,1,0.32,1)' }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-xl font-bold" style={{ color }}>{score}</div>
        <div className="text-xs text-muted-foreground">/{max}</div>
      </div>
    </div>
  );
}

function ProblemCard({ problem, onSelect, isSelected }: { problem: Problem; onSelect: () => void; isSelected: boolean }) {
  const diff = DIFFICULTIES.find(d => d.value === problem.difficulty);
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-white hover:border-primary/40'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs text-muted-foreground">{problem.topic}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${diff?.color || ''}`}>
          {diff?.label}
        </span>
      </div>
      <p className="text-sm font-medium text-foreground line-clamp-2">{problem.title}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs text-muted-foreground">{problem.grade}年级</span>
        {problem.source && (
          <span className="text-xs text-muted-foreground">· {problem.source}</span>
        )}
      </div>
    </button>
  );
}

export default function Practice() {
  const [selectedProblem, setSelectedProblem] = useState<Problem>(PROBLEMS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hintStage, setHintStage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [filterTopic, setFilterTopic] = useState('全部');
  const [filterGrade, setFilterGrade] = useState('全部年级');
  const [filterDiff, setFilterDiff] = useState('全部');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initialize chat when problem changes
  useEffect(() => {
    setMessages([{
      role: 'ai',
      content: `你好！我是你的奥数AI教练 🎯\n\n这道题考查的是**${selectedProblem.topic}**的核心思想。先别急着看答案，我们一起来分析一下——\n\n你对这道题有什么初步想法吗？可以从题目条件开始说说你的思路。`,
      timestamp: new Date(),
    }]);
    setHintStage(0);
    setSubmitted(false);
    setUserAnswer('');
    setScoreResult(null);
    setShowSolution(false);
    setUserInput('');
  }, [selectedProblem]);

  const filteredProblems = PROBLEMS.filter(p => {
    if (filterTopic !== '全部' && p.topic !== filterTopic) return false;
    if (filterGrade !== '全部年级' && p.grade !== filterGrade.replace('年级', '')) return false;
    if (filterDiff !== '全部' && p.difficulty !== filterDiff) return false;
    return true;
  });

  const simulateAIResponse = (userMsg: string): string => {
    const lower = userMsg.toLowerCase();
    if (lower.includes('不会') || lower.includes('没思路') || lower.includes('帮我')) {
      return `别担心！每道难题都是成长的机会 💪\n\n让我给你一个方向：${selectedProblem.hints[0]}\n\n你能根据这个提示，写出第一步吗？`;
    }
    if (lower.includes('提示') || lower.includes('hint')) {
      if (hintStage < selectedProblem.hints.length) {
        return `好的，这里有一个提示：\n\n**提示 ${hintStage + 1}**：${selectedProblem.hints[hintStage]}\n\n试着根据这个提示继续推导，看看能走多远？`;
      }
      return '你已经用完了所有提示！现在试着综合这些线索，写出你的完整解答吧。';
    }
    if (lower.includes('答案') || lower.includes('解答')) {
      return '我理解你想看答案，但直接看答案会让你失去独立思考的机会！\n\n不如先把你目前的想法写出来，哪怕不完整也没关系，我来帮你分析哪里卡住了 😊';
    }
    const responses = [
      `很好的思路！你提到了"${userMsg.slice(0, 15)}..."，这个方向是对的。\n\n接下来，你能告诉我为什么这样做吗？数学需要严格的逻辑推导，不只是直觉。`,
      `嗯，我看到你的想法了。让我问你一个问题：\n\n如果把条件稍微改变一下，你的方法还适用吗？这能帮助你判断思路是否足够通用。`,
      `思路不错！不过有一个细节需要注意：你有没有考虑到所有的情况？数学竞赛题往往有边界条件需要特别处理。`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const msg = userInput.trim();
    setUserInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg, timestamp: new Date() }]);
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    const aiReply = simulateAIResponse(msg);
    setMessages(prev => [...prev, { role: 'ai', content: aiReply, timestamp: new Date() }]);
    setIsTyping(false);
  };

  const handleGetHint = () => {
    if (hintStage >= selectedProblem.hints.length) {
      toast.info('已显示全部提示');
      return;
    }
    const hint = selectedProblem.hints[hintStage];
    setMessages(prev => [...prev, {
      role: 'ai',
      content: `💡 **提示 ${hintStage + 1}**：${hint}`,
      timestamp: new Date(),
    }]);
    setHintStage(prev => prev + 1);
  };

  const generateScore = (answer: string): ScoreResult => {
    const hasAnswer = answer.trim().length > 20;
    const hasSteps = answer.includes('=') || answer.includes('所以') || answer.includes('因此') || answer.includes('故');
    const baseScore = hasAnswer ? (hasSteps ? 75 + Math.floor(Math.random() * 20) : 50 + Math.floor(Math.random() * 20)) : 20;

    return {
      total: Math.min(100, baseScore),
      breakdown: [
        { label: '解题思路', score: Math.min(30, Math.floor(baseScore * 0.3)), max: 30, comment: hasSteps ? '思路清晰，逻辑连贯' : '思路有待完善，需要更系统的推导' },
        { label: '推导过程', score: Math.min(40, Math.floor(baseScore * 0.4)), max: 40, comment: hasAnswer ? '步骤基本完整' : '推导过程需要更详细' },
        { label: '最终答案', score: Math.min(20, Math.floor(baseScore * 0.2)), max: 20, comment: '答案格式规范' },
        { label: '表达清晰', score: Math.min(10, Math.floor(baseScore * 0.1)), max: 10, comment: '数学语言使用较好' },
      ],
      overall: baseScore >= 85 ? '优秀！你的解题能力很强，继续保持！' :
               baseScore >= 65 ? '良好！思路正确，细节上还可以打磨。' :
               '继续努力！这道题的关键在于找到正确的突破口。',
      improvement: baseScore >= 85
        ? '建议尝试更高难度的题目，挑战自己的极限。'
        : '建议复习相关知识点，多做同类型题目巩固。',
    };
  };

  const handleSubmit = async () => {
    if (!userAnswer.trim()) {
      toast.error('请先填写你的解答');
      return;
    }
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1500));
    const score = generateScore(userAnswer);
    setScoreResult(score);
    setSubmitted(true);
    setIsTyping(false);
    const emoji = score.total >= 85 ? '🎉' : score.total >= 65 ? '👍' : '💪';
    setMessages(prev => [...prev, {
      role: 'ai',
      content: `${emoji} 我已经评阅了你的解答！\n\n**综合得分：${score.total}/100**\n\n${score.overall}\n\n${score.improvement}`,
      timestamp: new Date(),
    }]);
  };

  const handleReset = () => {
    setSelectedProblem(PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)]);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-16">
      <div className="container py-6">
        <div className="grid lg:grid-cols-[280px_1fr_360px] gap-5 h-[calc(100vh-5rem)]">

          {/* Left: Problem List */}
          <div className="flex flex-col gap-3 overflow-hidden">
            <div className="bg-white rounded-xl border border-border p-3 shadow-sm">
              <h2 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                <Filter size={14} className="text-primary" /> 筛选题目
              </h2>
              <div className="space-y-2">
                <Select value={filterTopic} onValueChange={setFilterTopic}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="知识点" />
                  </SelectTrigger>
                  <SelectContent>
                    {TOPICS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filterGrade} onValueChange={setFilterGrade}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="年级" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filterDiff} onValueChange={setFilterDiff}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="难度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="全部">全部难度</SelectItem>
                    {DIFFICULTIES.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
              {filteredProblems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  暂无符合条件的题目
                </div>
              ) : (
                filteredProblems.map(p => (
                  <ProblemCard
                    key={p.id}
                    problem={p}
                    onSelect={() => setSelectedProblem(p)}
                    isSelected={selectedProblem.id === p.id}
                  />
                ))
              )}
            </div>
          </div>

          {/* Center: Problem + Answer */}
          <div className="flex flex-col gap-4 overflow-hidden">
            {/* Problem display */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{selectedProblem.topic}</Badge>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        DIFFICULTIES.find(d => d.value === selectedProblem.difficulty)?.color || ''
                      }`}>
                        {DIFFICULTIES.find(d => d.value === selectedProblem.difficulty)?.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{selectedProblem.grade}年级</span>
                    </div>
                    <CardTitle className="text-base">{selectedProblem.title}</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground shrink-0">
                    <RotateCcw size={14} className="mr-1" /> 换题
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-xl p-4 border border-border/50">
                  <MathContent content={selectedProblem.content} />
                </div>
                {selectedProblem.source && (
                  <p className="text-xs text-muted-foreground mt-2">来源：{selectedProblem.source}</p>
                )}
              </CardContent>
            </Card>

            {/* Answer area */}
            <Card className="border-border shadow-sm flex-1 flex flex-col overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen size={15} className="text-primary" />
                  写下你的解答
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-3 overflow-hidden">
                <Textarea
                  placeholder="在这里写下你的解题过程和答案...&#10;&#10;提示：写出完整的推导步骤，AI会根据思路、过程和答案三个维度给你打分。"
                  value={userAnswer}
                  onChange={e => setUserAnswer(e.target.value)}
                  disabled={submitted}
                  className="flex-1 min-h-[120px] resize-none text-sm font-mono"
                />

                {!submitted ? (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGetHint}
                      disabled={hintStage >= selectedProblem.hints.length}
                      className="gap-1.5 text-amber-700 border-amber-200 bg-amber-50 hover:bg-amber-100"
                    >
                      <Lightbulb size={14} />
                      获取提示 ({hintStage}/{selectedProblem.hints.length})
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSubmit}
                      disabled={isTyping || !userAnswer.trim()}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white gap-1.5"
                    >
                      {isTyping ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                      提交答案 · 获取评分
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSolution(!showSolution)}
                    className="gap-1.5"
                  >
                    <BookOpen size={14} />
                    {showSolution ? '收起' : '查看'}标准解析
                  </Button>
                )}

                {showSolution && (
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-sm">
                    <h4 className="font-semibold text-blue-800 mb-2">📖 标准解析</h4>
                    <MathContent content={selectedProblem.solution} />
                    {selectedProblem.answer && (
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <span className="font-semibold text-blue-800">最终答案：</span>
                        <MathContent content={selectedProblem.answer} />
                      </div>
                    )}
                  </div>
                )}

                {/* Score result */}
                {scoreResult && (
                  <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <ScoreRing score={scoreResult.total} />
                      <div>
                        <div className="font-semibold text-foreground mb-1">
                          {scoreResult.total >= 85 ? '🎉 优秀' : scoreResult.total >= 65 ? '👍 良好' : '💪 继续努力'}
                        </div>
                        <p className="text-sm text-muted-foreground">{scoreResult.overall}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {scoreResult.breakdown.map(({ label, score, max, comment }) => (
                        <div key={label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">{label}</span>
                            <span className="font-medium text-foreground">{score}/{max}</span>
                          </div>
                          <Progress value={(score / max) * 100} className="h-1.5" />
                          <p className="text-xs text-muted-foreground mt-0.5">{comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: AI Chat */}
          <div className="flex flex-col bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-blue-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                  <Brain size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">AI 数学教练</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">在线 · 随时解答</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Brain size={14} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'ai'
                        ? 'bg-gray-50 border border-border text-foreground'
                        : 'bg-primary text-white'
                    }`}
                    style={{ whiteSpace: 'pre-wrap' }}
                    dangerouslySetInnerHTML={{
                      __html: msg.role === 'ai'
                        ? renderMath(msg.content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'))
                        : msg.content
                    }}
                  />
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Brain size={14} className="text-primary" />
                  </div>
                  <div className="bg-gray-50 border border-border rounded-xl px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <Textarea
                  placeholder="向AI教练提问..."
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 min-h-[40px] max-h-[120px] resize-none text-sm"
                  rows={1}
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={isTyping || !userInput.trim()}
                  className="self-end bg-primary hover:bg-primary/90 text-white px-3"
                >
                  <Send size={14} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 text-center">
                Enter 发送 · Shift+Enter 换行
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
