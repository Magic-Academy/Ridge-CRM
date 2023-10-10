import { createAction, createSlice } from "@reduxjs/toolkit";
import isOutDated from "../../utils/auth/is-out-date";
import localStorageService from "../../services/user/local.storage-service";
import meetingsService from "../../services/meeting/meetings.service";
import { createSelector } from "reselect";
import dayjs from "dayjs";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      isLoggedIn: true,
      dataLoaded: false,
      lastFetch: null,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
      dataLoaded: false,
      lastFetch: null,
    };

const meetingsSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    meetingsRequested: (state) => {
      state.isLoading = true;
    },
    meetingsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    meetingsFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    meetingCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    meetingUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((m) => m._id === action.payload._id)
      ] = action.payload;
    },
    meetingRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (meet) => meet._id !== action.payload
      );
    },
    meetingIsDoneStatus: (state, action) => {
      state.entities[
        state.entities.findIndex((m) => m._id === action.payload._id)
      ] = action.payload;
    },
  },
});

const meetingCreateRequested = createAction("meetings/meetingCreateRequested");
const createMeetingFailed = createAction("meetings/createMeetingFailed");
const meetingUpdateRequested = createAction("meetings/meetingUpdateRequested");
const meetingUpdateFailed = createAction("meetings/meetingUpdateFailed");
const removeMeetingRequested = createAction("meetings/removeMeetingRequested");
const removeMeetingFailed = createAction("meetings/removeMeetingFailed");
const meetingIsDoneRequested = createAction("meetings/meetingIsDoneRequested");
const meetingNotDoneRequested = createAction(
  "meetings/meetingNotDoneRequested"
);
const meetingIsDoneFailed = createAction("meetings/meetingIsDoneFailed");
const meetingNotDoneFailed = createAction("meetings/meetingNotDoneFailed");

const { reducer: meetingsReducer, actions } = meetingsSlice;
const {
  meetingsRequested,
  meetingsReceived,
  meetingsFailed,
  meetingCreated,
  meetingUpdateSuccessed,
  meetingRemoved,
  meetingIsDoneStatus,
} = actions;

export const loadMeetingsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().meetings;
  if (isOutDated(lastFetch)) {
    dispatch(meetingsRequested());
    try {
      const { content } = await meetingsService.get();
      dispatch(meetingsReceived(content));
    } catch (error) {
      meetingsFailed(error.message);
    }
  }
};

export function createMeeting(payload) {
  return async function (dispatch) {
    dispatch(meetingCreateRequested());
    try {
      const { content } = await meetingsService.create(payload);
      dispatch(meetingCreated(content));
    } catch (error) {
      dispatch(createMeetingFailed(error.message));
    }
  };
}

export const updateMeeting = (payload) => async (dispatch) => {
  dispatch(meetingUpdateRequested());
  try {
    dispatch(meetingUpdateSuccessed(payload));
    await meetingsService.update(payload);
  } catch (error) {
    dispatch(meetingUpdateFailed(error.message));
  }
};

export const removeMeeting = (meetingId) => async (dispatch) => {
  dispatch(removeMeetingRequested());
  try {
    dispatch(meetingRemoved(meetingId));
    await meetingsService.remove(meetingId);
  } catch (error) {
    dispatch(removeMeetingFailed(error.message));
  }
};

export const setIsDoneMeeting = (payload) => async (dispatch) => {
  dispatch(meetingIsDoneRequested());
  try {
    dispatch(meetingIsDoneStatus(payload));
    await meetingsService.update(payload);
  } catch (error) {
    dispatch(meetingIsDoneFailed(error.message));
  }
};

export const setIsNotDoneMeeting = (payload) => async (dispatch) => {
  dispatch(meetingNotDoneRequested());
  try {
    dispatch(meetingIsDoneStatus(payload));
    await meetingsService.update(payload);
  } catch (error) {
    dispatch(meetingNotDoneFailed(error.message));
  }
};

export const getMeetingsList = () => (state) => state.meetings.entities;

export const getObjectMeetingsList = (objectId) =>
  createSelector(
    (state) => state?.meetings?.entities,
    (meetings) => meetings?.filter((meet) => meet?.objectId === objectId)
  );

export const getMeetingLoadingStatus = () => (state) =>
  state.meetings.isLoading;

export const getDataMeetingsStatus = () => (state) => state.meetings.dataLoaded;

export const getMeetingById = (id) => (state) => {
  if (state.meetings.entities) {
    return state.meetings.entities.find((meet) => meet._id === id);
  }
};

export const getMeetingsByObjectId = (objectId) => (state) => {
  if (state.meetings.entities) {
    return state.meetings.entities.filter((meet) => meet.objectId === objectId);
  }
};

export const getMeetingsWeeklyList = () => (state) => {
  const currentDate = dayjs();
  const meetings = state.meetings.entities;

  const weeklyMeetings = meetings?.filter((meet) => {
    const createdAt = dayjs(meet?.date);
    const startOfWeek = currentDate.startOf('week');
    const endOfWeek = currentDate.endOf('week');
    return createdAt.isBetween(startOfWeek, endOfWeek)  && meet.isDone !== true;
  });

  return weeklyMeetings;
};

export default meetingsReducer;
