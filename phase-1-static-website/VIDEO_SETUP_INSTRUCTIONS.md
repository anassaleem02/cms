# FM's Power - YouTube Video Setup Instructions

## How to Add Your YouTube Videos to the Website

The website currently has 3 video placeholders in the "Product Reviews" section. Follow these steps to add your actual FM's Trading YouTube videos:

### Step 1: Get Your YouTube Video IDs

1. Go to your FM's Trading YouTube channel: https://www.youtube.com/@Fmstrading
2. Select the videos you want to feature on your website
3. For each video, copy the Video ID from the URL

**Example:**
- If your video URL is: `https://www.youtube.com/watch?v=ABC123DEF456`
- The Video ID is: `ABC123DEF456`

### Step 2: Update the Video IDs in index.html

Open the file: `phase-1-static-website/index.html`

Search for these three placeholders and replace them with your actual video IDs:

#### Video 1 - S.O Series 6.2KW Installation Review
**Location:** Around line 1886
**Find:** `YOUR_VIDEO_ID_1`
**Replace with:** Your first video ID

```html
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID_1"
  title="FM's Power Solar Inverter Installation Review"
```

#### Video 2 - Lithium Battery Review
**Location:** Around line 1908
**Find:** `YOUR_VIDEO_ID_2`
**Replace with:** Your second video ID

```html
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID_2"
  title="FM's Power Lithium Battery Review"
```

#### Video 3 - Complete Solar Solution
**Location:** Around line 1930
**Find:** `YOUR_VIDEO_ID_3`
**Replace with:** Your third video ID

```html
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID_3"
  title="FM's Power Complete Solar Solution"
```

### Step 3: Customize Video Titles and Descriptions (Optional)

You can also update the video titles and descriptions to match your actual videos:

**Video 1 Section (around line 1893):**
```html
<h3>S.O Series 6.2KW Installation Review</h3>
<p>Customer testimonial showcasing the complete installation process...</p>
```

**Video 2 Section (around line 1915):**
```html
<h3>Lithium Battery 51.2V 280Ah Review</h3>
<p>In-depth review of our high-capacity lithium battery system...</p>
```

**Video 3 Section (around line 1937):**
```html
<h3>Complete Solar Solution Installation</h3>
<p>Full walkthrough of a complete solar installation...</p>
```

### Step 4: Test Your Changes

1. Save the `index.html` file
2. Open it in a web browser
3. Scroll to the "Product Reviews" section
4. Verify that your videos are playing correctly

## Recommended Videos to Feature

Consider featuring videos that showcase:
1. **Product installations** - Show real customer installations
2. **Product demonstrations** - Highlight key features and benefits
3. **Customer testimonials** - Let satisfied customers speak about their experience
4. **Technical reviews** - Detailed specifications and performance tests

## Need Help?

If you don't have suitable videos yet, you can:
- Create new product review videos
- Use customer testimonial videos
- Record installation process videos
- Contact your customers for permission to feature their installations

---

**Note:** Make sure you have permission to embed any videos on your website, especially if they feature customers or third-party content.
