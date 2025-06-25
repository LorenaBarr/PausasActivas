import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface UserState {
    id: string | null
    name: string | null
    email: string | null
    interests: string[]
    score: number
    achievements: string[]
    streak: number
    notifications: {
        morning: string
        afternoon: string
        enabled: boolean
    }
    isFirstLogin: boolean
}

const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    interests: [],
    score: 0,
    achievements: [],
    streak: 0,
    notifications: {
        morning: '09:00',
        afternoon: '15:00',
        enabled: true
    },
    isFirstLogin: true
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ id: string, name: string, email: string }>) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.email = action.payload.email
        },
        updateUserInterests: (state, action: PayloadAction<string[]>) => {
            state.interests = action.payload
            state.isFirstLogin = false
        },
        addScore: (state, action: PayloadAction<number>) => {
            state.score += action.payload
        },
        updateStreak: (state, action: PayloadAction<number>) => {
            state.streak = action.payload
        },
        addAchievement: (state, action: PayloadAction<string>) => {
            if (!state.achievements.includes(action.payload)) {
                state.achievements.push(action.payload)
            }
        },
        updateNotifications: (state, action: PayloadAction<{ morning: string, afternoon: string, enabled: boolean }>) => {
            state.notifications = action.payload
        },
        resetUser: (state) => {
            return initialState
        }
    }
})

export const {
    setUser,
    updateUserInterests,
    addScore,
    updateStreak,
    addAchievement,
    updateNotifications,
    resetUser
} = userSlice.actions

export default userSlice.reducer