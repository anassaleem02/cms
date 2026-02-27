import { Component, OnInit, OnDestroy } from '@angular/core';
import { Testimonial } from '../../../../../core/models/testimonial.model';
import { TestimonialService } from '../../../../../core/services/testimonial.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  standalone: false,
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  testimonials: Testimonial[] = [];
  loading = true;
  currentIndex = 0;
  private autoPlayTimer: any;

  constructor(private testimonialService: TestimonialService) {}

  ngOnInit(): void {
    this.testimonialService.getAll().subscribe(t => {
      this.testimonials = t;
      this.loading = false;
      this.startAutoPlay();
    });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.autoPlayTimer = setInterval(() => {
      this.next();
    }, 5000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goTo(index: number): void {
    this.currentIndex = index;
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
