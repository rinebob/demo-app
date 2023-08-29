



  ////////////////////// Mosh Hamedani youtube Angular animations //////////////////

  
  // From Youtube Mosh Hamedani angular animations videos
// start with lesson 201 or so
// https://www.youtube.com/watch?v=VI4yHVg09cs

// video 201
// he mentions a library for simple animations - animate.css

// to do anything more you need javascript - the web animations api

// using javascript
// var element = document.querySelector('#myElement');
// element.animate(...);

// Angular has a module 'animations'.  We'll work with these abstractions over the web animations api

// video 202
// Building animations in Angular apps
// we have functions trugger, transition, state, animate etc.
// but first lets look at anatomy of an animation
// state1 => transition => state2
// a dom element can be in any given state ie state1
// here it has a look and feel eg blue background
// after transitioning to state2 it has a different look eg yellow bg
// States - void, default(*), and custom
// void - an element is not part of the DOM.  created but not added yet or has already been removed
// addItem void => *
// removeItem * => void
// * asterisk represents the default state
// we don't always use customs states - only for certain use cases
// eg zippy - collapsed and expanded states.  We'll have to animate these states to achieve the behavior

// in angular component metadata use the 'animations' property which is an array of triggers
// each trigger has a name and an implementation.  here we define all the states and transitions
// state and transition are helper functions defined in ang animations module (@angular/animations)
// here we have a trigger with the name 'fadeIn'

import { trigger, state, style, transition, animate, keyframes, animation, useAnimation, group, query, stagger, animateChild } from "@angular/animations";

// @Component({
//     animations: [
//         trigger('fadeIn', [
//             state(...)
//             transition(...)
//         ])
//     ]
// })

// we can apply this trigger on any dom element using this notation

// <div @fadeIn></div>

// video 203
// import animations into app module
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// add it to the imports array

// this module is implemented on top of the native browser web animations api 
// it is well supported by chrome firefox and opera but not others
// for these we need polyfills - code that allows you to use modern js features in older browsers
// in src directory is file polyfils.ts
// uncomment necessary lines for each browser - look for each browser then a commented line below
// import 'web-animations-js' // run npm install --save web-animations-js
// go to terminal and run the npm command after uncommenting the import statement

// video 204
// implementing a fadeIn animation
// in an existing component metadata add the animations property with a trigger function (import trigger from @angular/animations);

// @Component({
//     animations: [
//         trigger('fade', [
//         ])
//     ]
// })

// apply this in a template
// <div @fade></div>

// now we register the states and animations for this trigger

// @Component({
//     animations: [
//         trigger('fade', [

//              state(),
//              transition(),

//         ])
//     ]
// })

// lets look at the transition function first
// first we define the transition states void * custom
// transition('void => *', [])

// next we defined the styles and animations in the second param of the transition function

// transition('void => *', [
    // style({backgroundColor: yellow, opacity: 0}),
    // animate()
// ])

// the animate function takes two params, timing and style to transition to

// animate(2000, style({backgroundColor: 'white', opacity: 1}))

// the animate function will apply these styles over the period of time, here 2000 ms

// the only diff betw style and animate function is that the style function applys styles immediately
// while the animate function applys the styles over the stated time

// when we run this the bg color will init be yellow then over 2s it will be come white
// also, the opacity is init 0 then changes to 1 over 2s

// but we've already specified a default style with css outside of this (not shown in video)
// angular is smart enough to know that this is the target state
// so if you use the animate function without a style arg, it will just undo the style 
// applied with the style function over the time period

// style({backgroundColor: yellow, opacity: 0}),
// animate(2000);

// ang will apply whatever changes are necessary to undo the style

// when you want to transition an element from the void state (not in the dom) to the default state
// eg transition('void => *', [])
// set the opacity to 0 which will make the element invisible
// then over the time period we want to change the opacity to 1 which will make the element appear in the dom


// video 205 - implementing a fade out animation

// we already have a fade in animation that goes from void state to default state
// now we'll implement an animation that goes from default state to void state

// when you click on an item it will be removed from the dom (in his todo app)
// define a transition function and add it to the trigger array

// transition('* => void', [])

// then in the transition function array we add an animate function that changes the opacity to zero over 2 seconds
// transition('* => void', [
//      animate(2000, style({opacity: 0}))
// ])

// back in the browser now when he clicks on one of his todos it is removed from the list

// video 206 - States

// In the animation we have a repeated code style opacity 0
// we can define this using the state function and give it properties
// the state function takes a name and AnimationStyleMetadata params
// here we'll define the syle for the void state

// state('void', style({opacity: 0}))

// now we can delete the calls to the style function in our trigger

