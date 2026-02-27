import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'img[appLazyImage]',
  standalone: false
})
export class LazyImageDirective implements OnInit {
  @Input() appLazyImage!: string;
  @Input() placeholder = '/images/products/placeholder.svg';

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnInit(): void {
    const img = this.el.nativeElement;
    img.src = this.placeholder;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            img.src = this.appLazyImage;
            img.onload = () => img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '50px' });
      observer.observe(img);
    } else {
      img.src = this.appLazyImage;
    }
  }
}
