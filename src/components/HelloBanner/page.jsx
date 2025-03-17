const HelloBanner = () => {
  return (
    <div className="flex flex-col gap-4 ">
      {/* View Store Logo */}
      <div className="pl-2">
        <img src="/HelloBanner/view-store-logo.png" alt="View Store Logo" className="w-16 h-16 " />
      </div>

      {/* Banner Content */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-lime-300 to-lime-100 p-6">
        <div className="relative z-10">
          <div className="flex flex-col gap-3">
            <span className="bg-black text-white text-sm px-4 py-1.5 rounded-full w-fit">
              New Collection
            </span>
            <h2 className="text-4xl font-bold tracking-wider ">View Store</h2>
            <h2 className="text-2xl text-center font-bold tracking-wider">لملابس الشباب </h2>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HelloBanner;
