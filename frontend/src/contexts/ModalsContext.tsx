import { FC, createContext, useState, ReactNode } from "react";
import { Review } from "../repositories/reviews";

interface Props {
  children: ReactNode;
}

interface IModalsContext {
  isAddEventModalOpen: boolean;
  toggleAddEventModal: () => void;
  isWriteReviewModalOpen: boolean;
  toggleWriteReviewModal: (eventId?: string, myReview?: Review) => void;
  eventId?: string;
  myReview?: Review;
}

export const ModalsContext = createContext<IModalsContext>({
  isAddEventModalOpen: false,
  toggleAddEventModal: () => {},
  isWriteReviewModalOpen: false,
  toggleWriteReviewModal: () => {},
});

const ModalsProvider: FC<Props> = ({ children }) => {
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] = useState(false);
  const [eventId, setEventId] = useState<string>();
  const [myReview, setMyReview] = useState<Review>();

  const toggleAddEventModal = () =>
    setIsAddEventModalOpen(!isAddEventModalOpen);

  const toggleWriteReviewModal = (eventId?: string, myReview?: Review) => {
    if (isWriteReviewModalOpen) {
      setIsWriteReviewModalOpen(false);
      setEventId(undefined);
      setMyReview(undefined);
    } else {
      setIsWriteReviewModalOpen(true);
      setEventId(eventId);
      setMyReview(myReview);
    }
  };

  const context = {
    isAddEventModalOpen,
    toggleAddEventModal,
    isWriteReviewModalOpen,
    toggleWriteReviewModal,
    eventId,
    myReview,
  };

  return (
    <ModalsContext.Provider value={context}>{children}</ModalsContext.Provider>
  );
};

export default ModalsProvider;
