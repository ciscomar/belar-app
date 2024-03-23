const deliveryFunctions = {};
const schemas = require('../schemas/schemas_MONGO')


deliveryFunctions.insertDelivery = async (user, destination, date, serials, selectedShelf) => {
  try {
    const insertDelivery = await schemas.deliverySchema.create({user, destination, date, serials, status:'active'});
    if(!insertDelivery) throw new Error('Error inserting delivery')
    const updateProduction = await schemas.productionSchema.updateMany({serial:{$in:serials}}, {status:'programmed', delivery:insertDelivery._id})

    const insertProduction = await schemas.productionSchema.insertMany(selectedShelf.map(shelf => {
      return {
        material:shelf.material,
        description:shelf.description,
        productionDate:shelf.productionDate,
        expireDate:shelf.expireDate,
        pieces:shelf.pieces,
        status:'programmed',
        ubication:shelf.ubication,
        lote:shelf.lote,
        isSerial:shelf.isSerial,
        delivery:insertDelivery._id
      }  
    }))

    const updateOperations = selectedShelf.map(element => ({
      updateOne: {
          filter: { _id: element.key },
          update: { $inc: { pieces: -element.pieces } }
      }
  })); 
  const updateManyResult = await schemas.productionSchema.bulkWrite(updateOperations);
  const updateStatus = await schemas.productionSchema.updateMany({pieces:0}, {status:'delivered'})



    return insertDelivery

  } catch (err) {
    throw err;
  }
};


deliveryFunctions.activeDeliveries = async () => {
  try {
    const activeDeliveries = await schemas.deliverySchema.find({status:'active'});
    if(!activeDeliveries) throw new Error('Error getting active deliveries')
    return activeDeliveries
  } catch (err) {
    throw err;
  }
};

deliveryFunctions.getDeliveryById = async (id) => {
  try {
    console.log(id);
    const delivery = await schemas.productionSchema.find({delivery:id});
    if(!delivery) throw new Error('Error getting delivery')
    return delivery
  } catch (err) {
    throw err;
  }
}

deliveryFunctions.captureSerial = async (serial, id) => {
  console.log(serial, id);
  try {
    let captureSerial 
    captureSerial = await schemas.productionSchema.updateOne({serial:serial, delivery:id, isSerial:true}, {status:'delivered'});
    console.log(captureSerial);

    if(captureSerial.modifiedCount === 0){
      console.log('lote');
      captureSerial = await schemas.productionSchema.updateOne({lote:serial, delivery:id, isSerial:false}, {status:'delivered'});
      if(!captureSerial) throw new Error('Error capturing serial')
    }
    return captureSerial
  } catch (err) {
    throw err;
  }
}


deliveryFunctions.completeDelivery = async (id) => {
  try{
    const completeDelivery = await schemas.deliverySchema.updateOne({_id:id}, {status:'completed'});
    if(!completeDelivery) throw new Error('Error completing delivery')
    return completeDelivery
  }catch(err){
    throw err;
  }
}

deliveryFunctions.destinationInsert = async (destination) => {
  try {
    const validateDestination = await schemas.destinationSchema.findOne({ destination: destination });
    if (validateDestination) {
      throw new Error('Destination already exists');
    }
    const create = await schemas.destinationSchema.create({
      destination,
    });
    return create

  } catch (err) {
    throw err;
  }
};

deliveryFunctions.destinationList = async () => {
  try {
    const list = await schemas.destinationSchema.find();
    return list
  } catch (err) {
    throw err;
  }
}



//get deliveries with serials from startdate to enddate
deliveryFunctions.totalQuantity = async (startDate, endDate) => {
  const startDateConverted = new Date(startDate);
  const endDateConverted = new Date(endDate);

  endDateConverted.setDate(endDateConverted.getDate() + 1);


  
  try {
    const result = await schemas.deliverySchema.aggregate([
      {
        $match: {
          date: { $gte: startDateConverted, $lte: endDateConverted },
          status: 'completed'
        }
      },
      {
        $lookup: {
          from: 'productions',
          let: { deliveryId: { $toString: "$_id" } }, 
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$delivery", "$$deliveryId"] } 
              }
            }
          ],
          as: 'productionDetails'
        }
      },
      {
        $unwind: "$productionDetails" // Unwind the productionDetails array
      },
      {
        $group: {
          _id: {
            destination: "$destination", // Group by destination
            material: "$productionDetails.material", // Sub-group by material
            date: "$date"
          },
          description: { $first: "$productionDetails.description" }, // Get the description for each material
          totalPieces: { $sum: "$productionDetails.pieces" }, // Sum the pieces for each material
        }
      }

    ])

    //take destincation and material out of _id
    result.forEach(element => {
      element.destination = element._id.destination;
      element.material = element._id.material;
      element.date = element._id.date;
      delete element._id;
    });
  
    return result;
  } catch (err) {
    throw err;
  }
};



// //get deliveries with serials from startdate to enddate
// deliveryFunctions.totalQuantity = async (startDate, endDate) => {
//   const startDateConverted = new Date(startDate);
//   const endDateConverted = new Date(endDate);
//   try {
//     const result = await schemas.deliverySchema.aggregate([
//       {
//         $match: {
//           date: { $gte: startDateConverted, $lte: endDateConverted },
//           status: 'completed'
//         }
//       },
//       {
//         $lookup: {
//           from: 'productions',
//           let: { deliveryId: { $toString: "$_id" } }, 
//           pipeline: [
//             {
//               $match: {
//                 $expr: { $eq: ["$delivery", "$$deliveryId"] } 
//               }
//             }
//           ],
//           as: 'productionDetails'
//         }
//       },

//     ])

//     return result;
//   } catch (err) {
//     throw err;
//   }
// };



module.exports = deliveryFunctions;