import { ProjectStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/db/prisma";

const CONNECTION_CHECK_SLUG = "database-connection-check";

export type DatabaseConnectionCheckResult = {
  mode: "created" | "read";
  projectId: string;
  slug: string;
  title: string;
  status: ProjectStatus;
  updatedAt: string;
};

export async function verifyDatabaseConnection(): Promise<DatabaseConnectionCheckResult> {
  const existingProject = await prisma.project.findUnique({
    where: {
      slug: CONNECTION_CHECK_SLUG,
    },
  });

  if (existingProject) {
    return {
      mode: "read",
      projectId: existingProject.id,
      slug: existingProject.slug,
      title: existingProject.title,
      status: existingProject.status,
      updatedAt: existingProject.updatedAt.toISOString(),
    };
  }

  const createdProject = await prisma.project.create({
    data: {
      title: "Database connection check",
      slug: CONNECTION_CHECK_SLUG,
      shortDescription:
        "Technical record created automatically to validate the Prisma connection.",
      description:
        "This project is created once to confirm that Next.js can read from and write to PostgreSQL through Prisma without runtime errors.",
      isPublic: false,
      isMaintained: true,
      status: ProjectStatus.DRAFT,
    },
  });

  return {
    mode: "created",
    projectId: createdProject.id,
    slug: createdProject.slug,
    title: createdProject.title,
    status: createdProject.status,
    updatedAt: createdProject.updatedAt.toISOString(),
  };
}
