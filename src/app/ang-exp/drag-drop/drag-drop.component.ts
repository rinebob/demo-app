import { ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface Element {
  title: string;
  // content: string;
}

interface Column {
  id: string;
  title: string;
  elements: Element[];
}

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragDropComponent implements OnInit {
  
  // columns: Column[] = [
  //   {id: 'col-1', title: 'Column A', elements: this.generateRandomElements('Column A', 4)},
  //   {id: 'col-2', title: 'Column B', elements: this.generateRandomElements('Column B', 7)},
  //   {id: 'col-3', title: 'Column C', elements: this.generateRandomElements('Column C', 2)},
  //   {id: 'col-4', title: 'Column D', elements: this.generateRandomElements('Column D', 9)},
  // ];
  
  columns: Column[] = COLUMNS;

  public innerWidth = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;
      // console.log('dD oR inner width: ', this.innerWidth);
  }
  

  constructor() {
    // console.log('dD ctor columns: ', this.columns);

  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    // console.log('dD oR inner width: ', this.innerWidth);
  }

  generateRandomElements(originalColumn: string, numElements: number) {
    const elements: Element[] = []
    for (let i = 1; i <= numElements; i++) {
      const title = `${originalColumn}-element-${i}`;
      const element = {title};
      elements.push(element);
    }
    return elements;
  }

  getWidth(numColumns: number) {
    const columnWidth = this.innerWidth / numColumns;
    // console.log('dD gW total width/numColumns/column width: ', this.innerWidth, numColumns, columnWidth);

    return columnWidth;
  }

  dropElement(event: CdkDragDrop<Element[]>) {
    // console.log('dD dE drop element event: ', event);
    // console.log('dD dE prevind/ind/prevCont/cont ', event.previousIndex, event.currentIndex, event.previousContainer.id, event.container.id);
    
    if (event.previousContainer === event.container) {
      // console.log('dD dE move in array');
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      
    } else {
      // console.log('dD dE transfer item');
      // console.log('dD dE prevind/ind/prevCont/cont ', event.previousIndex, event.currentIndex, event.previousContainer.id, event.container.id);
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

  }

  dropColumn(event: CdkDragDrop<string[]>) {
    // console.log('dD dC drop element event: ', event);
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
  
}

const COLUMNS: Column[] = [
  {
      "id": "col-1",
      "title": "Column A",
      "elements": [
          {
              "title": "Column A-element-1"
          },
          {
              "title": "Column A-element-2"
          },
          {
              "title": "Column A-element-3"
          },
          {
              "title": "Column A-element-4"
          }
      ]
  },
  {
      "id": "col-2",
      "title": "Column B",
      "elements": [
          {
              "title": "Column B-element-1"
          },
          {
              "title": "Column B-element-2"
          },
          {
              "title": "Column B-element-3"
          },
          {
              "title": "Column B-element-4"
          },
          {
              "title": "Column B-element-5"
          },
          {
              "title": "Column B-element-6"
          },
          {
              "title": "Column B-element-7"
          }
      ]
  },
  {
      "id": "col-3",
      "title": "Column C",
      "elements": [
          {
              "title": "Column C-element-1"
          },
          {
              "title": "Column C-element-2"
          }
      ]
  },
  {
      "id": "col-4",
      "title": "Column D",
      "elements": [
          {
              "title": "Column D-element-1"
          },
          {
              "title": "Column D-element-2"
          },
          {
              "title": "Column D-element-3"
          },
          {
              "title": "Column D-element-4"
          },
          {
              "title": "Column D-element-5"
          },
          {
              "title": "Column D-element-6"
          },
          {
              "title": "Column D-element-7"
          },
          {
              "title": "Column D-element-8"
          },
          {
              "title": "Column D-element-9"
          }
      ]
  }
]