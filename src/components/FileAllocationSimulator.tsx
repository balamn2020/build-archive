import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HardDrive,
  RefreshCw,
  Plus,
  Trash2,
  Sliders,
  Layers,
  Database,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { playBeep } from '../lib/sound';

export type AllocationMode = 'contiguous' | 'linked' | 'indexed';

interface AllocatedFile {
  id: string;
  name: string;
  size: number;
  mode: AllocationMode;
  color: string;
  blocks: number[];
  indexBlock?: number; // for indexed mode
}

const TOTAL_BLOCKS = 64; // 8x8 disk map
const FILE_COLORS = [
  '#00f0ff', // Electric cyan
  '#0070f3', // Electric blue
  '#7928ca', // Violet
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
];

export const FileAllocationSimulator: React.FC = () => {
  const [mode, setMode] = useState<AllocationMode>('contiguous');
  const [files, setFiles] = useState<AllocatedFile[]>([
    {
      id: 'file-1',
      name: 'kernel.sys',
      size: 4,
      mode: 'contiguous',
      color: '#00f0ff',
      blocks: [0, 1, 2, 3],
    },
    {
      id: 'file-2',
      name: 'network.log',
      size: 3,
      mode: 'contiguous',
      color: '#0070f3',
      blocks: [6, 7, 8],
    },
    {
      id: 'file-3',
      name: 'archive.tar',
      size: 5,
      mode: 'contiguous',
      color: '#7928ca',
      blocks: [12, 13, 14, 15, 16],
    },
  ]);

  const [newFileName, setNewFileName] = useState('payload.dat');
  const [newFileSize, setNewFileSize] = useState(4);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // Compute block status
  const blockMap = Array.from({ length: TOTAL_BLOCKS }, (_, i) => {
    for (const f of files) {
      if (f.indexBlock === i) {
        return { blockNum: i, file: f, isIndex: true };
      }
      if (f.blocks.includes(i)) {
        return { blockNum: i, file: f, isIndex: false };
      }
    }
    return { blockNum: i, file: null, isIndex: false };
  });

  const allocatedBlockCount = blockMap.filter((b) => b.file !== null).length;
  const freeBlockCount = TOTAL_BLOCKS - allocatedBlockCount;

  // External fragmentation estimation for contiguous allocation
  const calculateFragmentation = (): number => {
    if (mode !== 'contiguous') return 0;
    let maxFreeContiguous = 0;
    let currentFree = 0;
    for (let i = 0; i < TOTAL_BLOCKS; i++) {
      if (blockMap[i].file === null) {
        currentFree++;
        if (currentFree > maxFreeContiguous) maxFreeContiguous = currentFree;
      } else {
        currentFree = 0;
      }
    }
    if (freeBlockCount === 0) return 0;
    const unusableBlocks = freeBlockCount - maxFreeContiguous;
    return Math.round((unusableBlocks / freeBlockCount) * 100);
  };

  const handleAllocate = () => {
    playBeep(800, 0.04);
    if (!newFileName.trim()) {
      showFeedback('Please provide a file name', true);
      return;
    }
    if (files.some((f) => f.name.toLowerCase() === newFileName.trim().toLowerCase())) {
      showFeedback(`File "${newFileName}" already exists in directory table`, true);
      return;
    }

    const freeIndices: number[] = [];
    blockMap.forEach((b, i) => {
      if (b.file === null) freeIndices.push(i);
    });

    const color = FILE_COLORS[files.length % FILE_COLORS.length];

    if (mode === 'contiguous') {
      // Find contiguous free blocks of length newFileSize
      let startIdx = -1;
      let count = 0;
      for (let i = 0; i < TOTAL_BLOCKS; i++) {
        if (blockMap[i].file === null) {
          if (count === 0) startIdx = i;
          count++;
          if (count === newFileSize) break;
        } else {
          count = 0;
          startIdx = -1;
        }
      }

      if (count === newFileSize && startIdx !== -1) {
        const blocks = Array.from({ length: newFileSize }, (_, k) => startIdx + k);
        const newFile: AllocatedFile = {
          id: `file-${Date.now()}`,
          name: newFileName.trim(),
          size: newFileSize,
          mode: 'contiguous',
          color,
          blocks,
        };
        setFiles([...files, newFile]);
        showFeedback(`Successfully allocated "${newFileName}" from block ${startIdx} to ${startIdx + newFileSize - 1}`, false);
        setNewFileName(`chunk_${files.length + 1}.bin`);
      } else {
        showFeedback(`Allocation Failed: No contiguous block set of size ${newFileSize} available (External Fragmentation)`, true);
      }
    } else if (mode === 'linked') {
      if (freeIndices.length < newFileSize) {
        showFeedback(`Allocation Failed: Insufficient disk blocks available`, true);
        return;
      }
      // Scatter allocation across free blocks
      const blocks = freeIndices.slice(0, newFileSize);
      const newFile: AllocatedFile = {
        id: `file-${Date.now()}`,
        name: newFileName.trim(),
        size: newFileSize,
        mode: 'linked',
        color,
        blocks,
      };
      setFiles([...files, newFile]);
      showFeedback(`Allocated "${newFileName}" via Linked pointers: [${blocks.join(' → ')}]`, false);
      setNewFileName(`chunk_${files.length + 1}.bin`);
    } else if (mode === 'indexed') {
      // Indexed requires 1 index block + data blocks
      const required = newFileSize + 1;
      if (freeIndices.length < required) {
        showFeedback(`Allocation Failed: Requires ${required} blocks (1 Index + ${newFileSize} Data)`, true);
        return;
      }
      const indexBlock = freeIndices[0];
      const blocks = freeIndices.slice(1, required);
      const newFile: AllocatedFile = {
        id: `file-${Date.now()}`,
        name: newFileName.trim(),
        size: newFileSize,
        mode: 'indexed',
        color,
        blocks,
        indexBlock,
      };
      setFiles([...files, newFile]);
      showFeedback(`Allocated "${newFileName}" with Index Block #${indexBlock} pointing to [${blocks.join(', ')}]`, false);
      setNewFileName(`chunk_${files.length + 1}.bin`);
    }
  };

  const handleDeleteFile = (id: string, name: string) => {
    playBeep(450, 0.05);
    setFiles(files.filter((f) => f.id !== id));
    showFeedback(`Deallocated "${name}" and reclaimed disk blocks`, false);
  };

  const handleReset = () => {
    playBeep(350, 0.05);
    setFiles([]);
    setSelectedBlock(null);
    showFeedback('Virtual disk wiped clean', false);
  };

  const handleLoadDemo = () => {
    playBeep(900, 0.04);
    setFiles([
      {
        id: 'f1',
        name: 'bootloader.bin',
        size: 3,
        mode,
        color: '#00f0ff',
        blocks: [0, 1, 2],
      },
      {
        id: 'f2',
        name: 'daemon_core.so',
        size: 4,
        mode,
        color: '#0070f3',
        blocks: [7, 8, 9, 10],
      },
      {
        id: 'f3',
        name: 'crypto_keys.pem',
        size: 2,
        mode,
        color: '#7928ca',
        blocks: [15, 16],
      },
      {
        id: 'f4',
        name: 'database.db',
        size: 6,
        mode,
        color: '#10b981',
        blocks: [22, 23, 24, 25, 26, 27],
      },
    ]);
    showFeedback('Loaded OS benchmark dataset into memory', false);
  };

  const showFeedback = (msg: string, error: boolean) => {
    setFeedbackMessage(msg);
    setIsError(error);
    setTimeout(() => setFeedbackMessage(null), 4500);
  };

  const fragmentationPercentage = calculateFragmentation();

  return (
    <div id="simulator" className="rounded-3xl border border-electric-cyan/30 bg-space-900/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-electric-cyan/5 rounded-full blur-3xl pointer-events-none" />

      {/* Simulator Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan mb-1.5">
            <HardDrive className="h-4 w-4" />
            <span>OPERATING SYSTEMS LABORATORY // LIVE INTERACTIVE SIMULATOR</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
            Disk Storage & File Allocation Visualizer
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Simulate how operating systems allocate blocks on physical disk cylinders and witness external fragmentation in action.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex rounded-xl border border-white/10 bg-space-950 p-1 font-mono text-xs">
          {(['contiguous', 'linked', 'indexed'] as AllocationMode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                playBeep(700, 0.02);
                setMode(m);
              }}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                mode === m
                  ? 'bg-gradient-to-r from-electric-blue to-electric-cyan text-space-950 font-bold shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Live Feedback Banner */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-6 flex items-center gap-2 rounded-xl p-3 text-xs font-mono border ${
              isError
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                : 'border-electric-cyan/40 bg-electric-cyan/10 text-electric-cyan'
            }`}
          >
            {isError ? <AlertCircle className="h-4 w-4 shrink-0" /> : <CheckCircle2 className="h-4 w-4 shrink-0" />}
            <span>{feedbackMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Simulator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: 64-Block Virtual Disk Grid */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-electric-cyan" />
              64-SECTOR DISK CYLINDER MAP (8 × 8)
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-700" /> Free ({freeBlockCount})
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-electric-cyan" /> Used ({allocatedBlockCount})
              </span>
            </div>
          </div>

          {/* Interactive 64-Block Grid */}
          <div className="grid grid-cols-8 gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-2xl border border-white/10 bg-space-950/70 shadow-inner">
            {blockMap.map((cell) => {
              const isSelected = selectedBlock === cell.blockNum;
              return (
                <button
                  key={cell.blockNum}
                  onClick={() => {
                    playBeep(600 + cell.blockNum * 5, 0.02);
                    setSelectedBlock(cell.blockNum);
                  }}
                  title={`Block #${cell.blockNum}: ${cell.file ? cell.file.name : 'Free'}`}
                  className={`group relative aspect-square rounded-lg transition-all duration-200 flex flex-col items-center justify-center text-[10px] font-mono border ${
                    isSelected
                      ? 'ring-2 ring-white scale-105 z-10'
                      : 'hover:scale-105 hover:z-10'
                  } ${
                    cell.file
                      ? cell.isIndex
                        ? 'border-white bg-white/20 font-bold text-white shadow-lg'
                        : 'border-transparent font-medium text-space-950'
                      : 'border-white/5 bg-slate-900/60 text-slate-600 hover:border-white/20 hover:text-slate-300'
                  }`}
                  style={{
                    backgroundColor: cell.file ? (cell.isIndex ? '#ffffff' : cell.file.color) : undefined,
                  }}
                >
                  <span className={cell.file ? (cell.isIndex ? 'text-black font-extrabold' : 'text-space-950 font-bold') : ''}>
                    {cell.blockNum}
                  </span>
                  {cell.isIndex && (
                    <span className="text-[7px] uppercase tracking-tighter text-black font-bold">
                      IDX
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Disk Telemetry Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
              <span className="text-[10px] font-mono text-slate-400 block">TOTAL DISK CAPACITY</span>
              <span className="font-display text-lg font-bold text-white">64 Blocks</span>
            </div>
            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
              <span className="text-[10px] font-mono text-slate-400 block">OCCUPANCY RATE</span>
              <span className="font-display text-lg font-bold text-electric-cyan">
                {Math.round((allocatedBlockCount / TOTAL_BLOCKS) * 100)}%
              </span>
            </div>
            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
              <span className="text-[10px] font-mono text-slate-400 block">EXT. FRAGMENTATION</span>
              <span className={`font-display text-lg font-bold ${fragmentationPercentage > 20 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {mode === 'contiguous' ? `${fragmentationPercentage}%` : '0% (Non-Contig)'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: File Allocation Controls & Directory Table */}
        <div className="lg:col-span-5 space-y-6">
          {/* Allocation Action Card */}
          <div className="rounded-2xl border border-white/10 bg-space-950/60 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-electric-cyan" />
                ALLOCATE NEW INODE
              </span>
              <span className="text-[10px] font-mono text-electric-cyan capitalize">
                MODE: {mode}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">FILE NAME</label>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-space-900 px-3 py-2 text-xs font-mono text-white focus:border-electric-cyan focus:outline-none"
                  placeholder="e.g. data_buffer.bin"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>REQUIRED BLOCKS</span>
                  <span className="text-electric-cyan font-bold">{newFileSize} BLOCKS</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={newFileSize}
                  onChange={(e) => setNewFileSize(Number(e.target.value))}
                  className="w-full accent-electric-cyan cursor-pointer"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleAllocate}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-electric-blue to-electric-cyan px-4 py-2 text-xs font-mono font-bold text-space-950 shadow-glow-cyan hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>ALLOCATE FILE</span>
                </button>
                <button
                  onClick={handleLoadDemo}
                  title="Load demo OS dataset"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-slate-300 hover:text-white hover:border-white/20 transition-all"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={handleReset}
                  title="Format virtual disk"
                  className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-mono text-rose-300 hover:bg-rose-500/20 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Directory Allocation Table */}
          <div className="rounded-2xl border border-white/10 bg-space-950/60 p-5">
            <span className="text-xs font-mono font-bold text-white uppercase block mb-3">
              ACTIVE DIRECTORY TABLE ({files.length} FILES)
            </span>

            {files.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs font-mono">
                DISK IS EMPTY // ALLOCATE A FILE ABOVE
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-space-900/80 text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: file.color }}
                      />
                      <div>
                        <span className="text-white font-medium block">{file.name}</span>
                        <span className="text-[10px] text-slate-400">
                          {file.mode === 'contiguous' && `Blocks: [${file.blocks[0]}..${file.blocks[file.blocks.length - 1]}]`}
                          {file.mode === 'linked' && `Pointers: [${file.blocks.join('→')}]`}
                          {file.mode === 'indexed' && `Idx #${file.indexBlock} → [${file.blocks.join(',')}]`}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteFile(file.id, file.name)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Deallocate"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

