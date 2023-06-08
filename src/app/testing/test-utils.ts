import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export function findEl<T>(fixture: ComponentFixture<T>, testId: string): DebugElement {
    return fixture.debugElement.query(By.css(`[data-test-id="${testId}"]`));
}

export function findAllEls<T>(fixture: ComponentFixture<T>, testId: string): DebugElement[] {
    return fixture.debugElement.queryAll(By.css(`[data-test-id="${testId}"]`));
}

export function findElByClass<T>(fixture: ComponentFixture<T>, cssClass: string): DebugElement {
    return fixture.debugElement.query(By.css(cssClass));
}

export function click<T>(fixture: ComponentFixture<T>, testId: string): void {
    const element = findEl(fixture, testId);
    const event = makeClickEvent(element.nativeElement);
    element.triggerEventHandler('click', event);
}

export function makeClickEvent(target: EventTarget): Partial<MouseEvent> {
    return {
        preventDefault(): void {},
        stopPropagation(): void {},
        stopImmediatePropagation(): void {},
        type: 'click',
        target,
        currentTarget: target,
        bubbles: true,
        cancelable: true,
        button: 0,

    }
}

export function findComponent<T>(
        fixture: ComponentFixture<T>,
        selector: string
    ): DebugElement {
    return fixture.debugElement.query(By.css(selector));
}

export function findAllComponents<T>(
        fixture: ComponentFixture<T>,
        selector: string
    ): DebugElement[] {
    return fixture.debugElement.queryAll(By.css(selector));
}