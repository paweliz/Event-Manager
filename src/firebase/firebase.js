import { db, firestore } from './firebaseConfig';
import { query, collection, where, getDocs } from 'firebase/firestore';
// import app from './firebaseConfig';

// const db = getFirestore(app);

export const getUserByUserId = async userId => {
  const result = await firestore()
    .collection('users')
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

export const updateFullName = async (docId, fullName) => {
  return firestore().collection('users').doc(docId).update({
    fullName: fullName,
  });
};

export const updateFavCategory = async (docId, category) => {
  return firestore().collection('users').doc(docId).update({
    favouriteCategory: category,
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

export const updateUserAttendingEvents = async (docId, events, eventId) => {
  return firestore()
    .collection('users')
    .doc(docId)
    .update({
      attendingEvents: [...(events && events), eventId],
    });
};

export const leaveAttendingUserEvents = async (docId, events) => {
  return firestore()
    .collection('users')
    .doc(docId)
    .update({
      attendingEvents: [...events],
    });
};

export const deleteUserEvent = async (docId, events, eventId) => {
  const returnEvents = events?.filter(event => {
    return event !== eventId;
  });
  return firestore().collection('users').doc(docId).update({
    events: returnEvents,
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
        dataList.push({ ...doc.data(), id });
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
    dataList.push({ ...doc.data(), id });
  });
  return setData(dataList);
};

export const getEventById = async id => {
  const result = await firestore().collection('events')?.doc(id)?.get();
  const eventData = [];
  eventData.push({ ...result.data(), id });
  return eventData;
};

export const getCollectionById = async (collection, setData, id) => {
  return firestore()
    .collection(collection)
    ?.doc(id)
    ?.get()
    .then(data => {
      setData(data.data());
    });
};

export const getFilteredEvents = async (
  setData,
  category,
  date,
  endDate,
  maxParticipants,
) => {
  const q = query(
    collection(db, 'events'),
    category
      ? where('category', '==', category)
      : where('querable', '==', true),
    date ? where('date', '==', date) : where('querable', '==', true),
    endDate ? where('endDate', '==', endDate) : where('querable', '==', true),
    maxParticipants
      ? where('maxParticipants', '==', maxParticipants)
      : where('querable', '==', true),
  );
  const docsSnap = await getDocs(q).then(docsSnap => {
    const dataList = [];
    docsSnap.forEach(doc => {
      let id = doc.id;
      //      console.log(doc.data());
      dataList.push({ ...doc.data(), id });
    });
    setData(dataList);
  });
  return docsSnap;
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
        dataList.push({ ...doc.data(), id });
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

export const deleteImageFromStorage = async urlRef => {
  return urlRef.delete();
};
