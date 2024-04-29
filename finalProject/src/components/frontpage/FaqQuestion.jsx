import React, { useState } from 'react';
import './faq.css';

const FaqQuestion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`question__container ${isOpen ? 'open' : ''}`}>
      <div className="question" onClick={toggleCollapse}>
        <h5 className="question-title">{question}</h5>
      </div>
      <div className={`answer ${isOpen ? 'open' : ''}`}>
        <p className="answer__body">{answer}</p>
      </div>
    </div>
  );
};

const FaqPage = () => {
  const faqData = [
    {
      question: 'How long can I borrow for?',
      answer: 'Register simply by setting up an email address and a password. Sign in to view what is already in your shopping cart. You can also opt to sign in using Facebook or Instagram.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we offer international shipping to various countries. Please check our shipping policy for more information.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards, debit cards, PayPal, and other secure payment options. You can choose your preferred payment method during checkout.',
    },
    {
      question: 'Can I return or exchange a product?',
      answer: 'Yes, we have a hassle-free return and exchange policy. If you are not satisfied with your purchase, you can return or exchange the product within 30 days of delivery. Please refer to our return policy for detailed instructions.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking number via email. You can use this tracking number to track the status of your order on our website or the respective shipping carrier\'s website.',
    },
  ];

  return (
    <div className="faq-page">
      <h2>Frequently Asked Questions</h2>
      <p className='faq-para'>Many great people use our app and are trusted by them, so our app is highly
    recommended for you. Instantly move money between sites.</p>

      <div className="faq-list">
        {faqData.map((item, index) => (
          <FaqQuestion key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
