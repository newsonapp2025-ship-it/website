import { motion } from "framer-motion";
import NewsOnLogo from "./NewsOnLogo";
import StoreBadges from "./StoreBadges";

interface DownloadPopupProps {
  showDownloadPopup: boolean;
  setShowDownloadPopup: (show: boolean) => void;
}

function DownloadPopup({ showDownloadPopup, setShowDownloadPopup }: DownloadPopupProps) {
  return (
    <>
      {showDownloadPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowDownloadPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-2xl p-6 w-[90%] max-w-md border border-border shadow-xl relative"
          >
            <button
              onClick={() => setShowDownloadPopup(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground cursor-pointer z-50"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="absolute inset-0 bg-gradient-radial opacity-50 z-10 rounded-2xl" />
            <div className="relative z-20 mb-4 flex justify-center">
              <NewsOnLogo linkToHome={false} imgClassName="h-10 w-auto" />
            </div>
            <h3 className="text-xl font-bold text-center text-foreground mb-2 relative z-20">
              Download NewsOn App
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6 relative z-20">
              Choose your platform to continue
            </p>

            <StoreBadges size="sm" className="relative z-20" />
          </motion.div>
        </div>
      )}
    </>
  );
}

export default DownloadPopup;
