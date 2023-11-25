import { MemberRole } from "@prisma/client";
import {
  HiCog,
  HiLogout,
  HiPlusCircle,
  HiTrash,
  HiUserAdd,
  HiUsers,
} from "react-icons/hi";

interface RoleProps {
  role: MemberRole;
}

//! ===> MUST BE ON DATABASE <===
const Actions = [
  {
    key: "invite-people",
    method: "invite",
    label: "Invite People",
    class: "text-indigo-600 dark:text-indigo-400",
    icon: <HiUserAdd className="w-5 h-5" />,
  },
  {
    key: "server-settings",
    method: "editServer",
    label: "Server Settings",
    icon: <HiCog className="w-5 h-5" />,
  },
  {
    key: "manage-members",
    method: "members",
    label: "Manage Members",
    icon: <HiUsers className="w-5 h-5" />,
  },
  {
    key: "create-channel",
    method: "createChannel",
    label: "Create Channel",
    icon: <HiPlusCircle className="w-5 h-5" />,
    divider: true,
  },
  {
    key: "delete-server",
    method: "deleteServer",
    label: "Delete Server",
    icon: <HiTrash className="w-5 h-5" />,
    class: "text-danger",
  },
  {
    key: "leave-server",
    method: "leaveServer",
    label: "Leave Server",
    icon: <HiLogout className="w-5 h-5" />,
  },
];

const RoleActions = {
  [MemberRole.ADMIN]: [
    "invite-people",
    "server-settings",
    "manage-members",
    "create-channel",
    "delete-server",
  ],
  [MemberRole.MODERATOR]: ["invite-people", "create-channel", "leave-server"],
  [MemberRole.GUEST]: ["leave-server"],
};
//! ===> END MUST BE ON DATABASE <===

export const useRoleActions = ({ role }: RoleProps) => {
  const roleActions = RoleActions[role];
  const actions = roleActions.map((key) =>
    Actions.find((action) => action.key === key)
  );

  return actions;
};
