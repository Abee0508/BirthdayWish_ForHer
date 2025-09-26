import React, { useState } from 'react';

const LoveQuestionnaire: React.FC = () => {
  const tabLabels = [
    'Shared Experiences',
    'Her Wishes',
    'My Shortcomings',
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [shared, setShared] = useState(Array(5).fill(''));
  const [wishes, setWishes] = useState(Array(5).fill(''));
  const [shortcomings, setShortcomings] = useState(Array(5).fill(''));
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string|null>(null);
  const [error, setError] = useState<string|null>(null);
  // Popup state
  const [showPopup, setShowPopup] = useState(false);

  const sharedQuestions = [
    'Sab se yaadgar pal jo humne sath guzara?',
    'Aapko sab se zyada romantic moment kaunsa laga?',
    'Kya cheez hai jo aapko mere sath sab se zyada pasand aayi?',
    'Hamari sab se pyari baat cheet ya date kaun si thi?',
    'Aapko mere kis lafz ya gesture ne sab se zyada mehsoos karwaya ke aap special hain?'
  ];
  const wishesQuestions = [
    'Aap is rishtey mein mujhse kya chahte hain?',
    'Aapko kaunsa pyar ya tawajjo mujhse milta to aur khushi hoti?',
    'Aapko kaunsi cheez sab se zyada feel karwati hai ke aap important hain?',
    'Aap chahti hain ke humari relationship mein kya naya ho?',
    'Aapko kaunsa sapna hai jo chahti hain mein poora karun?'
  ];
  const shortcomingsQuestions = [
    'Aisi kaunsi cheez thi jo mein aapko nahi de saka?',
    'Kab aapko mehsoos hua ke mein aapki umeed par poora nahi utar saka?',
    'Aapko kis baat ka sab se zyada dukh hua is rishtey mein?',
    'Aap chahti thi ke mein aapko kaunsa emotional support doon jo nahi de saka?',
    'Aapko lagta hai mein kis cheez mein behtar ho sakta tha?'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);
    // Prepare data
    const data = {
      'Name (filled by)': name,
      'Email (filled by)': email,
      'Shared Experiences': Object.fromEntries(sharedQuestions.map((q, i) => [q, shared[i]])),
      'Her Wishes': Object.fromEntries(wishesQuestions.map((q, i) => [q, wishes[i]])),
      'My Shortcomings': Object.fromEntries(shortcomingsQuestions.map((q, i) => [q, shortcomings[i]])),
    };
    try {
      const res = await fetch('http://localhost/birthday-final/send-questionnaire.php',  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      // Always show popup if mail is received, even if frontend gets network error
      setShowPopup(true);
      setSuccess('Form submitted successfully!');
      setShared(Array(5).fill(''));
      setWishes(Array(5).fill(''));
      setShortcomings(Array(5).fill(''));
      setName('');
      setEmail('');
    } catch (err) {
      setError('Network error.');
    }
    setSubmitting(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-bounceIn">
            <div className="text-5xl mb-2">💖</div>
            <div className="text-pink-600 text-xl font-bold mb-2">Thank you, Love!</div>
            <div className="text-pink-400 mb-4">Aapka form submit hogaya hai!<br/>Aapki feelings pohanch gayi hain 💌</div>
            <button
              className="mt-2 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold shadow"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-6 flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1 mb-4 md:mb-0">
            <label className="block text-pink-700 font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full border border-pink-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Apna naam likhein..."
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-pink-700 font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full border border-pink-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Apna email likhein..."
              value={email}
              name=''
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex border-b mb-6">
          {tabLabels.map((label, idx) => (
            <button
              key={label}
              type="button"
              className={`flex-1 py-2 px-4 text-lg font-semibold focus:outline-none transition-colors duration-200 ${
                activeTab === idx
                  ? 'border-b-4 border-pink-500 text-pink-600 bg-pink-50'
                  : 'text-gray-500 hover:text-pink-500'
              }`}
              onClick={() => setActiveTab(idx)}
            >
              {label}
            </button>
          ))}
        </div>
        <div>
          {activeTab === 0 && (
            <QuestionForm
              questions={sharedQuestions}
              answers={shared}
              setAnswers={setShared}
            />
          )}
          {activeTab === 1 && (
            <QuestionForm
              questions={wishesQuestions}
              answers={wishes}
              setAnswers={setWishes}
            />
          )}
          {activeTab === 2 && (
            <QuestionForm
              questions={shortcomingsQuestions}
              answers={shortcomings}
              setAnswers={setShortcomings}
            />
          )}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 text-lg"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        {success && <div className="text-green-600 text-center mt-4">{success}</div>}
        {error && <div className="text-red-600 text-center mt-4">{error}</div>}
      </form>
    </div>
  );
};

interface QuestionFormProps {
  questions: string[];
  answers: string[];
  setAnswers: (a: string[]) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ questions, answers, setAnswers }) => (
  <div className="space-y-6">
    {questions.map((q, idx) => (
      <div key={idx}>
        <label className="block text-lg font-medium text-pink-700 mb-2">{q}</label>
        <textarea
          className="w-full border border-pink-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[60px]"
          placeholder="Apna jawab likhein..."
          value={answers[idx]}
          onChange={e => {
            const newAnswers = [...answers];
            newAnswers[idx] = e.target.value;
            setAnswers(newAnswers);
          }}
        />
      </div>
    ))}
  </div>
);

export default LoveQuestionnaire;
