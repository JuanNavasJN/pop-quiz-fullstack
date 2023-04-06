import { FC, createContext, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface IModalsContext {
  isAddEventModalOpen: boolean;
  toggleAddEventModal: () => void;
  isWriteReviewModalOpen: boolean;
  toggleWriteReviewModal: () => void;
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

  const toggleAddEventModal = () =>
    setIsAddEventModalOpen(!isAddEventModalOpen);

  const toggleWriteReviewModal = () =>
    setIsWriteReviewModalOpen(!isWriteReviewModalOpen);

  const context = {
    isAddEventModalOpen,
    toggleAddEventModal,
    isWriteReviewModalOpen,
    toggleWriteReviewModal,
  };

  return (
    <ModalsContext.Provider value={context}>{children}</ModalsContext.Provider>
  );
};

export default ModalsProvider;
