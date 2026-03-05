import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoReview } from '../../../../../core/models/video-review.model';
import { VideoReviewService } from '../../../../../core/services/video-review.service';

@Component({
  selector: 'app-video-reviews',
  templateUrl: './video-reviews.component.html',
  standalone: false,
  styleUrls: ['./video-reviews.component.scss']
})
export class VideoReviewsComponent implements OnInit {
  videos: VideoReview[] = [];
  loading = true;

  constructor(private videoReviewService: VideoReviewService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.videoReviewService.getAll().subscribe(reviews => {
      this.videos = reviews;
      this.loading = false;
    });
  }

  getEmbedUrl(youtubeUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
  }
}
