# HR Workflow Designer

A complete, implemention-ready HR Workflow Designer prototype built for the Tredence Analytics case study. This application allows users to design complex HR processes using a drag-and-drop canvas, configure individual steps via dynamic forms, and simulate the workflow execution.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Access the app:**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Architecture Overview

The application is built on a modular, state-driven architecture:

- **State Management**: Uses **Zustand** for a centralized, high-performance store. It manages nodes, edges, selection state, and automation metadata. This provides a predictable data flow without the boilerplate of Redux.
- **Canvas Engine**: Powered by **React Flow (@xyflow/react)**. Custom node components (`StartNode`, `TaskNode`, etc.) are mapped to custom React components that handle their own rendering but share a common `NodeWrapper` for visual consistency.
- **Form System**: Implemented using **React Hook Form** combined with **Zod** for schema validation. The right-side panel dynamically switches forms based on the selected node type, providing type-safe data updates back to the Zustand store.
- **Mock Layer**: **MSW (Mock Service Worker)** intercepts network requests at the browser level, allowing the app to function as if it had a real backend. This enables realistic "Test Workflow" simulations with latency.

## Design Decisions

- **Zustand over Context**: React Flow's performance can degrade with frequent Context updates. Zustand's selector-based subscription ensures only the necessary components re-render when the graph changes.
- **Extensible Node Schema**: Nodes are defined by a discriminated union of types. Adding a new node type only requires adding a new interface to `workflow.ts` and a corresponding form/node component.
- **Graph Validation**: Implemented a multi-step validation engine in `lib/validation.ts`. It uses **Kahn's algorithm** for topological sorting (ensuring steps run in order) and **DFS** for cycle detection to prevent infinite loops in the workflow.
- **Dynamic Action Params**: The `AutomatedStepNode` fetches available actions from a mock API. When an action is selected, the form dynamically generates inputs based on that action's `params` array, demonstrating a truly dynamic integration pattern.

## Features Implemented

- [x] **Drag & Drop**: Palette for adding 5 distinct node types.
- [x] **Dynamic Configuration**: Form validation, date pickers, and dynamic arrays (metadata).
- [x] **Graph Validation**: Cycle detection, single-start enforcement, and connectivity checks.
- [x] **Simulation Engine**: Step-by-step execution timeline with real API mocking.
- [x] **Export**: Download workflow state as JSON.
- [x] **Visual Polish**: Premium UI with Tailwind CSS v4, smooth transitions, and distinct color accents.

## What I'd Add with More Time

1. **Undo/Redo**: Implement a history stack in Zustand to allow multi-step rollbacks.
2. **Auto-Layout**: Integrate **Dagre** to automatically organize nodes for clarity.
3. **Advanced Conditional Logic**: Add "ConditionNodes" with multiple outgoing branches for "IF/ELSE" style workflows.
4. **Persistent Storage**: Save workflows to LocalStorage or a real database (PostgreSQL).

## Known Limitations

- **Browser-only**: MSW requires a modern browser to run the Service Worker.
- **Responsive**: The designer is optimized for desktop (1280px+). Sidebars may be cramped on tablets.
- **Edge cases**: Extremely large graphs (>100 nodes) may require further virtualization tuning in React Flow.
