"use client"
import { ChevronRight, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { ModeToggle } from "@/components/theme-provider"
import { useSession } from "next-auth/react"

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

const LandingPage = () =>{

    const { data: session } = useSession() 

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:opacity-10"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:opacity-10"></div>
      </div>

      <header className="w-[100%] flex justify-between items-center px-10 py-4 md:px-[10%] md:py-6 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-md fixed top-0 z-50 border-b border-gray-100 dark:border-gray-800">
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
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-2 items-center"
        >
          <ModeToggle />

        {
          session?.user ?
          <Link href={'/panel'}>
            <Image src={session?.user?.image} alt="Userimage" width={40} height={40} className="rounded-full border-2 border-white"/>
          </Link>
          :
            <Link
              href="/panel"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition flex items-center"
            >
              Get Started
              <Zap className="w-4 h-4 ml-2" />
            </Link>
        }

        </motion.div>
      </header>

      <section className="relative text-center px-6 py-20 md:py-80 h-[100vh] max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
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
              Join us now
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </section>

          
    

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


      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-400 py-16 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-4">
            <div>
              <div className="flex items-center mb-1">
                <h1 className="text-xl font-bold flex gap-1 items-center">
                  <Image src={'/feednity-logo.png'} width={40} height={40} alt="logo"/>
                  feednity
                </h1>
              </div>
            </div>
            
      
          </div>
          
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} feednity. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="https://soufianboukir.com" target="_blank" className="hover:underline">Developer</a>
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage;