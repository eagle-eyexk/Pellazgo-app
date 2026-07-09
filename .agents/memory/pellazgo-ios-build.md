---
name: Pellazgo iOS build strategy
description: How the Pellazgo Shop iOS app is built/published, and why the approach changed from resigning a zip to a real Xcode project
---

The app is a thin WKWebView wrapper around the Pellazgo web app (pellazgo.base44.app), bundle id `com.pellazgo.pellazgo`, Apple team `H4QUDPK7S3`, ASC app id `6782613978`.

Initial approach: patch/resign a WebToNative.com-exported `.app` (Simulator-only build) into a valid App Store IPA entirely inside `codemagic.yaml` (thinning binaries, flipping PIE flags, patching plists, obfuscating private symbol strings). This worked but was inherently fragile — each new App Store Connect validation pass could surface a new class of binary-level rejection, since the source binary was never actually compiled for iOS device/App Store.

**Why switched:** resigning a foreign simulator export is a losing battle against Apple's static validator; a real compiled app avoids the whole category of Mach-O patching issues.

**How to apply:** current setup uses a minimal native SwiftUI project at `mobile-app-swift/` (single `WKWebView` screen loading the production URL) built on Codemagic via `xcode-project use-profiles` + `xcode-project build-ipa`, with build-number auto-increment (`agvtool new-version -all` using latest TestFlight/App Store build number from `app-store-connect` CLI) and push-triggered builds on `main`. If asked to touch native UI/functionality for this app again, edit files under `mobile-app-swift/Pellazgo/`, not the old resigned bundle in `ios-app/`.
