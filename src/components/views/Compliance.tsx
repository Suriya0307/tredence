import { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter,
  X, 
  AlertCircle, 
  Clock,
  User,
  Paperclip,
  Check,
  ChevronDown
} from 'lucide-react';
import { clsx } from 'clsx';

interface ComplianceItem {
  id: string;
  name: string;
  category: 'Labor Law' | 'Data Privacy' | 'Safety' | 'HR Policy';
  dueDate: string;
  status: 'Compliant' | 'Overdue' | 'Pending';
  owner: string;
  details: string;
  lastReviewed: string;
  attachments: string[];
}

const INITIAL_ITEMS: ComplianceItem[] = [
  { 
    id: '1', 
    name: 'Sexual Harassment Prevention', 
    category: 'Labor Law', 
    dueDate: '2026-10-15', 
    status: 'Pending', 
    owner: 'Sarah Chen',
    details: 'Annual mandatory training for all staff members including remote contractors.',
    lastReviewed: '2025-10-15',
    attachments: ['guidelines.pdf', 'attendance_sheet.xlsx']
  },
  { 
    id: '2', 
    name: 'GDPR Data Processing Agreement', 
    category: 'Data Privacy', 
    dueDate: '2026-04-10', 
    status: 'Overdue', 
    owner: 'Alex Rivera',
    details: 'Quarterly audit of data sub-processors and privacy impact assessments required by EU regulations.',
    lastReviewed: '2026-01-10',
    attachments: ['dpa_template.docx', 'vendor_list.pdf']
  },
  { 
    id: '3', 
    name: 'Workplace Safety Audit Q3', 
    category: 'Safety', 
    dueDate: '2026-08-01', 
    status: 'Compliant', 
    owner: 'Maria Garcia',
    details: 'On-site inspection of fire safety equipment and emergency exits for the San Francisco office.',
    lastReviewed: '2026-04-01',
    attachments: ['safety_report_q1.pdf']
  },
  { 
    id: '4', 
    name: 'Remote Work Provision Update', 
    category: 'HR Policy', 
    dueDate: '2026-11-25', 
    status: 'Pending', 
    owner: 'Sarah Chen',
    details: 'Updating reimbursement guidelines for home office equipment.',
    lastReviewed: '2025-11-25',
    attachments: []
  },
];

const ScoreRing = ({ score }: { score: number }) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90">
        <circle 
          cx="72" cy="72" r={radius} 
          className="fill-none stroke-[#EEF2FF]" 
          strokeWidth="10" 
        />
        <circle 
          cx="72" cy="72" r={radius} 
          className="fill-none stroke-[#B45309] transition-all duration-1000 ease-out" 
          strokeWidth="10" 
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[28px] font-semibold text-[#111827] leading-none">{score}%</span>
        <span className="text-[11px] font-medium text-[#9CA3AF] uppercase mt-1 tracking-wider">Score</span>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Compliant': 'bg-[#D1FAE5] text-[#065F46]',
    'Overdue': 'bg-[#FFE4E6] text-[#9F1239]',
    'Pending': 'bg-[#FEF3C7] text-[#92400E]',
  };
  
  const currentStyle = styles[status] || 'bg-[#F3F4F6] text-[#4B5563]';

  return (
    <span className={clsx("px-2.5 py-1 rounded-[99px] text-[11px] font-medium tracking-wide", currentStyle)}>
      {status}
    </span>
  );
};

