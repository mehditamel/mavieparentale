import { Card, CardContent } from "@/components/ui/card";
import { SkeletonBlock } from "@/components/shared/skeleton-page";

export default function DocumentsLoading() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <SkeletonBlock className="h-8 w-52" />
        <SkeletonBlock className="mt-2 h-4 w-72" />
      </div>

      {/* 3 stat cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <SkeletonBlock className="h-4 w-24 mb-2" />
              <SkeletonBlock className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload zone */}
      <div className="rounded-lg border-2 border-dashed p-8 flex flex-col items-center gap-3">
        <SkeletonBlock className="h-10 w-10 rounded-full" />
        <SkeletonBlock className="h-4 w-48" />
        <SkeletonBlock className="h-3 w-32" />
      </div>

      {/* Document grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <SkeletonBlock className="h-8 w-8 rounded" />
                <SkeletonBlock className="h-4 w-32" />
              </div>
              <SkeletonBlock className="h-3 w-20" />
              <SkeletonBlock className="h-6 w-16 rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
