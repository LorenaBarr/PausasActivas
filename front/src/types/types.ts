export interface User {
    id: number;
    nombre: string;
    email: string;
    score?: number;
    interests?: string[];
    isFirstTime?: boolean;
    streak?: number;
    level?: string;
    completedActivities?: CompletedActivity[];
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
  }

export interface Activity {
    id: string;
    name: string;
    category: string;
    description: string;
    instructions: string;
    imageUrl?: string;
    videoUrl?: string;
    duration: number; // en minutos
    difficulty: 'Fácil' | 'Medio' | 'Difícil';
    points: number;
}

export interface CompletedActivity {
    activityId: string;
    completedAt: string;
    points: number;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

// Props para componentes
export interface InterestModalProps {
    onClose: () => void;
}

export interface ActivityCardProps {
    activity: Activity;
    onComplete: (activityId: string) => void;
    isCompleted: boolean;
    isRecommended: boolean;
    canComplete: boolean;
}

export interface NavbarProps {
    onSearch: (term: string) => void;
    onCategoryFilter: (category: string) => void;
    categories: string[];
    selectedCategory: string;
}
