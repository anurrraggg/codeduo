const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-purple-600 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-purple-200 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default Loader;