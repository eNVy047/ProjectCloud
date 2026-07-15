# ProjectCloud 🚀

Project Cloud is a modern, open-source collaborative platform that bridges the gap between students and educational institutions. It facilitates seamless project sharing, workshop discovery, and concurrent live-session management.

---

## 🌟 Key Features

*   **Project Showcase**: Students can easily upload, document, and share their academic or personal projects.
*   **Event & Workshop Hub**: Educational institutes can post seminars, workshops, bootcamps, and guest lectures.
*   **Live Session Integration**: Engage in workshops concurrently with real-time interactive stream status, concurrent task lists, and live chat.
*   **Interactive Chatbot Support**: Embedded support chat widget to assist new users in real-time.
*   **Aesthetic & Modern UI**: Built with responsive layouts, curated dark mode styling, and smooth animations using Framer Motion.
*   **Open Access**: Explore projects and workshop information freely without requiring a prior user account.

---

## 🛠️ Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Database & Auth**: [Supabase](https://supabase.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 🚀 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v20 or higher recommended)
*   [npm](https://www.npmjs.com/) or another preferred package manager

### Local Installation & Setup

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/eNVy047/ProjectCloud.git
    cd ProjectCloud
    ```

2.  **Install Dependencies**:
    ```bash
    npm ci
    ```

3.  **Environment Configuration**:
    Create a `.env.local` file in the root directory and configure your Supabase project parameters:
    ```env
    NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
    NEXT_SUPABASE_ANON_KEY="your-supabase-anon-key"
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🐳 Run using Docker

To containerize and run the application in a clean, reproducible production-like environment:

1.  **Build the Docker Image**:
    ```bash
    docker build -t project-cloud .
    ```

2.  **Run the Container**:
    ```bash
    docker run -p 3000:3000 --env-file .env.local project-cloud
    ```

---

## 🤝 Contributing

We welcome contributions! Special thanks to the main contributors:

*   **Narayan Verma**
*   **Ayush Kukrety**
*   **Rohit Maurya**
*   **Utkarsh Singh Parihar**

---

Happy coding! 💻✨
