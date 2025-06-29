"use client"

import { Cog, FileDown, FileText, MessageSquare, QrCode, Stars, ChevronRight, Check, Zap, Users, PieChart, Smartphone, Tablet, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { ModeToggle } from "@/components/theme-provider"
import Image from "next/image"

const features = [
  { title: "Real-time Dashboard", icon: LayoutDashboard, pro: false, description: "Monitor feedback trends and insights in real-time with beautiful visualizations." },
  { title: "Customer Feedback", icon: MessageSquare, pro: false, description: "Collect honest feedback through simple QR code scans." },
  { title: "Data Export", icon: FileDown, pro: false, coming: true, description: "Export your data for further analysis (coming soon)." },
  { title: "Dynamic QR Codes", icon: QrCode, pro: false, description: "Generate customizable QR codes that match your brand." },
  { title: "Brand Customization", icon: Cog, pro: false, description: "White-label the experience with your logo and colors." },
  { title: "Smart Automations", icon: Stars, pro: true, description: "Set up automated responses and workflows for efficiency." },
  { title: "Custom Questions", icon: FileText, pro: true, description: "Create tailored questions for different customer segments." },
  { title: "Response Analysis", icon: PieChart, pro: true, description: "Advanced sentiment analysis and response categorization." },
]

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for small businesses getting started",
    features: [
      "Unlimeted feedbacks per month",
      "Basic dashboard",
      "Standard QR codes",
      "Email support",
      "Analytics"
    ],
    cta: "Get Started"
  },
  {
    name: "Pro",
    price: "$3",
    period: "/month",
    description: "For growing businesses with more needs",
    features: [
      "Everythig in starter",
      "Advanced analytics",
      "Add custom questions to feedback forms.",
      "Priority support",
      "Basic automations"
    ],
    popular: true,
    cta: "Go Pro"
  },
]

const testimonials = [
  {
    quote: "We placed the QR code on our tables and instantly started getting real customer feedback. The dashboard is so clean and easy to use!",
    author: "Sarah M.",
    role: "Cafe Owner",
    rating: 5
  },
  {
    quote: "No more paper forms or clucky surveys. We finally understand what our customers are thinking in real time.",
    author: "James L.",
    role: "Retail Manager",
    rating: 5
  },
  {
    quote: "The customization options allowed us to match our brand perfectly. Customers don't even realize they're using a third-party tool.",
    author: "Maria G.",
    role: "Marketing Director",
    rating: 4
  }
]

