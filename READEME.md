# Infinity Scroll project

## With this project I will explore infinity scroll, lazy loading and fetching data from an API.

## Infinite Scroll & Lazy Loading – Introduction

### What is Infinite Scroll?
Infinite scroll is a technique where new content is automatically loaded as the user approaches the bottom of a page – without having to click a “Show more” button. It is often used in social media, news feeds and comment threads.

### What is Lazy Loading?
Lazy loading means that content (such as images or data) is only retrieved when it is needed – typically when it is about to enter the user’s field of view. This improves performance and reduces unnecessary network traffic.
JavaScript Intersection Observer

### What is IntersectionObserver?
IntersectionObserver is a modern JavaScript API that allows you to monitor when an element enters (or leaves) the viewport – without using heavy scroll events.

#### What it's often used for:

Lazy loading of images
Infinite scroll (automatic loading of content)
Animations that start when elements become visible

### How does it work?
You create an observer that keeps an eye on one or more elements. When an element becomes visible (or invisible), a callback function is called.

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
if (entry.isIntersecting) {
  console.log("Element is visible!);
    }
  });
});
```
