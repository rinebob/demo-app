



  ////////////////////// Mosh Hamedani youtube Angular animations //////////////////

import { trigger, state, style, transition, animate, keyframes, animation, useAnimation, group, query, stagger, animateChild } from "@angular/animations";

        // From Youtube Mosh Hamedani angular animations videos
        // start with lesson 201 or so
        // https://www.youtube.com/watch?v=VI4yHVg09cs

        export const fadeTrigger = trigger('fade', [
            state('void', style({opacity: 0})),
        
            // state change transition
            // alias for 'void => *' state change is ':enter'
            // alias for '* => void' state change is ':leave'
        
            transition(':enter, :leave', [
                style({ backgroundColor: 'yellow', color: 'blue', opacity: .5}),
                animate(2000, style({backgroundColor: 'blue', color: 'red', opacity: 1})),
            ]),
        ]);
        
        // video 212
        
        // Without modification, transitions occurs at constant (linear) speed
        // animate(500, style({transform: 'translateX(-100%)'})),
        
        // Easings:
        // specify an easing to control the speed of the transition movement
        // use an animate string ex: '0.5s 1.0s ease-in'
        // 
        // standard easings: linear, ease-in, ease-out, ease-in-out
        // cubic bezier - determines the shape of the easing curve
        // cubic-bezier.com has a tool to design a c-b curve
        export const moshSlideTrigger1 = trigger('moshSlide1', [
            state('void', style({transform: 'translateX(-20px)'})),
            transition(':enter', [
                animate(500),
            ]),
            transition(':leave', [
                
                animate('2s cubic-bezier(.16,.66,.7,.02)', style({transform: 'translateX(-100%)'})),
            ]),
        
        ]);
        
        // video 212
        //Keyframes
        // collection of animations: daneden.github.io/animate.css
        // look in the source directory and find the specific animation 
        // Mosh demonstrates an animation called bounceOutLeft that uses a keyframe
        // keyframes provide more granular control over the transitions
        // having a single style property is equivalent to a keyframe with one frame
        // keyframes takes an argument of an array of style function calls
        // each style property has an additional property 'offset' which is the 
        // point in the transition where the style should be applied
        // values start at zero and go to one.  Zero equals start one equals end over the 
        // animation duration
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
        
        // video 213
        
        // Reusable animations
        // Right now all our animation values are hard-coded in each usage
        // If we want to reuse this in other places we can extract it and save it as a const
        // using the 'animation' function from ang animations
        // maybe should be called 'createAnimation' but...
        // to use the new const in another animation, call it with the 'useAnimation' function
        
        export const bounceOutLeftAnimation = animation(
            animate('2s cubic-bezier(.16,.66,.7,.02)', keyframes([
                style({offset: .2, opacity: 1, transform: 'translateX(50px)'}),
                style({offset: 1, opacity: 0, transform: 'translateX(-100%)'}),
        
            ])),
        );
        
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
        
        // video 214
        
        // Parameterizing reusable animations
        // in the first trigger function above (fadeAnimation here as moshFadeTrigger1) 
        // we can't use the state because it's not in a transition function.  We can only reuse
        // the content of a transition function. Add the opacity 0 as part of the reusable
        // animation.  
        
        export const moshFadeTrigger1 = trigger('moshFadeTrigger1', [
            state('void', style({opacity: 0})),
            transition(':enter, :leave', [
                style({ opacity: .5}),
                animate(2000),
            ]),
        ]);
        
        // First, remove the state function then separate the enter an leave transitions
        
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
        
        export const moshFadeInAnimation1 = animation([
            style({ opacity: 0}),
            animate(2000),
        ]);
        
        // and use it in our trigger.  
        export const moshFadeTrigger3 = trigger('moshFadeTrigger3', [
            transition(':enter', 
                useAnimation(moshFadeInAnimation1)
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
            params: {
                duration: '2s',
                easing: 'ease-out'
            }
        });
        
        // the consumer of this function can override these values
        export const moshFadeTrigger4 = trigger('moshFadeTrigger4', [
            transition(':enter', useAnimation(moshFadeAnimation3, {
                params: {
                    duration: '1s',
                    easing: 'ease-in'
                }
            })),
            transition(':leave', [
                
                animate('2s cubic-bezier(.16,.66,.7,.02)', style({transform: 'translateX(-100%)'})),
            ]),
        
        ]);
        
        // video 215 Animation callbacks
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
        
        // video 216 Querying child items
        // Say we want to animate the page title.  We would have to create a separate trigger for
        // each item we want to animate.  We would have to do one for the h1, for a p, for a div etc.
        // This could lead to lots of triggers with the same animation for each.
        // What about creating a trigger and applying it to the parent, then find the element
        // we want in the child DOM tree
        
        // In the template, wrap all the html in a div and apply a trigger to it
        `
        <div @moshContainerTigger1>     //<--
            <h1>Todos</h1>
            <div class="list-group">
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
            </div>
        
        </div>
        `
        
        // Add another trigger moshContainerTrigger1
        
        export const moshContainerTigger1 = trigger('moshContainerTrigger1', [
            
        ]);
        
        // inside here you add one or more transitions.  At a minimum have an enter transition.
        // We want to target the heading, so use a helper function 'query'
        
        
        // export const moshContainerTrigger2 = trigger('moshContainerTrigger2', [
        //     transition(':enter', [
        //         query('h1', [
        //             style({transform: 'translateY(-20px)'}),
        //             animate(1000)
        //         ]),
        //     ]),
        // ]);
        
        // There are pseudo-selectors we can use also
        // :enter, :leave, :animating, @trigger, @* and :self
        
        // In the UI, the header animates, but the todo items don't animate in the beginning
        // If you add an item though it will have the animation.  We'll fix this next.
        
        // video 217 Animating Child elements
        
        // the reason we have the problem above is because of the trigger hierarchy in the DOM
        // The containerTrigger2 is a parent and the fadeTrigger4 is a child.  Both of these triggers
        // handle the :enter transition happens, the parent trigger always gets priority and 
        // the child trigger doesn't get executed at all.  To fix this we just need to query
        // for the elements with the child trigger attached (you can use other query selectors also)
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
        // Next we'll make it run in parallel
        
        // video 218 Running Parallel Animations
        
        // To make the animations run together, use the 'group' function.  Group takes an array
        // of animations that run in parallel.  Move the two queries into the group function
        
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
        
        // You don't have to have a query in a group function, but it's more common in real world
        // but you can do this:
        `
        group([
            animate(1000, style({backgroundColor: 'red'}),)
            animate(1000, style({transform: 'translateY(-20px)'}),)
        ]),
        `
        // These animations will run in parallel.  If you take them out of the group function 
        // they'll run in sequence.
        
        // video 219 Staggering animations
        
        // Right now our list items all fade in at the same time.  We want to have them fade
        // one at a time.  To do this we use the 'stagger' function.  It takes a param for
        // duration and another to do the animation
        
        // Inside our query function, wrap the call to animate child in a stagger function
        
        export const moshContainerTrigger2 = trigger('moshContainerTrigger2', [
            transition(':enter', [
        
                group([                 // new
                    query('h1', [              
                        style({transform: 'translateY(-20px)'}),
                        animate(1000)
                    ]),
                   query('@moshFadeTrigger4', 
                        stagger(500, animateChild())
                    )
                ]),
                
            ]),
        ]);
        
        // Now the list items appear in sequence, one every 500 ms
        
        // you don't have to use animate child in the stagger function.  You can simply include
        // an array of steps for the animation, or supply an animation with useAnimation function
        
        `
        query('@moshFadeTrigger4', 
        stagger(500, [
            style({transform: 'translateX(-20px)'}),
            animate(1000)
        ])
        )
        
        or 
        
        query('.list-group-item', 
            stagger(500, animateChild())
        )
        
        or 
        query('.list-group-item', 
            stagger(500, [
                style({ opacity: 0, transform: 'translateX(-20px)'}),
                animate(1000)
            ])
        )
        
        `
        
        // But if you don't animate the child, it won't happen, so these aren't what we're 
        // looking for.  The stagger function is really only meant to be used inside a query
        // function.  Use it to apply a delay between animating each child