// trigger('fade', [
//     state('void', style({opacity: 0})),
//     transition('void => *', [
//         animate(2000)
//     ]),
//     transition('* => void', [
//         animate(2000)
//     ]),
// ])

// most of the time we use the transition fuction, but depending on your use case you can use state to make code cleaner

// aside - in angular documentation, sometimes you see two definitions of an api
// initially the animations were in core module, but starting with ang 4 it was moved to the animations module
// always look in the docs for animations module

// video 207 - transitions

// from the last lecture, we still have some duplication in our code, the animations(2000) function
// we can implement this differently

// in the transition function, the state argument can take multiple transitions
// transition('void => *, * => void', [])
// now we can delete the second call to transition function above

// trigger('fade', [
//     state('void', style({opacity: 0})),
//     transition('void => *, * => void', [
//         animate(2000)
//     ]),
// ])

// but we can make this even cleaner
// in our transition function we have two uni-directional state changes
// we can make this bi-directional very easily, just use '<=>' instead of '=>'
//     transition('void <=> *, [])

// so if you have multiple transitions with the same implementation, you can refactor into one transition with
// multiple state change expressions

// also here we have a couple of very common state transitions: void => * and * => void
// there are aliases for each of these:  :enter  and  :leave

// alias for 'void => *' state change is ':enter'
// alias for '* => void' state change is ':leave'

// so we can refactor our two unidirectional transitions as this:
// transition(':enter, :leave', [])

// he thinks this is cleaner and more readable than a bidirectional syntax, but use whichever one you like

// video 208 - creating reusable triggers

// we have defined the fade trigger in our animation.  Its likeley we'll want to use this in other places
// and we don't want to repeat ourself every time

// we can extract the trigger to a separate file
// in an appropriate directory, create a file animations.ts
// here we'll define our reusable animations
// if you have a lot, you might create several files

// in our animation, the trigger is defined to return an AnimationTriggerMetadata object
// note: when you see the type Animation*Metadata (eg AnimationTriggerMetadata or AnimationStyleMetadata)
// you can drop the words 'Animation' and 'Metadata' to find out what kind of object you have

// We'll extract our trigger function to animations.ts and save it as a const with return type AnimationTriggerMetadata

// animations.ts

export let fade = trigger('fade', [
    state('void', style({opacity: 0})),
    transition(':enter, :leave', [
        animate(2000)
    ]),
]);

export let fadeTrigger = trigger('fadeTrigger', [
    state('void', style({opacity: 0})),
    transition(':enter, :leave', [
        animate(2000)
    ]),
]);

// make sure to import all the functions from angular animations

// now we can use this trigger in multiple places

// back in the Todos component, we import this trigger and add it to the animations array of our component

// import {fade} from './animations';
// @Component({
//     animations: [
//          fade
//     ]
// })

// video 209 - practice implement slide animation

// if we add a todo item it should slide in from the left to the right
// if we click an item it slides out to the left
// hint - use the transform: 'translateX(20px)' function

// video 210 - practice implementation

// in animations.ts, define the trigger

export let slide = trigger('slide', [
    transition(':enter', [                          // this tells us that we are adding an element to the dom
        style({transform: 'translateX(-10px)'}),    // this sets the initial style as being shifted to the left
        animate(2000)                               // then over 2s we move it to the right by undoing that style
    ])
]);

export let slideTrigger = trigger('slideTrigger', [
    transition(':enter', [                          // this tells us that we are adding an element to the dom
        style({transform: 'translateX(-10px)'}),    // this sets the initial style as being shifted to the left
        animate(2000)                               // then over 2s we move it to the right by undoing that style
    ])
]);

// in the component, use the slide animation by adding the slide trigger to our animations array

// import {fade} from './animations';
// @Component({
//     animations: [
//          fade,
//          slide,
//     ]
// })

// and in the html change the trigger to @slide

// <div @slide></div>

// when we look at the result though, it's pretty slow which makes it boring
// we'll change the timing to make it more interesting
// change the timing to 500ms instead of 2000ms

// animate(500)    // now we undo the style in .5s instead of 2s

// now we'll define a transition for the :leave state
// in our slide animation, add another transition for the :leave state
// we'll shift the element to the left over a period of time

export let moshSlideTrigger1 = trigger('moshSlideTrigger1', [
    transition(':enter', [
        style({transform: 'translateX(-10px)'}),
        animate(2000)
    ]),

    transition(':leave', [
        animate(500, style({transform: 'translateX(-100%)'})),  // translateX -100% will move the element completely out of the screen
    ]),
]);

