import Preferences from "../../components/Preferences";

export default function SettingsPage() {
  return (
    <main>
      <h1>JourneyBuddy Settings</h1>

      <section>
        <h2>Profile</h2>
        <p>Manage your account information.</p>
      </section>

      <Preferences />
    </main>
  );
}