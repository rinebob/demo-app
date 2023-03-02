import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { ListBoardsComponent } from './components/list-boards/list-boards.component';
import { BoardViewComponent } from './components/board-view/board-view.component';
import { BoardResolver } from './common/resolvers';
import { DesignSystemComponent } from './components/design-system/design-system.component';

const routes: Routes = [
  {path: '', redirectTo: 'board/1', pathMatch: 'full'},
  {
    path: 'board/:id',
    component: BoardViewComponent,
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
