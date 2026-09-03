import AnalyticsSummary from "../../components/AnalyticsSummary";
import SearchBar from "../../components/SearchBar1";
import FilterControls from "../../components/FilterControls";
import ActivityTable from "../../components/ActivityTable";

export default function AnalyticsPage() {
  return (
    <main>
      <h1>JourneyBuddy Analytics</h1>

      <AnalyticsSummary />

      <SearchBar />

      <FilterControls />

      <ActivityTable />
    </main>
  );
}