"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Check, ChevronRight, Zap, MessageCircle, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type Screen = "entry" | "verification" | "questions" | "analyzing" | "result"

interface Answer {
  questionId: number
  answer: string
}

const questions = [
  {
    id: 1,
    section: "IDENTITY",
    question: "What should we call you?",
    type: "input" as const,
    placeholder: "Enter your name",
    field: "name",
  },
  {
    id: 2,
    section: "IDENTITY",
    question: "Your phone number?",
    type: "phone" as const,
    placeholder: "Enter your phone number",
    field: "phone",
  },
  {
    id: 3,
    section: "IDENTITY",
    question: "Your age?",
    type: "options" as const,
    options: ["18–21", "22–25", "26–30", "30+"],
    field: "age",
  },
  {
    id: 4,
    section: "IDENTITY",
    question: "What do you currently do?",
    type: "options" as const,
    options: ["Student", "Job", "Business", "Other"],
    field: "occupation",
  },
  {
    id: 5,
    section: "TRADING REALITY",
    question: "How long have you been trading?",
    type: "options" as const,
    options: ["Just started", "0–1 year", "1–2 years", "2+ years"],
    field: "trading_experience",
  },
  {
    id: 6,
    section: "TRADING REALITY",
    question: "What is your current capital?",
    type: "options" as const,
    options: ["Below ₹10,000", "₹10,000 – ₹50,000", "₹50,000 – ₹2L", "₹2L+"],
    field: "current_capital",
  },
  {
    id: 7,
    section: "PAIN",
    question: "Be honest… are you currently in profit or loss?",
    type: "options" as const,
    options: ["Profit", "Break-even", "Loss"],
    field: "profit_loss_status",
  },
  {
    id: 8,
    section: "PAIN",
    question: "How much have you roughly lost so far?",
    type: "options" as const,
    options: ["₹0–₹5,000", "₹5,000–₹20,000", "₹20,000–₹50,000", "₹50,000+"],
    field: "total_loss",
  },
  {
    id: 9,
    section: "PAIN",
    question: "What hurts you the most right now?",
    type: "options" as const,
    options: ["Taking wrong entries", "Hitting SL again and again", "Overtrading", "Fear / hesitation", "No proper strategy"],
    field: "biggest_pain",
  },
  {
    id: 10,
    section: "BEHAVIOR",
    question: "How do you currently trade?",
    type: "options" as const,
    options: ["Signals", "Self analysis", "Random entries"],
    field: "trading_method",
  },
  {
    id: 11,
    section: "BEHAVIOR",
    question: "Do you follow proper risk management?",
    type: "options" as const,
    options: ["Yes", "Sometimes", "No"],
    field: "risk_management",
  },
  {
    id: 12,
    section: "COMMITMENT",
    question: "Is this serious capital for you?",
    type: "options" as const,
    options: ["Yes, very important", "Somewhat", "Just testing"],
    field: "capital_importance",
  },
  {
    id: 13,
    section: "COMMITMENT",
    question: "How many trades do you take daily?",
    type: "options" as const,
    options: ["1–2", "3–5", "5+"],
    field: "daily_trades",
  },
  {
    id: 14,
    section: "DESIRE",
    question: "What is your goal from trading?",
    type: "options" as const,
    options: ["Side income", "Replace income", "Pass prop firm", "Grow account"],
    field: "trading_goal",
  },
  {
    id: 15,
    section: "DESIRE",
    question: "Do you want structured signals with clear Entry, SL & TP?",
    type: "options" as const,
    options: ["Yes", "No"],
    field: "wants_structured_signals",
  },
  {
    id: 16,
    section: "CLOSE",
    question: "Do you want live support while trading?",
    type: "options" as const,
    options: ["Yes", "No"],
    highlight: "Yes",
    field: "wants_live_support",
  },
]

