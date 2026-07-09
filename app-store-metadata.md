## App Store Connect Metadata — Pellazgo Shop

Use this as the source of truth when filling in App Store Connect. Copy fields directly into the matching boxes in the "App Information" / "Version Information" pages.

### Basic Info
- **App Name:** Pellazgo Shop
- **Subtitle** (30 chars max): Shop Pellazgo, Anywhere
- **Bundle ID:** com.pellazgo.pellazgo
- **Primary Category:** Shopping
- **Secondary Category:** Lifestyle
- **Website:** https://pellazgo.base44.app/
- **Support URL:** https://pellazgo.base44.app/ (replace with a dedicated support/contact page if you have one — Apple requires this to be a real reachable page, not just the homepage)
- **Marketing URL (optional):** https://pellazgo.base44.app/

### Promotional Text (170 chars, editable anytime without review)
Discover new arrivals, exclusive deals, and a faster way to shop Pellazgo — right from your phone.

### Description (4000 chars max)
Welcome to Pellazgo Shop — your dedicated mobile storefront for everything Pellazgo.

Browse our full catalog, track new arrivals, and check out securely, all optimized for a smooth on-the-go shopping experience.

FEATURES
• Browse the complete Pellazgo product catalog
• Fast, secure checkout
• Push notifications for order updates and offers
• Save favorites and revisit them anytime
• Seamless sync with your Pellazgo account

Pellazgo Shop brings the full pellazgo.base44.app experience into a dedicated app — no browser tabs, no clutter, just your store.

### Keywords (100 chars max, comma-separated, no spaces after commas)
shopping,pellazgo,store,ecommerce,deals,retail,fashion,shop,online store,marketplace

### What's New in This Version (Version Release Notes)
Initial release of Pellazgo Shop for iOS.

### Copyright
© 2026 Pellazgo. All rights reserved.

### Age Rating Questionnaire
Answer based on actual store content. For a general e-commerce storefront with no user-generated content, gambling, or mature themes, the typical answers are all "No" → results in a 4+ rating. Adjust if the site has different content (e.g. user reviews/comments, ads).

---

## Screenshots — Required Sizes

Apple requires at minimum one set for the largest supported device size (iPhone) — App Store Connect auto-scales for other sizes if you don't upload every size, but for best presentation upload the exact sizes:

| Device | Resolution (px) | Required? |
|---|---|---|
| iPhone 6.9" (iPhone 16 Pro Max / 15 Pro Max) | 1320 x 2868 | Yes — this is now the mandatory baseline |
| iPhone 6.5" (iPhone 11 Pro Max / XS Max) | 1284 x 2778 or 1242 x 2688 | Recommended |
| iPad 13" (if app supports iPad) | 2064 x 2752 | Only if "supports iPad" is enabled |

You need **3–10 screenshots** per required size. Suggested shots for a shop app:
1. Home / catalog browse screen
2. Product detail page
3. Cart / checkout screen
4. Search or categories screen
5. Order confirmation / account screen

Since this app is a wrapped website, the simplest way to get these: open https://pellazgo.base44.app/ in Safari on an iPhone 16 Pro Max simulator (or ask me to capture screenshots via the web-search/screenshot tool against the live site) and export at the required resolution, then add your app's dark-green/gold branding as a device frame or background if desired.

---

## App Privacy Details (App Store Connect → App Privacy)

WebToNative-wrapped apps typically collect at minimum:
- **Identifiers** (Device ID) — if `requestTrackingAuthorization`/analytics SDKs are active (this bundle includes Firebase Analytics + Google App Measurement)
- **Usage Data** (Product Interaction) — via Firebase Analytics
- **Diagnostics** (Crash Data) — if any crash reporting SDK is active

Recommended privacy questionnaire answers based on the bundled SDKs (Firebase, Google Utilities/App Measurement):
- Data Used to Track You: **Device ID / Advertising Data** — mark **Yes** if tracking authorization prompts are shown to users, otherwise mark this data type as collected but not linked/not used for tracking
- Data Linked to You: **Purchase History, Contact Info** (email, name) — Yes, if the site requires account creation/checkout with these fields
- Data Not Linked to You: **Usage Data, Diagnostics** — Yes (standard Firebase Analytics telemetry)

You'll also need a **Privacy Policy URL** — required by Apple for every app. If pellazgo.base44.app doesn't yet have a `/privacy` page, one must be published before submission; Apple will reject without it.

### Privacy Policy URL
https://pellazgo.base44.app/privacy (confirm this page exists and is live before submitting — if not, this must be created first)

---

## Pre-submission checklist
- [ ] Privacy Policy page live at a real URL
- [ ] Support URL/page live and reachable
- [ ] Screenshots uploaded for at least the 6.9" iPhone size
- [ ] App Privacy questionnaire completed
- [ ] Age rating questionnaire completed
- [ ] Pricing set (Free, based on `isPaid: false` in app config)
- [ ] Build uploaded via Codemagic and selected in "Build" section of this version
