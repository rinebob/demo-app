import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { ListBoardsComponent } from './components/list-boards/list-boards.component';
import { ViewBoardComponent } from './components/view-board/view-board.component';
import { BoardResolver } from './common/resolvers';
import { DesignSystemComponent } from './components/design-system/design-system.component';

const routes: Routes = [
  {path: '', redirectTo: 'boards', pathMatch: 'full'},
  {path: 'boards', component: ListBoardsComponent},
  {
    path: 'view/:id',
    component: ViewBoardComponent,
    resolve: {
      board: BoardResolver
    },
  },
  {path: 'create', component: BoardFormComponent},
  {
    path: 'edit/:id',
    component: BoardFormComponent, 
    resolve: {
      board: BoardResolver
    },
  },
  {path: 'design-system', component: DesignSystemComponent},
  {path: '**', component: ListBoardsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
