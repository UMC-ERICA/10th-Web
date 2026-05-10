const CardSkeleton = () => {
  return (
    <div className="bg-gray-100  mb-2 rounded-lg shadow-md flex flex-col gap-2">
      <div className="w-full aspect-square relative animate-pulse">
        <div className="h-full w-full object-cover bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
