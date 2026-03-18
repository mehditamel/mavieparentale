import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ActivityList } from "@/components/educatif/activity-list";
import { getFamilyMembers } from "@/lib/actions/family";
import { getActivities } from "@/lib/actions/educational";
import type { Activity } from "@/types/educational";

export const metadata: Metadata = {
  title: "Activités & loisirs",
};

export default async function ActivitesPage() {
  const membersResult = await getFamilyMembers();
  const allMembers = membersResult.data ?? [];
  const children = allMembers.filter((m) => m.memberType === "child");

  const activitiesByMember: Record<string, Activity[]> = {};

  await Promise.all(
    children.map(async (child) => {
      const result = await getActivities(child.id);
      activitiesByMember[child.id] = result.data ?? [];
    })
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activités & loisirs"
        description="Gérez les activités extra-scolaires et le planning hebdomadaire"
      />

      <ActivityList
        activitiesByMember={activitiesByMember}
      >
        {children}
      </ActivityList>
    </div>
  );
}
