import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Button from '@/components/core/Button';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { getResError } from '@/lib/fetcher';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<any>;
  itemName: string;
  itemType: string;
  customMessage?: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onDelete,
  itemName,
  itemType,
  customMessage,
}: DeleteConfirmationModalProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
      onClose();
      toast.success(`The ${itemType} "${itemName}" has been successfully deleted.`);
    } catch (error) {
      console.error(`Failed to delete ${itemType}:`, error);
      toast.error(`Failed to delete the ${itemType}. Please try again.`, {
        description: getResError(error),
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-destructive">
            <AlertTriangle className="h-6 w-6" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="text-base font-medium">
            {customMessage || `Are you sure you want to delete the ${itemType} "${itemName}"?`}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete the {itemType} and remove all associated data.
          </p>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} loading={isDeleting}>
            {isDeleting ? 'Deleting...' : `Yes, Delete ${itemType}`}
          </Button>
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
