import React from 'react';
import { motion } from 'framer-motion';
import './SportsOrbit.css';

interface Sport {
    emoji: string;
    label: string;
}

const sports: Sport[] = [
    { emoji: '⚽', label: 'Soccer' },
    { emoji: '🏀', label: 'Basketball' },
    { emoji: '🎾', label: 'Tennis' },
    { emoji: '🏐', label: 'Volleyball' },
    { emoji: '🏈', label: 'Football' },
    { emoji: '⚾', label: 'Baseball' },
    { emoji: '🏓', label: 'Table Tennis' },
    { emoji: '⛳', label: 'Golf' },
];

const SolarSports: React.FC = () => {
    return (
        <div className="solar-container">
            {/* The "Sun" - Stadium Hub stays still */}
            <div className="center-hub-center">
                <span style={{ fontSize: '2.5rem' }}>🏟️</span>
            </div>

            {/* Orbiting System - Rotating Clockwise */}
            <motion.div
                className="orbit-system-rotating"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                {/* Visual Orbit Rings */}
                <div className="orbit-ring outer" />
                <div className="orbit-ring inner" />

                {/* Orbiting Sports */}
                {sports.map((sport, index) => {
                    const angle = (index / sports.length) * 2 * Math.PI;
                    const radius = 140;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <div
                            key={sport.label}
                            className="sport-item"
                            style={{
                                position: 'absolute',
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            {/* Counter-rotation to keep emoji upright while parent spins */}
                            <motion.div
                                className="emoji-wrapper"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                whileHover={{ scale: 1.2, zIndex: 50 }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>{sport.emoji}</span>
                            </motion.div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default SolarSports;
