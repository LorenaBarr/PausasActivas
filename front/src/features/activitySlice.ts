// features/activitySlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Activity } from '../types/types'; // Importar tus tipos
 // Importar tus tipos

interface ActivityState {
    activities: Activity[]
    recommendedActivities: Activity[]
    categories: string[]
    completedToday: string[] // IDs de actividades completadas hoy
    isLoading: boolean
    error: string | null
    searchTerm: string
    selectedCategory: string
    canComplete: boolean // Para controlar el límite de 2 por día
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
        // Cargar actividades
        setActivities: (state, action: PayloadAction<Activity[]>) => {
            state.activities = action.payload
        },

        // Establecer actividades recomendadas
        setRecommendedActivities: (state, action: PayloadAction<Activity[]>) => {
            state.recommendedActivities = action.payload
        },

        // Completar actividad
        completeActivity: (state, action: PayloadAction<string>) => {
            const activityId = action.payload
            if (!state.completedToday.includes(activityId)) {
                state.completedToday.push(activityId)
                state.canComplete = state.completedToday.length < 2
            }
        },

        // Establecer actividades completadas hoy
        setCompletedToday: (state, action: PayloadAction<string[]>) => {
            state.completedToday = action.payload
            state.canComplete = action.payload.length < 2
        },

        // Filtros y búsqueda
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload
        },

        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload
        },

        // Estados de carga
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },

        // Limpiar datos al logout
        clearActivityData: (state) => {
            state.completedToday = []
            state.recommendedActivities = []
            state.canComplete = true
            state.searchTerm = ''
            state.selectedCategory = ''
        },

        // Reset daily counter (llamar a medianoche)
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