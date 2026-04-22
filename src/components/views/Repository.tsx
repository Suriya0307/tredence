import { useState } from 'react';
import { 
  Folder, 
  File, 
  Search, 
  LayoutGrid, 
  List, 
  Plus, 
  ChevronRight, 
  Upload, 
  Download,
  Edit,
  Trash2,
  FileText,
  FileSpreadsheet,
  FileImage,
  Monitor
} from 'lucide-react';
import { clsx } from 'clsx';

interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'jpg' | 'folder';
  size: string;
  lastModified: string;
  owner: string;
}

const FILES: FileItem[] = [
  { id: '1', name: 'Labor Law Guidelines 2026', type: 'pdf', size: '2.4 MB', lastModified: '2 days ago', owner: 'Sarah Chen' },
  { id: '2', name: 'Q3 Onboarding Batch', type: 'xlsx', size: '1.2 MB', lastModified: '5 days ago', owner: 'Alex Rivera' },
  { id: '3', name: 'Employee Handbook v2.0', type: 'docx', size: '4.8 MB', lastModified: '1 week ago', owner: 'Sarah Chen' },
  { id: '4', name: 'HQ Office Floorplan', type: 'jpg', size: '15.2 MB', lastModified: '2 weeks ago', owner: 'Management' },
  { id: '5', name: 'Draft Policies', type: 'folder', size: '--', lastModified: '1 month ago', owner: 'Sarah Chen' },
  { id: '6', name: 'Benefits Overview PDF', type: 'pdf', size: '840 KB', lastModified: '2 days ago', owner: 'Maria Garcia' },
];

const FileIcon = ({ type }: { type: FileItem['type'] }) => {
  switch (type) {
    case 'pdf': return <FileText className="text-[#F43F5E]" size={20} />;
    case 'xlsx': return <FileSpreadsheet className="text-[#10B981]" size={20} />;
    case 'docx': return <FileText className="text-[#B45309]" size={20} />;
    case 'jpg': return <FileImage className="text-[#F59E0B]" size={20} />;
    case 'folder': return <Folder className="text-[#B45309]" size={20} fill="currentColor" fillOpacity="0.1" />;
    default: return <File className="text-[#6B7280]" size={20} />;
  }
};

