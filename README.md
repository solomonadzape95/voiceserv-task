# Employee Management System

## Overview
A modern React application for managing employees and grade levels within an organization. Built with React, TypeScript, TailwindCSS, and Zustand for state management.

## Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher) or yarn
- Git

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd voiceserv-task
```

### 2. Install Dependencies
Using npm:
```bash
npm install
```
Or using yarn:
```bash
yarn install
```

### 3. Start Development Server
Using npm:
```bash
npm run dev
```
Or using yarn:
```bash
yarn dev
```

The application will start on `http://localhost:5173` by default.

### 4. Build for Production
Using npm:
```bash
npm run build
```
Or using yarn:
```bash
yarn build
```

### 5. Preview Production Build
Using npm:
```bash
npm run preview
```
Or using yarn:
```bash
yarn preview
```

## Available Scripts

- `dev` - Start development server
- `build` - Create production build
- `preview` - Preview production build
- `lint` - Run ESLint for code quality checks

## Environment Variables

No environment variables are required to run the application locally. All data is managed in the client-side state.

## Project Structure
```
src/
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── EmployeeForm   # Employee creation/editing form
│   ├── EmployeeList   # Employee listing and management
│   └── GradeLevelManagement # Grade level management
├── hooks/             # Custom React hooks
├── lib/              # Constants and initial data
├── schemas/          # Zod validation schemas
├── services/         # API and external services
├── store/            # Zustand state management
├── styles/           # CSS and styling files
└── types/            # TypeScript type definitions
```

## Architecture and Control Flow

### State Management
- Uses Zustand for global state management
- Main store located in `store/index.ts`
- Manages employee data and grade levels
- Provides actions for CRUD operations

### Data Flow
1. **Employee Management**
   - Employee data stored in Zustand store
   - CRUD operations handled through store actions
   - Form validation using Zod schemas
   - Location data (countries/states) fetched from external API

2. **Grade Level Management**
   - Grade levels stored alongside employee data
   - Simple CRUD operations for grade levels
   - Grade levels can be assigned to employees

### Component Hierarchy
```
App
├── EmployeeList
│   └── EmployeeForm (Modal)
└── GradeLevelManagement
```

### Key Features
1. **Employee Management**
   - Add/Edit/Delete employees
   - Form validation
   - Dynamic location selection (Country/State)
   - Role and department assignment
   - Pagination
   - Sorting and filtering

2. **Grade Level Management**
   - Create/Delete grade levels
   - Assign to employees
   - Simple interface

3. **UI Components**
   - Reusable button components
   - Custom dropdowns
   - Form inputs
   - Loading states
   - Empty states
   - Confirmation modals

### Data Validation
- Uses Zod for schema validation
- Validates employee data:
  - Required fields
  - Email format
  - Phone number format
  - Character limits

### API Integration
- Location data fetched from external API
- Countries and states dynamically loaded
- Error handling for API failures

## Technical Stack
- React 18
- TypeScript 5
- TailwindCSS 4
- Zustand (State Management)
- Zod (Validation)
- Vite 7
- Headless UI
- Hero Icons

## Best Practices Implemented
1. **Component Organization**
   - Reusable UI components
   - Logical component hierarchy
   - Clear separation of concerns

2. **State Management**
   - Centralized store
   - Immutable state updates
   - Type-safe actions

3. **Form Handling**
   - Controlled components
   - Validation feedback
   - Error handling

4. **UI/UX**
   - Responsive design
   - Loading states
   - Error states
   - Empty states
   - Confirmation dialogs

5. **TypeScript**
   - Strong typing
   - Interface definitions
   - Type safety

6. **Code Organization**
   - Clear file structure
   - Modular components
   - Separation of concerns
   - Reusable hooks and utilities

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.
