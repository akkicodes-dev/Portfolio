import { Sparkles, Home } from 'lucide-react';

export const NotFoundPage: React.FC<{ onReturnHome: () => void }> = ({ onReturnHome }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a1020]/95 backdrop-blur-2xl text-cream font-sans">
      <div className="max-w-md w-full p-8 rounded-3xl spatial-glass border border-[#efe6dd]/20 text-center space-y-6 shadow-2xl">
        <div className="inline-flex p-4 rounded-2xl bg-[#9a0002]/20 border border-[#9a0002]/40 text-[#ff3b3f]">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs text-plaid uppercase tracking-widest block">
            404 • Spatial Coordinate Unmapped
          </span>
          <h1 className="font-display font-bold text-4xl text-cream">
            Lost in Orbit
          </h1>
          <p className="font-sans text-small text-cream-dim leading-relaxed">
            The requested viewport shards have drifted out of bounds. The reassembly engine cannot locate this route.
          </p>
        </div>

        <div className="pt-4 flex justify-center">
          <button
            onClick={onReturnHome}
            className="btn-primary min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Spatial Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
