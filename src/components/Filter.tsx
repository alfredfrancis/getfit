import React, { useState } from 'react';
import muscleMapping from '../data/muscleMapping.json';

interface FilterProps {
    onFilter: (filter: {
        muscleGroup: string;
        numWorkouts: number;
        experienceLevel: string;
    }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
    const [muscleGroup, setMuscleGroup] = useState<string>('');
    const [numWorkouts, setNumWorkouts] = useState<number>(3);
    const [experienceLevel, setExperienceLevel] = useState<string>('');

    const handleFilter = () => {
        onFilter({ muscleGroup, numWorkouts, experienceLevel });
    };

    return (
        <div className="filter">
            <div>
                <label>Muscle Group:</label>
                <select value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)}>
                    <option value="">All</option>
                    {Object.keys(muscleMapping).map((group, index) => (
                        <option key={index} value={group}>{group}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Number of Workouts:</label>
                <input type="number" value={numWorkouts} onChange={(e) => setNumWorkouts(parseInt(e.target.value))} />
            </div>
            <div>
                <label>Experience Level:</label>
                <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
                    <option value="">All</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>
            <button onClick={handleFilter}>Filter</button>
        </div>
    );
};

export default Filter;