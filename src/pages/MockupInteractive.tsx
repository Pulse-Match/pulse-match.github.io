import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './MockupInteractive.css';

export interface Match {
    id: string;
    sport: string;
    icon: string;
    time: string;
    location: string;
    distance: string;
    spots: string;
    playerName: string;
}

const SportCard = ({ match, index, onRemove }: {
    match: Match, index: number, onRemove: (id: string) => void
}) => {
    const cardRef = useRef(null);

    // Track the scroll progress of the card relative to the window scroll
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"] // 0 at bottom, 0.5 at center, 1 at top
    });

    // Requirement: First two swipe left (-600), others swipe right (600)
    const isEarlyCard = index < 2;
    const targetX = isEarlyCard ? -600 : 600;

    // Transform vertical scroll progress into horizontal movement
    // Widen range to [0.45, 0.9] to make the swipe feel slower per scroll unit
    const autoX = useTransform(scrollYProgress, [0.45, 0.9], [0, targetX]);
    const autoOpacity = useTransform(scrollYProgress, [0.75, 0.95], [1, 0]);

    return (
        <motion.div
            ref={cardRef}
            layout
            style={{ x: autoX, opacity: autoOpacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 100) onRemove(match.id);
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
                x: isEarlyCard ? -600 : 600,
                opacity: 0,
                transition: { duration: 0.3 }
            }}
            className="sport-card"
        >
            <div className="card-left">
                <span className="label-casual">Casual</span>
                <div className="title-row">
                    <span className="sport-icon">{match.icon}</span>
                    <h4 className="sport-title">{match.sport}</h4>
                </div>
                <div className="location-row">
                    <span className="pin">📍</span>
                    <p className="location-text">{match.location}</p>
                </div>
            </div>

            <div className="card-center">
                <div className="time-pill">{match.time}</div>
                <span className="distance-text">{match.distance}</span>
                <span className="spots-text">{match.spots} spots</span>
            </div>

            <div className="card-right">
                <div className="radar-pentagon"><div className="radar-fill" /></div>
                <span className="player-name">{match.playerName}</span>
            </div>
        </motion.div>
    );
};

interface MockupInteractiveProps {
    className?: string;
}

export default function MockupInteractive({
    className = ''
}: MockupInteractiveProps) {
    const [matches, setMatches] = useState<Match[]>([
        { id: '1', sport: "Tennis", icon: "🎾", time: "6:37 PM", location: "Meadowbrook Tennis Cen...", distance: "2953 ft away", spots: "1/4", playerName: "Jamie Lee" },
        { id: '2', sport: "Tennis", icon: "🎾", time: "9:37 PM", location: "Sunset Park Courts", distance: "1.9 mi away", spots: "1/2", playerName: "Morgan Chen" },
        { id: '3', sport: "Basketball", icon: "🏀", time: "5:37 PM", location: "Community Recreation Ce...", distance: "1.1 mi away", spots: "4/8", playerName: "Taylor Brooks" },
        { id: '4', sport: "Basketball", icon: "🏀", time: "7:37 PM", location: "Riverside Outdoor Courts", distance: "1.5 mi away", spots: "2/6", playerName: "Jordan Park" },
        { id: '5', sport: "Volleyball", icon: "🏐", time: "8:37 PM", location: "Brighton Beach Volleyball", distance: "3.2 mi away", spots: "6/12", playerName: "Casey Rivers" },
    ]);

    const removeMatch = (id: string) => setMatches(prev => prev.filter(m => m.id !== id));

    return (
        <div className={`mockup-interactive-container ${className}`}>
            <div className="device-shell">
                <div className="device-bezel">
                    <div className="app-viewport">
                        <header className="app-header">
                            <button className="icon-btn-circle">‹</button>
                            <div className="header-content">
                                <h1 className="main-title">Casual Play</h1>
                                <p className="sub-title">Just for fun</p>
                            </div>
                            <div className="profile-circle">P</div>
                        </header>

                        <div className="scroll-view">
                            <AnimatePresence mode="popLayout">
                                {matches.length > 0 ? (
                                    matches.map((match, idx) => (
                                        <div key={match.id}>
                                            {(idx === 0 || matches[idx - 1].sport !== match.sport) && (
                                                <h3 className="category-label">{match.sport}</h3>
                                            )}
                                            <SportCard
                                                match={match}
                                                index={idx}
                                                onRemove={removeMatch}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="empty-state-container"
                                    >
                                        <div className="emoji-face">😊</div>
                                        <h2>No casual sessions</h2>
                                        <p>Check back later or start a casual game</p>
                                        <button className="create-session-btn">Create Session</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}