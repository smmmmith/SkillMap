import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PracticeLogModal = ({ isOpen, onClose, onSubmit }) => {
  const [supportLevel, setSupportLevel] = useState("");
  const [successRating, setSuccessRating] = useState("");

  const handleSubmit = () => {
    if (supportLevel && successRating) {
      onSubmit(supportLevel, successRating);
      setSupportLevel("");
      setSuccessRating("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Practice</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="support" className="text-right">
              Level of Support
            </Label>
            <Select onValueChange={setSupportLevel} value={supportLevel}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select level of support" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="little">Little</SelectItem>
                <SelectItem value="some">Some</SelectItem>
                <SelectItem value="lot">A Lot</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="success" className="text-right">
              Success Rating
            </Label>
            <Select onValueChange={setSuccessRating} value={successRating}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select success rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 - Not Successful</SelectItem>
                <SelectItem value="2">2 - Slightly Successful</SelectItem>
                <SelectItem value="3">3 - Moderately Successful</SelectItem>
                <SelectItem value="4">4 - Very Successful</SelectItem>
                <SelectItem value="5">5 - Extremely Successful</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Submit Log</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PracticeLogModal;