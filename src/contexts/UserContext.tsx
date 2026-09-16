import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  joinDate: string;
  completedLessons: number[];
  quizScores: Record<number, number>;
  diaryEntries: DiaryEntry[];
  favoritePrayers: number[];
  certificates: Certificate[];
  prayerStreak: number;
  lastPrayerDate: string | null;
}

export interface DiaryEntry {
  id: number;
  date: string;
  prayerRequest: string;
  answer?: string;
  answered: boolean;
  category: 'просьба' | 'благодарность' | 'поклонение' | 'исповедание' | 'ходатайство';
}

export interface Certificate {
  id: number;
  lessonId: number;
  lessonTitle: string;
  earnedDate: string;
  score: number;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (name: string, email: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  completeLesson: (lessonId: number) => void;
  saveQuizScore: (lessonId: number, score: number, total: number) => void;
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id'>) => void;
  updateDiaryEntry: (id: number, updates: Partial<DiaryEntry>) => void;
  deleteDiaryEntry: (id: number) => void;
  toggleFavoritePrayer: (prayerId: number) => void;
  earnCertificate: (lessonId: number, lessonTitle: string, score: number) => void;
  updatePrayerStreak: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const login = (name: string, email: string) => {
    const newUser: User = {
      name,
      email,
      joinDate: new Date().toISOString(),
      completedLessons: [],
      quizScores: {},
      diaryEntries: [],
      favoritePrayers: [],
      certificates: [],
      prayerStreak: 0,
      lastPrayerDate: null,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) setUser({ ...user, ...updates });
  };

  const completeLesson = (lessonId: number) => {
    if (!user) return;
    if (!user.completedLessons.includes(lessonId)) {
      setUser({ ...user, completedLessons: [...user.completedLessons, lessonId] });
    }
  };

  const saveQuizScore = (lessonId: number, score: number, total: number) => {
    if (!user) return;
    setUser({
      ...user,
      quizScores: { ...user.quizScores, [lessonId]: Math.round((score / total) * 100) },
    });
  };

  const addDiaryEntry = (entry: Omit<DiaryEntry, 'id'>) => {
    if (!user) return;
    const newEntry: DiaryEntry = { ...entry, id: Date.now() };
    setUser({ ...user, diaryEntries: [newEntry, ...user.diaryEntries] });
  };

  const updateDiaryEntry = (id: number, updates: Partial<DiaryEntry>) => {
    if (!user) return;
    setUser({
      ...user,
      diaryEntries: user.diaryEntries.map(e => e.id === id ? { ...e, ...updates } : e),
    });
  };

  const deleteDiaryEntry = (id: number) => {
    if (!user) return;
    setUser({ ...user, diaryEntries: user.diaryEntries.filter(e => e.id !== id) });
  };

  const toggleFavoritePrayer = (prayerId: number) => {
    if (!user) return;
    const favs = user.favoritePrayers.includes(prayerId)
      ? user.favoritePrayers.filter(id => id !== prayerId)
      : [...user.favoritePrayers, prayerId];
    setUser({ ...user, favoritePrayers: favs });
  };

  const earnCertificate = (lessonId: number, lessonTitle: string, score: number) => {
    if (!user) return;
    if (user.certificates.some(c => c.lessonId === lessonId)) return;
    const cert: Certificate = {
      id: Date.now(),
      lessonId,
      lessonTitle,
      earnedDate: new Date().toISOString(),
      score,
    };
    setUser({ ...user, certificates: [...user.certificates, cert] });
  };

  const updatePrayerStreak = () => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    if (user.lastPrayerDate === today) return;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const newStreak = user.lastPrayerDate === yesterday ? user.prayerStreak + 1 : 1;
    setUser({ ...user, prayerStreak: newStreak, lastPrayerDate: today });
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      logout,
      updateUser,
      completeLesson,
      saveQuizScore,
      addDiaryEntry,
      updateDiaryEntry,
      deleteDiaryEntry,
      toggleFavoritePrayer,
      earnCertificate,
      updatePrayerStreak,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}
