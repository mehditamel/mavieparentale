import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { GardeTabs } from "@/components/garde/garde-tabs";
import { getChildcareFavorites } from "@/lib/actions/garde";

export const metadata: Metadata = {
  title: "Recherche de garde",
  description:
    "Trouvez le mode de garde id\u00e9al pr\u00e8s de chez vous et estimez le co\u00fbt",
};

export default async function GardePage() {
  const favoritesResult = await getChildcareFavorites();
  const favorites = favoritesResult.success ? (favoritesResult.data ?? []) : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Recherche de garde"
        description="Trouvez le mode de garde id\u00e9al pr\u00e8s de chez vous et estimez le co\u00fbt"
      />

      <GardeTabs initialFavorites={favorites} />
    </div>
  );
}
