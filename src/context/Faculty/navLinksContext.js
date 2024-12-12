import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useLocation } from "react-router";

const NavLinkContext = createContext({
  navLinksDisabled: false,
  setNavLinksDisabled: () => {},
  addObserver: () => {},
  notify: () => {},
  removeObserver: () => {},
});

export const NavLinkProvider = ({ children }) => {
  const [navLinksDisabled, setNavLinksDisabled] = useState(false);
  const [observers, setObservers] = useState({});
  const [_, setTransition] = useTransition();

  const location = useLocation();

  useEffect(() => {
    setObservers({});
    setNavLinksDisabled(false);
  }, [location]);

  const addObserver = (key, value, index) => {
    if (!observers?.[key]?.[index])
      setTransition(() => {
        setObservers((prev) => {
          const temp = prev;

          if (!temp[key]) {
            temp[key] = [];
          }

          temp[key][index] = value;
          return temp;
        });
      });
  };

  // evnet is just a string
  // helperFn is a function what ever the emitter want to send to the subscriber
  const notify = (event, helperFn) => {
    const subscribersList = observers[event];

    if (subscribersList) {
      subscribersList.forEach((sub) => {
        if (sub) sub(helperFn);
      });
    }
  };

  const removeObserver = (event, index) => {
    setObservers((prev) => {
      const temp = prev;

      if (temp[event] && temp[event]?.[index]) {
        temp[event][index] = undefined;
      }

      return temp;
    });
  };

  return (
    <NavLinkContext.Provider
      value={{
        navLinksDisabled,
        setNavLinksDisabled,
        addObserver,
        notify,
        removeObserver,
      }}
    >
      {children}
    </NavLinkContext.Provider>
  );
};

export const useNavLinkState = () => {
  return useContext(NavLinkContext);
};
