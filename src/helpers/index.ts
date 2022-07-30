import { formatDistance } from "date-fns";
import {
  DocumentData,
  onSnapshot,
  Query,
  QuerySnapshot,
} from "firebase/firestore";
import { useEffect } from "react";

export interface AppUser {
  id: string;
  name: string;
  photoURL: string;
}

export const useRealtimeDocs = (
  q: Query<DocumentData>,
  cb: (q: QuerySnapshot<DocumentData>) => void,
  dependencies = []
) => {
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      cb(querySnapshot);
    });

    return () => unsubscribe();
  }, dependencies);
};