// there's a blue border on his todo items though, so we'll remove that border by setting the outline property to 0 in the css file
// now you won't see the blue borders

// video 211 - Easings

// looking at the animation, when you click on an item it moves at a constant speed
// but in real life, objects don't move at a constant speed
// ex: when you drop an object from a roof it changes speed on the way down
// or when you're driving and you put on the brake the car slows down gradually
// we can make this animation more interesting 

// lets look at the leave transition
// in the animate function we pass a time as the first arg
// but we should use a string instead
// instead of 500 we'll use a string with three components - duration, delay and easing
// duration is required and its the same as the 500 we were using
// delay is optional and it's a period of time to wait before applying the animation
// easing is a function that determines that speed of animation over time, which can vary

// in css we have a few standard easings
// linear - the animation moves at the same speed - boring!
// ease-in - the animation starts slowly then ends fast
// ease-out - starts fast and ends slowly
// ease-in-out - starts fast, becomes slow, then gets fast again

// to implement a custom easing, use a cubic-bezier function
// it takes four params 
// there's a tool to create your own custom easing functions

// cubic-bezier.com

// you can create different curves and compare them with linear behavior
// these allow you to create more interesting animations

// he says when you are removing items from the screen, use the ease-in easing
// this makes the element start leaving slowly, then accelerate going away
// similarly, when you add an item to the dom, use the ease-out easing
// this makes it come into the screen quickly, but when it gets near its final location
// it slows down like it's parking

// now in our leave transition, implement the non-linear transition
// in the animate function replace the linear time with a string
// note that we remove the delay because it's unnecessary

// animate('0.5s ease-in', style({transform: 'translateX(-100%)'})),    // using ease-in because we're removing an element

// now in the app, when clicking a todo to remove it, it starts slow then exits fast
// this is more interesting than a linear transition

// to use a cubic-bezier function, insert it where you have the easing
// replace 'ease-in' with 'cubic-bezier(.61, .29, .07, 1.02)'

// animate('0.5s cubic-bezier(.61, .29, .07, 1.02)', style({transform: 'translateX(-100%)'})), 

// transition(':leave', [
//     animate('0.5s cubic-bezier(.61, .29, .07, 1.02)', style({transform: 'translateX(-100%)'})),
// ]),

// now the transition is even better...

// video 212 - Keyframes

// having a single style property is equivalent to a keyframe with one frame
// keyframes takes an argument of an array of style function calls

// we can experiment to find our own animation, but there are so many existing examples that we can use
// on github you'll find a collection of animations: daneden.github.io/animate.css
// look in the source directory and find the specific animation

// Mosh demonstrates an animation called bounceOutLeft that uses a keyframe
// keyframes provide more granular control over the transitions

// we can view the code on github/daneden/animate.css
// find the bounceOutLeft dir and look at the code

// @keyframes bounceOutLeftDude {
//     20% {                                    // begins 20% from the start of the animation
//         opacity: 1;
//         transform: translate3d(20px, 0, 0);  // moves the element 20px to the right
//     }

//     to {                                         // then over the remainder of the duration
//         opacity: 0;                              // makes the element disappear
//         transform: translate3d(-2000px, 0, 0);   // and moves it out of the dom to the left
//     }
// }

// more complex animations have more keyframes

// now we'll add the keyframes to our angular app
// in the transition animate function, we can add a single style or a keyframes function
// in our leave transition, replace the single style function with our keyframe using the keyframes function
// the keyframes function takes an array of styles

// each style property has an additional property 'offset' which is the 
// point in the transition where the style should be applied
// values start at zero and go to one.  Zero equals start one equals end over the 
// animation duration
// note also that he replaces the translate3d with translateX since we're only moving to the left

export const moshSlideTrigger2 = trigger('moshSlideTrigger2', [
    transition(':enter', [
        animate(500, style({transform: 'translateX(-20px)'}))
    ]),
    transition(':leave', [
        animate('2s cubic-bezier(.16,.66,.7,.02)', keyframes([
            style({offset: .2, opacity: 1, transform: 'translateX(50px)'}),
            style({offset: 1, opacity: 0, transform: 'translateX(-100%)'}),

        ])),
    ]),

]);

// now in the browser when you delete an item it bounces to the right then leaves to the left

// to implement complex animations, use keyframes with multiple styles
// each style will have an offset param which is the starting point for that style in the total duration
        
// video 213 - creating Reusable animations

// now when the page loads the items slide from the left of the screen
// when we click an item it slides to the left
// what if we want a more custom animation
// for example on page load we want a fade in instead of a slide
// and when we click an item we want it's border to turn red before it slides out. 
// how do we implement this?