export const Compliance = () => {
  const [items] = useState<ComplianceItem[]>(INITIAL_ITEMS);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Labor Law', 'Data Privacy']);
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const categories = ['Labor Law', 'Data Privacy', 'Safety', 'HR Policy'] as const;
  const overdueCount = items.filter(i => i.status === 'Overdue').length;

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-transparent">
      {/* Left Panel: Stats */}
      <div className="w-full lg:w-[320px] bg-[#FFFFF5] border-r border-[#FEF08A] p-8 flex flex-col gap-10 shrink-0 overflow-y-auto">
        <div className="space-y-5">
          <div>
            <h2 className="text-[13px] font-medium text-[#374151] tracking-[0.01em]">Compliance Health</h2>
            <p className="text-[11px] text-[#9CA3AF] mt-1">Overall readiness score</p>
          </div>
          <div className="flex justify-center py-4">
            <ScoreRing score={82} />
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider">Health by Category</h3>
          <div className="space-y-4">
            {[
              { l: 'Regulatory', v: 92, c: 'bg-[#10B981]' },
              { l: 'Occupational', v: 85, c: '#B45309' },
              { l: 'Internal', v: 64, c: 'bg-[#F59E0B]' },
            ].map(item => (
              <div key={item.l} className="space-y-2">
                <div className="flex items-center justify-between text-[12px] font-medium">
                  <span className="text-[#6B7280]">{item.l}</span>
                  <span className="text-[#374151]">{item.v}%</span>
                </div>
                <div className="h-2 w-full bg-[#FEFCE8] rounded-full overflow-hidden border border-[#FEF08A]">
                  <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${item.v}%`, backgroundColor: item.c }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-[#E0E7FF]">
           <div className="p-4 bg-[#FEFCE8] border border-[#FEF08A] rounded-[12px]">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={16} className="text-[#B45309]" />
                <h4 className="text-[13px] font-medium text-[#374151]">Audit Ready</h4>
              </div>
              <p className="text-[12px] text-[#6B7280] leading-relaxed">Reporting is up-to-date for Q3. Next scheduled audit in 14 days.</p>
           </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent relative">
        {/* Warning Banner */}
        {overdueCount > 0 && (
          <div className="bg-[#FFE4E6] border-b border-[#FECDD3] px-8 py-3 flex items-center gap-3">
            <AlertCircle size={16} className="text-[#9F1239]" />
            <span className="text-[13px] font-medium text-[#9F1239]">Warning: {overdueCount} global policies are currently overdue. Immediate action required.</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto w-full p-8 space-y-8">
          {/* Toolbar inside content area to match Airy Blueprint */}
          <div className="bg-white p-4 rounded-[12px] border border-[#FDE68A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] flex items-center justify-between gap-4 border-l-[4px]">
             <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                <input 
                  type="text" 
                  placeholder="Search policies..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FFFDE7] border border-[#FEF08A] rounded-[8px] text-[13px] text-[#1F2937] focus:ring-2 focus:ring-[#FDE68A] focus:border-transparent outline-none transition-all placeholder-[#9CA3AF]"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
             </div>
             <div className="flex items-center gap-3">
               <div className="px-4 py-2 text-[13px] font-medium text-[#374151] border border-[#D1D5DB] rounded-[8px] bg-white flex items-center gap-2 cursor-pointer hover:bg-[#F9FAFB]">
                  <span>Status: All</span> <ChevronDown size={14} className="text-[#9CA3AF]" />
               </div>
               <div className="px-4 py-2 text-[13px] font-medium text-[#374151] border border-[#D1D5DB] rounded-[8px] bg-white flex items-center gap-2 cursor-pointer hover:bg-[#F9FAFB]">
                  <Filter size={14} className="text-[#6B7280]" /> <span>More Filters</span>
               </div>
             </div>
          </div>

          {/* Grouped List */}
          <div className="space-y-6 pb-10">
            {categories.map(cat => {
              const catItems = items.filter(i => i.category === cat && i.name.toLowerCase().includes(searchTerm.toLowerCase()));
              if (catItems.length === 0) return null;
              const isExpanded = expandedCategories.includes(cat);

              return (
                <div key={cat} className="space-y-3">
                  <button 
                    onClick={() => toggleCategory(cat)}
                    className="flex items-center gap-2 text-[12px] font-medium text-[#6B7280] uppercase tracking-wider hover:text-[#374151] transition-colors"
                  >
                    <ChevronDown size={16} className={clsx("transition-transform text-[#9CA3AF]", !isExpanded && "-rotate-90")} />
                    {cat} <span className="bg-[#FEF08A] text-[#92400E] px-1.5 py-0.5 rounded text-[10px] ml-1">{catItems.length}</span>
                  </button>
                  
                  {isExpanded && (
                    <div className="bg-white rounded-[12px] border border-[#FDE68A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] overflow-hidden border-l-[4px]">
                      {catItems.map((item, idx) => (
                        <div 
                          key={item.id} 
                          className={clsx(
                            "p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors cursor-pointer border-b border-[#E8E4FF] last:border-b-0",
                            idx % 2 === 0 ? "bg-white" : "bg-[#FFFDF0]",
                            "hover:bg-[#FEF9C3] group"
                          )}
                          onClick={() => setSelectedItem(item)}
                        >
                          <div className="flex-1 min-w-0 pr-8">
                            <div className="flex items-center gap-3 mb-1">
                               <h4 className="text-[14px] font-medium text-[#1F2937]">{item.name}</h4>
                               <StatusBadge status={item.status} />
                            </div>
                            <div className="flex items-center gap-5 mt-2">
                               <div className="flex items-center gap-1.5 text-[12px] text-[#6B7280]">
                                  <User size={14} className="text-[#9CA3AF]" /> {item.owner}
                               </div>
                               <div className="flex items-center gap-1.5 text-[12px] text-[#6B7280]">
                                  <Clock size={14} className={item.status === 'Overdue' ? "text-[#F43F5E]" : "text-[#9CA3AF]"} /> 
                                  <span className={item.status === 'Overdue' ? "text-[#F43F5E] font-medium" : ""}>Due: {item.dueDate}</span>
                               </div>
                            </div>
                          </div>
                          <button className="md:opacity-0 group-hover:opacity-100 px-4 py-2 bg-white border border-[#FEF08A] text-[#92400E] rounded-[8px] text-[12px] font-medium transition-all hover:bg-[#FEFCE8]">
                             View Details
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Drawer: Review */}
        {selectedItem && (
          <div 
            className="absolute inset-0 z-50 flex justify-end overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#1F2937]/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedItem(null)} />
            <div 
              className="relative w-full max-w-[480px] h-full bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.05)] flex flex-col animate-in slide-in-from-right duration-300 border-l border-[#E0E7FF]"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 border-b border-[#FEF08A] flex items-start justify-between bg-[#FFFDF0]">
                <div>
                  <span className="text-[11px] font-medium text-[#B45309] uppercase tracking-wider">{selectedItem.category}</span>
                  <h3 className="text-[20px] font-semibold text-[#1F2937] mt-1 mb-3">{selectedItem.name}</h3>
                  <StatusBadge status={selectedItem.status} />
                </div>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-[#EEF2FF] rounded-lg text-[#9CA3AF] hover:text-[#6366F1] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white text-[#374151]">
                <section>
                   <h4 className="text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider mb-2">Policy Summary</h4>
                   <p className="text-[14px] text-[#4B5563] leading-relaxed bg-[#FFFDF0] p-4 rounded-[8px] border border-[#FEF08A]">
                     {selectedItem.details}
                   </p>
                </section>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-[#FFFDF0] p-4 border border-[#FEF08A] rounded-[8px]">
                      <p className="text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider mb-1">Last Reviewed</p>
                      <p className="text-[14px] font-medium text-[#1F2937]">{selectedItem.lastReviewed}</p>
                   </div>
                   <div className="bg-[#FFFDF0] p-4 border border-[#FEF08A] rounded-[8px]">
                      <p className="text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider mb-1">Owner</p>
                      <p className="text-[14px] font-medium text-[#1F2937]">{selectedItem.owner}</p>
                   </div>
                </div>

                <section>
                   <div className="flex items-center justify-between mb-3">
                     <h4 className="text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider">Documentation</h4>
                     <span className="text-[12px] font-medium text-[#6366F1]">{selectedItem.attachments.length} files</span>
                   </div>
                   <div className="space-y-2">
                     {selectedItem.attachments.length > 0 ? selectedItem.attachments.map(file => (
                       <div key={file} className="flex items-center gap-3 p-3 border border-[#E0E7FF] bg-white rounded-[8px] hover:border-[#C7D2FE] hover:shadow-[0_1px_4px_rgba(99,102,241,0.07)] transition-all group cursor-pointer">
                          <div className="p-2 bg-[#EEF2FF] rounded-md text-[#6366F1] group-hover:bg-[#6366F1] group-hover:text-white transition-colors">
                            <Paperclip size={14} />
                          </div>
                          <span className="text-[13px] font-medium text-[#4B5563] group-hover:text-[#1F2937]">{file}</span>
                       </div>
                     )) : (
                       <p className="text-[13px] text-[#9CA3AF] bg-[#F9FAFB] p-4 rounded-[8px] border border-dashed border-[#D1D5DB] text-center">No attachments found.</p>
                     )}
                   </div>
                </section>
              </div>

              <div className="p-6 border-t border-[#FEF08A] bg-[#FFFDF0] flex flex-col gap-3">
                <button className="w-full py-3 bg-[#B45309] text-white rounded-[8px] text-[14px] font-medium hover:bg-[#78350F] transition-colors flex items-center justify-center gap-2">
                  <Check size={18} /> Approve Documentation
                </button>
                <button className="w-full py-3 bg-white border border-[#FEF08A] text-[#92400E] rounded-[8px] text-[14px] font-medium hover:bg-[#FEFCE8] transition-colors">
                  Request Revision
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
