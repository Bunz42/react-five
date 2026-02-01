Atomic Task Manager
A focused Todo application designed to master the fundamentals of React, specifically one-way data flow and state lifting.

🚀 Key Features
Atomic Task Management: Create and track tasks with specific priority levels.

Category Systems: Organize tasks into custom categories.

The Twist (Linked Deletion): Deleting a category automatically cascades and removes all associated tasks, demonstrating complex state management.

🏗️ Architecture
This project follows a "Thinking in React" approach with a clear component hierarchy:

App: The central "Source of Truth" for tasks and categories.

TaskForm: A controlled component for capturing user input.

TaskList & TaskItem: Dynamic list rendering with custom keys.

CategoryManager & Filter: Tools for managing and viewing the task ecosystem.

🛠️ Core Concepts Explored
useState: Managing the lifecycle of tasks and categories.

Props: Passing data down through the component tree.

State Lifting: Coordinating logic between sibling components like the CategoryManager and TaskList.

Immutability: Handling state updates safely using the spread operator.
