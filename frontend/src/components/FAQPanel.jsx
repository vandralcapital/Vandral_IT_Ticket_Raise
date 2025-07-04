import React, { useState } from 'react'

const faqs = [
  {
    question: 'What services/products does your company provide?',
    answer: 'Our goal is to enhance operational efficiency and support your business growth through high-quality solutions.',
  },
  {
    question: 'How can I place a bulk order or request a customized quote?',
    answer: 'You can contact our sales team for bulk orders or custom quotes.',
  },
  {
    question: 'What are your payment terms?',
    answer: 'We offer flexible payment terms depending on your business needs.',
  },
  {
    question: 'How can I track my order?',
    answer: 'You can track your order status in your dashboard under Orders section.',
  },
  {
    question: 'What support do you offer post-purchase?',
    answer: 'We provide comprehensive post-purchase support for all our products and services.',
  },
]

const FAQPanel = () => {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl px-8 py-6 shadow-sm w-full">
      <h3 className="font-extrabold mb-6 text-xl">Frequently Asked Questions</h3>
      {faqs.map((faq, idx) => (
        <div key={idx} className="mb-3">
          <button
            className={`w-full flex items-center justify-between font-semibold text-left text-gray-800 py-2 px-2 rounded-lg transition-colors ${openIndex === idx ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
          >
            <span className="text-base">{faq.question}</span>
            <span className="ml-2">
              {openIndex === idx ? (
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
              ) : (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              )}
            </span>
          </button>
          {openIndex === idx && (
            <div className="mt-2 text-gray-500 text-sm pl-2 leading-relaxed">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FAQPanel 