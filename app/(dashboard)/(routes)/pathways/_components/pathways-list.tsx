import { Category, Course } from "@prisma/client";
import PathwayCourseCard from "./pathway-card";
import CourseCard from "@/components/course-card";

interface PathwaysListProps {
  items: {
    id: string;
    title: string;
    imageUrl: string | null;
    description: string | null;
    progress?: number | null;
    courseCount?: number;
  }[];
}

export const PathwaysList = ({ items }: PathwaysListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <PathwayCourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            description={item?.description}
            courseLength={item?.courseCount || 0}
            progress={item?.progress || 0}
            // category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No items found
        </div>
      )}
    </div>
  );
};
