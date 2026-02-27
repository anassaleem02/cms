import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteName = "FM's Power";
  private readonly defaultDescription = "Premium solar inverters, lithium batteries and solar panels in Karachi. FM's Power provides reliable solar energy solutions with 5-year warranty.";
  private readonly siteUrl = 'https://www.fmspower.com';

  constructor(private title: Title, private meta: Meta) {}

  setPage(config: {
    title?: string;
    description?: string;
    keywords?: string;
    imageUrl?: string;
    url?: string;
    type?: string;
  }): void {
    const fullTitle = config.title ? `${config.title} | ${this.siteName}` : this.siteName;
    const description = config.description || this.defaultDescription;
    const url = config.url ? `${this.siteUrl}${config.url}` : this.siteUrl;
    const image = config.imageUrl || `${this.siteUrl}/images/logo/fmslogo.png`;

    this.title.setTitle(fullTitle);

    // Standard meta
    this.meta.updateTag({ name: 'description', content: description });
    if (config.keywords) this.meta.updateTag({ name: 'keywords', content: config.keywords });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }

  setProductPage(product: { name: string; shortDescription: string; slug: string; primaryImage?: { imageUrl: string } | null }): void {
    this.setPage({
      title: product.name,
      description: product.shortDescription,
      keywords: `${product.name}, solar, inverter, battery, FM's Power, Karachi`,
      imageUrl: product.primaryImage?.imageUrl,
      url: `/products/${product.slug}`,
      type: 'product'
    });
  }
}
