import React from 'react'

export default function TermsOfService() {
  return (
        <div>
            <main className="max-w-4xl mx-auto px-8 py-12 prose prose-lg prose-blue 
                 text-gray-900 dark:text-gray-200">
                <h1 className="text-4xl font-extrabold mb-8">
                    Terms of Service
                </h1>

                <p className="text-lg mb-4 text-gray-700 dark:text-gray-400">
                    Effective date: <time dateTime="2025-05-20">May 20, 2025</time>
                </p>

                <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">
                    Please read these Terms of Service (“Terms”, “Terms of Service”) carefully before using our application.  
                    By accessing or using the service, you agree to be bound by these Terms.
                </p>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                    1. Use of Service
                    </h2>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                    You agree to use the service only for lawful purposes and in a way that does not infringe the rights of others.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                    2. Account Responsibility
                    </h2>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                    You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                    3. Intellectual Property
                    </h2>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                    All content, features, and functionality of the service are the exclusive property of our company and are protected by intellectual property laws.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                    4. Termination
                    </h2>
                    <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                    We reserve the right to suspend or terminate your access to the service at our sole discretion, without prior notice, for conduct that we believe violates these Terms.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                    5. Limitation of Liability
                    </h2>
                    <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                    To the maximum extent permitted by law, our company shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the service.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                    6. Changes to Terms
                    </h2>
                    <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                    We may modify these Terms at any time. Continued use of the service after changes constitutes your acceptance of the updated Terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                    7. Contact Us
                    </h2>
                    <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                    For questions about these Terms, please contact us at{' '}
                    <a href="mailto:soufianeboukir0@gmail.com" className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600">
                        soufianeboukir0@gmail.com
                    </a>.
                    </p>
                </section>
            </main>
        </div>
  )
}

