import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({ selector: '[appScrollReveal]', standalone: false })
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const el = this.el.nativeElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${this.revealDelay}ms, transform 0.6s ease ${this.revealDelay}ms`;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          this.observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    this.observer.observe(el);
  }

  ngOnDestroy(): void { if (this.observer) this.observer.disconnect(); }
}
