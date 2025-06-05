import { Helmet } from "@dr.pogodin/react-helmet";
import { motion } from "framer-motion";

const bounceTransition = {
  y: {
    duration: 0.6,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
  opacity: {
    duration: 0.6,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
};

const LoadingPage = () => (
  <>
    <Helmet>
      <title>Loading | HiMart</title>
    </Helmet>
    <main className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-4 h-4 bg-indigo-500 dark:bg-indigo-400 rounded-full"
            animate={{
              y: ["0%", "-100%", "0%"],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              y: {
                ...bounceTransition.y,
                delay: i * 0.2,
              },
              opacity: {
                ...bounceTransition.opacity,
                delay: i * 0.2,
              },
            }}
          />
        ))}
      </div>
    </main>
  </>
);

export default LoadingPage;
