import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Send, Sparkles } from 'lucide-react';
import emailjs from 'emailjs-com';

gsap.registerPlugin(ScrollTrigger);

const RomanticForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});

  const questions = [
    {
      type: 'checkbox',
      id: 'lovesMe',
      question: 'Do you know how much I love you?',
      label: 'Yes, more than the stars in the sky ✨'
    },
    {
      type: 'checkbox',
      id: 'bestDay',
      question: 'Is today the best birthday ever?',
      label: 'Absolutely, because you made it special! 💖'
    },
    {
      type: 'text',
      id: 'favoriteMemory',
      question: 'What\'s your favorite memory of us together?',
      placeholder: 'Tell me about that magical moment... 🌹'
    },
    {
      type: 'checkbox',
      id: 'moreAdventures',
      question: 'Are you ready for more adventures with me?',
      label: 'Yes! Let\'s create more beautiful memories 🥰'
    },
    {
      type: 'text',
      id: 'birthdayWish',
      question: 'What\'s your special birthday wish?',
      placeholder: 'Make a wish, my love... 💫'
    },
    {
      type: 'checkbox',
      id: 'happiestGirl',
      question: 'Do you feel like the luckiest girl today?',
      label: 'Yes, because I have the most amazing boyfriend! 💕'
    }
  ];

  const handleInputChange = (id: string, value: string | boolean) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare email data
    const responses = Object.entries(answers).map(([key, value]) => {
      const question = questions.find(q => q.id === key);
      return `${question?.question}\n${value === true ? '✅ Yes' : value === false ? '❌ No' : value}`;
    }).join('\n\n');

    const emailData = {
      to_email: 'abdullah.qamar137@gmail.com',
      from_name: 'Your Beautiful Girlfriend 💖',
      subject: '💕 Love Questionnaire Responses - Birthday Special 💕',
      message: `
🌹 My Dearest Love 🌹

I just filled out your beautiful love questionnaire on my special birthday website! Here are my heartfelt responses:

${responses}

Thank you for creating such a magical birthday experience for me. This website is the most romantic gift I could have ever asked for! 

I love you more than words can express! 💖✨

Forever yours,
Your Birthday Girl 🎂💕
      `
    };

    // Send email using EmailJS
    emailjs.send(
      'service_birthday', // You'll need to set this up in EmailJS
      'template_love', // You'll need to create this template
      emailData,
      'your_public_key' // You'll need to get this from EmailJS
    )
    .then((response) => {
      alert(`💖 Your Beautiful Responses Sent! 💖\n\n${responses}\n\n🌹 Your love letter has been sent to my heart! Check your email! 🌹`);
    })
    .catch((error) => {
      // Fallback - show responses in alert if email fails
      alert(`💖 Your Beautiful Responses 💖\n\n${responses}\n\n🌹 Thank you for filling my heart with joy! 🌹`);
    });
  };

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        }
      }
    );

    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('.form-item');
      gsap.fromTo(formElements,
        { x: -50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 70%',
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-red-100 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Heart className="text-pink-500 w-8 h-8 mr-3 fill-current" />
            <h2 className="text-4xl md:text-6xl font-bold text-pink-600" style={{ fontFamily: 'Georgia, serif' }}>
              Love Questionnaire
            </h2>
            <Sparkles className="text-yellow-400 w-8 h-8 ml-3" />
          </div>
          <p className="text-xl text-pink-500 mt-4">
            Answer these with your heart, my beautiful angel 💕
          </p>
        </div>

        <form onSubmit={handleSubmit} ref={formRef} className="space-y-8">
          {questions.map((question, index) => (
            <div key={question.id} className="form-item bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200">
              <h3 className="text-xl font-medium text-pink-700 mb-4 flex items-center">
                <span className="text-2xl mr-3">💖</span>
                {question.question}
              </h3>
              
              {question.type === 'checkbox' ? (
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={answers[question.id] as boolean || false}
                    onChange={(e) => handleInputChange(question.id, e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-lg border-2 border-pink-400 mr-3 flex items-center justify-center transition-all duration-300 ${
                    answers[question.id] ? 'bg-pink-500 border-pink-500' : 'group-hover:border-pink-500'
                  }`}>
                    {answers[question.id] && (
                      <span className="text-white text-sm">✓</span>
                    )}
                  </div>
                  <span className="text-pink-600 group-hover:text-pink-700 transition-colors duration-300">
                    {question.label}
                  </span>
                </label>
              ) : (
                <textarea
                  value={answers[question.id] as string || ''}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  placeholder={question.placeholder}
                  className="w-full p-4 rounded-xl border border-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-300 bg-white/80 text-pink-700 placeholder-pink-400 resize-none"
                  rows={3}
                />
              )}
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-pink-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5 mr-2" />
              Send My Love 💕
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RomanticForm;