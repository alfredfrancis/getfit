import React, { useState } from 'react';

interface Workout {
    id: number;
    gif: string;
    name: string;
    instructions: string[];
    modified: string;
    equipments: string[];
    focus: string[];
    recommended_weight: string;
    experience_level: string;
}

interface WorkoutCardProps {
    workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleVideoSearch = (e: React.MouseEvent) => {
        e.stopPropagation();
        const query = encodeURIComponent(`${workout.name} site:youtube.com`);
        const url = `http://www.google.com/search?q=${query}&btnI=Im+Feeling+Lucky`;
        window.open(url, '_blank');
    };

    return (
        <div className={`workout-card ${isExpanded ? 'expanded' : ''}`} onClick={handleExpandClick}>
            <h3>{workout.name}</h3>
            {isExpanded && (
                <div className="workout-details">
                    <p><strong>Focus:</strong> {workout.focus.join(', ')}</p>
                    <p><strong>Instructions:</strong></p>
                    <ul>
                        {workout.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ul>
                    <p><strong>Recommended Weight:</strong> {workout.recommended_weight}</p>
                    <p><strong>Experience Level:</strong> {workout.experience_level}</p>
                    <button onClick={handleVideoSearch}>Watch Video</button>
                </div>
            )}
        </div>
    );
};

export default WorkoutCard;