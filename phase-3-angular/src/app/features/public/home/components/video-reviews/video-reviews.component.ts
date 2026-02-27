import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface VideoReview {
  embedUrl: SafeResourceUrl;
  title: string;
  description: string;
}

@Component({
  selector: 'app-video-reviews',
  templateUrl: './video-reviews.component.html',
  standalone: false,
  styleUrls: ['./video-reviews.component.scss']
})
export class VideoReviewsComponent {
  videos: VideoReview[];

  constructor(private sanitizer: DomSanitizer) {
    this.videos = [
      {
        embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/J8uTru18c3k?si=4CcAra9i2iUj-tjz'),
        title: 'S.O Series 6.2KW Installation Review',
        description: 'Customer testimonial showcasing the complete installation process and performance of our 6.2KW solar inverter system.'
      },
      {
        embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/J8uTru18c3k?si=xQG-vZzpKV0ahG6J'),
        title: 'Lithium Battery 51.2V 280Ah Review',
        description: 'In-depth review of our high-capacity lithium battery system featuring intelligent BMS and exceptional performance.'
      },
      {
        embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/WxI_sdts9ZY?si=Z2xTH6hrYrRakenw'),
        title: 'Complete Solar Solution Installation',
        description: 'Full walkthrough of a complete solar installation including inverter, batteries, and solar panels working together.'
      }
    ];
  }
}
