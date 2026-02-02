
import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Gift, ArrowRight, Camera, ArrowLeft, X, Check } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import { Step, LetterData } from './types';
import { QUESTIONS, getRank } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('entry');
  const [showIntroMessage, setShowIntroMessage] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isScreenshotMode, setIsScreenshotMode] = useState(false);
  const [letterData, setLetterData] = useState<LetterData>({
    favThing: '',
    promise: '',
    excitedFor: ''
  });

  // Shuffle questions and their options once
  const shuffledQuestions = useMemo(() => {
    return [...QUESTIONS].map(q => ({
      ...q,
      shuffledOptions: [...q.options].sort(() => Math.random() - 0.5)
    }));
  }, []);

  const currentQuestion = shuffledQuestions[currentQuestionIdx];

  const handleOpenGift = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#fb7185', '#fda4af', '#ffffff']
    });
    setShowIntroMessage(true);
  };

  const handleAnswer = (option: string) => {
    if (feedback) return; // Prevent double clicks

    const isCorrect = option === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    // Small delay to see feedback before moving to next question
    setTimeout(() => {
      setFeedback(null);
      if (currentQuestionIdx < shuffledQuestions.length - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
      } else {
        setStep('score');
      }
    }, 800);
  };

  const triggerFinalConfetti = () => {
    const end = Date.now() + (2.5 * 1000);
    const colors = ['#f43f5e', '#fb7185', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleLetterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('result');
    triggerFinalConfetti();
  };

  return (
    <div className={`min-h-screen w-full relative flex items-center justify-center p-4 transition-colors duration-500 ${isScreenshotMode ? 'bg-white' : 'bg-[#fffafb]'}`}>
      {!isScreenshotMode && <FloatingHearts />}

      <div className={`w-full max-w-2xl z-10 transition-all duration-300 ${isScreenshotMode ? 'max-w-md' : ''}`}>
        
        {/* Step 1: Entry */}
        {step === 'entry' && (
          <div className="flex flex-col items-center justify-center space-y-10 text-center animate-in fade-in duration-700">
            {!showIntroMessage ? (
              <div className="flex flex-col items-center justify-center space-y-10">
                <div 
                  onClick={handleOpenGift}
                  className="w-40 h-40 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 animate-bounce shadow-2xl border-2 border-rose-100"
                >
                  <Gift className="w-20 h-20 text-rose-500" />
                </div>
                <h1 className="text-xl font-bold text-gray-800 tracking-wide uppercase">
                  A little surprise for Harry...
                </h1>
              </div>
            ) : (
              <div className="animate-in zoom-in duration-500 flex flex-col items-center space-y-10">
                <div className="bento-card p-10 rounded-[2.5rem] shadow-xl border-rose-100 max-w-md bg-white">
                  <p className="text-xl font-bold text-gray-800 leading-relaxed italic">
                    "Happy 3m Harry! it's so faaaasssttt thanks for spending time with me every night even though u are super tired from work ka! see u very soooooon love u"
                  </p>
                </div>
                <button 
                  onClick={() => setStep('quiz')}
                  className="squishy bg-rose-500 hover:bg-rose-600 text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-lg shadow-rose-200 flex items-center gap-3"
                >
                  Enter the Challenge <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Quiz */}
        {step === 'quiz' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-2xl font-black text-gray-900 text-center uppercase tracking-tight px-4">The "How Well Do You Know Me?" Quiz</h2>

            <div className={`bento-card rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden ${feedback === 'wrong' ? 'shake border-red-200' : feedback === 'correct' ? 'border-green-200' : ''}`}>
              {/* Feedback Overlay */}
              {feedback && (
                <div className={`absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] z-20 animate-in fade-in duration-200`}>
                  {feedback === 'correct' ? (
                    <div className="bg-green-100 p-6 rounded-full text-green-600"><Check className="w-16 h-16 stroke-[3px]" /></div>
                  ) : (
                    <div className="bg-red-100 p-6 rounded-full text-red-600"><X className="w-16 h-16 stroke-[3px]" /></div>
                  )}
                </div>
              )}

              <div className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-rose-500 font-black text-[10px] uppercase tracking-[0.25em] bg-rose-50 px-3 py-1 rounded-full">Question {currentQuestionIdx + 1} / 7</span>
                  <div className="flex gap-1">
                    {shuffledQuestions.map((_, i) => (
                      <div key={i} className={`h-1.5 w-4 rounded-full transition-colors ${i < currentQuestionIdx ? 'bg-rose-500' : i === currentQuestionIdx ? 'bg-rose-300' : 'bg-rose-100'}`} />
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">{currentQuestion.question}</h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.shuffledOptions.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={!!feedback}
                    onClick={() => handleAnswer(option)}
                    className="squishy text-left p-6 rounded-2xl border-2 border-gray-50 bg-white hover:border-rose-300 hover:bg-rose-50 transition-all text-gray-800 font-bold flex items-center justify-between group shadow-sm disabled:opacity-50"
                  >
                    <span>{option}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all text-rose-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Intermediate Score */}
        {step === 'score' && (
          <div className="text-center space-y-10 animate-in zoom-in duration-500">
            <div className="bento-card p-12 rounded-[3rem] shadow-2xl inline-block w-full max-w-md">
              <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-widest">Quiz Results</h2>
              <div className="my-10 py-10 rounded-[2.5rem] bg-rose-50/50 border border-rose-100">
                <div className="text-8xl font-black text-rose-500">{score}/7</div>
                <p className="text-lg font-black text-gray-900 mt-6 uppercase tracking-widest">{getRank(score)}</p>
              </div>
              <button 
                onClick={() => setStep('letter')}
                className="squishy w-full py-5 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-3"
              >
                Almost Done Harry... <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Fill-in-the-blanks Letter */}
        {step === 'letter' && (
          <div className="space-y-10 max-w-xl mx-auto animate-in fade-in duration-500">
            <div className="text-center">
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Finish the Letter</h2>
              <p className="text-gray-500 font-bold mt-2">Just three blanks for me ka...</p>
            </div>

            <form onSubmit={handleLetterSubmit} className="space-y-8">
              <div className="bento-card p-8 md:p-10 rounded-[2.5rem] shadow-xl space-y-10">
                <div className="space-y-3">
                  <p className="text-gray-900 font-black text-xs uppercase tracking-[0.1em]">"My favorite thing about us is..."</p>
                  <input 
                    required
                    type="text"
                    value={letterData.favThing}
                    onChange={(e) => setLetterData({...letterData, favThing: e.target.value})}
                    className="w-full p-5 rounded-2xl border-2 border-gray-100 focus:border-rose-400 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900 font-bold"
                    placeholder="Tell me ka..."
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-gray-900 font-black text-xs uppercase tracking-[0.1em]">"I promise to always..."</p>
                  <input 
                    required
                    type="text"
                    value={letterData.promise}
                    onChange={(e) => setLetterData({...letterData, promise: e.target.value})}
                    className="w-full p-5 rounded-2xl border-2 border-gray-100 focus:border-rose-400 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900 font-bold"
                    placeholder="Your promise for me..."
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-gray-900 font-black text-xs uppercase tracking-[0.1em]">"I’m most excited for..."</p>
                  <input 
                    required
                    type="text"
                    value={letterData.excitedFor}
                    onChange={(e) => setLetterData({...letterData, excitedFor: e.target.value})}
                    className="w-full p-5 rounded-2xl border-2 border-gray-100 focus:border-rose-400 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900 font-bold"
                    placeholder="When we see each other!"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="squishy w-full py-6 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3"
              >
                Complete Challenge <ArrowRight className="w-6 h-6" />
              </button>
            </form>
          </div>
        )}

        {/* Step 5: Result Card (Screenshot Style) */}
        {step === 'result' && (
          <div className="animate-in fade-in zoom-in duration-1000 flex flex-col items-center">
            
            {isScreenshotMode && (
              <div className="text-center mb-8 space-y-2 animate-pulse">
                <p className="text-rose-600 font-black text-lg">Ready! Take your screenshot ka! ❤️</p>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Snap a screenshot and send it to Becky!</p>
              </div>
            )}

            {!isScreenshotMode && (
              <h2 className="text-3xl font-black text-gray-900 mb-10 uppercase tracking-widest">Harry & Becky: 3 Months</h2>
            )}

            {/* Certificate Style Result Card */}
            <div className={`bento-card w-full rounded-[3rem] overflow-hidden border-rose-200 transition-all duration-300 ${isScreenshotMode ? 'shadow-none border-4 border-rose-500' : 'shadow-2xl'}`}>
              <div className="bg-rose-500 p-12 text-white text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 fill-white" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80 mb-2">Quiz Score</h3>
                <div className="text-7xl font-black mb-2">{score}/7</div>
                <div className="text-sm font-black uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full inline-block mt-2">
                  {getRank(score)}
                </div>
              </div>
              
              <div className="p-10 md:p-12 space-y-10 bg-white">
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">My Favorite thing</p>
                    <p className="text-gray-900 font-extrabold italic text-xl border-l-4 border-rose-100 pl-4 leading-relaxed">"{letterData.favThing}"</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">My Promise</p>
                    <p className="text-gray-900 font-extrabold italic text-xl border-l-4 border-rose-100 pl-4 leading-relaxed">"{letterData.promise}"</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">Most Excited For</p>
                    <p className="text-gray-900 font-extrabold italic text-xl border-l-4 border-rose-100 pl-4 leading-relaxed">"{letterData.excitedFor}"</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-rose-50 text-center">
                  <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.5em]">
                    Forever & Always • 3 MONTHS
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons UI */}
            <div className="mt-12 flex flex-col items-center gap-6 w-full">
              {!isScreenshotMode ? (
                <>
                  <button 
                    onClick={() => {
                      setIsScreenshotMode(true);
                      window.scrollTo(0,0);
                    }}
                    className="squishy w-full py-5 bg-gray-900 text-white rounded-full font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl"
                  >
                    Prepare Screenshot 📸
                  </button>
                  <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Share this with Becky! ❤️</p>
                </>
              ) : (
                <button 
                  onClick={() => setIsScreenshotMode(false)}
                  className="squishy px-10 py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to App
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;
