import { SET_DOC_ID } from './types';

export const setDocId = (docId) => {
  return {
    type: SET_DOC_ID,
    payload: docId,
  };
};