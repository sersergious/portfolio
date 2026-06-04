# About Me Page Redesign - Task Requirements

## Overview
Redesign the about me page with an alternating card layout featuring images and text positioned side-by-side. As users scroll, cards alternate orientation to create visual rhythm and engagement.

## Layout Requirements
- **Card Design**: Each section features an image on one side and text content on the other
- **Alternating Orientation**: 
  - Section 1 (Origin Story): Image right, text left
  - Section 2 (Background): Image right, text left
  - Section 3 (Research): Image right, text left
  - Section 4 (Interests): Image left, text right
  - Section 5 (Philosophy): Image right, text left
- **Responsive Design**: Cards stack vertically on mobile devices with full-width content
- **Smooth Scrolling**: Implement subtle fade-in and slide animations as sections come into view

---

## Content Sections

### 1. Origin Story
**Layout**: Image right, text left

#### Text
"Since early childhood, I've been passionate about technology and have always enjoyed tinkering with computers to understand how they work. This sparked my interest in coding, and I started programming at age 13. I've since worked on a variety of projects, including web applications and mobile apps. 

My love for mathematics has been equally defining—since age 5, I've actively participated in various mathematical conferences and olympiads. As a testament to my combined background, I graduated from the University of Scranton with a degree in Computer Science and Mathematical Sciences."

---

### 2. Background

#### 2.1 Software Engineering
**Layout**: Three separate cards (grid or flex layout)

**Card 1 - Overview**
"I have a strong background in software engineering. Most of my skills I have acquired through self-study and continuous improvement during my college years. I enjoy working on Full Stack Web Applications as well as Mobile Applications (Android)."

**Card 2 - Languages** (Display with technology icons)
- Python
- Java
- C
- JavaScript/TypeScript
- HTML/CSS
- Kotlin

**Card 3 - Frameworks** (Display with technology icons)
- React
- Next.js
- Jetpack Compose
- Tailwind CSS
- FastAPI
- Numpy
- Scipy
- Qiskit

---

#### 2.2 Mathematics
**Layout**: Two separate cards

**Card 1 - Overview**
"My love for mathematics has been equally defining—since age 5, I've actively participated in various mathematical conferences and olympiads. Throughout my career, I've developed a deep understanding of mathematical concepts and their applications in various fields including Computer Science."

**Card 2 - Mathematics Background** (Simple list)
- Calculus
- Linear Algebra
- Probability Theory
- Statistics
- Numerical Analysis
- Cryptography
- Coding Theory

**Note**: For more information on anything related to my background, feel free to reach out personally and I will provide additional details.

---

### 3. Research
**Layout**: Image right, text left

#### Text
"In the summer of 2025, I had a realization that I wanted to explore what research is all about. When I returned to college, I quickly found an opportunity to pursue a research project in Quantum Computing. After about 8 months, I was able to present my first results. Since then, I've become passionate about researching various fields in Computer Science.

My primary focus has been on Quantum Computing, but I'm also deeply interested in Robotics, AI, and novel applications of Software Engineering. I'm particularly drawn to how Computer Science intersects with Computational Biology and Aerospace Engineering. These interdisciplinary approaches fascinate me and drive my continued exploration of emerging research areas.

[View Research →](link-to-research-page)"

#### Key Focus Areas
- Quantum Computing (Primary focus)
- Robotics
- Artificial Intelligence
- Novel Software Engineering Applications
- Computational Biology
- Aerospace Engineering

---

### 4. Interests
**Layout**: Image left (Carousel), text right

#### Text
"Outside of work, I enjoy spending time outdoors, traveling, and cooking. I've been actively involved in leading outdoor retreats and organizing activities for groups of people. Some of my recent adventures include trips to Death Valley, California, and World End State Park, Pennsylvania—the latter of which I led myself.

I'm also an avid traveler. Growing up in Ukraine and starting my explorations at age 18, I've been fortunate to visit multiple countries including Germany, Spain, Croatia, and Turkey. I'm passionate about discovering new destinations and experiencing different cultures. When I'm not traveling, I enjoy cooking and spending quality time with friends and family."

#### Image Carousel
Include photos from:
- Death Valley, California
- World End State Park, Pennsylvania
- Travel destinations (Germany, Spain, Croatia, Turkey)
- Cooking/food experiences
- Outdoor retreat activities

---

### 5. Philosophy
**Layout**: Single card with image right, text left
**Title**: "💜 My Philosophy"

#### Content
Extract key philosophy headings from your existing content and present as:
- **Heading 1** - Description text
- **Heading 2** - Description text
- **Heading 3** - Description text

*(Note: Provide your philosophy text/headings to complete this section)*

---

## Design Considerations

### Visual Design
- **Images**: Use high-quality, professional images or custom illustrations for each section
- **Typography**: Maintain consistent font hierarchy across sections (Title, subtitle, body text)
- **Color Scheme**: Use a cohesive color palette that reflects your personal brand
- **Contrast**: Ensure sufficient contrast between text and backgrounds for accessibility

### Interactive Elements
- **Hover Effects**: Subtle scale or shadow effects on cards when hovered
- **Scroll Animations**: Fade-in and slide-in effects as sections come into view
- **Smooth Transitions**: CSS transitions for all interactive elements (0.3-0.5s duration)
- **Card Styling**: Subtle shadows or borders to define card boundaries and separation

### Spacing & Layout
- **Padding**: Consistent padding within cards (24px-32px)
- **Gaps**: Adequate spacing between cards and sections (40px-60px between major sections)
- **Alignment**: Proper vertical alignment of image and text within cards

---

## Technical Requirements

### Responsive Breakpoints
- **Desktop** (1024px+): Full side-by-side card layout with alternating orientation
- **Tablet** (768px-1023px): Adjusted card width, maintain side-by-side where possible
- **Mobile** (< 768px): Full-width stacked layout, image on top, text below

### Performance
- Optimize images for web (compress without quality loss)
- Lazy-load images as they come into view
- Smooth scroll behavior across all browsers

---

## Additional Notes
- Make the page visually engaging and memorable
- Ensure content flows naturally as users scroll down
- Maintain consistent visual hierarchy throughout
- Consider subtle micro-interactions for enhanced user experience
- Test responsiveness across multiple devices and screen sizes
