// features/authSlice.ts - Adaptado a tus tipos existentes
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { User, AuthState } from '../types/types'; // Importar tus tipos
 // Importar tus tipos

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
            state.error = null
        },
        loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
            state.isAuthenticated = false
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            state.error = null
        },
        updateUserInterests: (state, action: PayloadAction<string[]>) => {
            if (state.user) {
                state.user.interests = action.payload
                state.user.isFirstTime = false
            }
        },
        updateUserScore: (state, action: PayloadAction<{ points: number; streak?: number }>) => {
            if (state.user) {
                state.user.score = (state.user.score || 0) + action.payload.points
                if (action.payload.streak !== undefined) {
                    state.user.streak = action.payload.streak
                }
            }
        },
        addCompletedActivity: (state, action: PayloadAction<{ activityId: string; points: number }>) => {
            if (state.user) {
                const completedActivity = {
                    activityId: action.payload.activityId,
                    completedAt: new Date().toISOString(),
                    points: action.payload.points
                }

                if (!state.user.completedActivities) {
                    state.user.completedActivities = []
                }
                state.user.completedActivities.push(completedActivity)
            }
        },
        clearError: (state) => {
            state.error = null
        }
    },
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    updateUserInterests,
    updateUserScore,
    addCompletedActivity,
    clearError
} = authSlice.actions

export default authSlice.reducer