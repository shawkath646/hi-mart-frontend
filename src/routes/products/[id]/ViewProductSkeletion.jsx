const ViewProductSkeleton = () => {
  return (
    <main className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 bg-gray-50 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto animate-pulse">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image + Info */}
          <div className="lg:w-1/2 space-y-6">
            <div className="aspect-w-1 aspect-h-1 bg-gray-300 dark:bg-gray-700 rounded-lg" />
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
              <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 mb-2 rounded" />
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
              <div className="flex justify-between">
                <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded" />
              </div>
              <div className="h-6 w-3/4 bg-gray-400 dark:bg-gray-600 rounded" />
              <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-6 w-1/3 bg-gray-400 dark:bg-gray-600 rounded" />
              <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-3 w-full bg-gray-200 dark:bg-gray-600 rounded" />
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-8 w-12 bg-gray-300 dark:bg-gray-700 rounded" />
                ))}
              </div>
              <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
                <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="flex gap-2">
                  <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewProductSkeleton;
