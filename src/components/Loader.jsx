const Loader = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl border border-slate-100 p-4 animate-pulse shadow-sm">
            <div className="h-48 bg-slate-200 rounded-xl mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3 mb-3"></div>
            <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <div className="h-6 bg-slate-200 rounded w-1/4"></div>
              <div className="h-9 bg-slate-200 rounded-xl w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;