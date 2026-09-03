import RevenueCard from "../../components/RevenueCard";
import UserStats from "../../components/UserStats";
import ActivityTable from "../../components/ActivityTable";
import LiveStatus from "../../components/LiveStatus";

export default function DashboardPage() {
  return (
    <main>
      <h1>JourneyBuddy Dashboard</h1>

      <RevenueCard />

      <UserStats />

      <LiveStatus />

      <ActivityTable />
    </main>
  );
}