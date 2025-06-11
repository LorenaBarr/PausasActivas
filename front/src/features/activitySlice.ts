// features/activitySlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Activity {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
}

interface ActivityState {
    interests: string[];
    recommended: Activity[];
    completed: { id: number; date: string }[];
}

const initialState: ActivityState = {
    interests: [],
    recommended: [],
    completed: [],
};

const activitySlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {
        setInterests: (state, action: PayloadAction<string[]>) => {
            state.interests = action.payload;
        },
        setRecommended: (state, action: PayloadAction<Activity[]>) => {
            state.recommended = action.payload;
        },
        markCompleted: (state, action: PayloadAction<number>) => {
            if (state.completed.length < 2) {
                const date = new Date().toISOString();
                state.completed.push({ id: action.payload, date });
            }
        },
        resetCompleted: (state) => {
            state.completed = [];
        },
    },
});

export const { setInterests, setRecommended, markCompleted, resetCompleted } = activitySlice.actions;
export default activitySlice.reducer;
