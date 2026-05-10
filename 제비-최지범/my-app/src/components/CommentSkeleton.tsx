const CommentSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 border-b border-gray-300 pb-2 mb-2">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
        <div className="flex flex-col">
          <div className="w-20 h-4 rounded-full bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      <div className="w-full h-4 rounded-full bg-gray-300 animate-pulse"></div>
    </div>
  );
};

export default CommentSkeleton;
