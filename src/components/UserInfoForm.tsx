
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserInfoFormProps {
  onComplete: (info: { gender: string; ageCategory: string }) => void;
}

export const UserInfoForm = ({ onComplete }: UserInfoFormProps) => {
  const [gender, setGender] = useState("");
  const [ageCategory, setAgeCategory] = useState("");

  const handleSubmit = () => {
    if (gender && ageCategory) {
      onComplete({ gender, ageCategory });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-16 h-1 bg-lime-400 rounded-full mx-auto mb-8"></div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Before we start</h1>
        
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          We need to know a little about you. We collect and use the following information to improve our ability to calculate your results.
        </p>
        
        <div className="space-y-8 mb-12">
          <div className="flex items-center justify-between">
            <label className="text-xl font-semibold text-gray-800">Gender</label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="w-64 h-12 border-2 border-gray-300 rounded-full">
                <SelectValue placeholder="Prefer not to say" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-xl font-semibold text-gray-800">Age Category</label>
            <Select value={ageCategory} onValueChange={setAgeCategory}>
              <SelectTrigger className="w-64 h-12 border-2 border-gray-300 rounded-full">
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
          disabled={!gender || !ageCategory}
          className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white px-12 py-3 text-lg rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
