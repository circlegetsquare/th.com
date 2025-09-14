import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Camera, Maximize2, Download } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const galleryRef = useRef(null)
  const imageRefs = useRef([])

  // Placeholder images - in a real app, these would come from your data
  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Band performing live on stage',
      caption: 'Live at Madison Square Garden'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Studio recording session',
      caption: 'Recording "Electric Dreams"'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Band backstage',
      caption: 'Behind the scenes'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Crowd at concert',
      caption: 'Amazing crowd energy'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Guitar close-up',
      caption: 'Sarah\'s signature guitar'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Drum kit on stage',
      caption: 'Mike\'s custom drum setup'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1520637836862-4d197d17c816?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Band group photo',
      caption: 'Official band photo 2024'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Festival performance',
      caption: 'Summer festival tour'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1516981879613-90ef8f902353?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Sound check',
      caption: 'Sound check before show'
    }
  ]

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

      // Gallery images staggered animation
      gsap.from(imageRefs.current, {
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
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

  const handleImageClick = (image) => {
    // In a real app, this would open a lightbox/modal
    console.log('Open image in lightbox:', image)
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-b from-slate-900 to-black text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            Gallery
          </h2>
          <p className="text-lg text-white/80">
            Capturing our journey through music and moments
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {galleryImages.map((image, index) => (
            <Card
              key={image.id}
              ref={(el) => imageRefs.current[index] = el}
              className="group cursor-pointer overflow-hidden bg-slate-800 border-slate-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
              onClick={() => handleImageClick(image)}
            >
              <CardContent className="p-0 relative">
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-medium text-sm mb-2">
                        {image.caption}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="text-xs bg-white/20 hover:bg-white/30 text-white border-white/30"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleImageClick(image)
                          }}
                        >
                          <Maximize2 className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="text-xs bg-white/20 hover:bg-white/30 text-white border-white/30"
                          onClick={(e) => {
                            e.stopPropagation()
                            // In a real app, this would trigger a download
                            console.log('Download image:', image.src)
                          }}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Camera icon overlay */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="h-6 w-6 text-white/80" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-white/80 mb-6">
            Want to see more exclusive content and behind-the-scenes photos?
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-black transition-colors"
          >
            <Camera className="h-5 w-5 mr-2" />
            Follow Us on Instagram
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Gallery