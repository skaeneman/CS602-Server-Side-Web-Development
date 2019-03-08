/*****************************************************************
 *  Connects to a MongoDB database, uses the Mongooseschema,
 *  and creates and saves the data for three products.
 *****************************************************************/

const mongoose = require('mongoose');
const credentials = require("./credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
    ':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

const connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true });

const ProductDb = require('./models/product.js');
const Product = ProductDb.getProductModel(connection);

connection.on("open", () => {

    // create and save document objects
    let product;

    console.log('creating product 1....')
    product = new Product({
        id: 1,
        name: 'guitar',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus, sem quis congue vulputate, neque erat faucibus nibh, ut pharetra ex purus non quam. Cras lobortis, augue a malesuada faucibus, quam neque imperdiet dui, non vulputate mi sem vel purus. Phasellus non facilisis massa. Ut sit amet mattis mi. Cras eu nulla nisl. Duis fringilla scelerisque condimentum. Praesent placerat commodo lacinia. Suspendisse finibus lectus sollicitudin, rutrum felis id, elementum libero. Ut magna lorem, varius a sagittis nec, vehicula ac ligula. Phasellus vulputate aliquet lectus, in rhoncus mauris convallis a. Praesent imperdiet nunc ut consequat condimentum.',
        price: 350,
        quantity: 10
    });
    product.save();
    
    console.log('creating product 2....')
    product = new Product({
        id: 2,
        name: 'drums',
        description: 'Mauris lacinia mattis dictum. Morbi vel malesuada turpis. Donec vestibulum nunc vehicula nulla dignissim porttitor. Maecenas pretium orci ipsum, in imperdiet quam finibus at. In sagittis quam sit amet interdum tincidunt. Curabitur euismod nisi justo, vitae lobortis augue facilisis quis. Nulla facilisi. Suspendisse eu purus mattis, egestas odio eu, rutrum tortor. Ut quis mollis quam.',
        price: 550,
        quantity: 15
    });
    product.save();

    console.log('creating product 3....')
    product = new Product({
        id: 3,
        name: 'piano',
        description: 'Donec eleifend bibendum ligula a blandit. Sed ex libero, suscipit nec eros at, porttitor rhoncus neque. Integer a ipsum convallis, molestie tellus at, malesuada eros. Integer mi risus, consectetur vitae condimentum id, tristique eget nisi. Donec sagittis, libero nec imperdiet porta, libero leo porta tortor, eu placerat odio nisi vel arcu. Morbi sed mi ac ligula sollicitudin ultricies at quis lacus. Praesent ut augue et nisi volutpat sagittis quis sed ante. Pellentesque faucibus condimentum dolor, a volutpat libero iaculis quis.',
        price: 950,
        quantity: 20
    });
    product.save((err) => {
        connection.close();
        if (err) throw err;
        console.log("Successfully saved all products!");
        process.exit();
    });

});









