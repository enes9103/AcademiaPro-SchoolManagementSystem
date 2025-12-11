import React from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import { getTotals } from "@/data/card";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { UnknownHome } from "@/components/home/UnknownHome";

const Home = async () => {
  const session = await auth();

  if (session?.user?.role === UserRole.UNKNOW) {
    return <UnknownHome />;
  }

  const totalDataCard = await getTotals();

  return (
    <div>
      <Dashboard totalDataCard={totalDataCard} />
    </div>
  );
};

export default Home;
