import { Category, Course, Pathway } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type CourseWithProgress = Pathway & Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetPathwayCoursesProps = {
  userId: string;
  title?: string;
  categoryId?: string;
  pathwayId: string;
};

export const getPathwayCourses = async ({
  userId,
  title,
  categoryId,
  pathwayId,
}: GetPathwayCoursesProps): Promise<CourseWithProgress[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: { contains: title },
        categoryId,
        pathwayId
      },
      include: {
        category: true,
        chapters: { where: { isPublished: true }, select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const coursesWithProgress: CourseWithProgress[] = await Promise.all(
      courses.map(async (course) => {
        const progressPercentage = await getProgress(userId, course.id);
        return { ...course, progress: progressPercentage };
      })
    );

    return coursesWithProgress;
  } catch (err) {
    console.log("[GET_PATHWAY_COURSES]", err);
    return [];
  }
};