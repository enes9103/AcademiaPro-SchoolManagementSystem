import React from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import { getTotals } from "@/data/card";
import { auth } from "@/auth";
import { UserRole, UserStatus } from "@prisma/client";
import { UnknownHome } from "@/components/home/UnknownHome";

const Home = async () => {
  const session = await auth();

  if (
    !session?.user ||
    session.user.status !== UserStatus.ACTIVE ||
    session?.user?.role === UserRole.UNKNOW
  ) {
    return <UnknownHome status={session?.user?.status} />;
  }

  const totalDataCard = await getTotals();

  return (
    <div>
      <Dashboard totalDataCard={totalDataCard} />
    </div>
  );
};

export default Home;
