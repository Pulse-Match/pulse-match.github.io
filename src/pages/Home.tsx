import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { PhoneMockup } from "../components/PhoneMockup";
import { WaitlistForm } from "../components/WaitlistForm";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Home.css";

export function Home() {
  const containerRef = useScrollReveal();
  const [pinsDropped, setPinsDropped] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Map pins drop animation on scroll
    const handleScroll = () => {
      if (!pinsDropped && window.scrollY > 50) {
        setPinsDropped(true);
      }

      // Phone scale animations
      const storyPhones = document.querySelectorAll(
        ".story-phone-container .phone-mockup",
      );
      const heroPhone = document.querySelector(".hero-phone .phone-mockup");

      storyPhones.forEach((phone) => {
        const rect = phone.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const distanceFromCenter =
          rect.top + rect.height / 2 - viewportHeight / 2;
        const progress =
          1 -
          Math.min(1, Math.max(0, distanceFromCenter / (viewportHeight * 0.6)));
        const minScale = 0.8;
        const maxScale = 1.05;
        const scale = minScale + progress * (maxScale - minScale);
        const offsetY = (1 - progress) * 30;

        (phone as HTMLElement).style.transform =
          `scale(${scale}) translateY(${offsetY}px)`;
        (phone as HTMLElement).style.opacity = String(
          Math.min(1, 0.5 + progress * 0.5),
        );
      });

      if (heroPhone) {
        const scrollY = window.scrollY;
        const maxScroll = 400;
        const progress = Math.min(1, scrollY / maxScroll);
        const scale = 1 + progress * 0.15;
        (heroPhone as HTMLElement).style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pinsDropped]);

  return (
    <Layout>
      <div ref={containerRef}>
        <main>
          {/* Hero with Phone */}
          <section className="hero-split">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                Launching 2026
              </div>
              <h1 className="display-hero">
                Stop Planning,
                <br />
                Just <span className="text-gradient">Play.</span>
              </h1>
              <p className="hero-subtitle">
                The app that turns "anyone free?" into game time.
              </p>
              <div className="scroll-hint">
                <span>Scroll to explore</span>
                <div className="scroll-arrow">&#8595;</div>
              </div>
            </div>
            <div className="hero-phone">
              <div className="phone-with-pins">
                <PhoneMockup
                  lightSrc="/home-screen-light.png"
                  darkSrc="/home-screen-dark.PNG"
                  alt="Glid Home Screen"
                  size="xl"
                />
                {/* Animated map pins */}
                <div className="map-pins">
                  <div
                    className={`map-pin pin-1 ${pinsDropped ? "dropped" : ""}`}
                  >
                    <div className="pin-icon">&#127934;</div>
                  </div>
                  <div
                    className={`map-pin pin-2 ${pinsDropped ? "dropped" : ""}`}
                  >
                    <div className="pin-icon">&#127936;</div>
                  </div>
                  <div
                    className={`map-pin pin-3 ${pinsDropped ? "dropped" : ""}`}
                  >
                    <div className="pin-icon">&#9917;</div>
                  </div>
                  <div
                    className={`map-pin pin-4 ${pinsDropped ? "dropped" : ""}`}
                  >
                    <div className="pin-icon">&#127955;</div>
                  </div>
                  <div
                    className={`map-pin pin-5 ${pinsDropped ? "dropped" : ""}`}
                  >
                    <div className="pin-icon">&#127947;</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Scroll Story Section 1: The Problem */}
          <section className="story-section" id="problem">
            <div className="story-content">
              <div className="story-number">01</div>
              <h2 className="story-title reveal">The Problem</h2>
              <p className="story-text reveal delay-1">
                You want to play tennis this weekend.
                <br />
                You text 10 friends. 3 reply. None are free.
                <br />
                <strong>Sound familiar?</strong>
              </p>
              <p className="story-text reveal delay-2">
                Finding people to play with shouldn't be harder than the game
                itself.
              </p>
            </div>
          </section>

          {/* Scroll Story Section 2: Discover */}
          <section className="story-section story-with-phone" id="discover">
            <div className="story-phone-container">
              <PhoneMockup
                lightSrc="/map-screen-light.PNG"
                darkSrc="/Map-screen-dark.PNG"
                alt="Live Map"
                size="lg"
              />
            </div>
            <div className="story-content">
              <div className="story-number">02</div>
              <h2 className="story-title reveal">Discover</h2>
              <h3 className="story-headline reveal delay-1">
                Find games happening now
              </h3>
              <p className="story-text reveal delay-2">
                Open the map. See every session near you in real-time. Tennis at
                the park. Basketball downtown. Pickleball at noon.
              </p>
              <div className="story-features reveal delay-3">
                <div className="feature-tag">Live Map</div>
                <div className="feature-tag">Any Sport</div>
                <div className="feature-tag">Real-time</div>
              </div>
            </div>
          </section>

          {/* Scroll Story Section 3: Browse Sessions */}
          <section
            className="story-section story-with-phone story-reverse"
            id="play"
          >
            <div className="story-phone-container">
              <PhoneMockup
                lightSrc="/plays-list-light.PNG"
                darkSrc="/plays-list-dark.PNG"
                alt="Sessions List"
                size="lg"
              />
            </div>
            <div className="story-content">
              <div className="story-number">03</div>
              <h2 className="story-title reveal">Browse</h2>
              <h3 className="story-headline reveal delay-1">
                Scroll through sessions
              </h3>
              <p className="story-text reveal delay-2">
                Every card is a real game. No more group chats trying to
                coordinate schedules. See a session that fits? Swipe to join.
                Can't find what you're looking for? Create your own session and
                the players who share your interests get notified instantly.
              </p>
              <div className="story-features reveal delay-3">
                <div className="feature-tag">Swipe to Join</div>
                <div className="feature-tag">Create Sessions</div>
                <div className="feature-tag">Instant Notifications</div>
              </div>
            </div>
          </section>

          {/* Scroll Story Section 4: Match with Players */}
          <section className="story-section story-with-phone" id="match">
            <div className="story-phone-container">
              <PhoneMockup
                lightSrc="/people screen Card not flipped light.PNG"
                darkSrc="/people screen card not flipped dark.PNG"
                alt="Player Cards"
                size="lg"
              />
            </div>
            <div className="story-content">
              <div className="story-number">04</div>
              <h2 className="story-title reveal">Match</h2>
              <h3 className="story-headline reveal delay-1">
                Find your perfect playing partners
              </h3>
              <p className="story-text reveal delay-2">
                Connect with players who match your style. Our algorithm curates
                people based on skill level, availability, and playing
                preferences. Every connection is someone you'll actually enjoy
                playing with.
              </p>
              <div className="story-scores reveal delay-3">
                <div className="score-item">
                  <span className="score-label">Match</span>
                  <span className="score-value score-match">Skill Level</span>
                </div>
                <div className="score-item">
                  <span className="score-label">Vibes</span>
                  <span className="score-value score-vibes">Reliability</span>
                </div>
              </div>
            </div>
          </section>

          {/* Scroll Story Section 5: Flip to Learn More */}
          <section
            className="story-section story-with-phone story-reverse"
            id="flip"
          >
            <div className="story-phone-container">
              <div
                className={`flip-card-demo ${isFlipped ? "flipped" : ""}`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <PhoneMockup
                      lightSrc="/people screen Card not flipped light.PNG"
                      darkSrc="/people screen card not flipped dark.PNG"
                      alt="Player Card Front"
                      size="lg"
                    />
                  </div>
                  <div className="flip-card-back">
                    <PhoneMockup
                      lightSrc="/people screen card flipped dark.PNG"
                      darkSrc="/people screen card flipped dark.PNG"
                      alt="Player Card Back"
                      size="lg"
                    />
                  </div>
                </div>
                <div className="flip-hint">
                  <span className="flip-icon">&#8635;</span>
                  <span>Tap to flip</span>
                </div>
              </div>
            </div>
            <div className="story-content">
              <div className="story-number">05</div>
              <h2 className="story-title reveal">Deep Dive</h2>
              <h3 className="story-headline reveal delay-1">
                Flip cards to see the full picture
              </h3>
              <p className="story-text reveal delay-2">
                Curious about a player? Tap their card to flip it and reveal
                detailed stats, play history, and mutual connections. See their
                Match score, Vibes rating, and reviews from players they've
                competed with.
              </p>
              <div className="story-features reveal delay-3">
                <div className="feature-tag">Detailed Stats</div>
                <div className="feature-tag">Play History</div>
                <div className="feature-tag">Player Reviews</div>
              </div>
            </div>
          </section>

          {/* Scroll Story Section 6: The Ratings */}
          <section className="story-section story-centered" id="ratings">
            <div className="story-content story-content-wide">
              <div className="story-number">06</div>
              <h2 className="story-title reveal">Smart Matching</h2>
              <h3 className="story-headline reveal delay-1">
                Two ratings. Zero guesswork.
              </h3>
              <p
                className="story-text reveal delay-2"
                style={{ maxWidth: "600px", margin: "0 auto" }}
              >
                Every player gets two scores that update after every game.
              </p>

              <div className="ratings-grid reveal delay-3">
                <div className="rating-card">
                  <div className="rating-badge rating-match">Match</div>
                  <h4>Your Skill Level</h4>
                  <p>
                    We track wins, consistency, and competitive edge. Play more,
                    match smarter.
                  </p>
                  <div className="rating-traits">
                    <span>Skill</span>
                    <span>Win Rate</span>
                    <span>Consistency</span>
                  </div>
                </div>
                <div className="rating-card">
                  <div className="rating-badge rating-vibes">Vibes</div>
                  <h4>Your Reliability</h4>
                  <p>
                    We track punctuality, sportsmanship, and energy. Good
                    reviews from reliable players count more.
                  </p>
                  <div className="rating-traits">
                    <span>Punctuality</span>
                    <span>Sportsmanship</span>
                    <span>Energy</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="cta-final" id="waitlist">
            <div className="cta-glow"></div>
            <div className="cta-content">
              <h2 className="cta-title reveal">
                Ready to <span className="text-gradient">play?</span>
              </h2>
              <p className="cta-subtitle reveal delay-1">
                Join the waitlist. Be first on the field when Glid launches in
                your city.
              </p>
              <div className="cta-form reveal delay-2">
                <WaitlistForm />
              </div>
              <p className="cta-note reveal delay-3">
                No spam. Just game time.
              </p>
            </div>

            {/* Phone showcase at the bottom */}
            <div className="cta-phones reveal delay-4">
              <PhoneMockup
                lightSrc="/home-screen-light.png"
                darkSrc="/home-screen-dark.PNG"
                alt="Glid App"
                size="sm"
                className="phone-cta-side"
              />
              <PhoneMockup
                lightSrc="/map-screen-light.PNG"
                darkSrc="/Map-screen-dark.PNG"
                alt="Live Map"
                size="md"
                className="phone-cta-center"
              />
              <PhoneMockup
                lightSrc="/people screen Card not flipped light.PNG"
                darkSrc="/people screen card not flipped dark.PNG"
                alt="Player Cards"
                size="sm"
                className="phone-cta-side"
              />
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
