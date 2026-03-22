import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkeletonBlock } from "@/components/shared/skeleton-page";

export default function SanteLoading() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <SkeletonBlock className="h-8 w-48" />
        <SkeletonBlock className="mt-2 h-4 w-80" />
      </div>

      {/* MES connection card */}
      <Card>
        <CardContent className="flex items-center gap-3 p-4">
          <SkeletonBlock className="h-8 w-8 shrink-0 rounded" />
          <div className="flex-1 space-y-1">
            <SkeletonBlock className="h-4 w-48" />
            <SkeletonBlock className="h-3 w-64" />
          </div>
          <SkeletonBlock className="h-9 w-24 rounded-md" />
        </CardContent>
      </Card>

      {/* Child selector pills */}
      <div className="flex gap-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-9 w-32 rounded-md" />
        ))}
      </div>

      {/* Vaccine cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <SkeletonBlock className="h-8 w-8 rounded" />
                <SkeletonBlock className="h-5 w-32" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex gap-2">
                <SkeletonBlock className="h-6 w-16 rounded-full" />
                <SkeletonBlock className="h-6 w-16 rounded-full" />
              </div>
              <SkeletonBlock className="h-3 w-40" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