const steps = [
  {
    title: "Create Your Account",
    description: "Sign up in seconds with your email",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Generate QR Code",
    description: "Customize and download your unique QR code",
    icon: <QrCode className="w-6 h-6" />
  },
  {
    title: "Display Your Code",
    description: "Place it on tables, receipts, or products",
    icon: <Smartphone className="w-6 h-6" />
  },
  {
    title: "Collect Feedback",
    description: "Customers scan and provide feedback instantly",
    icon: <MessageSquare className="w-6 h-6" />
  },
  {
    title: "Analyze Results",
    description: "View insights in your real-time dashboard",
    icon: <PieChart className="w-6 h-6" />
  }
]

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredFeatures = activeTab === "all" 
    ? features 
    : activeTab === "pro" 
      ? features.filter(f => f.pro) 
      : features.filter(f => !f.pro);

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:opacity-10"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:opacity-10"></div>
      </div>

      {/* Header */}
      <header className="relative flex justify-between items-center px-6 py-4 md:px-12 md:py-6 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <h1 className="text-xl font-bold flex gap-1 items-center">
            <Image src={'/feednity-logo.png'} width={40} height={40} alt="logo"/>
            feednity
          </h1>
        </motion.div>
        
        <nav className="hidden md:flex items-center space-x-8 font-medium text-sm">
          <Link href="#features" className="hover:text-blue-600 transition flex items-center group">
            Features
            <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition" />
          </Link>
          <Link href="#how-it-works" className="hover:text-blue-600 transition flex items-center group">
            How It Works
            <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition" />
          </Link>
          <Link href="#pricing" className="hover:text-blue-600 transition flex items-center group">
            Pricing
            <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition" />
          </Link>
          <Link href="#testimonials" className="hover:text-blue-600 transition flex items-center group">
            Testimonials
            <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition" />
          </Link>
        </nav>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-2 items-center"
        >
          <ModeToggle />

          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition flex items-center"
          >
            Get Started
            <Zap className="w-4 h-4 ml-2" />
          </Link>

        </motion.div>
      </header>

      {/* Hero */}
      <section className="relative text-center px-6 py-20 md:py-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-4 dark:bg-blue-900/30 dark:text-blue-300">
            Now with AI Analysis <span className="ml-1">✨</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Instant Customer Feedback
            </span><br />
            <span className="text-gray-700 dark:text-gray-300">Through QR Codes & Links</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Transform customer insights with our seamless QR code feedback system. Get real-time data, beautiful analytics, and actionable insights to grow your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition-all hover:shadow-blue-500/20 hover:-translate-y-0.5 text-lg flex items-center justify-center"
            >
              Start Free Trial
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="#how-it-works"
              className="relative border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 px-4 py-2 rounded-xl font-semibold transition-all hover:-translate-y-0.5 text-lg flex items-center justify-center"
            >
              See How It Works
            </Link>
          </div>
        </motion.div>
      </section>


      <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How QRFeedback Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get set up in minutes and start collecting valuable customer feedback today.
          </p>
        </div>
        
        <div className="relative">
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} mb-6 md:mb-0`}>
                  <div className="md:hidden mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
                
                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 relative z-10">
                  {step.icon}
                </div>
                
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {index === 0 && (
                        <div className="text-center p-4">
                          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <QrCode className="w-8 h-8 text-white" />
                          </div>
                          <p className="font-medium">Sign Up Form</p>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="p-4">
                          <div className="w-32 h-32 bg-white p-2 rounded border-2 border-blue-500 flex items-center justify-center mx-auto">
                            <div className="grid grid-cols-3 gap-1">
                              {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-6 h-6 bg-black rounded-sm"></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="flex items-center justify-center space-x-4">
                          <Tablet className="w-16 h-16 text-gray-400" />
                          <Smartphone className="w-10 h-10 text-gray-400" />
                        </div>
                      )}
                      {index === 3 && (
                        <div className="text-center p-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <MessageSquare className="w-8 h-8 text-blue-600" />
                          </div>
                          <p className="font-medium">Feedback Form</p>
                        </div>
                      )}
                      {index === 4 && (
                        <div className="h-full w-full bg-gradient-to-br from-blue-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                          <PieChart className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to collect, analyze, and act on customer feedback.
            </p>
          </div>
          
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "all" ? 'bg-white dark:bg-gray-800 shadow text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
              >
                All Features
              </button>
              <button
                onClick={() => setActiveTab("free")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "free" ? 'bg-white dark:bg-gray-800 shadow text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
              >
                Free Plan
              </button>
              <button
                onClick={() => setActiveTab("pro")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "pro" ? 'bg-white dark:bg-gray-800 shadow text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
              >
                Pro Features
              </button>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatures.map(({ title, icon: Icon, pro, coming, description }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative border border-gray-200 dark:border-gray-700 rounded-2xl p-8 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition dark:bg-blue-900/30 dark:text-blue-300 dark:group-hover:bg-blue-600">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>
                
                {pro && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900/30 dark:text-yellow-300">
                    PRO FEATURE
                  </span>
                )}
                {coming && (
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    COMING SOON
                  </span>
                )}
                
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition">
                  <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Businesses</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don{"'"}t just take our word for it. Here{"'"}s what our customers say.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">{"'"}{testimonial.quote}{"'"}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3 dark:bg-blue-900/30 dark:text-blue-300">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the plan that fits your needs. No hidden fees.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative border rounded-2xl p-8 ${plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200 dark:border-gray-700'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/signup"
                  className={`block text-center py-3 px-6 rounded-lg font-medium ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-400 py-16 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <h1 className="text-xl font-bold flex gap-1 items-center">
                  <Image src={'/feednity-logo.png'} width={40} height={40} alt="logo"/>
                  feednity
                </h1>
              </div>
              <p className="text-sm mb-4">
                The modern way to collect and analyze customer feedback through QR codes & links.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'Integrations', 'Roadmap'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-3">
                {['Documentation', 'Guides', 'Blog', 'Support'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Contact', 'Legal'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} feednity. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}