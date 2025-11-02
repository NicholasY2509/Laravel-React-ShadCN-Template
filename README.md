# Laravel + React + Inertia Boilerplate with shadCN UI

A modern full-stack starter template featuring Laravel backend with React frontend powered by Inertia.js and styled with shadCN UI components.

## 🚀 Features

- **Backend**: Laravel 12 with Fortify for authentication
- **Frontend**: React 19 with TypeScript and JSX
- **UI Framework**: shadCN UI components built on Radix UI and Tailwind CSS
- **State Management**: Inertia.js for seamless Laravel-React integration
- **Styling**: Tailwind CSS 4 with `tailwindcss-animate`
- **Authentication**: Laravel Fortify with login, registration, password reset
- **Authorization**: Role-Based Access Control (RBAC) with `spatie/laravel-permission`
- **Development Tools**: Vite 7, ESLint, Prettier, TypeScript
- **Server-Side Rendering**: Inertia SSR support

## 📁 Project Structure

```
├── app/                 # Laravel backend
│   ├── Http/Controllers/  # Controllers organized by domain
│   ├── Models/            # Eloquent models
│   └── Providers/         # Service providers
├── resources/js/        # React frontend
│   ├── components/        # Reusable UI components
│   ├── pages/             # Inertia page components
│   ├── layouts/           # Application layouts
│   └── hooks/             # Custom React hooks
├── routes/              # Laravel route definitions
├── database/            # Migrations and seeders
└── tests/               # Feature and unit tests
```

## 🛠️ Getting Started

### Prerequisites

- PHP ^8.2
- Node.js (latest LTS)
- Composer
- SQLite (for development) or MySQL/PostgreSQL

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/laravel-react-template.git
    cd laravel-react-template
    ```

2. Install PHP dependencies:

    ```bash
    composer install
    ```

3. Install Node.js dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. Create SQLite database (or configure your database):

    ```bash
    touch database/database.sqlite
    ```

6. Run migrations:
    ```bash
    php artisan migrate
    ```

### Development

Start the development server with all services:

```bash
npm run dev
```

This command runs concurrently:

- Laravel development server
- Queue worker
- Log viewer
- Vite development server

For Server-Side Rendering (SSR) development:

```bash
npm run dev:ssr
```

### Production Build

Build frontend assets:

```bash
npm run build
```

For SSR builds:

```bash
npm run build:ssr
```

## 🧪 Testing

Run PHP tests with Pest:

```bash
composer test
```

## 🎨 UI Components

This template uses shadCN UI components which are built on:

- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide Icons](https://lucide.dev/) for icons

Components include:

- Buttons, Cards, Dialogs
- Forms with validation
- Navigation menus
- Data tables
- Toast notifications (sonner)
- Command palette (cmdk)

## 🔐 Authentication & Authorization

- **Laravel Fortify** handles authentication flows
- **Spatie Laravel Permission** provides RBAC functionality
- Pre-built controllers for user, role, and permission management
- Two-factor authentication support

## 📦 Key Packages

### Backend

- `inertiajs/inertia-laravel` - Laravel adapter for Inertia.js
- `laravel/fortify` - Authentication backend
- `spatie/laravel-permission` - Role and permission management

### Frontend

- `@inertiajs/react` - React adapter for Inertia.js
- `@radix-ui/react-*` - Accessible UI component primitives
- `tailwindcss` - Utility-first CSS framework
- `react` - v19 with JSX transform
- `vite` - Next generation frontend tooling

## 🔄 Available Scripts

| Script              | Description                                |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Start development server with all services |
| `npm run dev:ssr`   | Start development server with SSR enabled  |
| `npm run build`     | Build production assets                    |
| `npm run build:ssr` | Build production assets with SSR support   |
| `npm run lint`      | Run ESLint with auto-fix                   |
| `npm run format`    | Format code with Prettier                  |
| `composer test`     | Run PHP tests                              |

## 🗺️ Routes

- `/` - Redirects to dashboard
- `/dashboard` - Main dashboard (authenticated)
- `/login`, `/register` - Authentication routes
- `/users`, `/roles`, `/permissions` - Admin resources
- `/settings/profile` - Profile management
- `/settings/password` - Password update
- `/settings/appearance` - Appearance settings

## 🧠 Key Concepts

### Inertia.js

Pages are rendered using Inertia.js which provides a SPA-like experience while maintaining server-side rendering benefits. Pages are located in `resources/js/pages/`.

### Shared Data

Flash messages, errors, and authenticated user data are shared from Laravel to React via Inertia's shared data mechanism.

### Component Organization

UI components are organized by domain in `resources/js/components/`:

- `ui/` - Generic reusable components (buttons, inputs, etc.)
- `users/`, `roles/`, `permissions/` - Domain-specific components

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Laravel](https://laravel.com/)
- [React](https://reactjs.org/)
- [Inertia.js](https://inertiajs.com/)
- [shadCN UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
