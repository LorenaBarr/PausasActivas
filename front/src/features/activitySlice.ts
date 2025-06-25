import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Activity } from '../types/types';

interface ActivityState {
    activities: Activity[]
    recommendedActivities: Activity[]
    categories: string[]
    completedToday: string[]
    isLoading: boolean
    error: string | null
    searchTerm: string
    selectedCategory: string
    canComplete: boolean
}

const initialState: ActivityState = {
    activities: [],
    recommendedActivities: [],
    categories: [],
        
    completedToday: [],
    isLoading: false,
    error: null,
    searchTerm: '',
    selectedCategory: '',
    canComplete: true,
}

const activitySlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {
        setActivities: (state, action: PayloadAction<Activity[]>) => {
            state.activities = action.payload
        },

        setRecommendedActivities: (state, action: PayloadAction<Activity[]>) => {
            state.recommendedActivities = action.payload
        },

        completeActivity: (state, action: PayloadAction<string>) => {
            const activityId = action.payload
            if (!state.completedToday.includes(activityId)) {
                state.completedToday.push(activityId)
                state.canComplete = state.completedToday.length < 2
            }
        },

        setCompletedToday: (state, action: PayloadAction<string[]>) => {
            state.completedToday = action.payload
            state.canComplete = action.payload.length < 2
        },

        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload
        },

        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },

        clearActivityData: (state) => {
            state.completedToday = []
            state.recommendedActivities = []
            state.canComplete = true
            state.searchTerm = ''
            state.selectedCategory = ''
        },

        resetDailyCounter: (state) => {
            state.completedToday = []
            state.canComplete = true
        }
    },
})

export const {
    setActivities,
    setRecommendedActivities,
    completeActivity,
    setCompletedToday,
    setSearchTerm,
    setSelectedCategory,
    setLoading,
    setError,
    clearActivityData,
    resetDailyCounter
} = activitySlice.actions

export default activitySlice.reducer