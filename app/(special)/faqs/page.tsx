'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'How does the QR code feedback system work?',
    answer:
      'After registering and creating your business profile, a unique QR code and link are generated. Customers scan the QR code on-site to submit ratings and comments directly from their phones.',
  },
  {
    question: 'Is the feedback collected in real time?',
    answer:
      'Yes, customer feedback is instantly available in your business dashboard as soon as it’s submitted.',
  },
  {
    question: 'What kind of feedback can customers leave?',
    answer:
      'Customers can provide star ratings, write comments, and optionally leave contact details if you enable that feature.',
  },
  {
    question: 'Where can I place the QR code?',
    answer:
      'You can display the QR code on tables, receipts, counters, menus, posters, or any other visible location inside your business.',
  },
  {
    question: 'Can I customize the feedback form?',
    answer:
      'Yes, the feedback form can be customized to include specific questions, categories, and optional fields depending on your needs.',
  },
  {
    question: 'Is it secure and private?',
    answer:
      'Yes, all feedback is stored securely, and you control whether to collect anonymous or identified responses.',
  },
  {
    question: 'Do I need to install an app?',
    answer:
      'No, the system is fully web-based. Both you and your customers access everything through standard browsers.',
  },
  {
    question: 'Can I export the feedback data? (COOMING SOON)',
    answer:
      'Yes, the dashboard allows you to export all feedback in CSV format for external reporting or integration.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <main className="px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 dark:text-white font-medium focus:outline-none"
            >
              <span>{faq.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
