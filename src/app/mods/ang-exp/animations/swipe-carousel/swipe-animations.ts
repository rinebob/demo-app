import { trigger, state, style, transition, animate, keyframes, animation, useAnimation, group, query, stagger, animateChild } from "@angular/animations";

import { SwipeState, CardState, Direction, SwipeElement} from '../interfaces-animations';

// SWIPE ANIMATIONS RULES

// number of cards displayed depends on viewport width
// desktop = 3
// tablet = 2
// mobile = 1

// Cards are initially displayed with first card in list on left side

// Carousel button click or swipe gesture (left or right) moves the cards one card
// in that direction

// first try to animate the card container - see if it can be moved.  This will move all the 
// cards together

// if that doesn't work, try to animate individual cards

// animationState: string;

///////////////// FOR CARD CONTAINER MOVEMENT /////////////


export const cardContainerAnimator = trigger('cardContainerAnimator', [
    transition('* => swipe-left', [
        style({ transform: 'translateX(270px)'}),
        animate('1000ms ease-out'),
    ]),
    transition('* => swipe-right', [
        style({ transform: 'translateX(-270px)'}),
        animate('1000ms ease-out'),
    ]),
]);

/////////// FOR INDIVIDUAL CARDS MOVEMENT /////////////////

// TRANSITIONS FOR INDIVIDUAL CARDS

// Cards moving to the LEFT
// not-shown => outside-right
// outside-right => right-side
// right-side => middle
// middle => left-side
// left-side => left-right
// outside-left => not-shown

// Cards moving to the RIGHT
// not-shown => outside-left
// outside-left => left-side
// left-side => middle
// middle => right-side
// right-side => outside-right
// outside-right => not-shown

const moveLeftTransitions = `
not-shown => outside-right,
outside-right => right-side,
right-side => middle,
middle => left-side,
left-side => outside-left,
outside-left => not-shown,
`;

const moveRightTransitions = `
not-shown => outside-left,
outside-left => left-side,
left-side => middle,
middle => right-side,
right-side => outside-right,
outside-right => not-shown`;

export const moveLeftAnimation = [
    style({ transform: 'translateX(-270px)'}),
];

export const moveRightAnimation = [
    style({ transform: 'translateX(270px)'}),
];

export const individualCardAnimator = trigger('individualCardAnimator', [

    // move left transitions

    transition('not-shown => outside-right', animate('1000ms ease-out', keyframes(moveLeftAnimation))),
    transition('outside-right => right-side', animate('1000ms ease-out', keyframes(moveLeftAnimation))),
    transition('right-side => middle', animate('1000ms ease-out', keyframes(moveLeftAnimation))),
    transition('middle => left-side', animate('1000ms ease-out', keyframes(moveLeftAnimation))),
    transition('left-side => outside-left', animate('1000ms ease-out', keyframes(moveLeftAnimation))),
    transition('outside-left => not-shown', animate('1000ms ease-out', keyframes(moveLeftAnimation))),
    
    // move right transitions

    transition('not-shown => outside-left', animate('1000ms ease-out', keyframes(moveRightAnimation))),
    transition('outside-left => left-side', animate('1000ms ease-out', keyframes(moveRightAnimation))),
    transition('left-side => middle', animate('1000ms ease-out', keyframes(moveRightAnimation))),
    transition('middle => right-side', animate('1000ms ease-out', keyframes(moveRightAnimation))),
    transition('right-side => outside-right', animate('1000ms ease-out', keyframes(moveRightAnimation))),
    transition('outside-right => not-shown', animate('1000ms ease-out', keyframes(moveRightAnimation))),

]);



//   <plan-card [plan]="plan"
//                   [@cardAnimator]="animationState"
//                   (@cardAnimator.done)="resetAnimationState(plan.commodityType)"
//                   (swipeleft)='handleSwipeGesture(1, plan.commodityType)'
//                   (swiperight)='handleSwipeGesture(-1, plan.commodityType)'
//                   (selectedPlan)="handlePlanSelection($event)">
//       </plan-card>
  
// handleSwipeGesture(direction: number, commodityType: string) {
//     //console.log('=============================');
//     console.log('pCs hSG handle swipe called.  direction/commod type/cur anim state/index: ', direction, commodityType, this.animationState, this.planIndexBS.value);
    
//     const numPlans = commodityType === 'E' ? this.electricPlansBS.value.length : this.gasPlansBS.value.length;
//     //console.log('pCs hSG numPlans: ', numPlans);

//     if (this.planIndexBS.value < numPlans - 1 && direction > 0) {
//       this.animationState = 'swipeLeft';
//       //console.log('pCs hSG set animState swipe left: ', this.animationState);
//     } else if (this.planIndexBS.value > 0 && direction < 0) {
//       this.animationState = 'swipeRight';
//       //console.log('pCs hSG set animState swipe right: ', this.animationState);
//     } else {
//       this.animationState = '';
//       console.log('pCs hSG set animState empty string: ', this.animationState);
//     }
//   }


// resetAnimationState(commodityType: string) {
//     //console.log('pC rAS reset animation state. com type: ', commodityType);
//     this.updatePlanIndex(commodityType);
//     this.animationState = '';
//     //console.log('pC rAS reset animation state. new index: ', this.index, this.animationState);
//   }