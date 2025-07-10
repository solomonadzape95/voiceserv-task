# Employee Management System

## Overview
A modern React application for managing employees and grade levels within an organization. Built with React, TypeScript, TailwindCSS, and Zustand for state management.

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
- React
- TypeScript
- TailwindCSS
- Zustand (State Management)
- Zod (Validation)
- Vite (Build Tool)

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
