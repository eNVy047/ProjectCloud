'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BiArrowBack, 
  BiSend, 
  BiPlay, 
  BiPause, 
  BiVolumeFull, 
  BiFullscreen, 
  BiPlus, 
  BiTrash,
  BiCheck
} from 'react-icons/bi';

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  time: string;
  role: 'student' | 'instructor' | 'me';
}

interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
}

const LiveWorkshop: React.FC = () => {
  const router = useRouter();
  
  // Streaming Player State
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewersCount, setViewersCount] = useState(142);
  
  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'Prof. Alice Smith', text: 'Welcome everyone! Today we will build a Next.js application.', time: '11:00 AM', role: 'instructor' },
    { id: '2', user: 'Rahul Kumar', text: 'Excited for this workshop!', time: '11:01 AM', role: 'student' },
    { id: '3', user: 'Sneha Patel', text: 'Will we get the repository link?', time: '11:02 AM', role: 'student' }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Collaborative Tasks State
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: '1', text: 'Set up Next.js project structure', completed: true },
    { id: '2', text: 'Integrate Tailwind CSS styling', completed: true },
    { id: '3', text: 'Create interactive components', completed: false },
    { id: '4', text: 'Verify build success', completed: false }
  ]);
  const [taskInput, setTaskInput] = useState('');

  // Collaborative Notes State
  const [notes, setNotes] = useState(
    "// Class notes & snippets go here!\n\n1. Use React's useEffect to handle side effects.\n2. Leverage Tailwind utility classes for rapid UI design.\n3. Make sure next.config.mjs uses default export."
  );

  // Auto-scroll Chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Simulate incoming chat messages
  useEffect(() => {
    const studentNames = ['Amit Sharma', 'Emily Johnson', 'Priya Das', 'David Lee', 'Sara Al-Jamil'];
    const sampleMessages = [
      'This looks very cool!',
      'Can you explain the directory structure again?',
      'Awesome explanation, thank you!',
      'Yes, the styling works perfectly now.',
      'Can we use Supabase with this?',
      'I am getting a compilation warning, any tips?'
    ];

    const interval = setInterval(() => {
      if (!isPlaying) return;
      
      const randomName = studentNames[Math.floor(Math.random() * studentNames.length)];
      const randomText = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setChatMessages(prev => [
        ...prev, 
        {
          id: Date.now().toString(),
          user: randomName,
          text: randomText,
          time: timeString,
          role: 'student'
        }
      ]);

      // Randomly change viewer count slightly
      setViewersCount(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle Send Chat
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        user: 'You',
        text: messageInput,
        time: timeString,
        role: 'me'
      }
    ]);
    setMessageInput('');
  };

  // Add Task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    setTasks(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: taskInput.trim(),
        completed: false
      }
    ]);
    setTaskInput('');
  };

  // Toggle Task Completion
  const toggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
    );
  };

  // Delete Task
  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-4 lg:p-6"
    >
      {/* Header section */}
      <motion.section
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white dark:bg-gray-800 py-4 px-6 rounded-2xl shadow-lg flex items-center justify-between mb-6 border border-gray-100 dark:border-gray-700/50"
      >
        <div className="flex items-center space-x-4">
          <button 
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700" 
            onClick={() => router.back()} 
            aria-label="Go back"
          >
            <BiArrowBack size={24} />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              Live Session Integration 
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">
              Host: Institute of Innovation & Tech
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full font-bold text-sm">
          <span>LIVE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400"></span>
          <span className="text-gray-700 dark:text-gray-300 text-xs font-normal">{viewersCount} watching</span>
        </div>
      </motion.section>

      {/* Main Grid content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Player & Notes */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Stream Player Simulator */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-950 relative aspect-video flex flex-col justify-between group">
            {/* Top Bar Overlay */}
            <div className="p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-sm font-semibold truncate">Building Next.js Full Stack Apps with Supabase</span>
              <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded font-mono">1080p HD</span>
            </div>

            {/* Simulated Stream Visual */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-950/40 to-slate-900">
              {isPlaying ? (
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full border-4 border-t-indigo-500 border-indigo-200/20 animate-spin mx-auto mb-2"></div>
                  <p className="text-indigo-400 font-mono text-sm tracking-widest uppercase animate-pulse">Receiving Stream...</p>
                </div>
              ) : (
                <div className="text-center">
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg shadow-indigo-600/30"
                  >
                    <BiPlay size={45} className="ml-1" />
                  </button>
                  <p className="text-gray-400 mt-4 font-semibold">Stream Paused</p>
                </div>
              )}
            </div>

            {/* Bottom Controls Overlay */}
            <div className="p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center space-x-4 text-white">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {isPlaying ? <BiPause size={28} /> : <BiPlay size={28} />}
                </button>
                <div className="flex items-center space-x-2">
                  <BiVolumeFull size={20} />
                  <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-indigo-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-white">
                <span className="text-xs text-red-500 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> LIVE
                </span>
                <button className="hover:text-indigo-400 transition-colors">
                  <BiFullscreen size={22} />
                </button>
              </div>
            </div>
          </div>

          {/* Collaborative Notes Canvas */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50">
            <h3 className="text-lg font-bold mb-3 text-indigo-600 dark:text-indigo-400">Collaborative Session Notes</h3>
            <textarea
              className="w-full h-44 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Start drafting notes or paste code blocks here..."
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              💡 Notes are local and editable by any user during the live session.
            </p>
          </div>

        </div>

        {/* Right Side: Chat & Project Tasks */}
        <div className="space-y-6">

          {/* Live Chat Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 flex flex-col h-[400px]">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center bg-gray-50 dark:bg-gray-900/10 rounded-t-2xl">
              <h3 className="font-bold text-gray-900 dark:text-gray-100">Live Chat</h3>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full">Connected</span>
            </div>

            {/* Chat message feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence initial={false}>
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${msg.role === 'me' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center space-x-1.5 mb-0.5">
                      <span className={`text-xs font-bold ${msg.role === 'instructor' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}`}>
                        {msg.user}
                      </span>
                      {msg.role === 'instructor' && (
                        <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 px-1 rounded font-semibold">Host</span>
                      )}
                      <span className="text-[10px] text-gray-400">{msg.time}</span>
                    </div>
                    <div className={`p-2.5 rounded-2xl max-w-[85%] text-sm ${
                      msg.role === 'me' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-gray-100 dark:bg-gray-750 text-gray-800 dark:text-gray-200 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Message input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 dark:border-gray-700/50 flex gap-2">
              <input
                type="text"
                className="flex-1 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-900/50"
                placeholder="Send message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl transition-colors shadow-md"
              >
                <BiSend size={18} />
              </button>
            </form>
          </div>

          {/* Collaborative Project Task Board */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50">
            <h3 className="text-lg font-bold mb-1 text-indigo-600 dark:text-indigo-400">Concurrent Tasks</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Real-time task synchronization for this workshop.</p>
            
            {/* Task input */}
            <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
              <input
                type="text"
                className="flex-1 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-900/50"
                placeholder="Add collaborative task..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition-colors"
                aria-label="Add task"
              >
                <BiPlus size={20} />
              </button>
            </form>

            {/* Task list */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center justify-between p-2.5 border border-gray-150 dark:border-gray-750 bg-gray-50/55 dark:bg-gray-900/20 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          task.completed 
                            ? 'bg-indigo-600 border-indigo-600 text-white' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'
                        }`}
                        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
                      >
                        {task.completed && <BiCheck size={16} />}
                      </button>
                      <span className={`text-sm ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'}`}>
                        {task.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Delete task"
                    >
                      <BiTrash size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </motion.main>
  );
};

export default LiveWorkshop;
