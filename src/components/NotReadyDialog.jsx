import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const NotReadyDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Not Ready? That's okay.</DialogTitle>
        </DialogHeader>
        <p>There is more to learn! The next section will go in detail for more learning.</p>
        <DialogFooter>
          <Button onClick={onClose}>Okay</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotReadyDialog;