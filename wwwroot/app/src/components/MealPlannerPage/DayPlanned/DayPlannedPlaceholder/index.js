import React from 'react';

const DayPlannedPlaceholder = () => (
    <div className="pes-day-planned-placeholder">
        <h1 className="pes-day-planned-placeholder__title"> You have not added any meals for this day. What about planning a healthy meal?  </h1>
        <img
            className="pes-day-planned-placeholder__image"
            alt="Placeholder for no meals"
            src="/images/no-meals-placeholder.jpg" />
    </div>
);

export default DayPlannedPlaceholder;