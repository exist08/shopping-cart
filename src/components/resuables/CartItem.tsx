import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import type { CartItem as CartItemType } from '../../types/product'
interface CartItemProps {
    item: CartItemType;
    handleQuantityChange: (productId: number, newQuantity: number) => void;
    handleRemoveItem: (productId: number) => void;
}
function CartItem({ item, handleQuantityChange, handleRemoveItem }: CartItemProps) {
    return (
        <div>

            <div className="flex items-center gap-4 p-4 border-b border-gray-200 last:border-b-0">
                <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-20 h-20 object-contain rounded-md"
                />

                <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.product.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.product.description}</p>
                    <p className="text-lg font-bold text-gray-900">${item.product.price}</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        disabled={item.quantity <= 1}
                    >
                        <FaMinus size={12} />
                    </button>

                    <span className="font-semibold text-lg min-w-8 text-center">{item.quantity}</span>

                    <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <FaPlus size={12} />
                    </button>
                </div>

                <div className="text-right">
                    <p className="font-bold text-lg">${(item.product.price * item.quantity).toFixed(2)}</p>
                    <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors mt-2"
                    >
                        <FaTrash size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem