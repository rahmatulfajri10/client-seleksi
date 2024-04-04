import { createSlice } from "@reduxjs/toolkit";

/* create reducer */
export const questionReducer = createSlice({
  name: "question",
  initialState: {
    queue: [],
    selectedAnswers: [],
    trace: 0,
  },
  reducers: {
    startExamAction: (state, action) => {
      return {
        ...state,
        queue: action.payload,
      };
    },
    moveNextAction: (state) => {
      return {
        ...state,
        trace: state.trace + 1,
      };
    },
    movePrevAction: (state) => {
      return {
        ...state,
        trace: state.trace - 1,
      };
    },
    moveNumberAction: (state, action) => {
      return {
        ...state,
        trace: action.payload - 1,
      };
    },
    saveSelectedAnswer: (state, action) => {
      const existingAnswerIndex = state.selectedAnswers.findIndex(
        (answer) => answer.id_question === action.payload.id_question
      );

      if (existingAnswerIndex >= 0) {
        // Replace the existing answer with the new one
        state.selectedAnswers[existingAnswerIndex] = action.payload;
      } else {
        // Add the new answer to the array
        state.selectedAnswers.push(action.payload);
      }
    },
    resetAllAction: () => {
      return {
        queue: [],
        selectedAnswers: [],
        trace: 0,
      };
    },
  },
});

export const {
  startExamAction,
  moveNextAction,
  movePrevAction,
  moveNumberAction,
  saveSelectedAnswer,
  resetAllAction,
} = questionReducer.actions;
export default questionReducer.reducer;
