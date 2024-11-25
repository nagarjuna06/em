const Loader = ({ fullscreen }) => {
  if (fullscreen) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <span className="loading loading-dots loading-lg"></span>;
      </div>
    );
  }
  return <span className="loading loading-dots"></span>;
};

export default Loader;
