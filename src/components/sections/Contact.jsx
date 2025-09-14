import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { bandInfo } from '@/data/bandInfo'
import {
  Mail,
  Send,
  User,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Music,
  Apple
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const socialRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })

      // Form animation
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      })

      // Social links animation
      gsap.from(socialRef.current, {
        scrollTrigger: {
          trigger: socialRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out"
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData)
      // Reset form
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
      alert('Thank you for your message! We\'ll get back to you soon.')
    }, 1500)
  }

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'spotify':
        return <Music className="h-6 w-6" />
      case 'apple':
        return <Apple className="h-6 w-6" />
      case 'youtube':
        return <Youtube className="h-6 w-6" />
      case 'instagram':
        return <Instagram className="h-6 w-6" />
      case 'twitter':
        return <Twitter className="h-6 w-6" />
      case 'facebook':
        return <Facebook className="h-6 w-6" />
      default:
        return <Music className="h-6 w-6" />
    }
  }

  const getSocialColor = (platform) => {
    switch (platform.toLowerCase()) {
      case 'spotify':
        return 'hover:bg-green-600'
      case 'apple':
        return 'hover:bg-gray-800'
      case 'youtube':
        return 'hover:bg-red-600'
      case 'instagram':
        return 'hover:bg-pink-600'
      case 'twitter':
        return 'hover:bg-blue-500'
      case 'facebook':
        return 'hover:bg-blue-700'
      default:
        return 'hover:bg-blue-600'
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900"
          >
            Get In Touch
          </h2>
          <p className="text-lg text-slate-600">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card ref={formRef} className="border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                Send us a message
              </CardTitle>
              <CardDescription className="text-slate-600">
                Whether it's about booking, press inquiries, or just to say hello!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    <MessageSquare className="h-4 w-4 inline mr-1" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Social Links & Info */}
          <div ref={socialRef} className="space-y-8">
            {/* Social Media Links */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">
                  Follow Us
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Stay connected for the latest updates, behind-the-scenes content, and new music
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(bandInfo.socialLinks).map(([platform, url]) => (
                    <Button
                      key={platform}
                      variant="outline"
                      className={`flex items-center gap-3 p-4 h-auto justify-start border-slate-200 hover:border-transparent ${getSocialColor(platform)} hover:text-white transition-all duration-300 group`}
                      onClick={() => window.open(url, '_blank')}
                    >
                      <div className="flex-shrink-0">
                        {getSocialIcon(platform)}
                      </div>
                      <div className="text-left">
                        <div className="font-medium capitalize">{platform}</div>
                        <div className="text-xs text-slate-500 group-hover:text-white/80">
                          Follow us
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">
                  Other Ways to Reach Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Press Inquiries</div>
                    <div className="text-sm text-slate-600">press@bandname.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Music className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Booking</div>
                    <div className="text-sm text-slate-600">booking@bandname.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">General</div>
                    <div className="text-sm text-slate-600">info@bandname.com</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact