
# Product Management App

Shop Smart is a comprehensive product management dashboard that provides users with tools to manage products, track orders, and handle customer interactions.

![App Dashboard](/public/logo.svg)

## Features

- **Authentication System**: Secure login and user management
- **Product Management**: Browse, filter, and manage your product catalog
- **Order Processing**: Real-time order tracking and history
- **Shopping Cart**: Intuitive cart management for customers
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

This project is built with modern web technologies:

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: shadcn/ui (built on Radix UI)
- **Routing**: React Router for navigation
- **State Management**: 
  - TanStack Query for data fetching
  - Custom zustand-based store for cart management
  - React Context for authentication
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <https://github.com/vincent-mugendi/product_management_app_v1.git>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at http://localhost:8080

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Key Features Explained

### Authentication

The application includes a simple authentication system that demonstrates protected routes and user sessions. In a production environment, this would be connected to a secure backend.

### Product Management

Products are fetched from an external API and displayed in a grid with filtering options. The products can be added to the cart for ordering.

### Order Management

The dashboard provides real-time updates of incoming orders, allowing restaurant owners to process them efficiently. Order history is available for reference and reporting.

### Shopping Cart

A comprehensive cart system allows for adding, removing, and adjusting product quantities. The cart persists across page refreshes using localStorage.

## Deployment

The application is deployed on vercel:
![Access Here](https://product-management-app-v1.vercel.app/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

All rights reserved. Unauthorized use, copying, or distribution of any code from this repository is strictly prohibited without prior written permission from the author.
