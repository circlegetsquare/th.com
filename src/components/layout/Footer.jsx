import { bandInfo } from '@/data/bandInfo'

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Band Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{bandInfo.name}</h3>
            <p className="text-muted-foreground">
              Experience the sound that's defining a generation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              <li><a href="#music" className="text-muted-foreground hover:text-foreground transition-colors">Music</a></li>
              <li><a href="#tour" className="text-muted-foreground hover:text-foreground transition-colors">Tour Dates</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {Object.entries(bandInfo.socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors capitalize"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; 2024 {bandInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer