
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGenders } from "@/hooks/useGenders";
import { AddGenderForm } from "@/components/AddGenderForm";

interface UserInfoFormProps {
  onComplete: (info: { gender: string; ageCategory: string }) => void;
  stepNumber: number;
}

export const UserInfoForm = ({ onComplete, stepNumber }: UserInfoFormProps) => {
  const [gender, setGender] = useState("");
  const [ageCategory, setAgeCategory] = useState("");
  const [showAddGender, setShowAddGender] = useState(false);
  const { genders, loading, error, refetch } = useGenders();

  const handleSubmit = () => {
    if (gender && ageCategory) {
      onComplete({ gender, ageCategory });
    }
  };

  const handleGenderAdded = () => {
    refetch();
    setShowAddGender(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Step {stepNumber}
        </span>
      </div>
      
      <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-16 h-1 bg-lime-400 rounded-full mx-auto mb-8"></div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Before we start</h1>
        
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          We need to know a little about you. We collect and use the following information to improve our ability to calculate your results.
        </p>
        
        <div className="space-y-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <label className="text-lg md:text-xl font-semibold text-gray-800">Gender</label>
            <div className="w-full md:w-64">
              {showAddGender && (
                <AddGenderForm onGenderAdded={handleGenderAdded} />
              )}
              <Select value={gender} onValueChange={setGender} disabled={loading}>
                <SelectTrigger className="w-full h-12 border-2 border-gray-300 rounded-full">
                  <SelectValue placeholder={loading ? "Loading..." : "Select gender"} />
                </SelectTrigger>
                <SelectContent>
                  {error ? (
                    <SelectItem value="error" disabled>Error loading genders</SelectItem>
                  ) : (
                    genders.map((genderOption) => (
                      <SelectItem key={genderOption.id} value={genderOption.name}>
                        {genderOption.name.charAt(0).toUpperCase() + genderOption.name.slice(1)}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAddGender(!showAddGender)}
                className="mt-2 text-xs"
              >
                {showAddGender ? "Cancel" : "Add new gender"}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <label className="text-lg md:text-xl font-semibold text-gray-800">Age Category</label>
            <Select value={ageCategory} onValueChange={setAgeCategory}>
              <SelectTrigger className="w-full md:w-64 h-12 border-2 border-gray-300 rounded-full">
                <SelectValue placeholder="70+" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="18-29">18-29</SelectItem>
                <SelectItem value="30-39">30-39</SelectItem>
                <SelectItem value="40-49">40-49</SelectItem>
                <SelectItem value="50-59">50-59</SelectItem>
                <SelectItem value="60-69">60-69</SelectItem>
                <SelectItem value="70+">70+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-8">
          This is a hearing screener for people 18 and older.
        </p>
        
        <Button 
          onClick={handleSubmit}
          disabled={!gender || !ageCategory || loading}
          className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white px-12 py-3 text-lg rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
