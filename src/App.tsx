import { useState, useEffect } from 'react';
import { WorkflowCanvas } from './components/canvas/WorkflowCanvas';
import { NodePalette } from './components/sidebar/NodePalette';
import { NodeFormPanel } from './components/forms/NodeFormPanel';
import { SimulationPanel } from './components/sandbox/SimulationPanel';
import { useWorkflowStore } from './store/workflowStore';
import { DashboardView, ComplianceView, SchedulerView, AnalyticsView, IntegrationsView, RepositoryView, SettingsView } from './components/sidebar/DashboardViews';

function App() {
  const [isSimulating, setIsSimulating] = useState(false);
  const { setAutomations, currentView } = useWorkflowStore();

  useEffect(() => {
    // Fetch automations on mount
    fetch('/api/automations')
      .then((res) => res.json())
      .then((data) => setAutomations(data))
      .catch((err) => console.error('Failed to fetch automations', err));
  }, [setAutomations]);

  useEffect(() => {
    // Listen for custom event to open simulator
    const handleOpenSimulator = () => setIsSimulating(true);
    
    const interval = setInterval(() => {
      const btn = document.getElementById('test-workflow-btn');
      if (btn) {
        btn.onclick = handleOpenSimulator;
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentView]);

  const renderBreadcrumb = () => (
    <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 mb-1">
      <span>HR Workflow</span>
      <span>/</span>
      <span className="text-indigo-500 font-bold">{currentView}</span>
    </div>
  );

  const renderTopActions = () => {
    if (currentView === 'Workflows') return null;
    return (
      <button className="bg-[#B45309] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#78350F] transition-colors">
        + New {currentView === 'Settings' ? 'Update' : currentView.slice(0, -1)}
      </button>
    );
  };

  const isWorkflows = currentView === 'Workflows';

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FFFDF0] text-[#1F2937] font-sans">
      {/* Sidebar Navigation - Midnight Vault */}
      <NodePalette />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Only show the header breadcrumb for NON-workflow views.
            For Workflows, the canvas has its own toolbar — no header overlay needed. */}
        {!isWorkflows && (
          <header className="px-8 py-4 flex items-center justify-between shrink-0">
            <div>{renderBreadcrumb()}</div>
            <div>{renderTopActions()}</div>
          </header>
        )}

        {/* Content area — must fill remaining height */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {isWorkflows ? (
            <main className="flex-1 relative flex overflow-hidden h-full">
              <WorkflowCanvas />
              <NodeFormPanel />
            </main>
          ) : (
            <>
              {currentView === 'Dashboard' && <DashboardView />}
              {currentView === 'Compliance' && <ComplianceView />}
              {currentView === 'Scheduler' && <SchedulerView />}
              {currentView === 'Analytics' && <AnalyticsView />}
              {currentView === 'Integrations' && <IntegrationsView />}
              {currentView === 'Repository' && <RepositoryView />}
              {currentView === 'Settings' && <SettingsView />}
            </>
          )}
        </div>
      </div>

      {/* Simulation Overlay */}
      <SimulationPanel 
        isOpen={isSimulating} 
        onClose={() => setIsSimulating(false)} 
      />
    </div>
  );
}

export default App;
