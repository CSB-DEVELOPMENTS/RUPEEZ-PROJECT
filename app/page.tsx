export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex flex-col items-center justify-center gap-8 px-6 text-center">
        {/* Logo/Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
          <span className="text-4xl font-bold text-white">රු</span>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
            RUPEEZ
          </h1>
          <p className="text-xl font-medium text-gray-600 dark:text-gray-300 sm:text-2xl">
            Ultimate Finance Management Application
          </p>
        </div>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-6 py-3 dark:bg-emerald-900/30">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            Coming Soon
          </span>
        </div>

        {/* Description */}
        <p className="max-w-md text-base text-gray-600 dark:text-gray-400 sm:text-lg">
          Take control of your finances with powerful budgeting, expense tracking, 
          and financial insights all in one place.
        </p>

        {/* Notify Me Button (Optional) */}
        <button className="mt-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
          Notify Me at Launch
        </button>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
          Building something amazing for you...
        </p>
      </main>
    </div>
  );
}