// in animations.ts we defined a reusable trigger called slide
// look at the implementation of the leave effect
// we want to keep this reusable, so we don't want to apply the red style here
// we also don't want to change the fade in because we want it reusable
// so we need a custom trigger for our template
// in the template replace @slide to @todoAnimation
// so in the component animations property we have to define a custom trigger todoAnimation

// trigger('todoAnimation', [])

// we want two transitions, one when it enters and another when it leaves
// we already have a fade trigger, but we can't use a trigger inside an animation function
// we'll implement fade in from scratch

// for enter we want to change from opacity: 0 to opacity 1
// for leave, we have already implemented a bounce out animation
// but it's complicated, so we extract it and define it as an animation function
// naming convention - use the word Animation when you define animations

// Right now all our animation values are hard-coded in each usage
// If we want to reuse this in other places we can extract it and save it as a const
// using the 'animation' function from ang animations

// export const bounceOutLeftAnimation = animation();

// then insert the animate function with our keyframes as the arg to the animation function

export const bounceOutLeftAnimation = animation(
    animate('2s cubic-bezier(.16,.66,.7,.02)', keyframes([
        style({offset: .2, opacity: 1, transform: 'translateX(50px)'}),
        style({offset: 1, opacity: 0, transform: 'translateX(-100%)'}),
        
    ])),
);
    
// to use the new const in another animation, call it with the 'useAnimation' function

export const moshSlideTrigger3 = trigger('moshSlideTrigger3', [
    transition(':enter', [
        animate(500, style({transform: 'translateX(-20px)'}))
    ]),
    transition(':leave', [
        // immediately sets the background color to red
        style({backgroundColor: 'red'}),
        // remove the red background over 1s
        animate(1000),
        // apply the bounce out animation after that
        useAnimation(bounceOutLeftAnimation)
    ]),

]);

// note that if we only have one arg for the transition styles we can remove the brackets to make it cleaner
export const moshSlideTrigger4 = trigger('moshSlideTrigger4', [
    transition(':enter', [
        animate(1000, style({transform: 'translateX(-50px)'}))
    ]),
    transition(':leave', 
        // we can remove the brackets to make it cleaner, but only if you have only one
        // animation step
        useAnimation(bounceOutLeftAnimation)
    ),

]);

// if you have a complex animation you want to reuse, extract it and use the animation function
// and pass the animate function as the argument
// then use the animation by call the useAnimation function

// we still need to work on reusing the fadeIn animation.  we'll do that next

// video 214 - Parameterizing reusable animations

// In our custom animation, we have duplicated the implementation of the fadeIn effect
// lets refactor this in the animations.ts
// we already have the fadeTrigger 
// the problem is that our transition only includes a call to the animate function
// the state is not part of the state.
// but we can only reuse the content of a transition
// when we use the animation function, we can only use the transition.  we can't pass the state

// in the first trigger function above (fadeAnimation here as moshFadeTrigger1) 
// we can't use the state because it's not in a transition function.  We can only reuse
// the content of a transition function. Add the opacity 0 as part of the reusable
// animation.  

export const moshFadeTrigger1 = trigger('moshFadeTrigger1', [
    state('void', style({opacity: 0})),         // not part of the transition so we can't use it
    transition(':enter, :leave', [
        style({ opacity: .5}),
        animate(2000),
    ]),
]);

// First, remove the state function then separate the enter an leave transitions
// add the initial style to the enter transition

export const moshFadeTrigger2 = trigger('moshFadeTrigger2', [
    transition(':enter', [
        style({ opacity: 0}),
        animate(2000),
    ]),
    transition(':leave', [
        animate(2000, style({ opacity: 0})),
    ]),
]);

// Now we can create the reusable animation
// use the word Animation to indicate its a reusable animation instead of a trigger

export const moshFadeInAnimation1 = animation([
    style({ opacity: 0}),
    animate(2000),
]);

// and use it in our trigger.  
export const moshFadeTrigger3 = trigger('moshFadeTrigger3', [
    transition(':enter', 
        useAnimation(moshFadeInAnimation1)      // note he removed the brackets
    ),
    transition(':leave', [
        animate(2000, style({ opacity: 0})),
    ]),
]);

// However, notice the values are hard coded so we cant change the duration or
//  css properties.  We need to be able to pass parameters to our functions to make
// them truly reusable.  
// first, instead of the number for the duration, lets change it to a string syntax
// '2s ease-out'
// Then, instead of the hardcoded duration, use string interpolation
// to create placeholders for our arguments

export const moshFadeAnimation2 = animation([
    style({ opacity: 0}),
    // animate('2s ease-out'),
    animate('{{ duration }} {{ easing }}'),
]);

