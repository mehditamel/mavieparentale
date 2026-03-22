import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkeletonBlock } from "@/components/shared/skeleton-page";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <SkeletonBlock className="h-8 w-40" />
        <SkeletonBlock className="mt-2 h-4 w-64" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-9 w-28 rounded-md" />
        ))}
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <SkeletonBlock className="h-5 w-44" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 border-b pb-3 last:border-0">
              <SkeletonBlock className="h-10 w-10 shrink-0 rounded" />
              <div className="flex-1 space-y-1">
                <SkeletonBlock className="h-4 w-36" />
                <SkeletonBlock className="h-3 w-24" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
