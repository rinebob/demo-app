

export interface SwipeElement {
    title: string;
    state?: ElementState;
  }
  
  export enum Direction {
    LEFT = 'left',
    RIGHT = 'right',
    UNDEFINED = 'undefined',
  }
  
  export enum ElementState {
    OUTSIDE_LEFT = 'outside-left',
    LEFT_SIDE = 'left-side',
    MIDDLE = 'middle',
    RIGHT_SIDE = 'right-side',
    OUTSIDE_RIGHT = 'outside-right',
    NOT_SHOWN = 'not-shown',
  }
  
  export enum SwipeState {
    SWIPE_LEFT = 'swipe-left',
    SWIPE_RIGHT = 'swipe-right',
    UNDEFINED = '',
  }

  export enum DisplayMode {
    SINGLE_ELEMENT = 'single-element',
    MULTI_ELEMENT = 'multi-element',
  }