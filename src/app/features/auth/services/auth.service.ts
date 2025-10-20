import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserCredentials, CreateUserDTO } from '../../../core/models/user';

/**
 * Service responsible for handling all authentication-related operations.
 * Manages user state, registration, login, and logout functionality.
 * Uses LocalStorage for persisting user data.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Storage keys
  private readonly USERS_STORAGE_KEY = 'ct_users';
  private readonly CURRENT_USER_KEY = 'ct_current_user';

  // Current user state using signals
  readonly currentUser = signal<User | null>(null);

  constructor(private router: Router) {
    // Initialize current user from localStorage if exists
    this.loadCurrentUser();
  }

  /**
   * Registers a new user in the system.
   * @param userData The user registration data
   * @returns The created user object
   * @throws Error if email already exists
   */
  register(userData: CreateUserDTO): User {
    const users = this.getStoredUsers();
    
    // Check if email already exists
    if (users.some(user => user.email === userData.email)) {
      throw new Error('Email already exists');
    }

    // Create new user object
    const newUser: User = {
      id: crypto.randomUUID(),
      email: userData.email,
      password: userData.password,  // Educational only! Never store plain text passwords in real apps
      username: userData.username,
      createdAt: new Date(),
      lists: {
        watchlist: [],
        watched: [],
        favorites: []
      }
    };

    // Store user
    users.push(newUser);
    this.saveUsers(users);

    // Set as current user
    this.setCurrentUser(newUser);
    return newUser;
  }

  /**
   * Authenticates a user with email and password.
   * @param credentials User login credentials
   * @returns The user object if authentication successful
   * @throws Error if credentials are invalid
   */
  login(credentials: UserCredentials): User {
    const users = this.getStoredUsers();
    const user = users.find(u => u.email === credentials.email);

    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid credentials');
    }

    // IMPORTANT: Educational purposes only!
    // In a real application:
    // 1. Never store or compare plain text passwords
    // 2. Use proper password hashing (e.g., bcrypt)
    // 3. Implement proper authentication with a secure backend
    // 4. Use HTTPS for all authentication requests
    
    this.setCurrentUser(user);
    return user;
  }

  /**
   * Logs out the current user and clears their session.
   */
  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  /**
   * Checks if a user is currently logged in.
   * @returns true if a user is logged in, false otherwise
   */
  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  /**
   * Updates the user's lists (watchlist, watched, favorites).
   * @param userId The ID of the user to update
   * @param lists The new lists object
   */
  updateUserLists(userId: string, lists: User['lists']): void {
    const users = this.getStoredUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex] = {
      ...users[userIndex],
      lists
    };

    this.saveUsers(users);

    // Update current user if it's the same user
    if (this.currentUser()?.id === userId) {
      this.setCurrentUser(users[userIndex]);
    }
  }

  // Private helper methods

  /**
   * Loads the current user from localStorage during service initialization.
   */
  private loadCurrentUser(): void {
    const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        this.currentUser.set(user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem(this.CURRENT_USER_KEY);
      }
    }
  }

  /**
   * Sets the current user and saves it to localStorage.
   */
  private setCurrentUser(user: User): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }

  /**
   * Retrieves all users from localStorage.
   */
  private getStoredUsers(): User[] {
    const users = localStorage.getItem(this.USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  /**
   * Saves the users array to localStorage.
   */
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
  }
}