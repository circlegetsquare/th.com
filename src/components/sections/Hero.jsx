import TH_bg from '../../assets/TH_bg.jpg'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={TH_bg}
          alt="Band Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 text-center w-3/4 mx-auto">
     
        <div className="flex justify-center">
          <div className="relative w-full aspect-video">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/LCFULmVm-Mo?si=BMnYRF8RN-RblR3S"
              title="YouTube video player"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero