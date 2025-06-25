import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authSlice from '../features/authSlice'
import activitySlice from '../features/activitySlice'

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('pausasActivasState')
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (error) {
        console.warn('Error loading state from localStorage:', error)
        // Limpia el estado corrupto
        localStorage.removeItem('pausasActivasState')
        return undefined
    }
}

const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('pausasActivasState', serializedState)
    } catch (error) {
        console.warn('Error saving state to localStorage:', error)
    }
}

const persistedState = loadState()

const rootReducer = combineReducers({
    auth: authSlice,
    activities: activitySlice,
})

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
})

store.subscribe(() => {
    const state = store.getState()
    saveState({
        auth: {
            user: state.auth.user,
            token: state.auth.token,
            isAuthenticated: state.auth.isAuthenticated,
        },
        activities: {
            completedToday: state.activities.completedToday,
            selectedCategory: state.activities.selectedCategory,
            searchTerm: state.activities.searchTerm,
        }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch