// This is a mock authentication service.
// In a real application, this would be replaced with calls to a secure backend API.

export interface User {
  email: string;
  profilePicture?: string | null;
}

export interface Credentials {
  email:string;
  password?: string;
}

const USERS_KEY = 'task_scheduler_users';
const CURRENT_USER_KEY = 'task_scheduler_current_user';

// Helper to get users from localStorage
const getUsers = (): (Credentials & User)[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Helper to save users to localStorage
const saveUsers = (users: (Credentials & User)[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const signup = (credentials: Credentials): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      if (users.find(u => u.email === credentials.email)) {
        return reject(new Error('An account with this email already exists.'));
      }
      
      const newUser = { email: credentials.email, password: credentials.password, profilePicture: null };
      users.push(newUser);
      saveUsers(users);
      
      const sessionUser = { email: newUser.email, profilePicture: newUser.profilePicture };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
      resolve(sessionUser);
    }, 500);
  });
};

export const login = (credentials: Credentials): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const user = users.find(u => u.email === credentials.email);
      
      if (!user || user.password !== credentials.password) {
        return reject(new Error('Invalid email or password.'));
      }

      const sessionUser = { email: user.email, profilePicture: user.profilePicture || null };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
      resolve(sessionUser);
    }, 500);
  });
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const updateUserProfilePicture = (email: string, picture: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = getUsers();
            const userIndex = users.findIndex(u => u.email === email);
            if (userIndex === -1) {
                return reject(new Error('User not found.'));
            }
            
            users[userIndex].profilePicture = picture;
            saveUsers(users);

            const currentUser = getCurrentUser();
            if (currentUser && currentUser.email === email) {
                const updatedCurrentUser = { ...currentUser, profilePicture: picture };
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedCurrentUser));
                resolve(updatedCurrentUser);
            } else {
                resolve({ email, profilePicture: picture });
            }
        }, 200);
    });
};

export const changePassword = (email: string, currentPassword: string, newPassword: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = getUsers();
            const userIndex = users.findIndex(u => u.email === email);
            if (userIndex === -1) {
                return reject(new Error('User not found.'));
            }
            if (users[userIndex].password !== currentPassword) {
                return reject(new Error('Incorrect current password.'));
            }

            users[userIndex].password = newPassword;
            saveUsers(users);
            resolve();
        }, 500);
    });
}