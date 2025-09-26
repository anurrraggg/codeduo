import { Loader } from 'lucide-react';

const LoaderPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="w-12 h-12 animate-spin text-purple-600" />
    </div>
  );
};

export default LoaderPage;