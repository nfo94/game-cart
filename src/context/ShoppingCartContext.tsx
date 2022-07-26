import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { api } from "../services/api";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
  price: number;
};

type StoredItem = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

type ShoppingCartContext = {
  isOpen: boolean;
  total: number;
  openCart: () => void;
  cartItems: CartItem[];
  storedItems: StoredItem[];
  cartQuantity: number;
  removeFromCart: (id: number) => void;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number, price: number) => void;
  decreaseItemQuantity: (id: number, price: number) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [storedItems, setStoredItems] = useState<StoredItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shoppingCart",
    []
  );

  useEffect(() => {
    api.get("/store").then((response) => setStoredItems(response.data));
  }, []);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const total = cartItems.reduce((acc, obj) => {
    return acc + obj.quantity * obj.price;
  }, 0);

  function openCart() {
    setIsOpen(!isOpen);
  }

  function removeFromCart(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(id: number, price: number) {
    setCartItems((currentItems) => {
      const item = currentItems.find((item) => item.id === id);
      if (item === undefined) {
        return [...currentItems, { id, quantity: 1, price }];
      }

      const updatedItem = currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1, price };
        }
        return item;
      });
      return updatedItem;
    });
  }

  function decreaseItemQuantity(id: number, price: number) {
    setCartItems((currentItems) => {
      const item = currentItems.find((item) => item.id === id);
      if (item?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      }

      const updatedItem = currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1, price };
        }
        return item;
      });
      return updatedItem;
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        isOpen,
        total,
        openCart,
        cartItems,
        storedItems,
        cartQuantity,
        removeFromCart,
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
      }}
    >
      {children}
      <ShoppingCart />
    </ShoppingCartContext.Provider>
  );
}
