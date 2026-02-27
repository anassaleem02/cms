import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HeroService } from '../../../core/services/hero.service';
import { Hero } from '../../../core/models/hero.model';

@Component({
  selector: 'app-admin-hero',
  templateUrl: './admin-hero.component.html',
  standalone: false,
  styleUrls: ['./admin-hero.component.scss']
})
export class AdminHeroComponent implements OnInit {
  form!: FormGroup;
  loading = true;
  isSaving = false;
  saveSuccess = false;

  constructor(private fb: FormBuilder, private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getActive().subscribe(hero => {
      this.buildForm(hero);
      this.loading = false;
    });
  }

  buildForm(hero: Hero): void {
    this.form = this.fb.group({
      headline: [hero.headline, Validators.required],
      subheadline: [hero.subheadline, Validators.required],
      primaryButtonText: [hero.primaryButtonText, Validators.required],
      primaryButtonUrl: [hero.primaryButtonUrl, Validators.required],
      secondaryButtonText: [hero.secondaryButtonText, Validators.required],
      secondaryButtonUrl: [hero.secondaryButtonUrl, Validators.required],
      backgroundImageUrl: [hero.backgroundImageUrl],
      isActive: [hero.isActive],
      stats: this.fb.array(hero.stats.map(s => this.fb.group({
        value: [s.value, Validators.required],
        label: [s.label, Validators.required],
        displayOrder: [s.displayOrder]
      })))
    });
  }

  get statsArray(): FormArray { return this.form.get('stats') as FormArray; }

  addStat(): void {
    this.statsArray.push(this.fb.group({ value: ['', Validators.required], label: ['', Validators.required], displayOrder: [this.statsArray.length] }));
  }

  removeStat(i: number): void { this.statsArray.removeAt(i); }

  onSubmit(): void {
    if (this.form.invalid || this.isSaving) return;
    this.isSaving = true;
    this.heroService.update(1, this.form.value).subscribe(() => {
      this.isSaving = false;
      this.saveSuccess = true;
      setTimeout(() => this.saveSuccess = false, 3000);
    });
  }
}
