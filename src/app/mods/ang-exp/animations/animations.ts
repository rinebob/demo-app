import { animate, animateChild, animation, group, keyframes, query, stagger, state, style, transition, trigger, useAnimation } from "@angular/animations";


//////////////// from Angular.io animations examples /////////////////

export const slideInAnimation = trigger('routeAnimations', [
    transition('SignalsPage => AnimationsPage', [
        style({position: 'relative'}),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ]),
        query(':enter', [
            style({left: '-100%'})
        ]),
        query(':leave', animateChild()),
        group([
            query(':leave', [
                animate('300ms ease-out', style({left: '100%'}))
            ]),
            query(':enter', [
                animate('300ms ease-out', style({left: '0%'}))
            ])
        ])
    ]),

    transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ], {optional: true}),
        query(':enter', [
          style({ left: '-100%' })
        ]),
        query(':leave', animateChild(), {optional: true}),
        // query(':leave', ),
        group([
          query(':leave', [
            animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
          ], {optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%' }))
          ]),
          query('@*', animateChild(), {optional: true})
        ]),
      ])
]);

export const openCloseAnimation = trigger('openClose', [
    state('open', style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'yellow'
    })),
    state('closed', style({
      height: '100px',
      opacity: 0.8,
      backgroundColor: 'blue'
    })),
    transition('open => closed', [
      animate('1s')
    ]),
    transition('closed => open', [
      animate('0.5s')
    ]),
    transition('* => closed',[
      animate('1s')
    ]),
    transition('open <=> closed',[
      animate('0.5s')
    ]),
    transition ('* => open', [
      animate ('1s',
        style ({ opacity: '*' }),
      ),
    ]),
    transition('* <=> *',[
      animate('1s')
    ]),
  ])

export const myInsertRemoveTrigger = trigger('myInsertRemoveTrigger', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('100ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('100ms', style({ opacity: 0 }))
    ])
  ])
