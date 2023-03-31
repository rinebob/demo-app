import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ScrollService {
  constructor(private router: Router) {}

  scrollToElementById(id: string) {
    const element = this.__getElementById(id);
    if (element) {
      // console.log("sS sTEBI scrolling to element: ", element);
      this.scrollToElement(element);

    }
  }

  private __getElementById(id: string): HTMLElement | undefined {
    // console.log("sS gEBI element id: ", id);
    const element = document.getElementById(id);
    // console.log("sS gEBI element: ", element);
    if (element) {
      return element;

    } else return undefined;
  }
  
  scrollToElement(element: HTMLElement) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
