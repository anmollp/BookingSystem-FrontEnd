import React from 'react';

const format_date = (date) => {
    return date.getHours() + ':' + date.getMinutes();
}

export const TheaterShow = ({ theaterName, showDetails }) => {
    return (
        <div className="theater-show-container">
            <h2>{theaterName}</h2>
            {
                showDetails.map((show, i) => (
                    <p key={show.showId}>{format_date(show.startTime)} to {format_date(show.endTime)}</p>
                ))
            }
        </div>
    )
}

export default TheaterShow;
