import React from 'react';
import { format } from 'date-fns';

const PracticeLog = ({ practiceLog }) => {
  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Practice Log:</h3>
      <ul className="space-y-2">
        {practiceLog.map((entry, index) => (
          <li key={index} className="text-sm">
            <span className="font-medium">{format(new Date(entry.date), 'MMM d, yyyy')}</span>:
            Support Level - {entry.supportLevel}, Success Rating - {entry.successRating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PracticeLog;