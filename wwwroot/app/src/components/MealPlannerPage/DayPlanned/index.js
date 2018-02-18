import React from 'react';
import DayPlannedPlaceholder from './DayPlannedPlaceholder';
import Meal from '../Meal';

const DayPlanned = ({ day, onRemoveMeal }) => (
    <div className="swiper-slide">
        {day.meals.length === 0
            ? <DayPlannedPlaceholder />
            : day.meals.map(meal => <Meal key={meal.id} meal={meal} onRemoveMeal={onRemoveMeal} />)
        }
        <br />
    </div>
);

export default DayPlanned;