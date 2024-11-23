import React, { useState } from 'react';
import Hero from "../../common/Hero";
import Footer from '../../common/Footer';
import FaqImage from '../../assests/images/dcColony.jpg';

const faqs = [
  {
    question: 'Is Home Service real?',
    answer: 'Yes, it is! You can stop by any of our offices, and if the team isn\'t too busy working, they would love to meet you!',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSetwSkePclyhad7gk6LYn-icS6fEeiOTl7zu9-T4vyjt9HSmIxbBBMHYyd8ucCtZXBHIQ&usqp=CAU'
  },
  {
    question: 'What are your office hours?',
    answer: 'Our office hours are from 9 AM to 5 PM, Monday to Friday.'
  },
  {
    question: 'How can I contact support?',
    answer: 'You can contact support via email at wahbnadeem311@gmail.com or call us at +923275954818.'
  },
  {
    question: 'Do you offer remote consultations?',
    answer: 'Yes, we offer remote consultations via Zoom. Please schedule an appointment through our website.'
  },
  {
    question: 'Where are your offices located?',
    answer: 'We have offices located in Open Way services.'
  }
];

const FAQItem = ({ faq, index, isOpen, toggleOpen }) => {
  return (
    <div
      className={`border ${isOpen ? 'border-red-500 shadow-lg' : 'border-gray-300'} rounded-lg mb-6 transition-all duration-300`}
    >
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => toggleOpen(index)}
      >
        <h2 className="text-lg font-medium text-gray-800">{faq.question}</h2>
        <div className="transform transition-transform">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="text-red-500"
            >
              <path
                fill="currentColor"
                d="M18.364 5.636l-1.414-1.414L12 9.172 7.05 4.222l-1.414 1.414L10.828 12l-5.192 5.192 1.414 1.414L12 14.828l4.95 4.95 1.414-1.414L13.172 12z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
            </svg>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t border-red-500 transition-all duration-300">
          <p className="text-gray-700">{faq.answer}</p>
          {faq.image && (
            <figure className="mt-4 text-center">
              <img
                src={faq.image}
                alt="FAQ visual"
                className="rounded-lg shadow-md"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      )}
    </div>
  );
};

const FAQComponent = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Hero text="FAQ" text1="Services" image={FaqImage} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl text-center text-gray-800 font-bold my-8">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Find answers to the most commonly asked questions below.
        </p>
        <div>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              toggleOpen={toggleOpen}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQComponent;