const analyzingTexts = [
  "Analyzing your trading behavior...",
  "Identifying weaknesses...",
  "Calculating risk profile...",
  "Matching you with optimal strategy...",
  "Customizing your plan...",
]

export default function AnalysisPage() {
  const [screen, setScreen] = useState<Screen>("entry")
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [inputValue, setInputValue] = useState("")
  const [analyzingIndex, setAnalyzingIndex] = useState(0)
  const [analyzingProgress, setAnalyzingProgress] = useState(0)
  const [showExitPopup, setShowExitPopup] = useState(false)

  const userName = answers.find((a) => a.questionId === 1)?.answer || "Trader"

  // Save quiz responses to Supabase
  const saveQuizResponses = useCallback(async () => {
    const supabase = createClient()
    
    const responseData: Record<string, string> = {}
    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId)
      if (question?.field) {
        responseData[question.field] = answer.answer
      }
    })

    try {
      await supabase.from("quiz_responses").insert([responseData])
    } catch (error) {
      console.error("Error saving quiz responses:", error)
    }
  }, [answers])

  // Entry screen loading
  useEffect(() => {
    if (screen === "entry") {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => setScreen("verification"), 300)
            return 100
          }
          return prev + 2
        })
      }, 40)
      return () => clearInterval(interval)
    }
  }, [screen])

  // Verification screen delay
  useEffect(() => {
    if (screen === "verification") {
      const timeout = setTimeout(() => {
        setScreen("questions")
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [screen])

  // Analyzing screen animation and save to Supabase
  useEffect(() => {
    if (screen === "analyzing") {
      // Save responses when analyzing starts
      saveQuizResponses()

      const textInterval = setInterval(() => {
        setAnalyzingIndex((prev) => (prev + 1) % analyzingTexts.length)
      }, 2500)

      const progressInterval = setInterval(() => {
        setAnalyzingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            clearInterval(textInterval)
            setTimeout(() => setScreen("result"), 500)
            return 100
          }
          return prev + 0.8
        })
      }, 120)

      return () => {
        clearInterval(textInterval)
        clearInterval(progressInterval)
      }
    }
  }, [screen, saveQuizResponses])

  // Handle back/refresh/leave detection for exit popup
  useEffect(() => {
    if (screen === "result") {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault()
        setShowExitPopup(true)
      }

      const handlePopState = () => {
        setShowExitPopup(true)
        window.history.pushState(null, "", window.location.href)
      }

      window.history.pushState(null, "", window.location.href)
      window.addEventListener("beforeunload", handleBeforeUnload)
      window.addEventListener("popstate", handlePopState)

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload)
        window.removeEventListener("popstate", handlePopState)
      }
    }
  }, [screen])

  const handleAnswer = useCallback((answer: string) => {
    const newAnswer = { questionId: questions[currentQuestion].id, answer }
    setAnswers((prev) => [...prev.filter((a) => a.questionId !== newAnswer.questionId), newAnswer])

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1)
        setInputValue("")
      }, 300)
    } else {
      setTimeout(() => {
        setScreen("analyzing")
      }, 300)
    }
  }, [currentQuestion])

  const handleInputSubmit = useCallback(() => {
    if (inputValue.trim()) {
      handleAnswer(inputValue.trim())
    }
  }, [inputValue, handleAnswer])

  const handleBackToHome = () => {
    setShowExitPopup(true)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Particle/Glow Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E50914]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#E50914]/5 rounded-full blur-[120px]" />
      </div>

      {/* Logo */}
      <div className="fixed top-6 left-6 z-50">
        <a href="/" onClick={(e) => { e.preventDefault(); handleBackToHome(); }} className="flex items-center gap-1">
          <span className="font-oswald text-xl tracking-wider text-[#E50914]">TP</span>
          <span className="font-oswald text-xl tracking-wider text-white">HUNTERS</span>
        </a>
      </div>

      {/* Exit Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1a1a] border-2 border-[#E50914] p-8 max-w-md w-full text-center relative"
            >
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="font-oswald text-2xl md:text-3xl tracking-wider mb-4 text-white">
                Wait — don&apos;t miss this.
              </h3>
              
              <p className="text-white/70 font-rajdhani text-lg mb-6 leading-relaxed">
                ₹500 is just 50 pips on 0.01 lot.<br />
                <span className="text-[#E50914] font-semibold">You can recover it in your first trade.</span>
              </p>
              
              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.link/r1yn9s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#E50914] hover:bg-[#ff2020] text-white font-rajdhani tracking-wider uppercase text-center transition-all"
                >
                  Start Now
                </a>
                <button
                  onClick={() => { setShowExitPopup(false); window.location.href = "/"; }}
                  className="block w-full py-3 border border-white/20 hover:border-white/40 text-white/50 hover:text-white font-rajdhani tracking-wider uppercase text-center transition-all"
                >
                  Exit Anyway
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* ENTRY SCREEN */}
        {screen === "entry" && (
          <motion.div
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-8 relative">
                <div className="absolute inset-0 border-2 border-[#E50914]/30 rounded-full" />
                <motion.div
                  className="absolute inset-0 border-2 border-[#E50914] rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <Zap className="absolute inset-0 m-auto w-6 h-6 text-[#E50914]" />
              </div>

              <h1 className="font-oswald text-2xl md:text-3xl tracking-wider mb-2">
                Initializing <span className="text-[#E50914]">TP Hunters</span> System...
              </h1>
              <p className="text-white/50 text-sm font-rajdhani tracking-wide mb-8">
                Preparing your trading analysis
              </p>

              <div className="w-64 md:w-80 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#E50914] to-[#ff2020]"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-white/30 text-xs mt-3 font-mono">{loadingProgress}%</p>
            </motion.div>
          </motion.div>
        )}

        {/* VERIFICATION SCREEN */}
        {screen === "verification" && (
          <motion.div
            key="verification"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-8 relative">
                <motion.div
                  className="absolute inset-0 border-2 border-[#E50914] rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-2 border border-white/20 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#E50914] rounded-full animate-pulse" />
                </div>
              </div>

              <h1 className="font-oswald text-2xl md:text-3xl tracking-wider mb-2">
                Verifying <span className="text-[#E50914]">trader profile</span>...
              </h1>
              <p className="text-white/50 text-sm font-rajdhani tracking-wide">
                Please wait while we prepare your analysis
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* QUESTIONS SCREEN */}
        {screen === "questions" && (
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col"
          >
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-40">
              <motion.div
                className="h-full bg-[#E50914]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Question Counter */}
            <div className="fixed top-6 right-6 z-40">
              <span className="font-mono text-sm text-white/50">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>

            {/* Question Content */}
            <div className="flex-1 flex items-center justify-center px-6 py-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-lg text-center"
                >
                  {/* Section Tag */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-block px-3 py-1 mb-6 border border-[#E50914]/30 rounded-full"
                  >
                    <span className="text-[#E50914] text-xs font-rajdhani tracking-wider uppercase">
                      {questions[currentQuestion].section}
                    </span>
                  </motion.div>

                  {/* Question */}
                  <h2 className="font-oswald text-2xl md:text-4xl tracking-wide mb-10 leading-tight">
                    {questions[currentQuestion].question}
                  </h2>

                  {/* Options or Input */}
                  {questions[currentQuestion].type === "input" || questions[currentQuestion].type === "phone" ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <input
                        type={questions[currentQuestion].type === "phone" ? "tel" : "text"}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
                        placeholder={questions[currentQuestion].placeholder}
                        className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#E50914] outline-none py-4 text-2xl text-center font-rajdhani tracking-wide transition-colors"
                        autoFocus
                      />
                      <button
                        onClick={handleInputSubmit}
                        disabled={!inputValue.trim()}
                        className="mt-6 px-8 py-3 bg-[#E50914] hover:bg-[#ff2020] disabled:bg-white/10 disabled:cursor-not-allowed text-white font-rajdhani tracking-wider uppercase text-sm transition-all flex items-center gap-2 mx-auto"
                      >
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-3"
                    >
                      {questions[currentQuestion].options?.map((option, index) => {
                        const isHighlight = questions[currentQuestion].highlight === option
                        return (
                          <motion.button
                            key={option}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            onClick={() => handleAnswer(option)}
                            className={`w-full py-4 px-6 border text-left font-rajdhani tracking-wide text-lg transition-all flex items-center justify-between group ${
                              isHighlight
                                ? "border-[#E50914] bg-[#E50914]/10 hover:bg-[#E50914]/20"
                                : "border-white/10 hover:border-[#E50914]/50 hover:bg-white/5"
                            }`}
                          >
                            <span>{option}</span>
                            {isHighlight && (
                              <span className="text-[#E50914] text-xs uppercase tracking-wider">Recommended</span>
                            )}
                            <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-[#E50914] transition-colors" />
                          </motion.button>
                        )
                      })}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ANALYZING SCREEN */}
        {screen === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center max-w-md"
            >
              {/* Animated Icon */}
              <div className="w-32 h-32 mx-auto mb-10 relative">
                <motion.div
                  className="absolute inset-0 border border-[#E50914]/20 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-4 border border-[#E50914]/40 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.3, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div
                  className="absolute inset-8 border-2 border-[#E50914] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-4 h-4 bg-[#E50914] rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Analyzing Text */}
              <AnimatePresence mode="wait">
                <motion.h2
                  key={analyzingIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-oswald text-xl md:text-2xl tracking-wider mb-8"
                >
                  {analyzingTexts[analyzingIndex]}
                </motion.h2>
              </AnimatePresence>

              {/* Progress Bar */}
              <div className="w-64 md:w-80 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#E50914] to-[#ff2020]"
                  style={{ width: `${analyzingProgress}%` }}
                />
              </div>
              <p className="text-white/30 text-xs mt-3 font-mono">{Math.round(analyzingProgress)}%</p>
            </motion.div>
          </motion.div>
        )}

        {/* RESULT SCREEN */}
        {screen === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto px-6 py-20">
              {/* Personalized Message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-16"
              >
                <h1 className="font-oswald text-3xl md:text-5xl tracking-wider mb-6">
                  So, <span className="text-[#E50914]">{userName}</span>....
                </h1>
                <p className="text-white/70 text-lg md:text-xl font-rajdhani leading-relaxed max-w-2xl mx-auto">
                  Based on your inputs, you don&apos;t lack potential —<br />
                  <span className="text-white font-semibold">you lack a structured system.</span>
                </p>
                <p className="text-[#E50914] text-xl md:text-2xl font-oswald tracking-wide mt-4">
                  That&apos;s exactly what we&apos;re fixing.
                </p>
                <p className="text-white/50 text-lg font-rajdhani mt-6">
                  We&apos;ve designed a plan specifically for your level.
                </p>
              </motion.div>

              {/* Pricing Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-5xl mx-auto"
              >
                {/* PRO PLAN - Partially Locked */}
                <div className="relative w-full md:w-80 order-2 md:order-1">
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <div className="text-center">
                      <Lock className="w-10 h-10 text-white/40 mx-auto mb-2" />
                      <span className="text-white/60 text-sm font-rajdhani tracking-wider uppercase">Unlock after joining Starter</span>
                    </div>
                  </div>
                  <div className="bg-[#141414] border-2 border-white/20 p-6 md:p-8">
                    <div className="text-center mb-6">
                      <h3 className="font-oswald text-lg tracking-wider text-white/50 mb-2">PRO PLAN</h3>
                      <p className="text-4xl md:text-5xl font-oswald text-white/60 blur-[1px]">
                        <span className="text-2xl">₹</span>1,499
                      </p>
                      <p className="text-white/40 text-sm font-rajdhani">/month</p>
                    </div>
                    <div className="border-t border-white/10 pt-6">
                      <ul className="space-y-3 text-sm">
                        {[
                          "5–6 signals per day",
                          "XAUUSD + NASDAQ signals",
                          "Risk management coaching",
                          "Live chart analysis (weekly)",
                          "Entry, SL, TP + reasoning",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-white/40 font-rajdhani">
                            <Check className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* STARTER PLAN - Highlighted (Center/Focus) */}
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border-2 border-[#E50914] p-6 md:p-8 w-full md:w-96 order-1 md:order-2 z-10"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#E50914] text-xs font-rajdhani tracking-wider uppercase whitespace-nowrap">
                    Recommended For You
                  </div>

                  <div className="text-center mb-6 pt-4">
                    <h3 className="font-oswald text-xl tracking-wider text-[#E50914] mb-2">STARTER PLAN</h3>
                    <p className="text-5xl md:text-6xl font-oswald text-white">
                      <span className="text-3xl">₹</span>500
                    </p>
                    <p className="text-white/50 text-sm font-rajdhani">/ 2 months</p>
                  </div>

                  <div className="border-t border-white/10 pt-6 mb-6">
                    <ul className="space-y-3 text-sm">
                      {[
                        "3–4 signals per day",
                        "50–400 pips potential daily",
                        "0.01 lot friendly",
                        "First trade covered",
                        "Entry, SL, TP levels",
                        "Telegram signal delivery",
                        "Live trade management (Trailing TP & SL)",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/70 font-rajdhani">
                          <Check className="w-4 h-4 text-[#E50914] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="https://wa.link/r1yn9s"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 bg-[#E50914] hover:bg-[#ff2020] text-white font-rajdhani tracking-wider uppercase text-center transition-all text-lg font-semibold"
                  >
                    Start Now
                  </a>

                  <p className="text-center text-xs text-white/50 mt-4 font-rajdhani leading-relaxed">
                    ₹500 is just ~50 pips on 0.01 lot — you can recover it in your first trade.
                  </p>
                </motion.div>

                {/* ELITE PLAN - More Blurred & Locked */}
                <div className="relative w-full md:w-80 order-3">
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-[3px]">
                    <div className="text-center">
                      <Lock className="w-10 h-10 text-white/30 mx-auto mb-2" />
                      <span className="text-white/50 text-sm font-rajdhani tracking-wider uppercase">Unlock after joining Starter</span>
                    </div>
                  </div>
                  <div className="bg-[#141414] border-2 border-white/15 p-6 md:p-8">
                    <div className="text-center mb-6">
                      <h3 className="font-oswald text-lg tracking-wider text-white/40 mb-2">ELITE PLAN</h3>
                      <p className="text-4xl md:text-5xl font-oswald text-white/50 blur-[2px]">
                        <span className="text-2xl">₹</span>2,999
                      </p>
                      <p className="text-white/30 text-sm font-rajdhani">/month</p>
                    </div>
                    <div className="border-t border-white/5 pt-6">
                      <ul className="space-y-3 text-sm">
                        {[
                          "All Pro features included",
                          "1-on-1 mentorship calls",
                          "Prop firm strategy included",
                          "Priority signal delivery",
                          "Personal trading roadmap",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-white/30 font-rajdhani">
                            <Check className="w-4 h-4 text-white/20 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Support Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-10"
              >
                <a
                  href="https://wa.link/ot60cd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-rajdhani tracking-wider transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Need Help? Chat on WhatsApp
                </a>
              </motion.div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-8"
              >
                <p className="text-white/50 text-sm font-rajdhani mb-4">
                  All plans include real-time signals on XAUUSD & NASDAQ. First trade covered — guaranteed.
                </p>
                <button
                  onClick={handleBackToHome}
                  className="inline-block text-[#E50914] text-sm font-rajdhani tracking-wider hover:underline"
                >
                  ← Back to Home
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
