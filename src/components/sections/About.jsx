import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { bandInfo } from '@/data/bandInfo'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const bioRef = useRef(null)
  const membersRef = useRef(null)
  const memberCardsRef = useRef([])

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

      // Bio text animation
      gsap.from(bioRef.current, {
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      })

      // Member cards staggered animation
      gsap.from(memberCardsRef.current, {
        scrollTrigger: {
          trigger: membersRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900"
          >
            About Us
          </h2>
          <p
            ref={bioRef}
            className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
          >
            {bandInfo.bio}
          </p>
        </div>

        {/* Band Members */}
        <div ref={membersRef}>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-slate-900">
            Meet the Band
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bandInfo.members.map((member, index) => (
              <Card
                key={member.name}
                ref={(el) => memberCardsRef.current[index] = el}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-slate-200"
              >
                <CardHeader className="pb-4">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`
                      }}
                    />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About