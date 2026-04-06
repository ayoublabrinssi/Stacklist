import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface User {
  name: string;
  email: string;
  username: string;
  avatar?: string;
  bio?: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  productUpdates: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  notifications: NotificationSettings;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: { name: string; email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  updateNotifications: (data: Partial<NotificationSettings>) => void;
  changePassword: (current: string, newPass: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'stacklist_user';
const NOTIF_KEY = 'stacklist_notifications';

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  emailNotifications: true,
  productUpdates: true,
  weeklyDigest: false,
  marketingEmails: false,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<NotificationSettings>(DEFAULT_NOTIFICATIONS);
  const [loaded, setLoaded] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
      const storedNotif = localStorage.getItem(NOTIF_KEY);
      if (storedNotif) setNotifications(JSON.parse(storedNotif));
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  // Persist user
  useEffect(() => {
    if (!loaded) return;
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user, loaded]);

  // Persist notifications
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(NOTIF_KEY, JSON.stringify(notifications));
  }, [notifications, loaded]);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Frontend-only: accept any email/password
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    setUser({ name, email, username });
    return true;
  }, []);

  const signup = useCallback(async (data: { name: string; email: string; password: string }): Promise<boolean> => {
    const username = data.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    setUser({ name: data.name, email: data.email, username });
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  const updateNotifications = useCallback((data: Partial<NotificationSettings>) => {
    setNotifications((prev) => ({ ...prev, ...data }));
  }, []);

  const changePassword = useCallback(async (_current: string, _newPass: string): Promise<boolean> => {
    // Frontend-only: always succeed
    return true;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        notifications,
        login,
        signup,
        logout,
        updateProfile,
        updateNotifications,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
