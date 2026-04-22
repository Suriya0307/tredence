import { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Plus, 
  ShieldCheck,
  Zap,
  MessageCircle,
  Code as CodeIcon,
  Cloud,
  Lock,
  Workflow,
  Users,
  Settings as SettingsIcon,
  CheckCircle2,
  ChevronUp
} from 'lucide-react';
import { clsx } from 'clsx';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  status: 'Connected' | 'Disconnected' | 'Syncing';
  accent: string;
}

const INTEGRATIONS: Integration[] = [
  { id: 'slack', name: 'Slack', description: 'Automate notifications and approval triggers.', icon: <MessageCircle size={20} />, category: 'Communication', status: 'Connected', accent: 'bg-[#4A154B]' },
  { id: 'google', name: 'Google Workspace', description: 'Sync calendars and employee documents.', icon: <Cloud size={20} />, category: 'Productivity', status: 'Syncing', accent: 'bg-[#4285F4]' },
  { id: 'okta', name: 'Okta', description: 'Enterprise identity and SSO provisioning.', icon: <Lock size={20} />, category: 'Identity', status: 'Disconnected', accent: 'bg-[#1D2226]' },
  { id: 'bamboo', name: 'BambooHR', description: 'Leading HR software for growing businesses.', icon: <Users size={20} />, category: 'HRIS', status: 'Connected', accent: 'bg-[#61A60E]' },
  { id: 'lever', name: 'Lever', description: 'Collaborative applicant tracking system.', icon: <Workflow size={20} />, category: 'ATS', status: 'Disconnected', accent: 'bg-[#374151]' },
  { id: 'jira', name: 'Jira Software', description: 'Track development tasks and hiring sprints.', icon: <CodeIcon size={20} />, category: 'Productivity', status: 'Disconnected', accent: 'bg-[#0052CC]' },
];