export const Repository = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('My Files');

  const folders = [
    { name: 'My Files', count: 24, icon: <Monitor size={16} /> },
    { name: 'Onboarding Docs', count: 12, icon: <Folder size={16} /> },
    { name: 'Compliance Vault', count: 8, icon: <Folder size={16} /> },
    { name: 'Financial Records', count: 124, icon: <Folder size={16} /> },
    { name: 'Trash', count: 3, icon: <Trash2 size={16} /> },
  ];

  return (
    <div className="flex-1 flex overflow-hidden bg-transparent">
      {/* Folder Tree Sidebar */}
      <div className="w-[260px] bg-[#FFFFF5] border-r border-[#FEF08A] flex flex-col shrink-0 p-6">
        <div className="mb-8">
           <h2 className="text-[14px] font-semibold text-[#1F2937]">Vault Storage</h2>
           <p className="text-[11px] text-[#9CA3AF] mt-1">Shared workspace repository</p>
        </div>

        <div className="space-y-1">
          {folders.map(f => (
            <button
              key={f.name}
              onClick={() => setSelectedFolder(f.name)}
              className={clsx(
                "w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all group",
                selectedFolder === f.name
                  ? "bg-[#FEFCE8] text-[#92400E] border border-[#FEF08A] shadow-sm"
                  : "text-[#1C1917]/60 hover:text-[#1C1917] hover:bg-[#FDE68A]/20"
              )}
            >
              <div className="flex items-center gap-3">
                 <span className={selectedFolder === f.name ? "text-[#92400E]" : "text-[#1C1917]/40 group-hover:opacity-100"}>{f.icon}</span>
                 {f.name}
              </div>
              <span className="text-[10px] font-bold opacity-40 group-hover:opacity-100">{f.count}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto">
           <div className="bg-[#FFFDF0] border border-[#FEF08A] rounded-xl p-4">
              <div className="flex justify-between text-[10px] font-bold text-[#9CA3AF] uppercase mb-2">
                 <span>Storage Used</span>
                 <span>72%</span>
              </div>
              <div className="w-full bg-[#FEFCE8] h-1.5 rounded-full overflow-hidden border border-[#FEF08A]">
                 <div className="bg-[#92400E] h-full" style={{ width: '72%' }} />
              </div>
              <p className="text-[10px] text-[#6B7280] mt-3">22.4 GB of 100 GB used.</p>
           </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="h-16 px-8 border-b border-[#FEF08A] bg-white flex items-center justify-between shrink-0">
           <div className="flex items-center gap-6 flex-1">
              <div className="relative flex-1 max-w-sm">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search in all folders..."
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FFFDE7] border border-[#FEF08A] rounded-lg text-[13px] text-[#1F2937] focus:ring-2 focus:ring-[#FDE68A] focus:border-transparent outline-none transition-all placeholder-[#9CA3AF]"
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                 />
              </div>
              <div className="h-6 w-px bg-[#FEF08A]" />
              <div className="flex bg-[#FEFCE8] p-1 rounded-lg border border-[#FEF08A]">
                 <button 
                  onClick={() => setViewMode('list')}
                  className={clsx("p-1.5 rounded-md transition-all", viewMode === 'list' ? "bg-white text-[#6366F1] shadow-sm border border-[#E0E7FF]" : "text-[#9CA3AF] hover:text-[#374151]")}
                 >
                    <List size={14} />
                 </button>
                 <button 
                  onClick={() => setViewMode('grid')}
                  className={clsx("p-1.5 rounded-md transition-all", viewMode === 'grid' ? "bg-white text-[#92400E] shadow-sm border border-[#FEF08A]" : "text-[#1C1917]/40 hover:text-[#1C1917]")}
                 >
                    <LayoutGrid size={14} />
                 </button>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
               <button className="px-5 py-2.5 bg-white border border-[#FEF08A] text-[#92400E] rounded-lg text-[13px] font-medium hover:bg-[#FFFDF0] transition-all flex items-center gap-2">
                 <Plus size={16} /> New Folder
              </button>
               <button className="px-5 py-2.5 bg-[#B45309] text-white rounded-lg text-[13px] font-medium hover:bg-[#78350F] transition-all flex items-center gap-2">
                 <Upload size={16} /> Upload Files
              </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto w-full p-8 space-y-8">
           {/* Breadcrumbs */}
           <div className="flex items-center gap-2 text-[12px] font-medium text-[#9CA3AF]">
              <span className="hover:text-[#6366F1] cursor-pointer">{selectedFolder}</span>
              <ChevronRight size={14} />
              <span className="text-[#374151]">All Documents</span>
           </div>

           {/* Upload Zone */}
            <div className="w-full h-32 border-2 border-dashed border-[#FEF08A] bg-[#FFFDF0]/50 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:border-[#92400E] hover:bg-[#FFFDF0] transition-all cursor-pointer">
               <Upload className="text-[#92400E] opacity-50 group-hover:scale-110 transition-transform" size={32} />
               <p className="text-[13px] font-medium text-[#92400E] tracking-tight">Drop files here or click to upload</p>
               <p className="text-[11px] text-[#92400E]/60">Support for PDF, JPG, XLSX, DOCX (Max 50MB)</p>
            </div>

           {/* Content Grid/List */}
            {viewMode === 'list' ? (
             <div className="bg-white rounded-2xl border border-[#FDE68A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] overflow-hidden pb-4 border-l-[4px]">
                <table className="w-full text-left">
                    <thead>
                       <tr className="bg-[#FFFDF0] text-[11px] font-bold text-[#92400E] uppercase tracking-wider">
                         <th className="px-8 py-4">Name</th>
                         <th className="px-8 py-4">Size</th>
                         <th className="px-8 py-4">Last Modified</th>
                         <th className="px-8 py-4 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                       {FILES.map((file, idx) => (
                         <tr key={file.id} className={clsx("group border-t border-[#FEF3C7] transition-colors", idx % 2 === 1 ? "bg-[#FFFDF0]" : "bg-white", "hover:bg-[#FEF9C3]")}>
                           <td className="px-8 py-4">
                              <div className="flex items-center gap-4">
                                 <FileIcon type={file.type} />
                                 <div>
                                    <p className="text-[13px] font-medium text-[#1F2937]">{file.name}</p>
                                    <p className="text-[11px] text-[#9CA3AF]">{file.owner}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-4 text-[13px] text-[#4B5563]">{file.size}</td>
                           <td className="px-8 py-4 text-[13px] text-[#4B5563]">{file.lastModified}</td>
                           <td className="px-8 py-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="p-2 bg-white border border-[#E0E7FF] rounded-lg text-[#6B7280] hover:text-[#6366F1] shadow-sm"><Download size={14} /></button>
                                 <button className="p-2 bg-white border border-[#E0E7FF] rounded-lg text-[#6B7280] hover:text-[#10B981] shadow-sm"><Edit size={14} /></button>
                                 <button className="p-2 bg-white border border-[#E0E7FF] rounded-lg text-[#6B7280] hover:text-[#F43F5E] shadow-sm"><Trash2 size={14} /></button>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                 {FILES.map(file => (
                   <div key={file.id} className="bg-white p-6 rounded-2xl border border-[#FEF08A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] flex flex-col items-center text-center group hover:border-[#FDE68A] transition-all cursor-pointer">
                     <div className="mb-4 transform group-hover:scale-110 transition-transform">
                        <FileIcon type={file.type} />
                     </div>
                     <p className="text-[12px] font-medium text-[#1F2937] truncate w-full mb-1">{file.name}</p>
                     <p className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest leading-none">{file.size}</p>
                  </div>
                ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
