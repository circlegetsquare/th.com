import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { tourDates } from '@/data/tourDates'
import { Calendar, MapPin, Ticket, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const TourDates = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const tourCardsRef = useRef([])

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

      // Tour cards staggered animation
      gsap.from(tourCardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return date.toLocaleDateString('en-US', options)
  }

  const getDateParts = (dateString) => {
    const date = new Date(dateString)
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: date.getDate()
    }
  }

  return (
    <section
      id="tour"
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900"
          >
            Tour Dates
          </h2>
          <p className="text-lg text-slate-600">
            Don't miss us live - get your tickets now!
          </p>
        </div>

        {/* Tour Dates Grid */}
        <div className="space-y-4">
          {tourDates.map((show, index) => {
            const dateParts = getDateParts(show.date)
            return (
              <Card
                key={show.id}
                ref={(el) => tourCardsRef.current[index] = el}
                className={`group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  show.soldOut ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    {/* Date Display */}
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 text-center">
                        <div className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center ${
                          show.soldOut ? 'bg-slate-200 text-slate-600' : 'bg-blue-600 text-white'
                        }`}>
                          <span className="text-xs font-medium">{dateParts.month}</span>
                          <span className="text-xl font-bold">{dateParts.day}</span>
                        </div>
                      </div>

                      {/* Show Details */}
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-1 ${
                          show.soldOut ? 'text-slate-600' : 'text-slate-900'
                        }`}>
                          {show.venue}
                        </h3>
                        <p className={`flex items-center gap-2 mb-2 ${
                          show.soldOut ? 'text-slate-500' : 'text-slate-600'
                        }`}>
                          <MapPin className="h-4 w-4" />
                          {show.city}, {show.country}
                        </p>
                        <p className={`text-sm ${
                          show.soldOut ? 'text-slate-500' : 'text-slate-500'
                        }`}>
                          {formatDate(show.date)}
                        </p>
                      </div>
                    </div>

                    {/* Ticket Button */}
                    <div className="flex-shrink-0">
                      {show.soldOut ? (
                        <Button
                          variant="outline"
                          disabled
                          className="bg-slate-100 border-slate-300 text-slate-500 cursor-not-allowed"
                        >
                          <Ticket className="h-4 w-4 mr-2" />
                          Sold Out
                        </Button>
                      ) : (
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white group-hover:scale-105 transition-transform"
                          onClick={() => window.open(show.ticketsUrl, '_blank')}
                        >
                          <Ticket className="h-4 w-4 mr-2" />
                          Get Tickets
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-6">
            Want to stay updated on new tour dates?
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Join Our Mailing List
          </Button>
        </div>
      </div>
    </section>
  )
}

export default TourDates