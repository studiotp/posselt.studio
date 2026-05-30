---
title: "Project Title"        # just the project name (e.g. "Paris", "II")
client: "Client Name"          # the artist / brand / client (e.g. "Nils Frahm", "Kiasmos")
year: 2024
category: "music"              # optional: music | branding | spatial | editorial | packaging
status: "active"               # active = visible on homepage, archive = hidden, draft = work in progress
featured: false                # for future use
url: "https://example.com"     # optional external link
description: "Short description for SEO and project detail pages."

# Slides — ordered array, controls display order
# Each slide can be an image or a video
# For images: put the file in public/projects/{folder-name}/ and reference just the filename
# For videos: use a direct MP4 URL (Vimeo progressive, or self-hosted)
slides:
  - type: image
    src: "photo_01.jpg"
    caption: "Art direction and design"
    alt: "Descriptive alt text"

  - type: image
    src: "photo_02.jpg"
    caption: "Vinyl packaging"
    alt: "Packaging detail"

  - type: video
    src: "https://player.vimeo.com/progressive_redirect/playback/.../file.mp4"
    poster: "video_poster.jpg"   # required: image shown before video plays
    caption: "Campaign video"
    autoplay: true               # true = muted+loop, false = click to play
    alt: "Campaign video"
---

# Optional: add any markdown content here for the project detail page
