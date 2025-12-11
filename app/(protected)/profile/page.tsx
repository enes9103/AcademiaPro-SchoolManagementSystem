import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/profile/ProfileCard";

const ProfilePage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <ProfileCard
      user={{
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt ? String(user.createdAt) : null,
      }}
    />
  );
};

export default ProfilePage;
