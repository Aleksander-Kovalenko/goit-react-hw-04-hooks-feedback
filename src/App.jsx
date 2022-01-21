import { useState } from 'react';

import { FeedbackOptions } from './components/FeedbackOptions/FeedbackOptions';
import { Statistics } from './components/Statistics/Statistics';
import { Title } from './App.styled';
import { Section } from './components/Section/Section';
import { Notification } from './components/Notification/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countPositiveFeedbackPercentage = () => {
    const average = 100 / (countTotalFeedback() / good);
    return average.toFixed(0);
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const handleButton = feedback => {
    switch (feedback) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  const buttonName = ['good', 'neutral', 'bad'];
  const requirementRender = countTotalFeedback() > 0;

  return (
    <>
      <Title>Vanilla Bakery Stats</Title>

      <Section title="Please leave Feedback">
        <FeedbackOptions options={buttonName} onLeaveFeedback={handleButton} />
      </Section>

      {requirementRender && (
        <Section title="All Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            percentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      )}
      <Section>
        {!requirementRender && <Notification message="There is no feedback"></Notification>}
      </Section>
    </>
  );
}

// class OldApp extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   handleButton = feedback => {
//     this.setState(prevState => ({
//       [feedback]: prevState[feedback] + 1,
//     }));
//   };

//   countPositiveFeedbackPercentage = () => {
//     const average = 100 / (this.countTotalFeedback() / this.state.good);
//     return average.toFixed(0);
//   };

//   countTotalFeedback = () => {
//     return Object.values(this.state).reduce((a, b) => a + b, 0);
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const keys = Object.keys(this.state);
//     const total = this.countTotalFeedback();
//     return (
//       <>
//         <Title>Vanilla Bakery Stats</Title>

//         <Section title="Please leave Feedback">
//           <FeedbackOptions options={keys} onLeaveFeedback={this.handleButton} />
//         </Section>

//         {total > 0 && (
//           <Section title="All Statistics">
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={this.countTotalFeedback()}
//               percentage={this.countPositiveFeedbackPercentage()}
//             />
//           </Section>
//         )}
//         <Section>
//           {!total > 0 && <Notification message="There is no feedback"></Notification>}
//         </Section>
//       </>
//     );
//   }
// }
