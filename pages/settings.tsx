import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/auth/AuthContext';
import type { NotificationSettings } from '@/lib/auth/AuthContext';

type SettingsTab = 'profile' | 'notifications' | 'security';

const TABS: { key: SettingsTab; label: string; icon: React.ReactNode }[] = [
  {
    key: 'profile',
    label: 'Profile',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    key: 'notifications',
    label: 'Notifications',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
  },
  {
    key: 'security',
    label: 'Security',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
];

/* ── Toggle Switch ── */
function Toggle({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:ring-offset-2 ${
        checked ? 'bg-brand-600' : 'bg-slate-200'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

/* ── Profile Tab ── */
function ProfileTab() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [username, setUsername] = useState(user?.username ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
      setBio(user.bio ?? '');
    }
  }, [user]);

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleSave = () => {
    updateProfile({ name, username, email, bio });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand-600 to-brand-400 text-white font-bold text-xl shadow-md">
          {initials || 'U'}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700">Profile photo</p>
          <p className="text-xs text-slate-400 mt-0.5">
            Avatar is generated from your initials
          </p>
        </div>
      </div>

      {/* Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="s-name" className="block text-sm font-semibold text-slate-700 mb-1.5">Full name</label>
          <input id="s-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full h-10 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 hover:border-slate-300" />
        </div>
        <div>
          <label htmlFor="s-username" className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
          <input id="s-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}
            className="w-full h-10 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 hover:border-slate-300" />
        </div>
      </div>

      <div>
        <label htmlFor="s-email" className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
        <input id="s-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full h-10 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 hover:border-slate-300" />
      </div>

      <div>
        <label htmlFor="s-bio" className="block text-sm font-semibold text-slate-700 mb-1.5">Bio</label>
        <textarea id="s-bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)}
          className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 hover:border-slate-300 resize-none"
          placeholder="Tell us about yourself…" />
        <p className="text-xs text-slate-400 mt-1">Brief description for your profile. Max 160 characters.</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
        {saved && (
          <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Saved
          </span>
        )}
        <Button variant="secondary" size="sm" onClick={() => { if (user) { setName(user.name); setUsername(user.username); setEmail(user.email); setBio(user.bio ?? ''); } }}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" onClick={handleSave}>
          Save changes
        </Button>
      </div>
    </div>
  );
}

/* ── Notifications Tab ── */
function NotificationsTab() {
  const { notifications, updateNotifications } = useAuth();
  const [saved, setSaved] = useState(false);
  const [local, setLocal] = useState<NotificationSettings>(notifications);

  useEffect(() => setLocal(notifications), [notifications]);

  const toggleField = (key: keyof NotificationSettings) => {
    setLocal((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    updateNotifications(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const items: { key: keyof NotificationSettings; title: string; desc: string }[] = [
    { key: 'emailNotifications', title: 'Email notifications', desc: 'Receive important updates about your account via email' },
    { key: 'productUpdates', title: 'Product updates', desc: 'Get notified when tools you follow release new features' },
    { key: 'weeklyDigest', title: 'Weekly digest', desc: 'A weekly summary of trending tools and new additions' },
    { key: 'marketingEmails', title: 'Marketing emails', desc: 'Promotional offers, newsletters, and partnership updates' },
  ];

  return (
    <div className="space-y-1">
      {items.map((item) => (
        <div key={item.key} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-b-0">
          <div className="pr-4">
            <p className="text-sm font-semibold text-slate-700">{item.title}</p>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
          </div>
          <Toggle checked={local[item.key]} onChange={() => toggleField(item.key)} id={`notif-${item.key}`} />
        </div>
      ))}

      <div className="flex items-center justify-end gap-3 pt-4">
        {saved && (
          <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Saved
          </span>
        )}
        <Button variant="primary" size="sm" onClick={handleSave}>
          Save preferences
        </Button>
      </div>
    </div>
  );
}

/* ── Security Tab ── */
function SecurityTab() {
  const { changePassword, logout } = useAuth();
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const handleChange = async () => {
    setError('');
    if (!currentPw || !newPw) { setError('Please fill in all fields.'); return; }
    if (newPw.length < 6) { setError('New password must be at least 6 characters.'); return; }
    if (newPw !== confirmPw) { setError('Passwords do not match.'); return; }

    const ok = await changePassword(currentPw, newPw);
    if (ok) {
      setSaved(true);
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
      setTimeout(() => setSaved(false), 2000);
    } else {
      setError('Current password is incorrect.');
    }
  };

  const sessions = [
    { device: 'Chrome on macOS', location: 'Casablanca, MA', lastActive: 'Now', current: true },
    { device: 'Safari on iPhone', location: 'Rabat, MA', lastActive: '2 hours ago', current: false },
  ];

  return (
    <div className="space-y-8">
      {/* Change password */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-4">Change password</h3>
        {error && (
          <div className="mb-3 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">{error}</div>
        )}
        <div className="space-y-3">
          <div>
            <label htmlFor="sec-current" className="block text-sm font-semibold text-slate-700 mb-1.5">Current password</label>
            <input id="sec-current" type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)}
              className="w-full h-10 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 hover:border-slate-300"
              placeholder="••••••••" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="sec-new" className="block text-sm font-semibold text-slate-700 mb-1.5">New password</label>
              <input id="sec-new" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)}
                className="w-full h-10 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 hover:border-slate-300"
                placeholder="Min. 6 characters" />
            </div>
            <div>
              <label htmlFor="sec-confirm" className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm new password</label>
              <input id="sec-confirm" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)}
                className="w-full h-10 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 hover:border-slate-300"
                placeholder="Same as above" />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-1">
            {saved && (
              <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                Password updated
              </span>
            )}
            <Button variant="primary" size="sm" onClick={handleChange}>
              Update password
            </Button>
          </div>
        </div>
      </div>

      {/* Sessions */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-4">Active sessions</h3>
        <div className="space-y-3">
          {sessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between py-3 px-4 bg-slate-50/70 border border-slate-100 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{s.device}</p>
                  <p className="text-xs text-slate-400">{s.location} · {s.lastActive}</p>
                </div>
              </div>
              {s.current ? (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Current
                </span>
              ) : (
                <button type="button" className="text-xs text-red-500 font-medium hover:text-red-600 transition-colors">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="danger" size="sm" onClick={logout}>
            Sign out all devices
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ── Settings Page ── */
export default function SettingsPage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) router.replace('/login');
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) return null;

  return (
    <>
      <Head>
        <title>Settings — Stacklist</title>
        <meta name="description" content="Manage your Stacklist profile, notification preferences, and account security." />
      </Head>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your account and preferences</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Sidebar tabs (desktop) / horizontal pills (mobile) */}
          <nav className="md:w-48 shrink-0" aria-label="Settings tabs">
            {/* Mobile: horizontal pills */}
            <div className="flex md:hidden gap-1 overflow-x-auto pb-1 scrollbar-hide mb-4">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all duration-150 ${
                    activeTab === tab.key
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Desktop: vertical sidebar */}
            <div className="hidden md:flex flex-col gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-left ${
                    activeTab === tab.key
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm">
              {/* Tab header */}
              <div className="mb-6 pb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">
                  {TABS.find((t) => t.key === activeTab)?.label}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeTab === 'profile' && 'Update your personal information'}
                  {activeTab === 'notifications' && 'Choose what updates you want to receive'}
                  {activeTab === 'security' && 'Manage your password and active sessions'}
                </p>
              </div>

              {activeTab === 'profile' && <ProfileTab />}
              {activeTab === 'notifications' && <NotificationsTab />}
              {activeTab === 'security' && <SecurityTab />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
