import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardViewComponent } from './comps/board-view/board-view.component';
import { BoardsResolver } from '../../common/resolvers';
import { DesignSystemComponent } from './comps/design-system/design-system.component';
import { LoginRegComponent } from './comps/login-reg/login-reg.component';
import { AppRoutes } from 'src/app/common/interfaces';
import { AuthGuard, hasCustomClaim, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('login');

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.LOGIN,
    pathMatch: 'full'
  },
  {path: AppRoutes.LOGIN, component: LoginRegComponent},
  {path: AppRoutes.LOGOUT, component: LoginRegComponent},
  {
    path: AppRoutes.BOARD,
    component: BoardViewComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {path: AppRoutes.DESIGN_SYSTEM, component: DesignSystemComponent},
  {path: '**', component: LoginRegComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }
