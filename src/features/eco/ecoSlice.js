import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 0,
  streak: 0,
  bestStreak: 0,
  history: [],
  activeItem: null, // Current WasteResult
  lastSortResult: null, // Feedback for sorting action
  activeTab: "scanner", // 'scanner' | 'demo' | 'sort' | 'history' | 'api'
  // Multi-waste queue state
  scanQueue: [],
  queueIndex: 0,
  isQueueActive: false,
  batchSummary: null,
};

export const ecoSlice = createSlice({
  name: "eco",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
      state.lastSortResult = null;
    },
    clearActiveItem: (state) => {
      state.activeItem = null;
      state.lastSortResult = null;
    },
    // Multi-item queue actions
    startScanQueue: (state, action) => {
      const items = action.payload || [];
      if (items.length === 0) return;
      state.scanQueue = items;
      state.queueIndex = 0;
      state.isQueueActive = true;
      state.activeItem = items[0];
      state.lastSortResult = null;
      state.batchSummary = {
        totalItems: items.length,
        itemsSorted: [],
        totalPoints: 0,
        correctCount: 0,
      };
    },
    advanceQueueItem: (state) => {
      if (!state.isQueueActive) return;
      if (state.queueIndex + 1 < state.scanQueue.length) {
        state.queueIndex += 1;
        state.activeItem = state.scanQueue[state.queueIndex];
        state.lastSortResult = null;
      } else {
        // Finished all items in queue
        state.isQueueActive = false;
        state.lastSortResult = null;
      }
    },
    cancelScanQueue: (state) => {
      state.scanQueue = [];
      state.queueIndex = 0;
      state.isQueueActive = false;
      state.batchSummary = null;
      state.lastSortResult = null;
    },
    recordSort: (state, action) => {
      const { item, selectedBin } = action.payload;
      if (!item) return;

      const isCorrect =
        selectedBin?.toLowerCase() === item.bin?.toLowerCase();

      let pointsEarned = 0;
      if (isCorrect) {
        state.streak += 1;
        if (state.streak > state.bestStreak) {
          state.bestStreak = state.streak;
        }
        pointsEarned = 10 + Math.min(state.streak * 2, 20); // 10 base + streak bonus
        state.score += pointsEarned;
      } else {
        state.streak = 0;
      }

      state.lastSortResult = {
        isCorrect,
        itemName: item.itemName,
        selectedBin,
        correctBin: item.bin,
        pointsEarned,
      };

      // If a multi-item batch queue is currently active, log to batchSummary
      if (state.isQueueActive && state.batchSummary) {
        state.batchSummary.totalPoints += pointsEarned;
        if (isCorrect) {
          state.batchSummary.correctCount += 1;
        }
        state.batchSummary.itemsSorted.push({
          itemName: item.itemName,
          category: item.category,
          correctBin: item.bin,
          userBin: selectedBin,
          isCorrect,
          pointsEarned,
        });
      }

      state.history.unshift({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        itemName: item.itemName,
        category: item.category,
        bin: item.bin,
        userBin: selectedBin,
        isCorrect,
        pointsEarned,
        timestamp: new Date().toISOString(),
      });

      // Keep recent 50 history entries
      if (state.history.length > 50) {
        state.history.pop();
      }
    },
    resetScore: (state) => {
      state.score = 0;
      state.streak = 0;
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const {
  setActiveTab,
  setActiveItem,
  clearActiveItem,
  startScanQueue,
  advanceQueueItem,
  cancelScanQueue,
  recordSort,
  resetScore,
  clearHistory,
} = ecoSlice.actions;

export default ecoSlice.reducer;
