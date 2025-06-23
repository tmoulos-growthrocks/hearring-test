
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddGenderFormProps {
  onGenderAdded: () => void;
}

export const AddGenderForm = ({ onGenderAdded }: AddGenderFormProps) => {
  const [newGender, setNewGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newGender.trim()) {
      toast({
        title: "Error",
        description: "Please enter a gender name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('genders')
        .insert([{ name: newGender.toLowerCase().trim() }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Error",
            description: "This gender already exists",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success",
          description: "Gender added successfully",
        });
        setNewGender("");
        onGenderAdded();
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to add gender',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        placeholder="Add new gender..."
        value={newGender}
        onChange={(e) => setNewGender(e.target.value)}
        className="flex-1"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading || !newGender.trim()}
        size="sm"
      >
        {isLoading ? "Adding..." : "Add"}
      </Button>
    </form>
  );
};
