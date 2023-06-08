import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
      path: 'sign-in',
      loadChildren: () => import('./sign-in/sign-in.module').then(m => m.AuthSignInModule)
   },
   {
      path: 'sign-up',
      loadChildren: () => import('./sign-up/sign-up.module').then(m => m.AuthSignUpModule)
   }
]

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class AuthRoutingModule {}
