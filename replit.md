# Premium Barbershop Landing Page

## Overview

This is a premium barbershop landing page built with React and TypeScript, featuring a street-luxury aesthetic with a bold black, white, and red color scheme. The application is designed to capture leads for a masculine barbershop through a cinematic, high-impact single-page experience with smooth animations and modern UI components.

The landing page follows a 5-section structure: Hero (with video background), Value Proposition (3 pillars), Dynamic Services Carousel, Before/After Gallery, and Final CTA with lead capture form. The design emphasizes bold typography, smooth animations, and a mobile-responsive layout optimized for conversions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing (single-page application)

**UI Component System**
- Shadcn/ui components built on Radix UI primitives for accessible, customizable UI elements
- TailwindCSS for utility-first styling with custom theme configuration
- Framer Motion for smooth animations, parallax effects, and scroll-triggered interactions
- Custom design system with CSS variables for theming (dark mode focused)

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management, caching, and API interactions
- React Hook Form with Zod validation for form handling and validation
- Local component state with React hooks for UI interactions

**Design System**
- Custom color palette: Black (#000000), White (#FFFFFF), Red (#E10600)
- Typography: Bebas Neue/Oswald for display text, Inter for body copy
- Condensed headings with thick/thin stroke contrast for street-luxury aesthetic
- Responsive breakpoints configured in Tailwind for mobile-first design

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server with TypeScript
- Custom middleware for JSON parsing, logging, and request handling
- RESTful API design with `/api/leads` endpoints for lead capture

**Data Layer**
- In-memory storage implementation (`MemStorage`) for development
- Drizzle ORM configured for PostgreSQL (schema defined, ready for database integration)
- Schema validation using Zod with drizzle-zod integration

**Build & Deployment**
- ESBuild for server-side bundling with selective dependency externalization
- Vite for client-side bundling with code splitting and asset optimization
- Development mode with HMR via Vite middleware integration
- Production build outputs to `dist/` directory

**API Design**
- `POST /api/leads` - Create new lead with name and phone validation
- `GET /api/leads` - Retrieve all leads (for admin/testing purposes)
- Input validation using Zod schemas with detailed error responses
- Proper HTTP status codes (201 for creation, 400 for validation errors, 500 for server errors)

### External Dependencies

**Third-Party UI Libraries**
- Radix UI components (@radix-ui/*) - Accessible, unstyled component primitives for dialogs, popovers, tooltips, forms, navigation, etc.
- Embla Carousel React - Touch-friendly carousel for services section
- Lucide React - Icon library for UI elements

**Animation & Interaction**
- Framer Motion - Advanced animation library for parallax, scroll-triggered animations, and smooth transitions
- React Hook Form - Form state management with performance optimization
- @hookform/resolvers - Zod integration for form validation

**Database & ORM**
- Drizzle ORM - Type-safe SQL query builder
- Drizzle Kit - Schema migrations and database management
- @neondatabase/serverless - Neon PostgreSQL serverless driver (configured but not actively used with in-memory storage)
- drizzle-zod - Schema to Zod validator conversion

**Utilities**
- class-variance-authority (CVA) - Type-safe variant styling for components
- clsx & tailwind-merge - Conditional className composition
- date-fns - Date formatting and manipulation
- Zod - Runtime type validation and schema definition

**Development Tools**
- @replit/vite-plugin-* - Replit-specific development tooling
- TypeScript - Static type checking
- TSX - TypeScript execution for build scripts and development server

**Booking Integration**
- Setmore integration placeholder (empty href attributes ready for booking URL)

**Font Loading**
- Google Fonts (Bebas Neue, Oswald, Inter) loaded via CDN in index.html