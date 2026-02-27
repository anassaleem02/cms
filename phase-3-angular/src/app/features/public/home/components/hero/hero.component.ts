import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Hero } from '../../../../../core/models/hero.model';
import { HeroService } from '../../../../../core/services/hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  standalone: false,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, AfterViewInit {
  hero: Hero | null = null;
  loading = true;
  animatedStats: { value: string; label: string; current: number; target: number }[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getActive().subscribe(h => {
      this.hero = h;
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    this.setupScrollObserver();
  }

  private setupScrollObserver(): void {
    const statsEl = document.querySelector('.hero-stats');
    if (!statsEl) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCountAnimation();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(statsEl);
  }

  private startCountAnimation(): void {
    if (!this.hero) return;
    this.hero.stats.forEach((stat, i) => {
      const numericMatch = stat.value.match(/[\d.]+/);
      if (!numericMatch) return;
      const target = parseFloat(numericMatch[0]);
      const suffix = stat.value.replace(/[\d.]+/, '');
      let current = 0;
      const step = target / 60;
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        const el = document.querySelector(`.stat-value-${i}`);
        if (el) {
          el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
        }
        if (current >= target) clearInterval(interval);
      }, 25);
    });
  }
}