// Provide default values by passing an AnimationMetadata object as the second argument
// to the animate function https://angular.io/api/animations/AnimationOptions
// use the params property to supply default values to our animate function

export const moshFadeAnimation3 = animation([
    style({ opacity: 0}),
    // animate('2s ease-out'),
    animate('{{ duration }} {{ easing }}'),
], {
    params: {                               // these are the default values
        duration: '2s',
        easing: 'ease-out'
    }
});

// the consumer of this function can override these values
// in the todos component we'll use the animation
// in the transition function, use the useAnimation function to supply an animation
// then as the second arg of useAnimation pass an AnimationOptions object to supply specific values for this use case

export const moshFadeTrigger4 = trigger('moshFadeTrigger4', [
    transition(':enter', useAnimation(moshFadeAnimation3, {
        params: {                   // override the defaults
            duration: '1s',
            easing: 'ease-in'
        }
    })),
    transition(':leave', [
        
        animate('2s cubic-bezier(.16,.66,.7,.02)', style({transform: 'translateX(-100%)'})),
    ]),

]);

// video 215 Animation callbacks
// these animations we have applied on our elements have a couple of callbacks
// These callbacks allow us to see when an animation starts and when it ends
// In the template, the event is @animation.start and @animation.done.  Supply a function
// that will be called when the event occurs
`
<div @moshFadeTrigger4 
        class="list-group-item"
        type="button"
        *ngFor="let item of items"
        (click)="removeItem(item)"

        (@moshFadeTrigger4.start)="animationStarted($event)"
        (@moshFadeTrigger4.done)="animationDone($event)"
>
    {{item}}
</div>
`

// In the controller, add callback functions (exporting here to avoid errors).
// The event objects have lots of useful properties

export function animationStarted(event: AnimationEvent) {
    console.log('a aS animation event: ', event);
}

export function animationDone(event: AnimationEvent) {
    console.log('a aD animation event: ', event);
}

// back in the browser refresh the page and look at the event objects
// the 'phaseName' property tells you what callback triggered the event.  these can be 'start' and 'done' he says
// there are also element, fromState, toState, totalTime, triggerName properties


// video 216 -  Querying child items

// now in our app when we refresh the todo items fade in
// what if we also want to animate the todos heading at the same time maybe have it slide down
// Say we want to animate the page title.  We would have to create a separate trigger for
// each item we want to animate.  We would have to do one for the h1, for a p, for a div etc.
// This could lead to lots of triggers with the same animation for each.
// What about creating a trigger and applying it to the parent, then find the element
// we want in the child DOM tree

// In the template, wrap all the html in a div and apply a trigger to it
// this is for the entire todos page
let x = `
<div @moshContainerTigger1>     //<--
    <h1>Todos</h1>
    <div class="list-group">
        <div @moshFadeTrigger4 
            (@moshFadeTrigger4.start)="animationStarted($event)"
            (@moshFadeTrigger4.done)="animationDone($event)"
            class="list-group-item"
            type="button"
            *ngFor="let item of items"
            (click)="removeItem(item)"
        >
            {{item}}
        </div>
    </div>

</div>
`

// In the component add another trigger moshContainerTrigger1 (todosAnimation in the video)

export const moshContainerTigger1 = trigger('moshContainerTrigger1', [
    
]);

// inside here you add one or more transitions.  At a minimum have an enter transition.
// We want to target the heading, so use a helper function 'query' from angular/animations
// the args are a selector and an array
// the selectors are the typical id, class, element etc


// export const moshContainerTrigger2 = trigger('moshContainerTrigger2', [
//     transition(':enter', [
//         query('h1', [
//             style({transform: 'translateY(-20px)'}),
//             animate(1000)
//         ]),
//     ]),
// ]);

// There are also pseudo-selectors we can use
// :enter, :leave, 
// :animating,          // when a child element is animating
// @trigger,            // element with an animation trigger applied
// @*                   // all elements with an animation trigger
// :self                // the container element

// lets see these in action.  query for an h1 element
// query('h1', [])

// the second arg is the steps that will be applied to the element
// here we initially move the h1 up by 20px
// then we remove this over 1s to make it slide down
// query('h1', [
//     style({transform: 'translateY(-20px)'}),
//     animate(1000)
// ])

// In the UI however, the header animates, but the todo items don't animate in the beginning
// we expect to have the existing items fade in but that doesn't happen
// If you add an item though it will have the animation.  We'll fix this next.

// video 217 - Animating Child elements

