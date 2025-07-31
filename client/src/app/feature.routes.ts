import { Routes } from "@angular/router";
import { MemberDetailed } from "../features/members/member-detailed/member-detailed";
import { MemberList } from "../features/members/member-list/member-list";
import { Lists } from "../features/lists/lists";
import { Messages } from "../features/messages/messages";
import { MemberProfile } from "../features/members/member-profile/member-profile";
import { MemberMessages } from "../features/members/member-messages/member-messages";
import { MemberPhotos } from "../features/members/member-photos/member-photos";
import { memberResolver } from "../features/members/member-resolver";

export const featureRoutes: Routes = [
  {
    path: 'members',
    component: MemberList
  },
  {
    path: 'members/:id',
    resolve: {member: memberResolver},
    runGuardsAndResolvers: 'always',
    component: MemberDetailed,
    loadChildren: () => import('../features/members/member.routes').then(m=>m.memberDetailRoutes),

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
