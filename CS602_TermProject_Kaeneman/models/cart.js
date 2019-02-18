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
 
    this.addProductToCart = (prod) => {
        var id = prod.id;
        // get product and store in variable
        var productInCart = this.products[id];
        // check if the product the user added is already in the cart
        if (!productInCart) {
            // if the product is not already in the cart then create the product
            this.products[id] = { prod: prod, price: 0, quantity: 0 }
            productInCart = this.products[id];  // store the new product in variable 
        }
        // increment the product quantity count by 1
        productInCart.quantity += 1;
        // price of the product added multiplied by the quantity in cart
        productInCart.price = productInCart.prod.price * productInCart.quantity;
        this.cartQuantity += 1;  // increment the cart quantity 
        this.cartTotal += productInCart.prod.price;  // add product price to cartTotal
    };

    // function to get an array of the products in the cart
    this.getProductList = () => {
        var productsArray = [];  // create empty array to hold products in cart
        
        for($i = 0; $i < this.products.length; $i++) {
            // push each product in the cart into the array
            productsArray.push(this.products[id]);
        };
        return productsArray;
    };


}





















