import React, { useEffect, useState, type FC } from "react";
import ChatList from "../../components/common/AdminCommon/ComplaintsManagement/ChatList";
import ChatWindow from "../../components/common/AdminCommon/ComplaintsManagement/ChatWindow";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import Loading from "../../components/common/Loading";
import EroorPage from "../error/index";
import { setComplaints } from "../../redux/complaints/FetchComplaints"; // you'll create this

export const ComplaintsManagement: FC = () => {
  const [selectedUserId, setSelectedUserId] = useState("1");

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.complaints
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "complaints"),
      (snapshot) => {
        const complaints = snapshot.docs.map((doc) => {
          const rawData = doc.data();
          return {
            id: doc.id,
            ...rawData,
            createdAt: rawData.createdAt?.toDate().toISOString() || null,
          };
        });

        dispatch(setComplaints(complaints));
      },
      (err) => {
        console.error("Live update error", err);
      }
    );

    return () => unsubscribe(); // clean up on unmount
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <EroorPage />;

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full md:w-1/3 h-full dark:bg-gray-900 bg-white shadow-md border-r transition duration-300">
        <ChatList
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
        />
      </div>
      <div className="flex-1 h-full bg-[#f5f5dc] dark:bg-gray-900 overflow-y-auto transition duration-300">
        <ChatWindow userId={selectedUserId} />
      </div>
    </div>
  );
};

export default ComplaintsManagement;
