"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, LogOut, CheckCircle, AlertCircle, Briefcase, 
  TrendingUp, Users, PlayCircle, Settings, Save, Edit3, Plus,
  FileText, Link as LinkIcon, Lock, Unlock, Eye, BarChart3, Image as ImageIcon
} from "lucide-react";

import { initializeApp, getApps } from "firebase/app";
import { 
  getAuth, signInWithEmailAndPassword, signInWithPopup, 
  GoogleAuthProvider, onAuthStateChanged, signOut 
} from "firebase/auth";
import { 
  getFirestore, doc, getDoc, setDoc, updateDoc, collection, onSnapshot 
} from "firebase/firestore";

// --- FIREBASE CONFIG (Replace with yours) ---
const firebaseConfig = {
  apiKey: "AIzaSyDsfHoYay8d1aAjYTS-tPqGFfBlPBV-sh8",
  authDomain: "vyoma-global.firebaseapp.com",
  projectId: "vyoma-global",
  storageBucket: "vyoma-global.firebasestorage.app",
  messagingSenderId: "632540356913",
  appId: "1:632540356913:web:aa35ec88c249bac56b1010",
  measurementId: "G-1CN5LW76TB"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// --- MASTER ADMIN ---
const ADMIN_EMAIL = "vyomaglobal01@gmail.com";

// --- ANIMATIONS ---
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // "admin" or "client"
  const [authLoading, setAuthLoading] = useState(true);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // --- AUTH LISTENER & ROLE ASSIGNMENT ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // 1. Check if it is the Master Admin
        if (currentUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          setRole("admin");
        } else {
          // 2. It is a Client
          setRole("client");
          await ensureClientProfileExists(currentUser);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- AUTO-CREATE CLIENT PROFILE IF ADMIN HASN'T YET ---
  const ensureClientProfileExists = async (currentUser) => {
    const userEmail = currentUser.email.toLowerCase();
    const clientRef = doc(db, "clients", userEmail);
    const snap = await getDoc(clientRef);
    
    // If Admin hasn't pre-created them, create a default profile
    if (!snap.exists()) {
      await setDoc(clientRef, {
        name: currentUser.displayName || "New Client",
        email: userEmail,
        package: "Standard",
        monthlyFee: 0,
        status: "Active",
        createdAt: new Date().toISOString()
      });
    }
  };

  // --- LOGIN HANDLERS ---
  const handleGoogleLogin = async () => {
    setAuthError(""); setIsLoggingIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setAuthError("Google Sign-In failed or was cancelled.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setAuthError(""); setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setAuthError("Invalid credentials. Please check your email and password.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => signOut(auth);

  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;

  // --- LOGIN SCREEN ---
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-10">
          <div className="flex flex-col items-center mb-8">
            <img src="/icon.png" alt="Vyoma Global" className="h-16 w-auto rounded-xl shadow-sm mb-4 object-cover" />
            <h1 className="text-2xl font-bold text-slate-900">Portal Login</h1>
          </div>
          
          {authError && <div className="p-3 mb-6 bg-red-50 text-red-600 text-sm rounded-xl">{authError}</div>}
          
          {/* GOOGLE LOGIN BUTTON */}
          <button onClick={handleGoogleLogin} disabled={isLoggingIn} className="w-full bg-white border border-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-3 mb-6 shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6"><div className="h-px bg-slate-200 flex-1"></div><span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Or Email</span><div className="h-px bg-slate-200 flex-1"></div></div>

          {/* EMAIL LOGIN FORM */}
          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input type="password" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" disabled={isLoggingIn} className="w-full bg-slate-900 text-white font-semibold py-3.5 rounded-xl hover:bg-slate-800 transition-all">{isLoggingIn ? "Logging in..." : "Secure Login"}</button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- ROUTING ---
  return role === "admin" ? <AdminDashboard db={db} handleLogout={handleLogout} /> : <ClientDashboard user={user} db={db} handleLogout={handleLogout} />;
}

// ==========================================
// ADMIN DASHBOARD
// ==========================================
function AdminDashboard({ db, handleLogout }) {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  
  const [monthForm, setMonthForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "clients"), (snap) => {
      setClients(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [db]);

  useEffect(() => {
    if (!selectedClient) { setMonths([]); setSelectedMonth(null); return; }
    // Fetch without orderBy to PREVENT index errors. Sort locally in JS.
    const unsub = onSnapshot(collection(db, "clients", selectedClient.id, "months"), (snap) => {
      const mList = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      mList.sort((a, b) => b.id.localeCompare(a.id)); 
      setMonths(mList);
      if (mList.length > 0) handleSelectMonth(mList[0]);
    });
    return () => unsub();
  }, [selectedClient, db]);

  const handleSelectMonth = (m) => {
    setSelectedMonth(m);
    setMonthForm({
      ...m,
      doneWorkStr: m.doneWork?.map(w => w.task).join("\n") || "",
      pendingWorkStr: m.pendingWork?.map(w => w.task).join("\n") || "",
      upcomingWorkStr: m.upcomingWork?.map(w => w.task).join("\n") || ""
    });
  };

  // ADMIN ADDS A NEW USER
  const createClient = async () => {
    const clientEmail = prompt("Enter the Client's Google Email Address:");
    if (!clientEmail) return;
    
    const clientName = prompt("Enter the Client's Company/Name:");
    if (!clientName) return;

    // Use lowercase email as the Document ID so it auto-links when they log in!
    const safeEmail = clientEmail.toLowerCase().trim();
    
    await setDoc(doc(db, "clients", safeEmail), {
      name: clientName,
      email: safeEmail,
      package: "Premium",
      monthlyFee: 15000,
      status: "Active",
      createdAt: new Date().toISOString()
    });
    alert(`Client created! Tell them to log in with ${safeEmail}`);
  };

  const createMonth = async () => {
    if (!selectedClient) return;
    const monthId = prompt("Enter Month ID (e.g., 2026-03):");
    if (!monthId) return;
    await setDoc(doc(db, "clients", selectedClient.id, "months", monthId), {
      monthName: "March 2026", paymentStatus: "Pending", performance: { totalPosts: 0, reels: 0, engagement: 0, reach: 0, followerGrowth: 0, adSpend: 0, leads: 0, websiteClicks: 0 },
      doneWork: [], pendingWork: [], upcomingWork: [], completedWork: [], adminNotes: "",
      upgradeRecommendation: { enabled: false, title: "", reason: "", expectedBenefit: "" },
      reportLinks: { pdf: "", drive: "", canva: "" }
    });
  };

  const saveMonthData = async () => {
    if (!selectedMonth || !selectedClient) return;
    setIsSaving(true);
    try {
      const toArray = (str) => str.split("\n").filter(t => t.trim()).map(t => ({ task: t.trim() }));
      await updateDoc(doc(db, "clients", selectedClient.id, "months", selectedMonth.id), {
        ...monthForm,
        doneWork: toArray(monthForm.doneWorkStr),
        pendingWork: toArray(monthForm.pendingWorkStr),
        upcomingWork: toArray(monthForm.upcomingWorkStr),
        doneWorkStr: null, pendingWorkStr: null, upcomingWorkStr: null
      });
      alert("Changes Saved Successfully!");
    } catch (e) { alert("Error saving data"); }
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col md:flex-row font-sans selection:bg-blue-500/30">
      <aside className="w-full md:w-80 bg-slate-950 border-r border-slate-800 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div><h1 className="text-xl font-bold text-white flex items-center gap-2"><Lock className="w-4 h-4 text-blue-500"/> Master Admin</h1></div>
          <button onClick={handleLogout} className="text-slate-500 hover:text-white"><LogOut className="w-5 h-5"/></button>
        </div>
        <div className="p-4"><button onClick={createClient} className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-semibold"><Plus className="w-4 h-4"/> Add New Client</button></div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {clients.map(c => (
             <button key={c.id} onClick={() => setSelectedClient(c)} className={`w-full text-left p-4 rounded-xl transition-all ${selectedClient?.id === c.id ? 'bg-slate-800 border-l-4 border-blue-500' : 'hover:bg-slate-800/50'}`}>
               <p className="font-semibold text-white truncate">{c.name}</p>
               <p className="text-xs text-slate-500 truncate">{c.email}</p>
             </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 h-screen overflow-y-auto">
        {!selectedClient ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500"><Settings className="w-16 h-16 mb-4 opacity-20" /><p>Select a client to manage their dashboard</p></div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex justify-between items-center">
               <div>
                 <h2 className="text-2xl font-bold text-white mb-1">{selectedClient.name}</h2>
                 <p className="text-sm text-slate-400">{selectedClient.email} | {selectedClient.package} | ₹{selectedClient.monthlyFee}/mo</p>
               </div>
               <button onClick={createMonth} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm flex items-center gap-2 text-white"><Plus className="w-4 h-4"/> Add Month</button>
            </div>

            {months.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {months.map(m => (
                  <button key={m.id} onClick={() => handleSelectMonth(m)} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${selectedMonth?.id === m.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>{m.monthName}</button>
                ))}
              </div>
            )}

            {selectedMonth && monthForm.performance && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
                   <h3 className="font-bold text-white">Editing: {monthForm.monthName}</h3>
                   <button onClick={saveMonthData} disabled={isSaving} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"><Save className="w-4 h-4"/> {isSaving ? "Saving..." : "Save Month Data"}</button>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                   <div className="space-y-6">
                      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Billing & Setup</h4>
                        <div className="space-y-3">
                           <div><label className="text-xs text-slate-400">Month Display Name</label><input type="text" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm" value={monthForm.monthName || ""} onChange={e => setMonthForm({...monthForm, monthName: e.target.value})} /></div>
                           <div>
                             <label className="text-xs text-slate-400">Payment Status</label>
                             <select className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm" value={monthForm.paymentStatus || "Pending"} onChange={e => setMonthForm({...monthForm, paymentStatus: e.target.value})}>
                               <option>Pending</option><option>Paid</option><option>Overdue</option>
                             </select>
                           </div>
                           <div><label className="text-xs text-slate-400">Transaction ID / Notes</label><input type="text" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm" value={monthForm.transactionId || ""} onChange={e => setMonthForm({...monthForm, transactionId: e.target.value})} /></div>
                        </div>
                      </div>

                      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Performance Metrics</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.keys(monthForm.performance).map(key => (
                            <div key={key}>
                              <label className="text-[10px] text-slate-400 uppercase">{key}</label>
                              <input type="number" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm" value={monthForm.performance[key]} onChange={e => setMonthForm({...monthForm, performance: {...monthForm.performance, [key]: Number(e.target.value)}})} />
                            </div>
                          ))}
                        </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex flex-col h-full">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Task Management</h4>
                        <p className="text-[10px] text-slate-500 mb-2">One task per line. Enter to separate.</p>
                        
                        <div className="space-y-4 flex-1">
                          <div>
                            <label className="text-xs text-emerald-400 font-semibold mb-1 block">Completed Work</label>
                            <textarea rows="3" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm" value={monthForm.doneWorkStr} onChange={e => setMonthForm({...monthForm, doneWorkStr: e.target.value})} placeholder="Designed Logo&#10;Posted 5 Reels" />
                          </div>
                          <div>
                            <label className="text-xs text-amber-400 font-semibold mb-1 block">Pending Client Approval</label>
                            <textarea rows="3" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm" value={monthForm.pendingWorkStr} onChange={e => setMonthForm({...monthForm, pendingWorkStr: e.target.value})} />
                          </div>
                          <div>
                            <label className="text-xs text-blue-400 font-semibold mb-1 block">Upcoming Work</label>
                            <textarea rows="3" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm" value={monthForm.upcomingWorkStr} onChange={e => setMonthForm({...monthForm, upcomingWorkStr: e.target.value})} />
                          </div>
                        </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Report Links</h4>
                        <div className="space-y-3">
                          {['pdf', 'drive', 'canva'].map(type => (
                            <div key={type}>
                              <label className="text-xs text-slate-400 capitalize">{type} Link</label>
                              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm" value={monthForm.reportLinks?.[type] || ""} onChange={e => setMonthForm({...monthForm, reportLinks: {...monthForm.reportLinks, [type]: e.target.value}})} />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 border-l-4 border-l-purple-500">
                        <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                           <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Upgrade Suggestion</h4>
                           <input type="checkbox" checked={monthForm.upgradeRecommendation?.enabled || false} onChange={e => setMonthForm({...monthForm, upgradeRecommendation: {...monthForm.upgradeRecommendation, enabled: e.target.checked}})} className="w-4 h-4 accent-purple-500" />
                        </div>
                        {monthForm.upgradeRecommendation?.enabled && (
                          <div className="space-y-3">
                            <input type="text" placeholder="Title (e.g. Add SEO)" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm" value={monthForm.upgradeRecommendation.title || ""} onChange={e => setMonthForm({...monthForm, upgradeRecommendation: {...monthForm.upgradeRecommendation, title: e.target.value}})} />
                            <textarea placeholder="Reasoning..." className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm" rows="2" value={monthForm.upgradeRecommendation.reason || ""} onChange={e => setMonthForm({...monthForm, upgradeRecommendation: {...monthForm.upgradeRecommendation, reason: e.target.value}})} />
                          </div>
                        )}
                      </div>

                      <div className="bg-amber-900/20 p-5 rounded-xl border border-amber-900/50">
                        <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Lock className="w-3 h-3"/> Internal Admin Notes</h4>
                        <p className="text-[10px] text-amber-500/70 mb-2">Client cannot see this field.</p>
                        <textarea rows="4" className="w-full bg-slate-900 border border-amber-900/50 rounded p-2 text-sm text-amber-100 placeholder-amber-900/50 outline-none" value={monthForm.adminNotes || ""} onChange={e => setMonthForm({...monthForm, adminNotes: e.target.value})} />
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ==========================================
// CLIENT DASHBOARD
// ==========================================
function ClientDashboard({ user, db, handleLogout }) {
  const [clientData, setClientData] = useState(null);
  const [months, setMonths] = useState([]);
  const [selectedMonthId, setSelectedMonthId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Client ID is now their lowercase email!
    const clientEmail = user.email.toLowerCase();
    
    const unsubClient = onSnapshot(doc(db, "clients", clientEmail), (docSnap) => {
      if (docSnap.exists()) setClientData(docSnap.data());
    });

    const unsubMonths = onSnapshot(collection(db, "clients", clientEmail, "months"), (snap) => {
      const mList = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      mList.sort((a, b) => b.id.localeCompare(a.id)); 
      setMonths(mList);
      if (mList.length > 0 && !selectedMonthId) setSelectedMonthId(mList[0].id);
      setLoading(false);
    });

    return () => { unsubClient(); unsubMonths(); };
  }, [user, selectedMonthId, db]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;

  const currentMonth = months.find(m => m.id === selectedMonthId) || null;
  const perf = currentMonth?.performance || {};
  const isPaid = currentMonth?.paymentStatus === "Paid";

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex flex-col md:flex-row">
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-10">
        <div className="p-8 pb-4 flex flex-col items-start">
          <img src="/icon.png" alt="Vyoma Global" className="h-10 w-auto rounded object-cover mb-4" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client Portal</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium text-sm"><BarChart3 className="w-4 h-4" /> Performance</div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium text-sm transition-colors text-left"><LogOut className="w-4 h-4" /> Sign Out</button>
        </nav>
      </aside>

      <main className="flex-1 md:ml-64 p-6 lg:p-10 max-w-7xl">
        <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm mb-6 border border-slate-100">
          <img src="/Vyoma.jpg" alt="Vyoma" className="h-8 rounded" />
          <button onClick={handleLogout} className="text-slate-500"><LogOut className="w-5 h-5" /></button>
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Welcome , {clientData?.name}</h2>
            <p className="text-slate-500 text-sm">Here is your digital performance and task breakdown.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-slate-400" />
              <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Package</p><p className="text-sm font-semibold text-slate-700">{clientData?.package || "N/A"}</p></div>
            </div>
            {currentMonth && (
              <div className={`px-5 py-3 rounded-2xl border flex items-center gap-3 ${isPaid ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                {isPaid ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
                <div><p className={`text-[10px] font-bold uppercase tracking-wider ${isPaid ? 'text-emerald-600/70' : 'text-red-600/70'}`}>Billing Status</p><p className={`text-sm font-bold ${isPaid ? 'text-emerald-700' : 'text-red-700'}`}>{currentMonth.paymentStatus}</p></div>
              </div>
            )}
          </div>
        </div>

        {months.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 text-slate-500 shadow-sm">Your agency has not published any month data yet.</div>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-8">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {months.map(m => (
                <button key={m.id} onClick={() => setSelectedMonthId(m.id)} className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${selectedMonthId === m.id ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}>{m.monthName}</button>
              ))}
            </div>

            {currentMonth && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {[
                    { t: "Posts", v: perf.totalPosts, i: ImageIcon, c: "text-blue-600", bg: "bg-blue-50" },
                    { t: "Reels", v: perf.reels, i: PlayCircle, c: "text-purple-600", bg: "bg-purple-50" },
                    { t: "Reach", v: perf.reach?.toLocaleString(), i: Users, c: "text-amber-600", bg: "bg-amber-50" },
                    { t: "Engagement", v: `${perf.engagement}%`, i: TrendingUp, c: "text-emerald-600", bg: "bg-emerald-50" },
                  ].map((s, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col group">
                      <div className={`w-12 h-12 ${s.bg} ${s.c} rounded-2xl flex items-center justify-center mb-4`}><s.i className="w-6 h-6" /></div>
                      <p className="text-3xl font-bold text-slate-900 mb-1">{s.v || 0}</p>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{s.t}</p>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    {[
                      { title: "Completed Work", data: currentMonth.doneWork || [], c: "emerald", icon: CheckCircle },
                      { title: "Pending Client Approval", data: currentMonth.pendingWork || [], c: "amber", icon: AlertCircle },
                      { title: "Upcoming Work", data: currentMonth.upcomingWork || [], c: "blue", icon: FileText }
                    ].map((section, idx) => (
                      <div key={idx} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-1 h-full bg-${section.c}-500`}></div>
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3"><section.icon className={`w-6 h-6 text-${section.c}-500`} />{section.title}</h3>
                        {section.data.length === 0 ? (
                          <p className="text-sm text-slate-400 italic">No tasks listed here.</p>
                        ) : (
                          <ul className="space-y-3">
                            {section.data.map((task, i) => (
                              <li key={i} className="bg-slate-50 rounded-2xl p-4 text-sm font-medium text-slate-700 flex items-start gap-3 border border-slate-100">
                                <div className={`w-1.5 h-1.5 rounded-full bg-${section.c}-400 mt-1.5 flex-shrink-0`}></div> {task.task}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl shadow-slate-900/10">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><LinkIcon className="w-6 h-6 text-blue-400"/> Resources</h3>
                      <div className="space-y-3">
                        {['pdf', 'drive', 'canva'].map(type => {
                           const link = currentMonth.reportLinks?.[type];
                           if (!link) return null;
                           return (
                             <a key={type} href={link} target="_blank" rel="noreferrer" className="flex justify-between items-center bg-slate-800 hover:bg-slate-700 p-4 rounded-2xl transition-colors border border-slate-700">
                               <span className="capitalize font-medium text-sm">{type} Report</span>
                               <Eye className="w-4 h-4 text-slate-400" />
                             </a>
                           );
                        })}
                        {!currentMonth.reportLinks?.pdf && !currentMonth.reportLinks?.drive && !currentMonth.reportLinks?.canva && (
                          <p className="text-sm text-slate-400">No reports uploaded yet.</p>
                        )}
                      </div>
                    </div>

                    {currentMonth.upgradeRecommendation?.enabled && (
                      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-[2rem] p-8">
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6"><TrendingUp className="w-6 h-6 text-purple-600"/></div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Agency Recommendation</h3>
                        <p className="text-purple-700 font-semibold mb-3">{currentMonth.upgradeRecommendation.title}</p>
                        <p className="text-sm text-slate-600 leading-relaxed">{currentMonth.upgradeRecommendation.reason}</p>
                        <button className="mt-6 w-full py-3 bg-white border border-purple-200 text-purple-700 font-semibold rounded-xl hover:bg-purple-600 hover:text-white transition-colors">Discuss This</button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}