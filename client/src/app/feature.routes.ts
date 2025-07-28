import { Routes } from "@angular/router";
import { MemberDetailed } from "../features/members/member-detailed/member-detailed";
import { MemberList } from "../features/members/member-list/member-list";
import { Lists } from "../features/lists/lists";
import { Messages } from "../features/messages/messages";

export const featureRoutes: Routes = [
  {
    path: 'members',
    component: MemberList
  },
  {
    path: 'members/:id',
    component: MemberDetailed
  },
  {
    path: 'lists',
    component: Lists
  },
  {
    path: 'messages',
    component: Messages
  },
]
