import React, { useState, useEffect } from 'react';
import WorkoutCard from './components/WorkoutCard';
import Filter from './components/Filter';
import data from './data/workouts.json';
import './App.css';
import muscleMapping from './data/muscleMapping.json';

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

function JsonProcessor() {
      // Ensure the imported data is an array
      if (!Array.isArray(data)) {
        console.error("JSON data is not an array");
        return;
    }

    // Loop over the JSON array and set the id to the array index
    data.forEach((item, index) => {
        item.id = index;
    });

    // Convert the updated JSON data to a string
    const updatedJsonString = JSON.stringify(data, null, 4);
    console.log(updatedJsonString);

}

const App: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([]);
    const [muscleGroups, setMuscleGroups] = useState<string[]>([]);

    useEffect(() => {
        setWorkouts(data);
        setFilteredWorkouts(data);
        JsonProcessor();

        // Extract unique muscle groups from the data
        const uniqueMuscleGroups = Array.from(new Set(data.flatMap(workout => workout.focus)));
        setMuscleGroups(uniqueMuscleGroups);
    }, []);

    const handleFilter = ({ muscleGroup, numWorkouts, experienceLevel }: { muscleGroup: string; numWorkouts: number; experienceLevel: string; }) => {
      let filtered = workouts;

      if (muscleGroup) {
          const focusMuscles = muscleMapping[muscleGroup as keyof typeof muscleMapping];
          filtered = filtered.filter(workout => workout.focus.some(focus => focusMuscles.includes(focus.toLowerCase())));
      }

      if (experienceLevel) {
        filtered = filtered.filter(workout => {
            if (experienceLevel.toLowerCase() === 'advanced') {
                return true; // Advanced can access all levels
            }
            if (experienceLevel.toLowerCase() === 'intermediate') {
                return workout.experience_level.toLowerCase() === 'intermediate' || workout.experience_level.toLowerCase() === 'beginner';
            }
            return workout.experience_level.toLowerCase() === 'beginner';
        });
    }

        // Shuffle the filtered array and select the specified number of workouts
        filtered = filtered.sort(() => 0.5 - Math.random()).slice(0, numWorkouts);

        setFilteredWorkouts(filtered);
    };

    return (
        <div className="app">
          <div className="header">
          <h1 className="title">Get Fit</h1>
            <span className="subtitle">by Ponni</span>
          </div>
  

            <Filter onFilter={handleFilter} />
            <div className="workout-list">
            {filteredWorkouts.map(workout => (
                    <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
        </div>
    );
};

export default App;