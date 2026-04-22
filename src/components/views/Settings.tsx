import { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Trash2, 
  Camera, 
  Mail, 
  Globe, 
  ChevronRight,
  MoreVertical,
  AlertTriangle,
  Smartphone,
  Lock,
  Users
} from 'lucide-react';
import { clsx } from 'clsx';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notifications, setNotifications] = useState({
    newHire: true,
    complianceAlert: true,
    approvalRequest: true,
    integrationError: false,
    weeklyReport: true
  });

  const team = [
    { name: 'Sarah Chen', email: 'sarah@codeauto.ai', role: 'Admin', avatar: 'SC' },
    { name: 'Michael Scott', email: 'm.scott@codeauto.ai', role: 'Manager', avatar: 'MS' },
    { name: 'Alex Rivera', email: 'alex.r@codeauto.ai', role: 'Viewer', avatar: 'AR' },
  ];

  const TABS = [
    { id: 'Profile', icon: <User size={18}/> },
    { id: 'Notifications', icon: <Bell size={18}/> },
    { id: 'Team & Permissions', icon: <Shield size={18}/> },
    { id: 'Security', icon: <Lock size={18}/> },
    { id: 'Danger Zone', icon: <Trash2 size={18}/> },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-transparent p-8 lg:p-12 space-y-12">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Navigation Tabs */}
        <div className="w-full lg:w-64 shrink-0 space-y-1.5">
          <div className="mb-6 px-4">
             <h2 className="text-[14px] font-semibold text-[#1F2937]">Configuration</h2>
             <p className="text-[11px] text-[#92400E] opacity-70 mt-1">Manage your workspace</p>
          </div>
          {TABS.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-5 py-3 rounded-xl text-[13px] font-medium transition-all group",
                activeTab === tab.id 
                  ? "bg-[#FEFCE8] text-[#92400E] border border-[#FEF08A] shadow-sm" 
                  : "text-[#1C1917]/60 hover:text-[#1C1917] hover:bg-[#FDE68A]/20"
              )}
            >
              <span className={clsx("transition-colors", activeTab === tab.id ? "text-[#92400E]" : "text-[#1C1917]/40")}>
                {tab.icon}
              </span>
              {tab.id}
              {activeTab === tab.id && <ChevronRight size={14} className="ml-auto text-[#C7D2FE]" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 animate-in fade-in duration-500 pb-20">
            {activeTab === 'Profile' && (
             <div className="space-y-8">
                <div className="bg-white p-10 rounded-2xl border border-[#FDE68A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] relative border-l-[4px]">
                   <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
                      <div className="relative group">
                         <div className="w-32 h-32 rounded-3xl bg-[#FEFCE8] border-2 border-[#FEF08A] flex items-center justify-center text-4xl font-black text-[#92400E] shadow-xl shadow-amber-100/50">
                            SC
                         </div>
                         <button className="absolute -bottom-2 -right-2 p-3 bg-white border border-[#FEF08A] rounded-2xl shadow-lg text-[#92400E]/60 hover:text-[#92400E] transition-all hover:scale-110 active:scale-95 group-hover:shadow-amber-100">
                            <Camera size={20}/>
                         </button>
                      </div>
                      <div className="text-center md:text-left">
                         <h3 className="text-2xl font-semibold text-[#111827] tracking-tight">Sarah Chen</h3>
                         <p className="text-[#92400E] font-bold text-[11px] uppercase tracking-widest mt-1">HR Director / Global Administrator</p>
                         <div className="flex flex-wrap justify-center md:justify-start gap-5 mt-4 text-[#6B7280]">
                            <div className="flex items-center gap-1.5 text-[11px] font-medium"><Globe size={14} className="opacity-50"/> San Francisco, CA</div>
                            <div className="flex items-center gap-1.5 text-[11px] font-medium"><Smartphone size={14} className="opacity-50"/> +1 (555) 012-3456</div>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { label: 'Full Name', val: 'Sarah Chen', icon: <User size={16}/> },
                        { label: 'Work Email', val: 'sarah@codeauto.ai', icon: <Mail size={16}/> },
                        { label: 'Department', val: 'Human Resources', icon: <Users size={16}/> },
                        { label: 'Employee ID', val: 'CA-HR-001', icon: <Shield size={16}/> },
                      ].map(f => (
                         <div key={f.label} className="space-y-2">
                            <label className="text-[10px] font-bold text-[#92400E] uppercase tracking-widest ml-1">{f.label}</label>
                            <div className="relative">
                               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92400E]/40">{f.icon}</div>
                               <input type="text" defaultValue={f.val} className="w-full pl-12 pr-4 py-3.5 bg-[#FFFDF0] border border-[#FEF08A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDE68A] focus:border-transparent font-medium text-[#1F2937] transition-all placeholder-[#9CA3AF]" />
                            </div>
                        </div>
                      ))}
                   </div>

                   <div className="mt-12 flex justify-end">
                      <button className="px-10 py-3.5 bg-[#B45309] text-white rounded-xl font-bold text-sm shadow-lg shadow-amber-100 hover:bg-[#78350F] transition-all">
                         Update Profile
                      </button>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'Notifications' && (
             <div className="space-y-4">
                <div className="bg-white p-8 rounded-2xl border border-[#FDE68A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] mb-4 border-l-[4px]">
                   <h3 className="text-base font-semibold text-[#1F2937]">System Notifications</h3>
                   <p className="text-[11px] text-[#92400E] opacity-70 mt-1">Manage global alert preferences</p>
                </div>
                <div className="space-y-3">
                   {[
                      { id: 'newHire', label: 'New Hire Onboarding', desc: 'Alert when a new employee starts the automation flow.' },
                      { id: 'complianceAlert', label: 'Compliance Expiry Alerts', desc: 'Urgent notifications when policies are overdue.' },
                      { id: 'approvalRequest', label: 'Pending Approvals', desc: 'Direct alerts for workflow tasks requiring your sign-off.' },
                      { id: 'integrationError', label: 'Integration Sync Errors', desc: 'Notify me immediately if an API connection fails.' },
                      { id: 'weeklyReport', label: 'Weekly HR Summary', desc: 'Receive a consolidated summary report every Monday.' }
                   ].map(item => (
                      <div key={item.id} className="flex items-center justify-between p-6 bg-white border border-[#FDE68A] rounded-2xl hover:bg-[#FEF9C3] transition-all group border-l-[4px]">
                         <div className="flex-1 min-w-0 mr-6">
                            <h4 className="font-bold text-[#1F2937] text-sm tracking-tight">{item.label}</h4>
                            <p className="text-[11px] text-[#6B7280] mt-1">{item.desc}</p>
                         </div>
                         <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={notifications[item.id as keyof typeof notifications]}
                              onChange={() => setNotifications({...notifications, [item.id]: !notifications[item.id as keyof typeof notifications]})}
                            />
                            <div className="w-11 h-6 bg-[#D1D5DB] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B45309]"></div>
                         </label>
                      </div>
                   ))}
                </div>
             </div>
           )}

           {activeTab === 'Team & Permissions' && (
             <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl border border-[#FDE68A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] flex items-center justify-between border-l-[4px]">
                   <div>
                      <h3 className="text-base font-semibold text-[#1F2937]">Workspace Seats</h3>
                      <p className="text-[11px] text-[#92400E] mt-1 uppercase font-bold tracking-widest">3 / 10 Active</p>
                   </div>
                   <button className="px-5 py-2.5 bg-[#1F2937] text-white rounded-lg text-[12px] font-bold hover:bg-black transition-all">
                     Invite Member
                   </button>
                </div>
                
                <div className="bg-white border border-[#FDE68A] rounded-2xl overflow-hidden shadow-[0_1px_4px_rgba(253,230,138,0.1)] border-l-[4px]">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="bg-[#FFFDF0] border-b border-[#FEF08A]">
                            <th className="px-8 py-4 text-[11px] font-bold text-[#92400E] uppercase tracking-wider">Member</th>
                            <th className="px-8 py-4 text-[11px] font-bold text-[#92400E] uppercase tracking-wider">Role</th>
                            <th className="px-8 py-4 text-right"></th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-[#FEF08A]">
                         {team.map(member => (
                           <tr key={member.email} className="hover:bg-[#FEF9C3] transition-colors">
                              <td className="px-8 py-4">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#FEFCE8] flex items-center justify-center text-[11px] font-bold text-[#92400E] border border-[#FEF08A]">
                                       {member.avatar}
                                    </div>
                                    <div className="flex flex-col">
                                       <span className="text-[13px] font-bold text-[#1F2937]">{member.name}</span>
                                       <span className="text-[11px] text-[#9CA3AF]">{member.email}</span>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-8 py-4">
                                 <span className="px-2.5 py-1 bg-[#FEFCE8] text-[#92400E] rounded-lg text-[11px] font-bold border border-[#FEF08A]">
                                    {member.role}
                                 </span>
                              </td>
                              <td className="px-8 py-4 text-right">
                                 <button className="text-[#D1D5DB] hover:text-[#6B7280] transition-colors">
                                    <MoreVertical size={18}/>
                                 </button>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
           )}

           {activeTab === 'Danger Zone' && (
             <div className="space-y-6">
                <div className="bg-white p-12 rounded-[2.5rem] border border-[#FFE4E6] relative overflow-hidden flex flex-col items-center text-center">
                   <div className="w-20 h-20 bg-[#FFE4E6] rounded-3xl flex items-center justify-center text-[#F43F5E] mb-8 border border-[#FECDD3] shadow-xl shadow-rose-100">
                      <AlertTriangle size={40}/>
                   </div>
                   <h3 className="text-2xl font-bold text-[#111827] tracking-tight mb-4">Critical Administration</h3>
                   <p className="text-[#6B7280] text-sm max-w-lg leading-relaxed mb-10">
                      Deactivating this workspace will result in the immediate suspension of all active workflows, 
                      employee data access, and third-party integrations. This action can be reversed by a systems administrator within 30 days.
                   </p>
                   
                   <button 
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="px-10 py-4 bg-[#F43F5E] text-white rounded-xl text-sm font-bold hover:bg-[#E11D48] transition-all shadow-lg shadow-rose-100"
                   >
                      Deactivate System Access
                   </button>
                </div>
             </div>
           )}
        </div>
      </div>

      {/* Delete Modal Placeholder */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#1F2937]/20 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-md rounded-2xl p-10 border border-[#FFE4E6] shadow-2xl animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-[#111827] mb-2 text-center">System Confirmation</h3>
              <p className="text-sm text-[#6B7280] text-center mb-8 leading-relaxed">Please acknowledge that this will affect all 14 active HR automations running in your workspace.</p>
              <div className="flex flex-col gap-3">
                 <button onClick={() => setIsDeleteModalOpen(false)} className="w-full py-3 bg-[#1F2937] text-white rounded-lg text-sm font-bold hover:bg-black transition-all">Cancel Action</button>
                 <button className="w-full py-3 bg-[#FFE4E6] text-[#9F1239] rounded-lg text-sm font-bold hover:bg-[#FEE2E2] transition-all">Confirm Deactivation</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
