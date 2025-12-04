# Project Manager Frontend

A modern, responsive web application built with **Angular 18** and **Angular Material**. This is the client-side interface for the Project Manager system, allowing users to collaborate on projects, track tasks, and manage teams efficiently.

It is designed to consume the **Spring Boot Backend**, handling authentication via **HttpOnly Cookies**.

## 🚀 Key Features

* **Authentication & Security:**
    * Secure Login and Registration forms.
    * Automatic session management using HTTP-only cookies (JWT).
    * Route guards to protect authenticated views.
* **Project Dashboard:**
    * View all projects the user belongs to.
    * Create new projects and invite members by username or email.
    * Manage incoming project invitations (Accept/Decline).
* **Task Management:**
    * Create, edit, and delete tasks within projects.
    * Filter tasks by status (Not Started, In Progress, Done).
    * Assign tasks to team members.
    * Set priorities and due dates.
* **Collaboration:**
    * Real-time-like updates for task comments.
    * Team member management (Admins can remove members).

## 🛠️ Tech Stack

* **Framework:** [Angular 18](https://angular.dev/)
* **UI Library:** [Angular Material](https://material.angular.io/)
* **Styling:** SCSS (Optional, depending on your setup)
* **State/Data Management:** RxJS (Observables, Signals)
* **HTTP Client:** Angular HttpClient (configured for credentials/cookies)

## 📋 Prerequisites

Before running this project, ensure you have:

* **Node.js** (v18.13.0 or higher recommended for Angular 18)
* **npm** (Node Package Manager)
* **Angular CLI:** Install globally via `npm install -g @angular/cli`

## ⚡ Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/armandorgr/Project-manager-front
    cd Project-manager-front
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    ng serve
    ```

4.  **Open in Browser:**
    Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## ⚙️ Configuration

To connect this frontend to your local backend, ensure the API URL is configured correctly.

1.  Open `src/environments/environment.ts` (or `environment.development.ts`).
2.  Set the `apiUrl` to match your Spring Boot server (usually port 8080):

    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:8080/api'
    };
    ```

> **Note:** Since the backend uses **HttpOnly Cookies**, ensure your HTTP interceptor or service in Angular includes `{ withCredentials: true }` in requests to allow the browser to send/receive cookies.

## 📦 Build for Production

Run the build command to generate the static files for deployment:

```bash
ng build