// in the last lecture, the h1 slides down but the todos don't fade in
// the reason we have the problem above is because of the trigger hierarchy in the DOM
// The containerTrigger2 is a parent and the fadeTrigger4 is a child.  Both of these triggers
// handle the :enter transition, the parent trigger always gets priority and 
// the child trigger is blocked and doesn't get executed at all.  

// To fix this in the parent  we just need to add a query for the child elements with the child trigger attached
// (you can use other query selectors also)

// In the transition block, add another query function and pass the child animation name
// with the @ symbol.  For the steps, use the animateChild function to invoke the animations
// on the child elements

// export const moshContainerTrigger2 = trigger('moshContainerTrigger2', [
//     transition(':enter', [
//         query('h1', [
//             style({transform: 'translateY(-20px)'}),
//             animate(1000)
//         ]),
//         query('@moshFadeTrigger4', animateChild())      // new
//     ]),
// ]);

// Now both animations occur, first the header and when that's done the list items animate
// however, the parent trigger runs first and the child triggers don't begin until the parent has finished
// Next we'll make it run in parallel

// video 218 - Running Parallel Animations

// currently in the app we have two queries each with an animation and the animations run sequentially

// To make the animations run together, use the helper 'group' function.  Group takes an array
// of animations that run in parallel.  Move the two queries into the group function
// then the animations associated with the queries will run in parallel

// export const moshContainerTrigger2 = trigger('moshContainerTrigger2', [
//     transition(':enter', [

//         group([                 // new
//             query('h1', [              
//                 style({transform: 'translateY(-20px)'}),
//                 animate(1000)
//             ]),
//             query('@moshFadeTrigger4', animateChild())
//         ]),
        
//     ]),
// ]);

// now the heading and todo items are animated at the same time

// to run animations in parallel use the group function

// Also, you don't have to have a query in a group function, but it's more common in real world
// imagine instead of these queries we just had to calls to the animate function
// to get them to run in parallel you can do this:
`
group([
    animate(1000, style({backgroundColor: 'red'}),)
    animate(1000, style({transform: 'translateY(-20px)'}),)
]),
`
// These animations will run in parallel.  the background color will become red
// and the header will move down at the same time
// If you take them out of the group function they'll run in sequence.

// video 219 - Staggering animations

// Right now our list items all fade in at the same time.  We want to have them fade in
// one at a time.  To do this we use the 'stagger' function.  It takes a param for
// duration and another to do the animation

// Inside our query function, wrap the call to animate child in a stagger function
// the first arg is timing and the second is the animation we want to run
// we're calling animateChild here because we have defined it somewhere else


export const moshContainerTrigger2 = trigger('moshContainerTrigger2', [
    transition(':enter', [

        group([                 
            query('h1', [              
                style({transform: 'translateY(-20px)'}),
                animate(1000)
            ]),
            query('@moshFadeTrigger4', 
                stagger(500, animateChild())        // new
            )
        ]),
        
    ]),
]);

// if we didn't have this then we would add the animation steps
// lets use one of our existing animations by calling the useAnimation function
// or we would pass the actual animation steps

// Now the list items appear in sequence, one every 500 ms

// you don't have to use animate child in the stagger function.  You can simply include
// an array of steps for the animation, or supply an animation with useAnimation function

let string = `
query('@moshFadeTrigger4', 
stagger(500, useAnimation(moshFadeTrigger4))
)

or 

query('.list-group-item',                           // note we changed the query to use the css class instead of animation name
    stagger(500, animateChild())
)

or 
query('.list-group-item', 
    stagger(500, [
        style({ transform: 'translateX(-20px)'}),
        animate(1000)
    ])
)

`

// note: he removes the animation trigger and callbacks from the html when he uses the css class for the selector 
x = `
<div @moshContainerTigger1> 
    <h1>Todos</h1>
    <div class="list-group">
        <div class="list-group-item"                // removed trigger and callbacks here
            type="button"
            *ngFor="let item of items"
            (click)="removeItem(item)"
        >
            {{item}}
        </div>
    </div>

</div>
`

// if we use the third query here when the page loads the todo items first move 20px left
// then they move to the right over 1s as the style is removed
// this looks a little funky so we'll set opacity to zero so they aren't visible at first

string = `
query('.list-group-item', 
    stagger(500, [
        style({ opacity: 0, transform: 'translateX(-20px)'}),
        animate(1000)
    ])
)
`

// however, with this implementation, the todo items are only animated when the page refreshes
// this is because the animation is run only when the container enters the dom
// but we really want to have all new todos animate, so we need to use animate child
// in the query, use the animation name as the selector again instead of the css class, then pass
// animateChild to get the child elements to animate

string = `
query('@moshFadeTrigger4', 
    stagger(500, animateChild())
)
`

