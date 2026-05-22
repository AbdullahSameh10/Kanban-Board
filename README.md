# 📋 Kanban Board

A modern **Kanban Board** application built with **React** and **Vite**, featuring drag-and-drop task management using **dnd-kit**.  
This project allows users to organize tasks visually across multiple columns, edit boards, and reorder tasks seamlessly.

---

## 🚀 Features

- 🧩 Create, edit, and delete boards
- 📂 Add, edit, and remove columns
- 📝 Add and manage task cards
- 🔀 Drag & drop tasks within the same column
- ⚡ Fast and lightweight setup using Vite
- 🎨 Clean and responsive UI
- 🧠 Immutable state management with Immer

---

## 🛠️ Tech Stack

- **React**
- **Vite**
- **JavaScript (ES6+)**
- **Tailwind CSS**
- **dnd-kit**
- **Immer**

---

## 📦 Installation

Make sure you have **Node.js (v16+)** installed.

### 1️⃣ Clone the repository
```bash
git clone https://github.com/AbdullahSameh10/Kanban-Board.git
```

### 2️⃣ Navigate to the project folder
```bash
cd Kanban-Board
```

### 3️⃣ Install dependencies
```bash
npm install
```
or
```bash
pnpm install
```

### 4️⃣ Run the development server
```bash
npm run dev
```
or
The app will be available at:
```bash
http://localhost:3000
```

---

## 🧠 How Drag & Drop Works

- Each task has a unique ID
- Tasks are wrapped in SortableContext
- DndContext handles drag events
- Task order updates using arrayMove
- State updates are handled immutably with Immer

---

## 🧪 Usage

- Click Edit Board from the header to update board details
- Drag tasks to reorder them inside the same column
- Click + New Column to add a column
- Tasks and columns update instantly in the UI

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
```bash
git checkout -b feature/your-feature
```
3. Commit your changes
```bash
git commit -m "Add your feature"
```
4. Push to your branch
```bash
git push origin feature/your-feature
```
5. Open a Pull Request

---

## ⭐ Acknowledgments

- Inspired by classic Kanban workflow systems
- Built as a learning-focused React project

---

## 📬 Contact

If you have feedback, ideas, or issues — feel free to open an issue or reach out!

---

## 🌟 Support

If you like this project, give it a star ⭐

It helps a lot!

---

Happy coding 🚀
