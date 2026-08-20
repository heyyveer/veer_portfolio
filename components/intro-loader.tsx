"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

export function IntroLoader() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center">

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.6,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex size-20 items-center justify-center rounded-2xl border border-border/60 bg-card/40 font-display text-2xl font-bold tracking-tight shadow-2xl backdrop-blur-xl"
            >
              VT
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
              }}
              className="mt-6 text-center"
            >
              <h1 className="font-display text-xl font-semibold">
                Veer Tiwari
              </h1>

              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                AI / ML Engineer
              </p>
            </motion.div>

            <div className="mt-8 h-px w-48 overflow-hidden bg-border">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1.8,
                  ease: [0.65, 0, 0.35, 1],
                }}
                className="h-full bg-foreground"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.5,
              }}
              className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground"
            >
              Initializing systems...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
