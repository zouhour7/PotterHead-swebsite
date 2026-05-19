import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sorting.css';

// eslint-disable-next-line react-refresh/only-export-components
export const sortingQuestions = [
  {
    id: 1,
    question: 'In which season were you born?',
    options: [
      { text: 'Summer — bright, bold, full of fire and movement.', house: 'gryffindor', points: 1 },
      { text: 'Winter — quiet, strategic, mysterious, and powerful.', house: 'slytherin', points: 1 },
      { text: 'Spring — gentle, hopeful, warm, and full of growth.', house: 'hufflepuff', points: 1 },
      { text: 'Autumn — thoughtful, deep, curious, and observant.', house: 'ravenclaw', points: 1 },
    ],
  },
  {
    id: 2,
    question: 'If your Patronus Charm appeared in front of you, which animal would you hope to see?',
    options: [
      { text: 'A lion — fearless, protective, and impossible to ignore.', house: 'gryffindor', points: 1 },
      { text: 'A snake — elegant, smart, dangerous when needed.', house: 'slytherin', points: 1 },
      { text: 'A rabbit — gentle, fast, sensitive, and loyal.', house: 'hufflepuff', points: 1 },
      { text: 'A cat — independent, clever, observant, and mysterious.', house: 'ravenclaw', points: 1 },
    ],
  },
  {
    id: 3,
    question: 'Which description feels closest to who you really are?',
    options: [
      { text: 'Brave, honest, protective, and ready to act when others hesitate.', house: 'gryffindor', points: 1 },
      { text: 'Smart, creative, curious, and always asking deeper questions.', house: 'ravenclaw', points: 1 },
      { text: 'Kind, patient, loyal, and someone people can rely on.', house: 'hufflepuff', points: 1 },
      { text: 'Ambitious, active, strategic, and naturally drawn to leadership.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 4,
    question: 'As a magical student, which type would you most likely be?',
    options: [
      { text: 'The loyal friend who jumps into danger before fully thinking.', house: 'gryffindor', points: 1 },
      { text: 'The dreamy outsider who notices things everyone else misses.', house: 'hufflepuff', points: 1 },
      { text: 'The expressive student who understands people and social situations quickly.', house: 'ravenclaw', points: 1 },
      { text: 'The bold troublemaker who knows how to survive risky situations.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 5,
    question: 'You find an old locked classroom that does not appear on any school map. What do you do?',
    options: [
      { text: 'Open it immediately. Some mysteries are meant to be faced.', house: 'gryffindor', points: 1 },
      { text: 'Study the door, symbols, and magic around it before touching anything.', house: 'ravenclaw', points: 1 },
      { text: 'Find a trusted friend or teacher first because this could be dangerous.', house: 'hufflepuff', points: 1 },
      { text: 'Keep the discovery secret until you understand how it can benefit you.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 6,
    question: 'During a potion exam, your potion turns silver instead of blue. The professor has not noticed yet. What do you do?',
    options: [
      { text: 'Raise your hand and admit something went wrong.', house: 'gryffindor', points: 1 },
      { text: 'Analyze the ingredients and try to understand the unexpected reaction.', house: 'ravenclaw', points: 1 },
      { text: 'Warn the student next to you in case the potion is unsafe.', house: 'hufflepuff', points: 1 },
      { text: 'Stay calm and try to turn the mistake into an advantage before anyone sees.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 7,
    question: 'A magical painting whispers that it knows a secret about your future. What do you ask first?',
    options: [
      { text: '“Will I become someone brave enough to protect others?”', house: 'gryffindor', points: 1 },
      { text: '“How does a painting know the future?”', house: 'ravenclaw', points: 1 },
      { text: '“Will the people I love be safe?”', house: 'hufflepuff', points: 1 },
      { text: '“What must I do to become powerful?”', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 8,
    question: 'You are chosen as team captain for a dangerous magical tournament. What is your first decision?',
    options: [
      { text: 'Train the team to stay fearless under pressure.', house: 'gryffindor', points: 1 },
      { text: 'Study every previous tournament strategy and weakness.', house: 'ravenclaw', points: 1 },
      { text: 'Make sure every teammate feels included and protected.', house: 'hufflepuff', points: 1 },
      { text: 'Choose roles based on each person’s strengths, even if it feels harsh.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 9,
    question: 'A friend is accused of using forbidden magic, but you are not sure they are innocent. What do you do?',
    options: [
      { text: 'Stand beside them publicly until the truth is proven.', house: 'gryffindor', points: 1 },
      { text: 'Investigate quietly and collect real evidence.', house: 'ravenclaw', points: 1 },
      { text: 'Support them emotionally while encouraging them to be honest.', house: 'hufflepuff', points: 1 },
      { text: 'Protect yourself first, then decide whether helping them is worth the risk.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 10,
    question: 'You discover a spell that can make you invisible for one hour, but it is not officially allowed. What do you use it for?',
    options: [
      { text: 'Sneaking into danger to rescue someone.', house: 'gryffindor', points: 1 },
      { text: 'Observing a magical creature without disturbing it.', house: 'ravenclaw', points: 1 },
      { text: 'Leaving anonymous gifts for students having a bad week.', house: 'hufflepuff', points: 1 },
      { text: 'Entering a restricted place to gain valuable information.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 11,
    question: 'A mysterious book in the library writes back when you write inside it. What is your reaction?',
    options: [
      { text: 'Ask it directly if it is dangerous.', house: 'gryffindor', points: 1 },
      { text: 'Test it with logical questions to understand how it works.', house: 'ravenclaw', points: 1 },
      { text: 'Ask whether it is trapped, lonely, or needs help.', house: 'hufflepuff', points: 1 },
      { text: 'Ask what secrets it knows about the school.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 12,
    question: 'Your house is losing the yearly cup. You have one week left. What do you focus on?',
    options: [
      { text: 'Winning a public challenge that brings big points.', house: 'gryffindor', points: 1 },
      { text: 'Finding hidden academic opportunities no one noticed.', house: 'ravenclaw', points: 1 },
      { text: 'Helping younger students earn points too.', house: 'hufflepuff', points: 1 },
      { text: 'Studying the rules carefully to find the smartest path to victory.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 13,
    question: 'In a magical maze, the path splits into four doors. Which door do you choose?',
    options: [
      { text: 'The red door with roaring flames behind it.', house: 'gryffindor', points: 1 },
      { text: 'The blue door covered in shifting riddles.', house: 'ravenclaw', points: 1 },
      { text: 'The yellow door with warm light and distant laughter.', house: 'hufflepuff', points: 1 },
      { text: 'The green door with a silver lock and no visible handle.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 14,
    question: 'A younger student asks you for help right before your own important exam. What do you do?',
    options: [
      { text: 'Help quickly and trust yourself to handle the exam under pressure.', house: 'gryffindor', points: 1 },
      { text: 'Teach them the logic so they can solve it alone next time.', house: 'ravenclaw', points: 1 },
      { text: 'Stay with them until they truly understand, even if it costs you time.', house: 'hufflepuff', points: 1 },
      { text: 'Help only if it does not seriously damage your own chances.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 15,
    question: 'A professor offers you access to one magical object for a day. Which do you choose?',
    options: [
      { text: 'A sword that appears only to those who truly need it.', house: 'gryffindor', points: 1 },
      { text: 'A mirror that shows the answer to one impossible question.', house: 'ravenclaw', points: 1 },
      { text: 'A cup that heals sadness for anyone who drinks from it.', house: 'hufflepuff', points: 1 },
      { text: 'A ring that lets you influence people’s first impression of you.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 16,
    question: 'You overhear students planning to humiliate someone during a public event. What do you do?',
    options: [
      { text: 'Confront them immediately and tell them to stop.', house: 'gryffindor', points: 1 },
      { text: 'Think of a clever way to expose the plan without chaos.', house: 'ravenclaw', points: 1 },
      { text: 'Warn the target and stay with them during the event.', house: 'hufflepuff', points: 1 },
      { text: 'Use the information to control the situation from behind the scenes.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 17,
    question: 'A magical creature blocks your path in the Forbidden Forest. It looks scared, not evil. What do you do?',
    options: [
      { text: 'Step forward slowly and show you are not afraid.', house: 'gryffindor', points: 1 },
      { text: 'Observe its behavior and identify what it might need.', house: 'ravenclaw', points: 1 },
      { text: 'Speak softly and try to calm it before moving.', house: 'hufflepuff', points: 1 },
      { text: 'Find a way around it without wasting time or risking injury.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 18,
    question: 'You are allowed to master one magical skill faster than everyone else. Which one do you choose?',
    options: [
      { text: 'Defensive magic, so you can protect yourself and others.', house: 'gryffindor', points: 1 },
      { text: 'Ancient magic, because forgotten knowledge is powerful.', house: 'ravenclaw', points: 1 },
      { text: 'Healing magic, so you can help people when they are hurt.', house: 'hufflepuff', points: 1 },
      { text: 'Mind magic, so you can understand and influence situations.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 19,
    question: 'A secret club invites you to join, but you must pass a strange test first. What test would you handle best?',
    options: [
      { text: 'Facing your biggest fear in front of everyone.', house: 'gryffindor', points: 1 },
      { text: 'Solving a riddle that changes every time you answer.', house: 'ravenclaw', points: 1 },
      { text: 'Proving you can be trusted with someone else’s secret.', house: 'hufflepuff', points: 1 },
      { text: 'Convincing the club leaders that they need you.', house: 'slytherin', points: 1 },
    ],
  },
  {
    id: 20,
    question: 'At the final moment of the sorting ceremony, the magical hat hesitates. It sees two possible futures for you. What do you hope it sees most clearly?',
    options: [
      { text: 'That I will become brave enough to stand up when it matters.', house: 'gryffindor', points: 1 },
      { text: 'That I will discover ideas no one else has imagined.', house: 'ravenclaw', points: 1 },
      { text: 'That I will be remembered as someone who made others feel safe.', house: 'hufflepuff', points: 1 },
      { text: 'That I will rise high and shape my own destiny.', house: 'slytherin', points: 1 },
    ],
  },
];

const houseOrder = ['gryffindor', 'ravenclaw', 'hufflepuff', 'slytherin'];

const Sorting = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [finalResult, setFinalResult] = useState(null);

  const currentQuestion = sortingQuestions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  const result = useMemo(() => {
    const score = {
      gryffindor: 0,
      ravenclaw: 0,
      hufflepuff: 0,
      slytherin: 0,
    };

    selectedAnswers.forEach((answer) => {
      score[answer.house] += answer.points;
    });

    const total = score.gryffindor + score.ravenclaw + score.hufflepuff + score.slytherin;

    const percentages = {
      gryffindor: total ? Math.round((score.gryffindor / total) * 100) : 0,
      ravenclaw: total ? Math.round((score.ravenclaw / total) * 100) : 0,
      hufflepuff: total ? Math.round((score.hufflepuff / total) * 100) : 0,
      slytherin: total ? Math.round((score.slytherin / total) * 100) : 0,
    };

    const finalHouse = houseOrder.reduce((highestHouse, house) => {
      return score[house] > score[highestHouse] ? house : highestHouse;
    }, houseOrder[0]);

    return { finalHouse, percentages, score };
  }, [selectedAnswers]);

  const selectAnswer = (option) => {
    const nextAnswers = [...selectedAnswers];
    nextAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(nextAnswers);
  };

  const goToNextQuestion = () => {
    if (!selectedAnswer) return;

    if (currentQuestionIndex === sortingQuestions.length - 1) {
      const completedResult = {
        selectedAnswers,
        score: result.score,
        percentages: result.percentages,
        finalHouse: result.finalHouse,
      };

      setFinalResult(completedResult);
      sessionStorage.setItem('sortingResult', JSON.stringify(completedResult));
      setIsFinished(true);
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
  };

  const keepHouseForLater = () => {
    const completedResult = finalResult ?? result;

    sessionStorage.setItem('sortingResult', JSON.stringify(completedResult));
    sessionStorage.setItem('selectedHouse', completedResult.finalHouse);
    navigate('/result', { state: completedResult });
  };

  return (
    <main className="sorting-page">
      <section className="sorting-quiz-box">
        {isFinished ? (
          <div className="sorting-result">
            <h1 className="sorting-result-question">
              “Now then, young wizard… are you ready to uncover the house to which you truly belong?”
            </h1>

            <button className="sorting-control-button" type="button" onClick={keepHouseForLater}>
              click here
            </button>
          </div>
        ) : (
          <div className="sorting-question-panel" key={currentQuestion.id}>
            <h1 className="sorting-question">{currentQuestion.question}</h1>

            <div className="sorting-options">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer?.text === option.text;

                return (
                  <button
                    className={`sorting-option ${isSelected ? 'selected' : ''}`}
                    key={option.text}
                    type="button"
                    onClick={() => selectAnswer(option)}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>

            <div className="sorting-controls">
              <button
                className="sorting-control-button"
                type="button"
                onClick={goToNextQuestion}
                disabled={!selectedAnswer}
              >
                {currentQuestionIndex === sortingQuestions.length - 1 ? 'See Result' : 'Next'}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Sorting;
