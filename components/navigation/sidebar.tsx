import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Action } from "./action";
import { NavigationItem } from "./item";
import { ActionDivider } from "../action-divider";
import { ThemeSwitch } from "../theme-switch";
import { NavigationUser } from "./user";

export const Sidebar = async () => {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <Action />
      <div className="w-10">
        <ActionDivider />
      </div>
      <div className="flex-1 w-full space-y-4">
        {servers.map((server: any) => (
          <div key={server.id}>
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </div>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ThemeSwitch />
        <NavigationUser />
      </div>
    </div>
  );
};