const AccordionForm = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) return null;
  return (
    <div className="mt-4 pt-4 border-t border-[#FEF08A] space-y-4 animate-in slide-in-from-top-2 duration-300">
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-[#92400E] uppercase tracking-widest ml-1">Client ID</label>
        <input 
          type="text" 
          placeholder="Enter ID..."
          className="w-full px-3 py-2 bg-[#FFFDF0] border border-[#FEF08A] rounded-lg text-xs placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#FDE68A] focus:border-transparent outline-none transition-all"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-[#92400E] uppercase tracking-widest ml-1">API Secret</label>
        <input 
          type="password" 
          placeholder="••••••••••••"
          className="w-full px-3 py-2 bg-[#FFFDF0] border border-[#FEF08A] rounded-lg text-xs placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#FDE68A] focus:border-transparent outline-none transition-all"
        />
      </div>
      <button className="w-full py-2 bg-[#B45309] text-white rounded-lg text-xs font-bold hover:bg-[#78350F] transition-all">
        Save Credentials
      </button>
    </div>
  );
};

export const Integrations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['All', 'Communication', 'Productivity', 'Identity', 'HRIS', 'ATS'];

  const filtered = INTEGRATIONS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex-1 flex overflow-hidden bg-transparent">
      {/* Category Sidebar */}
      <div className="w-[240px] bg-[#FFFFF5] border-r border-[#FEF08A] flex flex-col shrink-0 p-6">
        <div className="mb-8">
          <h2 className="text-[14px] font-semibold text-[#1F2937] mb-1">Marketplace</h2>
          <p className="text-[11px] text-[#92400E] opacity-70">Explore third-party modules</p>
        </div>

        <div className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                "w-full text-left px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all",
                activeCategory === cat 
                  ? "bg-[#FEFCE8] text-[#92400E] border border-[#FEF08A]" 
                  : "text-[#1C1917]/60 hover:text-[#1C1917] hover:bg-[#FDE68A]/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-auto p-4 bg-[#FEFCE8] rounded-xl border border-[#FEF08A]">
           <div className="flex items-center gap-2 mb-2 text-[#92400E]">
              <ShieldCheck size={16} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Secured</span>
           </div>
           <p className="text-[11px] text-[#92400E]/70 leading-relaxed">All integrations use AES-256 encryption for credential storage.</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-8 space-y-8 overflow-y-auto w-full no-scrollbar">
        {/* Featured Banner */}
        <div className="w-full h-[200px] bg-[#B45309] rounded-2xl p-10 flex flex-col justify-center relative overflow-hidden shrink-0 group">
           <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Featured Integration</span>
              <h2 className="text-3xl font-black text-white tracking-tight">Sync Slack Workflows</h2>
              <p className="text-white/80 text-sm max-w-[400px]">Automate your recruitment updates directly to the engineering team channels.</p>
              <div className="pt-4">
                <button className="px-6 py-2 bg-white text-[#B45309] rounded-lg text-xs font-bold hover:bg-[#FEFCE8] transition-all">Get Started</button>
              </div>
           </div>
           <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-all duration-700">
              <MessageCircle size={180} className="text-white rotate-12" />
           </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 sticky top-0 bg-transparent z-10">
           <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
              <input 
                type="text" 
                placeholder="Search integrations..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FFFDE7] border border-[#FEF08A] rounded-lg text-[13px] focus:ring-2 focus:ring-[#FDE68A] focus:border-transparent outline-none shadow-sm transition-all"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
           </div>
           <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#FEF08A] rounded-lg text-[13px] font-medium text-[#1C1917] hover:bg-[#FFFDF0] shadow-sm transition-all">
              <ExternalLink size={16} /> Requests
           </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
          {filtered.map(app => (
            <div key={app.id} className="bg-white border border-[#FDE68A] rounded-2xl shadow-[0_1px_4px_rgba(253,230,138,0.1)] p-6 flex flex-col hover:shadow-lg transition-all group border-l-[4px]">
               <div className="flex items-start justify-between mb-4">
                  <div className={clsx("p-3 rounded-xl text-white shadow-lg", app.accent)}>
                    {app.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    {app.status === 'Connected' && (
                      <span className="bg-[#D1FAE5] text-[#065F46] px-2.5 py-1 rounded-[99px] text-[10px] font-bold uppercase flex items-center gap-1">
                        <CheckCircle2 size={10} /> Active
                      </span>
                    )}
                    {app.status === 'Syncing' && (
                      <span className="bg-[#FEF3C7] text-[#92400E] px-2.5 py-1 rounded-[99px] text-[10px] font-bold uppercase flex items-center gap-1">
                        <Zap size={10} className="animate-pulse" /> Syncing
                      </span>
                    )}
                  </div>
               </div>
               
               <h3 className="text-[15px] font-bold text-[#1F2937]">{app.name}</h3>
               <p className="text-[12px] text-[#1C1917]/60 mt-1 mb-6 leading-relaxed flex-1">{app.description}</p>
               
               <div className="flex items-center gap-2">
                  {app.status === 'Disconnected' ? (
                    <button 
                      onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                      className="flex-1 py-2.5 bg-[#B45309] text-white rounded-lg text-xs font-bold hover:bg-[#78350F] transition-all flex items-center justify-center gap-2"
                    >
                      {expandedId === app.id ? <ChevronUp size={14} /> : <Plus size={14} />} 
                      {expandedId === app.id ? 'Close' : 'Connect'}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 w-full">
                       <button className="flex-1 py-2.5 bg-white border border-[#FEF08A] text-[#92400E] rounded-lg text-xs font-bold hover:bg-[#FEFCE8] transition-all flex items-center justify-center gap-2">
                          <SettingsIcon size={14} /> Settings
                       </button>
                       <button className="p-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[6B7280] hover:text-[#F43F5E] transition-all">
                          <ExternalLink size={14} />
                       </button>
                    </div>
                  )}
               </div>

               <AccordionForm isOpen={expandedId === app.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
