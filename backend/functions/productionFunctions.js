const productioFunctions = {};
const schemas = require('../schemas/schemas_MONGO')



async function findHighestSerial() {

  
  const highestSerialDocument = await schemas.productionSchema.findOne({}, {}, { sort: { serial: -1 } });
  const highestSerial = highestSerialDocument ? highestSerialDocument.serial : 1000000000;
  return highestSerial;
}

productioFunctions.insertProduction = async (user, material, description, productionDate, expireDate, pieces, totalBoxes, lote, isSerial)=> {
  const insertedDocuments = [];
  try {
    if (!isSerial){
      const insert = await schemas.productionSchema.create({
        user,
        material,
        description,
        productionDate,
        expireDate,
        pieces,
        status: 'active',
        ubication: 'Estanteria',
        lote,
        isSerial
      });
      insertedDocuments.push(insert);
    }else{
      const highestSerial = await findHighestSerial();

      let newSerial = parseInt(highestSerial)+1
     
      for (let i = 0; i < totalBoxes; i++) {
        const insert = await schemas.productionSchema.create({
          user,
          material,
          description,
          productionDate,
          expireDate,
          pieces,
          serial:newSerial,
          status: 'active',
          ubication: 'Temporal',
          lote,
          isSerial
        });
        newSerial++
        insertedDocuments.push(insert);
      }
  
      
    }

    return insertedDocuments;
  } catch (err) {
    throw err;
  }
}


productioFunctions.searchProduction = async ()=> {
  try {

    const serials = await schemas.productionSchema.find({ status: 'active', isSerial: true });
    const shelf = await schemas.productionSchema.find({ status: 'active', isSerial: false });

    return {serials, shelf};

  } catch (err) {
    throw err;
  }
}

productioFunctions.repackProduction = async (id, pieces)=> {
  try {
    const validateSerial = await schemas.productionSchema.findOne({ _id: id });
    if (!validateSerial) {
      throw new Error('Serial not found');
    }
    const updatePieces = await schemas.productionSchema.findOneAndUpdate({ _id: id }, { $set: { pieces: validateSerial.pieces - pieces } }, { new: true });
    const highestSerial = await findHighestSerial();
    const newSerial = parseInt(highestSerial)+1
    const insert = await schemas.productionSchema.create({
      user:validateSerial.user,
      material:validateSerial.material,
      description:validateSerial.description,
      productionDate:validateSerial.productionDate,
      expireDate:validateSerial.expireDate,
      pieces,
      serial:newSerial,
      status: 'active',
      ubication: 'Produccion',
      lote:validateSerial.lote,
      isSerial:true
    });
    return insert
  } catch (err) {
    throw err;
  }
}


productioFunctions.serialRack = async (serial, ubication)=> {
  try {

    const updateUbication = await schemas.productionSchema.findOneAndUpdate({ serial }, { $set: { ubication } }, { new: true });
    return updateUbication
    
  } catch (error) {
    throw error
    
  }
}

productioFunctions.changePieces = async (id)=> {
  try {

    const validateSerial = await schemas.productionSchema.findOne({ _id: id });
    const createCopywithoutserial = await schemas.productionSchema.create({
      user:validateSerial.user,
      material:validateSerial.material,
      description:validateSerial.description,
      productionDate:validateSerial.productionDate,
      expireDate:validateSerial.expireDate,
      pieces:validateSerial.pieces,
      status: 'active',
      ubication: 'Estanteria',
      lote:validateSerial.lote,
      isSerial:false
    });
    const changePieces = await schemas.productionSchema.findOneAndUpdate({ _id: id }, { $set: { status: 'changed to pieces' } }, { new: true });
    return changePieces
    
  } catch (error) {
    throw error
    
  }
}


productioFunctions.searchTotal = async ()=> {
  try {

   
    // get sum of pieces by material and ubication
    const total = await schemas.productionSchema.aggregate([
      {
        $match: { status: 'active' },
      },
      {
        $group: {
          _id: { material: '$material', ubication: '$ubication'},
          total: { $sum: '$pieces' },
          description: { $first: '$description' },
        },
      },
    ]);


    //take material and ubication out of _id
    total.forEach((element) => {
      element.material = element._id.material;
      element.ubication = element._id.ubication;
      delete element._id;
    });
    console.log(total);
    return {total};

  } catch (err) {
    throw err;
  }
}


module.exports = productioFunctions;