import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { albums, singles } from '@/data/music'
import { Play, ExternalLink, Music as MusicIconLucide, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Music = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const albumsRef = useRef(null)
  const singlesRef = useRef(null)
  const albumCardsRef = useRef([])
  const singleCardsRef = useRef([])

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

      // Album cards animation
      gsap.from(albumCardsRef.current, {
        scrollTrigger: {
          trigger: albumsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      })

      // Singles cards animation
      gsap.from(singleCardsRef.current, {
        scrollTrigger: {
          trigger: singlesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const StreamingLinks = ({ links }) => (
    <div className="flex gap-2 flex-wrap">
      {Object.entries(links).map(([platform, url]) => (
        <Button
          key={platform}
          variant="outline"
          size="sm"
          className="capitalize hover:bg-blue-50 hover:border-blue-300"
          onClick={() => window.open(url, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-1" />
          {platform}
        </Button>
      ))}
    </div>
  )

  const TrackList = ({ tracks }) => (
    <div className="space-y-2">
      {tracks.map((track) => (
        <div
          key={track.number}
          className="flex items-center justify-between p-2 rounded hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 w-6 text-center">
              {track.number}
            </span>
            <span className="font-medium text-slate-900">{track.title}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-3 w-3" />
            {track.duration}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section
      id="music"
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-800 text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            Our Music
          </h2>
        </div>

        {/* Albums Section */}
        <div ref={albumsRef} className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
            Albums
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {albums.map((album, index) => (
              <Card
                key={album.id}
                ref={(el) => albumCardsRef.current[index] = el}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white/95 backdrop-blur-sm border-white/20"
              >
                <CardHeader className="pb-4">
                  <div className="flex gap-6">
                    <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                      <img
                        src={album.cover}
                        alt={album.title}
                        className="w-32 h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80`
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                        {album.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600 mb-4">
                        Released {album.releaseDate}
                      </CardDescription>
                      <StreamingLinks links={album.streamingLinks} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <MusicIconLucide className="h-4 w-4" />
                      Track Listing
                    </h4>
                    <TrackList tracks={album.tracks} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Singles Section */}
        {singles.length > 0 && (
          <div ref={singlesRef}>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
              Latest Singles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {singles.map((single, index) => (
                <Card
                  key={single.id}
                  ref={(el) => singleCardsRef.current[index] = el}
                  className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/95 backdrop-blur-sm border-white/20"
                >
                  <CardHeader className="pb-4">
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <img
                        src={single.cover}
                        alt={single.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900">
                      {single.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {single.duration} • Released {new Date(single.releaseDate).getFullYear()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StreamingLinks links={single.streamingLinks} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Music