import { reactive, computed } from 'vue'

export const cartState = reactive({
  items: []
})

// 🟢 Helper function to convert Khmer digits (០-៩) to Standard digits (0-9)
function convertKhmerToStandardNumber(khmerPriceString) {
  if (!khmerPriceString) return 0
  
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩']
  
  // Convert the string character by character if it finds a Khmer digit
  let standardizedString = khmerPriceString.split('').map(char => {
    const index = khmerDigits.indexOf(char)
    return index !== -1 ? index : char
  }).join('')

  // Strip away everything except numbers and decimal points (like extracting 6.50 from $៦.៥០)
  const cleanNumber = parseFloat(standardizedString.replace(/[^0-9.]/g, ''))
  return isNaN(cleanNumber) ? 0 : cleanNumber
}

export const useCart = () => {
  const addToCart = (product, quantity, variantLabel) => {
    const existingItem = cartState.items.find(
      item => item.id === product.id && item.variant === variantLabel
    )

    // 🟢 Safely extract the calculated number value using our helper
    const calculatedPrice = convertKhmerToStandardNumber(product.price)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartState.items.push({
        id: product.id,
        title: product.title,
        subTitle: product.subTitle,
        price: calculatedPrice, // Saved as a raw clean number for math calculations (e.g. 6.5)
        rawKhmerPrice: product.price, // Kept to display original "$៦.៥០" string if needed
        quantity: quantity,
        variant: variantLabel,
        image: product.image
      })
    }
  }

  const removeFromCart = (index) => {
    cartState.items.splice(index, 1)
  }

  const clearCart = () => {
    cartState.items = []
  }

  return {
    cart: computed(() => cartState.items),
    addToCart,
    removeFromCart,
    clearCart
  }
}