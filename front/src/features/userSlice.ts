// features/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface HistoryEntry {
    date: string;
    activities: string[];
}

interface UserState {
    points: number;
    streak: number;
    achievements: string[];
    history: HistoryEntry[];
}

const initialState: UserState = {
    points: 0,
    streak: 0,
    achievements: [],
    history: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addPoints: (state, action: PayloadAction<number>) => {
            state.points += action.payload;
        },
        updateStreak: (state, action: PayloadAction<number>) => {
            state.streak = action.payload;
        },
        addAchievement: (state, action: PayloadAction<string>) => {
            if (!state.achievements.includes(action.payload)) {
                state.achievements.push(action.payload);
            }
        },
        addHistory: (state, action: PayloadAction<HistoryEntry>) => {
            state.history.push(action.payload);
        },
    },
});

export const { addPoints, updateStreak, addAchievement, addHistory } = userSlice.actions;
export default userSlice.reducer;
