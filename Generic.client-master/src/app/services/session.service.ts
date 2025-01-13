import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SessionData {
  status: 'active' | 'inactive';
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    emailVerified: boolean;
    phoneVerified: boolean;
  } | null;
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessionKey = 'session';
  private sessionSubject = new BehaviorSubject<SessionData>({
    status: 'inactive',
    user: null,
  });
  session$ = this.sessionSubject.asObservable(); // Observable for session updates

  constructor() {
    const sessionData = this.getSession();
    if (sessionData) {
      this.sessionSubject.next(sessionData); // Initialize with existing session data if available
    } else {
      this.setSession({ status: 'inactive', user: null }); // Default state is inactive
    }
  }

  private isSessionStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
    } catch (error) {
      console.error('SessionStorage check failed:', error);
      return false;
    }
  }

  getSession(): SessionData | null {
    if (this.isSessionStorageAvailable()) {
      const sessionData = sessionStorage.getItem(this.sessionKey);
      try {
        return sessionData ? JSON.parse(sessionData) : null;
      } catch (error) {
        console.error('Error parsing session data:', error);
        return null;
      }
    }
    console.warn('SessionStorage is not available. get');
    return null;
  }

  setSession(data: SessionData): void {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.setItem(this.sessionKey, JSON.stringify(data));
      this.sessionSubject.next(data); // Notify subscribers
    } else {
      console.warn('SessionStorage is not available. set');
    }
  }

  clearSession(): void {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.removeItem(this.sessionKey);
      this.sessionSubject.next({ status: 'inactive', user: null }); // Reset session state
    } else {
      console.warn('SessionStorage is not available. clear');
    }
  }

  login(user: SessionData['user']): void {
    if (user) {
      const sessionData: SessionData = {
        status: 'active',
        user,
      };
      this.setSession(sessionData);
      console.log('User logged in. Session updated:', sessionData);
    } else {
      console.warn('Invalid user data provided for login.');
    }
  }

  logout(): void {
    this.clearSession();
    console.log('User logged out.');
  }

  updateUserPhoneVerified(status: boolean): void {
    const currentSession = this.getSession();
    if (currentSession?.user) {
      currentSession.user.phoneVerified = status; // Update phoneVerified
      this.setSession(currentSession); // Save updated session
      console.log('Updated user phone verification status:', currentSession);
    } else {
      console.warn('No active session or user found to update phone verification.');
    }
  }

  updateUserEmailVerified(status: boolean): void {
    const currentSession = this.getSession();
    if (currentSession?.user) {
      currentSession.user.emailVerified = status; // Update emailVerified
      this.setSession(currentSession); // Save updated session
      console.log('Updated user email verification status:', currentSession);
    } else {
      console.warn('No active session or user found to update email verification.');
    }
  }
}
