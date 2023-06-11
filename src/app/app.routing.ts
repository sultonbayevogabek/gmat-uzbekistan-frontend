import { Route } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AdminGuard } from './guards/admin.guard';

export const appRoutes: Route[] = [
   { path: '', pathMatch: 'full', redirectTo: 'lessons' },

   {
      path: '',
      component: LayoutComponent,
      data: {
         layout: 'empty'
      },
      children: [
         {
            path: 'sign-in',
            loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)
         },
         {
            path: 'sign-up',
            loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)
         }
      ]
   },
   {
      path: '',
      canActivate: [ AuthGuard ],
      canActivateChild: [ AuthGuard ],
      component: LayoutComponent,
      resolve: {
         initialData: InitialDataResolver
      },
      children: [
         {
            path: 'lessons',
            loadChildren: () => import('app/modules/academy/academy.module').then(m => m.AcademyModule)
         },
         {
            path: 'chat',
            loadChildren: () => import('app/modules/chat/chat.module').then(m => m.ChatModule)
         },
         {
            canActivate: [ AdminGuard ],
            path: 'users',
            loadChildren: () => import('app/modules/contacts/contacts.module').then(m => m.ContactsModule)
         },
         {
            path: '404',
            loadChildren: () => import('app/modules/error-404/error-404.module').then(m => m.Error404Module)
         },
         {
            path: '500',
            loadChildren: () => import('app/modules/error-500/error-500.module').then(m => m.Error500Module)
         },
         {
            path: 'settings',
            loadChildren: () => import('app/modules/settings/settings.module').then(m => m.SettingsModule)
         },
         { path: '**', redirectTo: '404' }
      ]
   }
];