// then you have to add the trigger and callbacks back to the html to make it work

x = `
<div @moshContainerTigger1>
    <h1>Todos</h1>
    <div class="list-group">
        <div @moshFadeTrigger4                                      // added back with next 2 lines
            (@moshFadeTrigger4.start)="animationStarted($event)"
            (@moshFadeTrigger4.done)="animationDone($event)"
            class="list-group-item"
            type="button"
            *ngFor="let item of items"
            (click)="removeItem(item)"
        >
            {{item}}
        </div>
    </div>

</div>
`

// to implement a curtain like effect, use the stagger function with a delay and add the steps 
// for animating the elements
//The stagger function is really only meant to be used inside a query
// function.  Use it to apply a delay between animating each child

// video 220 - working with custom states

// in our html we are using the zippy component which expands and collapses
// we want to add some nice animation

// zippy.component.html
let y = `
    <div class="zippy-header" (click)="toggleExpanded()">
        <span>dropdown arrow here</span>
    </div>
    <div class="zippy-body" [hidden]="!expanded">
        <ng-content></ng-content>
    </div>
`;

// now we want to apply an animation to the body for when it is opened
// call it 'expandCollapse' and implement it in the component metadata
// import all the animations imports

// this one is a little different than the todos component
// note that he's using the hidden property so it only transitions when the page is loaded
// it doesn't transition from void state because it's already in the dom, just hidded
// this requires that we use custom states
// in the trigger, define a custom state called 'collapse'
// when the element is collapsed we want the height to be zero and the overflow property to hidden
// which will hide the children of this div

animations: [
    trigger('expandCollapse', [
        state('collapsed', style({
            height: 0,
            overflow: 'hidden'
        }))
    ])
]

// now define another state 'expanded' which will have height and overflow
// but what height do we use?  we don't know what it will be because the height is determined at run time
// to do this just use an asterisk so angular computes the height for us
// also add overflow auto

animations: [
    trigger('expandCollapse', [
        state('collapsed', style({
            height: 0,
            overflow: 'hidden'
        })),
        state('expanded', style({
            height: '*',
            overflow: 'auto'
        }))
    ])
]

// now define the transitions

animations: [
    trigger('expandCollapse', [
        state('collapsed', style({
            height: 0,
            overflow: 'hidden'
        })),
        state('collapsed', style({
            height: '*',
            overflow: 'auto'
        })),

        transition('collapsed => expanded', [
            animate('300ms ease-out')
        ])
    ])
]

// in the template we add the trigger and use property binding to tell the animation which state is occuring

y = `
    <div class="zippy-header" (click)="toggleExpanded()">
        <span>dropdown arrow here</span>
    </div>
    <div [@expandCollapse]="isExpanded ? 'expanded' : 'collapsed'"      // property binding
        class="zippy-body" [hidden]="!expanded">
        <ng-content></ng-content>
    </div>
`;

// now when the page loads, the zippy is collapsed and if we click the button the state changes to expanded
// and the transition collapsed => expanded runs and the content opens with the duration and easing

// but when you click the dropdown again, the zippy closes without any animation
// we'll add an animation for when the zippy is closed using transition expanded => collapsed
// change the direction and use the ease-in function

transition('expanded => collapsed', [
    animate('300ms ease-in')
])

// give it a try. after the zippy is expanded, when you click the dropdown arrow again... nothing happens! what???
// this is because we have applied the hidden property.  When you click the dropdown, the hidden property is
// applied immediately and the element is taken out of the dom, so the transition doesn't have a chance to occur
// but, we don't need that hidden property any more so lets just delete it!

// now in the browser we try again and it sort of works, but the first line of text in the dropdown is still displayed
// we'll fix this by adding a new style in the collapsed state to show that it is in the collapsed state
// add a background color yellow for diagnostic purposes and closing the zippy we see that the collapsed state is applied
// and we set the height to zero so it should be gone right?

state('collapsed', style({
    height: 0,
    overflow: 'hidden',
    backgroundColor: 'yellow',
}))

// issue is that in the css there is 20px padding in the zippy-body style
// so in the component, we want to set it's padding to zero when it's collapsed,
// but in the expanded state we want the padding, so we add the padding property with an asterisk


state('collapsed', style({
    height: 0,
    overflow: 'hidden',
    padding: 0,
})),
state('expanded', style({
    height: '*',
    overflow: 'auto',
    padding: '*',
}))

// now in the browser when clicking the dropdown, the zippy opens and the text renders with animation
// but it looks like it originates at the top left corner of the zippy but we want it to go straight down
// this is because we set the padding to zero for all sides - we removed the left padding
// change padding: 0 to paddig top and bottom zero to retain the left and right padding

