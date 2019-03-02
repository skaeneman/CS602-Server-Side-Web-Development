// when a user adds a product the shopping cart is recreated 
// existing products and quantities are passed in if any exist
module.exports = function Cart(existingCartProducts) {
    // pass any existing products from previous cart to the newly created cart
    this.products = existingCartProducts.products;
    this.cartQuantity = existingCartProducts.cartQuantity;
    this.cartTotal = existingCartProducts.cartTotal;   

    // if there is no existng product then set to an empty object
    if (this.products == null && this.cartQuantity == null && this.cartTotal == null) {
        // there is no existing products in cart so set to empty objects
        this.products = {};
        this.cartQuantity = 0;
        this.cartTotal = 0;
    }
    else{
        // there were exsiting products in cart so save them off
        this.products = existingCartProducts.products;
        this.cartQuantity = existingCartProducts.cartQuantity;
        this.cartTotal = existingCartProducts.cartTotal;        
    }; 
     
    // function to get an array of the products in the cart
    this.getProductList = () => {
        var productsArray = [];  // create empty array to hold products in cart
        // console.log(this.products);
        for (var prodId in this.products) {
            // push each product in the cart into the array
            productsArray.push(this.products[prodId]);
        };
        return productsArray;
    };

}

// function to get an array of the quantity
// module.exports.getProductCount = (qty) => {
//     var productCountArr = [];
//     for (var i = 0; i <= qty; i++) {
//         productCountArr.push(i);
//     };
//     return productCountArr;
// };



















