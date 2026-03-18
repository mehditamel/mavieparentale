"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChildSelector } from "@/components/sante/child-selector";
import { MilestoneProgress } from "./milestone-progress";
import { JournalList } from "./journal-list";
import { calculateAge } from "@/lib/utils";
import type { FamilyMember } from "@/types/family";
import type { DevelopmentMilestone, ParentJournalEntry } from "@/types/health";

interface DeveloppementTabsProps {
  children: FamilyMember[];
  milestonesByMember: Record<string, DevelopmentMilestone[]>;
  journalByMember: Record<string, ParentJournalEntry[]>;
}

export function DeveloppementTabs({
  children,
  milestonesByMember,
  journalByMember,
}: DeveloppementTabsProps) {
  const [selectedChildId, setSelectedChildId] = useState(children[0]?.id ?? "");

  const selectedChild = children.find((c) => c.id === selectedChildId);
  const milestones = milestonesByMember[selectedChildId] ?? [];
  const journalEntries = journalByMember[selectedChildId] ?? [];

  if (!selectedChild) {
    return (
      <p className="text-sm text-muted-foreground">
        Aucun enfant dans le foyer. Ajoutez un enfant dans les paramètres.
      </p>
    );
  }

  const age = calculateAge(selectedChild.birthDate);
  const childAgeMonths = age.years * 12 + age.months;

  return (
    <div className="space-y-4">
      <ChildSelector
        selectedId={selectedChildId}
        onSelect={setSelectedChildId}
      >
        {children}
      </ChildSelector>

      <Tabs defaultValue="jalons" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jalons">Jalons</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
        </TabsList>

        <TabsContent value="jalons">
          <MilestoneProgress
            memberId={selectedChildId}
            milestones={milestones}
            childAgeMonths={childAgeMonths}
          />
        </TabsContent>

        <TabsContent value="journal">
          <JournalList
            memberId={selectedChildId}
            entries={journalEntries}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
