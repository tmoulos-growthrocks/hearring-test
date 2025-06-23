import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useGenders } from "@/hooks/useGenders";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Plus } from "lucide-react";

const Genders = () => {
  const { genders, loading, error, refetch } = useGenders();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [newGender, setNewGender] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [genderToDelete, setGenderToDelete] = useState<{ id: number; name: string } | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const { toast } = useToast();

  const handleEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleSave = async (id: number) => {
    if (!editingName.trim()) {
      toast({
        title: "Error",
        description: "Gender name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('genders')
        .update({ name: editingName.toLowerCase().trim() })
        .eq('id', id);

      if (error) {
        if (error.code === '23505') {
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
          description: "Gender updated successfully",
        });
        setEditingId(null);
        setEditingName("");
        refetch();
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to update gender',
        variant: "destructive",
      });
    }
  };

  const handleAdd = async () => {
    if (!newGender.trim()) {
      toast({
        title: "Error",
        description: "Please enter a gender name",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('genders')
        .insert([{ name: newGender.toLowerCase().trim() }]);

      if (error) {
        if (error.code === '23505') {
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
        setIsAdding(false);
        refetch();
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to add gender',
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingName("");
    setIsAdding(false);
    setNewGender("");
  };

  const handleDeleteClick = (id: number, name: string) => {
    setGenderToDelete({ id, name });
    setDeleteConfirmation("");
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!genderToDelete || deleteConfirmation !== "DELETE") return;

    try {
      const { error } = await supabase
        .from('genders')
        .delete()
        .eq('id', genderToDelete.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `"${genderToDelete.name}" has been removed successfully`,
      });
      refetch();
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to delete gender',
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setGenderToDelete(null);
      setDeleteConfirmation("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading genders...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gender Management</h1>
          <p className="text-gray-600">Manage gender options for the application</p>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Genders</h2>
            <Button
              onClick={() => setIsAdding(true)}
              disabled={isAdding}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Gender
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isAdding && (
                <TableRow>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Input
                      value={newGender}
                      onChange={(e) => setNewGender(e.target.value)}
                      placeholder="Enter gender name"
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        onClick={handleAdd}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {genders.map((gender) => (
                <TableRow key={gender.id}>
                  <TableCell>{gender.id}</TableCell>
                  <TableCell>
                    {editingId === gender.id ? (
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      <span className="capitalize">{gender.name}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(gender.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingId === gender.id ? (
                      <div className="flex gap-2 justify-end">
                        <Button
                          onClick={() => handleSave(gender.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2 justify-end">
                        <Button
                          onClick={() => handleEdit(gender.id, gender.name)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                          <AlertDialogTrigger asChild>
                            <Button
                              onClick={() => handleDeleteClick(gender.id, gender.name)}
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure you want to delete this gender?</AlertDialogTitle>
                              <AlertDialogDescription>
                                You're about to remove "{genderToDelete?.name}" from the system. 
                                This action cannot be undone, but don't worry - you can always add it back later if needed! 
                                <br /><br />
                                To confirm this action, please type <strong>DELETE</strong> in the field below:
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="my-4">
                              <Input
                                value={deleteConfirmation}
                                onChange={(e) => setDeleteConfirmation(e.target.value)}
                                placeholder="Type DELETE to confirm"
                                className="w-full"
                              />
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setDeleteConfirmation("")}>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteConfirm}
                                disabled={deleteConfirmation !== "DELETE"}
                                className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
                              >
                                Yes, delete it
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {genders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No genders found. Add one to get started.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Genders;