state('collapsed', style({
    height: 0,
    overflow: 'hidden',
    paddingTop: 0,
    paddingBottom: 0,
})),
state('expanded', style({
    height: '*',
    overflow: 'auto',
    padding: '*',
}))

// now, afer removing the background color, the animation looks like we want it to
// the now the animation looks like this

animations: [
    trigger('expandCollapse', [
        state('collapsed', style({
            height: 0,
            overflow: 'hidden',
            paddingTop: 0,
            paddingBottom: 0,
        })),
        state('expanded', style({
            height: '*',
            overflow: 'auto',
            padding: '*',
        })),

        transition('collapsed => expanded', [
            animate('300ms ease-out')
        ]),
        transition('expanded => collapsed', [
            animate('300ms ease-in')
        ])
    ])
]

// now we can make this code cleaner.  remember that when we call an animate function with only a timing value,
// its going to undo all the previous styles applied.  so when we're going from collapsed state to expanded state,
// all the styles applied in the collapsed state will be undone.  this is the height, padding and overflow properties
// in the collapsed state

state('collapsed', style({
    height: '*',                // these
    overflow: 'auto',
    padding: '*',
}))

// so, we don't have to specify these values because they represent the defaults.  so what we can actually do 
// is just delete the state altogether.  the collapsed to expanded transition will undo the styles applied in the collapsed state

animations: [
    trigger('expandCollapse', [
        state('collapsed', style({
            height: 0,
            overflow: 'hidden',
            paddingTop: 0,
            paddingBottom: 0,
        })),
    
        transition('collapsed => expanded', [
            animate('300ms ease-out')
        ]),
        transition('expanded => collapsed', [
            animate('300ms ease-in')
        ])
    ])
]

// so, if you want to animate an element that is always in the view, you may need to define a custom state
// to do that, use the property binding syntax to set the value of the animation trigger
// this value of the state will determine what transition will run

// video 221 - multi-step animations

// lets take this to the next level.  let's have the zippy expand, then have the text appear with a fade in effect

// when we call the animate function in the transition, it will undo all the previous styles
// what we need to do is implement a multi-step animation
// first we want the zippy to expand, then we want to have the text fade in

// when the zippy is in the collapsed state, we want to apply a style to make the text disappear.
// add opacity zero to the collapsed state

state('collapsed', style({
    height: 0,
    overflow: 'hidden',
    paddingTop: 0,
    paddingBottom: 0,
    opacity: 0,             // new
}))

// in the transition, we first want to change the height, overflow and padding properties, then when complete
// we want to change the opacity to 1.  this is a multi step animation

// note: he removes the overflow property because it's already in his css

// to do this, add a style function to the animate function for the first properties, then add another animate function
// to chage the opacity to 1

transition('collapsed => expanded', [
    animate('300ms ease-out', style({
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
    })),
    animate('1s', style({                   // second step in the animation
        opacity: 0,
    })),
])

// now the zippy expands first and the text fades in after that

animations: [
    trigger('expandCollapse', [
        state('collapsed', style({
            height: 0,
            overflow: 'hidden',
            paddingTop: 0,
            paddingBottom: 0,
        })),
    
        transition('collapsed => expanded', [
            animate('300ms ease-out', style({
                height: 0,
                paddingTop: 0,
                paddingBottom: 0,
            })),
            animate('1s', style({                   // second step in the animation
                opacity: 0,
            })),
        ]),
        transition('expanded => collapsed', [
            animate('300ms ease-in')
        ])
    ])
]

// video 222- separation of concerns

// the animations code in the component metadata is a distraction to the rest of the component code
// lets extract all the animation code and put it in a separate file

// in the animations folder create a file zippy.component.animations.ts
// in the component we define a trigger with returns an animationsTriggerMetadata object
// extract the trigger to the zippy animations file and export it as a const

export const expandCollapse = trigger('expandCollapse', [
    state('collapsed', style({
        height: 0,
        overflow: 'hidden',
        paddingTop: 0,
        paddingBottom: 0,
    })),

    transition('collapsed => expanded', [
        animate('300ms ease-out', style({
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
        })),
        animate('1s', style({                   // second step in the animation
            opacity: 0,
        })),
    ]),
    transition('expanded => collapsed', [
        animate('300ms ease-in')
    ])
])

// back in the component, add the constant to the animations array in the component metadata

// import {fade, slide} from './animations';
// import {expandCollapse} from './zippy.component.animations';

// @Component({
//     animations: [
//          fade,
//          slide,
//          expandCollapse
//     ]
// })