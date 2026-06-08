// Feature: Kanban Board
// Manages study task cards across columns (To Do / In Progress / Done)
// with drag-and-drop via Framer Motion.
//
// Slice structure:
//   kanban/
//   ├── components/   — Board, Column, TaskCard, AddTaskModal
//   ├── hooks/        — useBoard.ts, useDragDrop.ts
//   ├── api/          — kanban.api.ts
//   └── types/        — kanban.types.ts (Task, Column, Board)
