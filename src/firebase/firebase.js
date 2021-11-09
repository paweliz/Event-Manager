import {app, firestore} from './firebaseConfig';

export const getUserByUserId = async userId => {
  const result = await firestore()
    ?.collection('users')
    ?.where('userId', '==', userId)
    ?.get();

  const user = result.docs.map(item => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
};

export const updateAvatarUrl = async (docId, url) => {
  return firestore().collection('users').doc(docId).update({
    avatarUrl: url,
  });
};

export const updateUserEvents = async (docId, event, events, eventId) => {
  return firestore()
    .collection('users')
    .doc(docId)
    .update({
      events: [...(events && events), eventId],
    });
};

export const getCollection = async (collection, setData) => {
  return firestore()
    .collection(collection)
    .get()
    .then(data => {
      const dataList = [];
      data.forEach(doc => {
        let id = doc.id;
        dataList.push({...doc.data(), id});
      });
      setData(dataList);
    });
};
export const getSortedCollection = async (
  collection,
  sortingPosition,
  sortingMethod,
  filterCompare1,
  filterCompare2,
  filterMethod,
  limit,
) => {
  const firestoreCollection = firestore()
    .collection(collection)
    .orderBy(sortingPosition, sortingMethod);

  return limit > 0
    ? filterCompare1
      ? firestoreCollection
          .where(filterCompare1, filterMethod, filterCompare2)
          .limit(limit)
          .get()
      : firestoreCollection.limit(limit).get()
    : firestoreCollection.get();
};

export const processSortedCollection = async (
  collection,
  setData,
  sortingPosition,
  sortingMethod,
  filterCompare1,
  filterCompare2,
  filterMethod,
  limit,
) => {
  const firestoreCollection = await getSortedCollection(
    collection,
    sortingPosition,
    sortingMethod,
    filterCompare1,
    filterCompare2,
    filterMethod,
    limit,
  );
  const dataList = [];
  firestoreCollection.forEach(doc => {
    let id = doc.id;
    dataList.push({...doc.data(), id});
  });
  return setData(dataList);
};

export const getCollectionById = async (collection, setData, id) => {
  return firestore()
    ?.collection(collection)
    ?.doc(id)
    ?.get()
    .then(data => {
      setData(data.data());
    });
};

export const getCollectionByGivenParam = async (
  collection,
  setData,
  param1,
  param2,
) => {
  return firestore()
    .collection(collection)
    .where(param1, '==', param2)
    .get()
    .then(data => {
      const dataList = [];
      data.forEach(doc => {
        let id = doc.id;
        dataList.push({...doc.data(), id});
      });
      setData(dataList);
    });
};

export const updateEventParticipants = async (docId, participants, userId) => {
  return firestore()
    .collection('events')
    .doc(docId)
    .update({
      participants: [...participants, userId],
    });
};

export const removeFromEventParticipants = async (docId, participants) => {
  return firestore()
    .collection('events')
    .doc(docId)
    .update({
      participants: [...participants],
    });
};

export const deleteEvent = async docId => {
  return firestore().collection('events').doc(docId).delete();
};
