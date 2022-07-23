import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  cartItems: CartItem[];
  cartQuantity: number;
  removeFromCart: (id: number) => void;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function openCart() {
    setOpen(open ? false : true);
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function removeFromCart(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(id: number) {
    setCartItems((currentItems) => {
      const item = currentItems.find((item) => item.id === id);
      if (item === undefined) {
        return [...currentItems, { id, quantity: 1 }];
      }

      const updatedItem = currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return updatedItem;
    });
  }

  function decreaseItemQuantity(id: number) {
    setCartItems((currentItems) => {
      const item = currentItems.find((item) => item.id === id);
      if (item?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      }

      const updatedItem = currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return updatedItem;
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        cartItems,
        cartQuantity,
        removeFromCart,
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
