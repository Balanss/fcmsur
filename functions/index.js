const functions = require("firebase-functions");
const algoliasearch = require('algoliasearch');
const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;


const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('mel');
const index1 = client.initIndex('elliot');
const index2 = client.initIndex('miquel');
const index3 = client.initIndex('mitchel')
const index4 = client.initIndex('valerie')
const index5 = client.initIndex('imanuel')

exports.addToIndex = functions.firestore.document('mel/{melId}')

    .onCreate(snapshot => {
        const data = snapshot.data();
        const objectID = snapshot.id;
        return index.saveObject({ ...data, objectID });
    });


    exports.deleteFromIndex = functions.firestore.document('mel/{melId}')

        .onDelete(snapshot => index.deleteObject(snapshot.id));


///


        exports.addToIndex1 = functions.firestore.document('elliot/{elliotId}')

            .onCreate(snapshot => {
                const data = snapshot.data();
                const objectID = snapshot.id;
                return index1.saveObject({ ...data, objectID });
            });


            exports.deleteFromIndex1 = functions.firestore.document('elliot/{elliotId}')

                .onDelete(snapshot => index1.deleteObject(snapshot.id));


///

                exports.addToIndex2 = functions.firestore.document('miquel/{miquelId}')

                    .onCreate(snapshot => {
                        const data = snapshot.data();
                        const objectID = snapshot.id;
                        return index2.saveObject({ ...data, objectID });
                    });



                    exports.deleteFromIndex2 = functions.firestore.document('miquel/{miquelId}')

                        .onDelete(snapshot => index2.deleteObject(snapshot.id));


                        ///

                        exports.addToIndex3 = functions.firestore.document('mitchel/{mitchelId}')

                            .onCreate(snapshot => {
                                const data = snapshot.data();
                                const objectID = snapshot.id;
                                return index3.saveObject({ ...data, objectID });
                            });


                            exports.deleteFromIndex3 = functions.firestore.document('valerie/{valerieId}')

                                .onDelete(snapshot => index3.deleteObject(snapshot.id));

//////

exports.addToIndex4 = functions.firestore.document('valerie/{valerieId}')

    .onCreate(snapshot => {
        const data = snapshot.data();
        const objectID = snapshot.id;
        return index4.saveObject({ ...data, objectID });
    });


    exports.deleteFromIndex4 = functions.firestore.document('valerie/{valerieId}')

        .onDelete(snapshot => index4.deleteObject(snapshot.id));


        //////

        exports.addToIndex5 = functions.firestore.document('imanuel/{imanuelId}')

            .onCreate(snapshot => {
                const data = snapshot.data();
                const objectID = snapshot.id;
                return index5.saveObject({ ...data, objectID });
            });


            exports.deleteFromIndex5 = functions.firestore.document('imanuel/{imanuelId}')

                .onDelete(snapshot => index5.deleteObject(snapshot.id));
