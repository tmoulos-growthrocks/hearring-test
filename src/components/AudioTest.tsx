
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Volume2, VolumeX, Play, Pause } from "lucide-react";

interface AudioTestProps {
  testNumber: number;
  totalTests: number;
  instruction: string;
  onNext: () => void;
  stepNumber: number;
}

export const AudioTest = ({ testNumber, totalTests, instruction, onNext, stepNumber }: AudioTestProps) => {
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

  const adjustVolume = (change: number) => {
    setVolume(Math.max(0, Math.min(100, volume + change)));
  };

  // Update gain node volume when volume state changes
  useEffect(() => {
    if (gainNode) {
      gainNode.gain.value = volume / 100 * 0.3; // Scale volume and keep it reasonable
    }
  }, [volume, gainNode]);

  const playRandomMusic = () => {
    if (!isPlaying) {
      // Create audio context and play a simple melody
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(ctx);
      
      // Create a gain node for volume control
      const gain = ctx.createGain();
      gain.gain.value = volume / 100 * 0.3; // Scale volume and keep it reasonable
      gain.connect(ctx.destination);
      setGainNode(gain);
      
      // Create oscillator for a simple melody
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      
      // Play a simple melody pattern
      const frequencies = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00]; // C4, D4, E4, F4, G4, A4
      let currentNote = 0;
      
      const playNote = () => {
        if (currentNote < frequencies.length && isPlaying) {
          osc.frequency.setValueAtTime(frequencies[currentNote], ctx.currentTime);
          currentNote++;
          setTimeout(playNote, 500); // Change note every 500ms
        }
      };
      
      osc.connect(gain);
      osc.start();
      setOscillator(osc);
      setIsPlaying(true);
      
      playNote();
      
      // Stop after 10 seconds
      setTimeout(() => {
        if (osc) {
          osc.stop();
          setIsPlaying(false);
          setOscillator(null);
          setGainNode(null);
        }
      }, 10000);
      
    } else {
      // Stop playing
      if (oscillator) {
        oscillator.stop();
        setOscillator(null);
      }
      if (audioContext) {
        audioContext.close();
        setAudioContext(null);
      }
      setGainNode(null);
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Step {stepNumber}
        </span>
      </div>
      
      <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-lime-400 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${80 + (testNumber / totalTests) * 20}%` }}
          ></div>
        </div>
        
        <div className="mb-8">
          <span className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold tracking-wider">
            HEARING CHECK
          </span>
        </div>
        
        <div className="mb-8">
          <span className="text-lg text-gray-600 font-semibold">
            {testNumber} of {totalTests}
          </span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 leading-relaxed">
          {instruction}
        </h1>
        
        <div className="w-32 h-32 mx-auto mb-12 bg-orange-50 rounded-full flex items-center justify-center">
          {testNumber === 3 ? (
            <div className="text-4xl">🎵</div>
          ) : (
            <div className="text-4xl">🗣️</div>
          )}
        </div>
        
        {testNumber === 3 && (
          <div className="mb-8">
            <Button
              onClick={playRandomMusic}
              className={`w-32 h-16 ${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white text-lg font-bold rounded-xl mb-6`}
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </Button>
          </div>
        )}
        
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <VolumeX className="w-6 h-6 text-orange-600" />
            <div className="w-96 h-3 bg-gray-200 rounded-full relative">
              <div 
                className="h-3 bg-gray-400 rounded-full transition-all duration-200"
                style={{ width: `${volume}%` }}
              ></div>
            </div>
            <Volume2 className="w-6 h-6 text-orange-600" />
          </div>
          
          <div className="flex justify-center space-x-6">
            <Button
              onClick={() => adjustVolume(-5)}
              className="w-24 h-16 bg-orange-600 hover:bg-orange-700 text-white text-2xl font-bold rounded-xl"
            >
              <Minus className="w-8 h-8" />
            </Button>
            
            <Button
              onClick={() => adjustVolume(5)}
              className="w-24 h-16 bg-orange-600 hover:bg-orange-700 text-white text-2xl font-bold rounded-xl"
            >
              <Plus className="w-8 h-8" />
            </Button>
          </div>
        </div>
        
        <Button 
          onClick={onNext}
          variant="outline"
          className="px-8 py-3 text-lg border-2 border-gray-300 text-gray-600 bg-white hover:bg-gray-50 rounded-full transition-all duration-200"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
