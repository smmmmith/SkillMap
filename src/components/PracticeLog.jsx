import React from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PracticeLog = ({ practiceLog }) => {
  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Practice Log:</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Support Level</TableHead>
            <TableHead>Success Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {practiceLog.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{format(new Date(entry.date), 'MMM d, yyyy')}</TableCell>
              <TableCell>{entry.supportLevel}</TableCell>
              <TableCell>{entry.successRating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PracticeLog;