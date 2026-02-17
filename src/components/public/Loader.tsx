import { Camera } from 'lucide-react';

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617]">
      <div className="relative flex flex-col items-center">
        
        {/* Cinematic Shutter Effect */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer Rotating Ring */}
          <div className="absolute inset-0 border-[1px] border-dashed border-white/20 rounded-full animate-[spin_8s_linear_infinite]" />
          
          {/* Inner Glowing Ring */}
          <div className="absolute inset-2 border-t-2 border-b-2 border-white/40 rounded-full animate-spin" />
          
          {/* Lens Flare Background */}
          <div className="absolute w-20 h-20 bg-blue-500/10 blur-[40px] rounded-full animate-pulse" />
          
          {/* Camera Icon */}
          <div className="relative z-10 bg-white/5 p-5 rounded-full backdrop-blur-sm border border-white/10 shadow-2xl">
            <Camera className="w-10 h-10 text-white animate-pulse" />
          </div>
        </div>
        
        {/* Text Animation */}
        <div className="mt-16 text-center space-y-3">
          <div className="overflow-hidden">
            <h2 className="text-white font-black tracking-[0.8em] uppercase text-sm animate-[tracking_2s_ease-in-out_infinite_alternate]">
              Hirusha Sanjana
            </h2>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/20" />
            <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-light">
              Fine Art Photography
            </p>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </div>

        {/* Progress Bar (Optional - for a technical look) */}
        <div className="mt-12 w-40 h-[2px] bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-white/60 w-1/2 animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

// Meka wada karanna tailwind.config.js eke animations danna ona. 
// Eka karanna amarunama me inline styles tika loader eke udama danna:
// <style>{`
//   @keyframes tracking {
//     from { tracking: 0.4em; opacity: 0.5; }
//     to { tracking: 0.8em; opacity: 1; }
//   }
//   @keyframes loading {
//     0% { transform: translateX(-100%); }
//     100% { transform: translateX(200%); }
//   }
// `}</style>