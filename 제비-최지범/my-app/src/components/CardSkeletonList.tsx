import CardSkeleton from "./CardSkeleton";

interface CardSkeletonListProps {
  count: number;
}

const CardSkeletonList = ({ count }: CardSkeletonListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3 p-3">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CardSkeletonList;
