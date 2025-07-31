import { Routes } from "@angular/router";
import { MemberProfile } from "./member-profile/member-profile";
import { MemberPhotos } from "./member-photos/member-photos";
import { MemberMessages } from "./member-messages/member-messages";

export const memberDetailRoutes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: MemberProfile,
    title: 'Profile'
  },
  {
    path: 'photos',
    component: MemberPhotos,
    title: 'Photos'
  },
  {
    path: 'messages',
    component: MemberMessages,
    title: 'Messages'
  },

]
