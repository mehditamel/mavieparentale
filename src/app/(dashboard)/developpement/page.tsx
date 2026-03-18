import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { DeveloppementTabs } from "@/components/developpement/developpement-tabs";
import { getFamilyMembers } from "@/lib/actions/family";
import { getMilestones, getJournalEntries } from "@/lib/actions/educational";
import type { DevelopmentMilestone, ParentJournalEntry } from "@/types/health";

export const metadata: Metadata = {
  title: "Développement",
  description: "Suivez les jalons de développement, le journal parental et les progrès de vos enfants",
};

export default async function DeveloppementPage() {
  const membersResult = await getFamilyMembers();
  const allMembers = membersResult.data ?? [];
  const children = allMembers.filter((m) => m.memberType === "child");

  const milestonesByMember: Record<string, DevelopmentMilestone[]> = {};
  const journalByMember: Record<string, ParentJournalEntry[]> = {};

  await Promise.all(
    children.map(async (child) => {
      const [milestonesResult, journalResult] = await Promise.all([
        getMilestones(child.id),
        getJournalEntries(child.id),
      ]);
      milestonesByMember[child.id] = milestonesResult.data ?? [];
      journalByMember[child.id] = journalResult.data ?? [];
    })
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Développement"
        description="Suivez les jalons de développement et tenez le journal parental"
      />

      <DeveloppementTabs
        milestonesByMember={milestonesByMember}
        journalByMember={journalByMember}
      >
        {children}
      </DeveloppementTabs>
    </div>
  );
}
