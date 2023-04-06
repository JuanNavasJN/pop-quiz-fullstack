import { FC, createContext, useState, ReactNode } from "react";
import { NotityTypes } from "../components/shared/Notify";

interface Props {
  children: ReactNode;
}

interface NotifyParams {
  type: NotityTypes;
  message: string;
}

interface INotifyContext {
  isOpen: boolean;
  message: string;
  notify: (params: NotifyParams) => void;
  type: NotityTypes;
  notifyOff: () => void;
}

export const NotifyContext = createContext<INotifyContext>({
  isOpen: false,
  message: "",
  notify: () => {},
  type: "info",
  notifyOff: () => {},
});

const NotifyProvider: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotityTypes>("info");

  const notify = ({ type, message }: NotifyParams) => {
    setIsOpen(true);
    setMessage(message);
    setType(type);
  };

  const notifyOff = () => setIsOpen(false);

  const context = {
    isOpen,
    message,
    type,
    notify,
    notifyOff,
  };

  return (
    <NotifyContext.Provider value={context}>{children}</NotifyContext.Provider>
  );
};

export default NotifyProvider;
