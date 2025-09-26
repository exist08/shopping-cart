import { FaShoppingCart } from "react-icons/fa";
import { useAtomValue } from 'jotai';
import { cartCountAtom } from '../../store/cartAtoms';

function CartIcon() {
  const cartCount = useAtomValue(cartCountAtom);

  return (
    <div className="relative">
      <FaShoppingCart size={24} />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full min-w-4 h-4 flex items-center justify-center px-1">
          {cartCount}
        </span>
      )}
    </div>
  );
}

export default CartIcon;
