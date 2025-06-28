export default function PrivacyPolicyPage() {
    return (
        <main className="max-w-4xl mx-auto px-8 py-12 prose prose-lg prose-blue 
                 text-gray-900 dark:text-gray-200">
            <h1 className="text-4xl font-extrabold mb-8">
                Privacy Policy
            </h1>

            <p className="text-lg mb-4 text-gray-700 dark:text-gray-400">
                Effective date: <time dateTime="2025-05-20">May 20, 2025</time>
            </p>

            <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">
                Your privacy is important to us. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our application.
            </p>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                1. Information We Collect
                </h2>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                We may collect personal information including, but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Contact details such as name and email address</li>
                <li>Usage data such as feedback submissions and interaction logs</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                2. How We Use Your Information
                </h2>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Provide, operate, and maintain our service</li>
                <li>Improve user experience</li>
                <li>Send important updates and notifications</li>
                <li>Analyze usage and trends</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                3. Information Sharing and Disclosure
                </h2>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                We do not sell or trade your personal data. We may share information with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Service providers who help us operate the platform</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                4. Data Security
                </h2>
                <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                We implement reasonable security measures to protect your information but cannot guarantee absolute security.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                5. Your Rights
                </h2>
                <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                You may have rights under applicable laws to access, correct, or delete your personal data. Contact us for requests.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                6. Changes to this Privacy Policy
                </h2>
                <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                We may update this policy from time to time. We encourage you to review it periodically.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                7. Contact Us
                </h2>
                <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                If you have questions or concerns about this policy, please contact us at{' '}
                <a href="mailto:soufianeboukir0@gmail.com" className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600">
                    soufianeboukir0@gmail.com
                </a>.
                </p>
            </section>
        </main>
    )
  }
  